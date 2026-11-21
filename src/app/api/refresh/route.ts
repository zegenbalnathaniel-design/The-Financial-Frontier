import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { HISTORY_KEYS, HISTORY_TAG } from "@/lib/history";

// Hit daily by Vercel Cron (see vercel.json) to refresh the live data routes, so the
// first visitor of the day gets warm, current data instead of paying for a cold fetch.
// Optionally protected: set CRON_SECRET and Vercel sends `Authorization: Bearer <secret>`.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }
  for (const p of ["/api/snapshot", "/api/markets", "/api/story"]) revalidatePath(p);
  revalidateTag(HISTORY_TAG); // upstream World Bank / FRED history responses
  for (const k of HISTORY_KEYS) revalidatePath(`/api/history/${k}`);
  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
