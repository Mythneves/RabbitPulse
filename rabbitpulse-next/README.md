# `rabbitpulse-next/` — the Next.js codebase

This folder is the future home of [rabbitpulse.com](https://rabbitpulse.com). It will eventually replace the single-file `index.html` at the root of this repository. Until then, both live side-by-side.

For the high-level migration plan, see [`../MIGRATION.md`](../MIGRATION.md).

---

## Status

**Phase 1 — Scaffold.** Next.js + TypeScript + Tailwind CSS are wired up and the homepage shows a "Phase 1 deployed" placeholder. The look-and-feel migration starts in Phase 2.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **ESLint 9**

## Run it locally

You'll need [Node.js 20 or newer](https://nodejs.org/) installed.

```bash
cd rabbitpulse-next
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Available scripts

| Command         | What it does                                            |
| --------------- | ------------------------------------------------------- |
| `npm run dev`   | Starts the dev server with hot reload at port 3000.     |
| `npm run build` | Builds the production bundle into `.next/`.             |
| `npm start`     | Serves the production build (run after `npm run build`).|
| `npm run lint`  | Runs ESLint across the project.                         |

## Folder layout

```
rabbitpulse-next/
├─ src/
│  └─ app/
│     ├─ layout.tsx     # Wraps every page (fonts, <head>, body shell)
│     ├─ page.tsx       # Homepage (the placeholder you see now)
│     └─ globals.css    # Tailwind import + RabbitPulse design tokens
├─ public/              # Static assets served as-is at the site root
├─ next.config.ts
├─ tailwind / postcss   # Tailwind v4 config lives in postcss.config.mjs
├─ tsconfig.json
├─ eslint.config.mjs
└─ package.json
```

The `MIGRATION.md` in the parent folder describes how this tree will grow over the next phases (`components/`, `lib/`, per-chapter routes, etc.).

## Design tokens

The original `index.html` uses a small palette built around two accents on a near-black background. Those values are now centralized as CSS variables in `src/app/globals.css` and exposed to Tailwind, so you can write `text-purple`, `bg-aqua`, `bg-bg`, `text-text`, `text-text-muted` directly.

| Token             | Value                       | Use                          |
| ----------------- | --------------------------- | ---------------------------- |
| `--bg`            | `#060608`                   | Page background              |
| `--text`          | `#ffffff`                   | Primary text                 |
| `--text-muted`    | `rgba(255,255,255,0.55)`    | Secondary text               |
| `--purple`        | `#a958ff`                   | Brand accent (warm)          |
| `--aqua`          | `#66ffe0`                   | Brand accent (cool)          |

## Deploying to Vercel

This folder is **not** the repo root, so when you import the repo into Vercel you must set the **Root Directory** to `rabbitpulse-next`. Everything else can stay at defaults.

1. In the Vercel dashboard, click **Add New… → Project**.
2. Select the `Mythneves/RabbitPulse` repository.
3. Under **Root Directory**, click **Edit** and set it to `rabbitpulse-next`.
4. Framework Preset should auto-detect as **Next.js**.
5. Build/Output settings: leave defaults.
6. Click **Deploy**.

After the first deploy, every push to any branch in this repo will get its own preview URL automatically.

### Environment variables

None are required for Phase 1. Future phases will introduce:

- `NEXT_PUBLIC_SOLANA_NETWORK` — `devnet` or `mainnet-beta` (Phase 6)
- `NEXT_PUBLIC_SOLANA_RPC_URL` — your Helius / QuickNode RPC URL (Phase 6)

A template lives at [`.env.local.example`](./.env.local.example).

## What changes per phase

| Phase | What lands in this folder                                                                  |
| ----- | ------------------------------------------------------------------------------------------ |
| 1 ✅  | Scaffold + placeholder homepage                                                            |
| 2     | `app/layout.tsx` gains real header/footer; global cursor, dust canvas, glyphs, scroll bar  |
| 3     | Homepage sections ported one-by-one; `index.html` deleted at the end                       |
| 4     | All `<img>` → `<Image>`; PNG compression; video moved to a CDN                             |
| 5     | New chapter pages (`/the-marshal`, `/riders-bikers`, `/rabbit-hole`, etc.)                 |
| 6     | Solana wallet adapter, devnet connection                                                   |
| 7     | Dynamic NFT logic (re-planned in `NFT_PLAN.md` before starting)                            |
