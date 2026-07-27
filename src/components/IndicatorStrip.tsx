import Link from "next/link";
import Sparkline from "@/components/Sparkline";
import { INDICATORS, ALL_COUNTRIES, currentValue, series, fmt } from "@/lib/indicators";

const COLORS = ["#00D084", "#3B82F6", "#22D3EE", "#7C3AED", "#FBBF24", "#34D399"];

export default function IndicatorStrip() {
  const ind = INDICATORS[0]; // GDP growth
  const cards = ALL_COUNTRIES.filter((c) => c.hub)
    .map((c) => ({ c, v: currentValue(c, ind), s: series(c, ind, 24) }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 6);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map(({ c, v, s }, i) => (
        <Link key={c.code} href="/data" className="glass group p-4 transition-transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted">{c.code}</span>
            <span className="font-display text-lg font-semibold" style={{ color: COLORS[i % COLORS.length] }}>{fmt(v, ind)}</span>
          </div>
          <p className="mt-1 truncate text-xs text-muted2">{c.name}</p>
          <div className="mt-3"><Sparkline data={s} color={COLORS[i % COLORS.length]} w={180} h={36} /></div>
        </Link>
      ))}
    </div>
  );
}
