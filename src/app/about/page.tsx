import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "About — The Financial Frontier", description: "Why this platform exists, and the rules it holds itself to." };

const principles = [
  { title: "Never fabricate a statistic", body: "Every figure is attributed. Where a number doesn't exist, we describe the trend and say so — and on the globe and Indicator Explorer any cell without a real source is labelled as sample data." },
  { title: "Show the disagreement", body: "Forecasts are scenarios, not prophecies. When the World Bank, S&P and the OECD disagree, we print all three." },
  { title: "Separate fact from opinion", body: "Sourced figures are fact. Our reading of them is analysis. Anything further is opinion, and it carries a label." },
  { title: "Name the winners and the losers", body: "Every economic event benefits someone and costs someone else. A story that names only one has told half of it." },
];

// Where every number on the globe and in the Indicator Explorer comes from.
const sources = [
  { name: "World Bank", key: "No key", what: "GDP growth, GDP per capita, CPI inflation, unemployment, current account, budget balance, broad money, FDI inflows, trade balance, market capitalisation (annual)." },
  { name: "OECD", key: "No key", what: "Core inflation (CPI excluding food and energy), wage growth (compensation per employee), industrial production, retail sales volume, consumer confidence, labour productivity (GDP per person employed) and 10-year government bond yields (monthly or quarterly)." },
  { name: "BIS", key: "No key", what: "Central-bank policy rates (latest daily reading, end-of-month history) and residential property prices (quarterly)." },
  { name: "IMF World Economic Outlook", key: "No key", what: "General government gross debt as a share of GDP — completed years only, never projections." },
  { name: "ECB via Frankfurter", key: "No key", what: "Each currency's move against the US dollar this year." },
  { name: "FRED", key: "Free key", what: "Fresher daily readings for US rates and long-term yields, and US unemployment." },
  { name: "Finnhub · Alpha Vantage", key: "Free keys", what: "Today's market moves and the year-to-date equity return, tracked through each market's US-listed country ETF (EWJ for Japan, EWG for Germany …), in US dollars." },
];

export default function AboutPage() {
  return (
    <div className="shell py-20">
      <Reveal>
        <p className="kicker">About</p>
        <h1 className="h-display mt-5 max-w-3xl text-4xl leading-tight sm:text-5xl">A financial-intelligence platform for people who want to actually understand the economy</h1>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-body">
          <p>Most economics coverage either assumes you already speak the language, or flattens a complex world into a headline that tells you nothing. The Financial Frontier is built on the belief that there's a third option — depth you can actually see and explore.</p>
          <p>We pair institutional-grade data with an immersive interface: an interactive globe, a live market board, and a deep, fully-sourced report every month. No jargon left undefined. No statistic without a source.</p>
          <p className="text-muted">Whether this is your first economics read or your five-hundredth, the promise is the same: you'll leave understanding the world a little better than when you arrived.</p>
        </div>
      </Reveal>
      <section className="mt-20">
        <Reveal><h2 className="h-display text-2xl">The rules we hold ourselves to</h2></Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={0.05 * i}><article className="glass h-full p-6"><h3 className="h-display text-lg text-emerald">{p.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p></article></Reveal>
          ))}
        </div>
      </section>
      <section id="data" className="mt-20 scroll-mt-28">
        <Reveal>
          <h2 className="h-display text-2xl">Data honesty — where every number comes from</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            The globe and the Indicator Explorer show a real, sourced figure wherever an official source publishes one for that economy,
            with the source and date beside it. Trend lines are the same series, as published — we only ever derive a year-on-year
            change from two real observations of the same index. Where no free source covers an economy, the cell is marked
            <span className="mx-1 rounded border border-gold/40 px-1.5 py-0.5 font-mono text-[10px] text-gold">Sample</span>
            and its chart is drawn dashed: those are placeholders, never presented as data, and never mixed with real points on one line.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sources.map((s, i) => (
            <Reveal key={s.name} delay={0.04 * i}>
              <article className="glass h-full p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="h-display text-base text-ink">{s.name}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted2">{s.key}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.what}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            Still sample: <span className="text-body">Manufacturing PMI</span> (the survey data is licensed, with no free source), and any
            economy a source doesn&apos;t publish — the OECD and BIS cover between 12 and 24 of our 30 economies depending on the indicator.
            If an upstream is slow or throttled we show our last saved copy of the same official series, and say so.
          </p>
        </Reveal>
      </section>
      <Reveal><div className="glass mt-16 p-8">
        <p className="h-display text-xl leading-relaxed">&ldquo;Complex financial events can be made understandable — without ever being oversimplified.&rdquo;</p>
        <p className="mt-3 text-sm text-muted2">— The Financial Frontier</p>
        <Link href="/reports" className="mt-6 inline-block text-sm text-emerald hover:underline">Start with the latest report →</Link>
      </div></Reveal>
    </div>
  );
}
