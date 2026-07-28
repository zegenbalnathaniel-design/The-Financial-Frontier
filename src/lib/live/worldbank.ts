// World Bank Indicators API — free, no key required. Annual cadence: a daily refresh
// simply catches new releases. One HTTP call fetches one indicator across every
// country. Docs: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392
//
// Response shape: [ meta, [ { country:{id,value}, countryiso3code, date, value }, ... ] ]
// `country.id` is the ISO-3166 alpha-2 code, which matches our COUNTRIES codes.

const BASE = "https://api.worldbank.org/v2";
const DAY = 86400;

export interface WbObs {
  value: number;
  year: string;
}

/** Fetch the most recent non-null value of one indicator for many countries. */
export async function wbFetchIndicator(
  codes: string[],
  wbCode: string,
  revalidate = DAY,
): Promise<Map<string, WbObs>> {
  const out = new Map<string, WbObs>();
  if (codes.length === 0) return out;
  // mrv=4 → last 4 years, so we can skip null latest-year gaps.
  const url = `${BASE}/country/${codes.join(";")}/indicator/${wbCode}?format=json&per_page=${codes.length * 4}&mrv=4`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) throw new Error(`World Bank ${wbCode}: HTTP ${res.status}`);
  const json = (await res.json()) as [unknown, Array<{ country?: { id?: string }; date?: string; value?: number | null }>];
  const rows = Array.isArray(json?.[1]) ? json[1] : [];
  for (const row of rows) {
    const code = row.country?.id;
    if (!code || row.value == null || !row.date) continue;
    const prev = out.get(code);
    // rows arrive newest-first; keep the first (most recent) non-null we see.
    if (!prev || Number(row.date) > Number(prev.year)) out.set(code, { value: row.value, year: row.date });
  }
  return out;
}
