import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/effects/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function OriginSection() {
  return (
    <Reveal as="section" className="rp-origin-section">
      <div id="marshal" className="rp-origin-anchor" aria-hidden />

      <div className="rp-origin-header">
        <div className="rp-section-label">Chapter 01</div>
        <h2>
          <span className="rp-origin-line-1">They rode together once.</span>
          <span className="rp-origin-line-2">One shot changed everything.</span>
        </h2>
      </div>

      <div className="rp-origin-images">
        <div className="rp-origin-side rp-origin-left">
          <Image
            src="/images/marshal.png"
            alt="Malko — The Marshal"
            fill
            sizes="(max-width: 860px) 50vw, 430px"
            className="rp-origin-img"
          />
          <div className="rp-origin-overlay rp-origin-overlay-left" aria-hidden />
          <div className="rp-origin-badge rp-origin-badge-left">
            <Image
              src="/images/Spurbound_no_bg.png"
              alt="Riders flag"
              width={70}
              height={70}
            />
          </div>
          <div className="rp-origin-character-label">
            <span className="rp-origin-name">Malko</span>
            <span className="rp-origin-title">The Marshal</span>
          </div>
        </div>

        <div className="rp-origin-side rp-origin-right">
          <Image
            src="/images/cacique.png"
            alt="Cacique — The Black Stallion"
            fill
            sizes="(max-width: 860px) 50vw, 430px"
            className="rp-origin-img"
          />
          <div className="rp-origin-overlay rp-origin-overlay-right" aria-hidden />
          <div className="rp-origin-badge rp-origin-badge-right">
            <Image
              src="/images/bikers_no_bg.png"
              alt="Bikers patch"
              width={70}
              height={70}
            />
          </div>
          <div className="rp-origin-character-label">
            <span className="rp-origin-name">Cacique</span>
            <span className="rp-origin-title">The Black Stallion</span>
          </div>
        </div>
      </div>

      <div className="rp-origin-footer">
        <Link className="rp-btn-primary" href="/the-marshal">
          Discover the Origin Story
          <ArrowIcon />
        </Link>
      </div>
    </Reveal>
  );
}
