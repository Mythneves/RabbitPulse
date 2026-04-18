/**
 * Subtle film-grain texture layered above everything except the cursor.
 * Pure CSS — see `.rp-noise-overlay` in globals.css.
 *
 * Server component (no client JS).
 */
export function NoiseOverlay() {
  return <div className="rp-noise-overlay" aria-hidden />;
}
