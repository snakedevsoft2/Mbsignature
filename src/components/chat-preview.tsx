"use client";

import {
  ArrowLeft,
  Camera,
  CheckCheck,
  Crown,
  EllipsisVertical,
  Mic,
  Paperclip,
  Smile,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Message =
  | { kind: "raffle"; time: string }
  | { kind: "in"; text: string; time: string; winner?: boolean }
  | { kind: "out"; text: string; time: string };

const messages: Message[] = [
  { kind: "raffle", time: "8:30 p. m." },
  { kind: "out", text: "¡Quiero el 42!", time: "8:31 p. m." },
  { kind: "in", text: "Número 42 apartado. Envía tu comprobante para confirmarlo.", time: "8:32 p. m." },
  { kind: "in", text: "¡Ya tenemos ganadora! Felicidades a nuestra ganadora.", time: "9:00 p. m.", winner: true },
];

/** Vista ilustrativa del grupo de WhatsApp; los mensajes aparecen en secuencia. */
export function ChatPreview() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(messages.length);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timers: number[] = [];
    let playing = false;
    const clear = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const play = () => {
      clear();
      setTyping(false);
      setCount(0);
      let t = 450;
      messages.forEach((message, index) => {
        if (message.kind !== "out") {
          at(t, () => setTyping(true));
          t += 1100;
        }
        at(t, () => {
          setTyping(false);
          setCount(index + 1);
        });
        t += 1500;
      });
      at(t + 4000, play);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playing) {
          playing = true;
          play();
        } else if (!entry.isIntersecting && playing) {
          playing = false;
          clear();
          setTyping(false);
          setCount(messages.length);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      clear();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative" aria-hidden="true">
      <div className="phone-glow" />

      <div className="phone">
        <div className="phone__screen">
          <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[0.62rem] font-medium text-cream/80">
            <span>8:30</span>
            <span className="h-[1.15rem] w-[4.5rem] rounded-full bg-black" />
            <span className="flex items-end gap-[2px]">
              <span className="h-1.5 w-[3px] rounded-sm bg-cream/80" />
              <span className="h-2 w-[3px] rounded-sm bg-cream/80" />
              <span className="h-2.5 w-[3px] rounded-sm bg-cream/80" />
              <span className="ml-1 h-2.5 w-5 rounded-[3px] border border-cream/70 p-[1px]">
                <span className="block h-full w-3/4 rounded-[1px] bg-cream/80" />
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 border-b border-gold-400/10 bg-ink-3/90 px-3 py-2.5">
            <ArrowLeft className="size-4 text-cream/70" strokeWidth={1.75} />
            <span className="grid size-8 place-items-center rounded-full bg-gold-gradient font-display text-[0.7rem] font-bold text-[#1d1505]">
              MB
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[0.8rem] font-semibold text-cream">Grupo Signature</p>
              <p className="truncate text-[0.62rem] text-muted">Comunidad · Rifas exclusivas</p>
            </div>
            <EllipsisVertical className="size-4 text-cream/60" strokeWidth={1.75} />
          </div>

          <div className="chat-wallpaper flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
            <span className="mx-auto mb-auto rounded-md bg-ink-3/90 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.14em] text-muted">
              Hoy
            </span>
            {messages.slice(0, count).map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))}
            {typing ? (
              <div className="bubble bubble--in chat-in w-fit">
                <span className="typing" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 bg-ink-3/90 px-2.5 pb-4 pt-2">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-ink-2 px-3 py-2 text-[0.68rem] text-muted">
              <Smile className="size-4" strokeWidth={1.5} />
              <span className="flex-1">Escribe un mensaje</span>
              <Paperclip className="size-4" strokeWidth={1.5} />
              <Camera className="size-4" strokeWidth={1.5} />
            </div>
            <span className="grid size-9 place-items-center rounded-full bg-gold-gradient text-[#1d1505]">
              <Mic className="size-4" strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: Message }) {
  if (message.kind === "raffle") {
    return (
      <div className="bubble bubble--in chat-in w-[86%] overflow-hidden p-0">
        <p className="px-3 pt-2 text-[0.62rem] font-semibold text-gold-300">MB Signature</p>
        <div className="mx-2 mt-1.5 rounded-lg border border-gold-400/25 bg-ink/60 p-2.5">
          <p className="flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold-200">
            <Crown className="size-3" strokeWidth={1.75} />
            Rifa activa
          </p>
          <p className="mt-1.5 text-[0.72rem] text-cream/90">
            Premio: <span className="font-display text-sm font-semibold text-gold-100">$1.000.000</span>
          </p>
          <p className="text-[0.66rem] text-muted">Elige tu número · Cupos limitados</p>
        </div>
        <MessageTime time={message.time} className="px-3 pb-1.5" />
      </div>
    );
  }

  if (message.kind === "out") {
    return (
      <div className="bubble bubble--out chat-in ml-auto max-w-[80%]">
        <p>{message.text}</p>
        <MessageTime time={message.time} read />
      </div>
    );
  }

  return (
    <div className={cn("bubble bubble--in chat-in max-w-[86%]", message.winner && "bubble--winner")}>
      <p className="text-[0.62rem] font-semibold text-gold-300">MB Signature</p>
      <p className="mt-0.5">{message.text}</p>
      <MessageTime time={message.time} />
    </div>
  );
}

function MessageTime({ time, read, className }: { time: string; read?: boolean; className?: string }) {
  return (
    <span className={cn("mt-0.5 flex items-center justify-end gap-1 text-[0.55rem] text-muted", className)}>
      {time}
      {read ? <CheckCheck className="size-3 text-gold-300" strokeWidth={2} /> : null}
    </span>
  );
}
