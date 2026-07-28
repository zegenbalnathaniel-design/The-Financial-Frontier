"use client";

import dynamic from "next/dynamic";
import type { ReportCharts } from "@/lib/types";
import ChartFrame from "./ChartFrame";
import Reveal from "@/components/Reveal";
import LazyVisible from "@/components/LazyVisible";

// Recharts is heavy (~90kb gzipped). Code-split each chart out of the initial route
// bundle and render it client-side only, with a matching-height skeleton so layout
// doesn't shift. Combined with the LazyVisible wrapper on the whole grid, the charts
// download and mount only once the reader scrolls near them.
const Skeleton = () => <div className="h-full w-full animate-pulse rounded-lg bg-white/[0.03]" />;

// next/dynamic requires an inline object-literal for its options (compile-time transform).
const GrowthForecastChart = dynamic(() => import("./GrowthForecastChart"), { ssr: false, loading: Skeleton });
const GrowthVsInflationChart = dynamic(() => import("./GrowthVsInflationChart"), { ssr: false, loading: Skeleton });
const ActivityIndexChart = dynamic(() => import("./ActivityIndexChart"), { ssr: false, loading: Skeleton });
const PolicyDivergence = dynamic(() => import("./PolicyDivergence"), { ssr: false });

export default function ChartsGrid({ charts }: { charts: ReportCharts }) {
  return (
    <LazyVisible minHeight="34rem">
      <div className="grid gap-6 lg:grid-cols-2">
        {charts.growthForecast && (
          <Reveal>
            <ChartFrame title="2026 global growth: who forecasts what" caption="Forecasters disagree on the decimal, not the direction.">
              <GrowthForecastChart data={charts.growthForecast} />
            </ChartFrame>
          </Reveal>
        )}
        {charts.growthVsInflation && (
          <Reveal delay={0.06}>
            <ChartFrame title="Growth versus prices" accent="electric" caption="Blue is growth; gold is inflation.">
              <GrowthVsInflationChart data={charts.growthVsInflation} />
            </ChartFrame>
          </Reveal>
        )}
        {charts.activityIndex && (
          <Reveal delay={0.1}>
            <ChartFrame title={charts.activityTitle ?? "Activity index"} accent="violet" caption={`Above ${charts.activityBaseline ?? 50} signals expansion.`}>
              <ActivityIndexChart data={charts.activityIndex} baseline={charts.activityBaseline} />
            </ChartFrame>
          </Reveal>
        )}
        {charts.policy && (
          <Reveal delay={0.14}>
            <section className="glass p-6">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                <span className="h-2 w-2 rounded-full bg-emerald" />Central banks, split
              </h3>
              <div className="mt-5"><PolicyDivergence policy={charts.policy} /></div>
              <p className="mt-3 text-xs italic text-muted2">Divergence, not any single data point, was the signature of this month.</p>
            </section>
          </Reveal>
        )}
      </div>
    </LazyVisible>
  );
}
