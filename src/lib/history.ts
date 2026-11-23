// Real historical series for the trend lines (Indicator Explorer, globe panel, sparklines).
//
// Shared by server and client, and deliberately dependency-free (no imports) so the seed
// script (scripts/build-history-seed.mts) can load it with Node's built-in type stripping.
//
// DATA HONESTY: a payload only ever contains observations an upstream API returned. An
// indicator/economy without a series here is shown as labelled sample data in the UI —
// real and sample points are never mixed on one line.

/** One observation: [period, value]. Period is "YYYY" (annual), "YYYY-Qn" (quarterly) or
 *  "YYYY-MM" (monthly). */
export type HistoryPoint = [string, number];

export type HistoryProvider = "World Bank" | "OECD" | "BIS" | "IMF" | "Alpha Vantage";
export type HistoryFreq = "A" | "Q" | "M";

export interface HistoryPayload {
  key: string;
  provider: HistoryProvider | null;
  /** the indicator's main frequency; `freqs` overrides it per economy where they differ */
  freq: HistoryFreq | null;
  freqs?: Record<string, HistoryFreq>;
  /** country code → ascending observations (nulls dropped) */
  series: Record<string, HistoryPoint[]>;
  /** upstream series id per country (World Bank uses one code; OECD/BIS legs can differ) */
  seriesIds: Record<string, string>;
  /** ISO date the upstream was actually read */
  retrieved: string;
  /** live = fetched for this cache window; bundled = committed snapshot used because the
   *  upstream was slow/unavailable; none = no source configured */
  origin: "live" | "bundled" | "none";
  note?: string;
}

// Our indicator key → World Bank WDI series (+ optional scale to the indicator's unit).
// Also used by the live snapshot for latest values.
export const WB_MAP: { key: string; wb: string; scale?: number }[] = [
  { key: "gdpGrowth", wb: "NY.GDP.MKTP.KD.ZG" },
  { key: "gdpPerCapita", wb: "NY.GDP.PCAP.CD" },
  { key: "cpi", wb: "FP.CPI.TOTL.ZG" },
  { key: "unemployment", wb: "SL.UEM.TOTL.ZS" },
  { key: "currentAccount", wb: "BN.CAB.XOKA.GD.ZS" },
  { key: "budgetBalance", wb: "GC.NLD.TOTL.GD.ZS" },
  { key: "moneySupplyGrowth", wb: "FM.LBL.BMNY.ZG" },
  { key: "fdiInflows", wb: "BX.KLT.DINV.CD.WD", scale: 1e-9 }, // USD → $bn
  { key: "tradeBalance", wb: "NE.RSB.GNFS.CD", scale: 1e-9 }, // USD → $bn
  { key: "marketCap", wb: "CM.MKT.LCAP.CD", scale: 1e-12 }, // USD → $tn
];

/** Next.js fetch-cache tag on every upstream history request (cleared by the daily cron). */
export const HISTORY_TAG = "history";

/** Keyless official sources (src/lib/live/keyless.ts): indicator → provider + main frequency. */
export const KEYLESS_HISTORY: Record<string, { provider: HistoryProvider; freq: HistoryFreq }> = {
  coreInflation: { provider: "OECD", freq: "M" },
  industrialProduction: { provider: "OECD", freq: "M" },
  retailSales: { provider: "OECD", freq: "M" },
  consumerConfidence: { provider: "OECD", freq: "M" },
  wageGrowth: { provider: "OECD", freq: "Q" },
  productivity: { provider: "OECD", freq: "Q" },
  tenYearYield: { provider: "OECD", freq: "M" },
  policyRate: { provider: "BIS", freq: "M" },
  housingPrice: { provider: "BIS", freq: "Q" },
  debtToGdp: { provider: "IMF", freq: "A" },
};

/** Calendar-year returns of each market's country ETF (Alpha Vantage monthly adjusted). */
export const ETF_HISTORY_KEY = "marketReturnYtd";

/** Every indicator key that has a real-history source (others are sample-only). */
export const HISTORY_KEYS: string[] = [...WB_MAP.map((m) => m.key), ...Object.keys(KEYLESS_HISTORY), ETF_HISTORY_KEY];

export function hasHistorySource(key: string): boolean {
  return HISTORY_KEYS.includes(key);
}

export function historyProvider(key: string): HistoryProvider | null {
  if (WB_MAP.some((m) => m.key === key)) return "World Bank";
  if (KEYLESS_HISTORY[key]) return KEYLESS_HISTORY[key].provider;
  if (key === ETF_HISTORY_KEY) return "Alpha Vantage";
  return null;
}

export const FREQ_LABEL: Record<HistoryFreq, string> = { A: "annual", Q: "quarterly", M: "monthly" };

/** Period → fractional year, for windowing ("2025" → 2025, "2025-04" → 2025.25, "2025-Q2" → 2025.25). */
export function periodNum(p: string): number {
  const [y, m] = p.split("-");
  if (!m) return Number(y);
  if (m[0] === "Q") return Number(y) + (Number(m.slice(1)) - 1) / 4;
  return Number(y) + (Number(m) - 1) / 12;
}

/** The trailing `years` of a series, measured back from its own last observation. */
export function lastYears(points: HistoryPoint[], years: number): HistoryPoint[] {
  if (!points.length || !Number.isFinite(years)) return points;
  const cutoff = periodNum(points[points.length - 1][0]) - years;
  return points.filter(([p]) => periodNum(p) > cutoff + 1e-9);
}

/** Round to 4 significant figures — plenty for display, keeps payloads small. */
export function sig4(v: number): number {
  return Number(v.toPrecision(4));
}
