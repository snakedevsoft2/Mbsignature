import { site } from "@/config/site";
import { WhatsAppIcon } from "./icons";

export function JoinButton() {
  return (
    <a
      href={site.whatsappGroupUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-track="join-group"
      data-track-location="principal"
      className="btn-join"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      Quiero unirme al grupo
      <span className="sr-only"> (se abre WhatsApp)</span>
    </a>
  );
}
