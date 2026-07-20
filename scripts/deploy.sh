#!/bin/bash
set -e

echo "🚀 Starting deployment process..."
echo ""

# Build the site
echo "📦 Building site..."
npm run build
echo "✅ Build complete"
echo ""

# Upload assets to R2
echo "☁️  Uploading assets to R2 bucket (static-robray-net)..."
if [ -d "dist/_astro" ]; then
  for file in dist/_astro/*; do
    if [ -f "$file" ]; then
      filename=$(basename "$file")
      echo "  Uploading: $filename"
      wrangler r2 object put static-robray-net/_astro/$filename --file="$file" --remote
    fi
  done
  echo "✅ Assets uploaded to R2"
else
  echo "⚠️  No _astro directory found - no assets to upload"
fi
echo ""

# Upload public assets if any
if [ -d "dist" ]; then
  echo "📁 Uploading public assets..."
  for file in dist/*.svg dist/*.ico dist/*.png dist/*.jpg 2>/dev/null; do
    if [ -f "$file" ]; then
      filename=$(basename "$file")
      echo "  Uploading: $filename"
      wrangler r2 object put static-robray-net/$filename --file="$file" --remote
    fi
  done
fi
echo ""

# Deploy to Cloudflare Workers
echo "🌐 Deploying to Cloudflare Workers (des4800-robray-net-site-production)..."
wrangler deploy
echo ""

echo "✨ Deployment complete!"
echo "🌐 Site: https://des4800.robray.net"
echo "📦 Assets: https://static.robray.net"

