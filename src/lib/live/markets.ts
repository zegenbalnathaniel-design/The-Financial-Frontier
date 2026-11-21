import "server-only";

// Live equity board for the Market Pulse deck, the ticker and "top riser of the day".
// Source: Finnhub (free tier, FINNHUB_API_KEY). Quotes are cached for 5 minutes and
// company profiles (market cap, logo) for a day, so a cold build makes ~60 calls and
// a warm site makes ~30 every five minutes — inside the free 60/min limit.
//
// Fully fail-safe: no key, a 429, or a dead symbol just drops that tile. The UI shows
// an honest "feed offline" state when nothing comes back — it never invents prices.

const BASE = "https://finnhub.io/api/v1";
const QUOTE_TTL = 300;
const PROFILE_TTL = 86400;
const TIMEOUT_MS = 4000;

import { MAJOR_STOCKS } from "./stockList";
import { getWorldMoves, type WorldMove } from "./worldMarkets";
export { MAJOR_STOCKS };

// Index ETFs stand in for the indices themselves (index quotes are paid on Finnhub).
export const INDEX_PROXIES = [
  { symbol: "SPY", name: "S&P 500", via: "SPY" },
  { symbol: "QQQ", name: "Nasdaq 100", via: "QQQ" },
  { symbol: "DIA", name: "Dow Jones", via: "DIA" },
];

export interface StockQuote {
  symbol: string; name: string; sector: string;
  price: number; change: number; changePct: number;
  open: number; high: number; low: number; prevClose: number;
  marketCap?: number; // $bn
  logo?: string;
}
export interface IndexQuote { symbol: string; name: string; via: string; price: number; changePct: number }

export interface MarketBoard {
  stocks: StockQuote[];
  indices: IndexQuote[];
  world: WorldMove[];           // other stock markets, via country ETFs
  topGainer: StockQuote | null;
  topLoser: StockQuote | null;
  breadth: { up: number; down: number };
  asOf: string | null;          // ISO time of the latest quote
  marketOpen: boolean | null;
  source: "Finnhub" | null;
}

export const EMPTY_BOARD: MarketBoard = {
  stocks: [], indices: [], world: [], topGainer: null, topLoser: null, breadth: { up: 0, down: 0 },
  asOf: null, marketOpen: null, source: null,
};

async function getJson<T>(url: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate }, signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type RawQuote = { c: number; d: number | null; dp: number | null; h: number; l: number; o: number; pc: number; t: number };
type RawProfile = { marketCapitalization?: number; logo?: string; name?: string };

export async function getMarketBoard(): Promise<MarketBoard> {
  const key = (process.env.FINNHUB_API_KEY ?? process.env.FIN_HUB_API_KEY);
  if (!key) return { ...EMPTY_BOARD, world: await getWorldMoves().catch(() => []) };
  const q = (s: string) => `${BASE}/quote?symbol=${encodeURIComponent(s)}&token=${key}`;
  const p = (s: string) => `${BASE}/stock/profile2?symbol=${encodeURIComponent(s)}&token=${key}`;

  const [stockRows, indexRows, status, world] = await Promise.all([
    Promise.all(MAJOR_STOCKS.map(async (m) => {
      const [quote, profile] = await Promise.all([getJson<RawQuote>(q(m.symbol), QUOTE_TTL), getJson<RawProfile>(p(m.symbol), PROFILE_TTL)]);
      if (!quote || !quote.c || quote.dp == null) return null;
      const row: StockQuote = {
        ...m, price: quote.c, change: quote.d ?? 0, changePct: +quote.dp.toFixed(2),
        open: quote.o, high: quote.h, low: quote.l, prevClose: quote.pc,
        marketCap: profile?.marketCapitalization ? profile.marketCapitalization / 1000 : undefined, // $m → $bn
        logo: profile?.logo || undefined,
      };
      return { row, t: quote.t };
    })),
    Promise.all(INDEX_PROXIES.map(async (ix) => {
      const quote = await getJson<RawQuote>(q(ix.symbol), QUOTE_TTL);
      if (!quote || !quote.c || quote.dp == null) return null;
      return { ...ix, price: quote.c, changePct: +quote.dp.toFixed(2) } satisfies IndexQuote;
    })),
    getJson<{ isOpen?: boolean }>(`${BASE}/stock/market-status?exchange=US&token=${key}`, QUOTE_TTL),
    getWorldMoves().catch(() => [] as WorldMove[]),
  ]);

  const ok = stockRows.filter(Boolean) as { row: StockQuote; t: number }[];
  const stocks = ok.map((r) => r.row);
  if (stocks.length === 0) return { ...EMPTY_BOARD, world };
  const sorted = [...stocks].sort((a, b) => b.changePct - a.changePct);
  const latestT = Math.max(...ok.map((r) => r.t || 0));
  return {
    stocks,
    indices: indexRows.filter(Boolean) as IndexQuote[],
    world,
    topGainer: sorted[0] ?? null,
    topLoser: sorted[sorted.length - 1] ?? null,
    breadth: { up: stocks.filter((s) => s.changePct > 0).length, down: stocks.filter((s) => s.changePct < 0).length },
    asOf: latestT ? new Date(latestT * 1000).toISOString() : null,
    marketOpen: typeof status?.isOpen === "boolean" ? status.isOpen : null,
    source: "Finnhub",
  };
}
