"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ShimmerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  /** `gold` reads as a primary action on dark grounds, `ivory` as a quieter secondary. */
  tone?: "gold" | "ivory";
  /** Stretch to the full width of its container. */
  block?: boolean;
};

/**
 * Primary action with a slow light sweep across its surface and a gold hairline that
 * fills on interaction. The sweep is a single transform animation on a pseudo-layer,
 * so it stays on the compositor and pauses under reduced-motion.
 */
export function ShimmerButton({
  children,
  className = "",
  tone = "gold",
  block = false,
  type = "button",
  ...rest
}: ShimmerButtonProps) {
  return (
    <button
      type={type}
      className={[
        "shimmer-button",
        `shimmer-button--${tone}`,
        block ? "shimmer-button--block" : "",
        "pressable",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <span className="shimmer-button__sheen" aria-hidden="true" />
      <span className="shimmer-button__label">{children}</span>
    </button>
  );
}
