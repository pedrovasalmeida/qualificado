import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import OfflineBanner from "@/components/OfflineBanner";
import RegisterSW from "@/components/RegisterSW";
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
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(13, 13, 11, 0.68)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(6.3px)",
              WebkitBackdropFilter: "blur(6.3px)",
              border: "1px solid rgb(63, 63, 70)",
              borderRadius: "16px",
              color: "#fff",
            },
          }}
        />
        <OfflineBanner />
        <RegisterSW />
      </body>
    </html>
  );
}
