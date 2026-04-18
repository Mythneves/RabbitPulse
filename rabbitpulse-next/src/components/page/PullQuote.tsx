import type { ReactNode } from "react";
import { Reveal } from "@/components/effects/Reveal";

type PullQuoteProps = {
  children: ReactNode;
  attribution?: string;
};

/** Cinematic centered quote used between lore sections. */
export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <Reveal className="rp-pull-quote">
      <blockquote>
        <p>{children}</p>
        {attribution ? (
          <footer>— {attribution}</footer>
        ) : null}
      </blockquote>
    </Reveal>
  );
}
