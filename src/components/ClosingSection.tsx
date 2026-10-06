"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import { GracefulImage } from "@/components/GracefulImage";
import { GaneshaMotif, PaithaniBorder } from "@/components/Decorations";
import { imageFallbacks, photography, wedding } from "@/data/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRevealGroup } from "@/hooks/useRevealGroup";

gsap.registerPlugin(ScrollTrigger);

export function ClosingSection() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useRevealGroup(root, "[data-reveal]", reducedMotion);

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".closing-media img",
        { scale: 1 },
        { scale: 1.11, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.5 } },
      );
      gsap.from(".closing-copy > *", {
        opacity: 0,
        y: 16,
        stagger: 0.085,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 66%", once: true },
      });
      gsap.to(".closing-fade", {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "60% center", end: "bottom bottom", scrub: 1 },
      });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <footer ref={root} className="closing-section">
      <div className="closing-media">
        <GracefulImage
          src={photography.hero}
          fallback={imageFallbacks.wedding}
          alt="ओंकार व समृद्धी - शुभ विवाह"
          fill
          sizes="100vw"
        />
      </div>
      <div className="closing-shade" />
      <div className="closing-fade" />
      <div className="closing-copy" data-reveal>
        <GaneshaMotif size={56} className="closing-ganesha mx-auto" />
        <span className="closing-kicker">॥ ऋणानुबंधाच्या जिथून पडल्या गाठी... ॥</span>
        <h2>
          आणि अशा प्रकारे,<br />
          सुरू होतो आमचा<br />
          नवा सहप्रवास...
        </h2>
        <p className="closing-names">
          {wedding.groom} <i>आणि</i> {wedding.bride}
        </p>
        <time className="closing-date">{wedding.numericDate}</time>
        <div className="closing-families">
          <span>निमंत्रक:</span>
          <strong>कुलकर्णी व देशपांडे परिवार</strong>
          <small>सहकुटुंब, सहपरिवार • पुणे</small>
        </div>
        <div className="closing-blessing">
          <span>स्नेहपूर्वक धन्यवाद</span>
          <Heart size={20} fill="currentColor" strokeWidth={1.2} aria-label="प्रेम" />
        </div>
      </div>
    </footer>
  );
}
