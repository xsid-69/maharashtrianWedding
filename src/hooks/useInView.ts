"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** Fraction of the element that must be visible before it counts as in view. */
  amount?: number;
  /** Keep the in-view state once triggered. */
  once?: boolean;
  rootMargin?: string;
};

/**
 * Intersection based visibility flag. Deliberately CSS-first: the hook only flips a
 * boolean so the actual motion runs on the compositor via class based transitions,
 * which keeps reveals cheap enough to use on every section, including mobile.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  amount = 0.15,
  once = true,
  rootMargin = "0px 0px -8% 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Safety net for engines without IntersectionObserver: show the content rather than
    // leaving it stuck at its hidden starting state. Deferred by a frame so it does not
    // cascade a render from inside the effect body.
    const supportsObserver = typeof IntersectionObserver !== "undefined";
    if (!supportsObserver) {
      const frame = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
          return;
        }
        if (!once) setInView(false);
      },
      { threshold: Math.min(1, Math.max(0, amount)), rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [amount, once, rootMargin]);

  return { ref, inView };
}
