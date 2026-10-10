import { Crown } from "lucide-react";
import Image from "next/image";
import { winners, type Winner } from "@/config/site";
import { formatCOP } from "@/lib/utils";
import { CrownMark } from "./icons";
import { JoinButton } from "./join-button";
import { SectionHeading } from "./section-heading";
import { WinnersCarousel } from "./winners-carousel";

export function Winners() {
  return (
    <section id="ganadores" aria-labelledby="ganadores-title" className="section relative overflow-clip">
      <div aria-hidden="true" className="spotlight" />
      <div className="container-page relative">
        <SectionHeading
          id="ganadores-title"
          eyebrow="Ganadores reales"
          title={
            <>
              Ellos confiaron, participaron <span className="text-gold-soft">y ganaron</span>
            </>
          }
        />

        <div className="reveal mt-14">
          <WinnersCarousel>
            {winners.map((winner, index) => (
              <li
                key={index}
                className="shrink-0 basis-[76%] snap-start sm:basis-[46%] md:basis-[31.5%] lg:basis-[23.5%]"
              >
                <WinnerTicket winner={winner} index={index} />
              </li>
            ))}
          </WinnersCarousel>
        </div>

        <div className="reveal mt-12 flex justify-center">
          <JoinButton location="ganadores" label="Únete y sé el próximo ganador" />
        </div>
      </div>
    </section>
  );
}

function WinnerTicket({ winner, index }: { winner: Winner; index: number }) {
  const amount = formatCOP(winner.amount);

  return (
    <article className="winner-ticket">
      {winner.photo ? (
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={winner.photo}
            alt={`${winner.label} de ${amount}`}
            fill
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 76vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="relative overflow-hidden px-5 pb-6 pt-5">
        <CrownMark className="winner-ticket__watermark" />
        <div className="flex items-center justify-between text-[0.62rem] font-medium uppercase tracking-[0.28em]">
          <span className="inline-flex items-center gap-1.5 text-gold-300">
            <Crown className="size-3.5" strokeWidth={1.5} />
            {winner.label}
          </span>
          <span className="text-subtle">N.º {String(index + 1).padStart(2, "0")}</span>
        </div>
        <p className="mt-7 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-muted">Premio</p>
        <p className="mt-2 font-display text-[clamp(2rem,2.6vw,2.3rem)] font-semibold leading-none">
          <span className="text-gold-metal">{amount}</span>
        </p>
      </div>
      <div className="ticket-perf" />
      <p className="px-5 py-3.5 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-cream/65">
        Grupo Signature
      </p>
    </article>
  );
}
