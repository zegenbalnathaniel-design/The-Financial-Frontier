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
        const res = await fetch(url, { next: { revalidate }, signal: AbortSignal.timeout(5000) });
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

/**
 * Monthly history (monthly averages; daily series like DFF/ECBDFR are averaged by FRED)
 * for every configured series of one indicator. Missing key → empty map. Each series has
 * its own timeout and failure isolation. Returns country → { id, points oldest → newest }.
 */
export async function fetchFredHistory(
  apiKey: string | undefined,
  indicatorKey: string,
  opts: { revalidate?: number; timeoutMs?: number; tags?: string[]; start?: string } = {},
): Promise<Map<string, { id: string; points: Array<[string, number]> }>> {
  const out = new Map<string, { id: string; points: Array<[string, number]> }>();
  if (!apiKey) return out;
  await Promise.all(
    FRED_SERIES.filter((s) => s.key === indicatorKey).map(async ({ series, country }) => {
      try {
        const url = `${BASE}?series_id=${series}&api_key=${apiKey}&file_type=json&frequency=m&aggregation_method=avg&observation_start=${opts.start ?? "1990-01-01"}`;
        const res = await fetch(url, {
          next: { revalidate: opts.revalidate ?? DAY, tags: opts.tags },
          signal: AbortSignal.timeout(opts.timeoutMs ?? 10000),
        });
        if (!res.ok) return;
        const json = (await res.json()) as { observations?: Array<{ date: string; value: string }> };
        const points: Array<[string, number]> = [];
        for (const o of json.observations ?? []) {
          const v = Number(o.value);
          if (o.value === "." || !Number.isFinite(v)) continue;
          points.push([o.date.slice(0, 7), v]); // "2026-10-01" → "2026-10"
        }
        if (points.length) out.set(country, { id: series, points });
      } catch {
        /* one series failing must not sink the rest */
      }
    }),
  );
  return out;
}
