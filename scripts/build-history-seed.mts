// Refreshes src/data/history-seed.json — a committed snapshot of REAL World Bank history
// for every World Bank-backed indicator. /api/history/[key] serves live World Bank data
// when the upstream answers in time and falls back to this snapshot when it doesn't, so
// a slow World Bank never downgrades the trend lines to sample data.
//
//   npm run history-seed        (Node ≥ 23.6: loads the .ts modules via type stripping)
//
// World Bank publishes annually, so refreshing this a few times a year is plenty.

import { writeFileSync } from "node:fs";
import { COUNTRIES } from "../src/lib/countries.ts";
import { WB_MAP, sig4 } from "../src/lib/history.ts";
import { wbFetchHistory } from "../src/lib/live/worldbank.ts";

const codes = COUNTRIES.map((c) => c.code);
const indicators: Record<string, Record<string, [string, number][]>> = {};

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
  console.log(`✓ ${m.key.padEnd(18)} ${m.wb.padEnd(20)} ${n}/${codes.length} economies, latest ${last}`);
}

const out = { retrieved: new Date().toISOString().slice(0, 10), source: "World Bank WDI", indicators };
writeFileSync(new URL("../src/data/history-seed.json", import.meta.url), JSON.stringify(out) + "\n");
console.log("Wrote src/data/history-seed.json");
