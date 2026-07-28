"use client";

import { useMemo, useState } from "react";
import {
  Line, LineChart, Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { LineChart as LineIcon, BarChart3, Table2, ListOrdered, Info, Download } from "lucide-react";
import {
  INDICATORS, FAMILIES, TIMEFRAMES, ALL_COUNTRIES, currentValue, series, fmt, type IndicatorMeta,
} from "@/lib/indicators";
import { useLive } from "@/components/live/LiveDataProvider";
import { liveGet } from "@/lib/live/types";

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

  // line data: [{ t, US: v, DE: v, ... }]
  const lineData = useMemo(() => {
    const cols = chosen.map((c) => ({ code: c.code, s: series(c, ind, tf.points, live) }));
    return Array.from({ length: tf.points }, (_, i) => {
      const row: Record<string, number | string> = { t: `T-${tf.points - i}` };
      cols.forEach((c) => (row[c.code] = c.s[i]));
      return row;
    });
  }, [chosen, ind, tf, live]);

  // current-value data for bar / table / rankings
  const currentData = useMemo(
    () => chosen.map((c) => ({ code: c.code, name: c.name, value: currentValue(c, ind, live) })),
    [chosen, ind, live],
  );
  const rankingData = useMemo(
    () => ALL_COUNTRIES.map((c) => ({ code: c.code, name: c.name, value: currentValue(c, ind, live) }))
      .sort((a, b) => (ind.higherBetter === false ? a.value - b.value : b.value - a.value)),
    [ind, live],
  );
  // How many of the shown economies have a real sourced value for this indicator.
  const liveCount = useMemo(
    () => chosen.filter((c) => liveGet(live, c.code, ind.key)).length,
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
    const rows = [["Economy", "Code", `${ind.label} (${ind.unit})`]];
    currentData.forEach((d) => rows.push([d.name, d.code, String(d.value)]));
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
            ) : view === "line" ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(133,152,180,0.08)" vertical={false} />
                  <XAxis dataKey="t" tick={axis} axisLine={false} tickLine={false} minTickGap={28} />
                  <YAxis tick={axis} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={box} labelStyle={{ color: "#EAF2FF" }} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                  {chosen.map((c, i) => (
                    <Line key={c.code} type="monotone" dataKey={c.code} stroke={SERIES_COLORS[i % SERIES_COLORS.length]} strokeWidth={1.8} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : view === "bar" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(133,152,180,0.08)" vertical={false} />
                  <XAxis dataKey="code" tick={axis} axisLine={false} tickLine={false} />
                  <YAxis tick={axis} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(133,152,180,0.06)" }} contentStyle={box} labelStyle={{ color: "#EAF2FF" }} formatter={(v: number) => [fmt(v, ind), ind.label]} />
                  <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={52}>
                    {currentData.map((d, i) => <Cell key={i} fill={barColor(d.value)} />)}
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
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((d) => {
                      const c = ALL_COUNTRIES.find((x) => x.code === d.code)!;
                      return (
                        <tr key={d.code} className="border-t border-white/[0.06]">
                          <td className="px-3 py-2.5 text-ink">{d.name}</td>
                          <td className="px-3 py-2.5 text-muted">{c.region}</td>
                          <td className="px-3 py-2.5 text-right font-mono text-ink">{fmt(d.value, ind)}</td>
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
                        <div className="h-full rounded" style={{ width: `${w}%`, background: barColor(d.value) }} />
                      </div>
                      <span className="w-20 text-right font-mono text-[11px] text-ink">{fmt(d.value, ind)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="glass flex items-start gap-3 p-5">
          <Info size={16} className="mt-0.5 shrink-0 text-emerald" />
          <div>
            <p className="text-sm text-body">{ind.about}</p>
            <p className="mt-2 font-mono text-[10px] text-muted2">
              {liveCount > 0
                ? `● Live: ${liveCount}/${chosen.length} shown economies sourced for this indicator (${live.sources.join(", ")}); the rest are deterministic placeholders. Time-series before the latest point are illustrative.`
                : "Illustrative sample data (deterministic). No free live source covers this indicator across these economies; growth, inflation, per-capita, unemployment, trade and fiscal series update live where available. See About → data honesty."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
