import type { Metadata } from "next";
import { PrivacyView } from "@/components/legal/PrivacyView";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Modulia",
  description:
    "Politique de confidentialité Modulia — protection des données personnelles. Disponible en français, português et anglais.",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />
      <main className="pt-20">
        <PrivacyView />
      </main>
    </div>
  );
}
