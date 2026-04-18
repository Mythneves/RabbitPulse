import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/effects/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function RabbitHoleSection() {
  return (
    <section id="rabbit-hole" className="rp-rabbit-hole-section">
      <div className="rp-rabbit-hole-inner">
        <Reveal direction="left" className="rp-rabbit-hole-title">
          <div className="rp-section-label">Chapter 03</div>
          <h2>
            The
            <br />
            <span className="rp-grad">Rabbit</span>
            <br />
            Hole
          </h2>
        </Reveal>

        <Reveal direction="right" className="rp-rabbit-hole-visual">
          <div className="rp-rabbit-hole-glow" aria-hidden />
          <div className="rp-rabbit-hole-glow-2" aria-hidden />
          <div className="rp-rabbit-hole-frame">
            <Image
              src="/images/rabbithole.png"
              alt="Rabbit Hole Runner"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </Reveal>

        <Reveal direction="left" className="rp-rabbit-hole-body">
          <p>
            Faint, unfamiliar, and impossible to ignore. Those who follow it
            don&apos;t always know why — only that{" "}
            <strong>something beneath the surface has shifted.</strong>
          </p>
          <p>
            What unfolds beyond that point cannot be explained in advance.
            Shapes bend, meaning flickers, and the usual ways of seeing no
            longer hold.
          </p>
          <p>
            Once you&apos;ve seen its trace, you either step forward —{" "}
            <strong>or spend the rest of your journey wondering how deep it truly goes.</strong>
          </p>
          <Link className="rp-btn-primary rp-mt-6" href="/rabbit-hole">
            Enter the Hole
            <ArrowIcon />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
