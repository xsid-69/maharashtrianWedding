"use client";

import { useRef } from "react";
import { GracefulImage } from "@/components/GracefulImage";
import { SectionDivider } from "@/components/Decorations";
import { story, wedding } from "@/data/wedding";
import { useRevealGroup } from "@/hooks/useRevealGroup";

export function StoryTimeline() {
  const root = useRef<HTMLElement>(null);
  useRevealGroup(root);

  return (
    <section id="story" ref={root} className="story-section story-folio" aria-labelledby="story-title">
      <header className="story-header page-shell" data-reveal>
        <span className="story-kicker">॥ प्रेमकथा • रेशीमगाठ ॥</span>
        <h2 id="story-title">
          चार गोड आठवणी.<br />एक निरंतर प्रवास.
        </h2>
        <p>आमची प्रेमकथा... आठवणींच्या पैठणीत विणलेले सोनेरी धागे.</p>
      </header>

      <div className="memory-folio page-shell">
        <div className="memory-thread" aria-hidden="true" />
        {story.map((chapter, index) => (
          <article className={`memory-chapter memory-chapter--${index + 1}`} key={chapter.year} data-reveal>
            <div className="memory-date" aria-label={`${chapter.year}, ${chapter.chapter}`}>
              <small>{chapter.chapter}</small>
              <span>{chapter.year}</span>
            </div>
            <figure className="memory-image">
              <GracefulImage
                src={chapter.image}
                fallback={chapter.fallback}
                alt={`${chapter.title}, ${chapter.place}`}
                fill
                sizes="(max-width: 767px) 92vw, 46vw"
              />
              <i aria-hidden="true" />
            </figure>
            <div className="memory-copy">
              <p>{chapter.place}</p>
              <h3>{chapter.title}</h3>
              <span>{chapter.copy}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="story-coda page-shell" data-reveal>
        <span>पहिल्या चहाच्या घोटापासून ते सप्तपदीच्या सात फेऱ्यांपर्यंत...</span>
        <strong>{wedding.numericDate}</strong>
        <p>आता आमच्या आयुष्यातील सर्वात मंगल अध्याय सुरू होत आहे.</p>
      </div>
      <SectionDivider inscription="॥ सात पावले सात जन्म ॥" />
    </section>
  );
}
