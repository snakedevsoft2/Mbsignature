import { Crown, ShieldCheck, Users, Zap } from "lucide-react";
import { site } from "@/config/site";

const features = [
  { icon: Crown, title: "Premios exclusivos", text: "Rifas que no se publican en ningún otro lado." },
  { icon: ShieldCheck, title: "Totalmente seguro", text: "Transparencia y confianza en cada rifa." },
  { icon: Zap, title: "Sorteos confiables", text: "Cada resultado se comparte con todo el grupo." },
  {
    icon: Users,
    title: "Comunidad activa",
    text: `Más de ${site.yearsOfExperience} años y cientos de ganadores.`,
  },
];

export function Features() {
  return (
    <section id="rifas" aria-labelledby="rifas-title" className="features">
      <h2 id="rifas-title" className="sr-only">
        Por qué participar en nuestras rifas
      </h2>
      <ul className="container-page grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
        {features.map(({ icon: Icon, title, text }) => (
          <li key={title} className="feature reveal">
            <span className="medallion size-14">
              <Icon className="size-6" strokeWidth={1.3} />
            </span>
            <h3 className="mt-5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-gold-200">{title}</h3>
            <p className="mx-auto mt-2 max-w-[14rem] text-[0.92rem] leading-relaxed text-cream/75">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
