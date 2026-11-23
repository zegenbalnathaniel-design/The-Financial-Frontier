// Orchestrator: assembles a LiveSnapshot from every source, with per-field provenance.
// Fully fail-safe — any source that throws or is unconfigured contributes nothing and
// the static (illustrative) dataset shows through. Cached for a day via fetch()
// revalidate on each source, so calling this on every request is cheap.
//
// Sources, in the order they are layered (later layers only replace a value when noted):
//   World Bank (annual)  →  OECD / BIS / IMF keyless series (latest observation of the same
//   series the trend lines plot)  →  BIS daily policy rates  →  ECB FX  →  FRED (daily;
//   fills policy-rate gaps, replaces a 10y yield only when newer)  →  Finnhub/Alpha moves
//   →  Alpha Vantage ETF year-to-date returns.

import { COUNTRIES } from "@/lib/countries";
import type { LiveSnapshot, Provenance } from "./types";
import { liveKey } from "./types";
import { wbFetchIndicator } from "./worldbank";
import { fetchFxYtd } from "./frankfurter";
import { fetchFred } from "./fred";
import { getWorldMoves, getEtfYtd } from "./worldMarkets";
import { fetchBisPolicyLatest, isFresh } from "./keyless";
import { getKeylessSeries } from "./history";
import { WB_MAP, KEYLESS_HISTORY, periodNum } from "@/lib/history"; // indicator key → World Bank series (+ unit scale)

const PROVIDER_LABEL: Record<string, string> = { OECD: "OECD", BIS: "BIS", IMF: "IMF WEO" };

/** "2026", "2026-Q3", "2026-10" or "2026-11-20" → fractional year, for "which is newer". */
function asOfNum(s: string): number {
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (d) return Number(d[1]) + (Number(d[2]) - 1) / 12 + (Number(d[3]) - 1) / 372;
  return periodNum(s);
}

export async function getLiveSnapshot(): Promise<LiveSnapshot> {
  const codes = COUNTRIES.map((c) => c.code);
  const currencies = COUNTRIES.map((c) => c.data.currency);
  const values: Record<string, Provenance> = {};
  const sources = new Set<string>();

  // --- World Bank (parallel per indicator) -------------------------------------
  const wbResults = await Promise.allSettled(
    WB_MAP.map(async (m) => ({ m, data: await wbFetchIndicator(codes, m.wb) })),
  );
  for (const r of wbResults) {
    if (r.status !== "fulfilled") continue;
    const { m, data } = r.value;
    for (const [code, obs] of data) {
      const value = m.scale ? +(obs.value * m.scale).toFixed(4) : obs.value;
      values[liveKey(code, m.key)] = { value, source: "World Bank", asOf: obs.year };
      sources.add("World Bank");
    }
  }

  // --- OECD / BIS / IMF (keyless): latest observation of each trend-line series ----
  // Same upstream requests as /api/history (shared fetch cache), seed fallback built in.
  // Observations older than ~2 years (annual: 3) are not presented as "latest".
  const keyless = await Promise.allSettled(
    Object.entries(KEYLESS_HISTORY).map(async ([key, meta]) => ({ key, meta, r: await getKeylessSeries(key) })),
  );
  for (const k of keyless) {
    if (k.status !== "fulfilled") continue;
    const { key, meta, r } = k.value;
    for (const [code, pts] of Object.entries(r.series)) {
      const last = pts[pts.length - 1];
      if (!last || !isFresh(last[0])) continue;
      const label = PROVIDER_LABEL[meta.provider] ?? meta.provider;
      values[liveKey(code, key)] = { value: last[1], source: label, asOf: last[0] };
      sources.add(label);
    }
  }

  // --- BIS daily policy rates (fresher than the end-of-month series above) -----------
  try {
    const daily = await fetchBisPolicyLatest(codes, { revalidate: 21600, timeoutMs: 8000 });
    const now = Date.now();
    for (const [code, obs] of daily) {
      if (now - Date.parse(obs.asOf) > 183 * 86400e3) continue; // e.g. a central bank that dropped its policy rate
      values[liveKey(code, "policyRate")] = { value: obs.value, source: "BIS", asOf: obs.asOf };
      sources.add("BIS");
    }
  } catch {
    /* BIS daily unavailable — the monthly value above stands */
  }

  // --- Frankfurter FX (YTD vs USD → currencyChange) ----------------------------
  try {
    const fx = await fetchFxYtd(currencies);
    for (const c of COUNTRIES) {
      const move = fx.get(c.data.currency);
      if (move) {
        values[liveKey(c.code, "currencyChange")] = { value: move.ytdPct, source: "ECB/Frankfurter", asOf: move.asOf };
        sources.add("ECB/Frankfurter");
      }
    }
  } catch {
    /* FX unavailable — skip */
  }

  // --- FRED (policy rates, 10y yields, US unemployment) ------------------------
  try {
    const fred = await fetchFred(process.env.FRED_API_KEY);
    for (const [k, obs] of fred) {
      const have = values[k];
      // BIS publishes the official policy rate (FRED's DFF is the effective rate): fill gaps only.
      if (have && k.endsWith(":policyRate")) continue;
      // 10y yields: OECD monthly averages vs FRED daily — keep whichever is newer.
      if (have && k.endsWith(":tenYearYield") && asOfNum(obs.asOf) <= asOfNum(have.asOf)) continue;
      values[k] = { value: obs.value, source: "FRED", asOf: obs.asOf };
      sources.add("FRED");
    }
  } catch {
    /* FRED unavailable — skip */
  }

  // --- World markets (daily move → `change`) -----------------------------------
  // Country ETFs via Finnhub, with Alpha Vantage as a daily-cached backup.
  const prices = new Map<string, { price: number; asOf: string }>();
  try {
    for (const m of await getWorldMoves()) {
      values[liveKey(m.country, "change")] = { value: m.changePct, source: `${m.source} (via ${m.etf})`, asOf: m.asOf };
      sources.add(m.source);
      prices.set(m.country, { price: m.price, asOf: m.asOf });
    }
  } catch {
    /* market feeds unavailable — skip */
  }

  // --- Equity returns YTD (Alpha Vantage monthly-adjusted country ETFs) ---------------
  try {
    for (const y of await getEtfYtd(prices)) {
      values[liveKey(y.country, "marketReturnYtd")] = { value: y.value, source: y.source, asOf: y.asOf };
      sources.add("Alpha Vantage");
    }
  } catch {
    /* Alpha Vantage unavailable — YTD stays labelled sample */
  }

  return { values, sources: Array.from(sources), generatedAt: new Date().toISOString() };
}
