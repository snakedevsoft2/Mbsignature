const phrases = [
  "Todos los días hay un ganador",
  "Dinámicas diarias",
  "Grupo oficial de WhatsApp",
  "La suerte también está en los grupos",
];

/** Franja con frases que se desplazan sin parar. */
export function Ticker() {
  const items = [...phrases, ...phrases];

  return (
    <div aria-hidden="true" className="ticker">
      <div className="ticker__track">
        {items.map((phrase, index) => (
          <span key={index} className="ticker__item">
            {phrase}
            <svg viewBox="0 0 10 10" className="ticker__gem">
              <path d="M5 0 10 5 5 10 0 5Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
