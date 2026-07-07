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
  title: "Modulia | Casas Modulares",
  description:
    "Modulia — casas modulares sustentáveis, personalizáveis e prontas para viver. Construímos o seu futuro, módulo a módulo.",
  keywords: ["casas modulares", "habitação modular", "construção sustentável", "Modulia"],
  openGraph: {
    title: "Modulia | Casas Modulares",
    description: "Casas modulares sustentáveis, personalizáveis e prontas para viver.",
    type: "website",
    locale: "pt_PT",
    siteName: "Modulia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
