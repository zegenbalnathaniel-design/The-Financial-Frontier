// Country dataset powering the 3D globe and the economic network.
//
// IMPORTANT — DATA HONESTY: values here are ILLUSTRATIVE sample data for the
// visualisation, seeded with June 2026 figures where our sourced report has them
// (see content/reports/2026-06.json). They are not a live feed. Wire a real source
// (IMF/World Bank/FRED) in src/lib/countries.ts to make these authoritative. The UI
// labels these panels as sample data.

export type Region =
  | "North America" | "South America" | "Europe" | "Africa"
  | "Asia" | "Oceania" | "Middle East";

export interface Country {
  code: string;         // ISO-ish short code
  name: string;
  lat: number;          // degrees
  lon: number;          // degrees
  region: Region;
  groups: string[];     // G7, G20, BRICS, EU, OECD, ASEAN, GCC, Emerging, Developed ...
  hub?: boolean;        // major financial hub (larger point + halo)
  data: {
    growth: number;     // GDP growth %, 2026 forecast
    inflation: number;  // headline inflation %
    rate: number;       // policy rate %
    market: string;     // headline equity index label
    change: number;     // illustrative daily change %
    currency: string;
  };
  sourced?: boolean;    // true where the figure is grounded in our June report
}

export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", lat: 38, lon: -97, region: "North America", groups: ["G7","G20","OECD","USMCA","Developed"], hub: true,
    data: { growth: 1.6, inflation: 3.8, rate: 5.375, market: "S&P 500", change: -0.9, currency: "USD" }, sourced: true },
  { code: "CA", name: "Canada", lat: 56, lon: -106, region: "North America", groups: ["G7","G20","OECD","USMCA","Developed"], hub: true,
    data: { growth: 0.7, inflation: 2.9, rate: 4.25, market: "S&P/TSX", change: -0.4, currency: "CAD" }, sourced: true },
  { code: "MX", name: "Mexico", lat: 23, lon: -102, region: "North America", groups: ["G20","OECD","USMCA","Emerging"],
    data: { growth: 1.8, inflation: 4.2, rate: 10.5, market: "IPC", change: 0.3, currency: "MXN" } },
  { code: "BR", name: "Brazil", lat: -14, lon: -51, region: "South America", groups: ["G20","BRICS","MERCOSUR","Emerging"], hub: true,
    data: { growth: 2.1, inflation: 3.9, rate: 9.75, market: "Bovespa", change: 0.6, currency: "BRL" }, sourced: true },
  { code: "AR", name: "Argentina", lat: -38, lon: -63, region: "South America", groups: ["G20","MERCOSUR","Emerging"],
    data: { growth: 3.0, inflation: 38.0, rate: 40.0, market: "Merval", change: 1.2, currency: "ARS" } },
  { code: "CL", name: "Chile", lat: -35, lon: -71, region: "South America", groups: ["OECD","Emerging"],
    data: { growth: 2.3, inflation: 3.6, rate: 5.0, market: "IPSA", change: 0.2, currency: "CLP" } },
  { code: "GB", name: "United Kingdom", lat: 54, lon: -2, region: "Europe", groups: ["G7","G20","OECD","Developed"], hub: true,
    data: { growth: 1.0, inflation: 3.1, rate: 4.75, market: "FTSE 100", change: -0.5, currency: "GBP" } },
  { code: "DE", name: "Germany", lat: 51, lon: 10, region: "Europe", groups: ["G7","G20","EU","EuroArea","OECD","Developed"], hub: true,
    data: { growth: 0.2, inflation: 2.8, rate: 2.75, market: "DAX", change: -0.7, currency: "EUR" }, sourced: true },
  { code: "FR", name: "France", lat: 46, lon: 2, region: "Europe", groups: ["G7","G20","EU","EuroArea","OECD","Developed"], hub: true,
    data: { growth: 0.4, inflation: 2.6, rate: 2.75, market: "CAC 40", change: -0.6, currency: "EUR" }, sourced: true },
  { code: "IT", name: "Italy", lat: 42, lon: 12, region: "Europe", groups: ["G7","G20","EU","EuroArea","OECD","Developed"],
    data: { growth: 0.5, inflation: 2.9, rate: 2.75, market: "FTSE MIB", change: -0.5, currency: "EUR" }, sourced: true },
  { code: "ES", name: "Spain", lat: 40, lon: -4, region: "Europe", groups: ["G20","EU","EuroArea","OECD","Developed"],
    data: { growth: 1.4, inflation: 3.0, rate: 2.75, market: "IBEX 35", change: -0.3, currency: "EUR" } },
  { code: "CH", name: "Switzerland", lat: 47, lon: 8, region: "Europe", groups: ["OECD","Developed"], hub: true,
    data: { growth: 1.2, inflation: 1.4, rate: 1.5, market: "SMI", change: -0.2, currency: "CHF" } },
  { code: "RU", name: "Russia", lat: 61, lon: 90, region: "Europe", groups: ["G20","BRICS","Emerging"],
    data: { growth: 1.1, inflation: 7.5, rate: 16.0, market: "MOEX", change: 0.4, currency: "RUB" }, sourced: true },
  { code: "ZA", name: "South Africa", lat: -30, lon: 25, region: "Africa", groups: ["G20","BRICS","AfricanUnion","Emerging"], hub: true,
    data: { growth: 1.3, inflation: 4.4, rate: 7.75, market: "JSE Top 40", change: 0.1, currency: "ZAR" }, sourced: true },
  { code: "NG", name: "Nigeria", lat: 9, lon: 8, region: "Africa", groups: ["AfricanUnion","Emerging"],
    data: { growth: 3.2, inflation: 22.0, rate: 24.75, market: "NGX All-Share", change: 0.5, currency: "NGN" }, sourced: true },
  { code: "EG", name: "Egypt", lat: 26, lon: 30, region: "Africa", groups: ["AfricanUnion","Emerging"],
    data: { growth: 3.5, inflation: 16.0, rate: 27.25, market: "EGX 30", change: 0.8, currency: "EGP" } },
  { code: "MZ", name: "Mozambique", lat: -18, lon: 35, region: "Africa", groups: ["AfricanUnion","Frontier"],
    data: { growth: 5.0, inflation: 6.5, rate: 12.75, market: "—", change: 0, currency: "MZN" }, sourced: true },
  { code: "KE", name: "Kenya", lat: 0, lon: 38, region: "Africa", groups: ["AfricanUnion","Frontier"],
    data: { growth: 5.2, inflation: 5.1, rate: 11.25, market: "NSE 20", change: 0.3, currency: "KES" } },
  { code: "IN", name: "India", lat: 22, lon: 79, region: "Asia", groups: ["G20","BRICS","SAARC","Emerging"], hub: true,
    data: { growth: 5.7, inflation: 4.8, rate: 5.25, market: "Nifty 50", change: 0.4, currency: "INR" }, sourced: true },
  { code: "CN", name: "China", lat: 35, lon: 104, region: "Asia", groups: ["G20","BRICS","APEC","Emerging"], hub: true,
    data: { growth: 4.5, inflation: 0.9, rate: 3.1, market: "CSI 300", change: 0.2, currency: "CNY" }, sourced: true },
  { code: "JP", name: "Japan", lat: 36, lon: 138, region: "Asia", groups: ["G7","G20","OECD","APEC","Developed"], hub: true,
    data: { growth: 0.9, inflation: 2.5, rate: 0.5, market: "Nikkei 225", change: -0.8, currency: "JPY" }, sourced: true },
  { code: "KR", name: "South Korea", lat: 36, lon: 128, region: "Asia", groups: ["G20","OECD","APEC","Developed"], hub: true,
    data: { growth: 2.1, inflation: 3.2, rate: 2.75, market: "KOSPI", change: -0.6, currency: "KRW" }, sourced: true },
  { code: "ID", name: "Indonesia", lat: -2, lon: 118, region: "Asia", groups: ["G20","ASEAN","APEC","Emerging"],
    data: { growth: 5.0, inflation: 3.1, rate: 6.0, market: "IDX Composite", change: 0.1, currency: "IDR" }, sourced: true },
  { code: "MY", name: "Malaysia", lat: 4, lon: 102, region: "Asia", groups: ["ASEAN","APEC","Emerging"],
    data: { growth: 4.4, inflation: 2.8, rate: 3.0, market: "KLCI", change: 0.2, currency: "MYR" }, sourced: true },
  { code: "SG", name: "Singapore", lat: 1.3, lon: 103.8, region: "Asia", groups: ["ASEAN","APEC","Developed"], hub: true,
    data: { growth: 2.4, inflation: 2.6, rate: 3.4, market: "STI", change: -0.1, currency: "SGD" } },
  { code: "SA", name: "Saudi Arabia", lat: 24, lon: 45, region: "Middle East", groups: ["G20","GCC","Emerging"], hub: true,
    data: { growth: 3.6, inflation: 2.1, rate: 5.5, market: "Tadawul", change: 0.3, currency: "SAR" } },
  { code: "AE", name: "United Arab Emirates", lat: 24, lon: 54, region: "Middle East", groups: ["GCC","Emerging"], hub: true,
    data: { growth: 4.1, inflation: 2.3, rate: 5.4, market: "ADX", change: 0.4, currency: "AED" } },
  { code: "TR", name: "Türkiye", lat: 39, lon: 35, region: "Middle East", groups: ["G20","OECD","Emerging"],
    data: { growth: 3.0, inflation: 33.0, rate: 42.5, market: "BIST 100", change: 1.0, currency: "TRY" } },
  { code: "AU", name: "Australia", lat: -25, lon: 133, region: "Oceania", groups: ["G20","OECD","APEC","Developed"], hub: true,
    data: { growth: 1.9, inflation: 3.3, rate: 4.1, market: "ASX 200", change: -0.3, currency: "AUD" } },
  { code: "NZ", name: "New Zealand", lat: -41, lon: 174, region: "Oceania", groups: ["OECD","APEC","Developed"],
    data: { growth: 1.5, inflation: 2.7, rate: 4.75, market: "NZX 50", change: 0.2, currency: "NZD" }, sourced: true },
];

