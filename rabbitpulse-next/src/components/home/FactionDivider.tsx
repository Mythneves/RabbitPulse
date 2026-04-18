import { Reveal } from "@/components/effects/Reveal";

export function FactionDivider() {
  return (
    <Reveal className="rp-faction-divider">
      <div className="rp-faction-divider-line" />
      <span className="rp-faction-divider-text">Choose your faction</span>
      <div className="rp-faction-divider-line" />
    </Reveal>
  );
}
