import fs from "node:fs";
import path from "node:path";
import type { Report } from "./types";

const DIR = path.join(process.cwd(), "content", "reports");

/** Reads every report JSON, newest-first. Duplicate slugs are ignored (first wins),
 *  so a stray duplicate file can never create a duplicate route or card. */
export function getAllReports(): Report[] {
  if (!fs.existsSync(DIR)) return [];
  const seen = new Set<string>();
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Report)
    .filter((r) => {
      if (!r?.slug || seen.has(r.slug)) return false;
      seen.add(r.slug);
      return true;
    })
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}
export const getLatestReport = () => getAllReports()[0];
export const getReport = (slug: string) => getAllReports().find((r) => r.slug === slug);
export const getReportSlugs = () => getAllReports().map((r) => r.slug);
