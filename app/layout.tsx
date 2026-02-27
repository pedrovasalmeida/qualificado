import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Qualificado | Diretório de Serviços e Profissionais",
    template: "%s | Qualificado"
  },
  description: "Encontre os melhores prestadores de serviço, lojas e profissionais qualificados na sua região, tudo em um só lugar.",
  keywords: ["serviços", "prestadores de serviço", "catálogo", "profissionais", "lojas", "comércio local"],
  authors: [{ name: "Qualificado" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://qualificado.com.br",
    title: "Qualificado | Diretório de Serviços",
    description: "Encontre os melhores prestadores de serviço e lojas da região, tudo em um só lugar.",
    siteName: "Qualificado",
    images: [
      {
        url: "/og-image.png", // Idealmente, adicione uma imagem na pasta public
        width: 1200,
        height: 630,
        alt: "Qualificado - Catálogo Digital",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Qualificado | Diretório de Serviços",
    description: "Encontre os melhores prestadores de serviço e lojas da região, tudo em um só lugar.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
