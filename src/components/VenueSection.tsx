"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin, Compass } from "lucide-react";
import { GracefulImage } from "@/components/GracefulImage";
import { imageFallbacks, photography, wedding } from "@/data/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRevealGroup } from "@/hooks/useRevealGroup";

gsap.registerPlugin(ScrollTrigger);

export function VenueSection() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useRevealGroup(root, "[data-reveal]", reducedMotion);

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".venue-image",
        { clipPath: "inset(8% 12% 8% 12%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root.current, start: "top 80%", end: "top 15%", scrub: 1 } },
      );
      gsap.fromTo(
        ".venue-image img",
        { scale: 1.12 },
        { scale: 1.02, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.3 } },
      );
      gsap.from(".venue-copy > *", { opacity: 0, y: 14, stagger: 0.07, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".venue-copy", start: "top 80%", once: true } });
      gsap.from(".map-card", { opacity: 0, y: 16, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".map-card", start: "top 90%", once: true } });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="venue" ref={root} className="venue-section" aria-labelledby="venue-title">
      <div className="venue-image">
        <GracefulImage
          src={photography.coupleAtNight}
          fallback={imageFallbacks.venue}
          alt="राजमुद्रा लॉन्स विवाह मंडप, पुणे"
          fill
          sizes="100vw"
        />
        <div className="venue-shade" />
        <div className="venue-copy" data-reveal>
          <p className="venue-kicker">॥ विवाह स्थळ व मुहूर्त ॥</p>
          <h2 id="venue-title">{wedding.venue}</h2>
          <span>{wedding.location}</span>
          <time>
            {wedding.dateMarathi}
            <br />
            {wedding.muhurat}
          </time>
          <a
            className="arrow-link arrow-link--light"
            href={wedding.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            गूगल मॅपवर दिशा मिळवा <ArrowUpRight size={18} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      <div className="map-wrap page-shell">
        <div className="map-card" data-reveal aria-label={`विवाह स्थळ: ${wedding.venue}`}>
          <div className="map-pattern" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="map-pin">
            <MapPin size={24} strokeWidth={1.4} />
          </span>
          <div className="map-details">
            <small>{wedding.location}</small>
            <strong>{wedding.venue}</strong>
            <p className="map-address-line">{wedding.venueAddress}</p>
          </div>
          <a
            href={wedding.mapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Google Maps वर स्थान पहा"
          >
            स्थान पहा <ArrowUpRight size={16} strokeWidth={1.4} />
          </a>
        </div>
      </div>
    </section>
  );
}
