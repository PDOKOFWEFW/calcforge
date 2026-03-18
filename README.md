# CalcForge — Programmatic SEO Calculator Website

A production-ready Next.js 14 (App Router + TypeScript) project implementing the
**programmatic SEO** strategy from the CalcForge project plan. Generates city-specific
mortgage calculator pages at build time with ISR for automated freshness.

---

## 🗂 Project Structure

```
calcforge/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  ← Root layout: fonts, Navbar, Footer
│   │   ├── page.tsx                    ← Homepage with city cards + tool hub
│   │   ├── globals.css                 ← Tailwind + custom base styles
│   │   ├── not-found.tsx               ← 404 page
│   │   ├── sitemap.ts                  ← Auto-generated XML sitemap
│   │   ├── robots.ts                   ← Auto-generated robots.txt
│   │   └── mortgage/
│   │       ├── page.tsx                ← /mortgage — city index page
│   │       └── [cityName]/
│   │           └── page.tsx            ← /mortgage/[slug] — programmatic city pages
│   ├── components/
│   │   ├── Navbar.tsx                  ← Sticky nav with city dropdown
│   │   ├── Footer.tsx                  ← Footer with SEO internal links
│   │   ├── Breadcrumb.tsx              ← Breadcrumb navigation component
│   │   ├── MortgageCalculator.tsx      ← Interactive calculator (client component)
│   │   └── CityCard.tsx                ← City preview card with est. payment
│   ├── data/
│   │   └── cities.json                 ← City data: price, tax rate, HOA, etc.
│   └── lib/
│       ├── types.ts                    ← TypeScript interfaces
│       ├── mortgage.ts                 ← Calculation engine + formatters
│       ├── cities.ts                   ← City data helpers
│       └── schema.ts                   ← JSON-LD structured data builders
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── vercel.json                         ← Vercel deployment config + Cache-Control
├── postcss.config.mjs
└── .eslintrc.json
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18.17+ (required by Next.js 14)
- npm 9+

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Key development URLs

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Homepage |
| `http://localhost:3000/mortgage` | City index page |
| `http://localhost:3000/mortgage/austin-tx` | Austin programmatic page |
| `http://localhost:3000/mortgage/denver-co` | Denver programmatic page |
| `http://localhost:3000/sitemap.xml` | Auto-generated sitemap |
| `http://localhost:3000/robots.txt` | Auto-generated robots.txt |

---

## 🏗 How Programmatic SEO Works in This Project

### 1. Data Source: `src/data/cities.json`

Each city entry contains:

```json
{
  "name": "Austin",
  "slug": "austin-tx",          ← URL slug: /mortgage/austin-tx
  "state": "Texas",
  "stateAbbr": "TX",
  "medianHomePrice": 525000,    ← Pre-fills calculator
  "propertyTaxRate": 1.8,       ← Used in payment calculation
  "avgHOA": 220,                ← Monthly HOA estimate
  "avgRate30yr": 7.18,          ← Current rate estimate
  "population": 978908,
  "description": "..."          ← Unique text for each city page
}
```

### 2. `generateStaticParams` — Build-time page generation

In `src/app/mortgage/[cityName]/page.tsx`:

```typescript
export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map((city) => ({
    cityName: city.slug,  // → generates /mortgage/austin-tx, /mortgage/denver-co, etc.
  }));
}
```

At `next build`, Next.js calls this function, reads all slugs from `cities.json`,
and pre-renders a static HTML file for every city. With 5 cities → 5 pages.
With 30,000 cities → 30,000 pages.

### 3. ISR — Incremental Static Regeneration

```typescript
export const revalidate = 86400; // 24 hours
```

This single line tells Vercel:
- Serve the cached static HTML immediately (fast, no DB query)
- After 24 hours, regenerate the page in the background on next request
- New visitors always see fresh content without a full rebuild

### 4. Per-city SEO metadata

`generateMetadata` runs at build time to produce unique `<title>` and
`<meta description>` for each city:

```typescript
export async function generateMetadata({ params }) {
  const city = getCityBySlug(params.cityName);
  return {
    title: `${city.name}, ${city.stateAbbr} Mortgage Calculator — 2025`,
    description: `Free ${city.name} mortgage calculator. Based on median home price...`,
    alternates: { canonical: `https://calcforge.com/mortgage/${city.slug}` },
  };
}
```

---

## ➕ Adding More Cities

Edit `src/data/cities.json` and add a new entry:

```json
{
  "name": "Seattle",
  "slug": "seattle-wa",
  "state": "Washington",
  "stateAbbr": "WA",
  "medianHomePrice": 810000,
  "propertyTaxRate": 0.92,
  "avgHOA": 400,
  "avgRate30yr": 7.18,
  "population": 749256,
  "description": "Seattle is Washington's largest city..."
}
```

Then run `npm run build` — the new city page at `/mortgage/seattle-wa` is
automatically included. No other code changes needed.

---

## ☁️ Deploying to Vercel

### Option A: Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy from project root (follow the prompts)
vercel

# 4. Deploy to production
vercel --prod
```

