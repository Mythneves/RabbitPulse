import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/page/PageContainer";
import { PageHero } from "@/components/page/PageHero";
import { LoreSection } from "@/components/page/LoreSection";
import { BackToHome } from "@/components/page/BackToHome";
import { socialLinks } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Campfire",
  description:
    "Where Riders and Bikers cross paths without crossing swords. The community space of the Pulse.",
};

export default function CampfirePage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Chapter 06"
        title={
          <>
            The <span className="rp-grad">Campfire</span>
          </>
        }
        subtitle="Two factions. One fire. The dust takes a break here."
      />

      <LoreSection kicker="The unwritten rule" heading="Silence is welcome">
        <p>
          The Campfire is the only place along the road where Riders and Bikers
          sit on the same side of the flame. No one keeps score, no one keeps
          rank, and the Pulse hums softer here than anywhere else.
        </p>
        <p>
          You don&apos;t have to talk to belong. You only have to show up.
        </p>
      </LoreSection>

      <LoreSection
        kicker="What you'll find"
        heading="Lore drops, signal threads, and the occasional howl"
        direction="left"
      >
        <ul>
          <li>Behind-the-scenes lore between official chapters.</li>
          <li>Early signal on Pulse events, mints, and Rabbit Hole openings.</li>
          <li>Community traces — what Riders and Bikers are building on top of the Pulse.</li>
          <li>The unfiltered, low-resolution truth of being early to a legend.</li>
        </ul>
      </LoreSection>

      <LoreSection
        kicker="Where to gather"
        heading="Pick a flame and pull up a stone"
        direction="right"
      >
        <div className="rp-cta-row">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rp-btn-ghost"
            >
              {s.label}
            </a>
          ))}
        </div>
        <p>
          If you&apos;re reading this before any of those lights are lit, the
          fire isn&apos;t out — it just hasn&apos;t been struck yet. Check back,
          or follow the road to{" "}
          <Link href="/quest" className="rp-grad">
            the Quest
          </Link>{" "}
          while you wait.
        </p>
      </LoreSection>

      <BackToHome />
    </PageContainer>
  );
}
