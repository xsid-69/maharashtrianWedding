"use client";

import { useEffect, useState } from "react";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

function useMediaPreference(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaPreference("(prefers-reduced-motion: reduce)");
}

export function useReducedMotion() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const compactOrTouch = useMediaPreference("(max-width: 767px), (pointer: coarse)");
  const saveData = typeof navigator !== "undefined"
    && (navigator as NavigatorWithConnection).connection?.saveData === true;

  return prefersReducedMotion || compactOrTouch || saveData;
}
