import type { ReactNode } from "react";
import { Reveal } from "@/components/effects/Reveal";

type PulseStatementProps = {
  /** Big background numeral / glyph (e.g. "∞", "◈"). */
  symbol: string;
  heading: ReactNode;
  body: ReactNode;
};

/** The cinematic mid-page text moments between sections. */
export function PulseStatement({ symbol, heading, body }: PulseStatementProps) {
  return (
    <Reveal as="div" className="rp-pulse-statement">
      <div className="rp-pulse-statement-inner">
        <div className="rp-pulse-number" aria-hidden>{symbol}</div>
        <h3>{heading}</h3>
        <p>{body}</p>
      </div>
    </Reveal>
  );
}
