"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Video vertical sin sonido, como en Instagram: se reproduce mientras está en pantalla y se pausa
 * al salir. Con `eager` arranca apenas se entra a la página. Tocarlo activa o quita el sonido.
 */
export function PhoneVideo({
  src,
  poster,
  label,
  eager = false,
  className,
}: {
  src: string;
  poster?: string;
  label: string;
  eager?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUserRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Los navegadores solo permiten la reproducción automática si el video está silenciado.
    video.muted = true;
    if (eager) video.play().catch(() => undefined);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!pausedByUserRef.current) video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [eager]);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    pausedByUserRef.current = false;
    video.play().catch(() => undefined);
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (video.paused) play();
  };

  return (
    <div className={cn("phone", className)}>
      <video
        ref={videoRef}
        // Sin portada, "#t=0.1" hace que el celular muestre el primer cuadro del video.
        src={poster ? src : `${src}#t=0.1`}
        poster={poster}
        autoPlay={eager}
        muted
        loop
        playsInline
        preload={eager ? "auto" : "metadata"}
        aria-label={label}
        onClick={toggleSound}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {!playing ? (
        <button type="button" className="phone__play" onClick={play} aria-label="Reproducir video">
          <Play className="size-6 translate-x-0.5" fill="currentColor" strokeWidth={0} />
        </button>
      ) : null}
      <button
        type="button"
        className="phone__sound"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? <VolumeX className="size-4" strokeWidth={2} /> : <Volume2 className="size-4" strokeWidth={2} />}
      </button>
    </div>
  );
}
