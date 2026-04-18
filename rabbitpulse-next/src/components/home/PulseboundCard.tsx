"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";

type PulseboundCardProps = {
  imageSrc: string;
  name: string;
  title: string;
  icon: string;
  description: string;
  /** Optional CSS transition-delay (in seconds) for the reveal animation. */
};

/**
 * 3D flip card for one Pulsebound rabbit. Tap / click / Enter / Space
 * toggles the flipped state, just like the original.
 */
export function PulseboundCard({
  imageSrc,
  name,
  title,
  icon,
  description,
}: PulseboundCardProps) {
  const [flipped, setFlipped] = useState(false);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };

  return (
    <div className="rp-pulsebound-item">
      <div
        className={`rp-pulsebound-card${flipped ? " is-flipped" : ""}`}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${name} — ${title}. Tap to ${flipped ? "hide" : "reveal"} description.`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={onKey}
      >
        <div className="rp-pulsebound-inner">
          <div className="rp-pulsebound-face rp-pulsebound-front">
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="rp-pulsebound-name-overlay">
              <h3>{name}</h3>
              <span>{title}</span>
            </div>
          </div>
          <div className="rp-pulsebound-face rp-pulsebound-back">
            <div className="rp-back-icon" aria-hidden>{icon}</div>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
