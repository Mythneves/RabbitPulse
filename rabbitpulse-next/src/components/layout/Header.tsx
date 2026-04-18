"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/siteConfig";

/**
 * Site header: logo + main nav. Picks up a frosted background on scroll.
 *
 * Mobile (<= 1100px): the nav collapses behind a hamburger that toggles
 * a dropdown drawer + dimming overlay (matches the original behavior).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (open) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div
        className={`rp-nav-overlay${open ? " is-visible" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <header className={`rp-header${scrolled ? " is-scrolled" : ""}`}>
        <Link href="/" className="rp-logo" aria-label="RabbitPulse home">
          <Image
            src="/images/myLogo.webp"
            alt="RabbitPulse"
            width={130}
            height={130}
            priority
          />
        </Link>

        <button
          type="button"
          className="rp-menu-toggle"
          aria-controls="rp-site-nav"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="rp-menu-bars" aria-hidden />
        </button>

        <nav
          id="rp-site-nav"
          className={`rp-site-nav${open ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.cta ? "rp-nav-link rp-nav-cta" : "rp-nav-link"}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
