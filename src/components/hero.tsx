import { Banknote, Ticket } from "lucide-react";
import { site } from "@/config/site";
import { formatNumber } from "@/lib/utils";
import { HeroVideo } from "./hero-video";
import { WhatsAppIcon } from "./icons";

const perks = [
  { icon: WhatsAppIcon, label: "Grupo privado en WhatsApp" },
  { icon: Ticket, label: "Tú eliges tu número" },
  { icon: Banknote, label: "Premios en efectivo" },
];

export function Hero() {
  const { offer, video } = site;

  return (
    <section aria-labelledby="hero-title" className="hero">
      <Confetti />

      <div className="hero__grid">
        <h1 id="hero-title" className="offer">
          <span className="offer__lead">Con solo</span>{" "}
          <span className="offer__num">{formatNumber(offer.price)}</span>{" "}
          <span className="offer__ribbon">Pesos</span>{" "}
          <span className="offer__lead offer__lead--gap">Puedes ganar</span>{" "}
          <span className="offer__small">hasta</span>{" "}
          <span className="offer__num">{formatNumber(offer.prize)}</span>{" "}
          <span className="offer__ribbon">En efectivo</span>
        </h1>

        <HeroVideo
          src={video.src}
          poster={video.poster}
          label="Video de Marcela, creadora de MB Signature, invitando a unirse al grupo"
        />
      </div>

      <ul className="perks">
        {perks.map(({ icon: Icon, label }) => (
          <li key={label}>
            <Icon className="perks__icon" strokeWidth={1.6} />
            {label}
          </li>
        ))}
      </ul>

      <p className="hint">
        Toca el botón verde y únete
        <svg viewBox="0 0 40 52" aria-hidden="true" className="hint__arrow">
          <path d="M13 3h14v24h10L20 48 3 27h10Z" />
        </svg>
      </p>
    </section>
  );
}

/** Tiras doradas sueltas, como confeti, en los bordes del inicio. */
function Confetti() {
  const strips = [
    [6, 8, -28],
    [18, 30, 40],
    [4, 52, 12],
    [12, 76, -50],
    [88, 6, 35],
    [95, 26, -20],
    [84, 48, 60],
    [93, 70, -38],
    [46, 3, 70],
    [62, 92, -15],
  ];

  return (
    <div aria-hidden="true" className="confetti">
      {strips.map(([x, y, angle]) => (
        <span key={`${x}-${y}`} style={{ left: `${x}%`, top: `${y}%`, rotate: `${angle}deg` }} />
      ))}
    </div>
  );
}
