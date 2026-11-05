# Quick Start Guide

Get your DES4800 site running in minutes!

## Installation

Requires Node.js 22+ (`.nvmrc` pins 24).

```bash
# Install dependencies
npm install

# Local environment variables (fill in Cloudflare credentials)
cp env.example .env

# Authenticate with Cloudflare (needed for image sync/upload)
npx wrangler login

# Start development server
npm run dev
```

Visit http://localhost:4321 to see your site.

`npm run dev` first tries to refresh `public/images-manifest.json` from R2 and download the shared images into `public/images/` (these are gitignored), then starts an image upload watcher (requires `fswatch`: `brew install fswatch`), then starts Astro. If Cloudflare auth is missing, it prints a warning and still starts with your existing local images. To pull images on their own: `npm run sync:images:latest`.

## Project Structure

```
des4800/
├── src/
│   ├── components/              # Shared and per-section components
│   ├── content/                 # Markdown collections (plasticity, projects)
│   ├── data/                    # Typed data (projects, soft goods)
│   ├── layouts/
│   │   └── Layout.astro         # Main layout
│   ├── pages/                   # index, plasticity, projects, soft-goods, making-your-own-tools
│   ├── styles/
│   │   └── global.css           # Global styles
│   ├── content.config.ts        # Content collection definitions
│   └── env.d.ts                 # TypeScript definitions
├── public/
│   ├── favicon.svg              # Site icon
│   ├── images/                  # Local image staging (gitignored, synced with R2)
│   └── images-manifest.json     # Tracked list of shared images in R2
├── scripts/                     # Deploy, image sync/upload/watch, cache purge scripts
│   ├── deploy.sh                # Automated deployment
│   └── setup-r2.sh              # R2 bucket setup
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD
├── astro.config.mjs             # Astro + Cloudflare config
├── wrangler.toml                # Cloudflare Workers config
├── env.example                  # Template for local .env
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript config
```

## Development

```bash
# Start dev server (image sync + watcher + hot reload)
npm run dev

# Build for production (runs `astro check` first)
npm run build

# Preview production build locally (also syncs images)
npm run preview

# Type checking only
npx astro check
```

## Deployment

### First-Time Setup (One Time)

1. Ensure you have:
   - Cloudflare account with Workers & R2 enabled
   - GitHub repository configured with `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets
   - R2 custom domain `static.robray.net` configured
   - Worker custom domain `des4800.robray.net` configured

2. That's it! GitHub Actions is already set up.

### Deploy Your Changes (Every Time)

**Push to main:**

```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions will automatically:
- ✅ Build the site
- ✅ Upload CSS/JS to R2
- ✅ Deploy the Worker

**Monitor progress:** https://github.com/r0bray/des4800/actions

**Verify:** Visit https://des4800.robray.net (give it 30 seconds after push)

## Troubleshooting Quick Starts

**Deployment failed in GitHub Actions?**
- Check https://github.com/r0bray/des4800/actions for logs
- Common cause: API token missing or expired permissions
- Verify secrets at: https://github.com/r0bray/des4800/settings/secrets/actions

**CSS not loading?**
- Hard refresh your browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Check that `https://static.robray.net/_astro/` assets are accessible

**Want to deploy locally instead?**
- Install dependencies: `npm install`
- Authenticate: `npx wrangler login`
- Deploy: `npm run deploy:full` (with images) or `npm run deploy` (code only)

## Configuration Files

**astro.config.mjs**
- Cloudflare adapter settings (SSR, `output: 'server'`)
- Asset prefix for R2 (`https://static.robray.net`)
- Site URL

**wrangler.toml**
- Worker name: `des4800-robray-net-site-production`
- `[assets]` directory (`./dist`)
- R2 bucket binding (`STATIC_BUCKET` → `static-robray-net`)
- Compatibility settings

**.env** (local only, gitignored; copy from `env.example`)
- `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ZONE_ID`
- Needed for cache purge and rebuilding the image manifest from R2

## Troubleshooting

### npm install fails

Try clearing cache:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Assets not loading

1. Check R2 bucket exists: `npx wrangler r2 bucket list`
2. Verify custom domain in Cloudflare dashboard
3. Check browser console for specific errors

### Deployment fails

1. Ensure you're logged in: `npx wrangler whoami`
2. Check you have Workers/R2 enabled on your account
3. Verify wrangler.toml settings

## Next Steps

1. **Make changes** to your site:
   - Edit pages in `src/pages/`
   - Modify styles in `src/layouts/Layout.astro` or `src/styles/global.css`
   - Add components in `src/components/`
   - Add Markdown content in `src/content/plasticity/` or `src/content/projects/`

2. **Test locally:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:4321

3. **Deploy:**
   ```bash
   git push origin main
   ```

4. **Verify** at https://des4800.robray.net

For more details, see:
- `DEPLOYMENT.md` — Detailed deployment walkthrough
- `CHEATSHEET.md` — Quick command reference
- `README.md` — Full documentation

## Tech Stack

- **Astro 7.x** - Web framework
- **Cloudflare Workers** - Edge computing
- **Cloudflare R2** - Object storage
- **TypeScript** - Type safety
- **Wrangler** - Deployment CLI

## Resources

- [Astro Docs](https://docs.astro.build)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)

---

**Need help?**
- `DEPLOYMENT.md` — Detailed deployment and troubleshooting
- `CHEATSHEET.md` — Quick command reference
- `IMAGES.md` — Image upload and management
- `README.md` — Complete documentation

