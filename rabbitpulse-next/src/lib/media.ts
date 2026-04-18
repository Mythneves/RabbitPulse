/**
 * Centralized media URLs.
 *
 * The video file is intentionally kept *out* of the git repo long-term:
 * MP4 files balloon git history and ship as a single non-streaming
 * blob to every visitor.
 *
 * Set `NEXT_PUBLIC_SEFER_VIDEO_URL` (in `.env.local` for dev, in the
 * Vercel dashboard for production) to a streaming or CDN URL such as:
 *
 *   - Vercel Blob:  https://<store>.public.blob.vercel-storage.com/sefer-video.mp4
 *   - Cloudinary:   https://res.cloudinary.com/<cloud>/video/upload/.../sefer-video.mp4
 *   - Mux:          https://stream.mux.com/<playback-id>.m3u8   (HLS, see VideoCTA notes)
 *
 * If unset, falls back to the local `/images/sefer-video.mp4` (which
 * exists in the repo today but is removed in the Phase 4 cleanup
 * commit once a CDN URL is configured).
 */

export const SEFER_VIDEO_URL =
  process.env.NEXT_PUBLIC_SEFER_VIDEO_URL ?? "/images/sefer-video.mp4";

/** Poster image shown before the user hits play. Tiny WebP, in repo. */
export const SEFER_VIDEO_POSTER = "/images/sefer-poster.webp";
