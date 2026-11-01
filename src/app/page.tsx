import { Closing } from "@/components/closing";
import { GroupMedia } from "@/components/group-media";
import { Hero } from "@/components/hero";
import { JoinButton } from "@/components/join-button";
import { LuxBackground } from "@/components/lux-background";
import { PageMotion } from "@/components/page-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Steps } from "@/components/steps";
import { Ticker } from "@/components/ticker";

export default function Home() {
  return (
    <>
      <LuxBackground />
      <SiteHeader />
      <main>
        <Hero />
        <Ticker />
        <Steps />
        <GroupMedia />
        <Closing />
        {/* El único botón de la página: flota abajo mientras se lee y se acomoda al final. */}
        <div className="join-dock">
          <JoinButton />
        </div>
      </main>
      <SiteFooter />
      <PageMotion />
    </>
  );
}
