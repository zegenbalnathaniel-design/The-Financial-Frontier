"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowDownRight, ArrowUpRight, Crown, Radio, WifiOff } from "lucide-react";
import { useMarkets } from "@/components/live/LiveDataProvider";
import type { StockQuote } from "@/lib/live/markets";

// ── Squarified treemap (Bruls et al.) — tiles sized by market cap, no extra deps ──
interface Rect { x: number; y: number; w: number; h: number }
type Tile<T> = Rect & { item: T };

function squarify<T>(items: { item: T; area: number }[], box: Rect): Tile<T>[] {
  const total = items.reduce((s, i) => s + i.area, 0) || 1;
  const scale = (box.w * box.h) / total;
  const nodes = items.map((i) => ({ item: i.item, a: i.area * scale })).sort((a, b) => b.a - a.a);
  const out: Tile<T>[] = [];
  let rect = { ...box };
  let row: typeof nodes = [];
  const worst = (r: typeof nodes, side: number) => {
    const s = r.reduce((t, n) => t + n.a, 0);
    const max = Math.max(...r.map((n) => n.a)), min = Math.min(...r.map((n) => n.a));
    return Math.max((side * side * max) / (s * s), (s * s) / (side * side * min));
  };
  const layout = (r: typeof nodes) => {
    const s = r.reduce((t, n) => t + n.a, 0);
    if (rect.w >= rect.h) {
      const w = s / rect.h; let y = rect.y;
      for (const n of r) { const h = n.a / w; out.push({ x: rect.x, y, w, h, item: n.item }); y += h; }
      rect = { x: rect.x + w, y: rect.y, w: rect.w - w, h: rect.h };
    } else {
      const h = s / rect.w; let x = rect.x;
      for (const n of r) { const w = n.a / h; out.push({ x, y: rect.y, w, h, item: n.item }); x += w; }
      rect = { x: rect.x, y: rect.y + h, w: rect.w, h: rect.h - h };
    }
  };
  for (const n of nodes) {
    const side = Math.min(rect.w, rect.h);
    if (row.length === 0 || worst([...row, n], side) <= worst(row, side)) row.push(n);
    else { layout(row); row = [n]; }
  }
  if (row.length) layout(row);
  return out;
}

/** Diverging fill: deep red ← 0 → deep emerald, saturating at ±3%. */
function heat(pct: number): string {
  const t = Math.max(-1, Math.min(1, pct / 3));
  const a = 0.12 + Math.abs(t) * 0.5;
  return t >= 0 ? `rgba(0, 208, 132, ${a})` : `rgba(246, 91, 91, ${a})`;
}
const sign = (n: number) => (n > 0 ? "+" : "");
const money = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const cap = (bn?: number) => (bn == null ? "—" : bn >= 1000 ? `$${(bn / 1000).toFixed(2)}tn` : `$${bn.toFixed(0)}bn`);

function DayRange({ s }: { s: StockQuote }) {
  const lo = Math.min(s.low, s.prevClose), hi = Math.max(s.high, s.prevClose);
  const pos = (v: number) => `${((v - lo) / (hi - lo || 1)) * 100}%`;
  return (
    <div className="mt-3">
      <div className="relative h-1.5 rounded-full bg-white/10">
        <div className="absolute inset-y-0 rounded-full bg-gradient-to-r from-neg/70 via-electric/60 to-emerald/80" style={{ left: pos(s.low), right: `calc(100% - ${pos(s.high)})` }} />
        <span className="absolute -top-1 h-3.5 w-px bg-muted" style={{ left: pos(s.prevClose) }} title="Previous close" />
        <span className="absolute -top-1.5 h-4.5 w-1.5 -translate-x-1/2 rounded-full bg-ink shadow-[0_0_10px_#fff]" style={{ left: pos(s.price), height: 18 }} title="Now" />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[9px] text-muted2">
        <span>L {money(s.low)}</span><span>prev {money(s.prevClose)}</span><span>H {money(s.high)}</span>
      </div>
    </div>
  );
}

