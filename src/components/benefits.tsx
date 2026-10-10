import { BellRing, Gem, Gift, Ticket, Users } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { ChatPreview } from "./chat-preview";
import { SectionHeading } from "./section-heading";

const benefits = [
  {
    icon: Gem,
    title: "Acceso a rifas exclusivas",
    text: "Rifas que no se publican en ningún otro lado.",
  },
  {
    icon: Ticket,
    title: "Cupos limitados",
    text: "Más oportunidad de ganar al haber menos números.",
  },
  {
    icon: BellRing,
    title: "Información en tiempo real",
    text: "Entérate de todo al instante por el grupo.",
  },
  {
    icon: Gift,
    title: "Premios constantes",
    text: "Rifas diarias, semanales y especiales.",
  },
  {
    icon: Users,
    title: "Comunidad activa y confiable",
    text: `Más de ${site.yearsOfExperience} años de experiencia y cientos de ganadores.`,
  },
];

export function Benefits() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-title" className="section relative overflow-x-clip">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20 xl:gap-28">
        <div>
          <SectionHeading
            id="beneficios-title"
            align="start"
            eyebrow="Beneficios"
            title={
              <>
                ¿Por qué unirte al <span className="text-gold-soft">Grupo Signature</span>?
              </>
            }
          />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <li
                key={title}
                className={cn(
                  "benefit reveal",
                  index === benefits.length - 1 && "sm:col-span-2 lg:col-span-1",
                )}
              >
                <span className="medallion">
                  <Icon className="size-[1.15rem]" strokeWidth={1.4} />
                </span>
                <div>
                  <h3 className="text-[0.86rem] font-semibold uppercase tracking-[0.14em] text-gold-100">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal flex justify-center">
          <ChatPreview />
        </div>
      </div>
    </section>
  );
}
