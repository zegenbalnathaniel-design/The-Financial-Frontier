import "server-only";
import { unstable_cache } from "next/cache";

// World stock markets — today's move for each economy on the globe and the Market Pulse
// "World markets" row.
//
// Index quotes (Nikkei, DAX, Sensex…) are paid on both Finnhub and Alpha Vantage, so each
// market is tracked through its US-listed country ETF (EWJ for Japan, EWG for Germany …).
// The ETF trades in New York, so its daily move reflects that market in dollar terms —
// the UI says so ("via EWJ").
//
// Sources, in order:
//   1. Finnhub  (FINNHUB_API_KEY / FIN_HUB_API_KEY) — live quotes, 5-minute cache, 60 calls/min.
//   2. Alpha Vantage (ALPHA_API_KEY / ALPHA_VANTAGE_API_KEY) — backup for any market Finnhub
//      doesn't return. The free tier allows 25 calls a day and ~5 a minute, so each symbol is
//      cached for a day and at most 5 are requested per refresh.
// No key, a 429 or an empty quote just leaves that market on its labelled sample value.
//
// Year-to-date returns (indicator `marketReturnYtd`) and their calendar-year history come from
// Alpha Vantage TIME_SERIES_MONTHLY_ADJUSTED per ETF — see "Equity returns" below.

const FINNHUB = "https://finnhub.io/api/v1/quote";
const ALPHA = "https://www.alphavantage.co/query";
const FINNHUB_TTL = 300;
const ALPHA_TTL = 86400;
const ALPHA_MAX_PER_REFRESH = 5;
const TIMEOUT_MS = 4000;

/** Country → US-listed ETF that tracks its stock market. Economies without a liquid ETF are omitted. */
export const WORLD_ETFS: Record<string, { etf: string; market: string }> = {
  US: { etf: "SPY", market: "S&P 500" },
  CA: { etf: "EWC", market: "Canada" },
  MX: { etf: "EWW", market: "Mexico" },
  BR: { etf: "EWZ", market: "Brazil" },
  AR: { etf: "ARGT", market: "Argentina" },
  CL: { etf: "ECH", market: "Chile" },
  GB: { etf: "EWU", market: "UK" },
  DE: { etf: "EWG", market: "Germany" },
  FR: { etf: "EWQ", market: "France" },
  IT: { etf: "EWI", market: "Italy" },
  ES: { etf: "EWP", market: "Spain" },
  CH: { etf: "EWL", market: "Switzerland" },
  ZA: { etf: "EZA", market: "South Africa" },
  IN: { etf: "INDA", market: "India" },
  CN: { etf: "MCHI", market: "China" },
  JP: { etf: "EWJ", market: "Japan" },
  KR: { etf: "EWY", market: "South Korea" },
  ID: { etf: "EIDO", market: "Indonesia" },
  MY: { etf: "EWM", market: "Malaysia" },
  SG: { etf: "EWS", market: "Singapore" },
  SA: { etf: "KSA", market: "Saudi Arabia" },
  AE: { etf: "UAE", market: "UAE" },
  TR: { etf: "TUR", market: "Türkiye" },
  AU: { etf: "EWA", market: "Australia" },
  NZ: { etf: "ENZL", market: "New Zealand" },
};

export interface WorldMove {
  country: string;
  market: string;
  etf: string;
  price: number;
  changePct: number;
  source: "Finnhub" | "Alpha Vantage";
  asOf: string; // YYYY-MM-DD
}

const finnhubKey = () => process.env.FINNHUB_API_KEY ?? process.env.FIN_HUB_API_KEY;
const alphaKey = () => process.env.ALPHA_API_KEY ?? process.env.ALPHA_VANTAGE_API_KEY;

async function getJson<T>(url: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate }, signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function fromFinnhub(key: string, etf: string): Promise<Omit<WorldMove, "country" | "market" | "etf"> | null> {
  const q = await getJson<{ c?: number; dp?: number | null; t?: number }>(`${FINNHUB}?symbol=${etf}&token=${key}`, FINNHUB_TTL);
  if (!q || !q.c || q.dp == null) return null;
  const asOf = q.t ? new Date(q.t * 1000).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  return { price: q.c, changePct: +q.dp.toFixed(2), source: "Finnhub", asOf };
}

type AlphaQuote = { "Global Quote"?: Record<string, string>; Note?: string; Information?: string };

