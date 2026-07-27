import type { Indicator } from "@/lib/types";

const tone: Record<string, string> = {
  up: "text-pos", down: "text-neg", gold: "text-gold", blue: "text-electric",
  cyan: "text-cyan", violet: "text-violet", neutral: "text-ink",
};

export default function Ticker({ indicators }: { indicators: Indicator[] }) {
  const items = [...indicators, ...indicators];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.02] py-3">
      <div className="flex w-max gap-10 whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
        {items.map((i, idx) => (
          <span key={idx} className="flex items-center gap-2 text-sm">
            <span className="font-mono text-xs text-muted2">{i.label}</span>
            <span className={`font-display font-semibold ${tone[i.tone ?? "neutral"]}`}>{i.value}</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media (prefers-reduced-motion: reduce){div[style*="marquee"]{animation:none!important}}`}</style>
    </div>
  );
}
