import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/page/PageContainer";
import { PageHero } from "@/components/page/PageHero";
import { LoreSection } from "@/components/page/LoreSection";
import { PullQuote } from "@/components/page/PullQuote";
import { BackToHome } from "@/components/page/BackToHome";

export const metadata: Metadata = {
  title: "About",
  description:
    "What RabbitPulse is, what it is not, and why it lives on Solana.",
};

export default function AboutPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="About"
        title={
          <>
            The <span className="rp-grad">project</span>
          </>
        }
        subtitle="A short, honest description for the part of the audience that wants the boring version."
      />

      <LoreSection kicker="In one line" heading="What RabbitPulse is">
        <p>
          RabbitPulse is a Solana-based dynamic NFT ecosystem wrapped in a
          mythic narrative. Every holder&apos;s on-chain choices shape both
          their own rabbit and the shared legend — Riders, Bikers, the
          Marshal, the Pulsebound, and the Rabbit Hole.
        </p>
      </LoreSection>

      <LoreSection
        kicker="In one paragraph"
        heading="What that means in practice"
        direction="left"
      >
        <p>
          You connect a wallet. You pick a side. You mint a rabbit. From that
          point on, the rabbit is yours to steer — and your decisions are
          permanently recorded as part of the wider story. Lore unfolds in
          chapters; characters react to what holders collectively do; and
          certain hidden mechanics are reserved for those who notice them.
        </p>
      </LoreSection>

      <PullQuote>
        A web3 project that asks for your <em>attention</em>, not just your
        liquidity.
      </PullQuote>

      <LoreSection
        kicker="Why Solana"
        heading="Speed, cost, and the right culture"
        direction="right"
      >
        <ul>
          <li>Fast finality so reactive lore feels reactive.</li>
          <li>Low fees so curiosity isn&apos;t taxed.</li>
          <li>A culture that already understands narrative-driven collections.</li>
        </ul>
      </LoreSection>

      <LoreSection kicker="What it is not" heading="A few honest caveats">
        <ul>
          <li>Not financial advice. The legend doesn&apos;t pay rent.</li>
          <li>Not a roadmap promise. Lore evolves; the chain decides the rest.</li>
          <li>Not a closed garden. Riders and Bikers are encouraged to build on top.</li>
        </ul>
      </LoreSection>

      <LoreSection
        kicker="Next"
        heading="If you want to step in"
        direction="left"
      >
        <p>
          Read{" "}
          <Link href="/the-marshal" className="rp-grad">
            The Marshal
          </Link>{" "}
          for the origin story, then{" "}
          <Link href="/quest" className="rp-grad">
            the Quest
          </Link>{" "}
          to see what your first ride looks like. When you&apos;re ready,{" "}
          <Link href="/buy" className="rp-grad">
            mint a Pulsebound
          </Link>
          .
        </p>
      </LoreSection>

      <BackToHome />
    </PageContainer>
  );
}
