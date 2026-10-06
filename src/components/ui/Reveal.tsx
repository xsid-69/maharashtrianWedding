"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "blur"
  | "scale"
  | "clip"
  | "clip-left"
  | "curtain"
  | "fade";

type RevealConfig = {
  variant?: RevealVariant;
  /** Milliseconds before the reveal starts once the element enters view. */
  delay?: number;
  /** Milliseconds the reveal takes. */
  duration?: number;
  amount?: number;
  once?: boolean;
};

type RevealBindings = {
  className: string;
  style: CSSProperties;
};

function bindings(
  { variant = "up", delay = 0, duration }: RevealConfig,
  inView: boolean,
  className: string,
): RevealBindings {
  return {
    className: [`reveal reveal--${variant}`, inView ? "is-inview" : "", className]
      .filter(Boolean)
      .join(" "),
    style: {
      "--reveal-delay": `${delay}ms`,
      ...(duration ? { "--reveal-duration": `${duration}ms` } : {}),
    } as CSSProperties,
  };
}

/**
 * Spread the result onto any element to give it a scroll reveal without wrapping it in
 * an extra node. Useful inside grids and flex layouts where a wrapper would break the
 * parent's layout contract.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  config: RevealConfig & { className?: string } = {},
) {
  const { amount, once, className = "", ...rest } = config;
  const { ref, inView } = useInView<T>({ amount, once });
  return { ref, inView, ...bindings(rest, inView, className) };
}

type RevealProps = RevealConfig & {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Convenience wrapper for the common case of revealing a block of content. */
export function Reveal({ className = "", style, children, ...config }: RevealProps) {
  const { ref, ...bound } = useReveal<HTMLDivElement>({ ...config, className });
  return (
    <div ref={ref} className={bound.className} style={{ ...bound.style, ...style }}>
      {children}
    </div>
  );
}

type RevealTextProps = {
  text: string;
  /** Rendered element for each line. Lines split on `\n`. */
  className?: string;
  delay?: number;
  stagger?: number;
};

/**
 * Line-by-line masked reveal. Each line slides out from behind its own overflow mask,
 * which reads far more deliberate than fading the whole heading at once.
 */
export function RevealLines({ text, className = "", delay = 0, stagger = 90 }: RevealTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ amount: 0.3 });
  const lines = text.split("\n");

  return (
    <span ref={ref} className={`reveal-lines ${inView ? "is-inview" : ""} ${className}`.trim()}>
      {lines.map((line, index) => (
        <span className="reveal-lines__mask" key={`${line}-${index}`}>
          <span
            className="reveal-lines__line"
            style={{ "--reveal-delay": `${delay + index * stagger}ms` } as CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
