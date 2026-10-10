import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "reveal",
        align === "center" ? "mx-auto max-w-3xl text-center" : "text-center lg:text-left",
        className,
      )}
    >
      <p className={cn("eyebrow", align === "start" && "eyebrow--lg-start")}>
        <span>{eyebrow}</span>
      </p>
      <h2
        id={id}
        className="mt-5 text-balance font-display text-[clamp(2.05rem,4.6vw,3.35rem)] font-medium leading-[1.08] tracking-[-0.01em] text-cream"
      >
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{subtitle}</p> : null}
    </div>
  );
}
