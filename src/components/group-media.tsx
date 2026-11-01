import { site } from "@/config/site";
import { getGroupMedia } from "@/lib/media";
import { delay } from "@/lib/utils";
import { InstagramIcon } from "./icons";
import { PhoneVideo } from "./phone-video";
import { ZoomableImage } from "./zoomable-image";

/** Videos e imágenes de historias del grupo, en cuadrícula de tarjetas verticales (2 columnas en celular). */
export function GroupMedia() {
  const media = getGroupMedia();
  if (media.length === 0) return null;
  const hasImages = media.some((item) => item.type === "image");

  return (
    <section aria-labelledby="grupo-title" className="section">
      <div className="container-page">
        <p className="eyebrow reveal">En el grupo</p>
        <h2 id="grupo-title" className="section__title reveal" style={delay(100)}>
          Así se vive el <span className="text-gold-grad">Grupo Signature</span>
        </h2>
        <p className="section__lead reveal" style={delay(200)}>
          Videos e historias reales de nuestras dinámicas.
          {hasImages ? " Toca una imagen para verla en grande." : null}
        </p>

        <ul className="media-grid">
          {media.map((item, index) => (
            <li key={item.src} className="reveal" style={delay((index % 4) * 90)}>
              {item.type === "video" ? (
                <PhoneVideo src={item.src} label={`Video del grupo ${index + 1}`} />
              ) : (
                <ZoomableImage src={item.src} alt={`Historia del grupo ${index + 1}`} />
              )}
            </li>
          ))}
        </ul>

        {site.instagramHighlight ? (
          <p className="media-grid__more">
            <a href={site.instagramHighlight} target="_blank" rel="noopener noreferrer" className="text-link">
              <InstagramIcon className="size-4" />
              Ver todas las historias en Instagram
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
