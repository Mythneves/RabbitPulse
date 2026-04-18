import type { Metadata, Viewport } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { DustCanvas } from "@/components/effects/DustCanvas";
import { FloatingGlyphs } from "@/components/effects/FloatingGlyphs";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { siteConfig } from "@/lib/siteConfig";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "RabbitPulse – The Legend Begins",
    template: "%s | RabbitPulse",
  },
  description:
    "RabbitPulse is a Solana-based dynamic NFT ecosystem where your choices shape evolving rabbits, factions, and a living legend. Ride with the Marshal or vanish with the Bikers.",
  applicationName: siteConfig.name,
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "RabbitPulse – The Legend Begins",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RabbitPulse – The Legend Begins",
    description:
      "A mythic Solana web3 universe where choices shape dynamic NFTs and a shared legend.",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#060608",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        {/* Ambient layers — sit behind everything else */}
        <DustCanvas />
        <FloatingGlyphs />

        {/* Page chrome */}
        <ScrollProgress />
        <Header />

        {/* Page content */}
        <div className="relative z-10 flex flex-1 flex-col">
          {children}
        </div>

        <Footer />

        {/* On top of everything */}
        <NoiseOverlay />
        <CustomCursor />
      </body>
    </html>
  );
}
