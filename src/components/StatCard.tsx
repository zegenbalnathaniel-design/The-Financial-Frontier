import type { Indicator } from "@/lib/types";

const tone: Record<string, string> = {
  up: "text-pos", down: "text-neg", gold: "text-gold", blue: "text-electric",
  cyan: "text-cyan", violet: "text-violet", neutral: "text-ink",
};

export default function StatCard({ indicator }: { indicator: Indicator }) {
  return (
    <div className="glass p-5">
      <p className="font-display text-3xl font-semibold leading-none">
        <span className={tone[indicator.tone ?? "neutral"]}>{indicator.value}</span>
      </p>
      <p className="mt-3 text-sm text-ink">{indicator.label}</p>
      {indicator.note && <p className="mt-1 text-xs leading-snug text-muted2">{indicator.note}</p>}
    </div>
  );
}
