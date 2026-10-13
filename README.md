# MB Signature · dinamicasmb.com

Landing sencilla que recibe el tráfico de las campañas y lo lleva al Grupo Signature de WhatsApp: un inicio con la oferta y el video de Marcela, la sección de ganadores y un solo botón para unirse.

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
| Cifras grandes del inicio (valor por número y premio) | `offer.price`, `offer.prize` |
| Video del inicio y su portada (archivos dentro de `public/video/`) | `video.src`, `video.poster` |
| Instagram del pie de página (vacío = no se muestra) | `instagram` |
| Capturas de los ganadores (archivos dentro de `public/ganadores/`) | `winnerChats` |

- La sección de ganadores solo aparece cuando `winnerChats` tiene capturas.
- Las capturas originales, con los números de celular a la vista, van en `ganadores-originales/` (no se sube a GitHub). En `public/ganadores/` solo van las versiones con los números tapados.
- El video solo se descarga cuando empieza a reproducirse, sin sonido; al tocarlo se activa el sonido.
- La imagen que aparece al compartir el enlace es `src/app/opengraph-image.jpg` (1200×630) y el logo del encabezado es `public/brand/emblema-mb.png`.
- Los íconos son `src/app/icon.svg`, `src/app/favicon.ico` y `src/app/apple-icon.png`.

## Pixel de Meta (opcional)

Agrega la variable en Vercel → Settings → Environment Variables y vuelve a desplegar:

```
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

Con la variable definida se carga el Pixel y se registra `PageView`. Cada clic en el botón del grupo envía un evento `Lead` (con `content_category: principal`). Sin la variable no se carga nada.

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
