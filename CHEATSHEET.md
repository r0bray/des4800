# DES4800 Cheat Sheet

Quick reference for common tasks.

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Image Management

```bash
# Upload all images to R2
npm run upload:images

# Upload single image
npm run upload:image public/images/logo.png

# Watch and auto-upload
npm run watch:images
```

## Deployment

```bash
# Full deployment (build + upload assets + deploy worker)
npm run deploy:full

# Deploy code only
npm run deploy

# Just build
npm run build
```

## Cloudflare Operations

```bash
# Login to Cloudflare
npx wrangler login

# Check who you're logged in as
npx wrangler whoami

# List R2 buckets
npx wrangler r2 bucket list

# List objects in bucket
npx wrangler r2 object list static-robray-net

# Upload to R2 manually
npx wrangler r2 object put static-robray-net/images/file.jpg --file=path/to/file.jpg

# Delete from R2
npx wrangler r2 object delete static-robray-net/images/file.jpg

# View deployment logs
npx wrangler pages logs des4800-robray-net-site-production

# Tail logs in real-time
npx wrangler pages logs des4800-robray-net-site-production --tail
```

## File Locations

| What | Where |
|------|-------|
| Pages | `src/pages/*.astro` |
| Layouts | `src/layouts/*.astro` |
| Components | `src/components/*.astro` |
| Static files | `public/` |
| Images for R2 | `public/images/` |
| Config | `astro.config.mjs` |
| Worker config | `wrangler.toml` |
| Deploy scripts | `scripts/` |

## URLs

| Resource | URL |
|----------|-----|
| Production site | https://des4800.robray.net |
| Static assets | https://static.robray.net |
| Dev server | http://localhost:4321 |
| Cloudflare Dashboard | https://dash.cloudflare.com |

## Image Usage

```astro
<!-- Direct URL -->
<img src="https://static.robray.net/images/logo.png" alt="Logo" />

<!-- With constant -->
---
const CDN = 'https://static.robray.net';
---
<img src={`${CDN}/images/logo.png`} alt="Logo" />
```

## GitHub Actions

**Triggers:**
- Push to `main` → Deploys code
- Changes in `public/images/` → Uploads images

**Manual trigger:**
1. Go to Actions tab
2. Select workflow
3. Click "Run workflow"

## Common Tasks

### Add a new page

1. Create `src/pages/about.astro`
2. Becomes `https://des4800.robray.net/about`

### Add a new image

```bash
# 1. Add to public/images/
cp ~/Downloads/hero.jpg public/images/

# 2. Upload to R2
npm run upload:image public/images/hero.jpg

# 3. Use in Astro
<img src="https://static.robray.net/images/hero.jpg" alt="Hero" />
```

### Update an existing page

1. Edit `src/pages/*.astro`
2. Save (hot reload in dev)
3. Push to deploy: `git push origin main`

### Deploy everything

```bash
npm run deploy:full
```

## Troubleshooting

### Dev server won't start
```bash
rm -rf node_modules .astro
npm install
npm run dev
```

### Build fails
```bash
npm run astro check
```

### Images not uploading
```bash
npx wrangler whoami
npx wrangler r2 bucket list
```

### Can't find command
```bash
# Ensure you're in the project directory
cd /Users/006504390/Documents/GitHub/des4800

# Check node/npm
node --version
npm --version
```

## Package.json Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build + deploy worker |
| `npm run deploy:full` | Full deployment (script) |
| `npm run upload:images` | Upload all images |
| `npm run upload:image` | Upload single image |
| `npm run watch:images` | Watch and auto-upload |

## Environment Setup

```bash
# First time setup
npm install
npx wrangler login
./scripts/setup-r2.sh

# Configure DNS in Cloudflare Dashboard:
# 1. R2 → static-robray-net → Settings → Custom Domains → Add static.robray.net
# 2. DNS → Add A/CNAME for des4800 subdomain

# Deploy
npm run deploy:full
```

## Documentation Quick Links

- [QUICKSTART.md](./QUICKSTART.md) - Getting started
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [IMAGES.md](./IMAGES.md) - Image management
- [ARCHITECTURE.md](./ARCHITECTURE.md) - How it works
- [README.md](./README.md) - Main documentation

