# The Financial Frontier

> Financial intelligence, reimagined in three dimensions.

A premium financial-intelligence platform: an interactive **3D globe**, a live **market board**,
a module navigator, a macro **dashboard**, a large **glossary**, and a deep, fully-sourced **report
every month**.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js /
React-Three-Fiber / drei**, **Framer Motion**, **Recharts** and **lucide-react**.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build (type-checks + validates report JSON)
npm start            # serve the production build
```

**Node 18.17+ required.** The first build downloads Space Grotesk, Inter and JetBrains Mono from
Google Fonts, so it needs network once. While developing, use `npm run dev` — it picks up content
changes instantly (no rebuild needed).

## The signature experiences

The globes are **real WebGL**, built with React-Three-Fiber — not Spline embeds. They're your code.
Each is client-only (`dynamic(..., { ssr: false })`) with a loading state, so the server build stays clean.

| Experience | Where | File |
|---|---|---|
| **Intelligence Globe** — rotate/drag/zoom, recolour by growth/inflation/rates/markets, click a hub | home hero | `src/components/three/Globe.tsx` + `GlobeSection.tsx` |
| **Indicator Explorer** — SingStat-style table builder: pick indicator + economies + view (line/bar/table/rankings) | `/data` | `src/components/IndicatorExplorer.tsx` |

### Want Spline instead?
Install `@splinetool/react-spline`, then replace the `<Globe />` render with
`<Spline scene="...scene.splinecode" />`. The panels, filters and data around it stay the same.

## Data honesty (please read)

- **Reports** and **dashboard** use real, attributed figures (see each report's Sources panel).
- The **3D globe** runs on **illustrative sample data** in `src/lib/countries.ts`, seeded
  with our June 2026 numbers where we have them (`sourced: true`). The UI labels these as sample data.
  We never present invented numbers as real.
- To make the 3D scenes authoritative, wire a live source (IMF/World Bank/FRED/ECB) into
  `src/lib/countries.ts`. Colours, panels and filters update automatically.

## Live markets, Story of the Day & ⌘K (Nov 2026)

| Feature | Where | Data |
|---|---|---|
| **Market Pulse** — glass heatmap of 28 major US stocks (size ≈ market cap, colour = today's move), index tiles, top riser / biggest faller spotlights with day-range bars | home `#markets` · `src/components/markets/MarketPulse.tsx` | Finnhub via `/api/markets` (5-min edge cache) |
| **Story of the Day** — glass hero card → full-screen reader → "show on globe" | home · `src/components/StoryOfTheDay.tsx` | Finnhub news via `/api/story` (hourly); optional AI "why it matters" when `AI_GATEWAY_API_KEY` is set; falls back to the latest issue's lead story |
| **Time Machine** — scrub Jun → Now to recolour the globe with each issue's month-end figures | under the globe · `GlobeSection.tsx` | `countrySnapshot` in each report JSON |
| **⌘K palette** — search countries, stocks, reports, indicators, glossary; countries fly the globe | everywhere · `src/components/CommandPalette.tsx` | static `/api/search` |

**Set `FINNHUB_API_KEY` in Vercel** (free key at finnhub.io) or the market board and news show an honest
"feed offline" state — the site never invents prices. Stocks are listed in `src/lib/live/stockList.ts`.

**Performance:** pages are fully static. Live data (`/api/snapshot`, `/api/markets`) is fetched client-side
after first paint, every upstream call has a timeout, the globe borders are fetched and built once and
shared, and WebGL only renders while on screen. The daily cron (`/api/refresh`) re-warms the data routes.

## Adding a monthly report

See **ADDING-A-REPORT.md**. Short version: drop the PDF in `public/reports/`, copy
`content/reports/2026-06.json` to a new `YYYY-MM.json`, edit the fields (**change the `slug`!**).
The homepage, ticker, archive and dashboard update themselves. Duplicate slugs are ignored
automatically, so a stray copy can't break the build.

## Structure

```
content/reports/   One JSON file per month — your content.
public/reports/    The PDFs.
src/
  app/             Home, reports, reports/[slug], dashboard, data, learn, about, contact
  components/
    three/         Globe, HeroGlobe + section wrapper
    charts/        Recharts bars + policy panel
    Nav, Footer, Ticker, ReportCard, StatCard, Reveal, Particles, PdfViewer, ContactForm,
    BentoNav (home module grid), IndicatorExplorer, IndicatorStrip, Sparkline
  lib/
    types.ts       Report schema
    reports.ts     Filesystem loader (dedupes by slug)
    countries.ts   3D dataset + colour scales  <- wire live data here
    glossary.ts    Glossary content
    indicators.ts  Indicator metadata + sample time-series for the Explorer
```

## Design system

Palette in `tailwind.config.ts` / `globals.css`: midnight `#04070D`, navy `#08111F`, slate `#0F172A`;
emerald `#00D084`, electric `#3B82F6`, cyan `#22D3EE`, violet `#7C3AED`, gold `#FBBF24`, neg `#F65B5B`.
Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (data). Glassmorphism, ambient glows,
animated gradient hairlines, scroll reveals, a particle field, full `prefers-reduced-motion` support.

## Contact form
`src/components/ContactForm.tsx` fakes its submit. Replace the body of `submit()` with a real
`fetch("/api/contact", ...)` and add `src/app/api/contact/route.ts` forwarding to Resend/Formspree/email.

## Deploying
Vercel is easiest (`npm i -g vercel && vercel`); Netlify / Cloudflare Pages use build command
`npm run build`. 3D scenes are code-split and lazy-loaded so they don't weigh down first paint.
For the brief's Lighthouse targets, test `npm run build && npm start`, not dev mode.

Educational use only. Nothing here is investment advice.

## Indicator Explorer (`/data`)

A SingStat-style table builder. Pick an indicator (23 across 12 families), choose any economies, and
view the result as a **line chart, bar chart, data table, or live ranking** — with a timeframe
selector and CSV export. The home page carries a preview strip and a link.

The explorer runs on the same illustrative sample data as the 3D scenes (`src/lib/indicators.ts`),
deterministically generated so it's stable, and seeded with the June figures for growth/inflation/rate.
Wire a real time-series API in that file to make it authoritative.

> The old navigator cube was replaced by a **bento-grid module navigator** (`BentoNav.tsx`) with live
> mini-visuals — sparklines, a mini market heatmap, and the latest issue — which is cleaner and more useful.

## Recent upgrades

- **Real country borders on the globe.** The globe now renders actual national outlines from
  Natural Earth data (`public/borders.json`, built into `src/components/three/Globe.tsx` as a single
  `LineSegments` draw call) instead of just a lat/long grid.
- **The globe recolours by all 23 indicators.** The picker above the globe groups indicators by
  family; choosing one recolours every hub via `colorForIndicator()` in `src/lib/indicators.ts`, and
  the country panel shows eight indicators at once.
- **Scroll-driven homepage.** A scroll-progress bar (`ScrollProgress.tsx`), a parallax hero with a
  scroll-reactive background globe (`Hero.tsx` + `three/HeroGlobe.tsx`), and 3D tilt-on-hover bento
  cards (`TiltCard.tsx`). All respect `prefers-reduced-motion`.

To swap the border data for higher detail, replace `public/borders.json` with rings built from a
50m or 10m Natural Earth GeoJSON (same `[lon, lat, …]` flat-array-per-ring format).
