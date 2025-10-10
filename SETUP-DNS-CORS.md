# DNS & CORS Setup Guide

## ✅ What's Already Done

- ✅ R2 bucket `static-robray-net` created
- ✅ Images uploaded to R2
- ✅ Worker deployed to Cloudflare Pages
- ✅ Compiled assets uploaded to R2

**Your temporary deployment URL**: https://3c014e4e.des4800-robray-net-site-production.pages.dev

## 🔧 Next Steps

### Step 1: Configure Custom Domain for R2 Bucket (static.robray.net)

This makes your assets accessible at `https://static.robray.net`

1. Go to **Cloudflare Dashboard**: https://dash.cloudflare.com
2. Click **R2** in the left sidebar
3. Click on **static-robray-net** bucket
4. Click the **Settings** tab
5. Scroll down to **Public Access** section
6. Click **Connect Domain** button
7. Enter: `static.robray.net`
8. Click **Continue**

Cloudflare will automatically:
- Create DNS records
- Issue SSL certificate
- Make assets publicly accessible

**Wait 2-5 minutes** for DNS propagation.

**Test it**: Visit https://static.robray.net/images/sample.svg

---

### Step 2: Set Up CORS for R2 Bucket

This allows des4800.robray.net to load assets from static.robray.net

1. In the **R2** → **static-robray-net** bucket page
2. Click **Settings** tab
3. Scroll to **CORS Policy** section
4. Click **Edit CORS policy**
5. Paste this configuration:

```json
[
  {
    "AllowedOrigins": [
      "https://des4800.robray.net",
      "https://*.des4800-robray-net-site-production.pages.dev",
      "http://localhost:4321"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

6. Click **Save**

**Note**: The CORS config is also saved in `r2-cors-config.json` for reference.

---

### Step 3: Configure Custom Domain for the Site (des4800.robray.net)

This makes your site accessible at `https://des4800.robray.net`

**Option A: Via Cloudflare Pages (Recommended)**

1. Go to **Workers & Pages** in Cloudflare Dashboard
2. Click on **des4800-robray-net-site-production**
3. Go to **Custom domains** tab
4. Click **Set up a custom domain**
5. Enter: `des4800.robray.net`
6. Click **Continue**

Cloudflare will automatically create the DNS record.

**OR**

**Option B: Manually via DNS**

1. Go to **DNS** for your `robray.net` domain
2. Click **Add record**
3. Configure:
   - **Type**: CNAME
   - **Name**: des4800
   - **Target**: `des4800-robray-net-site-production.pages.dev`
   - **Proxy status**: Proxied (orange cloud ON)
4. Click **Save**

Wait 2-5 minutes for DNS propagation.

---

## 🧪 Testing

### Test 1: R2 Bucket with Custom Domain

```bash
# Should return 200 OK
curl -I https://static.robray.net/images/sample.svg
```

### Test 2: Main Site

```bash
# Visit in browser
open https://des4800.robray.net

# Or with Pages URL
open https://3c014e4e.des4800-robray-net-site-production.pages.dev
```

### Test 3: Assets Loading

1. Visit https://des4800.robray.net
2. Open **DevTools** → **Network** tab
3. Reload page
4. Check for requests to `static.robray.net/_astro/`
5. Should see **200** status codes

---

## 📋 Complete Setup Checklist

- [ ] R2 custom domain configured (static.robray.net)
- [ ] CORS policy added to R2 bucket
- [ ] Custom domain configured for site (des4800.robray.net)
- [ ] DNS propagated (wait 2-5 minutes)
- [ ] Test: static.robray.net/images/sample.svg loads
- [ ] Test: des4800.robray.net site loads
- [ ] Test: Assets load from static.robray.net (check DevTools)

---

## 🎯 Expected Results

After completing all steps:

| URL | What You Should See |
|-----|---------------------|
| https://des4800.robray.net | Your Astro website |
| https://static.robray.net/images/sample.svg | Sample SVG image |
| https://static.robray.net/_astro/index.*.css | CSS file |
| https://static.robray.net/favicon.svg | Favicon |

---

## 🔧 Troubleshooting

### Assets Return 404

**Problem**: `static.robray.net/images/sample.svg` returns 404

**Solutions**:
1. Verify custom domain is active in R2 settings
2. Wait a few more minutes for DNS propagation
3. Check bucket name is correct: `static-robray-net`
4. Verify objects exist:
   ```bash
   # This command doesn't work with wrangler 4.x, check in dashboard
   ```

### CORS Errors in Browser

**Problem**: Console shows CORS errors

**Solutions**:
1. Verify CORS policy is saved in R2 bucket settings
2. Check the allowed origins include your domain
3. Clear browser cache
4. Try incognito/private window

### Site Not Loading

**Problem**: `des4800.robray.net` doesn't load

**Solutions**:
1. Check DNS records are created
2. Verify DNS is proxied (orange cloud)
3. Wait for DNS propagation (up to 5 minutes)
4. Try the `.pages.dev` URL first to verify worker is running

### SSL Certificate Errors

**Problem**: SSL/TLS errors

**Solutions**:
1. Wait for Cloudflare to provision certificate (automatic)
2. Check SSL/TLS mode is "Full" or "Full (strict)" in Cloudflare
3. May take up to 15 minutes for first-time setup

---

## 🚀 After Setup is Complete

Once everything is working:

1. **Update images**:
   ```bash
   npm run upload:images
   ```

2. **Deploy code changes**:
   ```bash
   git push origin main  # GitHub Actions handles it
   # Or manually:
   npm run deploy:full
   ```

3. **Watch mode for development**:
   ```bash
   npm run watch:images  # Auto-upload images as you add them
   ```

---

## 📚 Quick Reference

### Your URLs
- **Site**: https://des4800.robray.net
- **Assets**: https://static.robray.net
- **Temp URL**: https://3c014e4e.des4800-robray-net-site-production.pages.dev

### Your Resources
- **Worker**: des4800-robray-net-site-production
- **R2 Bucket**: static-robray-net
- **Domain**: robray.net (via Cloudflare DNS)

### Key Commands
```bash
npm run dev              # Local development
npm run upload:images    # Upload images to R2
npm run deploy:full      # Full deployment
npm run build            # Build only
```

---

Need help? Check the main documentation:
- [README.md](./README.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [IMAGES.md](./IMAGES.md)

