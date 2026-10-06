"use client";

import { useEffect, useRef } from "react";

/**
 * Hairline reading-progress indicator pinned to the top of the viewport.
 * Reads scroll position on a single rAF-throttled passive listener and writes one CSS
 * custom property, so it never triggers a React render while scrolling.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;

    const write = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      bar.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    const request = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress__bar" />
    </div>
  );
}
