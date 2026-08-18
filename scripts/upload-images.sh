#!/bin/bash
set -e

BUCKET_NAME="static-robray-net"
IMAGES_DIR="public/images"

echo "📝 Updating image manifest..."
node ./scripts/update-images-manifest.mjs

echo "📸 Uploading images to R2 bucket: $BUCKET_NAME"
echo ""

# Check if images directory exists
if [ ! -d "$IMAGES_DIR" ]; then
  echo "⚠️  No images directory found at $IMAGES_DIR"
  echo "Creating directory..."
  mkdir -p "$IMAGES_DIR"
  echo "✅ Directory created. Add images to $IMAGES_DIR and run this script again."
  exit 0
fi

# Check if there are any images
if [ -z "$(ls -A $IMAGES_DIR)" ]; then
  echo "⚠️  No images found in $IMAGES_DIR"
  echo "Add some images and run this script again."
  exit 0
fi

# Count total files (exclude local/system junk files)
total_files=$(find "$IMAGES_DIR" -type f ! -name '.DS_Store' ! -name 'Thumbs.db' ! -name '.gitkeep' ! -name 'README.md' | wc -l | xargs)
echo "Found $total_files file(s) to upload"
echo ""

# Upload all images recursively
count=0
find "$IMAGES_DIR" -type f ! -name '.DS_Store' ! -name 'Thumbs.db' ! -name '.gitkeep' ! -name 'README.md' | while read file; do
  # Get relative path from images directory
  relative_path="${file#$IMAGES_DIR/}"
  filename=$(basename "$file")
  
  count=$((count + 1))
  echo "[$count/$total_files] Uploading: images/$relative_path"
  
  # Upload to R2 with proper path structure
  npx wrangler r2 object put "$BUCKET_NAME/images/$relative_path" --file="$file" --remote
done

echo ""
echo "✅ All images uploaded successfully!"
echo "🌐 Images are now available at: https://static.robray.net/images/"
echo ""
echo "Example usage in Astro:"
echo '  <img src="https://static.robray.net/images/example.jpg" alt="Example" />'

