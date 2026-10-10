import Image from "next/image";
import { site } from "@/config/site";

/** Botón de WhatsApp fijo en la esquina: siempre visible, con ondas y un "timbre" periódico. */
export function WhatsAppFloat() {
  return (
    <a
      href={site.whatsappGroupUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-track="join-group"
      data-track-location="flotante"
      className="whatsapp-fab"
    >
      <Image
        src="/brand/whatsapp-dorado.png"
        alt=""
        width={128}
        height={129}
        sizes="2.25rem"
        loading="eager"
        className="whatsapp-fab__icon"
      />
      <span className="whatsapp-fab__label">Unirme al grupo</span>
      <span className="sr-only"> (se abre WhatsApp)</span>
    </a>
  );
}
