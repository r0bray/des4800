# Image Upload Guide

Complete guide for managing static images with R2 bucket storage.

## Overview

Static images are stored separately in the R2 bucket and served via CDN at `https://static.robray.net/images/`. This approach:

- ✅ Separates content from code
- ✅ Enables instant image updates without redeployment
- ✅ Provides global CDN distribution
- ✅ Reduces deployment bundle size
- ✅ No egress fees

## Quick Start

### 1. Add Images to Directory

Place your local source images in `public/images/`. This directory is intended as a local staging area for uploads to R2 and should not be used for committed image assets:

```bash
# Example structure
public/images/
├── logo.png
├── hero/
│   └── banner.jpg
└── products/
    ├── item-1.jpg
    └── item-2.jpg
```

### 2. Upload to R2

**Option A: Upload all images**
```bash
npm run upload:images
# or
./scripts/upload-images.sh
```

**Option B: Upload single image**
```bash
npm run upload:image public/images/logo.png
# or
./scripts/upload-single-image.sh public/images/logo.png
```

**Option C: Watch and auto-upload**
```bash
npm run watch:images
# or
./scripts/watch-images.sh
```

This starts a file watcher that automatically uploads images when you add or modify them.

### 3. Use in Astro

```astro
---
const CDN_URL = 'https://static.robray.net';
---

<img src={`${CDN_URL}/images/logo.png`} alt="Logo" />
<img src={`${CDN_URL}/images/hero/banner.jpg`} alt="Hero" />
```

## Upload Methods

### Method 1: Manual Upload (Immediate)

Best for: Quick uploads, one-time images, immediate updates

```bash
# Upload all images
npm run upload:images

# Upload specific image
npm run upload:image public/images/new-logo.png

# Upload from outside project (downloads, etc)
./scripts/upload-single-image.sh ~/Downloads/photo.jpg
```

### Method 2: Watch Mode (Development)

Best for: Active development, frequent image changes

```bash
npm run watch:images
```

Leave this running in a terminal. When you add/modify images in `public/images/`, they're automatically uploaded to R2.

**Requirements**: Requires `fswatch` (installs automatically via Homebrew on macOS)

### Method 3: Local upload scripts

Best for: the normal workflow in this repo

Use the local upload commands directly after adding or updating files in `public/images/`:

```bash
npm run upload:images
# or
npm run upload:image public/images/path/to/file.jpg
```

Because `public/images/` is a local staging area, image files there should not be relied on as committed repository assets.

## Workflow Examples

### Adding a New Image

```bash
# 1. Copy image to directory
cp ~/Downloads/hero.jpg public/images/hero/

# 2. Upload immediately
npm run upload:image public/images/hero/hero.jpg

# 3. Use in your Astro page
# In src/pages/index.astro:
<img src="https://static.robray.net/images/hero/hero.jpg" alt="Hero" />

# 4. Reference the uploaded CDN image in code
# Example:
# <img src="https://static.robray.net/images/hero/hero.jpg" alt="Hero" />
```

### Batch Upload During Development

```bash
# Terminal 1: Run dev server
npm run dev

# Terminal 2: Watch for image changes
npm run watch:images

# Terminal 3: Work on your images
# Add/edit images in public/images/
# They upload automatically!
```

### Updating an Existing Image

**Option A: Replace with same filename** (recommended)
```bash
# Just upload the new version
npm run upload:image public/images/logo.png

# Note: May be cached - consider versioning for immediate updates
```

**Option B: Version the filename**
```bash
# Upload with new version
cp ~/Downloads/logo-new.png public/images/logo-v2.png
npm run upload:image public/images/logo-v2.png

# Update code to use logo-v2.png
```

**Option C: Delete then upload**
```bash
# Delete old version
npx wrangler r2 object delete static-robray-net/images/logo.png

# Upload new version
npm run upload:image public/images/logo.png
```

## Using Images in Astro

### Basic Usage

```astro
<img 
  src="https://static.robray.net/images/logo.png" 
  alt="Logo"
  width="200"
  height="100"
/>
```

### With Constants

```astro
---
const STATIC_CDN = 'https://static.robray.net';
const images = {
  logo: `${STATIC_CDN}/images/logo.png`,
  hero: `${STATIC_CDN}/images/hero/banner.jpg`,
};
---

<img src={images.logo} alt="Logo" />
<img src={images.hero} alt="Hero Banner" />
```

### Create a Helper Component

```astro
---
// src/components/CDNImage.astro
interface Props {
  src: string; // path relative to /images/
  alt: string;
  width?: number;
  height?: number;
  class?: string;
}

const { src, alt, width, height, class: className } = Astro.props;
const CDN_URL = 'https://static.robray.net';
const fullSrc = `${CDN_URL}/images/${src}`;
---

<img 
  src={fullSrc} 
  alt={alt} 
  width={width} 
  height={height} 
  class={className}
/>
```

