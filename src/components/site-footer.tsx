import { cacheLife } from "next/cache";
import { site } from "@/config/site";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <p className="footer__brand">MB Signature</p>
      <p className="mt-2">
        © <CurrentYear /> {site.name} · Solo para mayores de 18 años. Participa con responsabilidad.
      </p>
    </footer>
  );
}
