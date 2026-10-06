"use client";

import { Heart, Sparkles } from "lucide-react";
import { useCountdown } from "@/components/CountdownProvider";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/Decorations";

const UNITS = [
  { key: "days", label: "दिवस" },
  { key: "hours", label: "तास" },
  { key: "minutes", label: "मिनिटे" },
  { key: "seconds", label: "सेकंद" },
] as const;

export function Countdown() {
  const timeLeft = useCountdown();

  return (
    <section className="countdown-section" aria-labelledby="countdown-title">
      <div className="countdown-glow" aria-hidden="true" />
      <div className="countdown-inner page-shell">
        <Reveal variant="blur" className="countdown-kicker">
          ॥ प्रत्येक क्षण आता मंगल सोहळ्याकडे ॥
        </Reveal>
        <h2 id="countdown-title">
          <RevealLines text={"शुभ घटिका समीप\nयेत आहे..."} />
        </h2>

        {timeLeft?.complete ? (
          <Reveal variant="scale" className="count-complete">
            आज तो मंगल सोहळ्याचा दिवस आला! <Heart size={28} fill="currentColor" strokeWidth={1.3} />
          </Reveal>
        ) : (
          <div className="countdown-grid" aria-label="विवाह सोहळा उलट गणना">
            {UNITS.map((unit, index) => (
              <Reveal
                key={unit.key}
                variant="up"
                delay={index * 90}
                className="count-unit"
              >
                <NumberTicker
                  value={timeLeft?.[unit.key] ?? 0}
                  digits={2}
                  label={String(timeLeft?.[unit.key] ?? 0)}
                  className="count-unit__value"
                />
                <small>{unit.label}</small>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal variant="up" delay={120} className="countdown-outro">
          २१ नोव्हेंबर २०२६ • राजमुद्रा लॉन्स, पुणे येथे आपली उपस्थिती प्रार्थनीय आहे.
        </Reveal>
        <SectionDivider inscription="॥ सस्नेह निमंत्रण ॥" />
      </div>
    </section>
  );
}
