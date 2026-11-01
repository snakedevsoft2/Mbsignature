import Image from "next/image";
import { site } from "@/config/site";
import { getGroupMedia } from "@/lib/media";
import { InstagramIcon } from "./icons";
import { PhoneVideo } from "./phone-video";

/** Videos e imágenes de historias del grupo, en tarjetas verticales que se deslizan de lado. */
export function GroupMedia() {
  const media = getGroupMedia();
  if (media.length === 0) return null;

  return (
    <section aria-labelledby="grupo-title" className="section">
      <div className="container-page">
        <p className="eyebrow reveal">En el grupo</p>
        <h2 id="grupo-title" className="section__title reveal">
          Así se vive el <span className="text-gold-grad">Grupo Signature</span>
        </h2>
        <p className="section__lead reveal">Videos e historias reales de nuestras dinámicas.</p>
      </div>

      <ul className="reel">
        {media.map((item, index) =>
          item.type === "video" ? (
            <li key={item.src}>
              <PhoneVideo src={item.src} label={`Video del grupo ${index + 1}`} />
            </li>
          ) : (
            <li key={item.src}>
              <div className="phone">
                <Image
                  src={item.src}
                  alt={`Historia del grupo ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 15rem, 62vw"
                  className="object-cover"
                />
              </div>
            </li>
          ),
        )}
      </ul>

      {site.instagramHighlight ? (
        <p className="reel__more">
          <a href={site.instagramHighlight} target="_blank" rel="noopener noreferrer" className="text-link">
            <InstagramIcon className="size-4" />
            Ver todas las historias en Instagram
          </a>
        </p>
      ) : null}
    </section>
  );
}
