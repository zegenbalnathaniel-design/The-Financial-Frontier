import type { ReactNode } from "react";
export default function ChartFrame({ title, caption, children, accent = "emerald" }:
  { title: string; caption?: string; children: ReactNode; accent?: "emerald" | "electric" | "violet" | "gold" }) {
  const dot = { emerald: "bg-emerald", electric: "bg-electric", violet: "bg-violet", gold: "bg-gold" }[accent];
  return (
    <section className="glass p-6">
      <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
        <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden />{title}
      </h3>
      <div className="mt-5 h-64 w-full">{children}</div>
      {caption && <p className="mt-3 text-xs italic text-muted2">{caption}</p>}
    </section>
  );
}
