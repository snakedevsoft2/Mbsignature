import Image from "next/image";
import { site } from "@/config/site";
import { delay } from "@/lib/utils";
import { HeroVideo } from "./hero-video";
import { Sparkle } from "./icons";
import { JoinButton } from "./join-button";
import { Starfield } from "./starfield";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="hero relative isolate overflow-hidden"
    >
      <div aria-hidden="true" className="hero-bg absolute inset-0 -z-10">
        <div className="hero-wave hidden lg:block">
          <Image src="/brand/onda-dorada.jpg" alt="" fill sizes="46vw" className="object-cover object-right" />
        </div>
        <div className="hero-ribbons lg:hidden">
          <Image src="/brand/cintas-doradas.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <Starfield className="hero-stars absolute inset-0 size-full" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col items-center text-center">
          <p className="hero-eyebrow enter" style={delay(100)}>
            Sueña <span aria-hidden="true">·</span> Participa <span aria-hidden="true">·</span> Gana
          </p>

          <h1 id="hero-title" className="hero-name">
            <span className="sr-only">MB Signature Rifas</span>
            <span aria-hidden="true" className="hero-name__inner">
              <span className="hero-name__word enter-zoom" style={delay(200)}>
                MB
                <Sparkle className="hero-spark hero-spark--1" />
              </span>
              <span className="hero-name__script enter-write" style={delay(650)}>
                Signature
                <Sparkle className="hero-spark hero-spark--2" />
              </span>
              <span className="hero-name__word enter-zoom" style={delay(380)}>
                Rifas
                <Sparkle className="hero-spark hero-spark--3" />
              </span>
            </span>
          </h1>

          <p className="hero-lead enter" style={delay(900)}>
            Las mejores rifas, los premios más exclusivos.
          </p>
          <p className="hero-sub enter" style={delay(1000)}>
            En MB Signature Rifas convertimos tus sueños en oportunidades. Participa, gana y sé parte de
            una experiencia única.
          </p>

          <div className="mt-8 flex flex-col items-center enter" style={delay(1120)}>
            <JoinButton id="hero-cta" location="hero" size="lg" label="Unirme al grupo" sublabel="Rifas exclusivas" />
            <p className="mt-3.5 text-xs text-muted">Unirte es gratis, solo necesitas WhatsApp.</p>
          </div>
        </div>

        <div className="hero-media enter" style={delay(500)}>
          <HeroVideo
            src={site.video.src}
            poster={site.video.poster}
            label={`Video de ${site.founder.name} invitando a unirse al Grupo Signature`}
          />
          <Image
            src="/brand/corona.png"
            alt=""
            aria-hidden="true"
            width={520}
            height={291}
            sizes="9rem"
            className="hero-media__crown"
          />
        </div>
      </div>
    </section>
  );
}
