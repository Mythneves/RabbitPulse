import type { Metadata } from "next";
import Image from "next/image";
import { PageContainer } from "@/components/page/PageContainer";
import { PageHero } from "@/components/page/PageHero";
import { LoreSection } from "@/components/page/LoreSection";
import { PullQuote } from "@/components/page/PullQuote";
import { BackToHome } from "@/components/page/BackToHome";
import { Reveal } from "@/components/effects/Reveal";

export const metadata: Metadata = {
  title: "The Marshal",
  description:
    "The origin of Malko, the silent enforcer of the Pulse, and Cacique, the black stallion that broke the line. Chapter 01 of the RabbitPulse legend.",
};

export default function TheMarshalPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Chapter 01"
        title={
          <>
            The <span className="rp-grad">Marshal</span>
          </>
        }
        subtitle="They rode together once. One shot changed everything."
      />

      <Reveal className="rp-character-grid">
        <article className="rp-character-card">
          <div className="rp-character-card-img">
            <Image
              src="/images/marshal.webp"
              alt="Malko, the Marshal"
              fill
              sizes="(max-width: 720px) 100vw, 420px"
            />
          </div>
          <div className="rp-character-card-body">
            <h3 className="rp-character-card-name">Malko</h3>
            <p className="rp-character-card-title">The Marshal</p>
            <p>
              Once a brother of the dust, now the silent line between order
              and entropy. He keeps no badge — he <em>is</em> the badge.
            </p>
          </div>
        </article>

        <article className="rp-character-card is-biker">
          <div className="rp-character-card-img">
            <Image
              src="/images/cacique.webp"
              alt="Cacique, the Black Stallion"
              fill
              sizes="(max-width: 720px) 100vw, 420px"
            />
          </div>
          <div className="rp-character-card-body">
            <h3 className="rp-character-card-name">Cacique</h3>
            <p className="rp-character-card-title">The Black Stallion</p>
            <p>
              The first to leave the Pulse and the last to forget it. Where
              the Marshal kept the law, Cacique became the storm that breaks
              it open.
            </p>
          </div>
        </article>
      </Reveal>

      <LoreSection
        kicker="I — Before the Fracture"
        heading="They were the same dust"
      >
        <p>
          Long before the legend had a name, two riders shared the same horizon.
          They drank from the same canteen, watched the same suns set, and
          believed — for a while — that the desert had room enough for both.
        </p>
        <p>
          Malko led the Pulse with patience. Cacique followed with fire. Their
          rhythm was different, but the road was the same.
        </p>
      </LoreSection>

      <PullQuote attribution="A traveler, before the fracture">
        Two horses. One trail. The dust didn&apos;t know yet which one to
        remember.
      </PullQuote>

      <LoreSection
        kicker="II — The Shot"
        heading="One sound, and the line was drawn"
        direction="left"
      >
        <p>
          What happened that day is told differently by every mouth. Some say
          it was a misfire. Some say it was a choice. Most agree on only one
          thing: when the dust settled, the road no longer ran for both of
          them.
        </p>
        <p>
          Malko did not chase. He did not mourn. He stayed. And in staying,
          he became something heavier than a man — a presence that the desert
          itself bent around.
        </p>
      </LoreSection>

      <LoreSection
        kicker="III — Now"
        heading="What the Marshal sees"
        direction="right"
      >
        <p>
          The Marshal does not speak. He does not need to. Each Rider that
          rides in his shadow learns to read the silences he leaves between
          one breath and the next. <strong>That is the law of the Pulse.</strong>
        </p>
        <p>
          When the legend asks for a verdict, it is the Marshal&apos;s stillness
          that answers — not his hand.
        </p>
      </LoreSection>

      <BackToHome />
    </PageContainer>
  );
}
