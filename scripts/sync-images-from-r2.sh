#!/bin/bash
set -euo pipefail

BUCKET_NAME="static-robray-net"
PREFIX="images"
IMAGES_DIR="public/images"
MANIFEST_FILE="public/images-manifest.json"
REMOTE_FLAG="--remote"

if [ "${1:-}" = "--help" ] || [ "${1:-}" = "-h" ]; then
  echo "Sync images from Cloudflare R2 into public/images/"
  echo ""
  echo "Usage: ./scripts/sync-images-from-r2.sh [--delete]"
  echo ""
  echo "Options:"
  echo "  --delete    Remove local files in public/images that are not listed in the manifest"
  echo ""
  echo "Notes:"
  echo "  This script uses public/images-manifest.json because this Wrangler version"
  echo "  can fetch known objects but cannot list objects by prefix."
  exit 0
fi

DELETE_EXTRA=false
if [ "${1:-}" = "--delete" ]; then
  DELETE_EXTRA=true
fi

if [ ! -f "$MANIFEST_FILE" ]; then
  echo "❌ Missing manifest: $MANIFEST_FILE"
  echo ""
  echo "This repo now uses a tracked image manifest to know which R2 image keys to download."
  echo "Generate it from a machine that already has the images with:"
  echo "  npm run update:images-manifest"
  exit 1
fi

TMPDIR_SYNC=".wrangler/tmp/image-sync"
rm -rf "$TMPDIR_SYNC"
mkdir -p "$TMPDIR_SYNC"
cleanup() {
  rm -rf "$TMPDIR_SYNC"
}
trap cleanup EXIT

REMOTE_PATHS_FILE="$TMPDIR_SYNC/remote-paths.txt"
LOCAL_PATHS_FILE="$TMPDIR_SYNC/local-paths.txt"

mkdir -p "$IMAGES_DIR"

echo "☁️  Syncing images from R2 bucket: $BUCKET_NAME"
echo "   Prefix: $PREFIX/"
echo "   Local:  $IMAGES_DIR"
echo "   Using manifest: $MANIFEST_FILE"
echo ""

node --input-type=module -e '
import fs from "node:fs";
const manifestPath = process.argv[1];
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
if (!Array.isArray(manifest)) {
  console.error("Manifest must be a JSON array of relative image paths.");
  process.exit(1);
}
for (const entry of manifest) {
  if (typeof entry !== "string" || entry.length === 0) {
    console.error("Manifest entries must be non-empty strings.");
    process.exit(1);
  }
  console.log(entry);
}
' "$MANIFEST_FILE" | sed '/^$/d' | sort > "$REMOTE_PATHS_FILE"

remote_count=$(wc -l < "$REMOTE_PATHS_FILE" | xargs)

if [ "$remote_count" = "0" ]; then
  echo "⚠️  No image entries found in $MANIFEST_FILE"
  exit 0
fi

echo "Found $remote_count manifest image(s)"
echo ""

count=0
while IFS= read -r relative_path; do
  count=$((count + 1))
  destination="$IMAGES_DIR/$relative_path"
  destination_dir=$(dirname "$destination")
  mkdir -p "$destination_dir"

  echo "[$count/$remote_count] Downloading: $relative_path"
  npx wrangler r2 object get "$BUCKET_NAME/$PREFIX/$relative_path" --file "$destination" $REMOTE_FLAG

done < "$REMOTE_PATHS_FILE"

if [ "$DELETE_EXTRA" = true ]; then
  echo ""
  echo "🧹 Removing local files that are not present in the manifest..."

  find "$IMAGES_DIR" -type f ! -name '.gitkeep' ! -name 'README.md' | sed "s#^$IMAGES_DIR/##" | sort > "$LOCAL_PATHS_FILE"

  while IFS= read -r local_relative_path; do
    if ! grep -Fxq "$local_relative_path" "$REMOTE_PATHS_FILE"; then
      echo "Removing: $local_relative_path"
      rm -f "$IMAGES_DIR/$local_relative_path"
    fi
  done < "$LOCAL_PATHS_FILE"
fi

echo ""
echo "✅ Image sync complete!"
echo "📁 Local images are available in: $IMAGES_DIR"
if [ "$DELETE_EXTRA" = true ]; then
  echo "🧼 Extra local files not present in the manifest were removed"
fi
