import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getReport, getReportSlugs } from "@/lib/reports";
import StatCard from "@/components/StatCard";
import Reveal from "@/components/Reveal";
import PdfViewer from "@/components/PdfViewer";
import ChartFrame from "@/components/charts/ChartFrame";
import GrowthForecastChart from "@/components/charts/GrowthForecastChart";
import GrowthVsInflationChart from "@/components/charts/GrowthVsInflationChart";
import ActivityIndexChart from "@/components/charts/ActivityIndexChart";
import PolicyDivergence from "@/components/charts/PolicyDivergence";

type Props = { params: { slug: string } };
export function generateStaticParams() { return getReportSlugs().map((slug) => ({ slug })); }
export function generateMetadata({ params }: Props): Metadata {
  const r = getReport(params.slug);
  return r ? { title: `${r.title} — The Financial Frontier`, description: r.standfirst } : { title: "Report not found" };
}

export default function ReportPage({ params }: Props) {
  const report = getReport(params.slug);
  if (!report) notFound();
  const { charts } = report;
  return (
    <div className="shell py-16">
      <Link href="/reports" className="inline-flex items-center gap-2 text-sm text-muted hover:text-emerald"><ArrowLeft size={15} /> All reports</Link>
      <header className="mt-10">
        <Reveal>
          <p className="kicker">Issue No. {String(report.issueNumber).padStart(2, "0")} · {report.month}</p>
          <h1 className="h-display mt-5 max-w-4xl text-4xl leading-tight sm:text-5xl">{report.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-body">{report.standfirst}</p>
        </Reveal>
        <Reveal delay={0.08}><div className="mt-7 flex flex-wrap gap-2">{report.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div></Reveal>
      </header>

      {report.editorsNote && (
        <Reveal><blockquote className="mt-14 border-l-2 border-emerald pl-6"><p className="font-display text-xl leading-relaxed text-ink">{report.editorsNote}</p><footer className="mt-3 text-sm text-muted2">— From the Editor&rsquo;s Letter</footer></blockquote></Reveal>
      )}

      <section className="mt-16">
        <Reveal><h2 className="h-display text-2xl">The month in numbers</h2></Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {report.indicators.map((ind, i) => <Reveal key={ind.label} delay={0.03 * i}><StatCard indicator={ind} /></Reveal>)}
        </div>
      </section>

      <section className="mt-20">
        <Reveal><h2 className="h-display text-2xl">Charts that explain the month</h2></Reveal>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {charts.growthForecast && <Reveal><ChartFrame title="2026 global growth: who forecasts what" caption="Forecasters disagree on the decimal, not the direction."><GrowthForecastChart data={charts.growthForecast} /></ChartFrame></Reveal>}
          {charts.growthVsInflation && <Reveal delay={0.06}><ChartFrame title="Growth versus prices" accent="electric" caption="Blue is growth; gold is inflation."><GrowthVsInflationChart data={charts.growthVsInflation} /></ChartFrame></Reveal>}
          {charts.activityIndex && <Reveal delay={0.1}><ChartFrame title={charts.activityTitle ?? "Activity index"} accent="violet" caption={`Above ${charts.activityBaseline ?? 50} signals expansion.`}><ActivityIndexChart data={charts.activityIndex} baseline={charts.activityBaseline} /></ChartFrame></Reveal>}
          {charts.policy && <Reveal delay={0.14}><section className="glass p-6"><h3 className="flex items-center gap-2 font-display text-sm font-semibold text-ink"><span className="h-2 w-2 rounded-full bg-emerald" />Central banks, split</h3><div className="mt-5"><PolicyDivergence policy={charts.policy} /></div><p className="mt-3 text-xs italic text-muted2">Divergence, not any single data point, was the signature of this month.</p></section></Reveal>}
        </div>
      </section>

      <section className="mt-20">
        <Reveal><h2 className="h-display text-2xl">Inside the issue</h2></Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {report.highlights.map((h, i) => <Reveal key={h.title} delay={0.04 * i}><article className="glass h-full p-6">{h.tag && <span className="chip border-emerald/30 text-emerald">{h.tag}</span>}<h3 className="h-display mt-4 text-lg">{h.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{h.blurb}</p></article></Reveal>)}
        </div>
      </section>

      <section className="mt-20">
        <Reveal><div className="flex flex-wrap items-end justify-between gap-4"><h2 className="h-display text-2xl">Read the full issue</h2><p className="text-sm text-muted2">{report.pageCount ?? "—"} pages</p></div></Reveal>
        <Reveal delay={0.06}><div className="mt-6"><PdfViewer screen={report.pdf.screen} press={report.pdf.press} title={report.title} pageCount={report.pageCount} /></div></Reveal>
      </section>

      <section className="mt-20">
        <Reveal><h2 className="h-display text-2xl">Sources &amp; method</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">We separate fact (sourced figures), analysis (our reading) and opinion (labelled). Forecasts are scenarios — where forecasters disagree, we show the range.</p></Reveal>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {report.sources.map((s) => <li key={s.name}>{s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:bg-white/5 hover:text-ink"><ExternalLink size={14} className="mt-1 shrink-0 text-muted2 group-hover:text-emerald" />{s.name}</a> : <span className="block px-3 py-2 text-sm text-muted">{s.name}</span>}</li>)}
        </ul>
      </section>
    </div>
  );
}
