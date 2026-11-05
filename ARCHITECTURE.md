# Architecture Overview

## System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         INTERNET                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
          ┌───────────┴────────────┐
          │                        │
          ▼                        ▼
┌─────────────────┐      ┌──────────────────┐
│ des4800.        │      │ static.          │
│ robray.net      │      │ robray.net       │
│                 │      │                  │
│ (HTML/SSR)      │      │ (Static Assets)  │
└────────┬────────┘      └────────┬─────────┘
         │                        │
         │ Cloudflare DNS         │ Cloudflare DNS
         │                        │
         ▼                        ▼
┌─────────────────┐      ┌──────────────────┐
│ Cloudflare      │      │ Cloudflare R2    │
│ Workers         │      │ Bucket           │
│                 │      │                  │
│ des4800-robray- │      │ static-robray-   │
│ net-site-       │      │ net              │
│ production      │      │                  │
│                 │      │ /_astro/         │
│ • SSR Pages     │      │ • app.js         │
│ • Edge Compute  │      │ • styles.css     │
│ • Global CDN    │      │ • images         │
└─────────────────┘      └──────────────────┘
```

## Request Flow

### HTML Request (des4800.robray.net)

```
User Browser
    │
    ├─► Request: https://des4800.robray.net/
    │
    ▼
Cloudflare DNS
    │
    ├─► Resolves to Worker
    │
    ▼
Cloudflare Worker (SSR)
    │
    ├─► Executes Astro SSR
    ├─► Renders HTML
    ├─► Injects asset URLs (static.robray.net)
    │
    ▼
User Browser
    │
    └─► Receives HTML with asset links
```

### Asset Request (static.robray.net)

```
User Browser
    │
    ├─► Request: https://static.robray.net/_astro/app.abc123.js
    │
    ▼
Cloudflare DNS
    │
    ├─► Resolves to R2 Custom Domain
    │
    ▼
Cloudflare R2 Bucket
    │
    ├─► Retrieves: /_astro/app.abc123.js
    ├─► Serves via CDN
    │
    ▼
User Browser
    │
    └─► Receives and executes JS/CSS
```

## Infrastructure Components

### 1. Cloudflare Workers

**Name**: `des4800-robray-net-site-production`

**Purpose**: 
- Serves the site's HTML: a few pages are server-rendered per request (e.g. the homepage); most content pages are prerendered at build time (`export const prerender = true`) and served as static files from `dist/client/`
- Edge computing
- Dynamic content (404s for draft/hidden pages)

**Configuration**: `wrangler.toml` (the Astro Cloudflare adapter generates the final Worker config at `dist/server/wrangler.json` during build)

**Capabilities**:
- Runs at Cloudflare's edge (200+ data centers)
- Executes JavaScript at request time
- No cold starts
- Sub-millisecond response times

### 2. Cloudflare R2

**Bucket**: `static-robray-net`

**Purpose**:
- Static asset storage
- CSS files
- JavaScript bundles
- Images
- Fonts

**Configuration**: Custom domain in Cloudflare dashboard

**Benefits**:
- S3-compatible API
- No egress fees
- Global CDN distribution
- Automatic caching

### 3. Cloudflare DNS

**Domains**:

1. **des4800.robray.net**
   - Type: CNAME/A record
   - Target: Cloudflare Worker
   - Purpose: Main site

2. **static.robray.net**
   - Type: CNAME (auto-generated)
   - Target: R2 bucket
   - Purpose: Asset delivery

## Build & Deploy Pipeline

```
┌──────────────┐
│ Source Code  │
│ (Astro)      │
└──────┬───────┘
       │
       ├─► npm run build
       │
       ▼
┌──────────────┐
│ Build Output │
│ (dist/)      │
└──────┬───────┘
       │
       ├─────────────────┬─────────────────┐
       │                 │                 │
       ▼                 ▼                 ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ server/     │  │ client/     │  │ client/     │
│ entry.mjs   │  │ _astro/     │  │ *.html      │
│ (SSR)       │  │ (assets)    │  │ (prerender) │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       │                │                │
       ├─► Deploy       ├─► Upload       ├─► Deploy
       │   via          │   to R2        │   via
       │   Wrangler     │   Bucket       │   Wrangler
       │                │                │
       ▼                ▼                ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Cloudflare  │  │ static-     │  │ Cloudflare  │
