# DES4800 - Cloudflare Workers + R2

A modern website built with Astro 7.x and deployed on Cloudflare Workers with assets hosted on R2.

## 🌐 Site Information

- **Live Site**: https://des4800.robray.net ✅
- **Static Assets**: https://static.robray.net ✅
- **Worker**: des4800-robray-net-site-production
- **R2 Bucket**: static-robray-net
- **Repository**: https://github.com/r0bray/des4800

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Cloudflare account with Workers and R2 enabled
- Wrangler CLI authenticated

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This now attempts to refresh `public/images-manifest.json` from R2, sync the latest shared images into `public/images/`, start an automatic upload watcher for `public/images/`, and then start the development server at `http://localhost:4321`.

If Cloudflare is unavailable or your token is missing, you'll see a warning and dev will still start with your existing local images. If the watcher cannot start, dev still continues without auto-upload.

If you want to refresh images without starting dev:

```bash
npm run sync:images:latest
```

`npm run preview` now follows the same best-effort image-sync pattern before starting the local preview server.

### Build

```bash
npm run build
```

This builds the site for production in the `dist/` directory.

### Working with Images

Place local source images in `public/images/`. This directory is gitignored (only `README.md` and `.gitkeep` are tracked), so images live locally and are uploaded to R2 rather than committed to the repo.

```bash
# Find malformed remote image keys like images/Users/...
npm run cleanup:images:r2:bad-keys

# Delete malformed remote image keys
npm run cleanup:images:r2:bad-keys:delete

# Rebuild the image manifest from the current R2 bucket contents
npm run update:images-manifest:r2

# See what is missing, changed, or already up to date
npm run sync:images:status

# Pull the shared image set down from R2 (skips unchanged files)
npm run sync:images

# Force a full redownload from R2
npm run sync:images:force

# Pull and delete local image files that no longer exist in R2
npm run sync:images:delete

# Upload all images
npm run upload:images

# Upload a single image
npm run upload:image public/images/logo.png

# Watch and auto-upload on changes
npm run watch:images
```

This gives collaborators a simple way to repopulate `public/images/` after cloning the repo, as long as they have Wrangler access to the R2 bucket. The sync uses the tracked file `public/images-manifest.json` to know which image keys exist in R2.

Use the uploaded CDN paths in Astro, for example `https://static.robray.net/images/...`.

See [IMAGES.md](./IMAGES.md) for the complete image management guide.

## 📦 Deployment

### Primary: GitHub Actions (Automatic) ⚡

The easiest way to deploy:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

✅ **GitHub Actions automatically:**
1. Builds the site
2. Uploads compiled CSS/JS to R2 (from `dist/client/_astro/`)
3. Uploads `favicon.svg` to R2
4. Deploys the Worker to Cloudflare

**Monitor progress:** https://github.com/r0bray/des4800/actions

### Alternative: Local Deployment

If you prefer to deploy from your machine:

```bash
# Full deployment (includes images)
npm run deploy:full

# Quick deploy (code only)
npm run deploy
```

Requires local Wrangler authentication:
```bash
npx wrangler login
```

### Prerequisites (One-time)

- Cloudflare account with Workers & R2
- R2 bucket `static-robray-net` created
- Custom domain `static.robray.net` → R2 bucket
- Custom domain `des4800.robray.net` → Worker
- GitHub repository secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

## 🏗️ Architecture

### Asset Handling

- Static assets (JS, CSS, images) are served from `static.robray.net` (R2)
- HTML pages are server-rendered by the Cloudflare Worker
- This provides optimal performance with edge-cached assets and dynamic SSR

### Configuration Files

- `astro.config.mjs` - Astro configuration with Cloudflare adapter
- `wrangler.toml` - Cloudflare Workers configuration
- `tsconfig.json` - TypeScript configuration

## 🛠️ Technology Stack

- **Framework**: Astro 7.x
- **Adapter**: @astrojs/cloudflare
- **Hosting**: Cloudflare Workers (SSR)
- **Assets**: Cloudflare R2
- **CDN**: Cloudflare CDN
- **Language**: TypeScript
- **Deployment**: Wrangler

