"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { DecorativeMandala, GaneshaMotif } from "@/components/Decorations";
import { wedding } from "@/data/wedding";
import { scrollToTarget, setScrollPaused } from "@/lib/lenis";

const links = [
  { label: "मुख्य", target: "#home" },
  { label: "वधू-वर", target: "#couple" },
  { label: "रेशीमगाठ", target: "#story" },
  { label: "विवाह विधी", target: "#events" },
  { label: "छायाचित्रे", target: "#gallery" },
  { label: "विवाह स्थळ", target: "#venue" },
  { label: "उपस्थिती", target: "#rsvp" },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    setScrollPaused(open);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("menu-open");
      setScrollPaused(false);
    };
  }, [open]);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };

    const request = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", request, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.target))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigate = (target: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    setActive(target);
    window.requestAnimationFrame(() => scrollToTarget(target));
  };

  return (
    <>
      <nav
        className={`desktop-nav${scrolled ? " is-scrolled" : ""}`}
        aria-label="मुख्य मार्गनिर्देशन"
      >
        <a
          className="nav-monogram"
          href="#home"
          onClick={navigate("#home")}
          aria-label="ओंकार आणि समृद्धी - मुख्य पृष्ठ"
        >
          ओं <span>♥</span> स
        </a>
        <div className="desktop-nav-links">
          {links.slice(1).map((link) => (
            <a
              key={link.target}
              href={link.target}
              onClick={navigate(link.target)}
              data-active={active === link.target ? "true" : undefined}
              aria-current={active === link.target ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <button
        ref={toggleRef}
        className={`mobile-menu-button${open ? " is-open" : ""}${scrolled ? " is-scrolled" : ""}`}
        type="button"
        aria-label={open ? "मेनू बंद करा" : "मेनू उघडा"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
      </button>

      <div
        id="mobile-navigation"
        className={`mobile-nav-overlay${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <DecorativeMandala className="mobile-nav-ornament" />
        <div className="mobile-nav-inner">
          <GaneshaMotif size={48} className="mobile-nav-ganesha" />
          <p>{wedding.groom} आणि {wedding.bride}</p>
          <nav aria-label="मोबाईल मार्गनिर्देशन">
            {links.map((link) => (
              <a
                className="mobile-nav-link"
                key={link.target}
                href={link.target}
                onClick={navigate(link.target)}
                data-active={active === link.target ? "true" : undefined}
                aria-current={active === link.target ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <span>{wedding.dateMarathi} • {wedding.location}</span>
        </div>
      </div>
    </>
  );
}
