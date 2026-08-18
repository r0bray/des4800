# ✨ Setup Complete!

Your DES4800 Astro website is fully configured and ready to develop and deploy.

## 🎯 What's Configured and Working

### ✅ Core Project
- **Astro 5.x** with TypeScript
- **Cloudflare Workers** adapter (SSR at the edge via `@astrojs/cloudflare`)
- **R2 integration** for static assets and images
- **`wrangler.toml`** configured with `main = "dist/_worker.js"` and `[assets] directory = "dist"`

### ✅ Deployment
- **`npm run deploy:full`** — full deployment via `scripts/deploy.sh`: builds the site, uploads `_astro` CSS/JS, uploads public assets, uploads all images, deploys the Worker
- **`npm run deploy`** — quick deploy: `npm run build && wrangler deploy`
- **GitHub Actions** — `.github/workflows/deploy.yml` auto-deploys on push to `main`

### ✅ Image System
- `public/images/` — local staging area (gitignored)
- Images uploaded to R2 bucket `static-robray-net`, served at `https://static.robray.net/images/...`
- Upload scripts: `scripts/upload-images.sh`, `scripts/upload-single-image.sh`, `scripts/watch-images.sh`

### ✅ Domains
- **`des4800.robray.net`** → Cloudflare Worker `des4800-robray-net-site-production` (Worker custom domain)
- **`static.robray.net`** → R2 bucket `static-robray-net` (bucket custom domain)

### ✅ CI/CD
- **`.github/workflows/deploy.yml`** — triggers on push to `main`, deploys code and built assets
- **Secrets configured**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

### ✅ Documentation
- `README.md` — Main documentation
- `DEPLOYMENT.md` — Full deployment guide
- `IMAGES.md` — Image management guide
- `CHEATSHEET.md` — Quick reference
- `ARCHITECTURE.md` — System architecture
- `public/images/README.md` — Image directory guide

---

## 🚀 The Two Main Workflows

### Code Changes → Deploy

```
Edit code in src/
      ↓
Option A: git push origin main
      ↓
GitHub Actions: install → build → upload _astro to R2 → upload favicon → deploy Worker
      ↓
Live at https://des4800.robray.net

Option B: npm run deploy:full  (run locally, includes image upload)
Option C: npm run deploy       (build + deploy Worker only)
```

### Images → R2 → CDN

```
Copy image to public/images/
      ↓
Option A: npm run deploy:full        ← includes image upload, use if deploying anyway
Option B: npm run upload:images      ← upload all images, no code deploy
Option C: npm run upload:image <path> ← upload one image
Option D: npm run watch:images       ← auto-upload on file change (dev mode)
      ↓
Available at https://static.robray.net/images/your-image.jpg
```

> ⚠️ `public/images/` is gitignored. Images are never committed to git and are never uploaded by GitHub Actions. Always upload images locally before or during deployment.

---

## 🔧 npm Scripts Reference

### Development
```bash
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Images
```bash
npm run upload:images          # Upload all images in public/images/ to R2
npm run upload:image <path>    # Upload a single image to R2
npm run watch:images           # Watch public/images/ and auto-upload on change
```

### Deployment
```bash
npm run deploy        # Build + deploy Worker (no image upload)
npm run deploy:full   # Build + upload _astro + upload images + deploy Worker
```

---

## 🌐 URLs

| Resource | URL |
|----------|-----|
| **Production site** | https://des4800.robray.net |
| **Images / static assets CDN** | https://static.robray.net |
| **Dev server** | http://localhost:4321 |
| **Cloudflare Dashboard** | https://dash.cloudflare.com |

---

## 📦 Project Structure

```
des4800/
├── src/
│   ├── pages/              # Site pages (*.astro)
│   └── layouts/            # Reusable layouts
│
├── public/
│   ├── images/             # 📸 Local image staging (gitignored)
│   │   ├── .gitkeep
│   │   └── README.md
│   └── favicon.svg
│
├── scripts/
│   ├── deploy.sh              # Full deployment script
│   ├── upload-images.sh       # Batch image upload
│   ├── upload-single-image.sh # Single image upload
│   ├── watch-images.sh        # File watcher / auto-upload
│   └── setup-r2.sh            # R2 bucket setup (first-time)
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # Auto-deploy on push to main
│
├── astro.config.mjs           # Astro + Cloudflare adapter config
├── wrangler.toml              # Cloudflare Worker config
├── package.json               # Dependencies + npm scripts
└── tsconfig.json              # TypeScript config
```

---

## 💡 Key Tips

1. **`deploy:full` is the one-stop command.** It builds, uploads all assets and images, and deploys the Worker. Run it when you want everything synced.

2. **Images are gitignored — upload them manually.** GitHub Actions does not touch `public/images/`. Run `npm run upload:images` or `npm run deploy:full` to publish images to R2.

3. **First time using Wrangler?** Run `npx wrangler login` first to authenticate. This opens a browser OAuth flow.

4. **Quick image check:** After uploading, verify an image is live with:
   ```bash
   curl -I https://static.robray.net/images/your-image.jpg
   ```

5. **Worker logs:** Tail live request logs with:
   ```bash
   npx wrangler tail des4800-robray-net-site-production
   ```

6. **Two terminals for active development:**
   - Terminal 1: `npm run dev`
   - Terminal 2: `npm run watch:images` (auto-uploads as you work)

7. **Optimize images before uploading** — use [Squoosh](https://squoosh.app/), [ImageOptim](https://imageoptim.com/), or CLI tools to compress before running upload scripts.

---

## 📚 Documentation Map

- ⚡ **Quick commands?** → [CHEATSHEET.md](./CHEATSHEET.md)
- 📦 **Deploying?** → [DEPLOYMENT.md](./DEPLOYMENT.md)
- 📸 **Working with images?** → [IMAGES.md](./IMAGES.md)
- 🏗️ **Understanding the system?** → [ARCHITECTURE.md](./ARCHITECTURE.md)
- 📖 **Full overview?** → [README.md](./README.md)

---

## 🎉 You're All Set!

- ✅ Astro site with Cloudflare Workers SSR
- ✅ R2 image/asset storage with CDN
- ✅ Automated deployment via GitHub Actions
- ✅ Full local deployment with `npm run deploy:full`
- ✅ Image workflow with upload scripts and watch mode

**Start developing:**
```bash
npm run dev
# → http://localhost:4321
```

**Deploy when ready:**
```bash
npm run deploy:full
```
