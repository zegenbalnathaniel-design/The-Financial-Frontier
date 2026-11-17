"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CandlestickChart, Command, CornerDownLeft, FileText, Globe2, LayoutGrid, LineChart, Search } from "lucide-react";
import type { SearchItem, SearchKind } from "@/lib/searchIndex";
import { focusCountry } from "@/lib/focus";
import { useMarkets } from "@/components/live/LiveDataProvider";

const ICON: Record<SearchKind, typeof Search> = {
  Page: LayoutGrid, Report: FileText, Country: Globe2, Indicator: LineChart, Stock: CandlestickChart, Term: BookOpen,
};
export const OPEN_PALETTE_EVENT = "ff:open-palette";

/** Fuzzy-ish rank: prefix > word-start > substring > subsequence. */
function rank(item: SearchItem, q: string): number {
  const l = item.label.toLowerCase(), k = `${item.sub ?? ""} ${item.keywords ?? ""}`.toLowerCase();
  if (l === q) return 100;
  if (l.startsWith(q)) return 80;
  if (l.split(/[\s—-]+/).some((w) => w.startsWith(q))) return 60;
  if (l.includes(q)) return 45;
  if (k.split(/\s+/).some((w) => w.startsWith(q))) return 30;
  if (k.includes(q)) return 18;
  let i = 0; for (const ch of l) if (ch === q[i]) i++;
  return i === q.length ? 8 : 0;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const { board } = useMarkets();
  const quotes = useMemo(() => new Map(board.stocks.map((s) => [s.name, s])), [board.stocks]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "/" && !open && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) { e.preventDefault(); setOpen(true); }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener(OPEN_PALETTE_EVENT, onOpen); };
  }, [open]);
  useEffect(() => {
    if (!open) { setQ(""); setActive(0); return; } // reset on close, so typing on open is never wiped
    if (index.length === 0) fetch("/api/search").then((r) => r.json()).then(setIndex).catch(() => {});
  }, [open, index.length]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return index.filter((i) => i.kind === "Page" || i.kind === "Report").slice(0, 12);
    return index.map((i) => ({ i, r: rank(i, s) })).filter((x) => x.r > 0).sort((a, b) => b.r - a.r).slice(0, 40).map((x) => x.i);
  }, [q, index]);
  useEffect(() => setActive(0), [q]);
  useEffect(() => { list.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" }); }, [active]);

  const go = (item: SearchItem) => {
    setOpen(false);
    if (item.kind === "Country" && item.code) return focusCountry(item.code, router);
    if (item.href.startsWith("/#") && window.location.pathname === "/") {
      document.getElementById(item.href.slice(2))?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && results[active]) { e.preventDefault(); go(results[active]); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[110] flex items-start justify-center px-3 pt-[10vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          <div className="absolute inset-0 bg-midnight/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div role="dialog" aria-modal="true" aria-label="Search The Financial Frontier"
            initial={{ y: -12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -8, scale: 0.98 }} transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="glass-liquid relative w-full max-w-2xl overflow-hidden">
            <div className="hairline-glow pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden />
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-5">
              <Search size={18} className="text-emerald" />
              <input ref={input} autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKeyDown}
                placeholder="Search countries, stocks, reports, indicators, terms…"
                role="combobox" aria-expanded="true" aria-controls="ff-palette-list" aria-activedescendant={`ff-opt-${active}`}
                className="h-16 w-full bg-transparent font-display text-lg text-ink placeholder:text-muted2 focus:outline-none" />
              <kbd className="hidden rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-muted2 sm:block">esc</kbd>
            </div>
            <ul ref={list} id="ff-palette-list" role="listbox" className="max-h-[56vh] overflow-y-auto p-2">
              {index.length === 0 && <li className="px-4 py-10 text-center text-sm text-muted">Loading the index…</li>}
              {index.length > 0 && results.length === 0 && <li className="px-4 py-10 text-center text-sm text-muted">No matches for &ldquo;{q}&rdquo;</li>}
              {results.map((r, i) => {
                const Icon = ICON[r.kind];
                const quote = r.kind === "Stock" ? quotes.get(r.label) : undefined;
                return (
                  <li key={`${r.kind}-${r.label}-${i}`} id={`ff-opt-${i}`} data-idx={i} role="option" aria-selected={i === active}
                    onMouseMove={() => setActive(i)} onClick={() => go(r)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${i === active ? "bg-white/[0.07]" : ""}`}>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${i === active ? "border-emerald/40 bg-emerald/10 text-emerald" : "border-white/10 bg-white/[0.03] text-muted"}`}><Icon size={16} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-sm font-semibold text-ink">{r.label}</span>
                      {r.sub && <span className="block truncate text-xs text-muted2">{r.sub}</span>}
                    </span>
                    {quote && <span className={`font-mono text-xs ${quote.changePct >= 0 ? "text-pos" : "text-neg"}`}>{quote.changePct >= 0 ? "+" : ""}{quote.changePct.toFixed(2)}%</span>}
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted2">{r.kind}</span>
                    {i === active && <CornerDownLeft size={14} className="text-muted2" />}
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-white/[0.08] px-5 py-2.5 font-mono text-[10px] text-muted2">
              <span>↑↓ navigate · ↵ open · esc close</span>
              <span className="flex items-center gap-1"><Command size={11} />K anywhere</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
