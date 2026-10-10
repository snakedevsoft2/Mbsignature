# MB Signature Rifas · dinamicasmb.com

Landing que recibe el tráfico de las campañas y lo lleva al Grupo Signature de WhatsApp.

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
| Enlace del grupo de WhatsApp (todos los botones) | `whatsappGroupUrl` |
| Años de experiencia | `yearsOfExperience` |
| Foto de Marcela (archivo dentro de `public/`) | `founder.photo` |
| Video del hero y su portada (archivos dentro de `public/video/`) | `video.src`, `video.poster` |
| Redes sociales del footer (vacío = no se muestra) | `social.instagram`, `social.facebook`, `social.tiktok` |
| Ganadores: monto, Ganadora/Ganador y foto opcional | `winners` |

- Los textos de cada sección están en `src/components/` (un archivo por sección).
- Las imágenes de marca (corona, fondos dorados, íconos dorados, diamante, foto del premio) están en `public/brand/`.
- El video se reproduce sin sonido mientras está en pantalla y tiene botón para activar el sonido. Para cambiarlo, reemplaza `public/video/marcela.mp4` (vertical, idealmente de menos de 5 MB) y su portada `marcela-portada.jpg`.
- La imagen que aparece al compartir el enlace es `src/app/opengraph-image.jpg` (1200×630).
- Los íconos son `src/app/icon.svg`, `src/app/favicon.ico` y `src/app/apple-icon.png`.

## Pixel de Meta (opcional)

Agrega la variable en Vercel → Settings → Environment Variables y vuelve a desplegar:

```
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

Con la variable definida se carga el Pixel y se registra `PageView`. Cada clic en un botón del grupo envía un evento `Lead`, con la ubicación del botón en `content_category`: `hero`, `header`, `ganadores`, `como-funciona`, `final`, `flotante` o `footer`. Sin la variable no se carga nada.

## Despliegue

1. En Vercel: **Add New → Project** e importa `snakedevsoft2/Mbsignature`. Vercel detecta Next.js y no hacen falta variables.
2. Cada push a `main` publica en producción; las demás ramas generan una URL de vista previa.
3. En **Settings → Domains** agrega `dinamicasmb.com` y elige que `www.dinamicasmb.com` redirija al dominio sin www (así coincide con `site.url`).

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
