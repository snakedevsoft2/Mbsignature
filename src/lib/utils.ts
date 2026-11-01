import type { CSSProperties } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Retraso de una animación o aparición (`--d`), para escalonar elementos. */
export function delay(ms: number) {
  return { "--d": `${ms}ms` } as CSSProperties;
}
