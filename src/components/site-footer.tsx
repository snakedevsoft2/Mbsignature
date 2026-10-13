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
      <p>
        © <CurrentYear /> {site.name} · Solo para mayores de 18 años. Participa con responsabilidad.
      </p>
      {site.instagram ? (
        <p className="mt-1.5">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="footer__link">
            Síguenos en Instagram
          </a>
        </p>
      ) : null}
    </footer>
  );
}
