"use client";

import { useEffect, type RefObject } from "react";

/**
 * Observer driven reveals for a whole section.
 *
 * Elements that cross into view in the same observer callback are treated as one batch
 * and given an incrementing `--reveal-index`, which the stylesheet turns into a
 * transition delay. Staggering per batch rather than per document position matters: a
 * global index would leave the last item in a long section waiting on a delay it never
 * earned, and short sections would stagger correctly while long ones felt broken.
 */
export function useRevealGroup<T extends HTMLElement>(
  root: RefObject<T | null>,
  selector = "[data-reveal]",
  enabled = true,
) {
  useEffect(() => {
    if (!root.current || !enabled) return;
    const currentRoot = root.current;
    const elements = Array.from(currentRoot.querySelectorAll<HTMLElement>(selector));
    if (!elements.length) return;

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    currentRoot.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.style.setProperty("--reveal-index", String(batchIndex));
          element.classList.add("is-visible");
          batchIndex += 1;
          observer.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      currentRoot.classList.remove("reveal-ready");
    };
  }, [root, selector, enabled]);
}
