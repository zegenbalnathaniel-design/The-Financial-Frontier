// Indicator engine for the SingStat-style explorer.
//
// DATA HONESTY: currentValue()/series() take an optional live snapshot (src/lib/live/)
// and return REAL sourced values wherever one exists for that country+indicator —
//   World Bank: growth, per-capita GDP, CPI, unemployment, current account, fiscal
//     balance, broad money, FDI, trade balance, market cap (annual)
//   OECD (no key): core inflation, wage growth, industrial production, retail sales,
//     consumer confidence, labour productivity, 10-year yields
//   BIS (no key): central-bank policy rates, house prices · IMF WEO (no key): debt-to-GDP
//   FRED (key): fresher daily rates/yields · ECB/Frankfurter: FX · Alpha Vantage (key):
//     equity returns YTD via country ETFs.
// Everything else — Manufacturing PMI (no free source) and economies a source doesn't
// cover — falls back to the deterministic placeholders below (stable across renders) and
// is labelled as sample data in the UI.
//
// Trend lines use REAL history (src/lib/history.ts → /api/history/[key]) from the same
// sources. series() below is only the labelled sample fallback for indicators/economies
// no source covers; it is never mixed with real points.

import { COUNTRIES, type Country } from "./countries";
import { liveGet, type LiveSnapshot, type Provenance } from "./live/types";

export type Family =
  | "Economic Growth" | "Inflation & Prices" | "Employment & Labour"
  | "Monetary Policy" | "Government Finance" | "International Trade"
  | "Financial Markets" | "Business Activity" | "Consumer" | "Housing"
  | "Money & Banking" | "Productivity";

export interface IndicatorMeta {
  key: string;
  label: string;
  family: Family;
  unit: string;
  decimals: number;
  higherBetter?: boolean;   // for ranking colours
  range: [number, number];  // generator range
  field?: keyof Country["data"]; // pull from country dataset if present
  about: string;
}

