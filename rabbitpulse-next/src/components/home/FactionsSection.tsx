import { Reveal } from "@/components/effects/Reveal";
import { FactionCard } from "./FactionCard";

export function FactionsSection() {
  return (
    <section id="riders-bikers" className="rp-factions-section">
      <Reveal className="rp-factions-header">
        <div className="rp-section-label rp-section-label-center">Chapter 02</div>
        <h2>
          Riders <span className="rp-grad">&amp;</span> Bikers
        </h2>
      </Reveal>

      <div className="rp-factions-grid">
        <Reveal direction="left">
          <FactionCard
            imageSrc="/images/rider.webp"
            imageAlt="The Riders"
            tag="Order"
            tagVariant="rider"
            title="The Riders"
            description="The Riders are not rebels — they are rhythm. They roam the desert not to rule, but to ride alongside the Pulse, upholding order in the shadow of the Marshal. Each Rider may one day be chosen to become a Sheriff."
            ctaLabel="Learn More"
            ctaHref="/riders-bikers"
          />
        </Reveal>
        <Reveal direction="right">
          <FactionCard
            imageSrc="/images/biker.webp"
            imageAlt="The Bikers"
            tag="Rebellion"
            tagVariant="biker"
            title="The Bikers"
            description="The Bikers are not defined by law — they are the pulse of rebellion. Roaming the land, they ride to disrupt, not to control. Raw, untamed, and unstoppable — they ignite the flame wherever they go."
            ctaLabel="Begin the Quest"
            ctaHref="/quest"
          />
        </Reveal>
      </div>
    </section>
  );
}
