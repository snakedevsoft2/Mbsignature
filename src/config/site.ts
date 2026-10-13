// Contenido editable de la landing. Cambia los valores aquí y se actualiza toda la página.

export const site = {
  name: "MB Signature",
  // Dirección principal en Vercel; dinamicasmb.com redirige a www.
  url: "https://www.dinamicasmb.com",
  description:
    "Únete al Grupo Signature en WhatsApp y participa en nuestras dinámicas con premios en efectivo.",

  // Enlace de invitación al grupo. Si el grupo se llena, reemplázalo por el nuevo enlace.
  whatsappGroupUrl:
    "https://chat.whatsapp.com/LtkJ40JsiCA3TenrU0ZfY3?s=cl&p=i&mlu=0&ilr=4",

  // Cifras grandes del inicio: "Con solo $price pesos puedes ganar hasta $prize en efectivo".
  offer: {
    price: 10_000,
    prize: 700_000,
  },

  // Video del inicio (dentro de /public). La portada se muestra mientras carga.
  video: {
    src: "/video/marcela.mp4",
    poster: "/video/marcela-portada.jpg",
  },

  // Deja vacío ("") si no se usa y no se mostrará en el pie de página.
  instagram: "https://www.instagram.com/marcebetasignature1/",
};

export type WinnerChat = {
  // Captura dentro de /public/ganadores, con los números de celular ya tapados.
  src: string;
  width: number;
  height: number;
  alt: string;
};

// Capturas de chats y comprobantes de los ganadores, en el orden en que se muestran.
export const winnerChats: WinnerChat[] = [];
