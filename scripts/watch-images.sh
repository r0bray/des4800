#!/bin/bash
set -u

BUCKET_NAME="static-robray-net"
IMAGES_DIR="public/images"
STATE_FILE=".wrangler/tmp/watch-images-last-uploaded.txt"

. ./scripts/purge-image-cache-lib.sh

mkdir -p ".wrangler/tmp"

echo "👀 Watching for image changes in $IMAGES_DIR"
echo "📸 New images will be automatically uploaded to R2"
echo "🔖 Watcher version: relative-scan-v2"
echo "Press Ctrl+C to stop"
echo ""

# Create images directory if it doesn't exist
mkdir -p "$IMAGES_DIR"

# Check if fswatch is available
if ! command -v fswatch >/dev/null 2>&1; then
  echo "⚠️  fswatch not found. Installing..."
  echo ""
  echo "Installing fswatch via Homebrew..."
  brew install fswatch
fi

should_ignore_file() {
  filename=$(basename "$1")
  [ "$filename" = ".DS_Store" ] || [ "$filename" = "Thumbs.db" ] || [ "$filename" = ".gitkeep" ] || [ "$filename" = "README.md" ]
}

ensure_state_file() {
  if [ ! -f "$STATE_FILE" ]; then
    : > "$STATE_FILE"
  fi
}

get_file_signature() {
  file="$1"
  mtime=$(stat -f "%m" "$file" 2>/dev/null || echo 0)
  size=$(stat -f "%z" "$file" 2>/dev/null || echo 0)
  echo "$mtime:$size"
}

get_last_signature() {
  relative_path="$1"
  if [ ! -f "$STATE_FILE" ]; then
    return 1
  fi
  grep -F "${relative_path}|" "$STATE_FILE" | tail -n 1 | cut -d'|' -f2-
}

set_last_signature() {
  relative_path="$1"
  signature="$2"
  tmp_file="${STATE_FILE}.tmp"
  if [ -f "$STATE_FILE" ]; then
    grep -Fv "${relative_path}|" "$STATE_FILE" > "$tmp_file" || true
  else
    : > "$tmp_file"
  fi
  echo "${relative_path}|${signature}" >> "$tmp_file"
  mv "$tmp_file" "$STATE_FILE"
}

upload_file() {
  relative_path="$1"
  file="$IMAGES_DIR/$relative_path"

  if [ ! -f "$file" ]; then
    return
  fi

  if should_ignore_file "$file"; then
    return
  fi

  current_signature=$(get_file_signature "$file")
  previous_signature=$(get_last_signature "$relative_path" || true)

  if [ "$current_signature" = "$previous_signature" ]; then
    return
  fi

  echo "[$(date '+%H:%M:%S')] 📸 Detected: $relative_path"
  echo "  📝 Refreshing image manifest..."
  if ! node ./scripts/update-images-manifest.mjs >/dev/null; then
    echo "  ⚠️  Failed to update public/images-manifest.json"
  fi
  echo "  Uploading to R2..."
  echo "  R2 key: images/$relative_path"

  image_url="https://static.robray.net/images/$relative_path"
  if npx wrangler r2 object put "$BUCKET_NAME/images/$relative_path" --file="$file" --remote --cache-control "no-store" 2>/dev/null; then
    set_last_signature "$relative_path" "$current_signature"
    echo "  ✅ Uploaded: $image_url"
    purge_image_cache "$image_url"
  else
    echo "  ❌ Failed to upload: $relative_path"
  fi
  echo ""
}

scan_and_upload() {
  ensure_state_file
  node ./scripts/list-image-relative-paths.mjs | while read -r relative_path; do
    [ -n "$relative_path" ] || continue
    upload_file "$relative_path"
  done
}

# Initial scan so existing files are tracked/uploaded as needed
scan_and_upload

# Watch for any filesystem events, then rescan safely using repo-relative paths
fswatch -0 "$IMAGES_DIR" | while read -r -d "" _event; do
  scan_and_upload
done
