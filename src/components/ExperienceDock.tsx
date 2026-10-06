"use client";

import { Music2, Pause } from "lucide-react";
import { useCountdown } from "@/components/CountdownProvider";
import { useMusic } from "@/components/MusicProvider";
import { NumberTicker } from "@/components/ui/NumberTicker";

const unitLabels = [
  ["days", "दिवस"],
  ["hours", "तास"],
  ["minutes", "मि."],
  ["seconds", "से."],
] as const;

export function ExperienceDock() {
  const timeLeft = useCountdown();
  const { playing, available, title, toggle } = useMusic();

  const countdownLabel = timeLeft?.complete
    ? "आज तो मंगल सोहळ्याचा दिवस आला आहे"
    : timeLeft
      ? `विवाह सोहळ्यासाठी ${timeLeft.days} दिवस, ${timeLeft.hours} तास, ${timeLeft.minutes} मिनिटे आणि ${timeLeft.seconds} सेकंद शिल्लक`
      : "उलट गणना लोड होत आहे...";

  const musicLabel = !available
    ? "पार्श्वसंगीत उपलब्ध नाही"
    : playing
      ? `संगीत थांबवा (${title})`
      : `संगीत सुरू करा (${title})`;

  return (
    <aside className="experience-dock" aria-label="विवाह उलट गणना व मंगल पार्श्वसंगीत">
      <span className="dock-beam" aria-hidden="true" />

      <div className="dock-countdown" role="timer" aria-live="off" aria-label={countdownLabel}>
        {timeLeft?.complete ? (
          <span className="dock-countdown__today">॥ आज शुभ सोहळा ॥</span>
        ) : (
          unitLabels.map(([key, label]) => (
            <span className="dock-countdown__unit" key={key} aria-hidden="true">
              <NumberTicker value={timeLeft?.[key] ?? 0} digits={2} />
              <small>{label}</small>
            </span>
          ))
        )}
      </div>

      <div className="dock-music">
        <button
          className={`dock-music__toggle pressable ${playing ? "is-playing" : ""}`}
          type="button"
          onClick={toggle}
          disabled={!available}
          aria-pressed={playing}
          aria-label={musicLabel}
          title={musicLabel}
        >
          {playing ? <Pause size={17} strokeWidth={1.6} /> : <Music2 size={17} strokeWidth={1.6} />}
          <span className="dock-equalizer" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
        <span className="dock-track">
          <small>{playing ? "मंगल सूर चालू" : available ? "संगीत ऐकण्यासाठी स्पर्श करा" : "संगीत बंद"}</small>
          <strong>{title}</strong>
        </span>
      </div>
    </aside>
  );
}
