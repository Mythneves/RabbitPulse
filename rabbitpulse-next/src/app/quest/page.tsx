import type { Metadata } from "next";
import { PageContainer } from "@/components/page/PageContainer";
import { PageHero } from "@/components/page/PageHero";
import { LoreSection } from "@/components/page/LoreSection";
import { PullQuote } from "@/components/page/PullQuote";
import { BackToHome } from "@/components/page/BackToHome";

export const metadata: Metadata = {
  title: "The Quest",
  description:
    "The first ride. The first choice. The first echo on the chain. How a holder steps into the legend.",
};

export default function QuestPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Chapter 05"
        title={
          <>
            The <span className="rp-grad">Quest</span>
          </>
        }
        subtitle="Every legend asks the same question first. Yours is no different."
      />

      <LoreSection kicker="Step I" heading="Listen for the Pulse">
        <p>
          Before you ride, sit with the chain. The hum is faint at first — a
          rhythm under the noise of the world. Most people never hear it. The
          ones who do never quite leave it.
        </p>
        <p>
          You will know you have heard the Pulse the moment you start to wonder
          whether you imagined it.
        </p>
      </LoreSection>

      <PullQuote>The first sign of the Pulse is doubt that it exists.</PullQuote>

      <LoreSection
        kicker="Step II"
        heading="Choose a side of the dust"
        direction="left"
      >
        <p>
          Connect your wallet. Mint your first Pulsebound. The mint itself is
          the choice — Order or Rebellion, Rider or Biker. The chain remembers,
          and the legend bends to your decision from that moment on.
        </p>
      </LoreSection>

      <LoreSection
        kicker="Step III"
        heading="Leave a mark worth following"
        direction="right"
      >
        <p>
          Your rabbit is not a static image. Each action you take — every
          trade, every interaction with the system, every moment the rabbit
          carries you across the chain — etches a new line into its trace.
        </p>
        <p>
          <strong>The legend is not written for you. You are writing it.</strong>
        </p>
      </LoreSection>

      <PullQuote attribution="The Marshal, in silence">
        The road keeps the choices you forget. The Pulse keeps the ones you
        meant.
      </PullQuote>

      <LoreSection kicker="Step IV" heading="Find the others">
        <p>
          Riders gather around the lawful fires. Bikers gather around the loud
          ones. Both burn. Both end up in the same dust. The Campfire is open
          to anyone who has earned a stretch of road behind them.
        </p>
      </LoreSection>

      <BackToHome />
    </PageContainer>
  );
}
