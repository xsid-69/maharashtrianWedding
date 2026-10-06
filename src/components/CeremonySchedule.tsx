"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Clock, MapPin, Sparkles } from "lucide-react";
import { GracefulImage } from "@/components/GracefulImage";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { PaithaniBorder } from "@/components/Decorations";
import { events, googleMapsSearch, scheduleMeta } from "@/data/wedding";
import { scrollToPosition, scrollToTarget } from "@/lib/lenis";
import styles from "./CeremonySchedule.module.css";

gsap.registerPlugin(ScrollTrigger);

export function CeremonySchedule() {
  const root = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = stack.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const plates = Array.from(node.querySelectorAll<HTMLElement>(`.${styles.plate}`));
    if (!plates.length) return;

    const visible = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isFinite(index)) return;
          if (entry.isIntersecting) visible.add(index);
          else visible.delete(index);
        });
        if (visible.size) setActive(Math.max(...visible));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    plates.forEach((plate) => observer.observe(plate));
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!stack.current) return;
    const media = gsap.matchMedia();

    media.add("(min-width: 48rem) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)", () => {
      const node = stack.current;
      if (!node) return;

      const plates = gsap.utils.toArray<HTMLElement>(`.${styles.plate}`, node);

      plates.forEach((plate, index) => {
        const next = plates[index + 1];
        if (!next) return;

        const veil = plate.querySelector<HTMLElement>(`.${styles.veil}`);

        gsap.to(plate, {
          scale: 0.94,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
        });

        if (veil) {
          gsap.to(veil, {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
          });
        }
      });

      plates.forEach((plate) => {
        const image = plate.querySelector("img");
        if (!image) return;
        gsap.fromTo(
          image,
          { scale: 1.16 },
          {
            scale: 1.02,
            ease: "none",
            scrollTrigger: { trigger: plate, start: "top bottom", end: "bottom top", scrub: 1.2 },
          },
        );
      });
    });

    return () => media.revert();
  }, []);

  const jumpTo = useCallback((index: number) => {
    const node = stack.current;
    if (!node) return;
    setActive(index);
    scrollToPosition(node.offsetTop + index * window.innerHeight);
  }, []);

  return (
    <section id="events" ref={root} className={styles.section} aria-labelledby="events-title">
      <header className={`page-shell ${styles.header}`}>
        <Reveal variant="blur" className={styles.kicker}>
          {scheduleMeta.kicker}
        </Reveal>
        <h2 id="events-title" className={styles.title}>
          <RevealLines text={scheduleMeta.title} />
        </h2>
        <Reveal variant="up" delay={120} className={styles.lede}>
          {scheduleMeta.lede}
        </Reveal>
      </header>

      <div ref={stack} className={styles.stack}>
        <nav className={styles.index} aria-label="विवाह विधींची यादी">
          <ol>
            {events.map((event, index) => (
              <li key={event.id}>
                <button
                  type="button"
                  className={styles.indexItem}
                  data-active={index === active ? "true" : undefined}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => jumpTo(index)}
                >
                  <span className={styles.indexRule} aria-hidden="true" />
                  <span className={styles.indexLabel}>{event.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {events.map((event, index) => (
          <article
            key={event.id}
            className={styles.plate}
            data-index={index}
            data-featured={event.featured ? "true" : undefined}
            aria-labelledby={`ceremony-${event.id}`}
          >
            <div className={styles.media}>
              <GracefulImage
                src={event.image}
                fallback={event.fallback}
                alt={`${event.name}, ${event.ritual}`}
                fill
                sizes="100vw"
              />
              <span
                className={styles.grade}
                style={{ "--grade": event.grade } as CSSProperties}
                aria-hidden="true"
              />
              <span className={styles.scrim} aria-hidden="true" />
            </div>

            <span className={styles.veil} aria-hidden="true" />

            <div className={`page-shell ${styles.body}`}>
              <p className={styles.day}>
                <time dateTime={event.isoDate}>
                  {event.weekday}, {event.day} {event.month}
                </time>
              </p>

              <h3 id={`ceremony-${event.id}`} className={styles.name}>
                <span className={styles.hindi} aria-hidden="true">{event.subTitle}</span>
                {event.name}
              </h3>

              <p className={styles.ritual}>{event.ritual}</p>
              <p className={styles.copy}>{event.description}</p>

              <dl className={styles.facts}>
                <div>
                  <dt>वेळ</dt>
                  <dd>
                    {event.time} ते {event.until}
                  </dd>
                </div>
                <div>
                  <dt>स्थळ</dt>
                  <dd>
                    {event.venue}, {event.city}
                  </dd>
                </div>
                <div>
                  <dt>पोषाख</dt>
                  <dd>{event.dressCode}</dd>
                </div>
              </dl>

              <a
                className={styles.link}
                href={googleMapsSearch(`${event.venue}, ${event.city}, Maharashtra, India`)}
                target="_blank"
                rel="noreferrer"
              >
                गूगल मॅपवर दिशा पहा
                <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <Reveal variant="up" className={`page-shell ${styles.closing}`}>
        <h3>{scheduleMeta.closing.heading}</h3>
        <p>{scheduleMeta.closing.copy}</p>
        <a
          href="#rsvp"
          onClick={(clickEvent) => {
            clickEvent.preventDefault();
            scrollToTarget("#rsvp");
          }}
        >
          आपली उपस्थिती नोंदवा
          <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
