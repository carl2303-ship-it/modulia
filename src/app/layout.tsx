import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
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
  title: "Modulia | Maisons Modulaires",
  description:
    "Modulia — maisons modulaires durables, personnalisables et prêtes à vivre. Nous construisons votre avenir, module par module.",
  keywords: ["maisons modulaires", "habitation modulaire", "construction durable", "Modulia"],
  openGraph: {
    title: "Modulia | Maisons Modulaires",
    description: "Maisons modulaires durables, personnalisables et prêtes à vivre.",
    type: "website",
    locale: "fr_FR",
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
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} font-ui antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
