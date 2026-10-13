"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type NetworkInformation = { saveData?: boolean };

/**
 * Video vertical que se reproduce sin sonido mientras está en pantalla (como en Instagram).
 * Solo se descarga cuando empieza a reproducirse, para que la página cargue rápido.
 * No arranca solo si el usuario pidió ahorrar datos o reducir movimiento.
 */
export function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
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

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    pausedByUserRef.current = false;
    video.play().catch(() => undefined);
  };

  // Tocar el video activa o quita el sonido; si estaba en pausa, lo reproduce.
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (video.paused) play();
  };

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onClick={toggleSound}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {!playing ? (
        <button type="button" className="video-card__play" onClick={play} aria-label="Reproducir video">
          <Play className="size-6 translate-x-0.5" fill="currentColor" strokeWidth={0} />
        </button>
      ) : null}
      <button
        type="button"
        className="video-card__sound"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? <VolumeX className="size-4" strokeWidth={2} /> : <Volume2 className="size-4" strokeWidth={2} />}
      </button>
    </div>
  );
}
