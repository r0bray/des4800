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

### Prerequisites for Deployment

1. **R2 Bucket Setup**:
   ```bash
   # Create the R2 bucket (if not already created)
   wrangler r2 bucket create static-robray-net
   ```

2. **DNS Configuration**:
   - Connect `des4800.robray.net` to the Worker via Cloudflare Worker custom domain
   - Add custom domain `static.robray.net` to the R2 bucket

### Deploy to Cloudflare Workers

```bash
npm run deploy
```

This runs `npm run build && wrangler deploy` — builds the site and deploys the Worker directly.

### Automated Deployment

**Option A: Use the deployment script (recommended)**

```bash
npm run deploy:full
```

This runs `./scripts/deploy.sh` which:
1. Builds the site
2. Uploads compiled `_astro` CSS/JS to R2
3. Uploads public assets (favicon, etc.) to R2
4. Uploads all images from `public/images/` to R2
5. Deploys the Worker with `wrangler deploy`

Image uploads are included — no need to run them separately.

**Option B: GitHub Actions (automatic)**

Push to `main` branch and GitHub Actions will automatically build and deploy the Worker.

See [GitHub Actions Setup](#github-actions-setup) below.

**Option C: Manual deployment**

```bash
npm run build
npx wrangler deploy
```

Then upload assets manually:
```bash
npx wrangler r2 object put static-robray-net/_astro/[filename] --file=dist/_astro/[filename] --remote
```

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

## 🤖 GitHub Actions Setup

Automatic deployments on push to `main` are handled by `.github/workflows/deploy.yml`.

### 1. Get Cloudflare Credentials

```bash
npx wrangler whoami
# Note your Account ID
```

### 2. Create Cloudflare API Token

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Create token with permissions:
   - Workers R2 Storage: Edit
   - Workers Scripts: Edit
   - Account Settings: Read

### 3. Add GitHub Secrets

Go to: https://github.com/r0bray/des4800/settings/secrets/actions

Add two secrets:
- `CLOUDFLARE_ACCOUNT_ID`: Your account ID from step 1
- `CLOUDFLARE_API_TOKEN`: The token from step 2

### 4. Push to Deploy

```bash
git push origin main
```

GitHub Actions will automatically build and deploy!

**View deployments**: https://github.com/r0bray/des4800/actions

## 🔧 Troubleshooting

### Assets not loading

1. Verify R2 bucket exists: `npx wrangler r2 bucket list`
2. Check bucket has public access enabled
3. Verify custom domain `static.robray.net` is configured in R2 settings
4. Check browser console for CORS errors

### Worker deployment fails

1. Ensure you're authenticated: `npx wrangler login`
2. Check `wrangler.toml` configuration
3. Verify your Cloudflare account has Workers enabled

### SSH Authentication with 1Password

This project uses the 1Password SSH agent (`SSH_AUTH_SOCK` set to the 1Password socket in `~/.zshrc`) with the "Github CSUSB SSH Key". The SSH config lives in `~/dotfiles/ssh_config`, symlinked to `~/.ssh/config`.

```bash
# Test SSH connection
ssh -T git@github.com

# Should respond: "Hi r0bray! You've successfully authenticated..."
```

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in minutes
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment walkthrough
- **[IMAGES.md](./IMAGES.md)** - Image upload and management guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and diagrams
- **[CHEATSHEET.md](./CHEATSHEET.md)** - Quick command reference
- **[SETUP-COMPLETE.md](./SETUP-COMPLETE.md)** - Setup summary
- **[.github/SECRETS.md](./.github/SECRETS.md)** - GitHub Actions secrets setup

## 🔗 Resources

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

## 📊 Project Status

- ✅ Site deployed and live at https://des4800.robray.net
- ✅ Assets serving from R2 at https://static.robray.net
- ✅ GitHub repository configured with SSH authentication
- ✅ Local development environment working
- ✅ GitHub Actions configured for auto-deployment on push to `main`

---

**Made with** ⚡ **Astro** • 🦄 **Cloudflare** • 🔐 **1Password**
