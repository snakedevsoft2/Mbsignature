"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  amp: number;
  speed: number;
  phase: number;
  flare: boolean;
};

const FRAME_MS = 33;

/** Cielo de estrellas suaves que titilan. Se pausa fuera de pantalla y respeta "reducir movimiento". */
export function Starfield({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glow = createGlow();
    const flare = createFlare();
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let running = false;
    let inView = false;

    const createStars = () => {
      const count = Math.round(Math.min(150, (width * height) / 7500));
      stars = Array.from({ length: count }, () => {
        const isFlare = Math.random() < 0.05;
        return {
          x: Math.random(),
          y: Math.random(),
          r: isFlare ? 1.1 + Math.random() * 0.7 : 0.35 + Math.random() * 0.85,
          base: isFlare ? 0.5 : 0.15 + Math.random() * 0.4,
          amp: 0.1 + Math.random() * 0.25,
          speed: 0.35 + Math.random() * 1.1,
          phase: Math.random() * Math.PI * 2,
          flare: isFlare,
        };
      });
    };

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const alpha = Math.min(1, Math.max(0, star.base + star.amp * Math.sin(t * star.speed + star.phase)));
        const x = star.x * width;
        const y = star.y * height;
        const size = star.r * 6;
        ctx.globalAlpha = alpha;
        ctx.drawImage(glow, x - size / 2, y - size / 2, size, size);
        if (star.flare) {
          const span = star.r * 14;
          ctx.globalAlpha = alpha * 0.6;
          ctx.drawImage(flare, x - span / 2, y - span / 2, span, span);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      if (time - last >= FRAME_MS) {
        last = time;
        draw(time);
      }
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion || !inView || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const previousArea = width * height;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const area = width * height;
      if (!stars.length || Math.abs(area - previousArea) > previousArea * 0.4) createStars();
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    visibilityObserver.observe(canvas);

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

function createGlow() {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 32;
  const ctx = sprite.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 249, 232, 1)");
    gradient.addColorStop(0.22, "rgba(250, 234, 196, 0.75)");
    gradient.addColorStop(0.55, "rgba(226, 193, 120, 0.14)");
    gradient.addColorStop(1, "rgba(226, 193, 120, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  return sprite;
}

/** Destello en cruz para las pocas estrellas más brillantes. */
function createFlare() {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 64;
  const ctx = sprite.getContext("2d");
  if (ctx) {
    const horizontal = ctx.createLinearGradient(0, 32, 64, 32);
    const vertical = ctx.createLinearGradient(32, 0, 32, 64);
    for (const gradient of [horizontal, vertical]) {
      gradient.addColorStop(0, "rgba(255, 240, 205, 0)");
      gradient.addColorStop(0.5, "rgba(255, 246, 222, 0.9)");
      gradient.addColorStop(1, "rgba(255, 240, 205, 0)");
    }
    ctx.fillStyle = horizontal;
    ctx.fillRect(0, 31.4, 64, 1.2);
    ctx.fillStyle = vertical;
    ctx.fillRect(31.4, 0, 1.2, 64);
  }
  return sprite;
}
