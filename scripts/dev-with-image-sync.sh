#!/bin/bash
set -u

echo "🖼️  Refreshing shared images from R2 before starting dev..."
if npm run sync:images:latest; then
  echo "✅ Image sync complete. Starting Astro dev server..."
else
  echo "⚠️  Image sync failed. Starting Astro dev server with existing local images..."
fi

echo ""
exec npx astro dev
