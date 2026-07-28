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
import { fetchIndexMoves } from "./finnhub";

// Our indicator key → World Bank series id (+ optional scale to the indicator's unit).
// These are all annual; a daily refresh catches new releases.
const WB_MAP: { key: string; wb: string; scale?: number }[] = [
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

  // --- Finnhub (daily index move → `change`) -----------------------------------
  try {
    const moves = await fetchIndexMoves(process.env.FINNHUB_API_KEY);
    for (const [k, q] of moves) {
      values[k] = { value: q.changePct, source: "Finnhub", asOf: q.asOf };
      sources.add("Finnhub");
    }
  } catch {
    /* Finnhub unavailable — skip */
  }

  return { values, sources: Array.from(sources), generatedAt: new Date().toISOString() };
}
