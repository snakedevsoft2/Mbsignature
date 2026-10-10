import { Lock, ShieldCheck, Star, Zap } from "lucide-react";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { site } from "@/config/site";
import { BrandMark } from "./brand";

const guarantees = [
  { icon: Lock, label: "100% seguro" },
  { icon: Zap, label: "Participación rápida" },
  { icon: ShieldCheck, label: "Respaldo garantizado" },
  { icon: Star, label: "La mejor experiencia" },
];

const socials = [
  { label: "Instagram", href: site.social.instagram, icon: "/brand/instagram-dorado.png", track: false },
  { label: "Grupo de WhatsApp", href: site.whatsappGroupUrl, icon: "/brand/whatsapp-dorado.png", track: true },
].filter((social) => social.href);

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer id="contacto" className="footer">
      <ul aria-label="Garantías" className="trust container-page">
        {guarantees.map(({ icon: Icon, label }) => (
          <li key={label} className="trust__item">
            <Icon className="size-5 shrink-0 text-gold-300" strokeWidth={1.4} />
            {label}
          </li>
        ))}
      </ul>

      <div className="container-page flex flex-col items-center pb-28 pt-14 text-center">
        <Image src="/brand/diamante.jpg" alt="" aria-hidden="true" width={220} height={220} className="footer-diamond" />

        <div className="footer-brand">
          <span aria-hidden="true" className="footer-brand__line" />
          <BrandMark large />
          <span aria-hidden="true" className="footer-brand__line footer-brand__line--end" />
        </div>

        <p className="mt-6 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-cream/75 sm:text-xs sm:tracking-[0.3em]">
          Confianza <span className="text-gold-400">·</span> Transparencia <span className="text-gold-400">·</span>{" "}
          Compromiso
        </p>

        <ul aria-label="Redes sociales" className="mt-8 flex items-center justify-center gap-5">
          {socials.map(({ label, href, icon, track }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-gold"
                data-track={track ? "join-group" : undefined}
                data-track-location={track ? "footer" : undefined}
              >
                <Image src={icon} alt="" width={128} height={128} sizes="2.75rem" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-md text-balance text-sm leading-relaxed text-muted">
          Más de {site.yearsOfExperience} años cumpliendo sueños. Nos vemos en el Grupo Signature.
        </p>

        <div className="mt-12 flex w-full flex-col items-center justify-between gap-2 border-t border-gold-400/10 pt-6 text-xs text-subtle sm:flex-row">
          <p>
            © <CurrentYear /> {site.name}. Todos los derechos reservados.
          </p>
          <p>Solo para mayores de 18 años. Participa con responsabilidad.</p>
        </div>
      </div>
    </footer>
  );
}
