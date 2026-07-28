"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { X, TrendingUp, TrendingDown, Info } from "lucide-react";
import type { Country } from "@/lib/countries";
import { INDICATORS, FAMILIES, currentValue, series, colorForIndicator, fmt, provenanceFor } from "@/lib/indicators";
import { liveGet } from "@/lib/live/types";
import { useLive } from "@/components/live/LiveDataProvider";

const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-3 text-muted">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald/30 border-t-emerald" />
        <p className="font-mono text-xs tracking-wider">Rendering globe…</p>
      </div>
    </div>
  ),
});

const QUICK = ["gdpGrowth", "cpi", "policyRate", "unemployment", "debtToGdp", "marketReturnYtd"];
const PANEL_KEYS = ["gdpGrowth", "cpi", "policyRate", "unemployment", "debtToGdp", "currentAccount", "tenYearYield", "marketReturnYtd"];

export default function GlobeSection() {
  const live = useLive();
  const [indKey, setIndKey] = useState("gdpGrowth");
  const [family, setFamily] = useState("Popular");
  const [selected, setSelected] = useState<Country | null>(null);
  const ind = useMemo(() => INDICATORS.find((i) => i.key === indKey)!, [indKey]);

  const dropdownInds = useMemo(
    () => (family === "Popular" ? INDICATORS.filter((i) => QUICK.includes(i.key)) : INDICATORS.filter((i) => i.family === family)),
    [family],
  );

  const chart = useMemo(() => {
    if (!selected) return [];
    return series(selected, ind, 24, live).map((v, i) => ({ i, v }));
  }, [selected, ind, live]);
  // Prefer a live daily index move for the header change when we have one.
  const liveChange = selected ? liveGet(live, selected.code, "change") : undefined;
  const change = liveChange?.value ?? selected?.data.change ?? 0;
  const up = change >= 0;

  return (
    <div>
      {/* Indicator picker */}
      <div className="glass mb-5 flex flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-muted2">Family</span>
          {["Popular", ...FAMILIES].map((f) => (
            <button key={f} onClick={() => { setFamily(f); }}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] transition-colors ${family === f ? "bg-emerald/15 text-emerald" : "text-muted2 hover:text-ink"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-muted2">Colour by</span>
          {dropdownInds.map((i) => (
            <button key={i.key} onClick={() => setIndKey(i.key)}
              className={`rounded-full border px-3 py-1.5 font-display text-xs font-semibold transition-colors ${indKey === i.key ? "border-emerald/50 bg-emerald/15 text-emerald" : "border-white/10 text-muted hover:text-ink"}`}>
              {i.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass relative h-[30rem] overflow-hidden sm:h-[34rem]">
          <div className="pointer-events-none absolute left-4 top-4 z-10">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted2">Showing · {ind.label} ({ind.unit})</p>
            {live.sources.length > 0 && (
              <p className="mt-0.5 font-mono text-[9px] text-emerald/80">● live · {live.sources.join(" · ")}</p>
            )}
          </div>
          <Globe ind={ind} onSelect={setSelected} live={live} />
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center">
            <p className="font-mono text-[10px] text-muted2">drag to rotate · scroll to zoom · click a hub · outlines = real borders</p>
          </div>
        </div>

        <div className="glass min-h-[30rem] p-6 sm:min-h-[34rem]">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected.code} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="kicker">Market intelligence</p>
                    <h3 className="h-display mt-2 text-2xl">{selected.name}</h3>
                    <p className="mt-1 font-mono text-xs text-muted">{selected.region} · {selected.data.currency}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-muted2 hover:text-ink" aria-label="Close"><X size={18} /></button>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-lg text-ink">{selected.data.market}</span>
                  <span className={`inline-flex items-center gap-1 font-mono text-sm ${up ? "text-pos" : "text-neg"}`}>
                    {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{up ? "+" : ""}{change}%
                  </span>
                </div>

                <div className="mt-3 h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chart}>
                      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={colorForIndicator(ind, currentValue(selected, ind, live))} stopOpacity={0.5} />
                        <stop offset="100%" stopColor={colorForIndicator(ind, currentValue(selected, ind, live))} stopOpacity={0} />
                      </linearGradient></defs>
                      <YAxis hide domain={["dataMin", "dataMax"]} />
                      <Tooltip contentStyle={{ background: "#08111F", border: "1px solid rgba(133,152,180,0.2)", borderRadius: 8, fontSize: 11 }} labelStyle={{ display: "none" }} formatter={(v: number) => [fmt(v, ind), ind.label]} />
                      <Area type="monotone" dataKey="v" stroke={colorForIndicator(ind, currentValue(selected, ind, live))} strokeWidth={1.5} fill="url(#g)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-1 font-mono text-[10px] text-muted2">{ind.label} · illustrative trend</p>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {PANEL_KEYS.map((k) => {
                    const mi = INDICATORS.find((x) => x.key === k)!;
                    const v = currentValue(selected, mi, live);
                    const isLive = !!liveGet(live, selected.code, mi.key);
                    return (
                      <div key={k} className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                        <div className="flex items-center gap-1">
                          <span className="font-display text-base" style={{ color: colorForIndicator(mi, v) }}>{fmt(v, mi)}</span>
                          {isLive && <span className="h-1.5 w-1.5 rounded-full bg-emerald" title="Live data" />}
                        </div>
                        <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-muted2">{mi.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {selected.groups.slice(0, 6).map((g) => <span key={g} className="chip">{g}</span>)}
                </div>

                <p className="mt-4 flex items-start gap-2 font-mono text-[10px] leading-relaxed text-muted2">
                  <Info size={12} className="mt-0.5 shrink-0" />
                  {(() => {
                    const live3 = ["gdpGrowth", "cpi", "policyRate"].map((k) => provenanceFor(selected, INDICATORS.find((x) => x.key === k)!, live));
                    const anyLive = live3.some((p) => p.source !== "Sample data");
                    if (anyLive) {
                      const asOf = live3.map((p) => p.asOf).filter(Boolean).sort().pop();
                      return `● Live where available (World Bank / FRED / ECB / Finnhub${asOf ? `, latest ${asOf}` : ""}); remaining metrics illustrative until sourced.`;
                    }
                    return selected.sourced
                      ? "Growth/inflation/rate grounded in our June 2026 report; other metrics & charts illustrative."
                      : "Illustrative sample data for the visualisation.";
                  })()}
                </p>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full min-h-[26rem] flex-col items-center justify-center text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-emerald/30 bg-emerald/5"><TrendingUp size={22} className="text-emerald" /></div>
                <p className="h-display mt-5 text-lg">Select an economy</p>
                <p className="mt-2 max-w-xs text-sm text-muted">Recolour the globe by any indicator, then click a glowing hub for its full panel.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
