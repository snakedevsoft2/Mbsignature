import Image from "next/image";
import { site } from "@/config/site";
import { InstagramIcon } from "./icons";

export function SiteHeader() {
  return (
    <header className="topbar">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/emblema-mb.png"
            alt=""
            width={320}
            height={320}
            sizes="2.75rem"
            preload
            className="topbar__emblem"
          />
          <p className="topbar__name">MB Signature</p>
        </div>
        {site.instagram ? (
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="topbar__ig"
            aria-label="Instagram oficial de MB Signature"
          >
            <InstagramIcon className="size-4" />
          </a>
        ) : null}
      </div>
    </header>
  );
}
