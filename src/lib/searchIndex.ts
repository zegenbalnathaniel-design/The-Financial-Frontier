import { getAllReports } from "@/lib/reports";
import { COUNTRIES } from "@/lib/countries";
import { GLOSSARY } from "@/lib/glossary";
import { INDICATORS } from "@/lib/indicators";
import { MAJOR_STOCKS } from "@/lib/live/stockList";

export type SearchKind = "Page" | "Report" | "Country" | "Indicator" | "Stock" | "Term";
export interface SearchItem { kind: SearchKind; label: string; sub?: string; href: string; code?: string; keywords?: string }

const PAGES: SearchItem[] = [
  { kind: "Page", label: "Home", href: "/" },
  { kind: "Page", label: "Market Pulse — today's stocks", href: "/#markets", keywords: "heatmap top gainer riser stocks" },
  { kind: "Page", label: "Intelligence Globe & Time Machine", href: "/#globe", keywords: "map world timeline" },
  { kind: "Page", label: "All reports", href: "/reports", keywords: "archive issues" },
  { kind: "Page", label: "Dashboard", href: "/dashboard" },
  { kind: "Page", label: "Indicator Explorer", href: "/data", keywords: "data table chart compare" },
  { kind: "Page", label: "Glossary", href: "/learn", keywords: "learn terms definitions" },
  { kind: "Page", label: "About", href: "/about" },
  { kind: "Page", label: "Contact", href: "/contact" },
];

/** Built on the server (once per build) and handed to the ⌘K palette as plain data. */
export function buildSearchIndex(): SearchItem[] {
  return [
    ...PAGES,
    ...getAllReports().map((r) => ({ kind: "Report" as const, label: r.title, sub: `${r.month} · Issue ${r.issueNumber}`, href: `/reports/${r.slug}`, keywords: r.tags.join(" ") })),
    ...COUNTRIES.map((c) => ({ kind: "Country" as const, label: c.name, sub: `${c.region} · ${c.data.market}`, href: `/#globe-${c.code}`, code: c.code, keywords: `${c.code} ${c.data.currency} ${c.groups.join(" ")}` })),
    ...MAJOR_STOCKS.map((s) => ({ kind: "Stock" as const, label: s.name, sub: `${s.symbol} · ${s.sector}`, href: "/#markets", keywords: s.symbol })),
    ...INDICATORS.map((i) => ({ kind: "Indicator" as const, label: i.label, sub: i.family, href: "/data", keywords: i.about })),
    ...GLOSSARY.flatMap((g) => g.terms.map((t) => ({ kind: "Term" as const, label: t.term, sub: t.def.slice(0, 90) + (t.def.length > 90 ? "…" : ""), href: "/learn", keywords: g.category }))),
  ];
}
