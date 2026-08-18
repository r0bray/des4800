# Image Management Guide

How to add, upload, and use images in the DES4800 site.

## Overview

Images are managed with a simple local-to-CDN workflow:

1. **Store locally** in `public/images/` (local staging area, gitignored)
2. **Upload to R2** bucket `static-robray-net`
3. **Serve from CDN** at `https://static.robray.net/images/...`

This keeps image files out of git, reduces repo size, and gives you global CDN delivery with no egress fees.

> ⚠️ `public/images/` is gitignored. **Do not commit image files.** Only `README.md` and `.gitkeep` are tracked in that directory.

---

## Quick Start

### 0. Sync existing images from R2 (for collaborators)

After cloning the repo, pull the shared image library down from R2 into your local `public/images/`:

```bash
npm run sync:images
```

If you want your local `public/images/` to exactly match R2 and remove any extra local files that are not in the bucket:

```bash
npm run sync:images:delete
```

> Requires Wrangler access to the `static-robray-net` bucket.
>
> This sync is driven by the tracked file `public/images-manifest.json`, which lists the shared image paths to download from R2.

macOS/Windows junk files such as `.DS_Store` and `Thumbs.db` are excluded from the manifest and upload scripts.

### 1. Add your image

Copy or move the image into `public/images/` (use subdirectories to stay organized):

```bash
cp ~/Downloads/hero.jpg public/images/heroes/
```

### 2. Upload to R2

**If you're deploying anyway**, just run the full deploy — images are included automatically:

```bash
npm run deploy:full
```

**If you only need to upload images** (no code deployment):

```bash
# Upload all images
npm run upload:images

# Upload a single image
npm run upload:image public/images/heroes/hero.jpg
```

### 3. Use in Astro

Reference the CDN URL directly:

```astro
<img src="https://static.robray.net/images/heroes/hero.jpg" alt="Hero" />
```

---

## Upload Options

### `npm run deploy:full` (recommended)

The full deployment script automatically uploads everything in `public/images/` to R2 as part of the deployment. You don't need a separate image upload step if you're deploying anyway.

### `npm run sync:images` — Download shared images

Downloads every image listed in `public/images-manifest.json` from R2 into local `public/images/`:

```bash
npm run sync:images
```

This is the recommended first step for a collaborator who just cloned the repo and needs the non-git image assets.

If the manifest seems incomplete, refresh it from R2 first with `npm run update:images-manifest:r2`.

### `npm run sync:images:latest` — Refresh manifest and pull latest from R2

```bash
npm run sync:images:latest
```

This first rebuilds `public/images-manifest.json` from the current contents of the R2 bucket, then downloads those images into `public/images/`. This is the safest command when you want the latest shared image set.

`npm run dev` and `npm run preview` now attempt to run this automatically before starting their local servers, print a clear success or warning message, and still start Astro if the R2 sync step fails.

### `npm run sync:images:delete` — Exact mirror from R2

```bash
npm run sync:images:delete
```

Same as `sync:images`, but also removes local image files that are not listed in `public/images-manifest.json`. Use this when you want your local image directory to be a clean mirror of the shared image set.

### `npm run update:images-manifest` — Refresh the tracked manifest

```bash
npm run update:images-manifest
```

Scans local `public/images/` and rewrites `public/images-manifest.json`. Run this any time you add, rename, or remove images locally. The upload scripts also run this automatically.

### `npm run update:images-manifest:r2` — Rebuild manifest from R2

```bash
npm run update:images-manifest:r2
```

Queries the Cloudflare R2 bucket directly and rewrites `public/images-manifest.json` from the actual remote objects under `images/`. Use this if you know R2 contains more files than the current manifest.

### `npm run upload:images` — Upload all images

Uploads the entire contents of `public/images/` to R2:

```bash
npm run upload:images
```

Use this when you've added or updated multiple images without deploying code.

### `npm run upload:image` — Upload a single image

```bash
npm run upload:image public/images/logos/logo.png
npm run upload:image public/images/heroes/banner.jpg
```

Fastest option when you've changed just one file.

### `npm run watch:images` — Watch mode (development)

```bash
npm run watch:images
```

Runs a file watcher on `public/images/`. Any file you add or modify is automatically uploaded to R2. Great for active design work.

**Requirements:** Requires `fswatch` (auto-installed via Homebrew on macOS if missing).

---

## Using Images in Astro

### Direct URL

```astro
<img 
  src="https://static.robray.net/images/logo.png" 
  alt="Logo"
  width="200"
  height="100"
/>
```

### With a constant

```astro
---
const CDN = 'https://static.robray.net';
---

<img src={`${CDN}/images/logo.png`} alt="Logo" />
<img src={`${CDN}/images/heroes/banner.jpg`} alt="Hero Banner" />
```

### CDNImage helper component

```astro
---
// src/components/CDNImage.astro
interface Props {
  src: string;   // path relative to /images/
  alt: string;
  width?: number;
  height?: number;
  class?: string;
}

const { src, alt, width, height, class: className } = Astro.props;
const CDN_URL = 'https://static.robray.net';
const fullSrc = `${CDN_URL}/images/${src}`;
---

<img src={fullSrc} alt={alt} width={width} height={height} class={className} />
```

