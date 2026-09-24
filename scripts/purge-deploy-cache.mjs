#!/usr/bin/env node
/**
 * purge-deploy-cache.mjs
 *
 * Purges Cloudflare CDN cache after a deployment.
 * Targets:
 *   - All _astro/ build assets on static.robray.net
 *   - Key HTML pages on des4800.robray.net
 *
 * Pass --everything to purge the entire zone (slower, more aggressive).
 *
 * Usage:
 *   node ./scripts/purge-deploy-cache.mjs
 *   node ./scripts/purge-deploy-cache.mjs --everything
 *   npm run purge:cache
 *   npm run purge:cache -- --everything
 */

import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Load .env
// ---------------------------------------------------------------------------
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envText = fs.readFileSync(envPath, 'utf8');
  for (const rawLine of envText.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const sep = line.indexOf('=');
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const value = line.slice(sep + 1).trim().replace(/^['\"]|['\"]$/g, '');
    if (!(key in process.env)) process.env[key] = value;
  }
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const zoneId   = process.env.CLOUDFLARE_ZONE_ID;
const assetsUrl = (process.env.ASSETS_URL || 'https://static.robray.net').replace(/\/$/, '');
const siteUrl   = (process.env.SITE_URL   || 'https://des4800.robray.net').replace(/\/$/, '');
const purgeEverything = process.argv.includes('--everything');

if (!apiToken) {
  console.error('❌ Missing CLOUDFLARE_API_TOKEN in .env');
  process.exit(1);
}
if (!zoneId) {
  console.error('❌ Missing CLOUDFLARE_ZONE_ID in .env');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Build URL list
// ---------------------------------------------------------------------------
async function buildUrlList() {
  const urls = [];

  // _astro/ build assets from the current dist/ directory
  const astroDir = path.join(process.cwd(), 'dist', '_astro');
  if (fs.existsSync(astroDir)) {
    const files = fs.readdirSync(astroDir).filter((f) => {
      const full = path.join(astroDir, f);
      return fs.statSync(full).isFile();
    });
    for (const f of files) {
      urls.push(`${assetsUrl}/_astro/${f}`);
    }
    console.log(`  Found ${files.length} _astro/ asset(s) in dist/`);
  } else {
    console.warn('  ⚠️  dist/_astro/ not found — skipping build asset purge (run npm run build first)');
  }

  // Key HTML pages
  const pages = ['/', '/projects/', '/soft-goods/'];
  for (const page of pages) {
    urls.push(`${siteUrl}${page}`);
  }

  return urls;
}

// ---------------------------------------------------------------------------
// Cloudflare purge API
// ---------------------------------------------------------------------------
async function purgeUrls(urls) {
  // Cloudflare accepts up to 30 URLs per request
  const CHUNK_SIZE = 30;
  let purgedCount = 0;

  for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
    const chunk = urls.slice(i, i + CHUNK_SIZE);
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: chunk }),
      }
    );

    const data = await res.json();
    if (!res.ok || !data.success) {
      console.error(`❌ Cloudflare API error: ${res.status} ${res.statusText}`);
      console.error(JSON.stringify(data.errors ?? data, null, 2));
      process.exit(1);
    }
    purgedCount += chunk.length;
  }
  return purgedCount;
}

async function purgeEverythingInZone() {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purge_everything: true }),
    }
  );

  const data = await res.json();
  if (!res.ok || !data.success) {
    console.error(`❌ Cloudflare API error: ${res.status} ${res.statusText}`);
    console.error(JSON.stringify(data.errors ?? data, null, 2));
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
console.log('🧹 Purging Cloudflare CDN cache...');

if (purgeEverything) {
  console.log('  Mode: purge everything (full zone)');
  await purgeEverythingInZone();
  console.log(`✅ Full zone cache purged for zone ${zoneId}`);
} else {
  console.log('  Mode: targeted purge (_astro/ assets + key pages)');
  const urls = await buildUrlList();
  console.log(`  Purging ${urls.length} URL(s)...`);
  for (const u of urls) console.log(`    ${u}`);
  const count = await purgeUrls(urls);
  console.log(`✅ Purged ${count} URL(s) from Cloudflare CDN cache`);
}
