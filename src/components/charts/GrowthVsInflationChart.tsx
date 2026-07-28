"use client";
import { memo } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BarPoint } from "@/lib/types";
const axis = { fill: "#586A86", fontSize: 11, fontFamily: "var(--font-mono)" };
const colorFor = (n: string) => (/infl|cpi|price/i.test(n) ? "#FBBF24" : "#3B82F6");
function GrowthVsInflationChart({ data }: { data: BarPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 18, right: 8, left: -22, bottom: 0 }}>
        <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
        <YAxis tick={axis} axisLine={false} tickLine={false} unit="%" />
        <Tooltip cursor={{ fill: "rgba(133,152,180,0.06)" }} contentStyle={{ background: "#08111F", border: "1px solid rgba(133,152,180,0.2)", borderRadius: 10, fontSize: 12 }} labelStyle={{ color: "#EAF2FF" }} formatter={(v: number, _n, p: any) => [`${v}%`, p?.payload?.note ?? ""]} />
        <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={54}>{data.map((d, i) => <Cell key={i} fill={colorFor(d.name)} />)}</Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
export default memo(GrowthVsInflationChart);