async function fromAlpha(key: string, etf: string): Promise<Omit<WorldMove, "country" | "market" | "etf"> | null> {
  const data = await getJson<AlphaQuote>(`${ALPHA}?function=GLOBAL_QUOTE&symbol=${etf}&apikey=${key}`, ALPHA_TTL);
  const g = data?.["Global Quote"];
  if (!g) return null; // rate-limit notes arrive as { Note } / { Information }
  const price = Number(g["05. price"]);
  const pct = Number(String(g["10. change percent"] ?? "").replace("%", ""));
  if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(pct)) return null;
  return { price, changePct: +pct.toFixed(2), source: "Alpha Vantage", asOf: g["07. latest trading day"] || new Date().toISOString().slice(0, 10) };
}

/** Latest daily move for every mapped market. Returns [] when no key is set. */
export async function getWorldMoves(): Promise<WorldMove[]> {
  const fk = finnhubKey();
  const ak = alphaKey();
  if (!fk && !ak) return [];

  const entries = Object.entries(WORLD_ETFS);
  const first = await Promise.all(entries.map(async ([country, m]) => {
    const hit = fk ? await fromFinnhub(fk, m.etf) : null;
    return hit ? ({ country, ...m, ...hit } satisfies WorldMove) : null;
  }));

  // Fill gaps from Alpha Vantage, staying inside its per-minute limit.
  if (ak) {
    const missing = entries.filter((_, i) => !first[i]).slice(0, ALPHA_MAX_PER_REFRESH);
    const filled = await Promise.all(missing.map(async ([country, m]) => {
      const hit = await fromAlpha(ak, m.etf);
      return hit ? ({ country, ...m, ...hit } satisfies WorldMove) : null;
    }));
    for (const f of filled) if (f) first[entries.findIndex(([c]) => c === f.country)] = f;
  }

  return first.filter(Boolean) as WorldMove[];
}

// ── Equity returns: YTD + calendar-year history ────────────────────────────────────────
//
// TIME_SERIES_MONTHLY_ADJUSTED gives every month-end close (and the latest trading day) with
// dividend-adjusted closes, so one request per ETF yields a full return history. Budget:
// Alpha's free tier is 25 requests/day and ~5/minute, shared with the GLOBAL_QUOTE backup.
//   • each ETF's series is cached for a WEEK (unstable_cache; stale entries are served while
//     one refresh runs in the background, so ETFs come due on different days);
//   • at most ALPHA_MONTHLY_PER_MINUTE fresh requests per minute and ALPHA_MONTHLY_PER_DAY per
//     server instance per day — an ETF over budget is simply skipped this time (never cached
//     as empty) and filled on a later run. A cold start therefore fills over a few days.
//   • a rate-limit note ({ Note } / { Information }) throws, so it is never cached.
// The live YTD figure chains Finnhub's current price onto the adjusted series when Finnhub
// has a newer quote, so it moves daily even though the series refreshes weekly.

const ALPHA_MONTHLY_TTL = 7 * 86400;
const ALPHA_MONTHLY_PER_MINUTE = 2;
const ALPHA_MONTHLY_PER_DAY = 8;

const budget = { day: "", dayUsed: 0, minute: 0, minuteUsed: 0 };
function takeAlphaMonthlyBudget(): boolean {
  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10);
  const minute = Math.floor(now / 60000);
  if (budget.day !== day) { budget.day = day; budget.dayUsed = 0; }
  if (budget.minute !== minute) { budget.minute = minute; budget.minuteUsed = 0; }
  if (budget.dayUsed >= ALPHA_MONTHLY_PER_DAY || budget.minuteUsed >= ALPHA_MONTHLY_PER_MINUTE) return false;
  budget.dayUsed++; budget.minuteUsed++;
  return true;
}

/** [YYYY-MM-DD, close, adjusted close], oldest → newest; the last bar is the latest trading day. */
type Bar = [string, number, number];
interface EtfMonthly { bars: Bar[]; retrieved: string }

async function fetchEtfMonthly(etf: string): Promise<EtfMonthly> {
  const key = alphaKey();
  if (!key) throw new Error("no ALPHA_API_KEY");
  if (!takeAlphaMonthlyBudget()) throw new Error(`alpha monthly ${etf}: deferred (free-tier budget)`);
  // No `cache` option: inside unstable_cache nested fetches already bypass the fetch cache.
  const res = await fetch(`${ALPHA}?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${etf}&apikey=${key}`, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`alpha monthly ${etf}: HTTP ${res.status}`);
  const json = (await res.json()) as { "Monthly Adjusted Time Series"?: Record<string, Record<string, string>> };
  const ts = json["Monthly Adjusted Time Series"];
  if (!ts) throw new Error(`alpha monthly ${etf}: no series (rate limit or unknown symbol)`);
  const bars: Bar[] = Object.entries(ts)
    .map(([d, o]) => [d, Number(o["4. close"]), Number(o["5. adjusted close"])] as Bar)
    .filter(([d, c, a]) => /^\d{4}-\d{2}-\d{2}$/.test(d) && c > 0 && a > 0)
    .sort((x, y) => x[0].localeCompare(y[0]));
  if (bars.length < 13) throw new Error(`alpha monthly ${etf}: too short`);
  return { bars, retrieved: new Date().toISOString().slice(0, 10) };
}

