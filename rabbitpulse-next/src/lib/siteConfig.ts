/**
 * Centralized site configuration.
 * Update links / labels here once instead of touching every component.
 */

export const siteConfig = {
  name: "RabbitPulse",
  url: "https://rabbitpulse.com",
  description:
    "A mythic Solana web3 universe of dynamic NFTs, faction warfare, and deep narrative lore. Only those who listen to the chain will feel the Pulse.",
} as const;

export type NavLink = {
  href: string;
  label: string;
  /** Visually styled as the call-to-action pill. */
  cta?: boolean;
};

export const navLinks: NavLink[] = [
  { href: "/the-marshal", label: "The Marshal" },
  { href: "/riders-bikers", label: "Riders & Bikers" },
  { href: "/quest", label: "The Quest" },
  { href: "/rabbit-hole", label: "The Rabbit Hole" },
  { href: "/campfire", label: "Campfire" },
  { href: "/about", label: "About" },
  { href: "/buy", label: "Buy $RPUL", cta: true },
];

export type SocialLink = {
  href: string;
  label: string;
  icon: string;
};

export const socialLinks: SocialLink[] = [
  { href: "https://x.com/", label: "X", icon: "/images/x-twitter.png" },
  { href: "https://discord.com/", label: "Discord", icon: "/images/discord.png" },
  {
    href: "https://warpcast.com/",
    label: "Farcaster",
    icon: "/images/farcaster.png",
  },
];
