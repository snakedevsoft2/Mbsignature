"use client";

import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/media";
import { cn } from "@/lib/utils";

// Cuánto se queda cada imagen en pantalla. Los videos pasan al siguiente cuando terminan.
const IMAGE_MS = 4000;
// Si un video no logra reproducirse (p. ej. ahorro de batería en iPhone), se salta después de este tiempo.
const VIDEO_FALLBACK_MS = 22000;

/**
 * Celular que muestra videos e imágenes uno tras otro, como las historias de Instagram:
 * barras de progreso arriba, cambio deslizando y zoom suave en las imágenes.
 * Solo avanza mientras está en pantalla. Tocar a la derecha pasa al siguiente, a la izquierda vuelve,
 * y mantener presionado pausa (igual que en Instagram).
 */
export function StoryPhone({ items, label, className }: { items: MediaItem[]; label: string; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videos = useRef(new Map<string, HTMLVideoElement>());
  const shownIndex = useRef(-1);
  const pressedAt = useRef(0);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);

  const count = items.length;
  const current = items[index];
  const playing = inView && !held;

  const go = useCallback(
    (step: number) => {
      setVideoProgress(0);
      setIndex((value) => (value + step + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    let visible = false;
    const update = () => setInView(visible && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!playing || count < 2) return;
    const timer = window.setTimeout(() => go(1), current.type === "image" ? IMAGE_MS : VIDEO_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, count, current.type, go]);

  // Reproduce solo el video que está al frente; al llegar a él, empieza desde el principio.
  useEffect(() => {
    for (const [src, video] of videos.current) {
      const isCurrent = current.type === "video" && src === current.src;
      if (isCurrent && shownIndex.current !== index) video.currentTime = 0;
      if (isCurrent && playing) video.play().catch(() => undefined);
      else video.pause();
    }
    shownIndex.current = index;
  }, [playing, index, current]);

  // Un toque corto navega; si se mantuvo presionado (pausa), al soltar no cambia de historia.
  const tap = (step: number) => {
    if (Date.now() - pressedAt.current < 350) go(step);
  };

  // Solo se montan la actual, la anterior y la siguiente, para que la página cargue rápido.
  const visibleIndexes = Array.from(new Set([(index - 1 + count) % count, index, (index + 1) % count]));

  return (
    <div ref={rootRef} className={cn("story-phone", className)} role="group" aria-label={label}>
      <div
        className="story__screen"
        onPointerDown={() => {
          pressedAt.current = Date.now();
          setHeld(true);
        }}
        onPointerUp={() => setHeld(false)}
        onPointerCancel={() => setHeld(false)}
        onPointerLeave={() => setHeld(false)}
      >
        {visibleIndexes.map((itemIndex) => {
          const item = items[itemIndex];
          const offset = (itemIndex - index + count) % count;
          const position = offset === 0 ? "active" : offset === 1 ? "next" : "prev";
          return (
            <div key={item.src} className={`story__slide story__slide--${position}`} aria-hidden={offset !== 0}>
              {item.type === "video" ? (
                <video
                  ref={(element) => {
                    if (!element) return;
                    videos.current.set(item.src, element);
                    return () => {
                      videos.current.delete(item.src);
                    };
                  }}
                  src={`${item.src}#t=0.1`}
                  muted={muted}
                  playsInline
                  preload="metadata"
                  className="story__video"
                  onEnded={() => go(1)}
                  onTimeUpdate={(event) => {
                    const video = event.currentTarget;
                    if (offset === 0 && video.duration) setVideoProgress(video.currentTime / video.duration);
                  }}
                />
              ) : (
                <>
                  <Image src={item.src} alt="" fill sizes="16rem" className="story__backdrop" />
                  <Image
                    src={item.src}
                    alt={`${label}: historia ${itemIndex + 1}`}
                    fill
                    sizes="16rem"
                    className="story__image"
                  />
                </>
              )}
            </div>
          );
        })}

        <span aria-hidden="true" className="story__shade" />
        <span aria-hidden="true" className="story__notch" />

        <div aria-hidden="true" className="story__bars">
          {items.map((item, itemIndex) => (
            <span key={item.src} className="story__bar">
              {itemIndex < index ? <span className="story__fill" style={{ width: "100%" }} /> : null}
              {itemIndex === index && current.type === "video" ? (
                <span className="story__fill" style={{ width: `${videoProgress * 100}%` }} />
              ) : null}
              {itemIndex === index && current.type === "image" && playing ? (
                <span key={`${index}-${String(playing)}`} className="story__fill story__fill--timed" />
              ) : null}
            </span>
          ))}
        </div>

        <div aria-hidden="true" className="story__head">
          <Image src="/brand/emblema-mb.png" alt="" width={48} height={48} className="story__avatar" />
          <span>
            <strong>MB Signature</strong> · Ganadores
          </span>
        </div>

        <button type="button" className="story__tap story__tap--prev" onClick={() => tap(-1)} aria-label="Anterior" />
        <button type="button" className="story__tap story__tap--next" onClick={() => tap(1)} aria-label="Siguiente" />

        {current.type === "video" ? (
          <button
            type="button"
            className="story__sound"
            onClick={() => setMuted((value) => !value)}
            aria-pressed={!muted}
            aria-label={muted ? "Activar sonido" : "Silenciar"}
          >
            {muted ? <VolumeX className="size-4" strokeWidth={2} /> : <Volume2 className="size-4" strokeWidth={2} />}
          </button>
        ) : null}
      </div>
    </div>
  );
}
