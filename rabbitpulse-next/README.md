# `rabbitpulse-next/` — the Next.js codebase

This folder is the home of [rabbitpulse.com](https://rabbitpulse.com). It replaces the original single-file `index.html` (deleted at the end of Phase 3).

For the high-level migration plan, see [`MIGRATION.md`](https://github.com/Mythneves/RabbitPulse/blob/main/MIGRATION.md) on `main`.

---

## Status

**Phase 6 — Real Solana wallet adapter deployed.** Phantom / Solflare / Backpack / any Wallet-Standard wallet auto-discovers; Ledger is wired explicitly. The "Connect Wallet" button on the Hero and Buy pages now does a real `select() + connect()`. Defaults to **devnet** so an unconfigured preview never talks to mainnet. A diagnostics page lives at `/wallet-test`.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **ESLint 9**
- **sharp** (build-time image optimization)

## Run it locally

You'll need [Node.js 20 or newer](https://nodejs.org/).

```bash
cd rabbitpulse-next
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Available scripts

| Command                    | What it does                                                   |
| -------------------------- | -------------------------------------------------------------- |
| `npm run dev`              | Dev server with hot reload at port 3000.                       |
| `npm run build`            | Builds the production bundle into `.next/`.                    |
| `npm start`                | Serves the production build (run after `npm run build`).       |
| `npm run lint`             | Runs ESLint across the project.                                |
| `npm run optimize:images`  | Resizes + converts every PNG in `public/images/` to WebP.       |

## Folder layout

```
rabbitpulse-next/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          # <html>/<body>, fonts, header, footer, ambient effects, providers
│  │  ├─ page.tsx            # Homepage — composes hero + chapters + video CTA
│  │  └─ globals.css         # Tailwind + design tokens + all rp-prefixed component CSS
│  ├─ components/
│  │  ├─ effects/            # CustomCursor, ScrollProgress, DustCanvas, FloatingGlyphs, NoiseOverlay, Reveal
│  │  ├─ home/               # Hero, OriginSection, FactionsSection, RabbitHoleSection, PulseboundSection, VideoCTA, ...
│  │  ├─ layout/             # Header, Footer
│  │  ├─ ui/                 # Small reusable bits (ArrowIcon)
│  │  └─ wallet/             # WalletModal + WalletModalContext (real adapter lands in Phase 6)
│  └─ lib/
│     ├─ siteConfig.ts       # Single source of truth for nav links + socials
│     └─ media.ts            # Configurable video URL + poster
├─ public/
│  └─ images/                # Optimized WebP assets (regenerate with npm run optimize:images)
├─ scripts/
│  └─ optimize-images.mjs    # sharp-based PNG → WebP pipeline
├─ next.config.ts
├─ tsconfig.json
├─ eslint.config.mjs
├─ postcss.config.mjs        # Tailwind v4 lives here
├─ .env.local.example        # Template for required env vars
└─ package.json
```

## Design tokens

The original `index.html` uses a small palette built around two accents on a near-black background. Those values are centralized as CSS variables in `src/app/globals.css` and exposed to Tailwind, so you can write `text-purple`, `bg-aqua`, `bg-bg`, `text-text`, `text-text-muted` directly.

| Token            | Value                       | Use                  |
| ---------------- | --------------------------- | -------------------- |
| `--bg`           | `#060608`                   | Page background      |
| `--text`         | `#ffffff`                   | Primary text         |
| `--text-muted`   | `rgba(255,255,255,0.55)`    | Secondary text       |
| `--purple`       | `#a958ff`                   | Brand accent (warm)  |
| `--aqua`         | `#66ffe0`                   | Brand accent (cool)  |

## Adding or replacing images

Drop a new PNG in `public/images/` and add an entry to the `RECIPES` map in [`scripts/optimize-images.mjs`](./scripts/optimize-images.mjs), then:

```bash
npm run optimize:images
```

The script will resize the longer edge to the recipe's `maxWidth`, convert to WebP at the requested quality, write the `.webp` next to the source, and **delete the source PNG**. Reference the `.webp` in your component (e.g. `/images/marshal.webp`).

## The hero video

The 22 MB `sefer-video.mp4` should not stay in `public/` long term. It lacks adaptive streaming, ships as a single blob, and bloats `git clone`.

The recommended path is **Vercel Blob** (cheapest + zero-config if you already use Vercel). Steps:

1. In the Vercel dashboard for this project: **Storage → Create → Blob**.
2. Upload `sefer-video.mp4` (the dashboard has a UI for this; you can also use the `@vercel/blob` CLI).
3. Copy the public URL (looks like `https://<store>.public.blob.vercel-storage.com/sefer-video.mp4`).
4. Set `NEXT_PUBLIC_SEFER_VIDEO_URL` to that URL:
   - Locally: in `.env.local`.
   - Production: Project Settings → Environment Variables.
5. Once the production deploy works, delete the local `public/images/sefer-video.mp4` (separate commit) so future `git clone`s stay light.

The `<video>` tag uses `preload="none"` and a tiny WebP poster (`sefer-poster.webp`, ~104 KB) so visitors who never click play download neither bytes nor a single video segment.

Alternative hosts:

| Host             | Cost                                        | Pros                              | Cons                               |
| ---------------- | ------------------------------------------- | --------------------------------- | ---------------------------------- |
| **Vercel Blob**  | Generous free tier; storage by GB           | Zero-config with your existing Vercel project | Just static delivery, no transcoding |
| **Cloudinary**   | Generous free tier; pay for transformations | On-the-fly resize / format / quality | Slightly more setup |
| **Mux**          | Pay-per-minute streamed                     | True HLS adaptive streaming, analytics | Most expensive; overkill at this scale |

For one short hero video, Vercel Blob is the right answer.

## Deploying to Vercel

This folder is **not** the repo root, so when you import the repo into Vercel you must set the **Root Directory** to `rabbitpulse-next`. Everything else can stay at defaults.

1. Vercel dashboard → **Add New… → Project** → import `Mythneves/RabbitPulse`.
2. Under **Root Directory**, click **Edit** → `rabbitpulse-next`.
3. Framework Preset auto-detects as **Next.js**. Build/Output: defaults.
4. Click **Deploy**.

Every push to any branch then gets its own preview URL.

### Environment variables

None are strictly required to build, but for production you'll want:

| Variable                      | Phase | Purpose                                                |
| ----------------------------- | ----- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SEFER_VIDEO_URL` | 4     | CDN URL for the hero video (Vercel Blob / Cloudinary). |
| `NEXT_PUBLIC_SOLANA_NETWORK`  | 6     | `devnet` or `mainnet-beta`. Defaults to `devnet`.      |
| `NEXT_PUBLIC_SOLANA_RPC_URL`  | 6     | Helius / QuickNode RPC endpoint. Falls back to public RPC. |

### Wallet — first-time setup

1. Create a free [Helius](https://www.helius.dev/) account and grab the **devnet** RPC URL it gives you.
2. Locally, copy `.env.local.example` to `.env.local` and paste the URL into `NEXT_PUBLIC_SOLANA_RPC_URL`.
3. In Vercel: **Project Settings → Environment Variables**, add the same two variables (`NEXT_PUBLIC_SOLANA_NETWORK=devnet`, `NEXT_PUBLIC_SOLANA_RPC_URL=<helius url>`). Apply to all environments.
4. Visit `/wallet-test` (after a redeploy) to verify the wiring. Connect a wallet (Phantom recommended), confirm the network, address, and SOL balance render. Get free devnet SOL at [`https://faucet.solana.com`](https://faucet.solana.com).
5. When you're ready for mainnet, change `NEXT_PUBLIC_SOLANA_NETWORK` to `mainnet-beta` and the URL to your Helius mainnet endpoint.

A template lives at [`.env.local.example`](./.env.local.example).

## What changes per phase

| Phase | What lands in this folder                                                                  |
| ----- | ------------------------------------------------------------------------------------------ |
| 1 ✅  | Scaffold + placeholder homepage                                                            |
| 2 ✅  | Header / footer / global cursor / dust canvas / glyphs / scroll bar                        |
| 3 ✅  | Homepage sections ported one-by-one; legacy `index.html` deleted                           |
| 4 ✅  | All images → WebP via `<Image>`; video poster + env-configurable CDN URL                   |
| 5 ✅  | New chapter pages (`/the-marshal`, `/riders-bikers`, `/rabbit-hole`, etc.)                 |
| 6 ✅  | Solana wallet adapter, devnet connection, `/wallet-test` diagnostics                       |
| 7     | Dynamic NFT logic (re-planned in `NFT_PLAN.md` before starting)                            |
