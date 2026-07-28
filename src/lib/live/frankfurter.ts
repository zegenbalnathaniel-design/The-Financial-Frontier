// Frankfurter — free, no key. Daily FX reference rates published by the ECB.
// Docs: https://frankfurter.dev  ·  Response: { base, date, rates: { EUR: 0.92, ... } }
//
// This is the one genuinely daily-moving series we can source without a key. We
// express each currency as its YTD move vs USD by comparing the latest rate with the
// first business day of the year.

const BASE = "https://api.frankfurter.dev/v1";
const DAY = 86400;

export interface FxMove {
  ytdPct: number; // % change of the currency vs USD, year to date
  asOf: string; // date of the latest observation
}

/** YTD move vs USD for each requested currency (ISO-4217, excluding USD). */
export async function fetchFxYtd(currencies: string[], revalidate = DAY): Promise<Map<string, FxMove>> {
  const out = new Map<string, FxMove>();
  const symbols = Array.from(new Set(currencies.filter((c) => c && c !== "USD")));
  if (symbols.length === 0) return out;

  const year = new Date().getUTCFullYear();
  const [latest, start] = await Promise.all([
    fetch(`${BASE}/latest?base=USD&symbols=${symbols.join(",")}`, { next: { revalidate } }).then(okJson),
    fetch(`${BASE}/${year}-01-01?base=USD&symbols=${symbols.join(",")}`, { next: { revalidate } }).then(okJson),
  ]);

  const latestRates = latest?.rates ?? {};
  const startRates = start?.rates ?? {};
  const asOf = latest?.date ?? new Date().toISOString().slice(0, 10);

  for (const cur of symbols) {
    // rates are "units of `cur` per 1 USD". A currency STRONGER vs USD means fewer
    // units per USD, so its move vs USD is the inverse ratio minus 1.
    const now = latestRates[cur];
    const then = startRates[cur];
    if (typeof now === "number" && typeof then === "number" && now > 0 && then > 0) {
      const ytdPct = +(((then / now) - 1) * 100).toFixed(1);
      out.set(cur, { ytdPct, asOf });
    }
  }
  return out;
}

async function okJson(res: Response): Promise<any> {
  if (!res.ok) throw new Error(`Frankfurter: HTTP ${res.status}`);
  return res.json();
}