Usage:
```astro
---
import CDNImage from '../components/CDNImage.astro';
---

<CDNImage src="logos/logo.png" alt="Logo" width={200} />
<CDNImage src="heroes/banner.jpg" alt="Hero" />
```

### Responsive images

```astro
---
const CDN = 'https://static.robray.net/images';
---

<picture>
  <source srcset={`${CDN}/heroes/banner-mobile.jpg`} media="(max-width: 768px)" />
  <source srcset={`${CDN}/heroes/banner-desktop.jpg`} media="(min-width: 769px)" />
  <img src={`${CDN}/heroes/banner-desktop.jpg`} alt="Hero Banner" />
</picture>
```

---

## Best Practices

### Optimize before uploading

Always compress images before uploading to reduce CDN storage and improve load times:

- [Squoosh](https://squoosh.app/) — browser-based, excellent quality control
- [ImageOptim](https://imageoptim.com/) — macOS app, drag and drop
- [TinyPNG](https://tinypng.com/) — web-based for PNG/JPG

```bash
# CLI tools
brew install jpegoptim optipng

jpegoptim --size=200k public/images/*.jpg
optipng -o7 public/images/*.png
```

### Use descriptive filenames

❌ Avoid: `img1.jpg`, `photo.png`, `pic.jpg`

✅ Prefer: `hero-homepage.jpg`, `team-photo-2024.jpg`, `product-blue-thumbnail.png`

### Organize with subdirectories

```
public/images/
├── logos/
│   ├── logo-light.svg
│   └── logo-dark.svg
├── heroes/
│   ├── home-hero.jpg
│   └── about-hero.jpg
├── projects/
│   └── thumbnails/
└── team/
```

Paths are preserved when uploaded: `public/images/logos/logo-light.svg` → `https://static.robray.net/images/logos/logo-light.svg`

### Choose the right format

| Format | Best for |
|--------|----------|
| **JPG** | Photos, complex imagery |
| **PNG** | Graphics with transparency |
| **SVG** | Logos, icons (scales perfectly) |
| **WebP** | Modern format — smaller than JPG, supports transparency |

### Always specify width and height

Prevents layout shift (CLS):

```astro
<img src="..." alt="..." width="800" height="450" />
```

### Version frequently-updated images

For images that change often, version the filename rather than overwriting:

```
logo-v1.png → logo-v2.png
hero-2024-spring.jpg → hero-2024-fall.jpg
```

This avoids CDN cache issues.

---

## Advanced R2 Operations

```bash
# List all uploaded images
npx wrangler r2 object list static-robray-net --prefix=images/

# Download the whole shared image set into public/images/
npm run sync:images

# Refresh the tracked manifest from your local public/images/
npm run update:images-manifest

# Download an image from R2
npx wrangler r2 object get static-robray-net/images/logo.png --file=logo-download.png

# Delete an image from R2
npx wrangler r2 object delete static-robray-net/images/old-image.jpg

# Check if an image is live
curl -I https://static.robray.net/images/logo.png
# Should return: HTTP/2 200
```

---

## Caching

Images served from R2 via `static.robray.net` are cached at Cloudflare's edge:

- **First request**: ~50–100ms (fetched from R2)
- **Cached requests**: ~5–20ms (served from edge)

To force a cache refresh after updating an image:
1. **Rename the file** (e.g., `logo-v2.png`) — cleanest approach
2. **Purge via Cloudflare Dashboard** → Caching → Cache Purge → Custom Purge
3. **Wait for TTL** — cache expires automatically

---

## Troubleshooting

### Images not uploading

```bash
# Confirm Wrangler is authenticated
npx wrangler whoami

# Confirm the R2 bucket exists
npx wrangler r2 bucket list

# Try a manual upload with verbose output
npx wrangler r2 object put static-robray-net/images/test.jpg --file=public/images/test.jpg
```

### 404 on image URL

```bash
# Check if the image was actually uploaded
npx wrangler r2 object list static-robray-net --prefix=images/

# Verify the custom domain is configured
# Cloudflare Dashboard → R2 → static-robray-net → Settings → Custom Domains
# → static.robray.net should be listed and active
```

### Watch script not working

```bash
# Install fswatch
brew install fswatch

# Test fswatch directly
fswatch -1 public/images/

# Debug the watch script
bash -x ./scripts/watch-images.sh
```

### Image shows stale version

This is a CDN cache issue. Either:
- Upload with a new versioned filename (`logo-v2.png`)
- Purge the cache: Cloudflare Dashboard → Caching → Cache Purge → enter the image URL

---

## npm Scripts Reference

```bash
npm run upload:images          # Upload all images in public/images/
npm run upload:image <path>    # Upload a single image
npm run watch:images           # Watch public/images/ and auto-upload on change
npm run deploy:full            # Full deploy: build + upload assets + upload images + deploy Worker
```

---

## Related Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) — Full deployment guide
- [CHEATSHEET.md](./CHEATSHEET.md) — Quick command reference
- [public/images/README.md](./public/images/README.md) — Directory-specific notes
