import { NextResponse } from "next/server";
import { getMarketBoard } from "@/lib/live/markets";

// Live equity board. Cached at the edge for 5 minutes (ISR), so every visitor shares one
// upstream fetch and the page itself never waits on Finnhub.
export const revalidate = 300;

export async function GET() {
  const board = await getMarketBoard();
  return NextResponse.json(board, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
