// Finnhub — free tier, KEY REQUIRED (FINNHUB_API_KEY). https://finnhub.io/dashboard
// Used for the daily equity-index move (the `change` field / marketReturn intraday).
//
// NOTE: Finnhub's FREE tier has limited index coverage — some index symbols require a
// paid plan and will return zeros. When that happens we simply skip the value and fall
// back to the illustrative figure. Quote endpoint: { c, d, dp, ... } where dp = % change.

const BASE = "https://finnhub.io/api/v1/quote";
const HOUR = 3600;

// Map each country to its headline index symbol on Finnhub. Index symbols are the
// ^-prefixed tickers; adjust here if your plan exposes different symbols.
export const INDEX_SYMBOLS: Record<string, string> = {
  US: "^GSPC", CA: "^GSPTSE", MX: "^MXX", BR: "^BVSP", GB: "^FTSE", DE: "^GDAXI",
  FR: "^FCHI", IT: "FTSEMIB.MI", ES: "^IBEX", CH: "^SSMI", JP: "^N225", CN: "000300.SS",
  IN: "^NSEI", KR: "^KS11", ID: "^JKSE", MY: "^KLSE", SG: "^STI", AU: "^AXJO",
  NZ: "^NZ50", ZA: "^JN0U.JO", SA: "^TASI.SR", AE: "^ADI",
};

export interface QuoteMove {
  changePct: number;
  asOf: string;
}

/** Latest % move for each mapped index. Missing key → {}. Runs on a shorter cache. */
export async function fetchIndexMoves(apiKey: string | undefined, revalidate = HOUR): Promise<Map<string, QuoteMove>> {
  const out = new Map<string, QuoteMove>();
  if (!apiKey) return out;
  const today = new Date().toISOString().slice(0, 10);

  const entries = Object.entries(INDEX_SYMBOLS);
  await Promise.all(
    entries.map(async ([country, symbol]) => {
      try {
        const res = await fetch(`${BASE}?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`, {
          next: { revalidate },
        });
        if (!res.ok) return;
        const q = (await res.json()) as { dp?: number | null; c?: number | null };
        // dp null/0 with c 0 means "no data on this plan" — skip.
        if (q.dp == null || (q.c === 0 && q.dp === 0)) return;
        out.set(`${country}:change`, { changePct: +Number(q.dp).toFixed(2), asOf: today });
      } catch {
        /* ignore a single failed symbol */
      }
    }),
  );
  return out;
}
