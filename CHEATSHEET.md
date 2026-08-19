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

### Primary: Git Push (Automatic via GitHub Actions)

```bash
git add .
git commit -m "Your changes"
git push origin main
```

→ Automatically builds, uploads assets to R2, and deploys Worker.

### Alternative: Local Deployment

```bash
npm run deploy:full   # Full: build → upload assets → upload images → deploy Worker
npm run deploy        # Quick: build + deploy Worker only (no image upload)
npm run build         # Build only (no deploy)
```

> Use `npm run deploy:full` locally when you need to include images.

## GitHub Actions

```bash
# Monitor deployment
https://github.com/r0bray/des4800/actions

# View logs of last deployment
https://github.com/r0bray/des4800/actions/workflows/deploy.yml
```

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
# PRIMARY: Push to main (auto-deploys via GitHub Actions)
git add .
git commit -m "Update page"
git push origin main

# ALTERNATIVE: Deploy from local machine
npm run deploy:full          # With images
npm run deploy               # Code only (faster)
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

# Not authenticated for local deploy
npx wrangler login

# GitHub Actions deployment failed
https://github.com/r0bray/des4800/actions  # Check logs here

# Images not uploading
npx wrangler whoami && npx wrangler r2 bucket list

# Verify CSS is live
curl -I https://static.robray.net/_astro/index.YCIkRrJG.css

# Clear Astro cache
rm -rf .astro dist
```

## Deployment Flow

```
git push origin main
    ↓
GitHub Actions triggered
    ↓
1. Install dependencies
2. npm run build
3. Upload dist/client/_astro/* to R2
4. Upload favicon.svg to R2
5. wrangler deploy
    ↓
✅ Live at https://des4800.robray.net
```

## npm Scripts Reference

| Script | What it does |
|--------|-------------|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build + deploy Worker |
| `npm run deploy:full` | Full local deploy (use when pushing images) |
| `npm run deploy` | Quick local deploy (code only) |
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
