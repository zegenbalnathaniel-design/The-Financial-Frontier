import type { MetadataRoute } from "next";
import { getReportSlugs } from "@/lib/reports";

// Set this to your real domain in Vercel (Project → Settings → Environment Variables):
//   NEXT_PUBLIC_SITE_URL = https://your-domain.com
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-financial-frontier.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/reports", "/dashboard", "/network", "/data", "/learn", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const reports = getReportSlugs().map((slug) => ({
    url: `${base}/reports/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));
  return [...routes, ...reports];
}
