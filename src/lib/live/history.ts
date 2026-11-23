// Server-side loader for /api/history/[key] (and the snapshot's latest keyless values).
//
// World Bank indicators: live World Bank (25s timeout, cached a day).
// Keyless official sources — OECD, BIS, IMF (src/lib/live/keyless.ts): live, cached a day.
// Both fall back to the committed real-data snapshot in src/data/history-seed.json when the
// upstream is slow, throttled or down, so a bad upstream day never downgrades the trend
// lines to sample data. Equity returns: Alpha Vantage country-ETF history (needs
// ALPHA_API_KEY; filled gradually inside the free tier). Anything else: no source.

import "server-only";
import { COUNTRIES } from "@/lib/countries";
import {
  WB_MAP, KEYLESS_HISTORY, ETF_HISTORY_KEY, HISTORY_TAG, sig4,
  type HistoryFreq, type HistoryPayload, type HistoryPoint,
} from "@/lib/history";
import seed from "@/data/history-seed.json";
import { wbFetchHistory } from "./worldbank";
import { fetchKeylessHistory } from "./keyless";
import { getEtfReturnHistory } from "./worldMarkets";

const DAY = 86400;

type Seed = {
  retrieved: string;
  indicators: Record<string, Record<string, HistoryPoint[]>>;
  ids?: Record<string, Record<string, string>>;
  freqs?: Record<string, Record<string, HistoryFreq>>;
};
const SEED = seed as unknown as Seed;

const today = () => new Date().toISOString().slice(0, 10);
const CODES = () => COUNTRIES.map((c) => c.code);

/** Same options from every caller → one upstream request per day, shared via the fetch cache. */
const KEYLESS_OPTS = { revalidate: DAY, timeoutMs: 20000, tags: [HISTORY_TAG] };

export interface KeylessResult {
  series: Record<string, HistoryPoint[]>;
  seriesIds: Record<string, string>;
  freqs: Record<string, HistoryFreq>;
  retrieved: string;
  origin: HistoryPayload["origin"];
  note?: string;
}

/**
 * One keyless indicator for every economy: live where the upstream answered, the committed
 * seed for any economy it didn't (whole indicator on failure). Never throws.
 */
export async function getKeylessSeries(key: string): Promise<KeylessResult> {
  let reason = "";
  const live = await fetchKeylessHistory(key, CODES(), KEYLESS_OPTS).catch((e: Error) => {
    reason = e.message.replace(/^\S+ \S+: /, ""); // "OECD coreInflation: HTTP 429" → "HTTP 429"
    console.warn(`[history] ${key}: live fetch failed (${reason}); using seed`);
    return new Map();
  });
  const series: Record<string, HistoryPoint[]> = {};
  const seriesIds: Record<string, string> = {};
  const freqs: Record<string, HistoryFreq> = {};
  for (const [code, s] of live) { series[code] = s.points; seriesIds[code] = s.id; freqs[code] = s.freq; }

  const saved = SEED.indicators[key] ?? {};
  const fromSeed = Object.keys(saved).filter((code) => !series[code]);
  for (const code of fromSeed) {
    series[code] = saved[code];
    const id = SEED.ids?.[key]?.[code];
    if (id) seriesIds[code] = id;
    freqs[code] = SEED.freqs?.[key]?.[code] ?? KEYLESS_HISTORY[key]?.freq ?? "A";
  }

  const provider = KEYLESS_HISTORY[key]?.provider ?? "";
  if (live.size > 0) {
    return {
      series, seriesIds, freqs, retrieved: today(), origin: "live",
      note: fromSeed.length ? `${fromSeed.join(", ")}: from our last saved copy of the same ${provider} series (retrieved ${SEED.retrieved}).` : undefined,
    };
  }
  return {
    series, seriesIds, freqs, retrieved: SEED.retrieved, origin: fromSeed.length ? "bundled" : "none",
    note: fromSeed.length
      ? `${provider} did not respond in time${reason ? ` (${reason})` : ""}; showing our last saved copy of the same series.`
      : `${provider} did not respond in time${reason ? ` (${reason})` : ""} and we have no saved copy yet — shown as sample data until it does.`,
  };
}

export async function getHistory(key: string): Promise<HistoryPayload> {
  const wb = WB_MAP.find((m) => m.key === key);
  if (wb) {
    const ids = (codes: string[]) => Object.fromEntries(codes.map((c) => [c, wb.wb]));
    try {
      const data = await wbFetchHistory(CODES(), wb.wb, { revalidate: DAY, timeoutMs: 25000, tags: [HISTORY_TAG] });
      if (data.size > 0) {
        const series: Record<string, HistoryPoint[]> = {};
        for (const [code, pts] of data) series[code] = pts.map(([p, v]) => [p, sig4(wb.scale ? v * wb.scale : v)]);
        return { key, provider: "World Bank", freq: "A", series, seriesIds: ids(Object.keys(series)), retrieved: today(), origin: "live" };
      }
    } catch {
      /* slow / down — use the committed snapshot below */
    }
    const series = SEED.indicators[key] ?? {};
    return {
      key, provider: "World Bank", freq: "A", series, seriesIds: ids(Object.keys(series)),
      retrieved: SEED.retrieved, origin: Object.keys(series).length ? "bundled" : "none",
      note: "World Bank did not respond in time; showing our last saved copy of the same series.",
    };
  }

  const kl = KEYLESS_HISTORY[key];
  if (kl) {
    const r = await getKeylessSeries(key);
    return { key, provider: kl.provider, freq: kl.freq, ...r };
  }

  if (key === ETF_HISTORY_KEY) {
    const r = await getEtfReturnHistory();
    const any = Object.keys(r.series).length > 0;
    return {
      key, provider: "Alpha Vantage", freq: "A", series: r.series, seriesIds: r.seriesIds,
      retrieved: today(), origin: any ? "live" : "none", note: r.note,
    };
  }

  return { key, provider: null, freq: null, series: {}, seriesIds: {}, retrieved: "", origin: "none", note: "No free historical source for this indicator." };
}
