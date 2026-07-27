// Indicator engine for the SingStat-style explorer.
//
// DATA HONESTY: values are ILLUSTRATIVE sample data, deterministically generated so
// they're stable across renders. Growth / inflation / policy-rate pull from the
// (June-2026-seeded) country dataset; the rest are plausible placeholders in sensible
// ranges. Wire a real time-series source (IMF/World Bank/FRED) into this file to make
// the explorer authoritative — the UI labels these as sample data throughout.

import { COUNTRIES, type Country } from "./countries";

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
  { key: "coreInflation", label: "Core inflation", family: "Inflation & Prices", unit: "%", decimals: 1, higherBetter: false, range: [1, 12], about: "Inflation excluding volatile food and energy — the underlying trend." },
  { key: "unemployment", label: "Unemployment rate", family: "Employment & Labour", unit: "%", decimals: 1, higherBetter: false, range: [2, 16], about: "Share of the labour force without work but seeking it." },
  { key: "wageGrowth", label: "Wage growth", family: "Employment & Labour", unit: "%", decimals: 1, higherBetter: true, range: [0, 10], about: "How fast pay is rising — supports spending, can keep inflation sticky." },
  { key: "policyRate", label: "Policy rate", family: "Monetary Policy", unit: "%", decimals: 2, range: [0, 45], field: "rate", about: "The central-bank interest rate that prices credit across the economy." },
  { key: "tenYearYield", label: "10-year bond yield", family: "Financial Markets", unit: "%", decimals: 2, range: [1, 16], about: "The government's long-term borrowing cost — a benchmark for all lending." },
  { key: "debtToGdp", label: "Debt-to-GDP", family: "Government Finance", unit: "%", decimals: 0, higherBetter: false, range: [25, 260], about: "Government debt measured against the size of the economy." },
  { key: "budgetBalance", label: "Budget balance", family: "Government Finance", unit: "% GDP", decimals: 1, higherBetter: true, range: [-9, 4], about: "The fiscal surplus (+) or deficit (−) as a share of GDP." },
  { key: "currentAccount", label: "Current account", family: "International Trade", unit: "% GDP", decimals: 1, higherBetter: true, range: [-7, 13], about: "The broadest trade balance — goods, services, income and transfers." },
  { key: "tradeBalance", label: "Trade balance", family: "International Trade", unit: "$bn", decimals: 0, range: [-950, 900], about: "Exports minus imports of goods and services." },
  { key: "fdiInflows", label: "FDI inflows", family: "International Trade", unit: "$bn", decimals: 0, higherBetter: true, range: [0, 360], about: "Long-term foreign investment flowing into the country." },
  { key: "marketReturnYtd", label: "Equity return (YTD)", family: "Financial Markets", unit: "%", decimals: 1, higherBetter: true, range: [-22, 34], about: "The headline stock index's year-to-date performance." },
  { key: "marketCap", label: "Market capitalisation", family: "Financial Markets", unit: "$tn", decimals: 2, higherBetter: true, range: [0.03, 48], about: "The total value of the country's listed equities." },
  { key: "pmi", label: "Manufacturing PMI", family: "Business Activity", unit: "idx", decimals: 1, higherBetter: true, range: [44, 58], about: "Above 50 signals factory expansion; below, contraction." },
  { key: "industrialProduction", label: "Industrial production", family: "Business Activity", unit: "% y/y", decimals: 1, range: [-8, 13], about: "Output of factories, mines and utilities." },
  { key: "retailSales", label: "Retail sales", family: "Consumer", unit: "% y/y", decimals: 1, range: [-4, 12], about: "The value of goods sold to consumers — a direct read on demand." },
  { key: "consumerConfidence", label: "Consumer confidence", family: "Consumer", unit: "idx", decimals: 0, higherBetter: true, range: [68, 116], about: "How optimistic households feel — often predicts future spending." },
  { key: "housingPrice", label: "House prices", family: "Housing", unit: "% y/y", decimals: 1, range: [-10, 20], about: "The annual change in home prices — key to household wealth." },
  { key: "moneySupplyGrowth", label: "Money supply (M2)", family: "Money & Banking", unit: "% y/y", decimals: 1, range: [-2, 16], about: "How fast broad money is expanding — a long-run inflation signal." },
  { key: "productivity", label: "Labour productivity", family: "Productivity", unit: "% y/y", decimals: 1, range: [-1, 5], about: "Output per hour worked — the root of sustainable wage growth." },
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

export function currentValue(country: Country, ind: IndicatorMeta): number {
  if (ind.field) return country.data[ind.field] as number;
  const [min, max] = ind.range;
  const v = min + rand(country.code + ind.key) * (max - min);
  return +v.toFixed(ind.decimals);
}

/** A stable illustrative time-series ending at the current value. */
export function series(country: Country, ind: IndicatorMeta, points: number): number[] {
  const end = currentValue(country, ind);
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

export const TIMEFRAMES = [
  { label: "1Y", points: 12 }, { label: "3Y", points: 18 }, { label: "5Y", points: 24 },
  { label: "10Y", points: 40 }, { label: "Max", points: 60 },
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
