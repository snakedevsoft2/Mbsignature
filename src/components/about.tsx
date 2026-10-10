import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { ExperienceSeal } from "./experience-seal";

export function About() {
  const { founder, yearsOfExperience } = site;

  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="section">
      <div className="container-page">
        <div className="card-lux relative overflow-clip rounded-[2rem] p-6 sm:p-10 lg:p-14">
          <div aria-hidden="true" className="card-lux__glow" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="reveal flex justify-center">
              {founder.photo ? (
                <div className="relative w-full max-w-sm">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] border border-gold-400/30">
                    <Image
                      src={founder.photo}
                      alt={founder.name}
                      fill
                      sizes="(min-width: 1024px) 24rem, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <ExperienceSeal
                    years={yearsOfExperience}
                    className="absolute -bottom-10 -right-4 w-40 sm:w-44"
                  />
                </div>
              ) : (
                <ExperienceSeal years={yearsOfExperience} className="w-[min(19rem,78vw)]" />
              )}
            </div>

            <div className={cn("text-center lg:text-left", founder.photo && "mt-6 lg:mt-0")}>
              <p className="eyebrow eyebrow--lg-start reveal">
                <span>Sobre mí</span>
              </p>
              <h2
                id="sobre-mi-title"
                className="reveal mt-4 font-script text-[clamp(3rem,7vw,4.6rem)] leading-[1.05] text-gold-200"
              >
                {founder.name}
              </h2>
              <p className="reveal mt-1 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-muted">
                {founder.role}
              </p>

              <div className="reveal mx-auto mt-8 max-w-xl space-y-4 text-[1.05rem] leading-relaxed text-cream/80 lg:mx-0">
                <p>
                  Soy {founder.name}, creadora de MB Signature. Llevo más de {yearsOfExperience} años
                  realizando rifas con total <strong className="font-medium text-cream">seriedad, transparencia y compromiso</strong>,
                  brindando oportunidades reales a muchas personas de ganar dinero y premios increíbles.
                </p>
                <p>
                  Mi objetivo es que cada persona tenga la oportunidad de ganar y vivir la emoción de
                  nuestras dinámicas.
                </p>
              </div>

              <blockquote className="reveal mx-auto mt-9 max-w-xl border-gold-400/50 text-left lg:mx-0 lg:border-l-2 lg:pl-6">
                <p className="text-center font-display text-[1.35rem] leading-snug text-cream sm:text-2xl lg:text-left">
                  Aquí no solo entras a un grupo…{" "}
                  <span className="text-gold-soft">entras a una comunidad donde sí se gana.</span>
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
