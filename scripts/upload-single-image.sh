#!/bin/bash
set -e

. ./scripts/purge-image-cache-lib.sh

BUCKET_NAME="static-robray-net"

# Check if file argument is provided
if [ -z "$1" ]; then
  echo "Usage: ./scripts/upload-single-image.sh <path-to-image>"
  echo ""
  echo "Examples:"
  echo "  ./scripts/upload-single-image.sh public/images/logo.png"
  echo "  ./scripts/upload-single-image.sh ~/Downloads/photo.jpg"
  exit 1
fi

FILE_PATH="$1"

# Check if file exists
if [ ! -f "$FILE_PATH" ]; then
  echo "❌ Error: File not found: $FILE_PATH"
  exit 1
fi

filename=$(basename "$FILE_PATH")
if [ "$filename" = ".DS_Store" ] || [ "$filename" = "Thumbs.db" ]; then
  echo "⚠️  Skipping local/system junk file: $FILE_PATH"
  exit 0
fi


# Get filename
filename=$(basename "$FILE_PATH")

# Determine if file is in public/images or external
if [[ "$FILE_PATH" == public/images/* ]]; then
  # File is already in public/images, preserve path structure
  relative_path="${FILE_PATH#public/images/}"
  r2_path="images/$relative_path"
else
  # External file, upload to root of images
  r2_path="images/$filename"
fi

if [[ "$FILE_PATH" == public/images/* ]]; then
  echo "📝 Updating image manifest..."
  node ./scripts/update-images-manifest.mjs
  echo ""
fi

echo "📸 Uploading image to R2..."
echo "  Local:  $FILE_PATH"
echo "  Remote: $r2_path"
echo ""

# Upload to R2
npx wrangler r2 object put "$BUCKET_NAME/$r2_path" --file="$FILE_PATH" --remote --cache-control "no-store"

image_url="https://static.robray.net/$r2_path"

echo ""
echo "✅ Image uploaded successfully!"
echo "🌐 URL: $image_url"
purge_image_cache "$image_url"
echo ""
echo "Use in Astro:"
echo "  <img src=\"https://static.robray.net/$r2_path\" alt=\"$filename\" />"

