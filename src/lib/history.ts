// Real historical series for the trend lines (Indicator Explorer, globe panel, sparklines).
//
// Shared by server and client, and deliberately dependency-free (no imports) so the seed
// script (scripts/build-history-seed.mts) can load it with Node's built-in type stripping.
//
// DATA HONESTY: a payload only ever contains observations an upstream API returned. An
// indicator/economy without a series here is shown as labelled sample data in the UI —
// real and sample points are never mixed on one line.

/** One observation: [period, value]. Period is "YYYY" (annual) or "YYYY-MM" (monthly). */
export type HistoryPoint = [string, number];

export interface HistoryPayload {
  key: string;
  provider: "World Bank" | "FRED" | null;
  freq: "A" | "M" | null;
  /** country code → ascending observations (nulls dropped) */
  series: Record<string, HistoryPoint[]>;
  /** upstream series id per country (FRED ids vary by country; World Bank uses one code) */
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
  { key: "debtToGdp", wb: "GC.DOD.TOTL.GD.ZS" },
  { key: "moneySupplyGrowth", wb: "FM.LBL.BMNY.ZG" },
  { key: "fdiInflows", wb: "BX.KLT.DINV.CD.WD", scale: 1e-9 }, // USD → $bn
  { key: "tradeBalance", wb: "NE.RSB.GNFS.CD", scale: 1e-9 }, // USD → $bn
  { key: "marketCap", wb: "CM.MKT.LCAP.CD", scale: 1e-12 }, // USD → $tn
];

/** Next.js fetch-cache tag on every upstream history request (cleared by the daily cron). */
export const HISTORY_TAG = "history";

/** Indicators whose history comes from FRED (needs FRED_API_KEY; monthly averages). */
export const FRED_HISTORY_KEYS = ["policyRate", "tenYearYield"];

/** Every indicator key that has a real-history source (others are sample-only). */
export const HISTORY_KEYS: string[] = [...WB_MAP.map((m) => m.key), ...FRED_HISTORY_KEYS];

export function hasHistorySource(key: string): boolean {
  return HISTORY_KEYS.includes(key);
}

export function historyProvider(key: string): "World Bank" | "FRED" | null {
  if (WB_MAP.some((m) => m.key === key)) return "World Bank";
  if (FRED_HISTORY_KEYS.includes(key)) return "FRED";
  return null;
}

/** Period → fractional year, for windowing ("2025" → 2025, "2025-04" → 2025.25). */
export function periodNum(p: string): number {
  const [y, m] = p.split("-");
  return Number(y) + (m ? (Number(m) - 1) / 12 : 0);
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
