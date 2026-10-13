import { Crown } from "lucide-react";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="brand-band">
      <div className="brand-band__inner">
        <Image
          src="/brand/emblema-mb.png"
          alt=""
          width={320}
          height={320}
          sizes="5rem"
          preload
          className="brand-band__emblem"
        />
        <div className="flex flex-col items-center">
          <p className="brand-band__name">MB Signature</p>
          <p className="brand-band__tagline">
            <Crown aria-hidden="true" className="size-3" strokeWidth={2} />
            Sueña <span aria-hidden="true">·</span> Participa <span aria-hidden="true">·</span> Gana
            <Crown aria-hidden="true" className="size-3" strokeWidth={2} />
          </p>
        </div>
      </div>
    </header>
  );
}
