import { site } from "@/config/site";
import { InstagramIcon } from "./icons";

export function Closing() {
  return (
    <section aria-labelledby="cierre-title" className="section container-page">
      <div className="closing reveal">
        <span aria-hidden="true" className="closing__glow" />
        <p className="eyebrow">Más de {site.yearsOfExperience} años cumpliendo sueños</p>
        <h2 id="cierre-title" className="closing__title">
          La suerte también está <span className="text-gold-grad">en los grupos</span>
        </h2>
        <p className="closing__text">
          Entra hoy al Grupo Signature y no te pierdas la dinámica del día. Unirte es gratis, solo
          necesitas WhatsApp.
        </p>
        {site.instagram ? (
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link mt-6">
            <InstagramIcon className="size-4" />
            Síguenos en nuestro Instagram oficial
          </a>
        ) : null}
      </div>
    </section>
  );
}
