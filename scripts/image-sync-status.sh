#!/bin/bash
set -euo pipefail

IMAGES_DIR="public/images"
MANIFEST_FILE="public/images-manifest.json"

if [ ! -f "$MANIFEST_FILE" ]; then
  echo "❌ Missing manifest: $MANIFEST_FILE"
  echo "Run npm run update:images-manifest:r2 first if you want remote-aware status."
  exit 1
fi

TMPDIR_STATUS=".wrangler/tmp/image-sync-status"
rm -rf "$TMPDIR_STATUS"
mkdir -p "$TMPDIR_STATUS"
cleanup() {
  rm -rf "$TMPDIR_STATUS"
}
trap cleanup EXIT

ITEMS_FILE="$TMPDIR_STATUS/items.tsv"

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
    if (!entry) {
      console.error("Manifest string entries must be non-empty.");
      process.exit(1);
    }
    console.log(`${entry}\t\t`);
    continue;
  }
  if (!entry || typeof entry.path !== "string" || !entry.path) {
    console.error("Manifest object entries must contain a non-empty path string.");
    process.exit(1);
  }
  const size = typeof entry.size === "number" ? String(entry.size) : "";
  const etag = typeof entry.etag === "string" ? entry.etag.replace(/^\"|\"$/g, "") : "";
  console.log(`${entry.path}\t${size}\t${etag}`);
}
' "$MANIFEST_FILE" | sed '/^$/d' | sort > "$ITEMS_FILE"

total_count=0
missing_count=0
changed_count=0
up_to_date_count=0

while IFS=$'\t' read -r relative_path expected_size expected_etag; do
  total_count=$((total_count + 1))
  destination="$IMAGES_DIR/$relative_path"

  if [ ! -f "$destination" ]; then
    missing_count=$((missing_count + 1))
    echo "MISSING  $relative_path"
    continue
  fi

  local_hash=$(md5 -q "$destination" 2>/dev/null || true)
  if [ -n "$expected_etag" ] && [ -n "$local_hash" ]; then
    if [ "$local_hash" = "$expected_etag" ]; then
      up_to_date_count=$((up_to_date_count + 1))
      echo "OK       $relative_path"
    else
      changed_count=$((changed_count + 1))
      echo "CHANGED  $relative_path (etag mismatch)"
    fi
    continue
  fi

  if [ -n "$expected_size" ]; then
    local_size=$(wc -c < "$destination" | xargs)
    if [ "$local_size" = "$expected_size" ]; then
      up_to_date_count=$((up_to_date_count + 1))
      echo "OK       $relative_path"
    else
      changed_count=$((changed_count + 1))
      echo "CHANGED  $relative_path (size mismatch: local $local_size, remote $expected_size)"
    fi
    continue
  fi

  up_to_date_count=$((up_to_date_count + 1))
  echo "OK       $relative_path (no remote metadata available)"
done < "$ITEMS_FILE"

echo ""
echo "Summary:"
echo "  Total manifest entries: $total_count"
echo "  Missing: $missing_count"
echo "  Changed: $changed_count"
echo "  Up to date: $up_to_date_count"
