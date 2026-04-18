"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Direction the children fade in from. */
  direction?: "up" | "left" | "right";
  /** Delay before the animation starts (in seconds). */
  delay?: number;
  className?: string;
  /** Render as a different element. Defaults to <div>. */
  as?: "div" | "section" | "article";
};

/**
 * Generic scroll-reveal wrapper. Replaces the IntersectionObserver
 * logic that lived inline in the original index.html.
 *
 * Adds the `is-visible` class once the element enters the viewport,
 * then unobserves it (one-shot, like the original).
 */
export function Reveal({
  children,
  direction = "up",
  delay,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const baseClass =
    direction === "left"
      ? "rp-reveal-left"
      : direction === "right"
        ? "rp-reveal-right"
        : "rp-reveal";
  const finalClass = className ? `${baseClass} ${className}` : baseClass;
  const style = delay ? { transitionDelay: `${delay}s` } : undefined;

  if (as === "section") {
    return (
      <section
        ref={ref as React.Ref<HTMLElement>}
        className={finalClass}
        style={style}
      >
        {children}
      </section>
    );
  }
  if (as === "article") {
    return (
      <article
        ref={ref as React.Ref<HTMLElement>}
        className={finalClass}
        style={style}
      >
        {children}
      </article>
    );
  }
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={finalClass}
      style={style}
    >
      {children}
    </div>
  );
}
