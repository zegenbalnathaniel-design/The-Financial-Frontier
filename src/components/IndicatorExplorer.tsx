"use client";

import { useMemo, useState } from "react";
import {
  Line, LineChart, Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { LineChart as LineIcon, BarChart3, Table2, ListOrdered, Info, Download } from "lucide-react";
import {
  INDICATORS, FAMILIES, TIMEFRAMES, ALL_COUNTRIES, currentValue, series, fmt, usesLive, provenanceFor,
} from "@/lib/indicators";
import { periodNum, type HistoryPoint } from "@/lib/history";
import { useLive } from "@/components/live/LiveDataProvider";
import { useHistory, realSeries } from "@/components/live/useHistory";

const SERIES_COLORS = ["#00D084", "#3B82F6", "#22D3EE", "#7C3AED", "#FBBF24", "#F65B5B", "#8598B4", "#34D399"];
const axis = { fill: "#586A86", fontSize: 11, fontFamily: "var(--font-mono)" };
const box = { background: "#08111F", border: "1px solid rgba(133,152,180,0.2)", borderRadius: 10, fontSize: 12 };

type View = "line" | "bar" | "table" | "rankings";

export default function IndicatorExplorer() {
  const live = useLive();
  const [indKey, setIndKey] = useState("gdpGrowth");
  const [family, setFamily] = useState<string>("All");
  const [view, setView] = useState<View>("line");
  const [tf, setTf] = useState(TIMEFRAMES[2]);
  const [selected, setSelected] = useState<string[]>(["US", "CN", "DE", "IN", "JP", "GB"]);

  const ind = useMemo(() => INDICATORS.find((i) => i.key === indKey)!, [indKey]);
  const visibleIndicators = useMemo(
    () => (family === "All" ? INDICATORS : INDICATORS.filter((i) => i.family === family)),
    [family],
  );

  const chosen = useMemo(() => ALL_COUNTRIES.filter((c) => selected.includes(c.code)), [selected]);

  // ── Trend lines: REAL history where a source covers the economy; otherwise (and only
  // when NO shown economy has real history) a labelled sample chart. Never mixed.
  const hist = useHistory(ind.key);
  const trend = useMemo(() => {
    const cols = chosen.map((c) => ({ code: c.code, pts: realSeries(hist, c.code) }));
    const real = cols.filter((c): c is { code: string; pts: HistoryPoint[] } => !!c.pts);
    const missing = cols.filter((c) => !c.pts).map((c) => c.code);
    if (hist.status === "loading") return { mode: "loading" as const, rows: [], plotted: [] as string[], missing, first: "", last: "" };
    if (real.length > 0) {
      const end = Math.max(...real.map((c) => periodNum(c.pts[c.pts.length - 1][0])));
      const cutoff = end - tf.years;
      const byPeriod = new Map<string, Record<string, number | string>>();
      for (const c of real) {
        for (const [p, v] of c.pts) {
          if (periodNum(p) <= cutoff + 1e-9) continue;
          const row = byPeriod.get(p) ?? { t: p };
          row[c.code] = v;
          byPeriod.set(p, row);
        }
      }
      const rows = [...byPeriod.values()].sort((a, b) => periodNum(String(a.t)) - periodNum(String(b.t)));
      const plotted = real.map((c) => c.code).filter((code) => rows.some((r) => r[code] !== undefined));
      return {
        mode: "real" as const, rows, plotted,
        missing: [...missing, ...real.map((c) => c.code).filter((c) => !plotted.includes(c))],
        first: String(rows[0]?.t ?? ""), last: String(rows[rows.length - 1]?.t ?? ""),
      };
    }
    // Sample fallback — deterministic placeholders on an unlabelled T-n axis.
    const scols = chosen.map((c) => ({ code: c.code, s: series(c, ind, tf.points, live) }));
    const rows = Array.from({ length: tf.points }, (_, i) => {
      const row: Record<string, number | string> = { t: `T-${tf.points - i}` };
      scols.forEach((c) => (row[c.code] = c.s[i]));
      return row;
    });
    return { mode: "sample" as const, rows, plotted: chosen.map((c) => c.code), missing: [] as string[], first: "", last: "" };
  }, [chosen, ind, tf, live, hist]);
  const sampleReason = hist.status === "error"
    ? "History service unavailable right now."
    : hist.data?.note ?? "No free historical source for this indicator.";

  // current-value data for bar / table / rankings
  const currentData = useMemo(
    () => chosen.map((c) => {
      const prov = provenanceFor(c, ind, live);
      return { code: c.code, name: c.name, value: currentValue(c, ind, live), source: prov.source, asOf: prov.asOf, sample: prov.source === "Sample data" };
    }),
    [chosen, ind, live],
  );
  const rankingData = useMemo(
    () => ALL_COUNTRIES.map((c) => ({ code: c.code, name: c.name, value: currentValue(c, ind, live), sample: provenanceFor(c, ind, live).source === "Sample data" }))
      .sort((a, b) => (ind.higherBetter === false ? a.value - b.value : b.value - a.value)),
    [ind, live],
  );
  // How many of the shown economies have a real sourced value for this indicator.
  const liveCount = useMemo(
    () => chosen.filter((c) => usesLive(c, ind, live)).length,
    [chosen, ind, live],
  );

  const toggle = (code: string) =>
    setSelected((s) => (s.includes(code) ? s.filter((x) => x !== code) : [...s, code]));

  const barColor = (v: number) => {
    if (ind.higherBetter === undefined) return "#3B82F6";
    return (ind.higherBetter && v >= 0) || (!ind.higherBetter && v <= (ind.range[0] + ind.range[1]) / 2)
      ? "#00D084" : "#F65B5B";
  };

  function exportCsv() {
    let rows: string[][];
    if (view === "line" && trend.mode === "real") {
      // the plotted real history, one column per economy
      rows = [["Period", ...trend.plotted.map((c) => `${c} ${ind.label} (${ind.unit})`)]];
      trend.rows.forEach((r) => rows.push([String(r.t), ...trend.plotted.map((c) => (r[c] === undefined ? "" : String(r[c])))]));
      rows.push([`Source: ${hist.data?.provider ?? ""} (retrieved ${hist.data?.retrieved ?? ""})`]);
    } else {
      rows = [["Economy", "Code", `${ind.label} (${ind.unit})`, "Source", "As of"]];
      currentData.forEach((d) => rows.push([d.name, d.code, String(d.value), d.source, d.asOf]));
    }
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${ind.key}.csv`; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* ── Control rail ─────────────────────────── */}
      <aside className="glass h-fit space-y-6 p-5 lg:sticky lg:top-24">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted2">Indicator family</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["All", ...FAMILIES].map((f) => (
              <button key={f} onClick={() => setFamily(f)}
                className={`rounded-full px-2.5 py-1 font-mono text-[10px] transition-colors ${family === f ? "bg-emerald/15 text-emerald" : "text-muted2 hover:text-ink"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="ind" className="font-mono text-[10px] uppercase tracking-widest text-muted2">Indicator</label>
          <select id="ind" value={indKey} onChange={(e) => setIndKey(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-ink focus:border-emerald/50 focus:outline-none">
            {visibleIndicators.map((i) => <option key={i.key} value={i.key}>{i.label}</option>)}
          </select>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted2">Economies ({selected.length})</p>
          <div className="mt-2 flex max-h-56 flex-wrap gap-1.5 overflow-y-auto pr-1">
            {ALL_COUNTRIES.map((c) => (
              <button key={c.code} onClick={() => toggle(c.code)}
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] transition-colors ${selected.includes(c.code) ? "border-electric/50 bg-electric/15 text-electric" : "border-white/10 text-muted2 hover:text-ink"}`}>
                {c.code}
              </button>
            ))}
          </div>
        </div>

        <button onClick={exportCsv} className="btn-ghost w-full justify-center py-2.5 text-xs">
          <Download size={14} /> Export CSV
        </button>
      </aside>

      {/* ── Result panel ─────────────────────────── */}
      <div className="space-y-5">
        <div className="glass p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="kicker">{ind.family}</p>
              <h2 className="h-display mt-2 text-2xl">{ind.label}</h2>
              <p className="mt-1 font-mono text-xs text-muted">Unit: {ind.unit} · {chosen.length} economies</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {([["line", LineIcon], ["bar", BarChart3], ["table", Table2], ["rankings", ListOrdered]] as const).map(([v, Icon]) => (
                <button key={v} onClick={() => setView(v)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-xs font-semibold capitalize transition-colors ${view === v ? "bg-emerald/15 text-emerald" : "text-muted hover:text-ink"}`}>
                  <Icon size={13} /> {v}
                </button>
              ))}
            </div>
          </div>

          {view === "line" && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {TIMEFRAMES.map((t) => (
                <button key={t.label} onClick={() => setTf(t)}
                  className={`rounded-md px-2 py-1 font-mono text-[10px] ${tf.label === t.label ? "bg-white/10 text-ink" : "text-muted2 hover:text-ink"}`}>
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {/* ── Views ── */}
          <div className="mt-5 h-[24rem] w-full">
            {chosen.length === 0 ? (
              <div className="grid h-full place-items-center text-muted">Select one or more economies.</div>
            ) : view === "line" && trend.mode === "loading" ? (
              <div className="grid h-full place-items-center">
                <div className="flex flex-col items-center gap-3 text-muted">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald/30 border-t-emerald" />
                  <p className="font-mono text-xs">Loading {hist.data?.provider ?? "historical"} series…</p>
                </div>
              </div>
            ) : view === "line" ? (
              <div className="relative h-full">
                {trend.mode === "sample" && (
                  <div className="pointer-events-none absolute right-2 top-1 z-10 max-w-[16rem] rounded-lg border border-gold/40 bg-navy/85 px-3 py-2 text-right backdrop-blur">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-gold">Sample data</p>
                    <p className="mt-0.5 font-mono text-[10px] leading-snug text-muted">Illustrative placeholder lines — not real history. {sampleReason}</p>
                  </div>
                )}
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trend.rows} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(133,152,180,0.08)" vertical={false} />
                    <XAxis dataKey="t" tick={axis} axisLine={false} tickLine={false} minTickGap={28} />
                    <YAxis tick={axis} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                    <Tooltip contentStyle={box} labelStyle={{ color: "#EAF2FF" }}
                      formatter={(v: number, name: string) => [fmt(v, ind), trend.mode === "sample" ? `${name} (sample)` : name]} />
                    <Legend wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)" }}
                      formatter={(name: string) => (trend.mode === "sample" ? `${name} · sample` : name)} />
                    {chosen.filter((c) => trend.plotted.includes(c.code)).map((c) => (
                      <Line key={c.code} type="monotone" dataKey={c.code} connectNulls
                        stroke={SERIES_COLORS[chosen.indexOf(c) % SERIES_COLORS.length]} strokeWidth={1.8}
                        strokeDasharray={trend.mode === "sample" ? "5 4" : undefined} strokeOpacity={trend.mode === "sample" ? 0.7 : 1}
                        dot={trend.rows.length <= 12 ? { r: 2 } : false} isAnimationActive={false} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : view === "bar" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(133,152,180,0.08)" vertical={false} />
                  <XAxis dataKey="code" tick={axis} axisLine={false} tickLine={false} />
                  <YAxis tick={axis} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(133,152,180,0.06)" }} contentStyle={box} labelStyle={{ color: "#EAF2FF" }} formatter={(v: number) => [fmt(v, ind), ind.label]} />
                  <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={52}>
                    {currentData.map((d, i) => <Cell key={i} fill={barColor(d.value)} fillOpacity={d.sample ? 0.3 : 1} stroke={d.sample ? barColor(d.value) : undefined} strokeDasharray={d.sample ? "3 3" : undefined} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : view === "table" ? (
              <div className="h-full overflow-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-navy/80 backdrop-blur">
                    <tr className="text-left font-mono text-[10px] uppercase tracking-wide text-muted2">
                      <th className="px-3 py-2">Economy</th><th className="px-3 py-2">Region</th>
                      <th className="px-3 py-2 text-right">{ind.label}</th>
                      <th className="px-3 py-2 text-right">Source · as of</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((d) => {
                      const c = ALL_COUNTRIES.find((x) => x.code === d.code)!;
                      return (
                        <tr key={d.code} className="border-t border-white/[0.06]">
                          <td className="px-3 py-2.5 text-ink">{d.name}</td>
                          <td className="px-3 py-2.5 text-muted">{c.region}</td>
                          <td className={`px-3 py-2.5 text-right font-mono ${d.sample ? "text-muted" : "text-ink"}`}>{fmt(d.value, ind)}</td>
                          <td className="px-3 py-2.5 text-right font-mono text-[10px]">
                            {d.sample
                              ? <span className="rounded border border-gold/40 px-1.5 py-0.5 text-gold">Sample</span>
                              : <span className="text-muted2">{d.source}{d.asOf && !d.source.startsWith("Report") ? ` · ${d.asOf}` : ""}</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full space-y-1.5 overflow-auto pr-1">
                {rankingData.map((d, i) => {
                  const max = Math.max(...rankingData.map((r) => Math.abs(r.value)));
                  const w = Math.max(4, (Math.abs(d.value) / max) * 100);
                  const on = selected.includes(d.code);
                  return (
                    <div key={d.code} className="flex items-center gap-3">
                      <span className="w-6 text-right font-mono text-[10px] text-muted2">{i + 1}</span>
                      <span className={`w-10 font-mono text-[11px] ${on ? "text-electric" : "text-muted"}`}>{d.code}</span>
                      <div className="h-4 flex-1 overflow-hidden rounded bg-white/[0.03]">
                        <div className="h-full rounded" style={{ width: `${w}%`, background: barColor(d.value), opacity: d.sample ? 0.3 : 1 }} />
                      </div>
                      <span className={`w-20 text-right font-mono text-[11px] ${d.sample ? "text-muted2" : "text-ink"}`}>{fmt(d.value, ind)}</span>
                      <span className={`w-3 font-mono text-[10px] ${d.sample ? "text-gold" : ""}`} title={d.sample ? "Sample data" : undefined}>{d.sample ? "s" : ""}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {chosen.length > 0 && (
            <div className="mt-3 space-y-1 font-mono text-[10px] leading-relaxed">
              {view === "line" && trend.mode === "real" && hist.data && (
                <p className="text-muted2">
                  Source: {hist.data.provider === "World Bank"
                    ? `World Bank WDI · ${Object.values(hist.data.seriesIds)[0] ?? ""} · annual`
                    : `FRED · monthly averages · ${Array.from(new Set(trend.plotted.map((c) => hist.data!.seriesIds[c]))).join(", ")}`}
                  {" "}· {trend.first}–{trend.last} · retrieved {hist.data.retrieved}{hist.data.origin === "bundled" ? " (saved copy — upstream slow)" : ""}
                </p>
              )}
              {view === "line" && trend.mode === "real" && trend.missing.length > 0 && (
                <p className="text-gold/90">Not plotted — no sourced history in this window for {trend.missing.join(", ")} (we don&apos;t mix sample lines with real ones).</p>
              )}
              {view !== "line" && currentData.some((d) => d.sample) && (
                <p className="text-gold/90">
                  {view === "bar" ? "Faded bars" : view === "rankings" ? "Values marked “s”" : "Rows marked Sample"} = sample data (no sourced value for that economy).
                </p>
              )}
            </div>
          )}
        </div>

        <div className="glass flex items-start gap-3 p-5">
          <Info size={16} className="mt-0.5 shrink-0 text-emerald" />
          <div>
            <p className="text-sm text-body">{ind.about}</p>
            <p className="mt-2 font-mono text-[10px] text-muted2">
              {trend.mode === "real"
                ? `● Trend lines: real ${hist.data?.provider} history for ${trend.plotted.length}/${chosen.length} shown economies. `
                : trend.mode === "sample"
                  ? `Trend lines are SAMPLE data (deterministic placeholders, not real history): ${sampleReason} `
                  : ""}
              {(() => {
                const sample = currentData.filter((d) => d.sample).length;
                const curated = chosen.length - liveCount - sample;
                const parts = [
                  liveCount > 0 && `${liveCount} sourced live (${live.sources.join(", ")})`,
                  curated > 0 && `${curated} from our October 2026 report`,
                  sample > 0 && `${sample} labelled sample placeholders`,
                ].filter(Boolean);
                return `Latest values (bar / table / rankings): ${parts.join("; ")}.${sample > 0 && liveCount === 0 && curated === 0 ? " No free live source covers this indicator — see About → data honesty." : ""}`;
              })()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
