import Link from "next/link";
import { ArrowUpRight, FileText, CandlestickChart, LineChart, LayoutDashboard, GraduationCap } from "lucide-react";
import Sparkline from "@/components/Sparkline";
import TiltCard from "@/components/TiltCard";
import { getLatestReport } from "@/lib/reports";
import { GLOSSARY_COUNT } from "@/lib/glossary";
import { INDICATORS, ALL_COUNTRIES, series } from "@/lib/indicators";

export default function BentoNav() {
  const latest = getLatestReport();
  const us = ALL_COUNTRIES.find((c) => c.code === "US")!;
  const inr = ALL_COUNTRIES.find((c) => c.code === "IN")!;
  const spark = series(us, INDICATORS[0], 24);
  const spark2 = series(inr, INDICATORS[2], 24);
  const card = "glass group relative block h-full overflow-hidden p-6";

  return (
    <div className="grid auto-rows-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <TiltCard className="sm:col-span-2 lg:row-span-2">
        <Link href="/reports" className={card + " hover:border-emerald/25"}>
          <div className="flex items-center justify-between">
            <span className="chip border-emerald/30 text-emerald"><FileText size={12} /> Reports</span>
            <ArrowUpRight size={18} className="text-muted2 transition-colors group-hover:text-emerald" />
          </div>
          <h3 className="h-display mt-6 text-2xl">{latest?.title ?? "Monthly reports"}</h3>
          <p className="mt-2 font-mono text-sm text-emerald">{latest?.month}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted line-clamp-3">{latest?.standfirst}</p>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted2">
            <span>{latest?.pdf ? `${latest?.pageCount ?? "—"} pages` : "Web edition"}</span><span>·</span><span>{latest?.sources.length ?? 0} sources</span>
          </div>
          <div className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-emerald/10 blur-2xl transition-opacity group-hover:opacity-80" />
        </Link>
      </TiltCard>

      <TiltCard>
        <Link href="/data" className={card + " hover:border-electric/25"}>
          <div className="flex items-center justify-between">
            <span className="chip"><LineChart size={12} /> Indicator Explorer</span>
            <ArrowUpRight size={16} className="text-muted2 transition-colors group-hover:text-electric" />
          </div>
          <p className="mt-4 text-sm text-muted">Build your own view — {INDICATORS.length} indicators, any economies.</p>
          <div className="mt-4"><Sparkline data={spark} color="#3B82F6" w={200} h={40} /></div>
        </Link>
      </TiltCard>

      <TiltCard>
        <Link href="/#markets" className={card + " hover:border-violet/25"}>
          <div className="flex items-center justify-between">
            <span className="chip"><CandlestickChart size={12} /> Market Pulse</span>
            <ArrowUpRight size={16} className="text-muted2 transition-colors group-hover:text-violet" />
          </div>
          <p className="mt-4 text-sm text-muted">Today&apos;s major US stocks and the top riser, live.</p>
          <div className="mt-4 grid grid-cols-6 gap-1" aria-hidden>
            {[0.9, -0.4, 1.6, 0.3, -1.2, 2.1, -0.2, 0.7, 1.1, -0.8, 0.4, -1.6].map((v, i) => (
              <span key={i} className="h-4 rounded-sm" style={{ background: v >= 0 ? "#00D084" : "#F65B5B", opacity: 0.25 + Math.min(Math.abs(v) / 2.2, 1) * 0.6 }} />
            ))}
          </div>
        </Link>
      </TiltCard>

      <TiltCard>
        <Link href="/dashboard" className={card + " hover:border-emerald/25"}>
          <div className="flex items-center justify-between">
            <span className="chip"><LayoutDashboard size={12} /> Dashboard</span>
            <ArrowUpRight size={16} className="text-muted2 transition-colors group-hover:text-emerald" />
          </div>
          <p className="mt-4 text-sm text-muted">The four macro gauges at a glance.</p>
          <div className="mt-4 flex items-end gap-1.5" aria-hidden>
            {[40, 65, 30, 80, 55, 70].map((h, i) => (
              <span key={i} className="w-full rounded-sm" style={{ height: h * 0.5, background: i % 2 ? "#00D084" : "#3B82F6", opacity: 0.8 }} />
            ))}
          </div>
        </Link>
      </TiltCard>

      <TiltCard>
        <Link href="/learn" className={card + " hover:border-cyan/25"}>
          <div className="flex items-center justify-between">
            <span className="chip"><GraduationCap size={12} /> Learn</span>
            <ArrowUpRight size={16} className="text-muted2 transition-colors group-hover:text-cyan" />
          </div>
          <p className="mt-4 font-display text-3xl font-semibold text-ink">{GLOSSARY_COUNT}</p>
          <p className="mt-1 text-sm text-muted">glossary terms, plainly explained.</p>
          <div className="mt-3"><Sparkline data={spark2} color="#22D3EE" w={200} h={30} fill={false} /></div>
        </Link>
      </TiltCard>
    </div>
  );
}
