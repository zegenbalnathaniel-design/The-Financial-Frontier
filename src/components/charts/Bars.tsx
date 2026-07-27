"use client";
import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BarPoint } from "@/lib/types";

const axis = { fill: "#586A86", fontSize: 11, fontFamily: "var(--font-mono)" };
const box = { background: "#08111F", border: "1px solid rgba(133,152,180,0.2)", borderRadius: 10, fontSize: 12 };

const PALETTE = ["#3B82F6", "#00D084", "#7C3AED", "#22D3EE"];

export function ForecastBars({ data }: { data: BarPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 18, right: 8, left: -22, bottom: 0 }}>
        <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} unit="%" />
        <Tooltip cursor={{ fill: "rgba(133,152,180,0.06)" }} contentStyle={box} labelStyle={{ color: "#EAF2FF" }} formatter={(v: number) => [`${v}%`, "2026"]} />
        <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={60}>
          {data.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function GrowthInflationBars({ data }: { data: BarPoint[] }) {
  const color = (n: string) => (/infl|cpi|price/i.test(n) ? "#FBBF24" : "#3B82F6");
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 18, right: 8, left: -22, bottom: 0 }}>
        <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} unit="%" />
        <Tooltip cursor={{ fill: "rgba(133,152,180,0.06)" }} contentStyle={box} labelStyle={{ color: "#EAF2FF" }} formatter={(v: number, _n, p: any) => [`${v}%`, p?.payload?.note ?? ""]} />
        <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={52}>
          {data.map((d, i) => <Cell key={i} fill={color(d.name)} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ActivityBars({ data, baseline = 50 }: { data: BarPoint[]; baseline?: number }) {
  const min = Math.min(baseline, ...data.map((d) => d.value)) - 0.6;
  const max = Math.max(baseline, ...data.map((d) => d.value)) + 0.6;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data} margin={{ top: 6, right: 16, left: 24, bottom: 0 }}>
        <XAxis type="number" domain={[min, max]} tick={axis} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={axis} axisLine={false} tickLine={false} width={86} />
        <Tooltip cursor={{ fill: "rgba(133,152,180,0.06)" }} contentStyle={box} labelStyle={{ color: "#EAF2FF" }} formatter={(v: number) => [v, v >= baseline ? "Expanding" : "Contracting"]} />
        <ReferenceLine x={baseline} stroke="#FBBF24" strokeDasharray="3 3" label={{ value: String(baseline), position: "top", fill: "#8598B4", fontSize: 10 }} />
        <Bar dataKey="value" radius={[0, 5, 5, 0]} maxBarSize={22}>
          {data.map((d, i) => <Cell key={i} fill={d.value >= baseline ? "#00D084" : "#F65B5B"} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
