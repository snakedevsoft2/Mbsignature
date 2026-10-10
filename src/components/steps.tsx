import { cn } from "@/lib/utils";
import { JoinButton } from "./join-button";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    title: "Entras al Grupo Signature",
    text: "Toca el botón y únete a nuestro grupo de WhatsApp.",
  },
  {
    title: "Ves las rifas disponibles",
    text: "Cada rifa se publica en el grupo con su premio.",
  },
  {
    title: "Eliges tu número favorito",
    text: "Escoge tu número de la suerte antes de que se agote.",
  },
  {
    title: "Realizas tu pago y envías comprobante",
    text: "Con tu comprobante, tu número queda confirmado.",
  },
  {
    title: "¡Listo! Ya estás participando",
    text: "Sigue el sorteo en el grupo. ¡Mucha suerte!",
  },
];

export function Steps() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="como-funciona-title"
          eyebrow="Cómo participar"
          title="¿Cómo participar?"
          subtitle="Así de fácil participas."
        />

        <ol className="relative mx-auto mt-16 grid max-w-md gap-10 lg:mt-20 lg:max-w-none lg:grid-cols-5 lg:gap-6">
          <span aria-hidden="true" className="steps-line" />
          {steps.map((step, index) => (
            <li key={step.title} className="reveal relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <span className={cn("step-medallion", index === steps.length - 1 && "step-medallion--final")}>
                <span className="text-gold-metal">{index + 1}</span>
              </span>
              <div className="pt-1.5 lg:pt-0">
                <h3 className="text-[0.86rem] font-semibold uppercase leading-snug tracking-[0.14em] text-cream">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="reveal mt-16 flex justify-center">
          <JoinButton location="como-funciona" sublabel="Grupo de WhatsApp" />
        </div>
      </div>
    </section>
  );
}
