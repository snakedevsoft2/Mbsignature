"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CrownMark } from "./icons";

/** Corona que se balancea cada vez que el puntero pasa sobre ella (o al tocarla en el celular). */
export function WiggleCrown({ className }: { className?: string }) {
  const [wiggling, setWiggling] = useState(false);

  return (
    <span
      className={cn(className, wiggling && "is-wiggling")}
      onPointerEnter={() => setWiggling(true)}
      onAnimationEnd={() => setWiggling(false)}
    >
      <CrownMark className="block h-auto w-full" />
    </span>
  );
}
