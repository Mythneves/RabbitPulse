export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-[calc(var(--header-height)+4rem)] text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-purple/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-aqua/15 blur-3xl"
      />

      <section className="relative z-10 flex max-w-2xl flex-col items-center gap-8">
        <p className="text-xs uppercase tracking-[0.4em] text-text-muted">
          | Solana &middot; Dynamic NFTs &middot; Faction Warfare |
        </p>

        <h1 className="bg-gradient-to-r from-aqua via-purple to-aqua bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent sm:text-7xl">
          RabbitPulse
        </h1>

        <p className="text-lg leading-relaxed text-text-muted sm:text-xl">
          The Pulse is migrating to its next form.
          <br />
          A new chapter is being written.
        </p>

        <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-sm sm:flex-row sm:gap-5">
          <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-aqua shadow-[0_0_12px_rgba(102,255,224,0.8)]" />
          <span className="text-sm tracking-wide text-text">
            Phase 2 — Layout shell &amp; ambient effects deployed
          </span>
        </div>

        <p className="max-w-md text-sm leading-6 text-text-muted">
          Header, footer, custom cursor, scroll progress, dust canvas and
          floating glyphs are now wired in. The homepage sections come back
          online section-by-section in Phase 3.
        </p>
      </section>
    </main>
  );
}
