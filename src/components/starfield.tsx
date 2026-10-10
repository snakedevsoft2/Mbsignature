"use client";

import { useEffect, useRef } from "react";

type Star = {
  /** Posición normalizada (0..1) dentro del lienzo. */
  x: number;
  y: number;
  r: number;
  /** 0.25 = lejana, 1 = cercana: define la velocidad de deriva y el paralaje. */
  depth: number;
  base: number;
  amp: number;
  speed: number;
  phase: number;
  flare: boolean;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  ttl: number;
  length: number;
};

// Velocidad de deriva (px/s) de la estrella más cercana.
const DRIFT_X = -8;
const DRIFT_Y = -4.5;
// Desplazamiento máximo (px) de la estrella más cercana al mover el mouse.
const PARALLAX_X = 22;
const PARALLAX_Y = 14;
// Cada cuánto cruza una estrella fugaz (ms).
const METEOR_MIN_GAP = 4000;
const METEOR_MAX_GAP = 8000;

/**
 * Cielo de estrellas que flotan despacio, titilan y de vez en cuando dejan pasar una estrella fugaz.
 * En escritorio se desplaza un poco con el mouse. Se pausa fuera de pantalla y respeta "reducir movimiento".
 */
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
    let meteors: Meteor[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let nextMeteor = 0;
    let running = false;
    let inView = false;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const createStars = () => {
      const count = Math.round(Math.min(150, (width * height) / 7500));
      stars = Array.from({ length: count }, () => {
        const isFlare = Math.random() < 0.05;
        const depth = isFlare ? 1 : 0.25 + Math.random() * 0.75;
        return {
          x: Math.random(),
          y: Math.random(),
          r: isFlare ? 1.1 + Math.random() * 0.7 : 0.3 + depth * 0.85 + Math.random() * 0.15,
          depth,
          base: isFlare ? 0.5 : 0.15 + Math.random() * 0.4,
          amp: 0.1 + Math.random() * 0.25,
          speed: 0.35 + Math.random() * 1.1,
          phase: Math.random() * Math.PI * 2,
          flare: isFlare,
        };
      });
    };

    const spawnMeteor = () => {
      const scale = Math.max(0.6, Math.min(1, width / 900));
      const angle = ((140 + Math.random() * 20) * Math.PI) / 180;
      const speed = (650 + Math.random() * 350) * scale;
      meteors.push({
        x: width * (0.35 + Math.random() * 0.65),
        y: height * Math.random() * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        age: 0,
        ttl: 0.8 + Math.random() * 0.5,
        length: (110 + Math.random() * 70) * scale,
      });
    };

    const render = (time: number) => {
      const t = time / 1000;
      const offsetX = -pointer.x * PARALLAX_X;
      const offsetY = -pointer.y * PARALLAX_Y;
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const alpha = Math.min(1, Math.max(0, star.base + star.amp * Math.sin(t * star.speed + star.phase)));
        const x = star.x * width + offsetX * star.depth;
        const y = star.y * height + offsetY * star.depth;
        const size = star.r * 6;
        ctx.globalAlpha = alpha;
        ctx.drawImage(glow, x - size / 2, y - size / 2, size, size);
        if (star.flare) {
          const span = star.r * 14;
          ctx.globalAlpha = alpha * 0.6;
          ctx.drawImage(flare, x - span / 2, y - span / 2, span, span);
        }
      }

      for (const meteor of meteors) {
        const fade = Math.sin(Math.PI * Math.min(1, meteor.age / meteor.ttl));
        const speed = Math.hypot(meteor.vx, meteor.vy);
        const tailX = meteor.x - (meteor.vx / speed) * meteor.length;
        const tailY = meteor.y - (meteor.vy / speed) * meteor.length;
        const trail = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        trail.addColorStop(0, `rgba(255, 247, 226, ${0.9 * fade})`);
        trail.addColorStop(0.3, `rgba(236, 204, 130, ${0.4 * fade})`);
        trail.addColorStop(1, "rgba(236, 204, 130, 0)");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.globalAlpha = fade;
        ctx.drawImage(glow, meteor.x - 5, meteor.y - 5, 10, 10);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      if (width && height) {
        const dt = last ? Math.min(time - last, 50) / 1000 : 0;
        last = time;

        const ease = Math.min(1, dt * 3);
        pointer.x += (pointer.targetX - pointer.x) * ease;
        pointer.y += (pointer.targetY - pointer.y) * ease;

        for (const star of stars) {
          star.x += (DRIFT_X * star.depth * dt) / width;
          star.y += (DRIFT_Y * star.depth * dt) / height;
          if (star.x < -0.02) star.x += 1.04;
          else if (star.x > 1.02) star.x -= 1.04;
          if (star.y < -0.02) star.y += 1.04;
          else if (star.y > 1.02) star.y -= 1.04;
        }

        if (!nextMeteor) nextMeteor = time + 1500 + Math.random() * 1500;
        if (time >= nextMeteor) {
          spawnMeteor();
          nextMeteor = time + METEOR_MIN_GAP + Math.random() * (METEOR_MAX_GAP - METEOR_MIN_GAP);
        }
        for (const meteor of meteors) {
          meteor.x += meteor.vx * dt;
          meteor.y += meteor.vy * dt;
          meteor.age += dt;
        }
        meteors = meteors.filter((meteor) => meteor.age < meteor.ttl);

        render(time);
      }
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion || !inView || document.hidden) return;
      running = true;
      last = 0;
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
      render(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.targetY = (event.clientY / window.innerHeight) * 2 - 1;
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
    if (!reducedMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
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
