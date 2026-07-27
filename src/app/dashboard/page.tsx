import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestReport } from "@/lib/reports";
import StatCard from "@/components/StatCard";
import Reveal from "@/components/Reveal";
import ChartFrame from "@/components/charts/ChartFrame";
import { ForecastBars, GrowthInflationBars, ActivityBars } from "@/components/charts/Bars";
import PolicyDivergence from "@/components/charts/PolicyDivergence";

export const metadata: Metadata = { title: "Dashboard — The Financial Frontier", description: "The macro picture at a glance." };

export default function DashboardPage() {
  const report = getLatestReport();
  if (!report) return (
    <div className="shell py-24"><h1 className="h-display text-4xl">Dashboard</h1>
      <div className="glass mt-10 border-dashed p-12 text-center"><p className="h-display text-lg">No data yet</p>
      <p className="mt-2 text-sm text-muted">Add a report to <code className="text-emerald">content/reports/</code>.</p></div></div>
  );
  const { charts } = report;
  return (
    <div className="shell py-20">
      <Reveal>
        <p className="kicker">Live from Issue No. {String(report.issueNumber).padStart(2, "0")}</p>
        <h1 className="h-display mt-5 text-4xl sm:text-5xl">Macro dashboard</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">Growth, inflation, policy and activity as they stood in {report.month}. These charts update automatically with each new report.</p>
      </Reveal>
      <section className="mt-14"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {report.indicators.slice(0, 8).map((ind, i) => (<Reveal key={ind.label} delay={0.03 * i}><StatCard indicator={ind} /></Reveal>))}
      </div></section>
      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        {charts.growthForecast && <Reveal><ChartFrame title="Global growth forecasts, 2026" caption="Three institutions, three answers."><ForecastBars data={charts.growthForecast} /></ChartFrame></Reveal>}
        {charts.growthVsInflation && <Reveal delay={0.06}><ChartFrame title="Growth versus prices" accent="electric" caption="Growth below inflation = a squeeze."><GrowthInflationBars data={charts.growthVsInflation} /></ChartFrame></Reveal>}
        {charts.activityIndex && <Reveal delay={0.1}><ChartFrame title={charts.activityTitle ?? "Activity"} accent="violet" caption={`The ${charts.activityBaseline ?? 50} line divides expansion from contraction.`}><ActivityBars data={charts.activityIndex} baseline={charts.activityBaseline} /></ChartFrame></Reveal>}
        {charts.policy && <Reveal delay={0.14}><section className="glass p-6"><h3 className="flex items-center gap-2 font-display text-sm font-semibold text-ink"><span className="h-2 w-2 rounded-full bg-emerald" /> Central banks, split</h3><div className="mt-5"><PolicyDivergence policy={charts.policy} /></div></section></Reveal>}
      </section>
      <Reveal><div className="glass mt-14 flex flex-wrap items-center justify-between gap-4 p-6">
        <div><p className="h-display text-lg">Want the full analysis?</p><p className="mt-1 text-sm text-muted">Every number here is unpacked in the {report.month} report.</p></div>
        <Link href={`/reports/${report.slug}`} className="btn-primary">Read the report <ArrowRight size={15} /></Link>
      </div></Reveal>
      <p className="mt-8 text-xs text-muted2">Data as reported in {report.month}. Educational use only — not investment advice.</p>
    </div>
  );
}
