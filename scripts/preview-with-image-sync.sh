#!/bin/bash
set -u

echo "🖼️  Refreshing shared images from R2 before starting preview..."
if npm run sync:images:latest; then
  echo "✅ Image sync complete. Starting Astro preview server..."
else
  echo "⚠️  Image sync failed. Starting Astro preview server with existing local images..."
fi

echo ""
exec npx astro preview
