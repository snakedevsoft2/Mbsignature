"use client";

import { useEffect } from "react";

/**
 * Animaciones que necesitan JS: bloques que aparecen al bajar, luz dorada que sigue al mouse
 * e inclinación 3D del video. No hace nada si el usuario pidió reducir movimiento.
 */
export function PageMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups: Array<() => void> = [];

    // Solo se esconden los bloques que todavía no están en pantalla, para que nada parpadee.
    const pending = Array.from(document.querySelectorAll<HTMLElement>(".reveal")).filter(
      (element) => element.getBoundingClientRect().top > window.innerHeight * 0.92,
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-pending");
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const element of pending) {
      element.classList.add("reveal-pending");
      revealObserver.observe(element);
    }
    cleanups.push(() => revealObserver.disconnect());

    if (window.matchMedia("(pointer: fine)").matches) {
      const root = document.documentElement;
      let frame = 0;
      const onPointerMove = (event: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          root.style.setProperty("--mx", `${event.clientX}px`);
          root.style.setProperty("--my", `${event.clientY}px`);
          root.classList.add("has-pointer");
        });
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onPointerMove);
        cancelAnimationFrame(frame);
      });

      for (const element of document.querySelectorAll<HTMLElement>("[data-tilt]")) {
        const onMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          element.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
          element.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
        };
        const onLeave = () => {
          element.style.setProperty("--rx", "0deg");
          element.style.setProperty("--ry", "0deg");
        };
        element.addEventListener("pointermove", onMove);
        element.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          element.removeEventListener("pointermove", onMove);
          element.removeEventListener("pointerleave", onLeave);
        });
      }
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
