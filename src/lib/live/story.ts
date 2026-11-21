import "server-only";
import { generateText } from "ai";
import { getLatestReport } from "@/lib/reports";

// Story of the Day. Picks the most consequential macro/markets headline from Finnhub's
// general news feed (free tier) and, when an AI Gateway key is set, adds a short
// neutral "why it matters" note written ONLY from that headline + summary.
//
// One story per New York trading day: the pick is deterministic for the day's feed, and
// the route caches for an hour. With no key, we fall back to the lead story of the
// latest monthly issue and label it as such — never a made-up headline.

export interface StoryOfDay {
  kind: "live" | "issue";
  headline: string;
  summary: string;
  whyItMatters?: string;
  source: string;
  url?: string;
  image?: string;
  publishedAt?: string;
  country?: string;     // ISO-2 code the globe should fly to
  tag: string;
  dateLabel: string;    // e.g. "Tue 17 Nov"
}

type RawNews = { headline: string; summary: string; source: string; url: string; image: string; datetime: number; category: string };

const TRUSTED = ["Reuters", "CNBC", "Bloomberg", "MarketWatch", "Financial Times", "WSJ", "Wall Street Journal", "Yahoo", "Barron's", "Associated Press", "AP"];
// Weighted keywords → importance; a headline's score is the sum of matches.
const WEIGHTS: [RegExp, number][] = [
  [/\b(fed|fomc|warsh|powell|rate (hike|cut)|interest rate)/i, 5],
  [/\b(ecb|lagarde|bank of england|boe|bank of japan|boj|rbi|central bank)/i, 4],
  [/\b(inflation|cpi|pce|jobs report|payrolls|unemployment|gdp|recession)/i, 4],
  [/\b(oil|brent|crude|opec|hormuz|iran)/i, 3],
  [/\b(s&p 500|nasdaq|dow|stocks?|treasur(y|ies)|yields?|bond)/i, 2],
  [/\b(tariff|trade war|sanction|imf|world bank)/i, 3],
  [/\b(nvidia|apple|microsoft|alphabet|amazon|meta|tesla|earnings)/i, 1],
];
// Headline keyword → globe focus.
const PLACES: [RegExp, string][] = [
  [/\b(fed|fomc|warsh|wall street|u\.s\.|us |america|treasur)/i, "US"],
  [/\b(ecb|lagarde|euro ?zone|euro area|germany|german|bund)/i, "DE"],
  [/\b(france|french)/i, "FR"], [/\b(italy|italian)/i, "IT"],
  [/\b(bank of england|boe|britain|british|uk |u\.k\.|london|sterling)/i, "GB"],
  [/\b(bank of japan|boj|japan|yen|nikkei|tokyo)/i, "JP"],
  [/\b(china|chinese|beijing|yuan|pboc)/i, "CN"], [/\b(india|rbi|rupee)/i, "IN"],
  [/\b(saudi|opec)/i, "SA"], [/\b(iran|hormuz|gulf|uae|dubai)/i, "AE"],
  [/\b(brazil)/i, "BR"], [/\b(canada|canadian)/i, "CA"], [/\b(korea|kospi)/i, "KR"], [/\b(australia|rba)/i, "AU"],
];

const nyDate = () => new Date().toLocaleDateString("en-GB", { timeZone: "America/New_York", weekday: "short", day: "numeric", month: "short" });

function score(n: RawNews): number {
  const text = `${n.headline} ${n.summary}`;
  let s = WEIGHTS.reduce((acc, [re, w]) => acc + (re.test(text) ? w : 0), 0);
  if (TRUSTED.some((t) => n.source?.toLowerCase().includes(t.toLowerCase()))) s += 3;
  if (n.summary && n.summary.length > 80) s += 1;
  if (n.image) s += 1;
  return s;
}
const placeOf = (text: string) => PLACES.find(([re]) => re.test(text))?.[1];
const tagOf = (text: string) =>
  /\b(fed|ecb|boe|boj|rbi|central bank|rate)/i.test(text) ? "Policy"
  : /\b(oil|brent|crude|opec|energy)/i.test(text) ? "Energy"
  : /\b(inflation|cpi|jobs|gdp|payrolls)/i.test(text) ? "Economy"
  : "Markets";

async function whyItMatters(headline: string, summary: string): Promise<string | undefined> {
  if (!process.env.AI_GATEWAY_API_KEY) return undefined;
  try {
    const { text } = await generateText({
      model: process.env.AI_MODEL ?? "openai/gpt-4o-mini",
      system: "You are a neutral financial editor. In two short sentences, explain why this news matters for the economy or markets. Use ONLY the facts given; do not add numbers or events. Plain text.",
      prompt: `Headline: ${headline}\nSummary: ${summary}`,
      maxRetries: 1,
      abortSignal: AbortSignal.timeout(6000),
    });
    return text.trim() || undefined;
  } catch {
    return undefined;
  }
}

export async function getStoryOfDay(): Promise<StoryOfDay> {
  const key = (process.env.FINNHUB_API_KEY ?? process.env.FIN_HUB_API_KEY);
  if (key) {
    try {
      const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${key}`, {
        next: { revalidate: 3600 }, signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const items = ((await res.json()) as RawNews[])
          .filter((n) => n.headline && n.url && Date.now() / 1000 - n.datetime < 36 * 3600);
        const best = items.map((n) => ({ n, s: score(n) })).sort((a, b) => b.s - a.s || b.n.datetime - a.n.datetime)[0]?.n;
        if (best) {
          const text = `${best.headline} ${best.summary}`;
          return {
            kind: "live",
            headline: best.headline,
            summary: best.summary,
            whyItMatters: await whyItMatters(best.headline, best.summary),
            source: best.source,
            url: best.url,
            image: best.image || undefined,
            publishedAt: new Date(best.datetime * 1000).toISOString(),
            country: placeOf(text),
            tag: tagOf(text),
            dateLabel: nyDate(),
          };
        }
      }
    } catch {
      /* fall through to the issue story */
    }
  }
  const r = getLatestReport();
  const h = r?.highlights[0];
  return {
    kind: "issue",
    headline: h?.title ?? "The Financial Frontier",
    summary: h?.blurb ?? "",
    source: r ? `The Financial Frontier · ${r.month}` : "The Financial Frontier",
    url: r ? `/reports/${r.slug}` : undefined,
    country: h ? placeOf(`${h.title} ${h.blurb}`) : undefined,
    tag: h?.tag ?? "Issue",
    dateLabel: nyDate(),
  };
}