function Spotlight({ s, kind }: { s: StockQuote; kind: "gainer" | "loser" }) {
  const up = kind === "gainer";
  return (
    <div className="glass-liquid sheen relative h-full overflow-hidden p-6"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }}>
      <div className={`hairline-glow ${up ? "gold" : ""} pointer-events-none absolute inset-0 rounded-[inherit]`} aria-hidden />
      <div className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl ${up ? "bg-gold/20" : "bg-neg/15"}`} />
      <p className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] ${up ? "text-gold" : "text-neg"}`}>
        {up ? <Crown size={13} /> : <ArrowDownRight size={13} />} {up ? "Top riser today" : "Biggest faller"}
      </p>
      <div className="mt-5 flex items-center gap-4">
        {s.logo ? <img src={s.logo} alt="" className="h-12 w-12 rounded-xl border border-white/10 bg-white object-contain p-1.5" loading="lazy" />
          : <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 font-display font-bold text-ink">{s.symbol[0]}</div>}
        <div className="min-w-0">
          <p className="truncate font-display text-xl font-semibold text-ink">{s.name}</p>
          <p className="font-mono text-xs text-muted">{s.symbol} · {s.sector}</p>
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between gap-3">
        <p className="font-display text-3xl font-semibold text-ink">{money(s.price)}</p>
        <p className={`font-display text-4xl font-bold tracking-tight ${up ? "text-pos" : "text-neg"}`}>{sign(s.changePct)}{s.changePct.toFixed(2)}%</p>
      </div>
      <DayRange s={s} />
    </div>
  );
}

