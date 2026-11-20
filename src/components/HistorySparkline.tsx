"use client";

import Sparkline from "@/components/Sparkline";
import { ALL_COUNTRIES, INDICATORS, series } from "@/lib/indicators";
import { lastYears } from "@/lib/history";
import { useHistory, realSeries, rangeLabel } from "@/components/live/useHistory";

/** A sparkline of REAL history when a source covers it; otherwise a faded, labelled
 *  sample trend. Shows an empty box while the history is loading. */
export default function HistorySparkline({ code, indKey, color = "#00D084", w = 120, h = 34, fill = true, years = 20, label = true, prefix = "" }:
  { code: string; indKey: string; color?: string; w?: number; h?: number; fill?: boolean; years?: number; label?: boolean; prefix?: string }) {
  const hist = useHistory(indKey);
  const real = realSeries(hist, code);
  const pts = real ? lastYears(real, years) : null;

  let body: React.ReactNode;
  let caption: string;
  if (pts && pts.length >= 2) {
    body = <Sparkline data={pts.map((p) => p[1])} color={color} w={w} h={h} fill={fill} />;
    caption = rangeLabel(hist.data?.provider, pts);
  } else if (hist.status === "loading") {
    body = <div style={{ width: w, height: h }} className="animate-pulse rounded bg-white/[0.03]" aria-hidden />;
    caption = "loading history…";
  } else {
    const c = ALL_COUNTRIES.find((x) => x.code === code);
    const ind = INDICATORS.find((i) => i.key === indKey);
    body = c && ind ? (
      <span className="block opacity-60" style={{ filter: "grayscale(0.4)" }}>
        <Sparkline data={series(c, ind, 24)} color={color} w={w} h={h} fill={false} />
      </span>
    ) : null;
    caption = "sample trend · illustrative";
  }
  return (
    <div>
      {body}
      {label && (
        <p className={`mt-1 font-mono text-[9px] ${pts ? "text-muted2" : "text-gold/80"}`} title={pts ? "Real historical series" : "Not real data"}>{prefix}{caption}</p>
      )}
    </div>
  );
}
