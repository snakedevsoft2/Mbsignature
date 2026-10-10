"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, site } from "@/config/site";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand";
import { WhatsAppIcon } from "./icons";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navItems[0].href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Marca en el menú la sección que está en el centro de la pantalla.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
        solid ? "border-gold-400/15 bg-ink/90 backdrop-blur-md" : "border-gold-400/10 bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <a
          href="#inicio"
          aria-label="MB Signature Rifas, ir al inicio"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link" aria-current={active === item.href ? "true" : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="join-group"
            data-track-location="header"
            className="btn-outline"
          >
            <WhatsAppIcon className="size-4" />
            <span className="hidden sm:inline">Unirme al grupo</span>
            <span className="sm:hidden">Unirme</span>
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-gold-100 transition-colors hover:bg-gold-400/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-out lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <nav aria-label="Menú móvil" className="overflow-hidden">
          <ul className="container-page flex flex-col pb-6 pt-2">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-gold-400/10 last:border-none">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-xl text-cream transition-colors hover:text-gold-200"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-gold-400">
                    ›
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
