import Link from "next/link";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";

export function Hero() {
  return (
    <section
      id="hero"
      className="rp-hero"
      aria-label="Hero"
    >
      <div className="rp-hero-bg-glow" aria-hidden />
      <p className="rp-hero-eyebrow">| Solana &middot; Dynamic NFTs &middot; Faction Warfare |</p>
      <h1 id="hero-headline" className="rp-hero-h1">
        <span className="rp-line-grad">RabbitPulse</span>
      </h1>
      <p className="rp-hero-sub">
        Born from a friendship shattered by tragedy, emerged a system disguised as a legend.
        <br />
        Your choices will be written forever on chain.
      </p>
      <div className="rp-hero-actions">
        <ConnectWalletButton />
        <Link href="/the-marshal" className="rp-btn-ghost">
          Discover the Lore
        </Link>
      </div>
      <div className="rp-hero-scroll-hint" aria-hidden>
        <span>Scroll</span>
        <div className="rp-scroll-line" />
      </div>
    </section>
  );
}