### Option B: GitHub Integration (Best for teams)

1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial CalcForge commit"
   git remote add origin https://github.com/YOUR_USERNAME/calcforge.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **New Project**

3. Import your GitHub repository

4. Vercel auto-detects Next.js. Use these settings:
   - **Framework**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install`

5. Click **Deploy**. Done.

Every `git push` to `main` triggers an automatic rebuild and deployment.

### Vercel + ISR: How it works in production

```
First request to /mortgage/austin-tx
→ Vercel serves pre-built static HTML (instant, ~50ms)

After 86400 seconds (24hr), next request triggers:
→ Vercel serves stale cached page to visitor (still instant)
→ Background: regenerates the page with fresh data
→ Next visitor gets the newly rendered page
```

This means your site is always fast (static HTML) but stays fresh without
manual deploys or database queries on every request.

---

## 🔧 Environment Variables

No environment variables are required for the base project. All data comes
from `cities.json`.

When you add a database for city data (recommended for 1,000+ cities),
create a `.env.local` file:

```env
DATABASE_URL=postgresql://user:password@host:5432/calcforge
NEXT_PUBLIC_SITE_URL=https://calcforge.com
```

---

## 📈 Scaling to 30,000 City Pages

The current setup reads from a JSON file. To scale to tens of thousands of pages:

### 1. Move city data to Postgres (Neon recommended — free tier)

```typescript
// src/lib/cities.ts — replace JSON with DB query
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function getAllCities(): Promise<City[]> {
  return sql`SELECT * FROM cities WHERE active = true ORDER BY population DESC`;
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  const rows = await sql`SELECT * FROM cities WHERE slug = ${slug} LIMIT 1`;
  return rows[0] as City | undefined;
}
```

### 2. Seed the database with US cities

```bash
# Download from: https://simplemaps.com/data/us-cities (free tier: 1,000 cities)
# Or use the Census TIGER data for all 30,000+ places
npm run db:seed
```

### 3. For very large page counts, use `dynamicParams = true`

```typescript
// In [cityName]/page.tsx — generate top 1,000 at build time,
// render the rest on-demand with ISR
export const dynamicParams = true; // default — allows unknown slugs to render

export async function generateStaticParams() {
  // Only pre-build top cities by population at build time
  const topCities = await getTopCities(1000);
  return topCities.map((c) => ({ cityName: c.slug }));
}
```

---

## 🎯 SEO Features Implemented

| Feature | Implementation |
|---------|---------------|
| Unique title per page | `generateMetadata` with city name + price |
| Unique meta description | Computed from city data including est. payment |
| Canonical URLs | `alternates.canonical` in metadata |
| FAQ rich results | `FAQPage` JSON-LD schema via `<Script>` |
| Breadcrumb rich results | `BreadcrumbList` JSON-LD schema |
| WebApplication schema | Marks page as interactive tool |
| XML Sitemap | Auto-generated at `/sitemap.xml` |
| robots.txt | Auto-generated at `/robots.txt` |
| Internal linking | Footer + "Related Cities" section |
| H1/H2 structure | Semantic heading hierarchy on every page |
| OpenGraph tags | Title + description for social sharing |

---

## 🎨 Customizing the Theme

Edit `tailwind.config.ts` to change brand colors:

```typescript
colors: {
  brand: {
    600: "#185FA5",  // ← Change this to your brand color
    // ... other shades
  }
}
```

---

## 📊 Recommended Next Steps

1. **Add Google AdSense** — Place ad components in `MortgageCalculator.tsx`
   below the results panel and in the city page between sections.

2. **Add Google Analytics** — Install `@next/third-parties` and add
   `<GoogleAnalytics gaId="G-XXXXXXXXXX" />` to `layout.tsx`.

3. **Add Affiliate CTAs** — Place a "Get Pre-Approved" button linking to
   LendingTree/Bankrate affiliate links after the calculator result.

4. **Add more calculator types** — Follow the same pattern:
   - `/src/app/[calculator-type]/page.tsx` (hub page)
   - `/src/app/[calculator-type]/[param]/page.tsx` (programmatic pages)

5. **Submit to Google Search Console** — Add `sitemap.xml` URL for faster indexing.
