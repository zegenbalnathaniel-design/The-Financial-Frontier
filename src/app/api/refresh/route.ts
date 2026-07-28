import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Hit daily by Vercel Cron (see vercel.json) to refresh the live dataset. Revalidates
// the root layout, which re-runs getLiveSnapshot() and re-fetches every source.
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
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
