#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envText = fs.readFileSync(envPath, 'utf8');
  for (const rawLine of envText.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['\"]|['\"]$/g, '');
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const bucketName = 'static-robray-net';
const deleteMode = process.argv.includes('--delete');

if (!accountId) {
  console.error('Missing CLOUDFLARE_ACCOUNT_ID');
  process.exit(1);
}

if (!apiToken) {
  console.error('Missing CLOUDFLARE_API_TOKEN');
  process.exit(1);
}

function isBadKey(key) {
  return key.startsWith('images/Users/') || key.includes('/public/images/');
}

async function listBadKeys() {
  const badKeys = [];
  let cursor = null;

  while (true) {
    const url = new URL(`https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects`);
    url.searchParams.set('prefix', 'images/');
    url.searchParams.set('per_page', '1000');
    if (cursor) {
      url.searchParams.set('cursor', cursor);
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Cloudflare API request failed: ${response.status} ${response.statusText}`);
      console.error(body);
      process.exit(1);
    }

    const data = await response.json();
    if (!data.success) {
      console.error('Cloudflare API returned an error response:');
      console.error(JSON.stringify(data, null, 2));
      process.exit(1);
    }

    for (const object of data.result ?? []) {
      const key = object?.key ?? '';
      if (isBadKey(key)) {
        badKeys.push(key);
      }
    }

    const nextCursor = data.result_info?.cursor;
    if (!nextCursor) {
      break;
    }
    cursor = nextCursor;
  }

  return badKeys.sort((a, b) => a.localeCompare(b));
}

async function deleteKey(key) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects/${encodeURIComponent(key)}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to delete ${key}: ${response.status} ${response.statusText}\n${body}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(`Cloudflare API failed to delete ${key}:\n${JSON.stringify(data, null, 2)}`);
  }
}

const badKeys = await listBadKeys();

if (badKeys.length === 0) {
  console.log('✅ No malformed R2 image keys found.');
  process.exit(0);
}

console.log(`Found ${badKeys.length} malformed R2 image key(s):`);
for (const key of badKeys) {
  console.log(`- ${key}`);
}

if (!deleteMode) {
  console.log('');
  console.log('Run with --delete to remove these keys from R2.');
  process.exit(0);
}

console.log('');
console.log('Deleting malformed R2 image keys...');
for (const key of badKeys) {
  console.log(`Deleting: ${key}`);
  await deleteKey(key);
}
console.log('✅ Malformed R2 image keys deleted.');
