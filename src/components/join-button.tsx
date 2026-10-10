import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

type JoinButtonProps = {
  /** Dónde está el botón; se envía como dato al Pixel de Meta. */
  location: string;
  label?: string;
  sublabel?: string;
  size?: "md" | "lg";
  className?: string;
  id?: string;
};

export function JoinButton({
  location,
  label = "Unirme al Grupo Signature",
  sublabel,
  size = "md",
  className,
  id,
}: JoinButtonProps) {
  return (
    <a
      id={id}
      href={site.whatsappGroupUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-track="join-group"
      data-track-location={location}
      className={cn("btn-gold", size === "lg" && "btn-gold--lg", className)}
    >
      <span className="btn-gold__icon">
        <WhatsAppIcon />
      </span>
      <span className="flex flex-col items-start text-left">
        <span className="btn-gold__label">{label}</span>
        {sublabel ? <span className="btn-gold__sublabel">{sublabel}</span> : null}
      </span>
      <span className="sr-only"> (se abre WhatsApp)</span>
    </a>
  );
}
