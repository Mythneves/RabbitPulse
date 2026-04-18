import type { ReactNode } from "react";
import { Reveal } from "@/components/effects/Reveal";

type PageHeroProps = {
  /** Tiny uppercase label that sits above the headline. e.g. "Chapter 01". */
  eyebrow: string;
  /** The big page title. Strings are fine; ReactNode allows a `<span class="rp-grad">` accent. */
  title: ReactNode;
  /** Short tagline rendered below the title. */
  subtitle?: ReactNode;
};

/**
 * Shared hero band used at the top of every chapter page.
 * Sits below the fixed header and uses the existing reveal animation.
 */
export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="rp-page-hero">
      <Reveal className="rp-page-hero-inner">
        <div className="rp-section-label rp-section-label-center">{eyebrow}</div>
        <h1 className="rp-page-hero-title">{title}</h1>
        {subtitle ? <p className="rp-page-hero-sub">{subtitle}</p> : null}
      </Reveal>
    </section>
  );
}
