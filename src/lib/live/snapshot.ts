// Orchestrator: assembles a LiveSnapshot from every source, with per-field provenance.
// Fully fail-safe — any source that throws or is unconfigured contributes nothing and
// the static (illustrative) dataset shows through. Cached for a day via fetch()
// revalidate on each source, so calling this on every request is cheap.

import { COUNTRIES } from "@/lib/countries";
import type { LiveSnapshot, Provenance } from "./types";
import { liveKey } from "./types";
import { wbFetchIndicator } from "./worldbank";
import { fetchFxYtd } from "./frankfurter";
import { fetchFred } from "./fred";
import { getWorldMoves } from "./worldMarkets";
import { WB_MAP } from "@/lib/history"; // indicator key → World Bank series (+ unit scale)

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
      values[k] = { value: obs.value, source: "FRED", asOf: obs.asOf };
      sources.add("FRED");
    }
  } catch {
    /* FRED unavailable — skip */
  }

  // --- World markets (daily move → `change`) -----------------------------------
  // Country ETFs via Finnhub, with Alpha Vantage as a daily-cached backup.
  try {
    for (const m of await getWorldMoves()) {
      values[liveKey(m.country, "change")] = { value: m.changePct, source: `${m.source} (via ${m.etf})`, asOf: m.asOf };
      sources.add(m.source);
    }
  } catch {
    /* market feeds unavailable — skip */
  }

  return { values, sources: Array.from(sources), generatedAt: new Date().toISOString() };
}
