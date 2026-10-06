"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GracefulImage } from "@/components/GracefulImage";
import { SectionDivider, MundavalyaDecoration } from "@/components/Decorations";
import { imageFallbacks, photography, wedding } from "@/data/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRevealGroup } from "@/hooks/useRevealGroup";

gsap.registerPlugin(ScrollTrigger);

export function CoupleSection() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useRevealGroup(root, "[data-reveal]", reducedMotion);

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.from(".couple-heading .reveal-word", {
        yPercent: 104,
        stagger: 0.055,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".couple-heading", start: "top 84%", once: true },
      });

      gsap.fromTo(
        ".portrait--onkar",
        { clipPath: "inset(100% 0 0 0)", y: 22 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: ".portrait--onkar", start: "top 88%", once: true },
        },
      );

      gsap.fromTo(
        ".portrait--samruddhi",
        { clipPath: "inset(0 0 100% 0)", y: 26 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".portrait--samruddhi", start: "top 90%", once: true },
        },
      );

      gsap.from(".couple-copy > *", {
        opacity: 0,
        y: 14,
        stagger: 0.075,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".couple-copy", start: "top 84%", once: true },
      });

      gsap.to(".portrait--onkar img", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".portrait--onkar", start: "top bottom", end: "bottom top", scrub: 1.2 },
      });

      gsap.to(".portrait--samruddhi img", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: { trigger: ".portrait--samruddhi", start: "top bottom", end: "bottom top", scrub: 1.4 },
      });
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  const headingWords = "दोन जीवांचे मनोमिलन, एका नव्या संसाराची सुंदर सुरुवात".split(" ");

  return (
    <section id="couple" ref={root} className="couple-section" aria-labelledby="couple-title">
      <MundavalyaDecoration className="couple-mundavalya" />

      <div className="couple-heading" data-reveal>
        <span className="couple-kicker">॥ वधू-वर परिचय ॥</span>
        <h2 id="couple-title">
          {headingWords.map((word, i) => (
            <span className="word-mask" key={`${word}-${i}`}>
              <span className="reveal-word">{word}</span>
            </span>
          ))}
        </h2>
      </div>

      <div className="couple-layout page-shell">
        <figure className="portrait portrait--onkar" data-reveal>
          <GracefulImage
            src={photography.coupleAtNight}
            fallback={imageFallbacks.groom}
            alt="चि. ओंकार - वर"
            fill
            sizes="(max-width: 767px) 82vw, 34vw"
          />
          <figcaption>
            <span>{wedding.groomFull}</span>
            <small>वर • सुपुत्र: {wedding.groomParents}</small>
          </figcaption>
        </figure>

        <div className="couple-copy" data-reveal>
          <p className="couple-blessing-quote">
            &ldquo;ऋणानुबंधाच्या गाठी रेशीमबंधाने जुळून आल्या... आणि दोन जीवांनी एकत्र चालण्याचा संकल्प केला.&rdquo;
          </p>
          <h3>
            {wedding.groom} <i>आणि</i> {wedding.bride}
          </h3>
          <span>
            मैत्रीच्या अथांग विश्वातून सुरू झालेला हा सुंदर प्रवास, आता कुटुंबीयांच्या मंगल आशीर्वादाने आणि
            सप्तपदीच्या सात फेऱ्यांनी अखंड सौभाग्याच्या रेशीमबंधात बद्ध होत आहे.
          </span>
          <div className="couple-families-box">
            <div className="family-col">
              <strong>वर पक्ष:</strong>
              <small>{wedding.groomParents}, पुणे</small>
            </div>
            <div className="family-divider" />
            <div className="family-col">
              <strong>वधू पक्ष:</strong>
              <small>{wedding.brideParents}, पुणे</small>
            </div>
          </div>
        </div>

        <figure className="portrait portrait--samruddhi" data-reveal>
          <GracefulImage
            src={photography.bridalPortrait}
            fallback={imageFallbacks.bride}
            alt="चि. सौ. कां. समृद्धी - वधू"
            fill
            sizes="(max-width: 767px) 72vw, 30vw"
          />
          <figcaption>
            <span>{wedding.brideFull}</span>
            <small>वधू • सुकन्या: {wedding.brideParents}</small>
          </figcaption>
        </figure>
      </div>

      <SectionDivider inscription="॥ शुभमंगल सावधान ॥" />
    </section>
  );
}
