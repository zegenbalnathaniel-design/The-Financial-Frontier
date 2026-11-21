import "server-only";

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
