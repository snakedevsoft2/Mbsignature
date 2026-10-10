import { cn } from "@/lib/utils";
import { Sparkle } from "./icons";
import { WiggleCrown } from "./wiggle-crown";

/** Logo horizontal "MB Signature RIFAS", con la corona sobre la B y brillos animados. */
export function BrandMark({ className, large = false }: { className?: string; large?: boolean }) {
  return (
    <span className={cn("wordmark", large && "wordmark--lg", className)}>
      <span className="wordmark__mb">
        MB
        <WiggleCrown className="crown-on-b" />
      </span>
      <span className="wordmark__script">Signature</span>
      <span className="wordmark__rifas">Rifas</span>
      <Sparkle className="wordmark__spark wordmark__spark--1" />
      <Sparkle className="wordmark__spark wordmark__spark--2" />
      <Sparkle className="wordmark__spark wordmark__spark--3" />
    </span>
  );
}