## 📝 Notes

### Deployment Workflows

**Code Changes (Automatic via GitHub Actions):**
- Push code to `main` branch
- GitHub Actions builds and deploys the Worker
- Compiled assets uploaded to R2

**Image Uploads:**
- Add images to `public/images/` (gitignored)
- Included automatically when running `npm run deploy:full`
- Or upload independently via `npm run upload:images`
- Or use watch mode: `npm run watch:images`

### R2 Bucket Configuration

The R2 bucket `static-robray-net` is configured with:
- Public access for assets
- Custom domain `static.robray.net` linked to the bucket
- CORS settings as needed for cross-origin requests

### DNS Setup

Configured in Cloudflare DNS for `robray.net`:

1. **Main site** (`des4800.robray.net`):
   - Connected via Cloudflare Worker custom domain
   - Worker: `des4800-robray-net-site-production`
   - Status: ✅ Active

2. **Static assets** (`static.robray.net`):
   - Configured via R2 bucket custom domain
   - Automatic DNS record created by Cloudflare
   - SSL certificate auto-issued
   - Status: ✅ Active

### Cloudflare Workers

This setup deploys directly to Cloudflare Workers using `wrangler deploy`. The Worker serves HTML via SSR and the R2 bucket serves static assets.

## 🤖 GitHub Actions Workflow

Automatic deployments are handled by `.github/workflows/deploy.yml`.

**Triggered on:** Push to `main` (doc-only changes are skipped)

**What it does:**
1. Install dependencies
2. Run `npm run build`
3. Upload CSS/JS from `dist/client/_astro/` to R2
4. Upload `favicon.svg` to R2
5. Deploy Worker with `wrangler deploy`

**Required secrets** (already configured):
- `CLOUDFLARE_API_TOKEN` — API token with Workers and R2 permissions
- `CLOUDFLARE_ACCOUNT_ID` — Your Cloudflare account ID

**Note on images:** The workflow does NOT upload images (they're gitignored). To deploy images:
- Use `npm run deploy:full` locally, which includes `npm run upload:images`
- Or run `npm run upload:images` separately

**View workflow progress:** https://github.com/r0bray/des4800/actions

## 🔧 Troubleshooting

### GitHub Actions deployment failed

1. Check logs: https://github.com/r0bray/des4800/actions
2. Verify secrets at: https://github.com/r0bray/des4800/settings/secrets/actions
3. Ensure API token has `workers:write` and `r2:write` permissions
4. Check token hasn't expired: https://dash.cloudflare.com/profile/api-tokens

### Assets not loading (CSS/JS 404)

1. Hard refresh browser: `Cmd+Shift+R` or `Ctrl+Shift+R`
2. Verify R2 bucket has assets:
   ```bash
   npx wrangler r2 bucket list
   ```
3. Check custom domain `static.robray.net` is configured in R2 settings
4. Verify assets are in `static-robray-net/_astro/`

### Worker deployment fails locally

1. Authenticate: `npx wrangler login`
2. Check `wrangler.toml` configuration
3. Verify Cloudflare account has Workers enabled

### SSH Authentication

Git operations use SSH authentication configured in your local environment.

```bash
# Test SSH connection
ssh -T git@github.com

# Should respond: "Hi r0bray! You've successfully authenticated..."
```

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** — Get started in minutes
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Detailed deployment guide and troubleshooting
- **[CHEATSHEET.md](./CHEATSHEET.md)** — Quick command reference
- **[IMAGES.md](./IMAGES.md)** — Image upload and management
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System architecture and diagrams

## 🔗 Resources

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

## 📊 Project Status

- ✅ Site live at https://des4800.robray.net
- ✅ Assets serving from R2 at https://static.robray.net
- ✅ GitHub Actions auto-deployment on push to `main`
- ✅ Local development environment working
- ✅ Cloudflare Workers + R2 fully configured

---

**Made with** ⚡ **Astro** • 🦄 **Cloudflare** • 🔐 **1Password**
