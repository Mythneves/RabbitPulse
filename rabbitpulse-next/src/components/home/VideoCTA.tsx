"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/effects/Reveal";

export function VideoCTA() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPauseOrEnd = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPauseOrEnd);
    v.addEventListener("ended", onPauseOrEnd);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPauseOrEnd);
      v.removeEventListener("ended", onPauseOrEnd);
    };
  }, []);

  const toggle = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused || v.ended) {
      v.muted = false;
      setMuted(false);
      try {
        await v.play();
      } catch {
        v.muted = true;
        setMuted(true);
        try {
          await v.play();
        } catch {
          /* ignore */
        }
      }
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section className="rp-video-section">
      <div className="rp-video-inner">
        <Reveal direction="left" className="rp-video-text">
          <div className="rp-section-label">Final Signal</div>
          <h2>
            Still
            <br />
            <span className="rp-grad">questioning?</span>
          </h2>
          <p>You&apos;ve seen the signals. You&apos;ve heard the Pulse whisper beneath the dust.</p>
          <p>
            The Marshal doesn&apos;t speak… but he sees. And when the time is
            right, he answers — without a word.
          </p>
        </Reveal>

        <Reveal direction="right" className="rp-video-frame">
          <video
            ref={videoRef}
            playsInline
            preload="metadata"
            className="rp-video-el"
          >
            <source src="/images/sefer-video.mp4" type="video/mp4" />
          </video>
          <div className="rp-video-frame-border" aria-hidden />
          <div
            className={`rp-video-play-overlay${playing ? " is-hidden" : ""}`}
            onClick={toggle}
            role="button"
            tabIndex={0}
            aria-label="Play video"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
          >
            <div className="rp-play-btn-circle">
              <svg viewBox="0 0 24 24" aria-hidden>
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
          <div className="rp-video-controls-bar">
            <button type="button" className="rp-video-ctrl-btn" onClick={toggle}>
              {playing ? "⏸ Pause" : "▶ Play"}
            </button>
            <button
              type="button"
              className="rp-video-ctrl-btn"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? "🔇" : "🔊"}
            </button>
          </div>
        </Reveal>

        <Reveal className="rp-video-btn-wrap">
          <button type="button" onClick={toggle} className="rp-btn-primary">
            {playing ? "⏸ Pause the Pulse" : "▶ Start the Pulse"}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