export const INDICATORS: IndicatorMeta[] = [
  { key: "gdpGrowth", label: "GDP growth", family: "Economic Growth", unit: "%", decimals: 1, higherBetter: true, range: [-2, 8], field: "growth", about: "Annual change in real economic output — the broadest gauge of expansion." },
  { key: "gdpPerCapita", label: "GDP per capita", family: "Economic Growth", unit: "$", decimals: 0, higherBetter: true, range: [1500, 92000], about: "Output per person — a rough proxy for average living standards." },
  { key: "cpi", label: "CPI inflation", family: "Inflation & Prices", unit: "%", decimals: 1, higherBetter: false, range: [0, 40], field: "inflation", about: "The pace at which consumer prices rise year on year." },
  { key: "coreInflation", label: "Core inflation", family: "Inflation & Prices", unit: "%", decimals: 1, higherBetter: false, range: [1, 12], about: "Consumer prices excluding food and energy, year on year — the underlying trend." },
  { key: "unemployment", label: "Unemployment rate", family: "Employment & Labour", unit: "%", decimals: 1, higherBetter: false, range: [2, 16], about: "Share of the labour force without work but seeking it." },
  { key: "wageGrowth", label: "Wage growth", family: "Employment & Labour", unit: "%", decimals: 1, higherBetter: true, range: [0, 10], about: "Labour compensation per employee, year on year — supports spending, can keep inflation sticky." },
  { key: "policyRate", label: "Policy rate", family: "Monetary Policy", unit: "%", decimals: 2, range: [0, 45], field: "rate", about: "The central-bank interest rate that prices credit across the economy." },
  { key: "tenYearYield", label: "10-year bond yield", family: "Financial Markets", unit: "%", decimals: 2, range: [1, 16], about: "The government's long-term borrowing cost — a benchmark for all lending." },
  { key: "debtToGdp", label: "Debt-to-GDP", family: "Government Finance", unit: "%", decimals: 0, higherBetter: false, range: [25, 260], about: "General government gross debt measured against the size of the economy." },
  { key: "budgetBalance", label: "Budget balance", family: "Government Finance", unit: "% GDP", decimals: 1, higherBetter: true, range: [-9, 4], about: "The fiscal surplus (+) or deficit (−) as a share of GDP." },
  { key: "currentAccount", label: "Current account", family: "International Trade", unit: "% GDP", decimals: 1, higherBetter: true, range: [-7, 13], about: "The broadest trade balance — goods, services, income and transfers." },
  { key: "tradeBalance", label: "Trade balance", family: "International Trade", unit: "$bn", decimals: 0, range: [-950, 900], about: "Exports minus imports of goods and services." },
  { key: "fdiInflows", label: "FDI inflows", family: "International Trade", unit: "$bn", decimals: 0, higherBetter: true, range: [0, 360], about: "Long-term foreign investment flowing into the country." },
  { key: "marketReturnYtd", label: "Equity return (YTD)", family: "Financial Markets", unit: "%", decimals: 1, higherBetter: true, range: [-22, 34], about: "Year-to-date total return of the market's US-listed country ETF, in US dollars." },
  { key: "marketCap", label: "Market capitalisation", family: "Financial Markets", unit: "$tn", decimals: 2, higherBetter: true, range: [0.03, 48], about: "The total value of the country's listed equities." },
  { key: "pmi", label: "Manufacturing PMI", family: "Business Activity", unit: "idx", decimals: 1, higherBetter: true, range: [44, 58], about: "Above 50 signals factory expansion; below, contraction." },
  { key: "industrialProduction", label: "Industrial production", family: "Business Activity", unit: "% y/y", decimals: 1, range: [-8, 13], about: "Output of factories, mines and utilities, year on year." },
  { key: "retailSales", label: "Retail sales", family: "Consumer", unit: "% y/y", decimals: 1, range: [-4, 12], about: "The volume of goods sold by retailers, year on year — a direct read on demand." },
  { key: "consumerConfidence", label: "Consumer confidence", family: "Consumer", unit: "idx", decimals: 0, higherBetter: true, range: [94, 104], about: "How optimistic households feel (OECD composite, long-run average = 100) — often predicts future spending." },
  { key: "housingPrice", label: "House prices", family: "Housing", unit: "% y/y", decimals: 1, range: [-10, 20], about: "The annual change in nominal residential property prices — key to household wealth." },
  { key: "moneySupplyGrowth", label: "Money supply (M2)", family: "Money & Banking", unit: "% y/y", decimals: 1, range: [-2, 16], about: "How fast broad money is expanding — a long-run inflation signal." },
  { key: "productivity", label: "Labour productivity", family: "Productivity", unit: "% y/y", decimals: 1, range: [-1, 5], about: "Real GDP per person employed, year on year — the root of sustainable wage growth." },
  { key: "currencyChange", label: "Currency vs USD (YTD)", family: "Money & Banking", unit: "%", decimals: 1, range: [-16, 12], about: "How the currency has moved against the dollar this year." },
];

export const FAMILIES: Family[] = [
  "Economic Growth", "Inflation & Prices", "Employment & Labour", "Monetary Policy",
  "Government Finance", "International Trade", "Financial Markets", "Business Activity",
  "Consumer", "Housing", "Money & Banking", "Productivity",
];

// deterministic 0..1 hash from strings
function rand(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 100000) / 100000;
}

// The curated baseline: our hand-checked figures reflect the October 2026 report. A live
// value only supersedes a curated figure when it is genuinely newer than this — which
// stops stale annual data (e.g. World Bank's last-completed-year CPI) from overwriting
// an accurate current number. For placeholder cells (no curated value) live always wins.
const CURATED_BASELINE = "2026-10";
function asOfRank(s: string): number {
  const m = /^(\d{4})(?:-(\d{2}))?/.exec(s || "");
  return m ? Number(m[1]) * 100 + (m[2] ? Number(m[2]) : 0) : 0;
}

