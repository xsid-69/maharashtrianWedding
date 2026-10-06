"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useWeddingCountdown, type WeddingTimeLeft } from "@/hooks/useWeddingCountdown";

const CountdownContext = createContext<WeddingTimeLeft | null>(null);

/**
 * Holds the once-per-second countdown tick in a single provider. Without this the
 * timer state would sit on the page component and re-render every section every
 * second, which is exactly the kind of avoidable work that shows up as scroll jank.
 * Only the two components that actually display time subscribe here.
 */
export function CountdownProvider({ children }: { children: ReactNode }) {
  const timeLeft = useWeddingCountdown();
  return <CountdownContext.Provider value={timeLeft}>{children}</CountdownContext.Provider>;
}

export function useCountdown() {
  return useContext(CountdownContext);
}
