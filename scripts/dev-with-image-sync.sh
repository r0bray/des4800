#!/bin/bash
set -u

WATCHER_PID=""
cleanup() {
  if [ -n "$WATCHER_PID" ] && kill -0 "$WATCHER_PID" 2>/dev/null; then
    kill "$WATCHER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "🖼️  Refreshing shared images from R2 before starting dev..."
if npm run sync:images:latest; then
  echo "✅ Image sync complete."
else
  echo "⚠️  Image sync failed. Continuing with existing local images."
fi

echo ""
echo "👀 Starting automatic image upload watcher for public/images/..."
if bash ./scripts/watch-images.sh &
then
  WATCHER_PID=$!
  echo "✅ Image watcher running in background (pid $WATCHER_PID)."
else
  echo "⚠️  Failed to start image watcher. Dev server will continue without auto-upload."
fi

echo ""
echo "🚀 Starting Astro dev server..."
npx astro dev
