import { NextResponse } from "next/server";
import { getLiveSnapshot } from "@/lib/live/snapshot";
import { EMPTY_SNAPSHOT } from "@/lib/live/types";

// The macro live snapshot (World Bank / OECD / BIS / IMF / FRED / ECB / Finnhub / Alpha Vantage). Moved out of
// the root layout so no page has to wait for ~40 upstream calls before it can render —
// the HTML is now fully static and the visualisations hydrate with live values after.
export const revalidate = 21600; // 6h — sources are daily/annual; the cron also refreshes it
export const maxDuration = 60; // a cold refresh runs the OECD queries one at a time

export async function GET() {
  const snap = await getLiveSnapshot().catch(() => EMPTY_SNAPSHOT);
  return NextResponse.json(snap, {
    headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" },
  });
}
