#!/bin/bash

purge_image_cache() {
  image_url="$1"

  if node ./scripts/purge-image-cache.mjs "$image_url" >/dev/null 2>&1; then
    echo "  ✅ Purged Cloudflare cache: $image_url"
  else
    echo "  ⚠️  Upload succeeded, but cache purge failed: $image_url"
  fi
}
