import type { CSSProperties } from "react";

const REEL = Array.from({ length: 10 }, (_, digit) => digit);

type NumberTickerProps = {
  value: number;
  /** Minimum number of digit slots, zero padded. */
  digits?: number;
  className?: string;
  /** Announced to assistive tech in place of the animated digits. */
  label?: string;
};

/**
 * Odometer style number display. Each digit is a vertical reel of 0-9 translated into
 * place, so a changing value rolls rather than snapping. Pure CSS transform, no JS
 * animation loop, which matters here because the countdown updates every second.
 */
export function NumberTicker({ value, digits = 2, className = "", label }: NumberTickerProps) {
  const text = String(Math.max(0, Math.floor(value))).padStart(digits, "0");

  return (
    <span className={`ticker ${className}`.trim()}>
      <span className="sr-only">{label ?? text}</span>
      <span className="ticker__slots" aria-hidden="true">
        {text.split("").map((digit, index) => (
          <span className="ticker__slot" key={`${index}-${text.length}`}>
            <span className="ticker__reel" style={{ "--digit": Number(digit) } as CSSProperties}>
              {REEL.map((reelDigit) => (
                <span key={reelDigit}>{reelDigit}</span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
