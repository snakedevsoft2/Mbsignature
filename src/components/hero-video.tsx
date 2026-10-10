"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type NetworkInformation = { saveData?: boolean };

/**
 * Video vertical que se reproduce sin sonido mientras está en pantalla (como en Instagram).
 * No arranca solo si el usuario pidió ahorrar datos o reducir movimiento.
 */
export function HeroVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUserRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || connection?.saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!pausedByUserRef.current) video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUserRef.current = false;
      video.play().catch(() => undefined);
    } else {
      pausedByUserRef.current = true;
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) {
      pausedByUserRef.current = false;
      video.play().catch(() => undefined);
    }
  };

  return (
    <div className={cn("video-card", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {!playing ? (
        <button type="button" className="video-card__play" onClick={togglePlay} aria-label="Reproducir video">
          <Play className="size-6 translate-x-0.5" strokeWidth={1.75} />
        </button>
      ) : null}
      <button
        type="button"
        className="video-card__sound"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? <VolumeX className="size-4" strokeWidth={1.75} /> : <Volume2 className="size-4" strokeWidth={1.75} />}
        <span>{muted ? "Activar sonido" : "Silenciar"}</span>
      </button>
    </div>
  );
}
