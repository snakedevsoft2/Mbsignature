import Image from "next/image";
import { CrownMark } from "./icons";
import { JoinButton } from "./join-button";

export function CtaBand() {
  return (
    <section id="unirme" aria-labelledby="unirme-title" className="section pt-0">
      <div className="container-page">
        <div className="cta-band reveal">
          <div aria-hidden="true" className="cta-band__media">
            <Image src="/brand/premio-dorado.jpg" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <CrownMark className="cta-band__crown" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div className="text-center lg:text-left">
              <p className="font-script text-[clamp(2.3rem,4.6vw,3.3rem)] leading-none text-gold-300">Tu próximo</p>
              <h2
                id="unirme-title"
                className="display-caps mt-1 font-display text-[clamp(2.1rem,4.8vw,3.6rem)] font-semibold uppercase leading-[0.95] text-cream"
              >
                Premio te espera
              </h2>
              <p className="mt-5 text-[1.05rem] text-cream/75">Únete ahora y no te quedes por fuera.</p>
            </div>
            <div className="flex justify-center">
              <JoinButton location="final" size="lg" label="Unirme al grupo" sublabel="Rifas exclusivas" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
