import type { Metadata } from "next";
import { PageContainer } from "@/components/page/PageContainer";
import { PageHero } from "@/components/page/PageHero";
import { LoreSection } from "@/components/page/LoreSection";
import { BackToHome } from "@/components/page/BackToHome";
import { WalletTestPanel } from "./WalletTestPanel";

export const metadata: Metadata = {
  title: "Wallet test",
  description:
    "Internal Phase 6 page for verifying the Solana wallet adapter wiring.",
  robots: { index: false, follow: false },
};

/**
 * Phase 6 verification page. Shows:
 *   - Configured cluster + RPC endpoint
 *   - Connect / disconnect controls (via the same modal as production)
 *   - Connected address (full + short form, with a copy button)
 *   - Live SOL balance (subscribes to account updates)
 *
 * Intentionally `noindex` — this is for diagnostics, not for visitors.
 */
export default function WalletTestPage() {
  return (
    <PageContainer>
      <PageHero
        eyebrow="Phase 6"
        title={
          <>
            Wallet <span className="rp-grad">test</span>
          </>
        }
        subtitle="Internal page. If everything below is green, the Solana wiring is healthy."
      />

      <LoreSection kicker="Status" heading="Live state">
        <WalletTestPanel />
      </LoreSection>

      <BackToHome />
    </PageContainer>
  );
}
