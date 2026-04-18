import Image from "next/image";
import { siteConfig, socialLinks } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="rp-footer">
      <div className="rp-footer-inner">
        <div className="rp-footer-brand">
          <span className="rp-logo-text">{siteConfig.name}</span>
          <p>{siteConfig.description}</p>
        </div>

        <div className="rp-footer-right">
          <div className="rp-social-icons">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                className="rp-social-link"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <Image
                  className="rp-social-logo"
                  src={s.icon}
                  alt=""
                  width={16}
                  height={16}
                />
              </a>
            ))}
          </div>
          <p className="rp-footer-copy">
            © {new Date().getFullYear()} {siteConfig.name} – All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
