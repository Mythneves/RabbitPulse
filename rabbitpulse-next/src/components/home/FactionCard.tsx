import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

type FactionCardProps = {
  imageSrc: string;
  imageAlt: string;
  /** "Order" | "Rebellion" — visual tag styling key. */
  tag: string;
  tagVariant: "rider" | "biker";
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export function FactionCard({
  imageSrc,
  imageAlt,
  tag,
  tagVariant,
  title,
  description,
  ctaLabel,
  ctaHref,
}: FactionCardProps) {
  return (
    <article className="rp-faction-card">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="rp-faction-card-img"
      />
      <div className="rp-faction-card-overlay" aria-hidden />
      <div className="rp-faction-card-content">
        <span
          className={`rp-faction-tag ${
            tagVariant === "rider" ? "rp-tag-rider" : "rp-tag-biker"
          }`}
        >
          {tag}
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link className="rp-btn-ghost" href={ctaHref}>
          {ctaLabel}
          <ArrowIcon size={12} />
        </Link>
      </div>
    </article>
  );
}
