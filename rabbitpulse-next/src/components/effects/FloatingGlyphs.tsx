/**
 * Floating mystical glyphs that drift up across the viewport.
 *
 * Positions, sizes and animation timings are derived deterministically
 * from the glyph index so the server and client render identical HTML
 * (no hydration mismatch). Pure CSS animation does the actual motion —
 * no client JS needed, this stays a Server Component.
 */

const GLYPHS = ["✶", "⚜", "☾", "φ", "◈", "∞"] as const;
const COUNT = 18;

/**
 * Cheap deterministic pseudo-random number in [0, 1).
 * Seeded by the index + a salt so different "channels" (left, top, ...)
 * for the same index don't correlate.
 */
function rand(i: number, salt: number): number {
  const x = Math.sin(i * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
}

export function FloatingGlyphs() {
  const glyphs = Array.from({ length: COUNT }, (_, i) => ({
    char: GLYPHS[i % GLYPHS.length],
    left: rand(i, 1) * 100,
    top: rand(i, 2) * 100,
    fontSize: rand(i, 3) * 0.6 + 0.7,
    duration: 6 + rand(i, 4) * 6,
    delay: rand(i, 5) * 12,
  }));

  return (
    <div className="rp-glyph-container" aria-hidden>
      {glyphs.map((g, i) => (
        <span
          key={i}
          className="rp-glyph"
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            fontSize: `${g.fontSize}rem`,
            animationDuration: `${g.duration}s`,
            animationDelay: `${g.delay}s`,
          }}
        >
          {g.char}
        </span>
      ))}
    </div>
  );
}
