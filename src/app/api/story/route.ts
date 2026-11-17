import { NextResponse } from "next/server";
import { getStoryOfDay } from "@/lib/live/story";

// Story of the Day — re-picked at most hourly from the day's feed.
export const revalidate = 3600;

export async function GET() {
  const story = await getStoryOfDay();
  return NextResponse.json(story, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
  });
}
