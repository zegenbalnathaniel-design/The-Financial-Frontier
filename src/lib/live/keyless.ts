// Keyless official-statistics APIs: OECD SDMX, BIS data portal, IMF DataMapper.
//
// None of these needs an API key. One HTTP call fetches one series family for every
// economy at once, and the same call serves both the live snapshot (latest value) and the
// trend lines (/api/history/[key]), so the Next.js fetch cache answers the second caller.
//
// DATA HONESTY: only observations an upstream returned are emitted. Where we derive a
// figure (year-on-year % from an index level) the derivation is exact arithmetic on two
// real observations of the same series; nothing is interpolated. An economy a source
// doesn't cover is simply absent and stays labelled as sample data in the UI.
//
// Deliberately free of imports so scripts/build-history-seed.mts can load it directly.
//
//   OECD  https://sdmx.oecd.org/public/rest/data/{flow}/{key}   (SDMX-CSV)
//   BIS   https://stats.bis.org/api/v2/data/dataflow/BIS/{flow}/1.0/{key}?format=csv
//   IMF   https://www.imf.org/external/datamapper/api/v1/{indicator}/{ISO3}/…

export type Freq = "A" | "Q" | "M";
export type Pt = [string, number];
export type KeylessProvider = "OECD" | "BIS" | "IMF";

export interface KeylessSeries {
  /** short upstream series id shown next to the chart */
  id: string;
  freq: Freq;
  /** oldest → newest */
  points: Pt[];
}

export interface FetchOpts {
  revalidate?: number;
  timeoutMs?: number;
  tags?: string[];
}

/** ISO-3166 alpha-2 (our country codes) → alpha-3 (OECD / IMF codes). */
export const ISO3: Record<string, string> = {
  US: "USA", CA: "CAN", MX: "MEX", BR: "BRA", AR: "ARG", CL: "CHL", GB: "GBR", DE: "DEU",
  FR: "FRA", IT: "ITA", ES: "ESP", CH: "CHE", RU: "RUS", ZA: "ZAF", NG: "NGA", EG: "EGY",
  MZ: "MOZ", KE: "KEN", IN: "IND", CN: "CHN", JP: "JPN", KR: "KOR", ID: "IDN", MY: "MYS",
  SG: "SGP", SA: "SAU", AE: "ARE", TR: "TUR", AU: "AUS", NZ: "NZL",
};
const ISO2: Record<string, string> = Object.fromEntries(Object.entries(ISO3).map(([a, b]) => [b, a]));

/** Euro-area members among our economies — BIS publishes one ECB policy rate ("XM") for them. */
const EURO_MEMBERS = ["DE", "FR", "IT", "ES"];

const OECD = "https://sdmx.oecd.org/public/rest/data";
const BIS = "https://stats.bis.org/api/v2/data/dataflow/BIS";
const IMF = "https://www.imf.org/external/datamapper/api/v1";
const START = "1995-01";

// ── one upstream query ("leg") ─────────────────────────────────────────────────────────
interface Leg {
  provider: KeylessProvider;
  id: string;
  freq: Freq;
  /** URL for these ISO-2 codes */
  url: (codes: string[]) => string;
  /** index level → % change on the same period a year earlier */
  yoy?: boolean;
  /** BIS: map the euro-area aggregate (XM) onto each member, splicing older national data */
  euroArea?: boolean;
}

interface KeylessDef {
  key: string;
  provider: KeylessProvider;
  /** priority order. Same-frequency legs are spliced (later legs only add OLDER periods);
   *  a leg with a different frequency is used only for economies no earlier leg covered. */
  legs: Leg[];
}

const oecd = (flow: string, key: (areas: string) => string) => (codes: string[]) =>
  `${OECD}/${flow}/${key(codes.map((c) => ISO3[c]).filter(Boolean).join("+"))}?startPeriod=${START}&detail=dataonly`;

const bis = (flow: string, key: (areas: string) => string) => (codes: string[]) => {
  const areas = new Set(codes);
  if (codes.some((c) => EURO_MEMBERS.includes(c))) areas.add("XM");
  return `${BIS}/${flow}/1.0/${key([...areas].join("+"))}?startPeriod=${START}&format=csv&detail=dataonly`;
};

