export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Ambient background glows — pure CSS, no JS required */}
      <div
        aria-hidden
        className="rp-glow-purple pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-purple/20 blur-3xl"
      />
      <div
        aria-hidden
        className="rp-glow-aqua pointer-events-none absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-aqua/15 blur-3xl"
      />
      <div
        aria-hidden
        className="rp-drift pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple/10 blur-3xl"
      />

      <section className="relative z-10 flex max-w-2xl flex-col items-center gap-8">
        <p className="text-xs uppercase tracking-[0.4em] text-text-muted">
          | Solana &middot; Dynamic NFTs &middot; Faction Warfare |
        </p>

        <h1 className="bg-gradient-to-r from-aqua via-purple to-aqua bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent sm:text-7xl">
          RabbitPulse
        </h1>

        <p className="text-lg leading-relaxed text-text-muted sm:text-xl">
          A new chapter is being written.
          <br />
          The Pulse is migrating to its next form.
        </p>

        <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-sm sm:flex-row sm:gap-5">
          <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-aqua shadow-[0_0_12px_rgba(102,255,224,0.8)]" />
          <span className="text-sm tracking-wide text-text">
            Phase 1 — Next.js scaffold deployed
          </span>
        </div>

        <p className="max-w-md text-sm leading-6 text-text-muted">
          This page is a placeholder. The original site lives at the repo root as{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-text">
            index.html
          </code>{" "}
          while we port it section by section. See{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-text">
            MIGRATION.md
          </code>{" "}
          for the full plan.
        </p>
      </section>

      <footer className="relative z-10 mt-24 text-xs text-text-muted">
        © 2026 RabbitPulse — All Rights Reserved
      </footer>
    </main>
  );
}
