# RabbitPulse — Migration Plan: `index.html` → Next.js

> **Status:** Plan only. No code has been migrated yet.
> **Audience:** You (the project owner), who is not a professional web developer.
> **Goal:** Move from a single 2,361-line `index.html` to a maintainable Next.js codebase **without** breaking what already works, **without** redesigning the site at the same time, and **without** locking ourselves into decisions we don't yet need to make (especially on the NFT side).

This document is intentionally long and explanatory. Read it once top-to-bottom; later you can jump to whichever section you need.

---

## Table of contents

1. [What we're starting from](#1-what-were-starting-from)
2. [Why Next.js (and what it actually gives us)](#2-why-nextjs-and-what-it-actually-gives-us)
3. [The recommended stack — and why each piece](#3-the-recommended-stack--and-why-each-piece)
4. [Mental model: how a Next.js project is organized](#4-mental-model-how-a-nextjs-project-is-organized)
5. [File-by-file mapping: today vs. tomorrow](#5-file-by-file-mapping-today-vs-tomorrow)
6. [The migration in 7 phases](#6-the-migration-in-7-phases)
7. [Asset strategy (images and that 22 MB video)](#7-asset-strategy-images-and-that-22-mb-video)
8. [The Solana / wallet / NFT layer](#8-the-solana--wallet--nft-layer)
9. [Hosting on Vercel — what to expect](#9-hosting-on-vercel--what-to-expect)
10. [Concepts you'll bump into (and how to think about them)](#10-concepts-youll-bump-into-and-how-to-think-about-them)
11. [What you should learn vs. what I'll handle](#11-what-you-should-learn-vs-what-ill-handle)
12. [Risks, common traps, and things to NOT do](#12-risks-common-traps-and-things-to-not-do)
13. [Open questions for you](#13-open-questions-for-you)
14. [Glossary](#14-glossary)

---

## 1. What we're starting from

A snapshot of the current repo (`Mythneves/RabbitPulse`):

- **One HTML file**: `index.html`, 2,361 lines. It contains:
  - One `<style>` block (~1,700 lines of CSS, lines ~24–1,750)
  - One `<script>` block (~230 lines of JS, lines ~2,128–2,358)
  - Markup for: header + nav, hero, Chapter 01 (Marshal), Chapter 02 (Riders & Bikers), Chapter 03 (Rabbit Hole), Chapter 04 (Pulsebound rabbits), video CTA, footer, wallet modal
- **15 image assets** at the repo root (~16 MB total)
- **One video**: `sefer-video.mp4` (~22 MB)
- **No package.json, no README, no build tools, no tests**
- A nav that **already references 7 pages that don't exist yet**:
  - `the-marshal.html`, `riders-bikers.html`, `quest.html`, `rabbit-hole.html`, `campfire.html`, `about.html`, `buy.html`
- A wallet modal with placeholder `connectToPhantom()` / `connectToSolflare()` / `connectToLedger()` functions that just show an `alert()`.
- Nice features that need to be preserved during the migration:
  - Custom cursor + ring with hover state
  - Scroll progress bar
  - Animated "dust" canvas background
  - Floating glyph background
  - Reveal-on-scroll animations (`.reveal`, `.reveal-left`, `.reveal-right`)
  - Flip cards (the four Pulsebound rabbits)
  - Custom video controls
  - Mobile nav drawer

That last bullet is important: **the migration's job is to keep all of these working**, not to redesign them.

---

## 2. Why Next.js (and what it actually gives us)

Three concrete pain points your current setup has, and how Next.js solves each:

| Today's pain | What Next.js gives you |
|---|---|
| All copy/markup lives in one giant file. To add a new "chapter" page, you'd duplicate the header/footer/nav/cursor/canvas in another HTML file and keep them in sync forever. | **Layouts.** The header/footer/cursor/canvas live in `app/layout.tsx` once. Every page wraps itself in that layout automatically. Edit it in one place, every page updates. |
| You repeat the same structure 4× for the Pulsebound rabbits (Sefer, Janus, Seidr, Dejitaru) and 2× for the factions. If you change the design, you change it 4× or 2×. | **Components.** Write a `<PulseboundCard />` once. Render it 4 times with different props. Change the design once. |
| The wallet modal currently just calls `alert()`. Real Solana wallet support in vanilla HTML is doable but ugly; the official SDK assumes React. | **React.** The Solana wallet ecosystem (`@solana/wallet-adapter-react`) is built for it. ~20 lines and Phantom/Solflare/Ledger work. |

There are **secondary** wins too: built-in image optimization, automatic code splitting (only ship the JS a page actually needs), built-in SEO/meta-tag helpers, server-side rendering for fast first paint, and free preview deploys per branch on Vercel.

What Next.js is **not** going to fix for you: writing the lore, designing new sections, generating NFT artwork, deploying smart contracts, or marketing. Those are still your job — but a tidier codebase makes each of them easier.

---

## 3. The recommended stack — and why each piece

The bias here is **as few moving parts as possible**. Every dependency we add is a thing you (or future me) will have to learn, debug, and update.

| Layer | Choice | Beginner-friendly? | Why this and not something else |
|---|---|---|---|
| Framework | **Next.js 15 (App Router)** | Medium | The current default. App Router is what all current Next.js docs and tutorials use. Avoids "Pages Router" which is being phased out. |
| Language | **TypeScript** | Easier than you think | It catches typos and wiring mistakes *before* you reload the browser. AI assistants are dramatically more accurate with TS than JS. The "type annotations" are mostly optional at first. |
| Styling | **Tailwind CSS v4** | Easy after a week | Your current CSS is essentially custom utility classes (`.btn-primary`, `.faction-card`, `.pulse-statement-inner`). Tailwind is the same idea with shared vocabulary. We'll keep your CSS variables (`--purple`, `--aqua`, etc.) inside Tailwind's theme. |
| Animations | **Framer Motion** + plain CSS | Easy | Replaces your hand-rolled `IntersectionObserver`-based reveal logic. CSS keyframes (e.g. `floatGlyph`) stay as CSS. |
| Wallet | **`@solana/wallet-adapter-react` + `@solana/wallet-adapter-react-ui`** | Medium | The de-facto standard. Already supports the three wallets your modal lists (Phantom, Solflare, Ledger) plus more, with built-in UI. |
| Solana RPC | **`@solana/web3.js` v2** + a hosted RPC (Helius or QuickNode) | Medium | The default public RPC is rate-limited and unreliable for production. Helius free tier is plenty to start. |
| NFT standard | **Metaplex Core** (decision deferred to phase 7) | N/A yet | The newest, simplest standard for dynamic NFTs on Solana. We'll re-evaluate when we get there. |
| Hosting | **Vercel** | Easy | Made by the Next.js team. You already have an account. Deploys on every `git push`. Free tier is fine to start. |
| Image / video CDN | Vercel Image Optimization for images; **Mux** or **Cloudinary** for the video | Easy | Keeps large binaries out of git. |
| Forms / mailing list (eventual) | Resend + a single API route | Easy | Cheap, founder-friendly. Decision deferred. |
| CMS for lore (eventual, optional) | **Sanity** or **MDX files in the repo** | Medium | Decision deferred to after migration. For now, lore lives as text inside components. |

What we are **deliberately NOT adding now**:

- ❌ Redux / Zustand / any global state library — we don't need them yet.
- ❌ A database — we don't need one yet.
- ❌ A backend / API server — Next.js's built-in API routes are enough for the foreseeable future.
- ❌ A full-blown "NFT mint platform" template — they bake in choices we'll regret.
- ❌ shadcn/ui or other component libraries — your design is too custom; they'd fight us.
- ❌ Storybook, Playwright, Jest — useful eventually, distracting now.

---

## 4. Mental model: how a Next.js project is organized

Three folders matter most:

- **`app/`** — every folder inside `app/` becomes a URL.
  - `app/page.tsx` → the homepage `/`
  - `app/the-marshal/page.tsx` → `/the-marshal`
  - `app/rabbit/[id]/page.tsx` → `/rabbit/anything` (dynamic page per rabbit, much later)
  - `app/layout.tsx` → wraps every page (header, footer, fonts, the cursor and canvas backgrounds)
- **`components/`** — reusable bits of UI. Not URLs. Examples: `Header`, `FactionCard`, `WalletButton`.
- **`public/`** — static files served as-is. Anything in `public/images/marshal.png` is reachable at `/images/marshal.png`.

Two more folders we'll add:

- **`lib/`** — non-UI helpers. Solana RPC client, formatting functions, etc.
- **`styles/`** — global CSS + Tailwind config. Your `:root` CSS variables go here.

That's it. Three folders to remember.

---

## 5. File-by-file mapping: today vs. tomorrow

This is the proposed structure, with a one-line note on what each file would contain. Every line maps back to something already in your `index.html`.

```
rabbitpulse/
├─ app/
│  ├─ layout.tsx                  ← <html>/<head>, fonts, header, footer, global background canvas, custom cursor
│  ├─ page.tsx                    ← homepage: composes Hero + Origin + Factions + RabbitHole + Pulsebound + VideoCTA
│  ├─ globals.css                 ← Tailwind directives + your :root CSS variables + keyframes (floatGlyph, etc.)
│  ├─ the-marshal/page.tsx        ← (new) Chapter 01 expanded
│  ├─ riders-bikers/page.tsx      ← (new) Chapter 02 expanded
│  ├─ rabbit-hole/page.tsx        ← (new) Chapter 03 expanded
│  ├─ quest/page.tsx              ← (new) The Quest
│  ├─ campfire/page.tsx           ← (new) Campfire
│  ├─ about/page.tsx              ← (new) About
│  └─ buy/page.tsx                ← (new) wallet connect + future mint flow
│
├─ components/
│  ├─ layout/
│  │  ├─ Header.tsx               ← from <header id="header"> + .menu-toggle + .site-nav
│  │  ├─ Footer.tsx               ← from <footer> + social icons
│  │  └─ MobileNavOverlay.tsx     ← from <div class="nav-overlay">
│  ├─ effects/
│  │  ├─ CustomCursor.tsx         ← cursor + ring + hover detection (the JS at lines ~2129–2152)
│  │  ├─ ScrollProgress.tsx       ← the top progress bar (lines ~2155–2159)
│  │  ├─ DustCanvas.tsx           ← the animated particle background (lines ~2212–2248)
│  │  ├─ FloatingGlyphs.tsx       ← the floating glyph layer (lines ~2251–2271)
│  │  └─ Reveal.tsx               ← wrapper that animates children into view (replaces .reveal logic)
│  ├─ home/
│  │  ├─ Hero.tsx                 ← <section id="hero">
│  │  ├─ OriginSection.tsx        ← Chapter 01 — Marshal vs. Cacique
│  │  ├─ FactionsSection.tsx      ← Chapter 02
│  │  ├─ FactionCard.tsx          ← single faction card, called twice (Riders, Bikers)
│  │  ├─ RabbitHoleSection.tsx    ← Chapter 03
│  │  ├─ PulseboundSection.tsx    ← Chapter 04 wrapper
│  │  ├─ PulseboundCard.tsx       ← one flip card, called 4× with props for each rabbit
│  │  ├─ PulseStatement.tsx       ← the two "∞" / "◈" mid-page statements
│  │  └─ VideoCTA.tsx             ← the video section + custom controls
│  └─ wallet/
│     ├─ WalletProvider.tsx       ← Solana wallet context (wraps the whole app)
│     ├─ WalletButton.tsx         ← replaces the "Connect Wallet" button
│     └─ WalletModal.tsx          ← replaces openWalletModal()
│
├─ lib/
│  ├─ solana.ts                   ← RPC connection, network config
│  ├─ rabbits.ts                  ← (later) helpers to fetch on-chain rabbit data
│  └─ siteConfig.ts               ← navigation links, social URLs, contract addresses
│
├─ public/
│  └─ images/                     ← all your PNGs, after running through TinyPNG / squoosh
│      └─ (favicon, og-image, character art, social icons, logo)
│
├─ tailwind.config.ts
├─ next.config.ts
├─ tsconfig.json
├─ package.json
├─ .env.local.example             ← template for env vars (RPC URL, etc.)
├─ .gitignore
└─ README.md
```

What gets **deleted** at the end of phase 3:

- `index.html` (its content now lives in `app/page.tsx` + components)
- All `*.png` and `*.mp4` files at the repo root (moved to `public/images/` or to a CDN)

What stays:

- The git history — we don't rewrite it.

---

## 6. The migration in 7 phases

Each phase is one (or a few) PRs. Each PR is independently mergeable. The current site keeps working until phase 3 finishes.

### Phase 1 — Scaffold (smallest possible PR)

**Goal:** prove the pipeline works end to end.

Deliverables:

- New folder `rabbitpulse-next/` (sibling to `index.html`) with a fresh Next.js + TypeScript + Tailwind + ESLint scaffold.
- Empty homepage that says "RabbitPulse — under construction."
- `README.md` explaining how to run it locally (`npm install`, `npm run dev`).
- A `.gitignore` that excludes `node_modules/`, `.next/`, `.env*.local`.
- Vercel deploy (you connect the repo in the Vercel dashboard; I'll make sure the build settings are right — Root Directory: `rabbitpulse-next/`).

What you should see:

- A green checkmark on the PR.
- A preview URL from Vercel showing the "under construction" page.

Risk level: **near zero.** Nothing in the existing site is touched.

### Phase 2 — Layout shell + global effects

**Goal:** every future page gets the right header, footer, fonts, cursor, canvas, etc., for free.

Deliverables:

- `app/layout.tsx` with the Unbounded Google Font, `<head>` meta tags (carried over from your current `<head>`), and the wrapper div structure.
- `components/layout/Header.tsx` + `components/layout/Footer.tsx` with the same markup and links as today.
- `components/effects/{CustomCursor,ScrollProgress,DustCanvas,FloatingGlyphs}.tsx`.
- `app/globals.css` with your `:root` variables, keyframes, and the cursor/canvas base styles.
- Tailwind theme set up so colors `purple`, `aqua`, etc. match your current vars.

After this PR, the homepage is still mostly empty, but the look-and-feel "frame" of the site is fully there. We can navigate to `/the-marshal` and get the right header/footer (the page itself is still empty).

### Phase 3 — Port the homepage section by section

**Goal:** reach 1:1 visual parity with `index.html`.

This is the longest phase, but it's safe because we go section by section, and you can compare against the live old site after each one.

Order of PRs (one per section):

1. `Hero` (lines 1792–1813)
2. `OriginSection` + Pulse Statement #1 (lines 1816–1875)
3. `FactionsSection` + `FactionCard` (lines 1878–1920)
4. Pulse Statement #2 + `RabbitHoleSection` (lines 1923–1955)
5. `PulseboundSection` + `PulseboundCard` (lines 1957–2044)
6. `VideoCTA` (lines 2047–2076)
7. `WalletModal` (markup only — still uses the old `alert()` placeholders, real wallet integration comes in phase 6)

At the end of this phase, `index.html` and the assets at the repo root are deleted in a final cleanup commit. The Next.js app fully replaces the static site.

### Phase 4 — Asset optimization

**Goal:** make the site fast.

Deliverables:

- All `<img>` tags → Next.js `<Image>`. This auto-resizes, generates WebP/AVIF, lazy-loads, and prevents layout shift.
- PNGs compressed (TinyPNG or `sharp`) and re-saved.
- `sefer-video.mp4` uploaded to Mux (or Cloudinary). The Vercel-hosted page just references the streaming URL and ships a poster image.
- Lighthouse audit before/after, included in the PR description.

Realistic expectation: page weight drops from ~38 MB to **under 2 MB**. Lighthouse Performance score jumps from likely 30–50 to 85+.

### Phase 5 — Build the missing chapter pages

**Goal:** the 7 nav links your header already promises actually go somewhere.

Deliverables (probably one PR per page, or grouped 2–3 at a time):

- `the-marshal/page.tsx` — long-form lore page using shared `PageHeader`, `Section`, `PullQuote` components.
- `riders-bikers/page.tsx`, `rabbit-hole/page.tsx`, `quest/page.tsx`, `campfire/page.tsx`, `about/page.tsx`, `buy/page.tsx`.

This is where **you** become the bottleneck, not me — I need actual lore copy, character details, and so on. We'll start with placeholder content I write to match the tone of your existing site, and you'll edit/replace as you go.

### Phase 6 — Real wallet connection

**Goal:** "Connect Wallet" actually connects, on Solana **devnet** first, then mainnet when you're ready.

Deliverables:

- `WalletProvider.tsx` wrapping the app, configured for devnet.
- `WalletButton.tsx` showing connect/disconnect + truncated address.
- `WalletModal.tsx` updated to use the official wallet adapter modal (or styled version of it).
- An `.env.local.example` documenting the required env vars (`NEXT_PUBLIC_SOLANA_RPC_URL`, `NEXT_PUBLIC_SOLANA_NETWORK`).
- A test page (`/wallet-test`, removed before going live) that just shows the connected wallet's SOL balance — proves the whole pipeline works.

Risks: none on devnet. You can break things freely. Mainnet switch is one env var change.

### Phase 7 — Dynamic NFT logic

**Goal:** dynamic Pulsebound rabbits exist on-chain and the site can read/render them.

This phase is intentionally vague because **we should re-plan together before starting it**. Big questions to answer first:

- Which NFT standard? (Metaplex Core is my current recommendation, but Token-2022 has trade-offs.)
- What does "dynamic" mean for your NFTs? (On-chain trait changes? Off-chain metadata flips? Image regeneration?)
- Who triggers the changes? (Owner clicks? Scheduled job? Game event?)
- Mutable or immutable image storage? (Arweave / IPFS / Vercel Blob?)
- Free mint, paid mint, allowlist?

I'd write a separate `NFT_PLAN.md` at the start of this phase. **Don't expect this phase to be a single PR.** Expect 5–10 PRs over a long stretch.

---

## 7. Asset strategy (images and that 22 MB video)

Your repo currently weighs ~38 MB, almost all of it binaries. Two problems with that:

1. **Git is bad at large binaries.** Every clone downloads the full history forever. Your repo will only get heavier.
2. **Visitors download those files on first page load.** A 22 MB video preload kills performance and burns your hosting bandwidth quota.

What we'll do:

| Asset type | Today | After phase 4 |
|---|---|---|
| Character art (1–3 MB PNGs) | In repo, full size | In `public/images/`, compressed to ~150–400 KB each, served as WebP via Next.js `<Image>` |
| Logo, social icons (small PNGs) | In repo | In `public/images/` (these are fine as-is) |
| `sefer-video.mp4` (22 MB) | In repo, autoplays | Uploaded to **Mux** (or Cloudinary). Page ships a ~80 KB poster image; video streams adaptively only when the user hits Play |
| OG / social-share image | Referenced but not present (`og-image.jpg`) | Generated as a 1200×630 PNG in `public/images/` |
| Favicon | None | Generated from `myLogo.png`, all sizes |

**One-time cleanup:** the binaries currently in git history will still bloat clones until we do a `git filter-repo` pass to strip them out. I'll propose that as a separate operation once everything is moved — it rewrites history, so we'll only do it after you confirm.

---

## 8. The Solana / wallet / NFT layer

This is the area with the most "future you" decisions, so I want to be explicit about what we're committing to **now** vs. **later**.

### What we'll do during the migration (phase 6)

- Wire up Phantom + Solflare + Ledger via the official wallet adapter, on **devnet** (free fake SOL, no risk).
- Show the connected address and SOL balance.
- That's it.

### What we'll explicitly defer (phase 7+)

- Choosing the NFT standard.
- Deploying any smart contracts / on-chain programs.
- Minting, transfers, burns.
- Royalty configuration.
- Treasury / multisig setup.
- Pricing, allowlist, public sale.
- Staking, evolving traits, in-game events.

### Why defer?

Because every one of those decisions has irreversible consequences (you can't easily change an NFT collection's standard after mint), and most of them depend on **product** decisions you haven't made yet (how many rabbits? what makes them "dynamic"? what's the player loop?). It's much cheaper to make those choices on a working website with real users giving feedback than upfront on a static draft.

### Hosted RPC — important and easy to forget

The free public Solana RPC (`api.mainnet-beta.solana.com`) is **not** suitable for production. It rate-limits aggressively and goes down. We'll use **Helius** (free tier: 100k requests/day, plenty for early traffic). You'll create an account and we'll add the URL as `NEXT_PUBLIC_SOLANA_RPC_URL` in Vercel.

---

## 9. Hosting on Vercel — what to expect

Since you already have a Vercel account, this is mostly setup-once-and-forget.

**Workflow after phase 1:**

1. You push to `main` → Vercel auto-deploys to your production URL.
2. You (or I) push to any other branch → Vercel auto-deploys a **preview URL** unique to that branch.
3. Open a PR → Vercel comments on it with the preview link.

**Costs you should anticipate:**

- Free (Hobby) plan is fine for now. Limits that might bite later:
  - 100 GB bandwidth/month — fine until the site goes viral.
  - Serverless function execution time — fine for our use cases.
  - **No commercial use on Hobby.** Once you start selling NFTs, you'll need the **Pro** plan ($20/month).

**What you'll need to add in Vercel later (don't worry now):**

- `NEXT_PUBLIC_SOLANA_RPC_URL` — your Helius URL
- `NEXT_PUBLIC_SOLANA_NETWORK` — `devnet` or `mainnet-beta`
- (eventually) Mux / Cloudinary keys for video
- (eventually) Resend API key for newsletter

**Custom domain (`rabbitpulse.com`):**

- Already referenced in your meta tags. We'll point it at Vercel via DNS (one CNAME). I'll write the steps when we get to phase 1.

---

## 10. Concepts you'll bump into (and how to think about them)

These are the few ideas that genuinely confuse newcomers to Next.js. Reading this section once will save you hours later.

### Server Components vs. Client Components

Every component in Next.js 15 is a **Server Component** by default — it runs once on the server, sends HTML to the browser, and ships zero JavaScript. That's fast and SEO-friendly.

A **Client Component** runs in the browser and can use hooks (`useState`, `useEffect`), event handlers (`onClick`), and browser APIs (`window`, `document`, `localStorage`).

You opt into Client Components by adding `"use client"` as the first line of the file.

**Rule of thumb:**
- Static content (text, images) → Server Component (the default, no marker needed).
- Anything interactive → Client Component (`"use client"` at the top).

For your project:
- `Hero`, `OriginSection`, `RabbitHoleSection` → Server Components.
- `CustomCursor`, `DustCanvas`, `WalletButton`, `PulseboundCard` (because it flips on click), `VideoCTA` → Client Components.

### Hydration

The server sends HTML, then the browser "hydrates" it by attaching event listeners. If your server-rendered HTML doesn't match what the client renders on first pass (e.g., you render `Date.now()` server-side), React throws a "hydration mismatch" warning. We'll handle this carefully for things like the dust canvas.

### Routing

Folder = URL. That's it. No routing config file.

- `app/the-marshal/page.tsx` → `/the-marshal`
- `app/rabbit/[id]/page.tsx` → `/rabbit/123`, `/rabbit/abc`
- `app/(marketing)/about/page.tsx` → `/about` (parens = group, doesn't affect URL)

### Metadata / SEO

Each page can export a `metadata` object that becomes its `<head>` tags. No more copy-pasting meta tags into every HTML file.

### Images

`<img src="marshal.png">` → `<Image src="/images/marshal.png" alt="..." width={800} height={1200} />`.
Slightly more typing, but you get free WebP, lazy-loading, and zero layout shift.

### Environment variables

- `.env.local` — for local dev, never committed.
- Variables prefixed `NEXT_PUBLIC_` → exposed to the browser. Everything else stays server-only. Be careful: anything in a Client Component that the browser reads is `NEXT_PUBLIC_` whether you like it or not.

---

## 11. What you should learn vs. what I'll handle

You don't need to become a full-stack developer to own this project. Here's a realistic split:

### Worth your time to learn (you'll touch these often)

- **Markdown** — for editing copy in the lore pages.
- **Basic JSX** — enough to recognize that `<h1>Hello {name}</h1>` is HTML with `{}` for variables.
- **The Tailwind class vocabulary you actually use** — `flex`, `grid`, `gap-4`, `text-purple`, `p-8`. You'll absorb these by osmosis from reviewing PRs.
- **Vercel dashboard** — adding env vars, checking deploy logs, rolling back.
- **`git pull`, `git push`, `git checkout -b feature-x`** — the absolute basics, in case you want to make a typo fix yourself.

### I'll handle (you can review but don't need to write)

- TypeScript types
- Tailwind config
- Server vs. Client component decisions
- Wallet adapter wiring
- Solana RPC code
- Build / deploy configuration
- Performance optimization
- Accessibility audits

### You may want to learn eventually (not required)

- React fundamentals (props, state, useEffect)
- A bit of TypeScript
- Solana basics (accounts, programs, the difference between SOL and lamports)

The Next.js docs at https://nextjs.org/learn are genuinely beginner-friendly and worth a weekend.

---

## 12. Risks, common traps, and things to NOT do

Things I've seen kill projects like this:

1. **Big-bang rewrite.** Trying to migrate everything in one PR. We're explicitly avoiding this with the 7-phase plan.
2. **Redesigning during migration.** Don't try to "improve the design" while moving to Next.js. Match pixel-for-pixel first; iterate on the new codebase. Otherwise you can't tell whether a difference is a migration bug or an intentional change.
3. **Pasting the existing CSS into a global stylesheet and calling it done.** The CSS is coupled to the existing HTML class names. We need to either (a) port section-by-section to Tailwind, or (b) wrap the global CSS and progressively replace it. Plan: option (a), section by section.
4. **Adopting `shadcn/ui` or a component library.** Your design is custom. A library will fight us, then you'll spend more time overriding it than you saved.
5. **Putting wallet logic in `useEffect`s scattered across the app.** It belongs in one provider near the root. We'll do this from day one.
6. **Hardcoding RPC URLs / network names.** They go in env vars, always.
7. **Trying to launch the NFT collection at the same time as the website launch.** Two huge projects, one launch — historically a disaster. Website first; NFTs later.
8. **Storing private keys / wallet seed phrases anywhere in the repo or `.env`.** Just no. Treasury keys go in a hardware wallet (Ledger) you control directly.
9. **YouTube tutorials titled "Build a Solana NFT mint site in 30 minutes!"** They're almost universally outdated, use deprecated `@solana/spl-token` patterns, and skip security. Don't follow them.
10. **Running `git push --force` on `main`.** Just don't. (I won't either.)

---

## 13. Open questions for you

Before phase 1, none of these block us. Before phase 2 we should answer the first three. Before phase 6 we need answers to all of them.

1. **Domain:** is `rabbitpulse.com` actually registered to you? If yes, with which registrar? (We'll need DNS access eventually.)
2. **Brand assets:** is there an SVG version of the logo? (PNGs scale poorly; SVG is sharp at any size.)
3. **Lore:** how locked-in is the current copy? Is it placeholder you'd like rewritten, or canon?
4. **Email collection:** do you want a "Join the Pulse" email signup before launch?
5. **Languages:** English only, or do you want i18n (multi-language) support?
6. **NFT standard preference:** do you have any opinions on Metaplex Core vs. older standards, or are you happy to defer to my recommendation?
7. **RPC provider:** do you already have a Helius / QuickNode account? If yes, which?
8. **Analytics:** Vercel Analytics (privacy-friendly, $0), Plausible, or none?
9. **Launch goal:** what's the rough target — "I want to mint a collection by Q3" or "no specific date"?
10. **Time budget:** roughly how much of your week can you spend reviewing PRs and writing copy? (This sets our pace, not a deadline.)

---

## 14. Glossary

Quick definitions for terms in this doc that might be unfamiliar.

- **Component** — a reusable piece of UI. Like a function that returns HTML.
- **Props** — the inputs to a component, like function arguments. `<FactionCard name="Riders" />` passes `name` as a prop.
- **Hook** — a special React function whose name starts with `use`. `useState` lets a component remember a value; `useEffect` runs code after the component renders.
- **Hydration** — the process where the browser takes the static HTML the server sent and "wakes it up" into an interactive React app.
- **Server Component / Client Component** — see section 10.
- **App Router** — the modern Next.js routing system based on the `app/` folder. (The old one was based on a `pages/` folder.)
- **Tailwind utility class** — a single-purpose CSS class like `p-4` (padding 1rem) or `text-center`.
- **RPC (Remote Procedure Call)** — how your website talks to the Solana blockchain.
- **Devnet / Mainnet** — Solana has multiple networks. Devnet is a free playground; Mainnet is real money.
- **Wallet adapter** — a library that abstracts over different Solana wallets so your code works with all of them at once.
- **Metaplex** — the team/standards that most Solana NFTs use.
- **Lamport** — the smallest unit of SOL. 1 SOL = 1,000,000,000 lamports.
- **Mint** — both a noun (the unique address that identifies an NFT) and a verb (the act of creating an NFT).
- **PR (Pull Request)** — a proposed change to the codebase. You review it before it's merged into `main`.
- **Preview deploy** — a temporary live URL Vercel creates for a PR so you can click around the changes before merging.
- **CDN (Content Delivery Network)** — a global network that serves static files (images, video) from a server geographically close to the visitor.
- **OG image** — the preview image that shows up when someone shares your site on Twitter/Discord/etc.
- **Lighthouse** — Google's web performance auditing tool, built into Chrome DevTools.

---

## What happens next

When you're ready, just tell me **"go ahead with Phase 1"** (or some variation) and I'll:

1. Create a new branch.
2. Scaffold the Next.js project in `rabbitpulse-next/`.
3. Add a README.
4. Open a draft PR with everything you need to know to deploy it on Vercel.

Until then, this `MIGRATION.md` lives in the repo root as our shared reference. Feel free to comment on the PR with questions, push back on any decisions, or paste in any extra context (lore, design references, NFT plans) you want me to absorb before we start coding.
