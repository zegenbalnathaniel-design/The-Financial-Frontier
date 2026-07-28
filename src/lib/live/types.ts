// Shared types for the live-data layer.
//
// A LiveSnapshot overlays real, sourced values on top of the static (illustrative)
// country dataset. It is intentionally *sparse*: a field only appears here when a
// real API returned a value for it. Anything absent falls back to the static value
// and stays labelled as sample data. This keeps the site fully functional when a key
// is missing, a provider is down, or an indicator has no free source.

export interface Provenance {
  value: number;
  source: string; // e.g. "World Bank", "FRED", "ECB/Frankfurter", "Finnhub"
  asOf: string; // ISO date or year the observation refers to
}

export interface LiveSnapshot {
  /** key = `${countryCode}:${indicatorKey}` → the sourced observation */
  values: Record<string, Provenance>;
  /** which providers returned at least one value this run */
  sources: string[];
  /** when this snapshot was assembled (server time) */
  generatedAt: string;
}

export const EMPTY_SNAPSHOT: LiveSnapshot = { values: {}, sources: [], generatedAt: "" };

export const liveKey = (countryCode: string, indicatorKey: string) => `${countryCode}:${indicatorKey}`;

export function liveGet(
  snap: LiveSnapshot | null | undefined,
  countryCode: string,
  indicatorKey: string,
): Provenance | undefined {
  return snap?.values[liveKey(countryCode, indicatorKey)];
}
