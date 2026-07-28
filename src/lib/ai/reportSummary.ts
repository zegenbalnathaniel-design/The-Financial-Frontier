import "server-only";
import { generateText } from "ai";
import type { Report } from "@/lib/types";

// Server-side AI briefing for a report. Runs at build / ISR time (once per report, then
// cached), so there is no per-visitor model cost and no visitor-facing endpoint to abuse.
//
// Uses the Vercel AI Gateway: a plain "provider/model" string routes through the gateway
// when AI_GATEWAY_API_KEY is set. Fully fail-safe — no key or any error returns null and
// the page simply omits the AI section (never crashes, never blocks the build).

export interface ReportBriefing {
  summary: string;
  model: string;
}

export async function generateReportSummary(report: Report): Promise<ReportBriefing | null> {
  // No key → do not attempt a network call (keeps builds fast and green).
  if (!process.env.AI_GATEWAY_API_KEY) return null;

  const model = process.env.AI_MODEL ?? "openai/gpt-4o-mini";

  // Compact, structured context — keeps token use (and cost) low.
  const facts = [
    `Title: ${report.title}`,
    `Standfirst: ${report.standfirst}`,
    `Indicators: ${report.indicators.map((i) => `${i.label} ${i.value}${i.note ? ` (${i.note})` : ""}`).join("; ")}`,
    `Stories: ${report.highlights.map((h) => `${h.title} — ${h.blurb}`).join(" | ")}`,
  ].join("\n");

  try {
    const { text } = await generateText({
      model,
      system:
        "You are a financial editor. Write a tight, neutral executive summary of the month's economic report " +
        "in 3–4 sentences, then 3 bullet-point key takeaways. Use ONLY the facts provided — do not invent numbers " +
        "or events. Plain text, no markdown headers.",
      prompt: `Summarise this issue for a reader who wants the gist in 20 seconds:\n\n${facts}`,
      maxRetries: 1,
    });
    const summary = text?.trim();
    return summary ? { summary, model } : null;
  } catch {
    // Gateway down, bad key, model unavailable, rate-limited → degrade gracefully.
    return null;
  }
}
