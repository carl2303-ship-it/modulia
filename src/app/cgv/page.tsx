import type { Metadata } from "next";
import { CgvView } from "@/components/legal/CgvView";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Modulia",
  description:
    "Conditions Générales de Vente Modulia — espaces modulaires et piscines. Disponible en français, português et anglais.",
};

export default function CgvPage() {
  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />
      <main className="pt-20">
        <CgvView />
      </main>
    </div>
  );
}
