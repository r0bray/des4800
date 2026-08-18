#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const imageUrl = process.argv[2];
if (!imageUrl) {
  console.error('Usage: npm run purge:image -- <full-image-url>');
  process.exit(1);
}

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

const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;

if (!apiToken) {
  console.error('Missing CLOUDFLARE_API_TOKEN');
  process.exit(1);
}

if (!zoneId) {
  console.error('Missing CLOUDFLARE_ZONE_ID');
  console.error('Add CLOUDFLARE_ZONE_ID to your .env to use cache purge commands.');
  process.exit(1);
}

const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ files: [imageUrl] }),
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

console.log(`✅ Purged Cloudflare cache for: ${imageUrl}`);
