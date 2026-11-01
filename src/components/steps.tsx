import { Ticket, Trophy } from "lucide-react";
import { WhatsAppIcon } from "./icons";

const steps = [
  {
    icon: WhatsAppIcon,
    title: "Únete al grupo",
    text: "Toca el botón verde y entra gratis al Grupo Signature en WhatsApp.",
  },
  {
    icon: Ticket,
    title: "Elige tu número",
    text: "Cada día publicamos la dinámica con su premio. Escoge tu número y confírmalo con tu pago.",
  },
  {
    icon: Trophy,
    title: "Sigue el resultado",
    text: "El resultado se comparte en el grupo. Todos los días hay un ganador.",
  },
];

export function Steps() {
  return (
    <section aria-labelledby="pasos-title" className="section container-page">
      <p className="eyebrow reveal">Cómo funciona</p>
      <h2 id="pasos-title" className="section__title reveal">
        Participar es <span className="text-gold-grad">muy fácil</span>
      </h2>

      <ol className="steps">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <li key={title} className="step reveal">
            <span aria-hidden="true" className="step__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="step__icon">
              <Icon className="size-5" strokeWidth={1.8} />
            </span>
            <h3 className="step__title">{title}</h3>
            <p className="step__text">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
