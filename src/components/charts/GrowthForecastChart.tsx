"use client";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BarPoint } from "@/lib/types";
const COLORS = ["#3B82F6", "#00D084", "#7C3AED", "#22D3EE"];
const axis = { fill: "#586A86", fontSize: 11, fontFamily: "var(--font-mono)" };
export default function GrowthForecastChart({ data }: { data: BarPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 18, right: 8, left: -22, bottom: 0 }}>
        <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} unit="%" />
        <Tooltip cursor={{ fill: "rgba(133,152,180,0.06)" }} contentStyle={{ background: "#08111F", border: "1px solid rgba(133,152,180,0.2)", borderRadius: 10, fontSize: 12 }} labelStyle={{ color: "#EAF2FF" }} formatter={(v: number) => [`${v}%`, "2026"]} />
        <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={64}>{data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
