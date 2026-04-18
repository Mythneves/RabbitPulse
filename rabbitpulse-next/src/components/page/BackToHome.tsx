import Link from "next/link";

/** Subtle "Back to home" link at the bottom of every chapter page. */
export function BackToHome() {
  return (
    <div className="rp-back-to-home">
      <Link href="/">← Back to the Pulse</Link>
    </div>
  );
}
