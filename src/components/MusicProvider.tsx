"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { musicTrack } from "@/data/wedding";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

const TARGET_VOLUME = 0.28;
const FADE_IN_MS = 1800;
const FADE_OUT_MS = 620;

/**
 * When the guest comes back to the tab, pick the track up where it left off if they
 * had it playing. Set this to `false` to make leaving the app stop the music for good,
 * requiring a fresh tap on the dock control.
 */
const RESUME_ON_RETURN = true;

type MusicApi = {
  /** True from the moment playback is requested, so controls never feel laggy. */
  playing: boolean;
  /** False once the browser reports the file cannot be loaded or decoded. */
  available: boolean;
  title: string;
  /** Must be called inside a user gesture the first time, or autoplay policy blocks it. */
  start: () => void;
  stop: () => void;
  toggle: () => void;
};

const MusicContext = createContext<MusicApi | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef(0);
  /**
   * iOS makes `HTMLMediaElement.volume` read-only: playback always follows the hardware
   * volume. Detected once at setup so the fades are skipped rather than silently
   * delaying pause by their duration while nothing audible changes.
   */
  const canFadeRef = useRef(true);
  const resumeRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    const metered = saveData || window.matchMedia("(pointer: coarse)").matches;

    const element = new Audio(musicTrack.src);
    // Desktop buffers ahead so the track starts the instant the invitation opens. On
    // phones and metered connections only metadata is fetched up front; a few hundred
    // milliseconds of buffering is a fair trade for not pulling 4 MB over cellular.
    element.preload = metered ? "metadata" : "auto";
    element.loop = true;

    element.volume = 0;
    canFadeRef.current = element.volume === 0;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleError = () => {
      setAvailable(false);
      setPlaying(false);
    };

    element.addEventListener("play", handlePlay);
    element.addEventListener("pause", handlePause);
    element.addEventListener("error", handleError);
    audioRef.current = element;

    return () => {
      window.cancelAnimationFrame(fadeRef.current);
      element.pause();
      element.removeEventListener("play", handlePlay);
      element.removeEventListener("pause", handlePause);
      element.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, []);

  const fadeVolume = useCallback((to: number, duration: number, onComplete?: () => void) => {
    const element = audioRef.current;
    if (!element) return;

    window.cancelAnimationFrame(fadeRef.current);

    if (!canFadeRef.current) {
      onComplete?.();
      return;
    }

    const from = element.volume;
    const startedAt = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.volume = Math.min(1, Math.max(0, from + (to - from) * eased));
      if (progress < 1) {
        fadeRef.current = window.requestAnimationFrame(step);
        return;
      }
      onComplete?.();
    };

    fadeRef.current = window.requestAnimationFrame(step);
  }, []);

  const start = useCallback(() => {
    const element = audioRef.current;
    if (!element || !available) return;

    setPlaying(true);
    // Kept synchronous so the call stays inside the originating user gesture.
    const attempt = element.play();
    if (!attempt) {
      fadeVolume(TARGET_VOLUME, FADE_IN_MS);
      return;
    }

    attempt
      .then(() => fadeVolume(TARGET_VOLUME, FADE_IN_MS))
      .catch((error: unknown) => {
        setPlaying(false);
        // A blocked autoplay attempt is recoverable: the dock control can start it later.
        if (error instanceof DOMException && error.name === "NotAllowedError") return;
        setAvailable(false);
      });
  }, [available, fadeVolume]);

  const stop = useCallback(() => {
    const element = audioRef.current;
    if (!element) return;
    setPlaying(false);
    fadeVolume(0, FADE_OUT_MS, () => element.pause());
  }, [fadeVolume]);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start();
  }, [playing, start, stop]);

  /**
   * Silence the invitation whenever it is not on screen: switching apps, moving to
   * another tab, locking the phone, or navigating away. `visibilitychange` is what fires
   * on an iOS screen lock or app switch; `pagehide` covers navigation and tab close, and
   * `freeze` covers a background tab being discarded on Android Chrome. Without this the
   * track keeps playing out of a pocketed phone.
   *
   * The pause here is immediate rather than faded, because timers and animation frames
   * are throttled or stopped outright once the page is hidden, so a fade would never
   * finish and the audio would keep going.
   */
  useEffect(() => {
    const silence = () => {
      const element = audioRef.current;
      if (!element) return;
      window.cancelAnimationFrame(fadeRef.current);
      resumeRef.current = !element.paused;
      element.pause();
      if (canFadeRef.current) element.volume = 0;
      setPlaying(false);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        silence();
        return;
      }
      if (!RESUME_ON_RETURN || !resumeRef.current) return;
      resumeRef.current = false;
      start();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", silence);
    document.addEventListener("freeze", silence);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", silence);
      document.removeEventListener("freeze", silence);
    };
  }, [start]);

  const value = useMemo<MusicApi>(
    () => ({ playing, available, title: musicTrack.title, start, stop, toggle }),
    [playing, available, start, stop, toggle],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used inside a MusicProvider");
  return context;
}