export const KEYLESS: KeylessDef[] = [
  {
    key: "coreInflation", provider: "OECD",
    legs: [
      // COICOP 2018 is where countries publish now; COICOP 1999 carries the older history.
      { provider: "OECD", id: "PRICES_C2018 CPI ex food & energy", freq: "M",
        url: oecd("OECD.SDD.TPS,DSD_PRICES_COICOP2018@DF_PRICES_C2018_N_TXCP01_NRG,1.0", (a) => `${a}.M.N.CPI.PA._TXCP01_NRG.N.GY`) },
      { provider: "OECD", id: "PRICES CPI ex food & energy", freq: "M",
        url: oecd("OECD.SDD.TPS,DSD_PRICES@DF_PRICES_N_TXCP01_NRG,1.0", (a) => `${a}.M.N.CPI.PA._TXCP01_NRG.N.GY`) },
    ],
  },
  {
    key: "industrialProduction", provider: "OECD",
    legs: [
      { provider: "OECD", id: "STES PRVM BTE (monthly)", freq: "M", yoy: true,
        url: oecd("OECD.SDD.STES,DSD_STES@DF_INDSERV,4.3", (a) => `${a}.M.PRVM.IX.BTE.Y....`) },
      { provider: "OECD", id: "STES PRVM BTE (quarterly)", freq: "Q", yoy: true,
        url: oecd("OECD.SDD.STES,DSD_STES@DF_INDSERV,4.3", (a) => `${a}.Q.PRVM.IX.BTE.Y....`) },
    ],
  },
  {
    key: "retailSales", provider: "OECD",
    legs: [
      { provider: "OECD", id: "STES TOVM G47 (monthly)", freq: "M", yoy: true,
        url: oecd("OECD.SDD.STES,DSD_STES@DF_INDSERV,4.3", (a) => `${a}.M.TOVM.IX.G47.Y....`) },
      { provider: "OECD", id: "STES TOVM G47 (quarterly)", freq: "Q", yoy: true,
        url: oecd("OECD.SDD.STES,DSD_STES@DF_INDSERV,4.3", (a) => `${a}.Q.TOVM.IX.G47.Y....`) },
    ],
  },
  {
    key: "consumerConfidence", provider: "OECD",
    legs: [
      { provider: "OECD", id: "CLI CCICP (amplitude-adjusted, avg = 100)", freq: "M",
        url: oecd("OECD.SDD.STES,DSD_STES@DF_CLI,4.1", (a) => `${a}.M.CCICP.IX._Z.AA.IX._Z.H`) },
    ],
  },
  {
    key: "wageGrowth", provider: "OECD",
    legs: [
      { provider: "OECD", id: "PDB LCEMP compensation per employee", freq: "Q",
        url: oecd("OECD.SDD.TPS,DSD_PDB@DF_PDB_ULC_Q,1.0", (a) => `${a}.Q.LCEMP._T.PA.V.GY.S.NC`) },
    ],
  },
  {
    key: "productivity", provider: "OECD",
    legs: [
      { provider: "OECD", id: "PDB GDPEMP GDP per person employed", freq: "Q",
        url: oecd("OECD.SDD.TPS,DSD_PDB@DF_PDB_ULC_Q,1.0", (a) => `${a}.Q.GDPEMP._T.PA.Q.GY.S.NC`) },
    ],
  },
  {
    key: "tenYearYield", provider: "OECD",
    legs: [
      { provider: "OECD", id: "FINMARK IRLT long-term rate", freq: "M",
        url: oecd("OECD.SDD.STES,DSD_STES@DF_FINMARK,4.0", (a) => `${a}.M.IRLT.PA.....`) },
    ],
  },
  {
    key: "policyRate", provider: "BIS",
    legs: [
      { provider: "BIS", id: "WS_CBPOL (end of month)", freq: "M", euroArea: true,
        url: bis("WS_CBPOL", (a) => `M.${a}`) },
    ],
  },
  {
    key: "housingPrice", provider: "BIS",
    legs: [
      { provider: "BIS", id: "WS_SPP nominal, y/y", freq: "Q",
        url: bis("WS_SPP", (a) => `Q.${a}.N.771`) },
    ],
  },
  {
    key: "debtToGdp", provider: "IMF",
    legs: [
      { provider: "IMF", id: "WEO GGXWDG_NGDP general govt gross debt", freq: "A",
        // The unfiltered call (~100 KB, every economy) is the reliable one: long ISO-3 path
        // lists 404. fetchLeg keeps only the economies asked for.
        url: () => `${IMF}/GGXWDG_NGDP` },
    ],
  },
];

