"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type MagneticProps = {
  children: ReactNode;
  /** Maximum pixel offset toward the pointer. */
  strength?: number;
  className?: string;
};

/**
 * Subtle magnetic pull toward the cursor. Only active on hover-capable pointers; touch
 * devices render a plain wrapper so nothing competes with scrolling or tap targets.
 */
export function Magnetic({ children, strength = 10, className = "" }: MagneticProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHoverCapable(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleMove = useCallback(
    (event: ReactPointerEvent<HTMLSpanElement>) => {
      const node = nodeRef.current;
      if (!node) return;
      const bounds = node.getBoundingClientRect();
      const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      node.style.setProperty("--magnet-x", `${(offsetX * strength).toFixed(2)}px`);
      node.style.setProperty("--magnet-y", `${(offsetY * strength).toFixed(2)}px`);
    },
    [strength],
  );

  const handleLeave = useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    node.style.setProperty("--magnet-x", "0px");
    node.style.setProperty("--magnet-y", "0px");
  }, []);

  return (
    <span
      ref={nodeRef}
      className={`magnetic ${className}`.trim()}
      {...(hoverCapable ? { onPointerMove: handleMove, onPointerLeave: handleLeave } : {})}
    >
      {children}
    </span>
  );
}
