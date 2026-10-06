"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { setActiveLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

export function SmoothScroll({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.classList.toggle("invitation-locked", !enabled);

    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;

    // Reduced motion and data-saver both fall back to plain native scrolling.
    if (!enabled || prefersReducedMotion || saveData) {
      setActiveLenis(null);
      document.documentElement.classList.remove("lenis-ready");
      return;
    }

    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Lerp based smoothing rather than a fixed duration: the viewport chases the target
    // every frame, so momentum stays continuous instead of restarting an ease on every
    // wheel tick.
    //
    // syncTouch stays off. Native touch momentum is already composited and buttery;
    // hijacking it costs a main-thread frame per move and breaks pull-to-refresh and
    // address-bar behaviour on iOS. Lenis still runs on touch so anchor scrolling is
    // smooth and ScrollTrigger stays in sync with the real scroll position.
    const lenis = new Lenis({
      lerp: coarse ? 0.12 : 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      syncTouch: false,
      touchMultiplier: 1.15,
      overscroll: true,
      autoResize: true,
    });

    setActiveLenis(lenis);
    document.documentElement.classList.add("lenis-ready");

    const onLenisScroll = () => ScrollTrigger.update();
    const update = (time: number) => lenis.raf(time * 1000);
    const refresh = () => window.requestAnimationFrame(() => ScrollTrigger.refresh());

    lenis.on("scroll", onLenisScroll);
    gsap.ticker.add(update);
    // Lenis already drives the loop from the GSAP ticker; letting GSAP lag-smooth on top
    // of that reintroduces the stutter we are trying to remove.
    gsap.ticker.lagSmoothing(0);
    refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("orientationchange", refresh);

    return () => {
      window.removeEventListener("orientationchange", refresh);
      setActiveLenis(null);
      document.documentElement.classList.remove("lenis-ready");
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, [enabled, prefersReducedMotion]);

  useEffect(() => () => document.documentElement.classList.remove("invitation-locked"), []);

  return children;
}
