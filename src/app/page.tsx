import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllReports, getLatestReport } from "@/lib/reports";
import { GLOSSARY_COUNT } from "@/lib/glossary";
import { COUNTRIES } from "@/lib/countries";
import Ticker from "@/components/Ticker";
import ReportCard from "@/components/ReportCard";
import StatCard from "@/components/StatCard";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import GlobeSection, { type TimelineMonth } from "@/components/three/GlobeSection";
import MarketPulse from "@/components/markets/MarketPulse";
import StoryOfTheDay from "@/components/StoryOfTheDay";
import BentoNav from "@/components/BentoNav";
import IndicatorStrip from "@/components/IndicatorStrip";

export default function HomePage() {
  const latest = getLatestReport();
  const all = getAllReports();
  const older = all.slice(1, 4);
  // Oldest → newest, one Time Machine stop per published issue.
  const timeline: TimelineMonth[] = [...all].reverse().map((r) => ({
    slug: r.slug, label: r.month.slice(0, 3), month: r.month, title: r.title,
    indicators: r.indicators.slice(0, 4), snapshot: r.countrySnapshot ?? {},
  }));

  return (
    <>
      <Hero
        issue={String(latest?.issueNumber ?? 1).padStart(2, "0")}
        month={latest?.month}
        slug={latest?.slug}
        economies={COUNTRIES.length}
        terms={GLOSSARY_COUNT}
      />

      {latest && <Ticker indicators={latest.indicators} />}

      <section className="shell pt-16">
        <StoryOfTheDay />
      </section>

      <section className="shell py-20">
        <Reveal>
          <p className="kicker">Today&rsquo;s markets</p>
          <h2 className="h-display mt-4 text-3xl sm:text-4xl">Market Pulse</h2>
          <p className="mt-3 max-w-2xl text-muted">
            The biggest US companies on one live board — sized by value, coloured by today&rsquo;s move. Hover any tile
            for its day range; the top riser of the session gets the spotlight.
          </p>
        </Reveal>
        <div className="mt-10"><MarketPulse /></div>
      </section>

      <section className="shell py-20">
        <Reveal>
          <p className="kicker">Signature experience · 01</p>
          <h2 className="h-display mt-4 text-3xl sm:text-4xl">The Global Intelligence Globe</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Every glowing node is a financial hub. Recolour the planet by growth, inflation, rates or
            markets, click any hub for its live intelligence panel — then scrub the Time Machine to replay
            the year issue by issue.
          </p>
        </Reveal>
        <div className="mt-10"><GlobeSection timeline={timeline} /></div>
      </section>

      {latest && (
        <section className="shell py-16">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div><p className="kicker">This month</p><h2 className="h-display mt-4 text-3xl sm:text-4xl">{latest.title}</h2></div>
              <Link href="/reports" className="hidden shrink-0 items-center gap-1 text-sm text-muted hover:text-emerald sm:inline-flex">All reports <ArrowRight size={14} /></Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}><p className="mt-5 max-w-3xl text-lg leading-relaxed text-body">{latest.standfirst}</p></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latest.indicators.slice(0, 4).map((ind, i) => (<Reveal key={ind.label} delay={0.04 * i}><StatCard indicator={ind} /></Reveal>))}
          </div>
        </section>
      )}

      {latest && (
        <section className="shell py-12">
          <Reveal><p className="kicker">What we covered</p><h2 className="h-display mt-4 text-3xl">Six stories that defined the month</h2></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latest.highlights.map((h, i) => (
              <Reveal key={h.title} delay={0.04 * i}>
                <article className="glass h-full p-6">
                  {h.tag && <span className="chip border-emerald/30 text-emerald">{h.tag}</span>}
                  <h3 className="h-display mt-4 text-lg leading-snug">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{h.blurb}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Live indicators strip */}
      <section className="shell py-16">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker">Data lab</p>
              <h2 className="h-display mt-4 text-3xl sm:text-4xl">Every indicator, one explorer</h2>
              <p className="mt-3 max-w-2xl text-muted">A SingStat-style table builder for the world economy — pick an indicator, choose economies, compare across time as a chart, table or ranking.</p>
            </div>
            <Link href="/data" className="hidden shrink-0 items-center gap-1 text-sm text-muted hover:text-emerald sm:inline-flex">Open the explorer <ArrowRight size={14} /></Link>
          </div>
        </Reveal>
        <Reveal delay={0.06}><div className="mt-8"><IndicatorStrip /></div></Reveal>
      </section>

      {/* Bento module navigator (replaces the cube) */}
      <section className="shell py-12">
        <Reveal>
          <p className="kicker">Explore the platform</p>
          <h2 className="h-display mt-4 text-3xl">Everything, one tap away</h2>
        </Reveal>
        <div className="mt-10"><BentoNav /></div>
      </section>

      <section className="shell py-12">
        <Reveal><p className="kicker">The archive</p><h2 className="h-display mt-4 text-3xl">Every issue, in one place</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {older.length > 0 ? older.map((r, i) => (<Reveal key={r.slug} delay={0.05 * i}><ReportCard report={r} /></Reveal>))
            : ["Next month", "In two months", "In three months"].map((label, i) => (
            <Reveal key={label} delay={0.05 * i}>
              <div className="glass flex h-full min-h-[13rem] flex-col justify-center border-dashed p-6 text-center">
                <p className="font-display text-sm font-semibold text-muted2">{label}</p>
                <p className="mt-2 text-sm text-muted2">The next issue appears here automatically once it's added.</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal><div className="mt-10"><Link href="/reports" className="inline-flex items-center gap-2 text-sm text-emerald hover:underline">Browse the full archive <ArrowRight size={14} /></Link></div></Reveal>
      </section>
    </>
  );
}