│ Workers     │  │ robray-net  │  │ Workers     │
└─────────────┘  └─────────────┘  └─────────────┘
```

## Performance Characteristics

### Latency

- **HTML (Worker)**: 10-50ms (edge rendering)
- **Assets (R2)**: 5-20ms (CDN cached)
- **Total TTFB**: 15-70ms (globally distributed)

### Caching Strategy

**Worker (HTML)**:
- No caching (always fresh)
- SSR per request
- Configurable via Cache API if needed

**R2 (Assets)**:
- Automatic CDN caching
- Long cache duration (immutable URLs)
- Edge cached globally

### Scalability

- **Workers**: Scales to millions of requests
- **R2**: Unlimited storage
- **Cost**: Free tier covers most small-medium sites

## File Organization

### Source Structure

```
src/
├── components/             # Shared (SiteHeader) and per-section components
├── content/                # Markdown collections: plasticity/, projects/
├── data/                   # Typed data: projects.ts, soft-goods.ts
├── layouts/
│   └── Layout.astro        # Base layout
├── pages/                  # index, plasticity/, projects/, soft-goods/, making-your-own-tools/
├── styles/global.css       # Global styles
└── content.config.ts       # Content collection definitions
```

### Build Output

```
dist/
├── client/                 # Static files (the Worker's [assets] directory)
│   ├── _astro/             # Hashed JS/CSS bundles (also uploaded to R2)
│   ├── <route>/index.html  # Prerendered pages
│   ├── favicon.svg         # Public assets
│   └── images/             # Copy of local public/images/ (images are served from R2 in production)
└── server/
    ├── entry.mjs           # SSR Worker entry
    └── wrangler.json       # Generated Worker config
```

### Deployed Structure

**Worker**: `dist/server/` (SSR) + `dist/client/` (static assets/prerendered pages)
**R2**: `_astro/*`, `favicon.svg`, and `images/*`

## Security

### HTTPS

- Automatic SSL via Cloudflare
- TLS 1.3 support
- Certificate management included

### Headers

No custom security headers (CSP, X-Frame-Options, etc.) are currently configured in the Astro app or Worker. Cloudflare's defaults apply. Add them in Astro middleware or a Cloudflare Transform Rule if needed.

### Access Control

- R2 bucket: Public read-only
- Worker: Executes in isolated sandbox
- No server to secure or patch

## Monitoring

### Available Metrics

1. **Workers Analytics**:
   - Request count
   - CPU time
   - Error rates
   - Geographic distribution

2. **R2 Analytics**:
   - Storage usage
   - Request count
   - Bandwidth
   - Operation types

3. **DNS Analytics**:
   - Query count
   - Response times
   - Geographic distribution

### Logs

```bash
# Tail real-time Worker logs
npx wrangler tail des4800-robray-net-site-production
```

## Cost Structure

### Free Tier

- **Workers**: 100,000 requests/day
- **R2 Storage**: 10 GB
- **R2 Operations**: 1M Class A, 10M Class B per month
- **DNS**: Unlimited queries
- **CDN**: Unlimited bandwidth

### Paid (if exceeded)

- **Workers**: $5/month for 10M requests
- **R2 Storage**: $0.015/GB/month
- **R2 Operations**: Minimal ($0.36-$4.50 per million)

**Expected cost for small-medium site**: $0/month

## Advantages of This Architecture

1. **Performance**
   - Edge computing (global distribution)
   - CDN-cached assets
   - No origin server latency

2. **Scalability**
   - Auto-scaling workers
   - No server management
   - Handles traffic spikes

3. **Cost**
   - Generous free tier
   - No egress fees (R2)
   - Pay per request model

4. **Reliability**
   - 100% uptime SLA (paid tier)
   - No single point of failure
   - Geographic redundancy

5. **Developer Experience**
   - Simple deployment
   - Fast builds
   - Git-based workflow
   - Local development support

## Limitations

1. **Compute Limits**
   - 50ms CPU time per request (free)
   - 128 MB memory
   - No long-running processes

2. **Regional Compliance**
   - Data stored in Cloudflare regions
   - Consider data residency requirements

3. **Vendor Lock-in**
   - Tied to Cloudflare ecosystem
   - Migration requires architecture change

## Future Enhancements

Potential improvements:

1. **Caching Layer**: Add Cloudflare Cache API for HTML
2. **KV Storage**: Use Workers KV for dynamic data
3. **D1 Database**: Add Cloudflare D1 for structured data
4. **Images**: Use Cloudflare Image Resizing
5. **Analytics**: Add Web Analytics
6. **Real-time**: WebSocket support for chat/updates

## Comparison with Alternatives

| Feature | This Setup | Traditional VPS | Vercel/Netlify |
|---------|------------|-----------------|----------------|
| SSR | ✅ Edge | ✅ Origin | ✅ Edge |
| Asset CDN | ✅ R2 | ❌ Need setup | ✅ Built-in |
| Cost | 💰 Low | 💰💰 Medium | 💰💰 Medium |
| Scalability | 🚀 Auto | ⚙️ Manual | 🚀 Auto |
| Setup | ⚙️ Medium | ⚙️⚙️ Complex | ✅ Easy |
| Control | ⚙️ Medium | ✅ Full | ❌ Limited |

## References

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [R2 Documentation](https://developers.cloudflare.com/r2/)
- [Astro Cloudflare Adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

