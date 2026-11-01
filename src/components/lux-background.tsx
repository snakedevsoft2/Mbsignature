import { Starfield } from "./starfield";

/**
 * Fondo fijo de toda la página: negro profundo con luces dorada y verde que se mueven despacio,
 * retícula sutil, estrellas y, en computador, una luz que sigue al mouse.
 */
export function LuxBackground() {
  return (
    <div aria-hidden="true" className="lux-bg">
      <div className="lux-bg__aurora lux-bg__aurora--gold" />
      <div className="lux-bg__aurora lux-bg__aurora--green" />
      <div className="lux-bg__grid" />
      <Starfield className="absolute inset-0 size-full" />
      <div className="lux-bg__spot" />
      <div className="lux-bg__grain" />
    </div>
  );
}
