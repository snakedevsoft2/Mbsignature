"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

/** Imagen en marco vertical que se abre en grande al tocarla. */
export function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" className="phone phone--image" onClick={show} aria-label={`Ver en grande: ${alt}`}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 14rem, (min-width: 640px) 30vw, 46vw" />
      </button>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={alt}
        onClose={() => setOpen(false)}
        // Tocar fuera de la imagen también la cierra.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {open ? (
          <div className="lightbox__frame">
            <Image src={src} alt={alt} fill sizes="(min-width: 640px) 32rem, 92vw" />
          </div>
        ) : null}
        <button type="button" className="lightbox__close" onClick={close} aria-label="Cerrar">
          <X className="size-5" strokeWidth={2} />
        </button>
      </dialog>
    </>
  );
}
