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
const prefix = 'images/';
const manifestPath = path.join(process.cwd(), 'public', 'images-manifest.json');
const ignoredBasenames = new Set(['.gitkeep', 'README.md', '.DS_Store', 'Thumbs.db']);

if (!accountId) {
  console.error('Missing CLOUDFLARE_ACCOUNT_ID');
  process.exit(1);
}

if (!apiToken) {
  console.error('Missing CLOUDFLARE_API_TOKEN');
  process.exit(1);
}

async function listAllObjects() {
  const keys = [];
  let cursor = null;

  while (true) {
    const url = new URL(`https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects`);
    url.searchParams.set('prefix', prefix);
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
      if (!object?.key?.startsWith(prefix)) continue;
      const relativePath = object.key.slice(prefix.length);
      const basename = path.posix.basename(relativePath);
      if (!relativePath || ignoredBasenames.has(basename)) continue;
      keys.push(relativePath);
    }

    const nextCursor = data.result_info?.cursor;
    if (!nextCursor) {
      break;
    }
    cursor = nextCursor;
  }

  return keys;
}

const keys = Array.from(new Set(await listAllObjects())).sort((a, b) => a.localeCompare(b));
fs.writeFileSync(manifestPath, `${JSON.stringify(keys, null, 2)}\n`);
console.log(`Updated public/images-manifest.json from R2 with ${keys.length} image(s)`);