export const KEYLESS_KEYS = KEYLESS.map((d) => d.key);

// ── parsing ────────────────────────────────────────────────────────────────────────────

/** RFC-4180 CSV → array of records keyed by the header row (handles quoted commas/newlines). */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else q = false;
      } else field += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else field += ch;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  const [head, ...body] = rows;
  if (!head) return [];
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.replace(/^﻿/, ""), r[i] ?? ""])));
}

/** "2026-03" / "2026-Q1" / "2026" → the same period one year earlier. */
function yearBefore(p: string): string {
  return String(Number(p.slice(0, 4)) - 1) + p.slice(4);
}

function periodKey(p: string): number {
  const m = /^(\d{4})(?:-(Q)?(\d{1,2}))?/.exec(p);
  if (!m) return 0;
  const y = Number(m[1]);
  if (!m[3]) return y;
  return m[2] ? y + (Number(m[3]) - 1) / 4 : y + (Number(m[3]) - 1) / 12;
}

const sig4 = (v: number) => Number(v.toPrecision(4));

function toYoy(points: Pt[]): Pt[] {
  const byP = new Map(points);
  const out: Pt[] = [];
  for (const [p, v] of points) {
    const prev = byP.get(yearBefore(p));
    if (prev == null || prev === 0) continue;
    out.push([p, sig4((v / prev - 1) * 100)]);
  }
  return out;
}

/** Ascending, one observation per period (if a wildcard key ever matches two series, the first wins). */
function sortPts(points: Pt[]): Pt[] {
  const seen = new Set<string>();
  return points
    .filter(([p]) => (seen.has(p) ? false : (seen.add(p), true)))
    .sort((a, b) => periodKey(a[0]) - periodKey(b[0]));
}

// OECD throttles bursts (it answers 429/500 to parallel queries from one IP, and its
// Cloudflare front end starts serving bot challenges after a few dozen quick calls), so OECD
// calls run one at a time per process and a challenge is never retried — callers fall back
// to the committed seed instead. A cache hit still returns immediately.
let oecdQueue: Promise<unknown> = Promise.resolve();
function serialOecd<T>(url: string, run: () => Promise<T>): Promise<T> {
  if (!url.startsWith(OECD)) return run();
  const next = oecdQueue.then(run, run);
  oecdQueue = next.catch(() => undefined);
  return next;
}

async function getText(url: string, opts: FetchOpts, accept?: string): Promise<string> {
  const once = async () => {
    const res = await fetch(url, {
      headers: accept ? { Accept: accept } : undefined,
      next: { revalidate: opts.revalidate ?? 86400, tags: opts.tags },
      signal: AbortSignal.timeout(opts.timeoutMs ?? 20000),
    } as RequestInit);
    // OECD answers 404 "NoResultsFound" when a key matches nothing — that is "no data", not an error.
    if (res.status === 404) return "";
    if (res.headers.get("cf-mitigated")) throw Object.assign(new Error("bot challenge (throttled)"), { status: 403 });
    if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status });
    return res.text();
  };
  return serialOecd(url, async () => {
    try {
      return await once();
    } catch (e) {
      const status = (e as { status?: number }).status ?? 0;
      if (status && status < 429) throw e; // 4xx other than throttling: retrying won't help
      await new Promise((r) => setTimeout(r, 1500));
      return once();
    }
  });
}

