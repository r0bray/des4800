# Static Images Directory

This directory is a local staging area for static images that are uploaded to the R2 bucket at `static-robray-net`.

## Quick Upload

Upload all images in this directory:
```bash
./scripts/upload-images.sh
```

Upload a single image:
```bash
./scripts/upload-single-image.sh public/images/logo.png
```

Watch for changes and auto-upload:

```bash
./scripts/watch-images.sh
```

## Usage in Astro

Once uploaded, reference images using the full CDN URL:

```astro
<img src="https://static.robray.net/images/logo.png" alt="Logo" />
```

Or create a helper constant:

```astro
---
const CDN_URL = 'https://static.robray.net';
---

<img src={`${CDN_URL}/images/logo.png`} alt="Logo" />
```

## Directory Structure

Subdirectories are preserved when uploading:

```
public/images/
├── logo.png              → https://static.robray.net/images/logo.png
├── hero/
│   └── banner.jpg        → https://static.robray.net/images/hero/banner.jpg
└── thumbnails/
    └── product-1.jpg     → https://static.robray.net/images/thumbnails/product-1.jpg
```

## Git workflow note

Files in `public/images/` are intended to be uploaded with the local scripts in this repo rather than committed as normal source assets. After adding or updating files here, run `npm run upload:images` or `npm run upload:image ...`.

## Best Practices

1. **Optimize images before uploading** - Use tools like ImageOptim, TinyPNG, or Squoosh
2. **Use descriptive filenames** - `hero-banner-2024.jpg` instead of `img1.jpg`
3. **Organize with subdirectories** - Group related images together
4. **Use appropriate formats**:
   - JPG for photos
   - PNG for graphics with transparency
   - SVG for logos and icons
   - WebP for modern browsers (with fallbacks)

## Cache Considerations

Images uploaded to R2 are cached globally by Cloudflare's CDN:
- First request: Fetched from R2 origin
- Subsequent requests: Served from edge cache

To "update" an image:
1. Delete the old version: `npx wrangler r2 object delete static-robray-net/images/old.jpg`
2. Upload the new version: `./scripts/upload-single-image.sh public/images/old.jpg`
3. Or use a versioned filename: `logo-v2.png`
