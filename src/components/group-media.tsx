import { site } from "@/config/site";
import { getGroupMedia } from "@/lib/media";
import { delay } from "@/lib/utils";
import { InstagramIcon } from "./icons";
import { StoryPhone } from "./story-phone";

/** Dos celulares que pasan solos los videos y las historias del grupo, repartidos entre los dos. */
export function GroupMedia() {
  const media = getGroupMedia();
  if (media.length === 0) return null;
  const phones = [media.filter((_, index) => index % 2 === 0), media.filter((_, index) => index % 2 === 1)].filter(
    (items) => items.length > 0,
  );

  return (
    <section aria-labelledby="grupo-title" className="section">
      <div className="container-page">
        <p className="eyebrow reveal">En el grupo</p>
        <h2 id="grupo-title" className="section__title reveal" style={delay(100)}>
          Así se vive el <span className="text-gold-grad">Grupo Signature</span>
        </h2>
        <p className="section__lead reveal" style={delay(200)}>
          Videos e historias reales de nuestras dinámicas.
        </p>

        <div className="stories reveal" style={delay(250)}>
          {phones.map((items, index) => (
            <StoryPhone key={index} items={items} label={`Historias del grupo ${index + 1}`} />
          ))}
        </div>

        {site.instagramHighlight ? (
          <p className="stories__more">
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
