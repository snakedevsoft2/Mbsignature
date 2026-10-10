"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

const AUTOPLAY_MS = 3600;
const PAUSE_AFTER_TOUCH_MS = 7000;

export function WinnersCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const hoveredRef = useRef(false);
  const pausedUntilRef = useRef(0);

  const move = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = item ? item.offsetWidth + gap : track.clientWidth;
    const max = track.scrollWidth - track.clientWidth;

    if (direction > 0 && track.scrollLeft >= max - 8) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction < 0 && track.scrollLeft <= 8) {
      track.scrollTo({ left: max, behavior: "smooth" });
    } else {
      track.scrollBy({ left: direction * distance, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.4 },
    );
    observer.observe(track);

    const timer = window.setInterval(() => {
      const paused = hoveredRef.current || Date.now() < pausedUntilRef.current;
      if (inView && !paused && !document.hidden) move(1);
    }, AUTOPLAY_MS);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [move]);

  const holdAutoplay = () => {
    pausedUntilRef.current = Date.now() + PAUSE_AFTER_TOUCH_MS;
  };

  return (
    <div
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") hoveredRef.current = true;
      }}
      onPointerLeave={() => {
        hoveredRef.current = false;
      }}
      onPointerDown={holdAutoplay}
      onFocus={holdAutoplay}
    >
      <ul ref={trackRef} className="winners-track" aria-label="Ganadores">
        {children}
      </ul>
      <button
        type="button"
        onClick={() => {
          holdAutoplay();
          move(-1);
        }}
        className="carousel-btn left-0 -translate-x-1/2"
        aria-label="Ver ganadores anteriores"
      >
        <ChevronLeft className="size-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={() => {
          holdAutoplay();
          move(1);
        }}
        className="carousel-btn right-0 translate-x-1/2"
        aria-label="Ver más ganadores"
      >
        <ChevronRight className="size-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
