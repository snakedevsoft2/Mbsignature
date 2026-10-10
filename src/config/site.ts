// Contenido editable de la landing. Cambia los valores aquí y se actualiza toda la página.

const yearsOfExperience = 6;

export const site = {
  name: "MB Signature Rifas",
  // Dirección principal en Vercel; dinamicasmb.com redirige a www.
  url: "https://www.dinamicasmb.com",
  description: `Más de ${yearsOfExperience} años cumpliendo sueños. Únete al exclusivo Grupo Signature en WhatsApp y participa por grandes premios: rifas exclusivas, cupos limitados y premios constantes.`,

  // Enlace de invitación al grupo. Si el grupo se llena, reemplázalo por el nuevo enlace.
  whatsappGroupUrl:
    "https://chat.whatsapp.com/LtkJ40JsiCA3TenrU0ZfY3?s=cl&p=i&mlu=0&ilr=4",

  yearsOfExperience,

  founder: {
    name: "Marcela Betancourt",
    role: "Creadora de MB Signature",
    // Foto opcional dentro de /public, por ejemplo "/marcela.jpg".
    photo: null as string | null,
  },

  // Video del hero (dentro de /public). La portada se muestra mientras carga.
  video: {
    src: "/video/marcela.mp4",
    poster: "/video/marcela-portada.jpg",
  },

  // Deja vacío ("") lo que no se use y no se mostrará en el footer.
  social: {
    instagram: "https://www.instagram.com/marcebetasignature1/",
    facebook: "",
    tiktok: "",
  },
};

export const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#rifas", label: "Rifas" },
  { href: "#como-funciona", label: "Cómo participar" },
  { href: "#ganadores", label: "Ganadores" },
  { href: "#contacto", label: "Contacto" },
];

export type Winner = {
  amount: number;
  label: "Ganadora" | "Ganador";
  // Foto opcional dentro de /public, por ejemplo "/ganadores/01.jpg".
  photo?: string;
};

export const winners: Winner[] = [
  { amount: 800_000, label: "Ganadora" },
  { amount: 600_000, label: "Ganadora" },
  { amount: 1_000_000, label: "Ganadora" },
  { amount: 500_000, label: "Ganador" },
  { amount: 700_000, label: "Ganadora" },
  { amount: 1_200_000, label: "Ganador" },
];
