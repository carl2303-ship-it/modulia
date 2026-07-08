import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { EquilibroConfigurator } from "@/components/equilibro/EquilibroConfigurator";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EQUILIBRO | Modulia — Configurateur de Luxe",
  description:
    "Configurez votre Modulia EQUILIBRO — 46 m² de pure élégance modulaire. Personnalisez finitions, équipements et obtenez votre devis instantané.",
  openGraph: {
    title: "EQUILIBRO | Modulia",
    description: "L'équilibre parfait entre espace, lumière et fonctionnalité.",
    type: "website",
    images: [{ url: "/equilibro/hero-1.png", width: 1200, height: 800, alt: "Modulia EQUILIBRO" }],
  },
};

export default function EquilibroPage() {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      <EquilibroConfigurator />
    </div>
  );
}
