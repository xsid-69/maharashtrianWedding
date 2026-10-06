"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * मंगलमूर्ती श्री गणेशाचे शुभ रेखाचित्र (Auspicious Ganesha Motif)
 */
export function GaneshaMotif({ className = "", size = 72 }: { className?: string; size?: number }) {
  return (
    <svg
      className={`ganesha-motif ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Crown / Mukut */}
      <path
        d="M50 10 L58 26 L50 23 L42 26 Z"
        fill="var(--gold)"
        stroke="var(--gold-light)"
        strokeWidth="1.2"
      />
      <circle cx="50" cy="18" r="2" fill="var(--shenduri)" />
      
      {/* Tilak / Chandrakor / Trishul mark */}
      <path
        d="M50 28 Q50 36 50 42"
        stroke="var(--shenduri)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M45 32 Q50 38 55 32"
        stroke="var(--gold)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="50" cy="27" r="1.5" fill="var(--gold)" />

      {/* Trunk (सोंड) sweeping gracefully to the left/right in traditional Devanagari style */}
      <path
        d="M48 38 C56 38 62 43 62 50 C62 56 57 59 52 59 C46 59 44 65 46 72 C48 77 54 79 58 76 C60 74 61 71 58 70 C55 69 53 71 52 73"
        stroke="var(--gold)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Modak (मोदक) in hand */}
      <path
        d="M62 68 C64 66 68 66 70 69 C71 72 68 76 65 76 C62 76 60 71 62 68 Z"
        fill="var(--gold-light)"
        stroke="var(--gold)"
        strokeWidth="1"
      />

      {/* Ears (कान) */}
      <path
        d="M42 36 C34 35 28 42 30 52 C32 58 38 60 44 59"
        stroke="var(--gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M58 36 C66 35 72 42 70 52 C69 56 66 59 62 59"
        stroke="var(--gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Aura / Halo ring */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="var(--hairline-gold)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
    </svg>
  );
}

/**
 * महाराष्ट्रीयन तुतारी व सनई (Traditional Tutari & Shehnai Horn Motif)
 */
export function TutariMotif({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      className={`tutari-motif ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Tutari curved horn brass body */}
      <path
        d="M22 75 C18 60 25 35 48 24 C68 14 84 25 86 42 C87 56 78 68 65 72 C55 75 46 72 43 65 C41 58 45 52 52 50 C58 48 64 52 64 57"
        stroke="var(--gold)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Flared horn bell mouth */}
      <path
        d="M20 70 C24 74 25 78 20 83 C14 84 12 76 18 70 Z"
        fill="var(--gold-light)"
        stroke="var(--gold)"
        strokeWidth="1.5"
      />
      {/* Royal Red Tassels (गोंडे) */}
      <path
        d="M48 24 L46 34 M52 24 L52 35 M50 35 L47 44 M53 35 L55 44"
        stroke="var(--shenduri)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="50" cy="35" r="3" fill="var(--shenduri)" />
    </svg>
  );
}

/**
 * कलश, नारळ व आंब्याची पाने (Purna Kalash & Toran Motif)
 */
