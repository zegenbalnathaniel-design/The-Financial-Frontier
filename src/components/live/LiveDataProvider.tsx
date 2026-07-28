"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LiveSnapshot } from "@/lib/live/types";
import { EMPTY_SNAPSHOT } from "@/lib/live/types";

// Carries the server-assembled live snapshot down to the client visualisations.
// Seeded once per request from the root layout; components read it with useLive().
const LiveContext = createContext<LiveSnapshot>(EMPTY_SNAPSHOT);

export function LiveDataProvider({ snapshot, children }: { snapshot: LiveSnapshot; children: ReactNode }) {
  return <LiveContext.Provider value={snapshot}>{children}</LiveContext.Provider>;
}

/** The current live snapshot (empty when no sources returned data). */
export function useLive(): LiveSnapshot {
  return useContext(LiveContext);
}
