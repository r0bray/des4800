#!/bin/bash
set -e

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

echo "📸 Uploading image to R2..."
echo "  Local:  $FILE_PATH"
echo "  Remote: $r2_path"
echo ""

# Upload to R2
npx wrangler r2 object put "$BUCKET_NAME/$r2_path" --file="$FILE_PATH" --remote

echo ""
echo "✅ Image uploaded successfully!"
echo "🌐 URL: https://static.robray.net/$r2_path"
echo ""
echo "Use in Astro:"
echo "  <img src=\"https://static.robray.net/$r2_path\" alt=\"$filename\" />"

