"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { X, TrendingUp, TrendingDown, Info, Play, Pause, History, ArrowRight } from "lucide-react";
import { COUNTRIES, type Country } from "@/lib/countries";
import type { GlobeValues } from "./Globe";
import type { Indicator } from "@/lib/types";
import { FOCUS_EVENT } from "@/lib/focus";
import { INDICATORS, FAMILIES, currentValue, series, colorForIndicator, fmt, provenanceFor, usesLive } from "@/lib/indicators";
import { liveGet } from "@/lib/live/types";
import { useLive } from "@/components/live/LiveDataProvider";
import { useHistory, realSeries } from "@/components/live/useHistory";
import { lastYears } from "@/lib/history";

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

/** One stop on the Time Machine — a published issue plus its month-end figures. */
export interface TimelineMonth {
  slug: string; label: string; month: string; title: string;
  indicators: Indicator[];
  snapshot: Record<string, { growth?: number; inflation?: number; rate?: number }>;
}
const TM_FIELDS: Record<string, "growth" | "inflation" | "rate"> = { gdpGrowth: "growth", cpi: "inflation", policyRate: "rate" };

const QUICK = ["gdpGrowth", "cpi", "policyRate", "unemployment", "debtToGdp", "marketReturnYtd"];
const PANEL_KEYS = ["gdpGrowth", "cpi", "policyRate", "unemployment", "debtToGdp", "currentAccount", "tenYearYield", "marketReturnYtd"];

/** Value of a field for a country as of a given month: the latest snapshot at or before
 *  that month; or, if no issue ever revised it, the curated (report-grounded) figure. */
function asOfMonth(timeline: TimelineMonth[], idx: number, c: Country, field: "growth" | "inflation" | "rate"): number | null {
  for (let i = idx; i >= 0; i--) {
    const v = timeline[i].snapshot[c.code]?.[field];
    if (typeof v === "number") return v;
  }
  const everRevised = timeline.some((m) => typeof m.snapshot[c.code]?.[field] === "number");
  return !everRevised && c.sourced ? (c.data[field] as number) : null;
}

