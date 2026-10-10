import { About } from "@/components/about";
import { Benefits } from "@/components/benefits";
import { CtaBand } from "@/components/cta-band";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Steps } from "@/components/steps";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { Winners } from "@/components/winners";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <About />
        <Benefits />
        <Steps />
        <Winners />
        <CtaBand />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
