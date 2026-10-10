import type { CSSProperties } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** 1200000 -> "$1.200.000" */
export function formatCOP(amount: number) {
  return `$${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

/** Retraso para las animaciones de entrada (`.enter`, `.enter-*`). */
export function delay(ms: number) {
  return { "--delay": `${ms}ms` } as CSSProperties;
}
