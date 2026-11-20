// Server-side loader for /api/history/[key].
//
// World Bank indicators: live World Bank (25s timeout, cached a day), falling back to the
// committed real-data snapshot in src/data/history-seed.json when the upstream is slow or
// down. FRED indicators: live FRED when FRED_API_KEY is set, otherwise no series (the UI
// then shows labelled sample data). Anything else: no source.

import "server-only";
import { COUNTRIES } from "@/lib/countries";
import { WB_MAP, FRED_HISTORY_KEYS, HISTORY_TAG, sig4, type HistoryPayload, type HistoryPoint } from "@/lib/history";
import seed from "@/data/history-seed.json";
import { wbFetchHistory } from "./worldbank";
import { fetchFredHistory } from "./fred";

const DAY = 86400;

type Seed = { retrieved: string; indicators: Record<string, Record<string, HistoryPoint[]>> };
const SEED = seed as unknown as Seed;

const today = () => new Date().toISOString().slice(0, 10);

export async function getHistory(key: string): Promise<HistoryPayload> {
  const wb = WB_MAP.find((m) => m.key === key);
  if (wb) {
    const ids = (codes: string[]) => Object.fromEntries(codes.map((c) => [c, wb.wb]));
    try {
      const data = await wbFetchHistory(COUNTRIES.map((c) => c.code), wb.wb, { revalidate: DAY, timeoutMs: 25000, tags: [HISTORY_TAG] });
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

  if (FRED_HISTORY_KEYS.includes(key)) {
    const apiKey = process.env.FRED_API_KEY;
    const data = await fetchFredHistory(apiKey, key, { revalidate: DAY, timeoutMs: 10000, tags: [HISTORY_TAG] }).catch(() => new Map());
    const series: Record<string, HistoryPoint[]> = {};
    const seriesIds: Record<string, string> = {};
    for (const [code, s] of data) { series[code] = s.points; seriesIds[code] = s.id; }
    const any = Object.keys(series).length > 0;
    return {
      key, provider: "FRED", freq: "M", series, seriesIds, retrieved: today(), origin: any ? "live" : "none",
      note: any ? undefined : apiKey ? "FRED did not respond in time." : "FRED history needs FRED_API_KEY.",
    };
  }

  return { key, provider: null, freq: null, series: {}, seriesIds: {}, retrieved: "", origin: "none", note: "No free historical source for this indicator." };
}
