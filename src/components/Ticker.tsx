"use client";

import type { Indicator } from "@/lib/types";
import { useMarkets } from "@/components/live/LiveDataProvider";

const tone: Record<string, string> = {
  up: "text-pos", down: "text-neg", gold: "text-gold", blue: "text-electric",
  cyan: "text-cyan", violet: "text-violet", neutral: "text-ink",
};

/** Marquee: today's live index + stock moves (when the feed is up), then the issue's numbers. */
export default function Ticker({ indicators }: { indicators: Indicator[] }) {
  const { board } = useMarkets();
  const liveItems = [
    ...board.indices.map((i) => ({ label: i.name, value: `${i.changePct >= 0 ? "+" : ""}${i.changePct.toFixed(2)}%`, tone: i.changePct >= 0 ? "up" : "down" })),
    ...[...board.stocks].sort((a, b) => (b.marketCap ?? 0) - (a.marketCap ?? 0)).slice(0, 12)
      .map((s) => ({ label: s.symbol, value: `${s.changePct >= 0 ? "+" : ""}${s.changePct.toFixed(2)}%`, tone: s.changePct >= 0 ? "up" : "down" })),
  ];
  const base = [...liveItems, ...indicators.map((i) => ({ label: i.label, value: i.value, tone: i.tone ?? "neutral" }))];
  const items = [...base, ...base];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.02] py-3">
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap will-change-transform" style={{ animationDuration: `${Math.max(40, base.length * 3)}s` }}>
        {items.map((i, idx) => (
          <span key={idx} className="flex items-center gap-2 text-sm">
            <span className="font-mono text-xs text-muted2">{i.label}</span>
            <span className={`font-display font-semibold ${tone[i.tone]}`}>{i.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
