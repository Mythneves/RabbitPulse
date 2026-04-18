import { Hero } from "@/components/home/Hero";
import { OriginSection } from "@/components/home/OriginSection";
import { PulseStatement } from "@/components/home/PulseStatement";
import { FactionDivider } from "@/components/home/FactionDivider";
import { FactionsSection } from "@/components/home/FactionsSection";
import { RabbitHoleSection } from "@/components/home/RabbitHoleSection";
import { PulseboundSection } from "@/components/home/PulseboundSection";
import { VideoCTA } from "@/components/home/VideoCTA";

export default function Home() {
  return (
    <main>
      <Hero />

      <OriginSection />

      <PulseStatement
        symbol="∞"
        heading={
          <>
            A mythic web3 ecosystem where
            <br />
            <span className="rp-grad">your choices shape dynamic NFTs</span>
          </>
        }
        body="Ride with the Marshal beneath the law or vanish in the dust with the Bikers. Every decision echoes across the chain."
      />

      <FactionDivider />

      <FactionsSection />

      <PulseStatement
        symbol="◈"
        heading={
          <>
            This is a Solana-based web3 project
            <br />
            with <span className="rp-grad">narrative-driven evolution</span>
          </>
        }
        body="Only those ready to lose the map will find the entrance with intuition."
      />

      <RabbitHoleSection />

      <PulseboundSection />

      <VideoCTA />
    </main>
  );
}
