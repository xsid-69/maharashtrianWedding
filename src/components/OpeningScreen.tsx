"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  GaneshaMotif,
  TutariMotif,
  PaithaniBorder,
  DecorativeMandala,
} from "@/components/Decorations";
import { useMusic } from "@/components/MusicProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { musicTrack, wedding } from "@/data/wedding";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

export function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const music = useMusic();

  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion) return;
    const compact = window.matchMedia("(max-width: 767px)").matches;

    const context = gsap.context(() => {
      gsap.set(".opening-intro", { autoAlpha: 0, y: 10 });
      gsap.set(".opening-name", { autoAlpha: 0, y: 14 });
      gsap.set(".opening-cta", { autoAlpha: 0, scale: 0.95 });
      gsap.set(".opening-hint", { autoAlpha: 0, y: 8 });
      gsap.set(".opening-border", { scale: 0.96, opacity: 0 });
      gsap.set(".opening-ganesha", { scale: 0.85, opacity: 0 });
      gsap.set(".opening-mandala", { scale: 0.92, opacity: 0 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(root.current, { backgroundColor: "#300614" }, { backgroundColor: "#4a0d22", duration: 0.9 })
        .to(".opening-border", { scale: 1, opacity: 1, duration: 0.9 }, 0.05)
        .to(".opening-mandala", { scale: 1, opacity: 0.22, duration: 1.0 }, 0.12)
        .to(".opening-ganesha", { opacity: 1, scale: 1, duration: 0.65 }, 0.2)
        .to(".opening-intro", { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.55 }, 0.35)
        .to(".opening-name", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7 }, 0.48)
        .to(".opening-cta", { autoAlpha: 1, scale: 1, duration: 0.55 }, 0.8)
        .to(".opening-hint", { autoAlpha: 1, y: 0, duration: 0.5 }, 0.95);

      if (compact) timeline.timeScale(1.3);
    }, root);

    return () => context.revert();
  }, [prefersReducedMotion]);

  const revealInvitation = () => {
    // Start audio immediately in user-gesture handler
    music.start();

    if (!root.current || prefersReducedMotion) {
      onOpen();
      return;
    }

    const compact = window.matchMedia("(max-width: 767px)").matches;
    if (compact) {
      gsap.timeline({ onComplete: onOpen })
        .to(".opening-content", {
          opacity: 0,
          scale: 0.96,
          duration: 0.28,
          ease: "power2.in",
        })
        .to(".opening-curtain--left", { xPercent: -101, duration: 0.55, ease: "power3.inOut" }, 0.08)
        .to(".opening-curtain--right", { xPercent: 101, duration: 0.55, ease: "power3.inOut" }, 0.08)
        .to(root.current, { autoAlpha: 0, duration: 0.2 }, 0.5);
      return;
    }

    gsap.timeline({ onComplete: onOpen })
      .to(".opening-cta, .opening-copy, .opening-ganesha, .opening-hint", {
        opacity: 0,
        y: -12,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.in",
      })
      .to(".opening-mandala", { scale: 1.25, opacity: 0, duration: 0.75, ease: "power3.inOut" }, 0.08)
      .to(".opening-tutari--left", { xPercent: -90, opacity: 0, duration: 0.75, ease: "power3.inOut" }, 0.1)
      .to(".opening-tutari--right", { xPercent: 90, opacity: 0, duration: 0.75, ease: "power3.inOut" }, 0.1)
      .to(".opening-curtain--left", { xPercent: -101, duration: 1.15, ease: "power4.inOut" }, 0.38)
      .to(".opening-curtain--right", { xPercent: 101, duration: 1.15, ease: "power4.inOut" }, 0.38)
      .to(root.current, { autoAlpha: 0, duration: 0.18 }, 1.48);
  };

  return (
    <div
      ref={root}
      className="opening-screen"
      role="dialog"
      aria-modal="true"
      aria-label="महाराष्ट्रीयन विवाह निमंत्रण पत्रिका"
    >
      <div className="opening-curtain opening-curtain--left" />
      <div className="opening-curtain opening-curtain--right" />
      
      {/* Decorative Borders and Mandalas */}
      <div className="opening-border" aria-hidden="true">
        <PaithaniBorder className="opening-paithani-top" />
        <PaithaniBorder className="opening-paithani-bottom" />
      </div>

      <DecorativeMandala className="opening-mandala" />

      {/* Royal Maharashtrian Tutari flanking elements */}
      <div className="opening-tutari opening-tutari--left" aria-hidden="true">
        <TutariMotif size={64} />
      </div>
      <div className="opening-tutari opening-tutari--right" aria-hidden="true">
        <TutariMotif size={64} />
      </div>

      {/* Centered Patrika Content - optimized to fit completely inside 100dvh on mobile */}
      <div className="opening-content">
        <div className="opening-ganesha-wrap">
          <GaneshaMotif className="opening-ganesha" size={54} />
          <span className="opening-shree opening-copy">{wedding.kicker}</span>
          <span className="opening-kulswamini opening-copy">{wedding.kulswamini}</span>
        </div>

        <p className="opening-intro opening-copy">॥ सस्नेह निमंत्रण ॥</p>

        <h1 className="opening-names opening-copy" aria-label="ओंकार आणि समृद्धी">
          <span className="opening-name">चि. ओंकार</span>
          <span className="opening-ampersand opening-name">संग</span>
          <span className="opening-name">चि. सौ. कां. समृद्धी</span>
        </h1>

        <div className="opening-date-badge opening-copy">
          <span>{wedding.dateMarathi}</span>
          <small>•</small>
          <span>{wedding.location}</span>
        </div>

        <div className="opening-cta">
          <Magnetic strength={6}>
            <ShimmerButton onClick={revealInvitation} className="opening-button">
              मंगल निमंत्रण स्वीकारा
            </ShimmerButton>
          </Magnetic>
        </div>

        <p className="opening-hint">
          {music.available ? (
            <>
              सानईच्या मंगल सुरांसह उघडा • <span>{musicTrack.title}</span>
            </>
          ) : (
            <>निमंत्रण पत्रिकेमध्ये प्रवेश करण्यासाठी स्पर्श करा</>
          )}
        </p>
      </div>
    </div>
  );
}
