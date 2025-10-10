# Quick Start Guide

Get your DES4800 site running in minutes!

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:4321 to see your site.

## Project Structure

```
des4800/
├── src/
│   ├── layouts/
│   │   └── Layout.astro         # Main layout with styles
│   ├── pages/
│   │   └── index.astro          # Homepage
│   └── env.d.ts                 # TypeScript definitions
├── public/
│   └── favicon.svg              # Site icon
├── scripts/
│   ├── deploy.sh                # Automated deployment
│   └── setup-r2.sh              # R2 bucket setup
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD
├── astro.config.mjs             # Astro + Cloudflare config
├── wrangler.toml                # Cloudflare Workers config
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript config
```

## Development

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run astro check
```

## Deployment (First Time)

### 1. Install & Build

```bash
npm install
npm run build
```

### 2. Setup Cloudflare

```bash
# Login to Cloudflare
npx wrangler login

# Create R2 bucket
./scripts/setup-r2.sh
```

### 3. Configure DNS

In Cloudflare Dashboard:

1. **For static.robray.net**:
   - Go to R2 → static-robray-net → Settings
   - Add custom domain: `static.robray.net`

2. **For des4800.robray.net**:
   - Will be configured automatically on first deployment

### 4. Deploy

```bash
./scripts/deploy.sh
```

On first run, enter:
- Project name: `des4800-robray-net-site-production`
- Branch: `main`

### 5. Verify

Visit https://des4800.robray.net to see your live site!

## Subsequent Deployments

After initial setup, deploying is simple:

```bash
./scripts/deploy.sh
```

That's it! The script handles:
- Building the site
- Uploading assets to R2
- Deploying to Cloudflare Workers

## Configuration

### Key Files

**astro.config.mjs**
- Cloudflare adapter settings
- Asset prefix for R2
- Site URL

**wrangler.toml**
- Worker name
- R2 bucket binding
- Compatibility settings

### Environment Variables

Copy `env.example` to `.env` for local overrides:

```bash
cp env.example .env
```

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

- Edit `src/pages/index.astro` to customize your homepage
- Add new pages in `src/pages/`
- Modify styles in `src/layouts/Layout.astro`
- Check `DEPLOYMENT.md` for detailed deployment info
- See `README.md` for full documentation

## Tech Stack

- **Astro 4.x** - Web framework
- **Cloudflare Workers** - Edge computing
- **Cloudflare R2** - Object storage
- **TypeScript** - Type safety
- **Wrangler** - Deployment CLI

## Resources

- [Astro Docs](https://docs.astro.build)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)

---

**Need help?** Check the detailed guides:
- `DEPLOYMENT.md` - Complete deployment walkthrough
- `README.md` - Full documentation
- `.github/SECRETS.md` - CI/CD setup