/** One leg → ISO-2 code → raw points (before y/y). */
async function fetchLeg(leg: Leg, codes: string[], opts: FetchOpts): Promise<Map<string, Pt[]>> {
  const out = new Map<string, Pt[]>();
  const push = (code: string, p: string, v: number) => {
    const arr = out.get(code) ?? [];
    arr.push([p, v]);
    out.set(code, arr);
  };

  if (leg.provider === "IMF") {
    const json = JSON.parse(await getText(leg.url(codes), opts) || "{}") as { values?: Record<string, Record<string, Record<string, number | null>>> };
    const byArea = Object.values(json.values ?? {})[0] ?? {};
    // WEO carries projections years ahead — keep completed years only.
    const lastYear = new Date().getUTCFullYear() - 1;
    for (const [iso3, years] of Object.entries(byArea)) {
      const code = ISO2[iso3];
      if (!code || !codes.includes(code)) continue;
      for (const [y, v] of Object.entries(years)) {
        if (v == null || !Number.isFinite(v) || Number(y) > lastYear) continue;
        push(code, y, v);
      }
    }
  } else {
    const text = await getText(leg.url(codes), opts, leg.provider === "OECD" ? "application/vnd.sdmx.data+csv; charset=utf-8" : undefined);
    for (const r of parseCsv(text)) {
      const area = r.REF_AREA;
      const v = Number(r.OBS_VALUE);
      const p = r.TIME_PERIOD;
      if (!area || !p || r.OBS_VALUE === "" || r.OBS_VALUE === "NaN" || !Number.isFinite(v)) continue;
      const code = leg.provider === "OECD" ? ISO2[area] : area;
      if (code) push(code, p, v);
    }
  }

  for (const [code, pts] of out) out.set(code, sortPts(pts));

  if (leg.euroArea) {
    const ea = out.get("XM");
    for (const m of EURO_MEMBERS) {
      if (!ea || !codes.includes(m)) continue;
      const own = out.get(m) ?? [];
      const first = periodKey(ea[0][0]);
      out.set(m, [...own.filter(([p]) => periodKey(p) < first), ...ea]); // national rate before the euro
    }
    out.delete("XM");
  }
  for (const code of [...out.keys()]) if (!codes.includes(code)) out.delete(code);
  return out;
}

/**
 * Full history of one keyless indicator for many economies. Throws only when EVERY leg
 * failed (so callers can fall back to the committed seed); a partial answer is returned.
 */
export async function fetchKeylessHistory(key: string, codes: string[], opts: FetchOpts = {}): Promise<Map<string, KeylessSeries>> {
  const def = KEYLESS.find((d) => d.key === key);
  const out = new Map<string, KeylessSeries>();
  if (!def) return out;

  const results = await Promise.allSettled(def.legs.map((leg) => fetchLeg(leg, codes, opts)));
  if (results.every((r) => r.status === "rejected")) {
    throw new Error(`${def.provider} ${key}: ${(results[0] as PromiseRejectedResult).reason?.message ?? "failed"}`);
  }

  def.legs.forEach((leg, i) => {
    const r = results[i];
    if (r.status !== "fulfilled") return;
    for (const [code, raw] of r.value) {
      const pts = leg.yoy ? toYoy(raw) : raw;
      if (pts.length === 0) continue;
      const have = out.get(code);
      if (!have) { out.set(code, { id: leg.id, freq: leg.freq, points: pts }); continue; }
      if (have.freq !== leg.freq) continue; // different frequency: only fills uncovered economies
      const first = periodKey(have.points[0][0]);
      const older = pts.filter(([p]) => periodKey(p) < first);
      if (older.length) have.points = [...older, ...have.points];
    }
  });
  return out;
}

/** Whether `period` is recent enough to present as a "latest" value today. */
export function isFresh(period: string, now = new Date()): boolean {
  const age = now.getUTCFullYear() + now.getUTCMonth() / 12 - periodKey(period);
  return /^\d{4}$/.test(period) ? age <= 3 : age <= 2;
}

/** BIS daily policy rates (latest observation) — fresher than the end-of-month series. */
export async function fetchBisPolicyLatest(codes: string[], opts: FetchOpts = {}): Promise<Map<string, { value: number; asOf: string }>> {
  const out = new Map<string, { value: number; asOf: string }>();
  const areas = new Set(codes);
  if (codes.some((c) => EURO_MEMBERS.includes(c))) areas.add("XM");
  const text = await getText(`${BIS}/WS_CBPOL/1.0/D.${[...areas].join("+")}?lastNObservations=1&format=csv&detail=dataonly`, opts);
  for (const r of parseCsv(text)) {
    const v = Number(r.OBS_VALUE);
    if (!r.REF_AREA || !r.TIME_PERIOD || r.OBS_VALUE === "" || !Number.isFinite(v)) continue;
    out.set(r.REF_AREA, { value: v, asOf: r.TIME_PERIOD });
  }
  const ea = out.get("XM");
  if (ea) for (const m of EURO_MEMBERS) if (codes.includes(m)) out.set(m, ea);
  out.delete("XM");
  for (const code of [...out.keys()]) if (!codes.includes(code)) out.delete(code);
  return out;
}
