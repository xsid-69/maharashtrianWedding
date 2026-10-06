"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export type WeddingTimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  complete: boolean;
};

export function calculateWeddingTimeLeft(): WeddingTimeLeft {
  const distance = new Date(wedding.isoDate).getTime() - Date.now();
  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, complete: true };
  }

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    complete: false,
  };
}

export function useWeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState<WeddingTimeLeft | null>(null);

  useEffect(() => {
    let timer = 0;

    const schedule = () => {
      setTimeLeft(calculateWeddingTimeLeft());
      const delay = 1000 - (Date.now() % 1000) + 16;
      timer = window.setTimeout(schedule, delay);
    };

    const handleVisibility = () => {
      window.clearTimeout(timer);
      if (!document.hidden) schedule();
    };

    schedule();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return timeLeft;
}
