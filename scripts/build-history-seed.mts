// Refreshes src/data/history-seed.json — a committed snapshot of REAL history for every
// keyless source: World Bank (annual) plus OECD, BIS and IMF (src/lib/live/keyless.ts).
// /api/history/[key] and the live snapshot serve the live upstream when it answers in time
// and fall back to this snapshot when it doesn't (OECD in particular throttles bursts), so a
// slow or rate-limited upstream never downgrades the trend lines to sample data.
//
//   npm run history-seed        (Node ≥ 23.6: loads the .ts modules via type stripping)
//
// Refresh it every month or two; the live layer keeps values current in between.
// Alpha Vantage ETF returns need a key and are not seeded.

import { readFileSync, writeFileSync } from "node:fs";
import { COUNTRIES } from "../src/lib/countries.ts";
import { WB_MAP, sig4 } from "../src/lib/history.ts";
import { wbFetchHistory } from "../src/lib/live/worldbank.ts";
import { KEYLESS, fetchKeylessHistory } from "../src/lib/live/keyless.ts";

const codes = COUNTRIES.map((c) => c.code);
const indicators: Record<string, Record<string, [string, number][]>> = {};
const ids: Record<string, Record<string, string>> = {};
const freqs: Record<string, Record<string, string>> = {};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

for (const m of WB_MAP) {
  let data: Map<string, [string, number][]> | null = null;
  for (let attempt = 1; attempt <= 3 && !data; attempt++) {
    try {
      data = await wbFetchHistory(codes, m.wb, { timeoutMs: 90000 });
    } catch (e) {
      console.warn(`  ${m.key} (${m.wb}) attempt ${attempt} failed: ${(e as Error).message}`);
    }
  }
  if (!data) throw new Error(`Could not fetch ${m.wb} — seed not written`);
  indicators[m.key] = Object.fromEntries(
    [...data].map(([code, pts]) => [code, pts.map(([p, v]) => [p, sig4(m.scale ? v * m.scale : v)] as [string, number])]),
  );
  const n = Object.keys(indicators[m.key]).length;
  const last = Math.max(...[...data.values()].map((p) => Number(p[p.length - 1][0])));
  console.log(`✓ ${m.key.padEnd(20)} World Bank ${m.wb.padEnd(20)} ${n}/${codes.length} economies, latest ${last}`);
}

// Keep the previous seed's copy of any keyless indicator we can't fetch this time.
const prev = JSON.parse(readFileSync(new URL("../src/data/history-seed.json", import.meta.url), "utf8")) as {
  indicators?: Record<string, Record<string, [string, number][]>>; ids?: typeof ids; freqs?: typeof freqs;
};

for (const d of KEYLESS) {
  let data: Awaited<ReturnType<typeof fetchKeylessHistory>> | null = null;
  for (let attempt = 1; attempt <= 3 && !data; attempt++) {
    try {
      const r = await fetchKeylessHistory(d.key, codes, { timeoutMs: 90000 });
      // A partial answer (one leg throttled) is retried rather than seeded incomplete.
      if (attempt < 3 && d.legs.length > 1 && new Set([...r.values()].map((s) => s.id)).size < d.legs.length) {
        throw new Error(`only ${r.size} economies (a leg failed)`);
      }
      data = r;
    } catch (e) {
      const msg = (e as Error).message;
      console.warn(`  ${d.key} attempt ${attempt} failed: ${msg}`);
      if (/challenge/.test(msg)) break; // throttled by OECD's front end — don't keep knocking
      await sleep(15000 * attempt);
    }
  }
  if (!data || data.size === 0) {
    if (prev.indicators?.[d.key]) {
      indicators[d.key] = prev.indicators[d.key];
      if (prev.ids?.[d.key]) ids[d.key] = prev.ids[d.key];
      if (prev.freqs?.[d.key]) freqs[d.key] = prev.freqs[d.key];
      console.warn(`! ${d.key.padEnd(20)} kept the previous seed copy`);
    } else {
      console.warn(`! ${d.key.padEnd(20)} NOT seeded (no previous copy) — rerun later`);
    }
    continue;
  }
  indicators[d.key] = Object.fromEntries([...data].map(([code, s]) => [code, s.points]));
  ids[d.key] = Object.fromEntries([...data].map(([code, s]) => [code, s.id]));
  freqs[d.key] = Object.fromEntries([...data].map(([code, s]) => [code, s.freq]));
  const latest = [...data.values()].map((s) => s.points[s.points.length - 1][0]).sort().pop();
  console.log(`✓ ${d.key.padEnd(20)} ${d.provider.padEnd(10)} ${String(data.size).padStart(2)}/${codes.length} economies, latest ${latest}`);
  if (d.provider === "OECD") await sleep(45000); // OECD throttles bursts and heavy queries — go slowly
}

const out = { retrieved: new Date().toISOString().slice(0, 10), source: "World Bank WDI · OECD · BIS · IMF WEO", indicators, ids, freqs };
writeFileSync(new URL("../src/data/history-seed.json", import.meta.url), JSON.stringify(out) + "\n");
console.log("Wrote src/data/history-seed.json");
