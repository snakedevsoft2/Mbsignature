# MB Signature · dinamicasmb.com

Landing que recibe el tráfico de las campañas y lo lleva al Grupo Signature de WhatsApp: inicio con el video de Marcela, cómo funciona en 3 pasos, videos e historias del grupo, cierre y un solo botón verde que acompaña toda la página.

Next.js 16 (App Router) · Tailwind CSS 4 · desplegada en Vercel.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Editar el contenido

Casi todo se cambia en [`src/config/site.ts`](src/config/site.ts):

| Qué | Campo |
| --- | --- |
| Enlace del grupo de WhatsApp (el botón verde) | `whatsappGroupUrl` |
| Años de experiencia | `yearsOfExperience` |
| Video principal y su portada (archivos dentro de `public/video/`) | `video.src`, `video.poster` |
| Instagram oficial (vacío = no se muestra) | `instagram` |
| Historia destacada de Instagram que se enlaza | `instagramHighlight` |
| ID del Pixel de Meta | `metaPixelId` |

### Videos e historias del grupo

La sección "Así se vive el Grupo Signature" se arma sola con lo que haya en estas carpetas, ordenado por nombre, en una cuadrícula de tarjetas verticales (2 columnas en celular, 3 en tablet y 5 en computador):

- `public/video/clientes/`: videos (`.mp4`, `.webm`, `.mov`). Se reproducen sin sonido al aparecer en pantalla; al tocarlos se activa el sonido.
- `public/historias/`: imágenes (`.jpg`, `.png`, `.webp`), por ejemplo capturas de las historias destacadas de Instagram. Se ven completas, sin recortar, y al tocarlas se abren en grande. Instagram no permite insertar historias en otras páginas, por eso se suben como archivos.

**Antes de subir una captura, tapa los números de celular.** Las originales van en `img/` (no se sube a GitHub) y en `public/historias/` solo las versiones con los números tapados.

Para que salgan en un orden concreto, ponles un número al inicio del nombre (`01-...`, `02-...`). Si las dos carpetas están vacías, la sección no aparece. Después de agregar o quitar archivos hay que volver a desplegar (push a `main`).

### Otros

- El fondo (negro, luces dorada y verde, estrellas que titilan y destellan) está en `src/components/lux-background.tsx` y `starfield.tsx`.
- El video principal arranca solo y sin sonido al entrar a la página.
- Las animaciones de entrada y de aparición al bajar están en `globals.css`; las que necesitan JS (aparición al bajar, luz que sigue al mouse, inclinación del video) en `src/components/page-motion.tsx`. Si el celular tiene activado "reducir movimiento", se desactivan.
- La imagen que aparece al compartir el enlace es `src/app/opengraph-image.jpg` (1200×630) y el logo de la barra superior es `public/brand/emblema-mb.png`.
- Los íconos son `src/app/icon.svg`, `src/app/favicon.ico` y `src/app/apple-icon.png`.

## Pixel de Meta

El ID del Pixel está en `site.metaPixelId` (`src/config/site.ts`). La página registra `PageView` al abrirse y un evento `Lead` (con `content_category: principal`) cada vez que alguien toca el botón del grupo. Para quitar el Pixel, deja el campo vacío (`""`).

## Despliegue

1. En Vercel: **Add New → Project** e importa `snakedevsoft2/Mbsignature`. Vercel detecta Next.js y no hacen falta variables.
2. Cada push a `main` publica en producción; las demás ramas generan una URL de vista previa.
3. En **Settings → Domains** están `www.dinamicasmb.com` (principal, conectado a Production) y `dinamicasmb.com` (redirige con 308 a `www`). Si cambias cuál es el principal, actualiza `site.url`.

### DNS en Hostinger

Ve a Dominios → dinamicasmb.com → DNS / Nameservers → **DNS records**. No cambies los nameservers: el correo de Hostinger depende de ellos.

| Tipo | Nombre | Apunta a |
| --- | --- | --- |
| A | `@` | `76.76.21.21`, o la IP que muestre Vercel |
| CNAME | `www` | El valor que muestre Vercel, por ejemplo `xxxx.vercel-dns-017.com` |

- El CNAME `www` ya existe y apunta a `dinamicasmb.com`: edítalo, no crees otro.
- Si aparece otro registro A o AAAA para `@`, bórralo.
- No toques los registros MX ni TXT, porque son del correo.

La propagación tarda de minutos a pocas horas. Cuando Vercel muestre el dominio como válido, emite el certificado SSL automáticamente.