export const REGIONS: Region[] = [
  "North America", "South America", "Europe", "Africa", "Asia", "Oceania", "Middle East",
];

export const GROUPS = [
  "G7", "G20", "BRICS", "OECD", "EU", "EuroArea", "ASEAN", "GCC", "USMCA",
  "MERCOSUR", "APEC", "SAARC", "AfricanUnion", "Developed", "Emerging", "Frontier",
];

// The dataset modes the globe/network can colour by.
export type DataMode = "growth" | "inflation" | "rate" | "change";
export const DATA_MODES: { key: DataMode; label: string; unit: string; hint: string }[] = [
  { key: "growth", label: "Economic growth", unit: "%", hint: "2026 GDP growth forecast" },
  { key: "inflation", label: "Inflation", unit: "%", hint: "Headline consumer prices" },
  { key: "rate", label: "Interest rates", unit: "%", hint: "Central-bank policy rate" },
  { key: "change", label: "Markets today", unit: "%", hint: "Illustrative daily index change" },
];

// Colour scale per mode → returns a hex string given a value.
export function colorFor(mode: DataMode, v: number): string {
  if (mode === "change") return v >= 0 ? "#00D084" : "#F65B5B";
  if (mode === "growth") return v >= 4 ? "#00D084" : v >= 2 ? "#22D3EE" : v >= 1 ? "#3B82F6" : "#F65B5B";
  if (mode === "inflation") return v <= 2.5 ? "#00D084" : v <= 5 ? "#FBBF24" : "#F65B5B";
  // rate
  return v <= 2 ? "#00D084" : v <= 6 ? "#3B82F6" : v <= 15 ? "#FBBF24" : "#F65B5B";
}
