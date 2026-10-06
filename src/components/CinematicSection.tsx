"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GracefulImage } from "@/components/GracefulImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRevealGroup } from "@/hooks/useRevealGroup";

gsap.registerPlugin(ScrollTrigger);

type CinematicSectionProps = {
  src: string;
  fallback: string;
  alt: string;
  lines: string[];
  align?: "left" | "center" | "right";
};

export function CinematicSection({ src, fallback, alt, lines, align = "left" }: CinematicSectionProps) {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  useRevealGroup(root, "[data-cinematic-reveal]", reducedMotion);

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".cinematic-media img",
        { scale: 1.02 },
        { scale: 1.12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.2 } },
      );
      gsap.from(".cinematic-line", {
        yPercent: 104,
        stagger: 0.08,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });
      gsap.to(".cinematic-copy", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={root} className={`cinematic cinematic--${align}`}>
      <div className="cinematic-media">
        <GracefulImage src={src} fallback={fallback} alt={alt} fill sizes="100vw" />
      </div>
      <div className="cinematic-shade" />
      <div className="cinematic-paithani-overlay" />
      <h2 className="cinematic-copy">
        {lines.map((line) => (
          <span className="word-mask" key={line}>
            <span className="cinematic-line" data-cinematic-reveal>
              {line}
            </span>
          </span>
        ))}
      </h2>
    </section>
  );
}