const etfMonthly = (etf: string): Promise<EtfMonthly | null> =>
  unstable_cache(() => fetchEtfMonthly(etf), ["alpha-monthly-adjusted-v1", etf], { revalidate: ALPHA_MONTHLY_TTL, tags: ["alpha-monthly"] })()
    .catch(() => null);

/** Year → its last bar (December close, or the latest bar for the current year). */
function yearEnds(bars: Bar[]): Map<number, Bar> {
  const out = new Map<number, Bar>();
  for (const b of bars) out.set(Number(b[0].slice(0, 4)), b); // ascending → last bar of each year wins
  return out;
}

/** Calendar-year total returns (%, USD, dividends reinvested); the final year is year-to-date. */
function calendarReturns(bars: Bar[]): Array<[string, number]> {
  const ends = yearEnds(bars);
  const out: Array<[string, number]> = [];
  for (const [y, end] of ends) {
    const base = ends.get(y - 1);
    if (!base || !base[0].startsWith(`${y - 1}-12`)) continue; // need a real prior-December close
    out.push([String(y), Number(((end[2] / base[2] - 1) * 100).toPrecision(4))]);
  }
  return out;
}

export interface EtfYtd { country: string; etf: string; value: number; asOf: string; source: string }

/**
 * Year-to-date total return per mapped market. `prices` (today's quotes from getWorldMoves)
 * extend the weekly series to the latest close: YTD = adj(last bar)/adj(prior Dec) ×
 * price(today)/close(last bar) − 1 — no dividends fall between those two closes.
 */
export async function getEtfYtd(prices: Map<string, { price: number; asOf: string }> = new Map()): Promise<EtfYtd[]> {
  if (!alphaKey()) return [];
  const year = new Date().getUTCFullYear();
  const rows = await Promise.all(Object.entries(WORLD_ETFS).map(async ([country, { etf }]) => {
    const m = await etfMonthly(etf);
    if (!m) return null;
    const ends = yearEnds(m.bars);
    const base = ends.get(year - 1);
    const last = m.bars[m.bars.length - 1];
    if (!base || !base[0].startsWith(`${year - 1}-12`) || !last[0].startsWith(String(year))) return null;
    let growth = last[2] / base[2];
    let asOf = last[0];
    let source = `Alpha Vantage (via ${etf})`;
    const q = prices.get(country);
    if (q && q.price > 0 && q.asOf > last[0] && q.asOf.startsWith(String(year))) {
      growth *= q.price / last[1];
      asOf = q.asOf;
      source = `Alpha Vantage + live quote (via ${etf})`;
    }
    return { country, etf, value: +((growth - 1) * 100).toFixed(2), asOf, source };
  }));
  return rows.filter(Boolean) as EtfYtd[];
}

/** Calendar-year return history per market (only ETFs already in the weekly cache are fetched fresh). */
export async function getEtfReturnHistory(): Promise<{ series: Record<string, Array<[string, number]>>; seriesIds: Record<string, string>; note: string }> {
  if (!alphaKey()) return { series: {}, seriesIds: {}, note: "Equity-return history needs ALPHA_API_KEY (Alpha Vantage)." };
  const series: Record<string, Array<[string, number]>> = {};
  const seriesIds: Record<string, string> = {};
  await Promise.all(Object.entries(WORLD_ETFS).map(async ([country, { etf }]) => {
    const m = await etfMonthly(etf);
    const pts = m ? calendarReturns(m.bars) : [];
    if (pts.length >= 2) { series[country] = pts; seriesIds[country] = etf; }
  }));
  const pending = Object.keys(WORLD_ETFS).length - Object.keys(series).length;
  return {
    series, seriesIds,
    note: `Calendar-year total return (USD, dividends reinvested) of each market's US-listed country ETF; the latest year is year-to-date.${pending ? ` ${pending} markets are still being fetched — the free Alpha Vantage tier allows 25 requests a day, so the set fills over a few days.` : ""}`,
  };
}
