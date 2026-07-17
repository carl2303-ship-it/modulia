import type { Metadata } from "next";
import { Suspense } from "react";
import { PersonnaliserConfigurator } from "@/components/personnaliser/PersonnaliserConfigurator";

export const metadata: Metadata = {
  title: "Personnaliser | Modulia — Configurateur",
  description:
    "Configurez votre module Modulia : modèle, finitions incluses, options, cuisine et piscine — devis instantané.",
};

export default function PersonnaliserPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-luxury-papyrus">
          <p className="font-ui text-sm text-luxury-muted">Chargement…</p>
        </div>
      }
    >
      <PersonnaliserConfigurator />
    </Suspense>
  );
}