export default function GlobeSection({ timeline = [] }: { timeline?: TimelineMonth[] }) {
  const live = useLive();
  const [indKey, setIndKey] = useState("gdpGrowth");
  const [family, setFamily] = useState("Popular");
  const [selected, setSelected] = useState<Country | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const ind = useMemo(() => INDICATORS.find((i) => i.key === indKey)!, [indKey]);

  // ── Time Machine: index into timeline, or timeline.length for "Now" (live) ──
  const NOW = timeline.length;
  const [tm, setTm] = useState(NOW);
  const [playing, setPlaying] = useState(false);
  const past = tm < NOW;
  const month = past ? timeline[tm] : null;
  useEffect(() => { if (past && !TM_FIELDS[indKey]) setIndKey("policyRate"); }, [past, indKey]);
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setTm((t) => { if (t >= NOW) { setPlaying(false); return NOW; } return t + 1; }), 1600);
    return () => window.clearInterval(id);
  }, [playing, NOW]);
  const play = () => { if (tm >= NOW) setTm(0); setPlaying((p) => !p); };

  const values = useMemo<GlobeValues>(() => Object.fromEntries(COUNTRIES.map((c) => {
    const field = TM_FIELDS[ind.key];
    const v = past && field ? asOfMonth(timeline, tm, c, field) : currentValue(c, ind, live);
    return [c.code, { value: v, color: v == null ? "" : colorForIndicator(ind, v), label: v == null ? "" : fmt(v, ind) }];
  })), [ind, live, past, tm, timeline]);

  // Story of the Day / command palette can ask the globe to fly to a country.
  const sectionRef = useRef<HTMLDivElement>(null);
  const focusCountry = useCallback((code: string) => {
    const c = COUNTRIES.find((x) => x.code === code);
    if (!c) return;
    setSelected(c); setFocus(null);
    requestAnimationFrame(() => setFocus(code));
  }, []);
  useEffect(() => {
    const onFocus = (e: Event) => {
      const code = (e as CustomEvent<string>).detail;
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      focusCountry(code);
    };
    window.addEventListener(FOCUS_EVENT, onFocus);
    // Deep link from another page (⌘K / Story of the Day): /#globe-JP
    const fromHash = () => {
      const m = window.location.hash.match(/^#globe-([A-Z]{2})$/);
      if (!m) return;
      // Wait a beat so the router's own scroll handling has finished first.
      setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
      setTimeout(() => focusCountry(m[1]), 700);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => { window.removeEventListener(FOCUS_EVENT, onFocus); window.removeEventListener("hashchange", fromHash); };
  }, [focusCountry]);
  const onSelect = useCallback((c: Country) => { setSelected(c); setFocus(c.code); }, []);

  const dropdownInds = useMemo(
    () => (family === "Popular" ? INDICATORS.filter((i) => QUICK.includes(i.key)) : INDICATORS.filter((i) => i.family === family)),
    [family],
  );

  // Trend: REAL history (last 25 years annual / 10 years monthly) when a source covers this
  // economy; otherwise a clearly-labelled sample trend. Nothing is drawn while loading.
  const hist = useHistory(ind.key);
  const trend = useMemo(() => {
    if (!selected) return { mode: "none" as const, data: [] as { p: string; v: number }[], caption: "" };
    const real = realSeries(hist, selected.code);
    if (real) {
      const pts = lastYears(real, hist.data?.freq === "M" ? 10 : 25);
      const id = hist.data?.seriesIds[selected.code];
      return {
        mode: "real" as const,
        data: pts.map(([p, v]) => ({ p, v })),
        caption: `${ind.label} · ${hist.data?.provider}${id ? ` ${id}` : ""} · ${hist.data?.freq === "M" ? "monthly avg" : "annual"} ${pts[0][0]}–${pts[pts.length - 1][0]}`,
      };
    }
    if (hist.status === "loading") return { mode: "loading" as const, data: [], caption: `${ind.label} · loading history…` };
    const why = hist.status === "none" || hist.data?.origin === "none" ? "no free historical source" : `no ${hist.data?.provider ?? "sourced"} history for ${selected.name}`;
    return {
      mode: "sample" as const,
      data: series(selected, ind, 24, live).map((v, i) => ({ p: `T-${24 - i}`, v })),
      caption: `${ind.label} · illustrative trend · SAMPLE DATA (${why})`,
    };
  }, [selected, ind, live, hist]);
  // Prefer a live daily index move for the header change when we have one.
  const liveChange = selected ? liveGet(live, selected.code, "change") : undefined;
  const change = liveChange?.value ?? selected?.data.change ?? 0;
  const up = change >= 0;

  return (
    <div ref={sectionRef} id="globe" className="scroll-mt-24">
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
          {dropdownInds.map((i) => {
            const locked = past && !TM_FIELDS[i.key];
            return (
              <button key={i.key} onClick={() => !locked && setIndKey(i.key)} disabled={locked}
                title={locked ? "Time Machine covers growth, inflation and policy rates" : undefined}
                className={`rounded-full border px-3 py-1.5 font-display text-xs font-semibold transition-colors ${indKey === i.key ? "border-emerald/50 bg-emerald/15 text-emerald" : "border-white/10 text-muted hover:text-ink"} ${locked ? "cursor-not-allowed opacity-30 hover:text-muted" : ""}`}>
                {i.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass relative h-[30rem] overflow-hidden sm:h-[34rem]">
          <div className="pointer-events-none absolute left-4 top-4 z-10">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted2">Showing · {ind.label} ({ind.unit}){month ? ` · as of ${month.month}` : ""}</p>
            {month && <p className="mt-0.5 font-mono text-[9px] text-gold/90">◷ Time Machine · grey hubs had no sourced figure that month</p>}
            {!month && live.sources.length > 0 && (
              <p className="mt-0.5 font-mono text-[9px] text-emerald/80">● live · {live.sources.join(" · ")}</p>
            )}
          </div>
          <Globe values={values} onSelect={onSelect} selectedCode={selected?.code} focusCode={focus} />
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
                  <button onClick={() => { setSelected(null); setFocus(null); }} className="text-muted2 hover:text-ink" aria-label="Close"><X size={18} /></button>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-lg text-ink">{selected.data.market}</span>
                  <span className={`inline-flex items-center gap-1 font-mono text-sm ${up ? "text-pos" : "text-neg"}`}>
                    {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{up ? "+" : ""}{change}%
                  </span>
                </div>

                <div className={`mt-3 h-24 ${trend.mode === "sample" ? "opacity-60" : ""}`}>
                  {trend.mode === "loading" ? (
                    <div className="h-full w-full animate-pulse rounded-lg bg-white/[0.03]" aria-hidden />
                  ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trend.data}>
                      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={colorForIndicator(ind, currentValue(selected, ind, live))} stopOpacity={0.5} />
                        <stop offset="100%" stopColor={colorForIndicator(ind, currentValue(selected, ind, live))} stopOpacity={0} />
                      </linearGradient></defs>
                      <YAxis hide domain={["dataMin", "dataMax"]} />
                      <XAxis dataKey="p" hide />
                      <Tooltip contentStyle={{ background: "#08111F", border: "1px solid rgba(133,152,180,0.2)", borderRadius: 8, fontSize: 11 }}
                        labelStyle={trend.mode === "real" ? { color: "#8598B4" } : { display: "none" }}
                        formatter={(v: number) => [fmt(v, ind), trend.mode === "sample" ? `${ind.label} (sample)` : ind.label]} />
                      <Area type="monotone" dataKey="v" stroke={colorForIndicator(ind, currentValue(selected, ind, live))} strokeWidth={1.5} fill="url(#g)"
                        strokeDasharray={trend.mode === "sample" ? "4 3" : undefined} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                  )}
                </div>
                <p className={`mt-1 font-mono text-[10px] ${trend.mode === "sample" ? "text-gold/90" : "text-muted2"}`}>
                  {trend.mode === "real" && <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald align-middle" />}
                  {trend.caption}{trend.mode === "real" && hist.data?.origin === "bundled" ? " · saved copy" : ""}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {PANEL_KEYS.map((k) => {
                    const mi = INDICATORS.find((x) => x.key === k)!;
                    const v = currentValue(selected, mi, live);
                    const isLive = usesLive(selected, mi, live);
                    const isSample = provenanceFor(selected, mi, live).source === "Sample data";
                    return (
                      <div key={k} className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                        <div className="flex items-center gap-1">
                          <span className="font-display text-base" style={{ color: colorForIndicator(mi, v) }}>{fmt(v, mi)}</span>
                          {isLive && <span className="h-1.5 w-1.5 rounded-full bg-emerald" title="Live data" />}
                          {isSample && <span className="ml-auto font-mono text-[8px] uppercase tracking-wide text-gold/80" title="Sample data — not a real figure">sample</span>}
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
                    const keyInds = ["gdpGrowth", "cpi", "policyRate", "unemployment", "currencyChange"].map((k) => INDICATORS.find((x) => x.key === k)!);
                    const liveInds = keyInds.filter((mi) => usesLive(selected, mi, live));
                    if (liveInds.length > 0) {
                      const asOf = liveInds.map((mi) => provenanceFor(selected, mi, live).asOf).filter(Boolean).sort().pop();
                      return `● Live where available (World Bank / FRED / ECB / Finnhub${asOf ? `, latest ${asOf}` : ""}). Growth/inflation/rate use our October 2026 report when it's fresher; tiles marked “sample” are placeholders.`;
                    }
                    return selected.sourced
                      ? "Growth/inflation/rate grounded in our October 2026 report; tiles marked “sample” are placeholders."
                      : "Tiles marked “sample” are placeholders for the visualisation.";
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

      {timeline.length > 0 && (
        <TimeMachine timeline={timeline} tm={tm} setTm={(i) => { setPlaying(false); setTm(i); }} playing={playing} onPlay={play} month={month} />
      )}
    </div>
  );
}

/** A large glass scrubber across every published issue. Drag (or press play) to replay the
 *  year on the globe; the card below swaps to that month's headline numbers. */
function TimeMachine({ timeline, tm, setTm, playing, onPlay, month }:
  { timeline: TimelineMonth[]; tm: number; setTm: (i: number) => void; playing: boolean; onPlay: () => void; month: TimelineMonth | null }) {
  const stops = [...timeline.map((m) => m.label), "Now"];
  const pct = (tm / (stops.length - 1)) * 100;
  return (
    <div className="glass-strong relative mt-6 overflow-hidden p-5 sm:p-7">
      <div className="hairline-glow pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="kicker flex items-center gap-2"><History size={13} /> Time Machine</p>
          <h3 className="h-display mt-2 text-xl sm:text-2xl">{month ? month.month : "Today — live & latest"}</h3>
        </div>
        <button onClick={onPlay} className="btn-ghost !py-2 text-sm" aria-label={playing ? "Pause replay" : "Replay the year"}>
          {playing ? <Pause size={15} /> : <Play size={15} />} {playing ? "Pause" : "Replay Jun → Now"}
        </button>
      </div>

      <div className="relative mt-7 px-1">
        <div className="relative h-2 rounded-full bg-white/[0.06]">
          <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-electric via-cyan to-emerald" animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
        </div>
        <input type="range" min={0} max={stops.length - 1} step={1} value={tm} onChange={(e) => setTm(Number(e.target.value))}
          aria-label="Choose a month" aria-valuetext={stops[tm]}
          className="tm-range absolute inset-x-0 -top-2 h-6 w-full cursor-pointer appearance-none bg-transparent" />
        <div className="mt-3 flex justify-between">
          {stops.map((s, i) => (
            <button key={s} onClick={() => setTm(i)} className={`font-mono text-[11px] transition-colors ${i === tm ? "text-emerald" : "text-muted2 hover:text-ink"}`}>{s}</button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={month?.slug ?? "now"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="mt-7">
          {month ? (
            <div className="grid gap-5 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div>
                <p className="font-display text-lg font-semibold leading-snug text-ink">{month.title}</p>
                <Link href={`/reports/${month.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm text-emerald hover:underline">Read the {month.month} issue <ArrowRight size={14} /></Link>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {month.indicators.slice(0, 4).map((i) => (
                  <div key={i.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur">
                    <p className="font-display text-lg font-semibold text-ink">{i.value}</p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-muted2">{i.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">Drag the slider back through the year to watch rate hikes, oil shocks and inflation spread across the globe — every past frame uses the figures we published that month.</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