export default function MarketPulse() {
  const { board, loading } = useMarkets();
  const [hover, setHover] = useState<StockQuote | null>(null);
  const [tip, setTip] = useState({ x: 0, y: 0 });
  const wrap = useRef<HTMLDivElement>(null);

  // Lay out on a fixed 1000×560 canvas; tiles are positioned in % so it scales fluidly.
  const tiles = useMemo(() => squarify(
    board.stocks.map((s) => ({ item: s, area: Math.sqrt(s.marketCap ?? 200) })), // sqrt keeps small caps legible
    { x: 0, y: 0, w: 1000, h: 560 },
  ), [board.stocks]);

  const offline = !loading && board.stocks.length === 0;
  const asOf = board.asOf ? new Date(board.asOf).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZoneName: "short" }) : null;

  return (
    <div id="markets" className="scroll-mt-24">
      {/* Status + index strip */}
      <div className="flex flex-wrap items-center gap-3">
        <span className={`chip ${board.marketOpen ? "border-emerald/40 text-emerald" : ""}`}>
          <Radio size={12} className={board.marketOpen ? "animate-pulse" : ""} />
          {offline ? "Feed offline" : board.marketOpen == null ? "Live quotes" : board.marketOpen ? "US market open" : "US market closed · last session"}
        </span>
        {asOf && <span className="font-mono text-[11px] text-muted2">as of {asOf} · Finnhub · refreshes every 5 min</span>}
        {board.stocks.length > 0 && (
          <span className="font-mono text-[11px] text-muted2">breadth <span className="text-pos">{board.breadth.up}▲</span> <span className="text-neg">{board.breadth.down}▼</span></span>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {(board.indices.length ? board.indices : [{ symbol: "SPY", name: "S&P 500", via: "SPY", price: 0, changePct: 0 }, { symbol: "QQQ", name: "Nasdaq 100", via: "QQQ", price: 0, changePct: 0 }, { symbol: "DIA", name: "Dow Jones", via: "DIA", price: 0, changePct: 0 }]).map((ix) => {
          const ready = ix.price > 0;
          const up = ix.changePct >= 0;
          return (
            <div key={ix.symbol} className="glass-liquid relative overflow-hidden p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted2">{ix.name} <span className="normal-case tracking-normal">· via {ix.via}</span></p>
              {ready ? (
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="font-display text-2xl font-semibold text-ink">{money(ix.price)}</p>
                  <p className={`inline-flex items-center gap-1 font-display text-lg font-semibold ${up ? "text-pos" : "text-neg"}`}>
                    {up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}{sign(ix.changePct)}{ix.changePct.toFixed(2)}%
                  </p>
                </div>
              ) : <div className="mt-3 h-7 w-2/3 animate-pulse rounded bg-white/5" />}
              <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-px ${ready ? (up ? "bg-gradient-to-r from-transparent via-emerald/70 to-transparent" : "bg-gradient-to-r from-transparent via-neg/70 to-transparent") : ""}`} />
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[2.2fr_1fr]">
        {/* Heatmap */}
        <div ref={wrap} className="glass-liquid relative aspect-[1000/560] min-h-[22rem] overflow-hidden p-1.5"
          onMouseMove={(e) => { const r = wrap.current!.getBoundingClientRect(); setTip({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
          onMouseLeave={() => setHover(null)}>
          {offline ? (
            <div className="grid h-full place-items-center p-8 text-center">
              <div>
                <WifiOff className="mx-auto text-muted2" />
                <p className="h-display mt-4 text-lg">Live quotes are unavailable right now</p>
                <p className="mt-2 max-w-sm text-sm text-muted">The market feed didn&rsquo;t respond. We never show made-up prices, so this board stays empty until it&rsquo;s back.</p>
              </div>
            </div>
          ) : tiles.length === 0 ? (
            <div className="grid h-full grid-cols-6 grid-rows-4 gap-1.5">{Array.from({ length: 24 }).map((_, i) => <div key={i} className="animate-pulse rounded-lg bg-white/[0.04]" />)}</div>
          ) : (
            <div className="relative h-full w-full">
              {tiles.map(({ x, y, w, h, item: s }) => {
                const big = w * h > 26000, mid = w * h > 9000;
                return (
                  <motion.button key={s.symbol} layout
                    onMouseEnter={() => setHover(s)} onFocus={() => setHover(s)} onBlur={() => setHover(null)}
                    aria-label={`${s.name} ${sign(s.changePct)}${s.changePct.toFixed(2)}%`}
                    className="absolute overflow-hidden rounded-lg border border-white/[0.07] p-2 text-left backdrop-blur-sm transition-[filter] hover:z-10 hover:brightness-125 focus-visible:z-10"
                    style={{ left: `${x / 10}%`, top: `${(y / 560) * 100}%`, width: `calc(${w / 10}% - 3px)`, height: `calc(${(h / 560) * 100}% - 3px)`, background: heat(s.changePct), margin: 1.5 }}>
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent" />
                    <p className={`font-display font-bold text-ink ${big ? "text-xl" : mid ? "text-sm" : "text-[10px]"}`}>{s.symbol}</p>
                    {mid && <p className={`font-mono ${big ? "text-sm" : "text-[10px]"} ${s.changePct >= 0 ? "text-emerald" : "text-[#ff9a9a]"}`}>{sign(s.changePct)}{s.changePct.toFixed(2)}%</p>}
                    {big && <p className="mt-1 truncate font-mono text-[10px] text-muted">{s.name}</p>}
                  </motion.button>
                );
              })}
            </div>
          )}

          <AnimatePresence>
            {hover && (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}
                className="glass-liquid pointer-events-none absolute z-20 w-64 p-4"
                style={{ left: Math.min(tip.x + 16, (wrap.current?.clientWidth ?? 600) - 272), top: Math.min(tip.y + 16, (wrap.current?.clientHeight ?? 400) - 170) }}>
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-semibold text-ink">{hover.name}</p>
                  <span className="font-mono text-[10px] text-muted2">{hover.symbol}</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="font-display text-xl text-ink">{money(hover.price)}</p>
                  <p className={`font-display font-semibold ${hover.changePct >= 0 ? "text-pos" : "text-neg"}`}>{sign(hover.change)}{hover.change.toFixed(2)} ({sign(hover.changePct)}{hover.changePct.toFixed(2)}%)</p>
                </div>
                <DayRange s={hover} />
                <p className="mt-2 font-mono text-[9px] text-muted2">{hover.sector} · mkt cap {cap(hover.marketCap)} · open {money(hover.open)}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Spotlights */}
        <div className="grid gap-4">
          {board.topGainer ? <Spotlight s={board.topGainer} kind="gainer" /> : (
            <div className="glass-liquid relative grid min-h-[14rem] place-items-center overflow-hidden p-6 text-center">
              <div className="hairline-glow gold pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden />
              <div><Activity className="mx-auto text-gold" /><p className="mt-3 font-display text-sm text-muted">{offline ? "Top riser appears when quotes return" : "Finding today’s top riser…"}</p></div>
            </div>
          )}
          {board.topLoser && <Spotlight s={board.topLoser} kind="loser" />}
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] text-muted2">Tile size ≈ market cap (square-root scaled so smaller names stay readable) · colour = today&rsquo;s % move, saturating at ±3% · {board.stocks.length || 28} major US stocks · Not investment advice.</p>
    </div>
  );
}
