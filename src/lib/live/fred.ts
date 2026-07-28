// FRED (Federal Reserve Bank of St. Louis) — free but KEY REQUIRED (FRED_API_KEY).
// Get one at https://fredaccount.stlouisfed.org/apikeys . FRED is US-centric but also
// mirrors many OECD series, which lets us source policy rates and 10-year yields for
// the larger economies. Anything not covered simply isn't returned and falls back.
//
// Observations endpoint returns { observations: [{ date, value }] }; value is a string
// and "." means missing.

const BASE = "https://api.stlouisfed.org/fred/series/observations";
const DAY = 86400;

export interface FredSeries {
  series: string; // FRED series id
  country: string; // our ISO-2 code
  key: string; // our indicator key
}

// High-confidence, well-known series. Euro-area policy rate (ECB deposit facility)
// is shared across euro-area members. Long-term (10y) yields use the OECD MEI family
// IRLTLT01<cc>M156N, which FRED carries for many members.
const OECD_10Y = ["US", "DE", "FR", "IT", "ES", "GB", "JP", "CA", "AU", "KR", "CH", "NZ", "MX", "ZA", "IN", "ID"];
const EURO_AREA = ["DE", "FR", "IT", "ES"];

export const FRED_SERIES: FredSeries[] = [
  { series: "DGS10", country: "US", key: "tenYearYield" },
  { series: "DFF", country: "US", key: "policyRate" },
  { series: "UNRATE", country: "US", key: "unemployment" },
  ...EURO_AREA.map((c) => ({ series: "ECBDFR", country: c, key: "policyRate" })),
  ...OECD_10Y.filter((c) => c !== "US").map((c) => ({ series: `IRLTLT01${c}M156N`, country: c, key: "tenYearYield" })),
];

export interface FredObs {
  value: number;
  asOf: string;
}

/** Fetch the latest observation for each configured FRED series. Missing key → {}. */
export async function fetchFred(apiKey: string | undefined, revalidate = DAY): Promise<Map<string, FredObs>> {
  const out = new Map<string, FredObs>();
  if (!apiKey) return out;

  await Promise.all(
    FRED_SERIES.map(async ({ series, country, key }) => {
      try {
        const url = `${BASE}?series_id=${series}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=1`;
        const res = await fetch(url, { next: { revalidate } });
        if (!res.ok) return;
        const json = (await res.json()) as { observations?: Array<{ date: string; value: string }> };
        const obs = json.observations?.[0];
        if (!obs || obs.value === "." || obs.value == null) return;
        const value = Number(obs.value);
        if (Number.isFinite(value)) out.set(`${country}:${key}`, { value, asOf: obs.date });
      } catch {
        /* one series failing must not sink the rest */
      }
    }),
  );
  return out;
}
