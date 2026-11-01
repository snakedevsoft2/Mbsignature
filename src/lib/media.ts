import fs from "node:fs";
import path from "node:path";

export type MediaItem = { type: "video" | "image"; src: string };

const VIDEO = /\.(mp4|webm|mov)$/i;
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

/** Archivos de una carpeta dentro de /public, ordenados por nombre. Se lee al construir la página. */
function listPublic(folder: string, pattern: RegExp) {
  const dir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => pattern.test(file))
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }))
    .map((file) => `/${folder}/${encodeURIComponent(file)}`);
}

/** Videos de /public/video/clientes y luego imágenes de /public/historias. */
export function getGroupMedia(): MediaItem[] {
  return [
    ...listPublic("video/clientes", VIDEO).map((src) => ({ type: "video" as const, src })),
    ...listPublic("historias", IMAGE).map((src) => ({ type: "image" as const, src })),
  ];
}
