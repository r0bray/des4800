#!/bin/bash
set -e

echo "🪣 Setting up R2 bucket for static assets..."
echo ""

# Check if bucket exists
echo "Checking if R2 bucket 'static-robray-net' exists..."
if wrangler r2 bucket list | grep -q "static-robray-net"; then
  echo "✅ Bucket 'static-robray-net' already exists"
else
  echo "Creating R2 bucket 'static-robray-net'..."
  wrangler r2 bucket create static-robray-net
  echo "✅ Bucket created"
fi
echo ""

echo "📋 Next steps:"
echo "1. Configure custom domain 'static.robray.net' for the R2 bucket in Cloudflare dashboard"
echo "2. Go to R2 > static-robray-net > Settings > Custom Domains"
echo "3. Add 'static.robray.net' as a custom domain"
echo "4. Cloudflare will automatically create the necessary DNS records"
echo ""
echo "5. For the main site, add an A or CNAME record:"
echo "   - Name: des4800"
echo "   - Target: Your Cloudflare Pages/Workers domain"
echo ""
echo "Run 'wrangler r2 bucket list' to see all your buckets"

