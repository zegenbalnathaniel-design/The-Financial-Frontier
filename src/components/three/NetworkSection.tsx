"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { COUNTRIES, DATA_MODES, REGIONS, type DataMode, type Region } from "@/lib/countries";

const NetworkGraph = dynamic(() => import("./NetworkGraph"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-electric/30 border-t-electric" />
    </div>
  ),
});

const GROUP_FILTERS = ["All", "G7", "G20", "BRICS", "EU", "OECD", "ASEAN", "Emerging", "Developed"];

export default function NetworkSection() {
  const [mode, setMode] = useState<DataMode>("growth");
  const [region, setRegion] = useState<Region | "Global">("Global");
  const [group, setGroup] = useState("All");

  const countries = useMemo(
    () =>
      COUNTRIES.filter(
        (c) =>
          (region === "Global" || c.region === region) &&
          (group === "All" || c.groups.includes(group)),
      ),
    [region, group],
  );

  return (
    <div>
      <div className="glass mb-4 flex flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 w-16 font-mono text-[10px] uppercase tracking-widest text-muted2">Data</span>
          {DATA_MODES.map((m) => (
            <button key={m.key} onClick={() => setMode(m.key)}
              className={`rounded-full px-3 py-1 font-display text-xs font-semibold transition-colors ${mode === m.key ? "bg-emerald/15 text-emerald" : "text-muted hover:text-ink"}`}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 w-16 font-mono text-[10px] uppercase tracking-widest text-muted2">Region</span>
          {(["Global", ...REGIONS] as const).map((r) => (
            <button key={r} onClick={() => setRegion(r)}
              className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${region === r ? "bg-electric/15 text-electric" : "text-muted hover:text-ink"}`}>
              {r}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 w-16 font-mono text-[10px] uppercase tracking-widest text-muted2">Group</span>
          {GROUP_FILTERS.map((g) => (
            <button key={g} onClick={() => setGroup(g)}
              className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${group === g ? "bg-violet/20 text-violet" : "text-muted hover:text-ink"}`}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="glass relative h-[32rem] overflow-hidden sm:h-[38rem]">
        {countries.length > 0 ? (
          <NetworkGraph countries={countries} mode={mode} />
        ) : (
          <div className="grid h-full place-items-center text-muted">No economies match that filter.</div>
        )}
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center">
          <p className="font-mono text-[10px] text-muted2">
            {countries.length} economies · node size ≈ growth · edges ≈ shared blocs · illustrative sample data
          </p>
        </div>
      </div>
    </div>
  );
}