/** Whether the live snapshot's value should be used for this cell (vs the static one). */
export function usesLive(country: Country, ind: IndicatorMeta, live?: LiveSnapshot | null): boolean {
  const p = liveGet(live, country.code, ind.key);
  if (!p) return false;
  // A curated cell = a report-grounded country on a field-backed indicator (growth/inflation/rate).
  const curated = !!ind.field && !!country.sourced;
  if (!curated) return true; // placeholder cell → any real value is an improvement
  return asOfRank(p.asOf) > asOfRank(CURATED_BASELINE); // curated cell → only if live is fresher
}

export function currentValue(country: Country, ind: IndicatorMeta, live?: LiveSnapshot | null): number {
  if (usesLive(country, ind, live)) return +liveGet(live, country.code, ind.key)!.value.toFixed(ind.decimals);
  if (ind.field) return country.data[ind.field] as number;
  const [min, max] = ind.range;
  const v = min + rand(country.code + ind.key) * (max - min);
  return +v.toFixed(ind.decimals);
}

/** Provenance for a cell: the live source when it wins, else the curated/sample note. */
export function provenanceFor(country: Country, ind: IndicatorMeta, live?: LiveSnapshot | null): Provenance | { source: string; asOf: string } {
  if (usesLive(country, ind, live)) return liveGet(live, country.code, ind.key)!;
  if (ind.field && country.sourced) return { source: "Report · Oct 2026", asOf: CURATED_BASELINE };
  return { source: "Sample data", asOf: "" };
}

/** SAMPLE ONLY: a stable illustrative time-series ending at the current value. Used where
 *  no real history exists; callers must label it as sample data. */
export function series(country: Country, ind: IndicatorMeta, points: number, live?: LiveSnapshot | null): number[] {
  const end = currentValue(country, ind, live);
  const [min, max] = ind.range;
  const span = (max - min) * 0.14 + Math.abs(end) * 0.06;
  const out: number[] = [];
  let v = end - (rand(country.code + ind.key + "start") - 0.5) * span * 2;
  for (let i = 0; i < points; i++) {
    const step = (rand(country.code + ind.key + i) - 0.5) * span * 0.6;
    v += step + (end - v) * (i / points) * 0.4; // drift toward the end value
    out.push(+v.toFixed(ind.decimals));
  }
  out[out.length - 1] = end;
  return out;
}

export function fmt(v: number, ind: IndicatorMeta): string {
  const n = ind.unit === "$" ? v.toLocaleString() : v.toFixed(ind.decimals);
  if (ind.unit === "$" || ind.unit === "$bn" || ind.unit === "$tn") return `${ind.unit === "$" ? "$" : ""}${n}${ind.unit === "$" ? "" : " " + ind.unit}`;
  if (ind.unit === "idx") return n;
  return `${n}${ind.unit === "%" ? "%" : " " + ind.unit}`;
}

/** Trend windows: `years` trims real history; `points` sizes the sample fallback. */
export const TIMEFRAMES = [
  { label: "5Y", years: 5, points: 20 }, { label: "10Y", years: 10, points: 30 },
  { label: "20Y", years: 20, points: 40 }, { label: "Max", years: Infinity, points: 60 },
];

export const ALL_COUNTRIES = COUNTRIES;

/** Generic colour scale for ANY indicator, respecting its range + direction. */
export function colorForIndicator(ind: IndicatorMeta, v: number): string {
  const [min, max] = ind.range;
  let t = (v - min) / (max - min || 1);
  t = Math.max(0, Math.min(1, t));
  if (ind.higherBetter === false) t = 1 - t; // low is good
  // t: 0 = bad (red) → 0.5 = blue → 1 = good (emerald)
  if (ind.higherBetter === undefined) {
    // neutral scale: blue → cyan
    return t > 0.66 ? "#22D3EE" : t > 0.33 ? "#3B82F6" : "#7C3AED";
  }
  return t > 0.72 ? "#00D084" : t > 0.5 ? "#34D399" : t > 0.3 ? "#3B82F6" : t > 0.15 ? "#FBBF24" : "#F65B5B";
}