Usage:
```astro
---
import CDNImage from '../components/CDNImage.astro';
---

<CDNImage src="logo.png" alt="Logo" width={200} />
<CDNImage src="hero/banner.jpg" alt="Hero" />
```

### Responsive Images

```astro
---
const CDN = 'https://static.robray.net/images';
---

<picture>
  <source 
    srcset={`${CDN}/hero/banner-mobile.jpg`} 
    media="(max-width: 768px)"
  />
  <source 
    srcset={`${CDN}/hero/banner-desktop.jpg`} 
    media="(min-width: 769px)"
  />
  <img 
    src={`${CDN}/hero/banner-desktop.jpg`} 
    alt="Hero Banner"
  />
</picture>
```

### GitHub Actions Integration

The primary image workflow for this repo is local upload via `npm run upload:images` or `npm run upload:image ...` after placing files in `public/images/`.

### Upload trigger

Images are uploaded when you run the local upload commands:

```bash
npm run upload:images
# or
npm run upload:image public/images/path/to/file.jpg
```

That local upload step is the intended trigger for publishing files from `public/images/` to `https://static.robray.net/images/`.

## Advanced Usage

### List Uploaded Images

```bash
npx wrangler r2 object list static-robray-net --prefix=images/
```

### Download an Image

```bash
npx wrangler r2 object get static-robray-net/images/logo.png --file=logo.png
```

### Delete an Image

```bash
npx wrangler r2 object delete static-robray-net/images/old-image.jpg
```

### Check Image URL

```bash
curl -I https://static.robray.net/images/logo.png
```

Should return `200 OK` if uploaded successfully.

## Best Practices

### 1. Optimize Before Upload

Always optimize images before uploading:

**Tools:**
- [Squoosh](https://squoosh.app/) - Web-based
- [ImageOptim](https://imageoptim.com/) - macOS app
- [TinyPNG](https://tinypng.com/) - Web-based
- CLI: `imageoptim`, `jpegoptim`, `optipng`

**Example with CLI:**
```bash
# Install
brew install jpegoptim optipng

# Optimize JPEGs
jpegoptim --size=100k public/images/*.jpg

# Optimize PNGs
optipng -o7 public/images/*.png

# Then upload
npm run upload:images
```

### 2. Use Descriptive Filenames

❌ Bad:
```
img1.jpg, photo.png, pic.jpg
```

✅ Good:
```
hero-banner-2024.jpg, product-thumbnail-blue.png, team-photo-office.jpg
```

### 3. Organize with Subdirectories

```
public/images/
├── logos/
│   ├── logo-white.svg
│   └── logo-dark.svg
├── heroes/
│   ├── home-hero.jpg
│   └── about-hero.jpg
├── products/
│   └── thumbnails/
└── team/
```

### 4. Use Appropriate Formats

- **JPG**: Photos, complex images (smaller file size)
- **PNG**: Graphics with transparency, simple graphics
- **SVG**: Logos, icons, simple graphics (scales perfectly)
- **WebP**: Modern format (smaller than JPG, supports transparency)

### 5. Consider Versioning

For frequently updated images:
```
logo-v1.png
logo-v2.png
hero-2024-01.jpg
hero-2024-02.jpg
```

Or use timestamps:
```
logo-20241010.png
```

### 6. Set Up Image Dimensions

Always specify width/height to prevent layout shift:

```astro
<img 
  src="https://static.robray.net/images/logo.png"
  alt="Logo"
  width="200"
  height="50"
/>
```

## Caching Behavior

Images on R2 are cached by Cloudflare's CDN:

- **First request**: Fetched from R2 origin (~50-100ms)
- **Subsequent requests**: Served from edge cache (~5-20ms)
- **Cache duration**: Controlled by Cloudflare (typically 1-7 days)

### Force Cache Refresh

If you update an image and need immediate updates:

1. **Version the filename** (recommended)
2. **Purge cache via Cloudflare Dashboard**
3. **Wait for TTL to expire** (automatic)

## Troubleshooting

### Images Not Uploading

```bash
# Check authentication
npx wrangler whoami

# Check bucket exists
npx wrangler r2 bucket list

# Try manual upload with verbose output
npx wrangler r2 object put static-robray-net/images/test.jpg --file=public/images/test.jpg
```

### 404 on Image URL

1. Verify upload succeeded:
   ```bash
   npx wrangler r2 object list static-robray-net --prefix=images/
   ```

2. Check custom domain is configured:
   - Cloudflare Dashboard → R2 → static-robray-net → Settings
   - Verify `static.robray.net` is listed

3. Test direct R2 URL vs CDN URL

### Watch Script Not Working

```bash
# Install fswatch
brew install fswatch

# Test fswatch
fswatch -1 public/images/

# Run watch script with debug
bash -x ./scripts/watch-images.sh
```

## npm Scripts Reference

```bash
# Upload all images
npm run upload:images

# Upload single image
npm run upload:image <path>

# Watch for changes
npm run watch:images

# Full deployment (code + images)
npm run deploy:full
```

## Related Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [public/images/README.md](./public/images/README.md) - Directory-specific guide

