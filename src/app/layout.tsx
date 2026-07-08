import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://moduliahome.com"),
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
    images: [{ url: "/logo-modulia.png", width: 512, height: 512, alt: "Modulia" }],
  },
  icons: {
    icon: "/logo-modulia.png",
    apple: "/logo-modulia.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} font-ui antialiased`}
      >        {children}
      </body>
    </html>
  );
}
