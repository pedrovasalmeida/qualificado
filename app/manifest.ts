import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Qualificado - Catálogo Digital",
    short_name: "Qualificado",
    description:
      "Encontre os melhores prestadores de serviço e lojas da região, tudo em um só lugar.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d0b",
    theme_color: "#0d0d0b",
    orientation: "portrait-primary",
    lang: "pt-BR",
    dir: "ltr",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
