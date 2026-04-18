import type { Metadata } from "next";
import Image from "next/image";
import { PageContainer } from "@/components/page/PageContainer";
import { PageHero } from "@/components/page/PageHero";
import { LoreSection } from "@/components/page/LoreSection";
import { PullQuote } from "@/components/page/PullQuote";
import { BackToHome } from "@/components/page/BackToHome";
import { Reveal } from "@/components/effects/Reveal";

export const metadata: Metadata = {
  title: "The Rabbit Hole",
  description:
    "Some doors don't open — they widen. The Rabbit Hole is the part of the Pulse that you can only enter by losing your map.",
};

export default function RabbitHolePage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Chapter 03"
        title={
          <>
            The <span className="rp-grad">Rabbit</span> Hole
          </>
        }
        subtitle="The trace doesn't ask for permission. It asks for attention."
      />

      <Reveal className="rp-character-grid" direction="up">
        <article className="rp-character-card" style={{ gridColumn: "1 / -1", maxWidth: 520, margin: "0 auto" }}>
          <div className="rp-character-card-img" style={{ aspectRatio: "3 / 4" }}>
            <Image
              src="/images/rabbithole.webp"
              alt="Rabbit Hole Runner"
              fill
              sizes="(max-width: 720px) 100vw, 520px"
            />
          </div>
          <div className="rp-character-card-body">
            <h3 className="rp-character-card-name">The Runner</h3>
            <p className="rp-character-card-title">Witness of the trace</p>
            <p>
              They rarely return whole. The ones who do bring back a pattern —
              never a story.
            </p>
          </div>
        </article>
      </Reveal>

      <LoreSection
        kicker="What it is not"
        heading="It isn't a dungeon. It isn't a level."
      >
        <p>
          The Rabbit Hole isn&apos;t a screen you unlock or a room you walk
          into. It&apos;s the part of the system that resists being looked at
          directly. The closer you stare at it, the more it seems to look back.
        </p>
      </LoreSection>

      <PullQuote attribution="A returned Runner">
        It wasn&apos;t deeper. It was <em>wider</em>. Like the chain had a
        margin no one was reading.
      </PullQuote>

      <LoreSection
        kicker="What it is"
        heading="A second chain inside the chain"
        direction="left"
      >
        <p>
          Holders who notice the trace can choose to follow it. There is no
          quest log, no clear reward, and no guarantee of return. The rabbits
          that pass through it come back changed — sometimes visually,
          sometimes only the chain knows.
        </p>
        <p>
          <strong>What you bring out of the hole is yours.</strong> What it
          keeps is the part of you that wasn&apos;t looking.
        </p>
      </LoreSection>

      <LoreSection
        kicker="How to find it"
        heading="Don't"
        direction="right"
      >
        <p>
          The hole is found by the people who stop searching. Following maps,
          datasets, charts, leaderboards — none of those reveal it. Intuition
          does. Whether that&apos;s a feature or a warning depends on which
          side of the dust you ride on.
        </p>
      </LoreSection>

      <BackToHome />
    </PageContainer>
  );
}
