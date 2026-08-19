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
- Cloudflare adapter settings
- Asset prefix for R2 (`https://static.robray.net`)
- Site URL

**wrangler.toml**
- Worker name: `des4800-robray-net-site-production`
- R2 bucket binding
- Compatibility settings

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
   - Add new content in `src/components/`

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

**Need help?**
- `DEPLOYMENT.md` — Detailed deployment and troubleshooting
- `CHEATSHEET.md` — Quick command reference
- `IMAGES.md` — Image upload and management
- `README.md` — Complete documentation

