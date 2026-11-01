// Contenido editable de la landing. Cambia los valores aquí y se actualiza toda la página.

export const site = {
  name: "MB Signature",
  // Dirección principal en Vercel; dinamicasmb.com redirige a www.
  url: "https://www.dinamicasmb.com",
  description:
    "Todos los días hay un ganador. Únete gratis al Grupo Signature en WhatsApp y participa en nuestras dinámicas diarias.",

  // Enlace de invitación al grupo. Si el grupo se llena, reemplázalo por el nuevo enlace.
  whatsappGroupUrl: "https://chat.whatsapp.com/L6FR4fjVzm38WAV6TiD1vg",

  yearsOfExperience: 6,

  // Video principal (dentro de /public). La portada se muestra mientras carga.
  // Los videos de la sección "En el grupo" se toman solos de /public/video/clientes
  // y las imágenes de historias de /public/historias.
  video: {
    src: "/video/marcela.mp4",
    poster: "/video/marcela-portada.jpg",
  },

  // Canal oficial de Instagram y la historia destacada que se enlaza en la página.
  instagram: "https://www.instagram.com/marcebetasignature1/",
  instagramHighlight: "https://www.instagram.com/stories/highlights/18046717769581335/",

  // Pixel de Meta de las campañas. Vacío ("") = no se carga.
  metaPixelId: "1590585119024916",
};
