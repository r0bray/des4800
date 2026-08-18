# DES4800 Cheat Sheet

Quick reference for common tasks.

## Development

```bash
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build for production (output to dist/)
npm run preview    # Preview production build locally
```

## Image Commands

```bash
npm run upload:images              # Upload all images in public/images/ to R2
npm run upload:image <path>        # Upload a single image to R2
npm run watch:images               # Watch public/images/ and auto-upload on change
```

## Deployment Commands

```bash
npm run deploy:full   # Full deployment: build → upload _astro assets → upload images → deploy Worker
npm run deploy        # Quick deploy: build + deploy Worker only (no image upload)
npm run build         # Build only (no deploy)
```

> `deploy:full` handles image upload automatically — no separate step needed.

## Cloudflare / Wrangler Commands

```bash
# Auth
npx wrangler login              # Authenticate with Cloudflare (opens browser)
npx wrangler whoami             # Check current auth status

# R2 bucket
npx wrangler r2 bucket list                                        # List all buckets
npx wrangler r2 object list static-robray-net                      # List all objects in bucket
npx wrangler r2 object list static-robray-net --prefix=images/     # List images only
npx wrangler r2 object put static-robray-net/images/x.jpg \
  --file=public/images/x.jpg                                       # Manual upload
npx wrangler r2 object delete static-robray-net/images/old.jpg     # Delete object

# Worker
npx wrangler deploy             # Deploy the Worker
npx wrangler tail des4800-robray-net-site-production               # Tail live Worker logs
```

## File Locations

| What | Where |
|------|-------|
| Pages | `src/pages/*.astro` |
| Layouts | `src/layouts/*.astro` |
| Components | `src/components/*.astro` |
| Styles / public files | `public/` |
| Images (local staging, gitignored) | `public/images/` |
| Astro config | `astro.config.mjs` |
| Worker config | `wrangler.toml` |
| Deploy scripts | `scripts/` |
| GitHub Actions workflow | `.github/workflows/deploy.yml` |

## URLs

| Resource | URL |
|----------|-----|
| Production site | https://des4800.robray.net |
| Static assets / images CDN | https://static.robray.net |
| Dev server | http://localhost:4321 |
| Cloudflare Dashboard | https://dash.cloudflare.com |

## Image Usage in Astro

```astro
<!-- Direct URL -->
<img src="https://static.robray.net/images/logo.png" alt="Logo" />

<!-- With constant -->
---
const CDN = 'https://static.robray.net';
---
<img src={`${CDN}/images/logo.png`} alt="Logo" />
<img src={`${CDN}/images/heroes/banner.jpg`} alt="Hero" />
```

## Common Task Recipes

### Add a new page

```
1. Create src/pages/about.astro
2. It becomes available at https://des4800.robray.net/about
```

### Add a new image

```bash
# 1. Copy image into place
cp ~/Downloads/hero.jpg public/images/heroes/

# 2a. Upload and deploy together
npm run deploy:full

# 2b. Or upload image only (no code deploy)
npm run upload:image public/images/heroes/hero.jpg

# 3. Reference in Astro
# <img src="https://static.robray.net/images/heroes/hero.jpg" alt="Hero" />
```

### Deploy code changes

```bash
# Option A: Push to main (triggers GitHub Actions)
git add .
git commit -m "Update page"
git push origin main

# Option B: Deploy manually (includes image upload)
npm run deploy:full

# Option C: Quick deploy (code only)
npm run deploy
```

### Check what's in R2

```bash
npx wrangler r2 object list static-robray-net
npx wrangler r2 object list static-robray-net --prefix=images/
npx wrangler r2 object list static-robray-net --prefix=_astro/
```

## Troubleshooting One-Liners

```bash
# Dev server won't start
rm -rf node_modules .astro && npm install && npm run dev

# Build fails — check for errors
npm run astro check

# Not authenticated to Cloudflare
npx wrangler login

# Images not uploading
npx wrangler whoami && npx wrangler r2 bucket list

# Verify an image is live
curl -I https://static.robray.net/images/your-image.jpg

# Clear Astro cache
rm -rf .astro dist
```

## npm Scripts Reference

| Script | What it does |
|--------|-------------|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build + deploy Worker |
| `npm run deploy:full` | Build + upload assets + upload images + deploy Worker |
| `npm run upload:images` | Upload all `public/images/` to R2 |
| `npm run upload:image <path>` | Upload a single image to R2 |
| `npm run watch:images` | Watch `public/images/` and auto-upload |

## GitHub Actions

**Workflow:** `.github/workflows/deploy.yml`  
**Trigger:** Push to `main` (doc-only changes excluded)  
**What it does:** Install deps → build → upload `_astro` to R2 → upload favicon → deploy Worker

> GitHub Actions does **not** upload images (they're gitignored). Upload images locally with `npm run upload:images` or `npm run deploy:full`.

## Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) — Full deployment guide
- [IMAGES.md](./IMAGES.md) — Image management guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) — How it works
- [README.md](./README.md) — Main documentation
