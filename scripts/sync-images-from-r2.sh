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
  echo "Usage: ./scripts/sync-images-from-r2.sh [--delete] [--force]"
  echo ""
  echo "Options:"
  echo "  --delete    Remove local files in public/images that are not listed in the manifest"
  echo "  --force     Redownload files even if they already exist locally"
  echo ""
  echo "Notes:"
  echo "  This script uses public/images-manifest.json because this Wrangler version"
  echo "  can fetch known objects but cannot list objects by prefix."
  exit 0
fi

DELETE_EXTRA=false
FORCE_DOWNLOAD=false
for arg in "$@"; do
  if [ "$arg" = "--delete" ]; then
    DELETE_EXTRA=true
  fi
  if [ "$arg" = "--force" ]; then
    FORCE_DOWNLOAD=true
  fi
done

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

REMOTE_ITEMS_FILE="$TMPDIR_SYNC/remote-items.tsv"
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
  console.error("Manifest must be a JSON array.");
  process.exit(1);
}
for (const entry of manifest) {
  if (typeof entry === "string") {
    if (entry.length === 0) {
      console.error("Manifest string entries must be non-empty.");
      process.exit(1);
    }
    console.log(`${entry}\t\t`);
    continue;
  }
  if (!entry || typeof entry.path !== "string" || entry.path.length === 0) {
    console.error("Manifest object entries must contain a non-empty path string.");
    process.exit(1);
  }
  const size = typeof entry.size === "number" ? String(entry.size) : "";
  const etag = typeof entry.etag === "string" ? entry.etag.replace(/^\"|\"$/g, "") : "";
  console.log(`${entry.path}\t${size}\t${etag}`);
}
' "$MANIFEST_FILE" | sed '/^$/d' | sort > "$REMOTE_ITEMS_FILE"

cut -f1 "$REMOTE_ITEMS_FILE" > "$REMOTE_PATHS_FILE"

remote_count=$(wc -l < "$REMOTE_PATHS_FILE" | xargs)

if [ "$remote_count" = "0" ]; then
  echo "⚠️  No image entries found in $MANIFEST_FILE"
  exit 0
fi

echo "Found $remote_count manifest image(s)"
echo ""

count=0
downloaded_count=0
skipped_count=0
updated_count=0
while IFS=$'\t' read -r relative_path expected_size expected_etag; do
  count=$((count + 1))
  destination="$IMAGES_DIR/$relative_path"
  destination_dir=$(dirname "$destination")
  mkdir -p "$destination_dir"

  if [ "$FORCE_DOWNLOAD" != true ] && [ -f "$destination" ]; then
    local_hash=$(md5 -q "$destination" 2>/dev/null || true)
    if [ -n "$expected_etag" ] && [ -n "$local_hash" ]; then
      if [ "$local_hash" = "$expected_etag" ]; then
        skipped_count=$((skipped_count + 1))
        echo "[$count/$remote_count] Skipping unchanged file (etag match): $relative_path"
        continue
      fi

      updated_count=$((updated_count + 1))
      echo "[$count/$remote_count] Redownloading changed file (etag mismatch): $relative_path"
      npx wrangler r2 object get "$BUCKET_NAME/$PREFIX/$relative_path" --file "$destination" $REMOTE_FLAG
      continue
    fi

    if [ -n "$expected_size" ]; then
      local_size=$(wc -c < "$destination" | xargs)
      if [ "$local_size" = "$expected_size" ]; then
        skipped_count=$((skipped_count + 1))
        echo "[$count/$remote_count] Skipping unchanged file (size match): $relative_path"
        continue
      fi

      updated_count=$((updated_count + 1))
      echo "[$count/$remote_count] Redownloading changed file (size mismatch): $relative_path (local $local_size bytes, remote $expected_size bytes)"
      npx wrangler r2 object get "$BUCKET_NAME/$PREFIX/$relative_path" --file "$destination" $REMOTE_FLAG
      continue
    fi

    skipped_count=$((skipped_count + 1))
    echo "[$count/$remote_count] Skipping existing file (no remote metadata available): $relative_path"
    continue
  fi

  downloaded_count=$((downloaded_count + 1))
  echo "[$count/$remote_count] Downloading: $relative_path"
  npx wrangler r2 object get "$BUCKET_NAME/$PREFIX/$relative_path" --file "$destination" $REMOTE_FLAG

done < "$REMOTE_ITEMS_FILE"

if [ "$DELETE_EXTRA" = true ]; then
  echo ""
  echo "🧹 Removing local files that are not present in the manifest..."

  find "$IMAGES_DIR" -type f ! -name '.gitkeep' ! -name 'README.md' ! -name '.DS_Store' ! -name 'Thumbs.db' | sed "s#^$IMAGES_DIR/##" | sort > "$LOCAL_PATHS_FILE"

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
echo "⬇️  Downloaded new: $downloaded_count"
echo "🔄 Redownloaded changed: $updated_count"
echo "⏭️  Skipped unchanged/existing: $skipped_count"
if [ "$DELETE_EXTRA" = true ]; then
  echo "🧼 Extra local files not present in the manifest were removed"
fi
