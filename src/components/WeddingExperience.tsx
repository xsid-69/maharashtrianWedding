"use client";

import { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MusicProvider } from "@/components/MusicProvider";
import { CountdownProvider } from "@/components/CountdownProvider";
import { Navigation } from "@/components/Navigation";
import { OpeningScreen } from "@/components/OpeningScreen";
import { Hero } from "@/components/Hero";
import { CoupleSection } from "@/components/CoupleSection";
import { StoryTimeline } from "@/components/StoryTimeline";
import { CinematicSection } from "@/components/CinematicSection";
import { CeremonySchedule } from "@/components/CeremonySchedule";
import { Gallery } from "@/components/Gallery";
import { VenueSection } from "@/components/VenueSection";
import { Countdown } from "@/components/Countdown";
import { RSVP } from "@/components/RSVP";
import { ClosingSection } from "@/components/ClosingSection";
import { ExperienceDock } from "@/components/ExperienceDock";
import { BlessingMarquee } from "@/components/PremiumMotion";
import { FloatingPetals } from "@/components/Decorations";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { heroVideo, imageFallbacks, photography } from "@/data/wedding";

export function WeddingExperience() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) return;
    window.requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });
  }, [opened]);

  return (
    <MusicProvider>
      <CountdownProvider>
        <SmoothScroll enabled={opened}>
          <div className="site-frame">
            {!opened && <OpeningScreen onOpen={() => setOpened(true)} />}

            <div className="invitation-page" aria-hidden={!opened} inert={!opened}>
              <a className="skip-link" href="#main-content">
                थेट निमंत्रण पत्रिकेकडे जा
              </a>
              {opened && <ScrollProgress />}
              <Navigation />
              <main id="main-content" tabIndex={-1}>
                <Hero active={opened} video={heroVideo} />
                <BlessingMarquee />
                <CoupleSection />
                <StoryTimeline />
                <CinematicSection
                  src={photography.ceremony}
                  fallback={imageFallbacks.wedding}
                  alt="विवाह सोहळा आणि सप्तपदी"
                  lines={["आणि मग,", "सुरू झाला आमचा सहप्रवास..."]}
                />
                <CeremonySchedule />
                <Gallery />
                <CinematicSection
                  src={photography.celebration}
                  fallback={imageFallbacks.hero}
                  alt="आनंदाचा उत्सव"
                  lines={["एक पवित्र वचन.", "आणि आयुष्यभराची अखंड साथ."]}
                  align="right"
                />
                <VenueSection />
                <Countdown />
                <RSVP />
              </main>
              <ClosingSection />
              {opened && (
                <>
                  <FloatingPetals />
                  <ExperienceDock />
                </>
              )}
            </div>
          </div>
        </SmoothScroll>
      </CountdownProvider>
    </MusicProvider>
  );
}
