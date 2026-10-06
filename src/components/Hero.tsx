"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, MapPin, ChevronDown } from "lucide-react";
import { GracefulImage } from "@/components/GracefulImage";
import { GaneshaMotif, TutariMotif } from "@/components/Decorations";
import { photography, wedding } from "@/data/wedding";
import { usePrefersReducedMotion, useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Hero({ active }: { active: boolean; video?: unknown }) {
  const root = useRef<HTMLElement>(null);
  const reduceHeavyMotion = useReducedMotion();
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!root.current || !active || prefersReducedMotion) return;

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-ganesha-badge", { opacity: 0, y: -16, scale: 0.88, duration: 0.7 })
        .from(".hero-groom-name", { opacity: 0, y: 20, duration: 0.75, ease: "power4.out" }, 0.18)
        .from(".hero-knot-pill", { opacity: 0, scale: 0.84, duration: 0.55 }, 0.32)
        .from(".hero-bride-name", { opacity: 0, y: 20, duration: 0.75, ease: "power4.out" }, 0.4)
        .from(".hero-shubhmangal", { opacity: 0, scale: 0.94, duration: 0.5 }, 0.58)
        .from(".hero-muhurat-pill", { opacity: 0, y: 18, duration: 0.7 }, 0.7)
        .from(".hero-scroll-cue", { opacity: 0, y: -6, duration: 0.55 }, 0.9);

      if (reduceHeavyMotion) return;

      gsap.to(".hero-bg-image", {
        yPercent: 6,
        scale: 1.05,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.1 },
      });
      gsap.to(".hero-main-layout", {
        yPercent: -6,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "15% top", end: "85% top", scrub: 0.9 },
      });
    }, root);

    return () => context.revert();
  }, [active, prefersReducedMotion, reduceHeavyMotion]);

  return (
    <section id="home" ref={root} className="hero-section" aria-label="मुख्य विवाह निमंत्रण">
      {/* Authentic Masterpiece Royal Maharashtrian Couple Photography */}
      <div className="hero-media-wrap">
        <GracefulImage
          src={photography.hero}
          fallback="/images/hero-couple.jpg"
          alt="चि. ओंकार आणि चि. सौ. कां. समृद्धी यांचा शुभ विवाह सोहळा"
          fill
          priority
          sizes="100vw"
          className="hero-bg-image"
        />
        {/* Soft, royal scrim preserving faces while delivering crisp typography contrast */}
        <div className="hero-royal-scrim" />
        <div className="hero-grade-overlay" />
      </div>

      {/* Floating Auspicious Petals & Akshata */}
      <div className="hero-petals-overlay" aria-hidden="true">
        <i className="hero-petal hero-petal--1" />
        <i className="hero-petal hero-petal--2" />
        <i className="hero-petal hero-petal--3" />
        <i className="hero-grain hero-grain--1" />
        <i className="hero-grain hero-grain--2" />
      </div>

      {/* Royal Main Layout */}
      <div className="hero-main-layout">
        {/* Top Canopy: Auspicious Ganesha Emblem & Royal Names */}
        <div className="hero-top-canopy">
          <div className="hero-ganesha-badge">
            <div className="hero-ganesha-ring">
              <GaneshaMotif size={38} className="hero-ganesha-svg" />
            </div>
            <span className="hero-mantra-title">{wedding.kicker}</span>
            <span className="hero-kulswamini-text">{wedding.kulswamini}</span>
          </div>

          <div className="hero-typography-block">
            <h1 className="hero-royal-names" aria-label={`${wedding.groom} आणि ${wedding.bride}`}>
              <span className="hero-groom-name">{wedding.groomFull}</span>

              <div className="hero-knot-badge">
                <i className="hero-knot-line" />
                <span className="hero-knot-pill">
                  <TutariMotif size={18} className="hero-mini-tutari" />
                  <span>रेशीमगाठ</span>
                  <TutariMotif size={18} className="hero-mini-tutari hero-mini-tutari--flip" />
                </span>
                <i className="hero-knot-line" />
              </div>

              <span className="hero-bride-name">{wedding.brideFull}</span>
            </h1>

            <p className="hero-shubhmangal">॥ शुभमंगल सावधान ॥</p>
          </div>
        </div>

        {/* Clear stage in middle so the couple's faces and attire shine */}
        <div className="hero-stage-spacer" aria-hidden="true" />

        {/* Bottom Deck: Sleek Glass Muhurat Pill & Scroll Cue */}
        <div className="hero-bottom-deck">
          <div className="hero-muhurat-pill">
            <div className="pill-segment">
              <Calendar size={15} className="pill-icon" />
              <span>{wedding.dateMarathi}</span>
            </div>

            <span className="pill-dot">•</span>

            <div className="pill-segment">
              <Clock size={15} className="pill-icon" />
              <span>{wedding.muhurat}</span>
            </div>

            <span className="pill-dot">•</span>

            <div className="pill-segment">
              <MapPin size={15} className="pill-icon" />
              <span>{wedding.venue}, पुणे</span>
            </div>
          </div>

          <a href="#couple" className="hero-scroll-cue" aria-label="खाली स्क्रोल करा आणि सोहळा पहा">
            <span>विवाह सोहळा पहा</span>
            <ChevronDown size={14} strokeWidth={2.5} className="hero-chevron" />
          </a>
        </div>
      </div>
    </section>
  );
}
