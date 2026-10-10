import { cn } from "@/lib/utils";

/** Sello "Más de N años de experiencia" con laureles dorados. */
export function ExperienceSeal({ years, className }: { years: number; className?: string }) {
  return (
    <div className={cn("seal relative aspect-square", className)}>
      <Laurel className="absolute inset-0 size-full opacity-85" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="seal__kicker">Más de</span>
        <span className="seal__number">
          <span className="text-gold-metal">{years}</span>
        </span>
        <span className="seal__caption">
          Años de
          <br />
          experiencia
        </span>
      </div>
    </div>
  );
}

const LEAF = "M0 0C5-4.6 12.5-4.8 18 0 12.5 4.8 5 4.6 0 0Z";

function Laurel({ className }: { className?: string }) {
  const cx = 100;
  const cy = 100;
  const radius = 80;
  const count = 11;
  const from = 116;
  const to = 244;

  const leaves = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const angle = ((from + (to - from) * t) * Math.PI) / 180;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    const tangent = (Math.atan2(Math.cos(angle), -Math.sin(angle)) * 180) / Math.PI;
    const scale = 1.05 - t * 0.4;
    return { x, y, tangent, scale };
  });

  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${(cx + radius * Math.cos(rad)).toFixed(2)} ${(cy + radius * Math.sin(rad)).toFixed(2)}`;
  };

  const branch = (
    <g fill="url(#g-gold)">
      <path
        d={`M${point(from - 6)}A${radius} ${radius} 0 0 1 ${point(to + 4)}`}
        fill="none"
        stroke="url(#g-gold)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {leaves.map(({ x, y, tangent, scale }, i) => (
        <g key={i} transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`}>
          <path d={LEAF} transform={`rotate(${(tangent - 34).toFixed(1)}) scale(${scale.toFixed(2)})`} />
          <path
            d={LEAF}
            opacity="0.85"
            transform={`rotate(${(tangent + 30).toFixed(1)}) scale(${(scale * 0.86).toFixed(2)})`}
          />
        </g>
      ))}
    </g>
  );

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      {branch}
      <g transform="translate(200 0) scale(-1 1)">{branch}</g>
    </svg>
  );
}
