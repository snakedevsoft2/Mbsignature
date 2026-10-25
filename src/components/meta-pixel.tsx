"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Pixel de Meta para medir las campañas (ID en `site.metaPixelId`).
 * Registra "PageView" al abrir la página y "Lead" con cada clic en el botón del grupo.
 */
export function MetaPixel({ pixelId }: { pixelId?: string }) {
  const id = pixelId?.replace(/\D/g, "");

  useEffect(() => {
    if (!id) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLElement>("[data-track='join-group']");
      if (!link) return;
      window.fbq?.("track", "Lead", {
        content_name: "Grupo Signature WhatsApp",
        content_category: link.dataset.trackLocation ?? "desconocido",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [id]);

  if (!id) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- píxel de seguimiento de 1x1, no es una imagen visible */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