export function KalashMotif({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      className={`kalash-motif ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Coconut (श्रीफळ / नारळ) */}
      <ellipse cx="50" cy="32" rx="11" ry="14" fill="var(--brown)" stroke="var(--gold)" strokeWidth="1.5" />
      {/* Mango Leaves (आंब्याची पाने) */}
      <path d="M50 35 C42 28 35 25 28 32 C34 38 42 40 48 38" fill="var(--peacock-green)" stroke="var(--gold)" strokeWidth="1" />
      <path d="M50 35 C58 28 65 25 72 32 C66 38 58 40 52 38" fill="var(--peacock-green)" stroke="var(--gold)" strokeWidth="1" />
      <path d="M50 24 C45 15 50 8 50 8 C50 8 55 15 50 24" fill="var(--peacock-green)" stroke="var(--gold)" strokeWidth="1" />

      {/* Kalash Pot (तांब्याचा / पितळेचा कलश) */}
      <path
        d="M38 42 L62 42 L66 50 C72 60 70 74 60 82 C55 86 45 86 40 82 C30 74 28 60 34 50 Z"
        fill="var(--gold-surface)"
        stroke="var(--gold)"
        strokeWidth="2.2"
      />
      {/* Swastik / Tilak on Kalash */}
      <path
        d="M50 56 V68 M44 62 H56 M44 56 H47 M56 68 H53 M44 68 V65 M56 56 V59"
        stroke="var(--shenduri)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * पारंपरिक पैठणी जरी नक्षी बॉर्डर (Paithani Zari Border)
 */
export function PaithaniBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`paithani-border ${className}`} aria-hidden="true">
      <div className="paithani-zari-track">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="paithani-motif-unit">
            <svg viewBox="0 0 40 24" fill="none" className="paithani-svg">
              {/* Traditional Mor / Peacock feather chevron & zari weave */}
              <path d="M20 2 L38 22 H2 Z" stroke="var(--gold)" strokeWidth="1" fill="none" />
              <path d="M20 7 L32 20 H8 Z" fill="var(--gold-faint)" />
              <circle cx="20" cy="14" r="2.5" fill="var(--shenduri)" />
              <path d="M0 23 H40" stroke="var(--gold)" strokeWidth="1.2" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * मुंडावळ्या कलाकुसर (Mundavalya Pearl Fringe)
 */
export function MundavalyaDecoration({ className = "" }: { className?: string }) {
  return (
    <div className={`mundavalya-fringe ${className}`} aria-hidden="true">
      <div className="mundavalya-thread" />
      <div className="mundavalya-beads">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="mundavalya-strand" style={{ "--strand-i": i } as CSSProperties}>
            <i className="pearl" />
            <i className="pearl" />
            <i className="pearl" />
            <i className="ruby-drop" />
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * मांडव व कमळ नक्षी (Mandap Lotus Mandala)
 */
export function DecorativeMandala({ className = "" }: { className?: string }) {
  return (
    <div className={`mandala ${className}`} aria-hidden="true">
      <span className="mandala__ring mandala__ring--outer" />
      <span className="mandala__ring mandala__ring--middle" />
      <span className="mandala__ring mandala__ring--inner" />
      {Array.from({ length: 12 }, (_, index) => (
        <i key={index} style={{ "--petal-index": index } as CSSProperties} />
      ))}
      <span className="mandala__center-om">ॐ</span>
    </div>
  );
}

/**
 * सस्नेह विभाजक रेखा (Section Divider with Royal Inscription)
 */
export function SectionDivider({ dark = false, inscription = "॥ शुभ सोहळा ॥" }: { dark?: boolean; inscription?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.6 });

  return (
    <div
      ref={ref}
      className={[
        "section-divider",
        dark ? "section-divider--dark" : "",
        inView ? "is-visible" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <span className="divider-line" />
      <span className="divider-badge">
        <i className="divider-star">✦</i>
        <small className="divider-text">{inscription}</small>
        <i className="divider-star">✦</i>
      </span>
      <span className="divider-line" />
    </div>
  );
}

/**
 * तरंगत्या अक्षता व झेंडूच्या पाकळ्या (Floating Akshata & Marigold Petals)
 */
export function FloatingPetals() {
  return (
    <div className="floating-petals" aria-hidden="true">
      {/* Marigold orange and yellow petals */}
      {Array.from({ length: 8 }, (_, index) => (
        <i key={`petal-${index}`} className="petal-marigold" style={{ "--petal": index } as CSSProperties} />
      ))}
      {/* Sacred Golden Akshata rice grains */}
      {Array.from({ length: 6 }, (_, index) => (
        <i key={`akshata-${index}`} className="akshata-grain" style={{ "--grain": index } as CSSProperties} />
      ))}
    </div>
  );
}
