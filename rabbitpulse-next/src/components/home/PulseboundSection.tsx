import { Reveal } from "@/components/effects/Reveal";
import { PulseboundCard } from "./PulseboundCard";

const RABBITS = [
  {
    imageSrc: "/images/sefer.png",
    name: "Sefer",
    title: "The Scrollkeeper",
    icon: "📜",
    description:
      "The Scrollkeeper of hidden truths. He reveals the world through ancient scrolls that only the worthy can read.",
  },
  {
    imageSrc: "/images/janus.png",
    name: "Janus",
    title: "The Gatekeeper",
    icon: "⚜",
    description:
      "The Gatekeeper of every threshold. He stands where new paths become possible and old ones dissolve.",
  },
  {
    imageSrc: "/images/seidr.png",
    name: "Seidr",
    title: "The Echo Print Engineer",
    icon: "☾",
    description:
      "The Echo Print Engineer. He appears when permissions and ingredients can be converged into a coherent Echo Print.",
  },
  {
    imageSrc: "/images/dejitaru.png",
    name: "Dejitaru",
    title: "The Digital Architect",
    icon: "φ",
    description:
      "The Digital Architect of the system. He manifests when the interface itself evolves and hidden structures become visible.",
  },
] as const;

export function PulseboundSection() {
  return (
    <section id="soulbound" className="rp-pulsebound-section">
      <Reveal className="rp-pulsebound-header">
        <div className="rp-section-label">Chapter 04</div>
        <h2>
          Meet the
          <br />
          <span className="rp-grad">Pulsebound</span>
          <br />
          Rabbits
        </h2>
        <p>
          Four guardians of the Pulse. Each one a living fragment of the
          legend. Click to reveal their nature.
        </p>
      </Reveal>

      <div className="rp-pulsebound-grid">
        {RABBITS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.1}>
            <PulseboundCard {...r} />
          </Reveal>
        ))}
      </div>

      <Reveal className="rp-flip-hint-bar">tap to reveal</Reveal>
    </section>
  );
}
