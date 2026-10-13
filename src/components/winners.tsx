import { Sparkles } from "lucide-react";
import Image from "next/image";
import { winnerChats } from "@/config/site";

export function Winners() {
  if (winnerChats.length === 0) return null;

  return (
    <section aria-labelledby="ganadores-title" className="winners">
      <p className="pill">
        <Sparkles aria-hidden="true" className="size-3.5" strokeWidth={2} />
        Ganadores reales
      </p>
      <h2 id="ganadores-title" className="winners__title">
        Ellos ya <mark>ganaron</mark>
      </h2>
      <p className="winners__subtitle">Chats y comprobantes de pago de nuestros ganadores.</p>

      <ul className="chats">
        {winnerChats.map((chat) => (
          <li key={chat.src}>
            <Image
              src={chat.src}
              alt={chat.alt}
              width={chat.width}
              height={chat.height}
              sizes="(min-width: 1024px) 13rem, 74vw"
            />
          </li>
        ))}
      </ul>
      {winnerChats.length > 1 ? (
        <p aria-hidden="true" className="winners__swipe">
          Desliza para ver más →
        </p>
      ) : null}
    </section>
  );
}
