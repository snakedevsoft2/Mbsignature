import { Hero } from "@/components/hero";
import { JoinButton } from "@/components/join-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Winners } from "@/components/winners";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <Hero />
        <Winners />
        {/* El único botón de la página: flota abajo mientras se lee y se acomoda al final. */}
        <div className="join-dock">
          <JoinButton />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
