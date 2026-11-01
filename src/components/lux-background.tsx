import { Starfield } from "./starfield";

/** Fondo fijo de toda la página: negro profundo con luces dorada y verde, retícula sutil y estrellas. */
export function LuxBackground() {
  return (
    <div aria-hidden="true" className="lux-bg">
      <div className="lux-bg__grid" />
      <Starfield className="absolute inset-0 size-full" />
      <div className="lux-bg__grain" />
    </div>
  );
}
