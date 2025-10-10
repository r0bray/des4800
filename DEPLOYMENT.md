# Deployment Guide

Complete step-by-step guide to deploy your Astro site to Cloudflare Workers with R2 assets.

## Prerequisites

Before deploying, ensure you have:

1. **Cloudflare Account**: With Workers and R2 enabled
2. **Wrangler CLI**: Installed and authenticated
3. **Node.js**: Version 18 or higher
4. **Domain**: robray.net configured in Cloudflare DNS

## Step 1: Install Dependencies

```bash
npm install
```

This installs:
- Astro 4.x
- @astrojs/cloudflare adapter
- Wrangler CLI
- TypeScript

## Step 2: Authenticate Wrangler

If you haven't already, authenticate with Cloudflare:

```bash
npx wrangler login
```

This opens a browser window to authorize the CLI.

## Step 3: Create R2 Bucket

Run the setup script or create manually:

```bash
# Option A: Use the setup script
./scripts/setup-r2.sh

# Option B: Manually create
npx wrangler r2 bucket create static-robray-net
```

Verify the bucket was created:

```bash
npx wrangler r2 bucket list
```

## Step 4: Configure R2 Custom Domain

1. Go to Cloudflare Dashboard
2. Navigate to **R2** → **static-robray-net** → **Settings**
3. Scroll to **Custom Domains**
4. Click **Connect Domain**
5. Enter `static.robray.net`
6. Click **Continue**
7. Cloudflare will automatically:
   - Create the necessary DNS records
   - Issue an SSL certificate
   - Configure the domain

**Note**: It may take a few minutes for the domain to become active.

## Step 5: Configure Main Site DNS

Add a record for your main site:

### Option A: Using Cloudflare Pages (Recommended)

1. After first deployment, Cloudflare Pages will provide a URL like:
   `des4800-robray-net-site-production.pages.dev`

2. Add a CNAME record:
   - **Type**: CNAME
   - **Name**: des4800
   - **Target**: `des4800-robray-net-site-production.pages.dev`
   - **Proxy status**: Proxied (orange cloud)

### Option B: Using Workers Custom Domain

1. Go to **Workers & Pages** → **des4800-robray-net-site-production**
2. Go to **Settings** → **Domains & Routes**
3. Click **Add Custom Domain**
4. Enter `des4800.robray.net`
5. Cloudflare will automatically create the DNS record

## Step 6: Initial Build

Build the site locally to verify everything works:

```bash
npm run build
```

This will:
- Run TypeScript checks
- Build the Astro site
- Output to `dist/` directory

## Step 7: Deploy

### Option A: Full Deployment (Recommended)

Use the deployment script which handles everything:

```bash
./scripts/deploy.sh
```

This script will:
1. Build the site
2. Upload assets to R2
3. Deploy the Worker

### Option B: Manual Deployment

If you prefer manual control:

```bash
# 1. Build the site
npm run build

# 2. Upload assets to R2
for file in dist/_astro/*; do
  filename=$(basename "$file")
  npx wrangler r2 object put static-robray-net/_astro/$filename --file="$file"
done

# 3. Upload favicon
npx wrangler r2 object put static-robray-net/favicon.svg --file=dist/favicon.svg

# 4. Deploy to Cloudflare Pages
npx wrangler pages deploy dist
```

### First Time Deployment

On your first deployment, Wrangler will ask:

```
? Enter the name of your new project: › 
```

Enter: `des4800-robray-net-site-production`

```
? Enter the production branch name: ›
```

Enter: `main` (or your default branch)

## Step 8: Verify Deployment

After deployment completes:

1. **Check the Worker**:
   ```bash
   npx wrangler pages list
   ```

2. **Test the site**:
   - Visit https://des4800.robray.net
   - Open browser DevTools → Network tab
   - Verify assets load from https://static.robray.net

3. **Check asset loading**:
   - Look for requests to `static.robray.net/_astro/*`
   - Verify 200 status codes

## Troubleshooting

### Assets Return 404

**Problem**: CSS/JS files not loading from static.robray.net

**Solutions**:
1. Verify R2 bucket exists: `npx wrangler r2 bucket list`
2. Check assets were uploaded: 
   ```bash
   npx wrangler r2 object list static-robray-net
   ```
3. Verify custom domain is active in R2 settings
4. Check bucket has public access enabled

### Worker Not Found

**Problem**: des4800.robray.net returns 404 or "Worker not found"

**Solutions**:
1. Verify deployment succeeded: `npx wrangler pages list`
2. Check DNS record is correct and proxied
3. Wait a few minutes for DNS propagation
4. Try accessing via `.pages.dev` URL first

### CORS Errors

**Problem**: Browser console shows CORS errors for assets

**Solutions**:
1. In R2 bucket settings, configure CORS:
   ```json
   [
     {
       "AllowedOrigins": ["https://des4800.robray.net"],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedHeaders": ["*"],
       "MaxAgeSeconds": 3600
     }
   ]
   ```

### Build Fails

**Problem**: `npm run build` fails with TypeScript errors

**Solutions**:
1. Clear cache: `rm -rf .astro node_modules/.astro`
2. Reinstall: `npm install`
3. Check `tsconfig.json` is correct
4. Verify all `.astro` files have correct syntax

## Production Checklist

Before going live, verify:

- [ ] R2 bucket created and accessible
- [ ] Custom domain `static.robray.net` configured on R2
- [ ] DNS records for `des4800.robray.net` configured
- [ ] Assets uploaded to R2
- [ ] Worker deployed successfully
- [ ] SSL certificates active (automatic with Cloudflare)
- [ ] Site accessible at https://des4800.robray.net
- [ ] Assets loading from https://static.robray.net
- [ ] No console errors in browser DevTools

## Continuous Deployment

For automated deployments, consider:

1. **GitHub Actions**: Set up a workflow to deploy on push
2. **Cloudflare Pages Git Integration**: Connect your repository
3. **Wrangler Actions**: Use official Cloudflare GitHub Action

Example GitHub Actions workflow:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - name: Upload to R2
        run: ./scripts/deploy.sh
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## Useful Commands

```bash
# Check deployment status
npx wrangler pages list

# View logs
npx wrangler pages logs des4800-robray-net-site-production

# List R2 objects
npx wrangler r2 object list static-robray-net

# Delete an R2 object
npx wrangler r2 object delete static-robray-net/_astro/filename.js

# Deploy specific directory
npx wrangler pages deploy dist --project-name=des4800-robray-net-site-production
```

## Cost Estimation

Cloudflare pricing (as of 2024):

- **Workers**: Free tier includes 100,000 requests/day
- **R2**: 
  - Free tier: 10 GB storage, 1M Class A operations/month, 10M Class B operations/month
  - After free tier: $0.015/GB/month, minimal operation costs
- **Pages**: Free (included with Workers)

For a typical small site:
- **Expected cost**: $0/month (within free tier)

## Support

For issues:
- Astro: https://docs.astro.build
- Cloudflare Workers: https://discord.gg/cloudflaredev
- Wrangler: https://github.com/cloudflare/workers-sdk

