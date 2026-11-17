import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/searchIndex";

// The ⌘K index, generated at build time and served as a static file — kept out of every
// page's HTML so it costs nothing until someone opens the palette.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(buildSearchIndex());
}
