"use client";

import { useEffect, useRef } from "react";

/**
 * Custom RabbitPulse cursor: a small aqua dot + a larger ring that
 * eases toward the pointer. Hovering interactive elements swaps the
 * palette and grows both elements.
 *
 * Hidden on touch devices via the `@media (pointer: coarse)` rule
 * in globals.css.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frameId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      if (reduceMotion) {
        ring.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      frameId = requestAnimationFrame(animateRing);
    };

    const interactiveSelector =
      'a, button, [role="button"], .pulsebound-card, .faction-card, [data-cursor="hover"]';
    const onPointerOver = (e: Event) => {
      const target = e.target as Element | null;
      if (target?.closest(interactiveSelector)) {
        dot.classList.add("is-hover");
        ring.classList.add("is-hover");
      }
    };
    const onPointerOut = (e: Event) => {
      const target = e.target as Element | null;
      if (target?.closest(interactiveSelector)) {
        dot.classList.remove("is-hover");
        ring.classList.remove("is-hover");
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    if (!reduceMotion) frameId = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="rp-cursor-dot" aria-hidden />
      <div ref={ringRef} className="rp-cursor-ring" aria-hidden />
    </>
  );
}
