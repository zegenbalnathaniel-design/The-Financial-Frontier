"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LiveSnapshot } from "@/lib/live/types";
import { EMPTY_SNAPSHOT } from "@/lib/live/types";
import type { MarketBoard } from "@/lib/live/markets";

// Live data reaches the client AFTER first paint, so no page waits on upstream APIs.
//  · Macro snapshot  — /api/snapshot, fetched once (edge-cached ~6h).
//  · Market board    — /api/markets, polled every 5 min while the tab is visible.
// Everything renders immediately with curated/sample values and upgrades in place.

const EMPTY_BOARD: MarketBoard = {
  stocks: [], indices: [], topGainer: null, topLoser: null, breadth: { up: 0, down: 0 },
  asOf: null, marketOpen: null, source: null,
};

const LiveContext = createContext<LiveSnapshot>(EMPTY_SNAPSHOT);
const MarketsContext = createContext<{ board: MarketBoard; loading: boolean }>({ board: EMPTY_BOARD, loading: true });

const POLL_MS = 5 * 60 * 1000;

export function LiveDataProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<LiveSnapshot>(EMPTY_SNAPSHOT);
  const [board, setBoard] = useState<MarketBoard>(EMPTY_BOARD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    // Defer the macro snapshot until the browser is idle so it never competes with first paint.
    const ric = (window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const idle = (cb: () => void) => (ric ? ric.call(window, cb, { timeout: 1500 }) : setTimeout(cb, 200));
    idle(() => {
      fetch("/api/snapshot").then((r) => (r.ok ? r.json() : null)).then((s) => { if (alive && s) setSnapshot(s); }).catch(() => {});
    });

    const loadBoard = () =>
      fetch("/api/markets").then((r) => (r.ok ? r.json() : null))
        .then((b) => { if (alive && b) setBoard(b); }).catch(() => {}).finally(() => alive && setLoading(false));
    loadBoard();
    const id = window.setInterval(() => { if (document.visibilityState === "visible") loadBoard(); }, POLL_MS);
    const onVis = () => { if (document.visibilityState === "visible") loadBoard(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { alive = false; window.clearInterval(id); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return (
    <LiveContext.Provider value={snapshot}>
      <MarketsContext.Provider value={{ board, loading }}>{children}</MarketsContext.Provider>
    </LiveContext.Provider>
  );
}

/** The current live macro snapshot (empty until it arrives / when no source returned data). */
export function useLive(): LiveSnapshot {
  return useContext(LiveContext);
}

/** The live equity board (empty when the feed is offline). */
export function useMarkets() {
  return useContext(MarketsContext);
}
