import { Banknote, CalendarCheck, Crown, Trophy } from "lucide-react";
import { site } from "@/config/site";
import { delay } from "@/lib/utils";
import { PhoneVideo } from "./phone-video";

const titleWords = ["Todos", "los", "días", "hay", "un"];

const highlights = [
  { icon: CalendarCheck, label: "Dinámicas diarias" },
  { icon: Banknote, label: "Premios reales" },
  { icon: Crown, label: `Más de ${site.yearsOfExperience} años` },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero container-page">
      <div className="hero__copy">
        <p className="live-pill rise">
          <span aria-hidden="true" className="live-dot" />
          Grupo oficial de WhatsApp
        </p>

        {/* Cada palabra entra por separado; "ganador" llega al final con brillo dorado. */}
        <h1 id="hero-title" className="hero__title">
          {titleWords.map((word, index) => (
            <span key={word}>
              <span className="hero__word" style={delay(120 + index * 80)}>
                {word}
              </span>{" "}
            </span>
          ))}
          <span className="hero__accent gold-shimmer" style={delay(560)}>
            ganador
            <svg aria-hidden="true" viewBox="0 0 300 24" preserveAspectRatio="none" className="hero__stroke">
              <path d="M4 17C70 7 160 4 296 11" />
            </svg>
          </span>
        </h1>

        <p className="hero__lead rise" style={delay(780)}>
          Únete gratis al <strong>Grupo Signature</strong> en WhatsApp y participa en nuestras dinámicas
          diarias. ¿El próximo ganador? Puedes ser tú.
        </p>

        <ul className="hero__highlights">
          {highlights.map(({ icon: Icon, label }, index) => (
            <li key={label} className="rise" style={delay(920 + index * 110)}>
              <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__media">
        <span aria-hidden="true" className="hero__halo" />
        <div className="tilt" data-tilt>
          <span aria-hidden="true" className="phone-glow" />
          <PhoneVideo
            src={site.video.src}
            poster={site.video.poster}
            label="Video de Marcela, creadora de MB Signature, invitando a unirse al grupo"
            eager
          />
        </div>
        <p aria-hidden="true" className="float-chip float-chip--top">
          <span className="live-dot" />
          En vivo en el grupo
        </p>
        <p aria-hidden="true" className="float-chip float-chip--bottom">
          <Trophy className="size-4 text-gold" strokeWidth={1.8} />
          Un ganador cada día
        </p>
      </div>
    </section>
  );
}
