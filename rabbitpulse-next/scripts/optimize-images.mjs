/**
 * One-shot image optimization for the RabbitPulse static assets.
 *
 * - Resizes character / hero PNGs down to a sane max width.
 * - Converts everything to WebP (lossy, q=82).
 * - Leaves the originals on disk untouched the first time, but on
 *   re-runs reads from the existing WebP if needed.
 *
 * Usage:
 *   node scripts/optimize-images.mjs
 *
 * Run any time you add or replace a source PNG in public/images/.
 */
import { readdir, stat, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");

/**
 * Per-file recipes. `maxWidth` resizes the longer edge down to that
 * many pixels (preserving aspect ratio). Files not listed here are
 * left alone.
 *
 * The widths are picked to comfortably exceed the largest displayed
 * size on the homepage (so retina screens still get crisp output)
 * without being wastefully huge.
 */
const RECIPES = {
  // Hero / character art — used as background-cover or fill within ~600-900px containers.
  "marshal.png":          { maxWidth: 1400, quality: 82 },
  "cacique.png":          { maxWidth: 1400, quality: 82 },
  "rider.png":            { maxWidth: 1400, quality: 82 },
  "biker.png":            { maxWidth: 1400, quality: 82 },
  "rabbithole.png":       { maxWidth: 1200, quality: 82 },
  "sefer.png":            { maxWidth: 900,  quality: 82 },
  "janus.png":            { maxWidth: 900,  quality: 82 },
  "seidr.png":            { maxWidth: 900,  quality: 82 },
  "dejitaru.png":         { maxWidth: 900,  quality: 82 },

  // Faction badges (used at ~70px max).
  "Spurbound_no_bg.png":  { maxWidth: 280,  quality: 85 },
  "bikers_no_bg.png":     { maxWidth: 280,  quality: 85 },

  // Brand logo (used at ~65px max but also OG/social-share).
  "myLogo.png":           { maxWidth: 600,  quality: 88 },

  // Social icons (used at 16px). Tiny and already small enough — just convert.
  "x-twitter.png":        { maxWidth: 96,   quality: 88 },
  "discord.png":          { maxWidth: 96,   quality: 88 },
  "farcaster.png":        { maxWidth: 96,   quality: 88 },
};

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

async function main() {
  const entries = await readdir(IMAGES_DIR);
  const pngs = entries.filter((f) => f.toLowerCase().endsWith(".png"));

  if (pngs.length === 0) {
    console.log("No PNG sources found in public/images/. Nothing to do.");
    return;
  }

  console.log(`Optimizing ${pngs.length} PNG(s) → WebP …\n`);

  let totalIn = 0;
  let totalOut = 0;
  const rows = [];

  for (const file of pngs) {
    const recipe = RECIPES[file];
    if (!recipe) {
      console.log(`  skip   ${file}  (no recipe — leaving as-is)`);
      continue;
    }

    const srcPath = path.join(IMAGES_DIR, file);
    const stem = file.replace(/\.png$/i, "");
    const outPath = path.join(IMAGES_DIR, `${stem}.webp`);

    const srcBuf = await readFile(srcPath);
    const srcSize = (await stat(srcPath)).size;

    const pipeline = sharp(srcBuf).rotate();
    const meta = await pipeline.metadata();

    if (meta.width && meta.width > recipe.maxWidth) {
      pipeline.resize({ width: recipe.maxWidth, withoutEnlargement: true });
    }

    const outBuf = await pipeline
      .webp({ quality: recipe.quality, effort: 6 })
      .toBuffer();

    await writeFile(outPath, outBuf);
    await unlink(srcPath);

    totalIn += srcSize;
    totalOut += outBuf.length;

    rows.push({
      file,
      from: fmt(srcSize),
      to: fmt(outBuf.length),
      saved: `${(((srcSize - outBuf.length) / srcSize) * 100).toFixed(1)}%`,
      width: recipe.maxWidth,
    });
  }

  console.table(rows);
  console.log(
    `\nTotal: ${fmt(totalIn)} → ${fmt(totalOut)}  (${(
      ((totalIn - totalOut) / totalIn) *
      100
    ).toFixed(1)}% smaller)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
