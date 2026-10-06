import type Lenis from "lenis";

let activeLenis: Lenis | null = null;

/** Exponential ease-out. Long tail, no visible settle step. */
export const silkEase = (value: number) => Math.min(1, 1.001 - Math.pow(2, -10 * value));

/** Sticky header clearance used when scrolling to an anchor. */
const DEFAULT_OFFSET = -76;

export function setActiveLenis(instance: Lenis | null) {
  activeLenis = instance;
}

export function setScrollPaused(paused: boolean) {
  if (!activeLenis) return;
  if (paused) activeLenis.stop();
  else activeLenis.start();
}

type ScrollOptions = {
  /** Jump without animating. */
  immediate?: boolean;
  /** Write the target into the address bar and history. */
  pushHash?: boolean;
  /** Pixel offset applied to the target position; negative scrolls further up. */
  offset?: number;
};

/**
 * Scroll to an absolute document offset.
 *
 * Needed for sticky-stacked content: once a `position: sticky` element is pinned, its
 * bounding rect reports the pinned position rather than its place in the flow, so
 * resolving a target by element would jump to the wrong offset.
 */
export function scrollToPosition(top: number, options: Omit<ScrollOptions, "pushHash"> = {}) {
  const { immediate = false } = options;

  if (activeLenis) {
    activeLenis.scrollTo(Math.max(0, top), {
      duration: immediate ? 0 : 1.1,
      easing: silkEase,
      force: true,
    });
    return;
  }

  window.scrollTo({ top: Math.max(0, top), behavior: immediate ? "auto" : "smooth" });
}

export function scrollToTarget(target: string, options: ScrollOptions = {}) {
  const element = document.querySelector<HTMLElement>(target);
  if (!element) return false;

  const { immediate = false, pushHash = true, offset } = options;
  const isTop = target === "#home" || target === "#main-content";
  const resolvedOffset = offset ?? (isTop ? 0 : DEFAULT_OFFSET);

  if (pushHash) window.history.pushState(null, "", target);

  if (activeLenis) {
    activeLenis.scrollTo(element, {
      duration: immediate ? 0 : 1.45,
      easing: silkEase,
      offset: resolvedOffset,
      force: true,
    });
    return true;
  }

  if (immediate) {
    element.scrollIntoView({ behavior: "auto", block: "start" });
    return true;
  }

  // Native fallback still needs the offset applied manually.
  const top = element.getBoundingClientRect().top + window.scrollY + resolvedOffset;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}
