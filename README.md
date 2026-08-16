# DES4800 - Cloudflare Workers + R2

A modern website built with Astro 5.x and deployed on Cloudflare Workers with assets hosted on R2.

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

This starts the development server at `http://localhost:4321`

### Build

```bash
npm run build
```

This builds the site for production in the `dist/` directory.

### Working with Images

Place local source images in `public/images/` and upload them to R2. The contents of `public/images/` are intended to stay local and are gitignored, except for directory docs/placeholders:

```bash
# Upload all images immediately
npm run upload:images

# Upload a single image
npm run upload:image public/images/logo.png

# Watch and auto-upload on changes
npm run watch:images
```

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
   - Add CNAME record for `des4800.robray.net` pointing to Cloudflare Workers
   - Add CNAME record for `static.robray.net` pointing to R2 bucket

### Deploy to Cloudflare Workers

```bash
npm run build
wrangler pages deploy dist
```

### Automated Deployment

**Option A: Use the deployment script (recommended)**

```bash
npm run deploy:full
```

This runs `./scripts/deploy.sh` which:
1. Builds the site
2. Uploads assets to R2 (with `--remote` flag)
3. Deploys Worker to Cloudflare Pages

**Option B: GitHub Actions (automatic)**

Push to `main` branch and GitHub Actions will:
1. Build the site
2. Upload compiled assets to R2
3. Deploy the Worker

See [GitHub Actions Setup](#github-actions-setup) below.

**Option C: Manual deployment**

```bash
npm run build
npx wrangler pages deploy dist --project-name=des4800-robray-net-site-production
```

Then upload assets:
```bash
npx wrangler r2 object put static-robray-net/_astro/[filename] --file=dist/_astro/[filename] --remote
```

## 🏗️ Architecture

### Asset Handling

- Static assets (JS, CSS, images) are served from `static.robray.net` (R2)
- HTML pages are server-rendered by Cloudflare Workers
- This provides optimal performance with edge-cached assets and dynamic SSR

### Configuration Files

- `astro.config.mjs` - Astro configuration with Cloudflare adapter
- `wrangler.toml` - Cloudflare Workers configuration
- `tsconfig.json` - TypeScript configuration

## 🛠️ Technology Stack

- **Framework**: Astro 5.14.3
- **Adapter**: @astrojs/cloudflare 12.6.10
- **Hosting**: Cloudflare Workers/Pages (SSR)
- **Assets**: Cloudflare R2
- **CDN**: Cloudflare CDN
- **Language**: TypeScript 5.6.3
- **Deployment**: Wrangler 4.42.2

## 📝 Notes

### Deployment Workflows

**Code Changes (Automatic via GitHub Actions):**
- Push code to `main` branch
- GitHub Actions builds and deploys to Workers
- Compiled assets uploaded to R2

**Image Uploads (Separate):**
- Add images to `public/images/`
- Upload via `npm run upload:images`
- Or auto-upload via GitHub Actions when pushed
- Or use watch mode: `npm run watch:images`

### R2 Bucket Configuration

The R2 bucket `static-robray-net` needs to be configured with:
- Public access for assets
- Custom domain `static.robray.net` linked to the bucket
- CORS settings if needed for cross-origin requests

### DNS Setup

Configured in Cloudflare DNS for `robray.net`:

1. **Main site** (`des4800.robray.net`):
   - Type: CNAME
   - Name: des4800
   - Target: des4800-robray-net-site-production.pages.dev
   - Proxy: Enabled (orange cloud)
   - Status: ✅ Active

2. **Static assets** (`static.robray.net`):
   - Configured via R2 bucket custom domain
   - Automatic DNS record created by Cloudflare
   - SSL certificate auto-issued
   - Status: ✅ Active

### Cloudflare Pages vs Workers

This setup uses Cloudflare Pages (which runs on Workers) for deployment. The `wrangler pages deploy` command handles the Worker deployment automatically.

## 🤖 GitHub Actions Setup

To enable automatic deployments on push to `main`:

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

This project uses 1Password SSH agent with the "Github CSUSB SSH Key":

```bash
# Test SSH connection
ssh -T git@r0braygithub

# Should respond: "Hi r0bray! You've successfully authenticated..."
```

Git remote uses the `r0braygithub` host alias defined in `~/dotfiles/ssh_config`.

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
- ⏳ GitHub Actions secrets needed for auto-deployment

---

**Made with** ⚡ **Astro** • 🦄 **Cloudflare** • 🔐 **1Password**
