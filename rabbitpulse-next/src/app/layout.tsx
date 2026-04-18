import type { Metadata, Viewport } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rabbitpulse.com"),
  title: {
    default: "RabbitPulse – The Legend Begins",
    template: "%s | RabbitPulse",
  },
  description:
    "RabbitPulse is a Solana-based dynamic NFT ecosystem where your choices shape evolving rabbits, factions, and a living legend. Ride with the Marshal or vanish with the Bikers.",
  applicationName: "RabbitPulse",
  appleWebApp: {
    capable: true,
    title: "RabbitPulse",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "RabbitPulse – The Legend Begins",
    description:
      "A mythic Solana web3 universe of dynamic NFTs, faction warfare, and deep narrative lore. Only those who listen to the chain will feel the Pulse.",
    url: "https://rabbitpulse.com",
    siteName: "RabbitPulse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RabbitPulse – The Legend Begins",
    description:
      "A mythic Solana web3 universe where choices shape dynamic NFTs and a shared legend.",
  },
  alternates: {
    canonical: "https://rabbitpulse.com",
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
        {children}
      </body>
    </html>
  );
}
