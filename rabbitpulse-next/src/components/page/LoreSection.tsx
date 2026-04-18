import type { ReactNode } from "react";
import { Reveal } from "@/components/effects/Reveal";

type LoreSectionProps = {
  /** Optional kicker label above the heading (e.g. "I — The Fracture"). */
  kicker?: string;
  /** Heading for this section of lore. */
  heading: ReactNode;
  /** Body content — usually one or more <p> blocks. */
  children: ReactNode;
  /** Reveal direction; defaults to "up". */
  direction?: "up" | "left" | "right";
};

/**
 * A single textual block of lore. Composing several of these is enough
 * to build most chapter pages.
 */
export function LoreSection({
  kicker,
  heading,
  children,
  direction = "up",
}: LoreSectionProps) {
  return (
    <Reveal as="section" direction={direction} className="rp-lore-section">
      {kicker ? <div className="rp-lore-kicker">{kicker}</div> : null}
      <h2 className="rp-lore-heading">{heading}</h2>
      <div className="rp-lore-body">{children}</div>
    </Reveal>
  );
}
