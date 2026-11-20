"use client";

import { useEffect, useState } from "react";
import { hasHistorySource, type HistoryPayload, type HistoryPoint } from "@/lib/history";

// Real history for one indicator, fetched from /api/history/[key] AFTER first paint and
// shared across every component on the page (one request per indicator per page load).
//
// status:
//   none    — no real source for this indicator → callers show labelled sample data
//   loading — request in flight → callers show a loading state (never sample-as-real)
//   ready   — payload arrived (individual economies may still lack a series)
//   error   — request failed → callers fall back to labelled sample data

export type HistoryStatus = "none" | "loading" | "ready" | "error";
export interface HistoryState { status: HistoryStatus; data: HistoryPayload | null }

const cache = new Map<string, Promise<HistoryPayload>>();
const settled = new Map<string, HistoryState>();

function load(key: string): Promise<HistoryPayload> {
  let p = cache.get(key);
  if (!p) {
    p = fetch(`/api/history/${key}`, { signal: AbortSignal.timeout(30000) })
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() as Promise<HistoryPayload>; });
    p.then(
      (data) => settled.set(key, { status: "ready", data }),
      () => { settled.set(key, { status: "error", data: null }); cache.delete(key); }, // allow a retry later
    );
    cache.set(key, p);
  }
  return p;
}

export function useHistory(key: string): HistoryState {
  const initial = (): HistoryState =>
    !hasHistorySource(key) ? { status: "none", data: null } : settled.get(key) ?? { status: "loading", data: null };
  const [state, setState] = useState<{ key: string; s: HistoryState }>(() => ({ key, s: initial() }));

  useEffect(() => {
    if (!hasHistorySource(key)) { setState({ key, s: { status: "none", data: null } }); return; }
    const done = settled.get(key);
    if (done?.status === "ready") { setState({ key, s: done }); return; }
    let alive = true;
    setState({ key, s: { status: "loading", data: null } });
    load(key).then(
      (data) => alive && setState({ key, s: { status: "ready", data } }),
      () => alive && setState({ key, s: { status: "error", data: null } }),
    );
    return () => { alive = false; };
  }, [key]);

  // While the effect for a new key hasn't run yet, never return the previous key's data.
  return state.key === key ? state.s : initial();
}

/** The real series for one economy, if the payload has one. */
export function realSeries(h: HistoryState, code: string): HistoryPoint[] | null {
  const pts = h.status === "ready" ? h.data?.series[code] : undefined;
  return pts && pts.length >= 2 ? pts : null;
}

/** "World Bank · 2006–2025" style label for a plotted range. */
export function rangeLabel(provider: string | null | undefined, pts: HistoryPoint[]): string {
  if (!pts.length) return provider ?? "";
  return `${provider ?? ""} · ${pts[0][0]}–${pts[pts.length - 1][0]}`;
}
