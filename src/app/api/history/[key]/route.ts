import { NextResponse } from "next/server";
import { getHistory } from "@/lib/live/history";
import { HISTORY_KEYS } from "@/lib/history";

// Real annual (World Bank) / monthly (FRED) history for one indicator across every
// economy. Pre-rendered per indicator and regenerated daily (ISR); the daily cron also
// refreshes it. Clients fetch it after first paint, so no page waits on it.
export const revalidate = 86400;
export const dynamicParams = false; // only indicators that have a real source
export const maxDuration = 60;

export function generateStaticParams() {
  return HISTORY_KEYS.map((key) => ({ key }));
}

export async function GET(_req: Request, { params }: { params: { key: string } }) {
  const payload = await getHistory(params.key);
  return NextResponse.json(payload, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
