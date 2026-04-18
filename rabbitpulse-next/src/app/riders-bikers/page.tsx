import type { Metadata } from "next";
import Image from "next/image";
import { PageContainer } from "@/components/page/PageContainer";
import { PageHero } from "@/components/page/PageHero";
import { LoreSection } from "@/components/page/LoreSection";
import { PullQuote } from "@/components/page/PullQuote";
import { BackToHome } from "@/components/page/BackToHome";
import { Reveal } from "@/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Riders & Bikers",
  description:
    "The two factions of the Pulse — Order and Rebellion. Their oaths, their tells, and the threshold between them.",
};

export default function RidersBikersPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Chapter 02"
        title={
          <>
            Riders <span className="rp-grad">&amp;</span> Bikers
          </>
        }
        subtitle="Two factions. One Pulse. The line between them is thinner than the dust."
      />

      <Reveal className="rp-character-grid">
        <article className="rp-character-card">
          <div className="rp-character-card-img">
            <Image
              src="/images/rider.webp"
              alt="The Riders"
              fill
              sizes="(max-width: 720px) 100vw, 420px"
            />
          </div>
          <div className="rp-character-card-body">
            <h3 className="rp-character-card-name">The Riders</h3>
            <p className="rp-character-card-title">Order</p>
            <p>
              Not rebels — rhythm. They ride alongside the Pulse, not against
              it. Each Rider may one day be chosen to wear the Sheriff&apos;s
              spur.
            </p>
          </div>
        </article>

        <article className="rp-character-card is-biker">
          <div className="rp-character-card-img">
            <Image
              src="/images/biker.webp"
              alt="The Bikers"
              fill
              sizes="(max-width: 720px) 100vw, 420px"
            />
          </div>
          <div className="rp-character-card-body">
            <h3 className="rp-character-card-name">The Bikers</h3>
            <p className="rp-character-card-title">Rebellion</p>
            <p>
              Not lawless — uncontained. They ride to disrupt, to remind the
              chain that no order survives without a flame burning at the edge.
            </p>
          </div>
        </article>
      </Reveal>

      <LoreSection kicker="The oath" heading="What every Rider whispers at dawn">
        <ul>
          <li>I do not chase the Pulse — I ride beside it.</li>
          <li>What the Marshal sees, I let stand.</li>
          <li>The dust I raise belongs to the road, not to me.</li>
        </ul>
      </LoreSection>

      <PullQuote attribution="An unnamed Sheriff">
        Order is not silence. Order is the silence between two right notes.
      </PullQuote>

      <LoreSection
        kicker="The flame"
        heading="What every Biker keeps in their tank"
        direction="left"
      >
        <ul>
          <li>The road owes no one.</li>
          <li>If a law cannot survive the dust, it was not a law.</li>
          <li>Burn loud enough that the next traveler hears the echo.</li>
        </ul>
      </LoreSection>

      <LoreSection
        kicker="The threshold"
        heading="Choosing your faction is choosing your tell"
        direction="right"
      >
        <p>
          On chain, the choice is permanent. A Rider can never burn loud enough
          to be a Biker. A Biker can never go still enough to be a Rider. The
          Pulse remembers everything.
        </p>
        <p>
          But the world remembers <strong>both</strong>. And every time the
          chain ticks, the balance between Order and Rebellion is what writes
          the next page of the legend.
        </p>
      </LoreSection>

      <BackToHome />
    </PageContainer>
  );
}
