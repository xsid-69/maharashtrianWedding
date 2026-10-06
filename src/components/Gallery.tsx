"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GracefulImage } from "@/components/GracefulImage";
import { Reveal, RevealLines, useReveal } from "@/components/ui/Reveal";
import { gallery, type GalleryImage } from "@/data/wedding";
import styles from "./Gallery.module.css";

function GalleryFrame({ image, index }: { image: GalleryImage; index: number }) {
  const { ref, className, style } = useReveal<HTMLDivElement>({
    variant: "clip",
    amount: 0.25,
    className: styles.photo,
  });

  return (
    <figure className={`${styles.frame} ${styles[image.aspect]}`} data-index={index}>
      <div ref={ref} className={className} style={style}>
        <GracefulImage
          src={image.src}
          fallback={image.fallback}
          alt={image.alt}
          fill
          sizes="(max-width: 767px) 84vw, 44vw"
        />
      </div>
      <figcaption>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <p>{image.alt}</p>
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (Number.isFinite(index)) setActiveIndex(index);
      },
      { root: track, threshold: [0.55, 0.72] },
    );

    Array.from(track.children).forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const nextIndex = (index + gallery.length) % gallery.length;
    const item = track?.children[nextIndex] as HTMLElement | undefined;
    if (!track || !item) return;

    const left = item.offsetLeft - (track.clientWidth - item.clientWidth) / 2;
    track.scrollTo({ left, behavior: "smooth" });
    setActiveIndex(nextIndex);
  };

  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-title">
      <header className={`page-shell ${styles.header}`}>
        <div>
          <Reveal variant="blur" className={styles.kicker}>
            ॥ छायाचित्रे • सुखद आठवणी ॥
          </Reveal>
          <h2 id="gallery-title">
            <RevealLines text={"सोहळ्याचा सुरेख मांडव\nआणि अनमोल क्षण"} />
          </h2>
        </div>
        <Reveal variant="up" delay={160}>
          <p>हळुवार स्क्रोल करा. प्रत्येक छायाचित्रात दडलेली आहे एका नव्या प्रवासाची गोड साक्ष.</p>
        </Reveal>
      </header>

      <div ref={trackRef} className={styles.reel} aria-label="विवाह छायाचित्रे">
        {gallery.map((image, index) => (
          <GalleryFrame key={image.id} image={image} index={index} />
        ))}
      </div>

      <div className={`page-shell ${styles.controls}`}>
        <p aria-live="polite">
          <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
          <span>/ {String(gallery.length).padStart(2, "0")}</span>
        </p>
        <div>
          <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="मागील छायाचित्र">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="पुढील छायाचित्र">
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
