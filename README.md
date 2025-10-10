# DES4800 - Cloudflare Workers + R2

A modern website built with Astro 4.x and deployed on Cloudflare Workers with assets hosted on R2.

## 🌐 Site Information

- **URL**: https://des4800.robray.net
- **Worker**: des4800-robray-net-site-production
- **R2 Bucket**: static-robray-net
- **Assets CDN**: https://static.robray.net

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

Place static images in `public/images/` and upload to R2:

```bash
# Upload all images immediately
npm run upload:images

# Upload a single image
npm run upload:image public/images/logo.png

# Watch and auto-upload on changes
npm run watch:images
```

See [IMAGES.md](./IMAGES.md) for complete image management guide.

## 📦 Deployment

### Prerequisites for Deployment

1. **R2 Bucket Setup**:
   ```bash
   # Create the R2 bucket (if not already created)
   wrangler r2 bucket create static-robray-net
   ```

2. **DNS Configuration**:
   - Add A record for `des4800.robray.net` pointing to Cloudflare Workers
   - Add CNAME record for `static.robray.net` pointing to R2 bucket

### Deploy to Cloudflare Workers

```bash
npm run build
wrangler pages deploy dist
```

### Manual Asset Upload to R2

After building, you'll need to upload the static assets to your R2 bucket:

```bash
# Upload the _astro directory to R2
wrangler r2 object put static-robray-net/_astro/[filename] --file=dist/_astro/[filename]
```

Or use a script to batch upload (see below).

### Automated Deployment Script

Create a `scripts/deploy.sh` file:

```bash
#!/bin/bash
set -e

echo "Building site..."
npm run build

echo "Uploading assets to R2..."
# Upload all assets from dist/_astro to R2
for file in dist/_astro/*; do
  filename=$(basename "$file")
  wrangler r2 object put static-robray-net/_astro/$filename --file=$file
done

echo "Deploying to Cloudflare Workers..."
wrangler pages deploy dist

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x scripts/deploy.sh
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

- **Framework**: Astro 4.x
- **Hosting**: Cloudflare Workers (SSR)
- **Assets**: Cloudflare R2
- **CDN**: Cloudflare CDN
- **Language**: TypeScript

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

In your Cloudflare DNS for `robray.net`:

1. Add a CNAME or A record for `des4800`:
   - Type: CNAME (or A record)
   - Name: des4800
   - Target: Your Cloudflare Workers domain

2. Add a CNAME for the static subdomain:
   - Type: CNAME
   - Name: static
   - Target: Link to R2 public bucket domain

### Cloudflare Pages vs Workers

This setup uses Cloudflare Pages (which runs on Workers) for deployment. The `wrangler pages deploy` command handles the Worker deployment automatically.

## 🔧 Troubleshooting

### Assets not loading

1. Verify R2 bucket exists: `wrangler r2 bucket list`
2. Check bucket has public access enabled
3. Verify DNS records are correctly configured
4. Check browser console for CORS errors

### Worker deployment fails

1. Ensure you're authenticated: `wrangler login`
2. Check `wrangler.toml` configuration
3. Verify your Cloudflare account has Workers enabled

## 📚 Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Get started quickly
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- [IMAGES.md](./IMAGES.md) - Image upload and management
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture details
- [.github/SECRETS.md](./.github/SECRETS.md) - GitHub Actions setup

## 🔗 Resources

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

