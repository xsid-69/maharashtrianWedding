import { blessings, wedding } from "@/data/wedding";

export function CeremonialOrbit({ className = "" }: { className?: string }) {
  return (
    <div className={`ceremonial-orbit ${className}`} aria-hidden="true">
      <div className="ceremonial-orbit__stage">
        <span className="ceremonial-orbit__halo" />
        <span className="ceremonial-orbit__ring ceremonial-orbit__ring--outer" />
        <span className="ceremonial-orbit__ring ceremonial-orbit__ring--inner" />
        <span className="ceremonial-orbit__gem ceremonial-orbit__gem--one" />
        <span className="ceremonial-orbit__gem ceremonial-orbit__gem--two" />
        <span className="ceremonial-orbit__gem ceremonial-orbit__gem--three" />
        <span className="ceremonial-orbit__heart">
          <small className="orbit-om">ॐ</small>
          <span className="orbit-couple">{wedding.groom.charAt(0)}<span>♥</span>{wedding.bride.charAt(0)}</span>
        </span>
      </div>
    </div>
  );
}

function BlessingGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="blessing-marquee__group" aria-hidden={hidden || undefined}>
      {blessings.map((blessing) => (
        <span key={blessing} className="blessing-item">
          {blessing}
          <i aria-hidden="true" className="blessing-dot">✦</i>
        </span>
      ))}
    </div>
  );
}

export function BlessingMarquee() {
  return (
    <aside className="blessing-marquee" aria-label="महाराष्ट्रीयन विवाह मंगल आशीर्वाद">
      <div className="blessing-marquee__track">
        <BlessingGroup />
        <BlessingGroup hidden />
      </div>
    </aside>
  );
}
