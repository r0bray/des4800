# Deployment Guide

Complete guide to deploying the DES4800 Astro site to Cloudflare Workers with R2 static assets.

## Prerequisites

Before deploying, ensure you have:

1. **Node.js 20+**: Check with `node --version`
2. **Cloudflare Account**: With Workers and R2 enabled
3. **Wrangler authenticated**: Run `npx wrangler login` (opens browser OAuth)
4. **Domain**: `robray.net` configured in Cloudflare DNS

### Authenticate Wrangler (first time only)

```bash
npx wrangler login
```

This opens a browser window for OAuth. Once authorized, your credentials are stored locally and you won't need to repeat this.

---

## DNS / Domain Configuration

These are one-time setup steps. Skip if already configured.

### Worker Custom Domain for `des4800.robray.net`

The main site is served by a Cloudflare Worker. To route your custom subdomain to it:

1. Go to **Cloudflare Dashboard** → **Workers & Pages**
2. Open the Worker named `des4800-robray-net-site-production`
3. Go to **Settings** → **Domains & Routes**
4. Click **Add Custom Domain**
5. Enter `des4800.robray.net`
6. Click **Add Domain** — Cloudflare will automatically create the DNS record and issue an SSL certificate

> **Note:** Do not create a manual CNAME record. The Worker custom domain setup handles DNS automatically.

### R2 Custom Domain for `static.robray.net`

Static assets and images are served from the R2 bucket via a custom domain:

1. Go to **Cloudflare Dashboard** → **R2**
2. Open the bucket `static-robray-net`
3. Go to **Settings** → **Custom Domains**
4. Click **Connect Domain**
5. Enter `static.robray.net`
6. Click **Continue** — Cloudflare will create the DNS record and issue an SSL certificate

> **Note:** It may take a few minutes for the domain to become active.

---

## Standard Deployment

### Full Deployment (recommended)

```bash
npm run deploy:full
```

This runs `scripts/deploy.sh`, which does the following in order:

1. **Builds the site** — runs `npm run build`, outputs to `dist/`
2. **Uploads `_astro` assets** — uploads all compiled CSS/JS from `dist/_astro/` to `static-robray-net/_astro/` in R2
3. **Uploads public assets** — uploads `favicon.svg` and other public files to R2
4. **Uploads images** — uploads everything in `public/images/` to `static-robray-net/images/` in R2
5. **Deploys the Worker** — runs `npx wrangler deploy`, pushing `dist/_worker.js` to Cloudflare

### Quick Deploy (code only, no image upload)

```bash
npm run deploy
```

Equivalent to `npm run build && wrangler deploy`. Use this when you have no image changes and want a faster deployment.

---

## Manual Deployment Steps

If you need fine-grained control:

```bash
# 1. Build
npm run build

# 2. Upload compiled CSS/JS assets
for file in dist/_astro/*; do
  filename=$(basename "$file")
  npx wrangler r2 object put "static-robray-net/_astro/$filename" --file="$file"
done

# 3. Upload favicon
npx wrangler r2 object put static-robray-net/favicon.svg --file=dist/favicon.svg

# 4. Upload images
for file in public/images/**/*; do
  [ -f "$file" ] || continue
  key="${file#public/}"
  npx wrangler r2 object put "static-robray-net/$key" --file="$file"
done

# 5. Deploy the Worker
npx wrangler deploy
```

---

## GitHub Actions (Automatic Deployment)

Pushes to the `main` branch trigger automatic deployment via `.github/workflows/deploy.yml`.

**What the workflow does:**
1. Installs Node dependencies
2. Builds the Astro site
3. Uploads `_astro` CSS/JS to R2
4. Uploads `favicon.svg` to R2
5. Deploys the Worker with `wrangler deploy`

**Trigger:** Push to `main` (doc-only changes are excluded via path filters)

**Required secrets** (already configured in the repository):
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

> **Note:** The GitHub Actions workflow does not upload images. Images live in `public/images/`, which is gitignored. Use `npm run deploy:full` or `npm run upload:images` locally to push images to R2. See [IMAGES.md](./IMAGES.md).

---

## Verify Deployment

After deploying:

1. **Check the Worker status:**
   ```bash
   npx wrangler whoami
   npx wrangler r2 object list static-robray-net
   ```

2. **Test the live site:**
   - Visit https://des4800.robray.net
   - Open browser DevTools → Network tab
   - Confirm assets load from https://static.robray.net

3. **Check R2 assets:**
   ```bash
   npx wrangler r2 object list static-robray-net
   ```

---

## Troubleshooting

### Assets return 404 (CSS/JS not loading)

**Cause:** Built assets weren't uploaded to R2.

```bash
# Check what's in the bucket
npx wrangler r2 object list static-robray-net

# Re-upload assets manually
for file in dist/_astro/*; do
  npx wrangler r2 object put "static-robray-net/_astro/$(basename $file)" --file="$file"
done
```

### Site returns "Worker not found" or 404

**Cause:** Worker not deployed, or custom domain not configured.

```bash
# Check Wrangler auth
npx wrangler whoami

# Re-deploy
npx wrangler deploy
```

Then verify the custom domain is set in **Workers & Pages → des4800-robray-net-site-production → Settings → Domains & Routes**.

### Build fails

```bash
# Clear caches and reinstall
rm -rf .astro node_modules/.astro
npm install

# Check for Astro/TypeScript errors
npm run astro check

# Rebuild
npm run build
```

### Wrangler not authenticated

```bash
npx wrangler login
# Then retry deployment
npm run deploy:full
```

### CORS errors for assets

Configure CORS on the R2 bucket in Cloudflare Dashboard → R2 → `static-robray-net` → Settings → CORS Policy:

```json
[
  {
    "AllowedOrigins": ["https://des4800.robray.net"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

---

## Production Checklist

- [ ] Wrangler authenticated (`npx wrangler login`)
- [ ] R2 bucket `static-robray-net` exists
- [ ] Custom domain `static.robray.net` configured on R2 bucket
- [ ] Custom domain `des4800.robray.net` configured on Worker
- [ ] `npm run deploy:full` completed successfully
- [ ] Site loads at https://des4800.robray.net
- [ ] Assets (CSS/JS) load from https://static.robray.net
- [ ] No console errors in browser DevTools

---

## Useful Commands

```bash
# Auth
npx wrangler login
npx wrangler whoami

# R2
npx wrangler r2 bucket list
npx wrangler r2 object list static-robray-net
npx wrangler r2 object list static-robray-net --prefix=images/
npx wrangler r2 object delete static-robray-net/images/old-file.jpg

# Worker logs (real-time)
npx wrangler tail des4800-robray-net-site-production
```

---

## Related Documentation

- [IMAGES.md](./IMAGES.md) — Image management and upload guide
- [CHEATSHEET.md](./CHEATSHEET.md) — Quick command reference
- [ARCHITECTURE.md](./ARCHITECTURE.md) — How the system works
