#!/bin/bash
set -u

BUCKET_NAME="static-robray-net"
IMAGES_DIR="public/images"

echo "👀 Watching for image changes in $IMAGES_DIR"
echo "📸 New images will be automatically uploaded to R2"
echo "Press Ctrl+C to stop"
echo ""

# Create images directory if it doesn't exist
mkdir -p "$IMAGES_DIR"

# Check if fswatch is available
if ! command -v fswatch &> /dev/null; then
  echo "⚠️  fswatch not found. Installing..."
  echo ""
  echo "Installing fswatch via Homebrew..."
  brew install fswatch
fi

should_ignore_file() {
  filename=$(basename "$1")
  [ "$filename" = ".DS_Store" ] || [ "$filename" = "Thumbs.db" ] || [ "$filename" = ".gitkeep" ] || [ "$filename" = "README.md" ]
}

# Function to upload a file
upload_file() {
  file="$1"

  # Only process actual files (not directories)
  if [ ! -f "$file" ]; then
    return
  fi

  if should_ignore_file "$file"; then
    return
  fi

  # Get relative path
  relative_path="${file#$IMAGES_DIR/}"

  echo "[$(date '+%H:%M:%S')] 📸 Detected: $relative_path"
  echo "  📝 Refreshing image manifest..."
  if ! node ./scripts/update-images-manifest.mjs >/dev/null; then
    echo "  ⚠️  Failed to update public/images-manifest.json"
  fi
  echo "  Uploading to R2..."

  # Upload to R2
  if npx wrangler r2 object put "$BUCKET_NAME/images/$relative_path" --file="$file" --remote 2>/dev/null; then
    echo "  ✅ Uploaded: https://static.robray.net/images/$relative_path"
  else
    echo "  ❌ Failed to upload: $relative_path"
  fi
  echo ""
}

# Export function for use in subshells
export -f upload_file
export BUCKET_NAME
export IMAGES_DIR

# Watch for changes
fswatch -0 "$IMAGES_DIR" | while read -d "" file; do
  upload_file "$file"
done

