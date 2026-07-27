export interface Indicator {
  label: string; value: string; note?: string;
  tone?: "up" | "down" | "gold" | "blue" | "cyan" | "violet" | "neutral";
}
export interface Highlight { title: string; blurb: string; tag?: string }
export interface BarPoint { name: string; value: number; note?: string }
export interface ReportCharts {
  growthForecast?: BarPoint[];
  growthVsInflation?: BarPoint[];
  activityIndex?: BarPoint[];
  activityBaseline?: number;
  activityTitle?: string;
  policy?: { tightening: string[]; easing: string[]; holding: string[] };
}
export interface Source { name: string; url?: string }
export interface Report {
  slug: string; issueNumber: number; month: string; publishedAt: string;
  title: string; standfirst: string; tags: string[];
  pdf: { screen: string; press?: string }; pageCount?: number;
  indicators: Indicator[]; highlights: Highlight[]; charts: ReportCharts;
  sources: Source[]; editorsNote?: string;
}
