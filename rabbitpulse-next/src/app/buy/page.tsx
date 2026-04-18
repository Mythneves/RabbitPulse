import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/page/PageContainer";
import { PageHero } from "@/components/page/PageHero";
import { LoreSection } from "@/components/page/LoreSection";
import { BackToHome } from "@/components/page/BackToHome";
import { Reveal } from "@/components/effects/Reveal";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";

export const metadata: Metadata = {
  title: "Buy $RPUL",
  description:
    "Connect your wallet and mint a Pulsebound rabbit. Pick your faction and join the legend.",
};

export default function BuyPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Buy $RPUL"
        title={
          <>
            Mint a <span className="rp-grad">Pulsebound</span>
          </>
        }
        subtitle="The mint itself is the choice. Pick your faction, sign the dust, and join the legend."
      />

      <Reveal className="rp-buy-summary">
        <div className="rp-buy-stat">
          <p className="rp-buy-stat-label">Network</p>
          <p className="rp-buy-stat-value">Solana</p>
        </div>
        <div className="rp-buy-stat">
          <p className="rp-buy-stat-label">Standard</p>
          <p className="rp-buy-stat-value-muted">Dynamic NFT</p>
        </div>
        <div className="rp-buy-stat">
          <p className="rp-buy-stat-label">Status</p>
          <p className="rp-buy-stat-value-muted">Coming soon</p>
        </div>
      </Reveal>

      <Reveal className="rp-cta-row">
        <ConnectWalletButton />
        <Link href="/the-marshal" className="rp-btn-ghost">
          Read the lore first
        </Link>
      </Reveal>

      <LoreSection kicker="The plan" heading="Three tiers, one Pulse">
        <p>
          The full mint is being designed alongside the lore. The shape today
          looks roughly like this — final numbers, prices, and timing land
          before mint day.
        </p>
        <div className="rp-tier-grid">
          <div className="rp-tier-card">
            <h4>Pulsebound</h4>
            <p className="rp-tier-meta">Public mint</p>
            <p>
              The base tier. Pick a side, name your rabbit, ride the dust.
              Every Pulsebound shapes the wider chain over time.
            </p>
          </div>
          <div className="rp-tier-card">
            <h4>Sheriff&apos;s Spur</h4>
            <p className="rp-tier-meta">Riders allowlist</p>
            <p>
              For the Riders who keep showing up. Confers governance weight on
              Order-side decisions and access to Marshal-only chapters.
            </p>
          </div>
          <div className="rp-tier-card">
            <h4>Black Stallion</h4>
            <p className="rp-tier-meta">Bikers allowlist</p>
            <p>
              For the Bikers who ride loudest. Unlocks Rabbit Hole entry
              tokens and triggers chaos events visible to the whole chain.
            </p>
          </div>
        </div>
      </LoreSection>

      <LoreSection
        kicker="Wallet support"
        heading="What you'll be able to connect"
        direction="left"
      >
        <p>
          The wallet modal currently picks between Phantom, Solflare, and
          Ledger. The real, signed connection (devnet first, then mainnet)
          ships in <strong>Phase 6</strong> of the migration — until then the
          buttons are a faithful preview of the flow.
        </p>
      </LoreSection>

      <p className="rp-disclaimer">
        Not financial advice · Mint date TBA · Read the{" "}
        <Link href="/about" className="rp-grad">
          About
        </Link>{" "}
        page for caveats
      </p>

      <BackToHome />
    </PageContainer>
  );
}
