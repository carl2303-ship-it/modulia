import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PersonnaliserConfigurator } from "@/components/personnaliser/PersonnaliserConfigurator";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("personnaliser");
  return {
    title: `${t("title")} | Modulia — Configurateur`,
    description: t("intro"),
  };
}

export default async function PersonnaliserPage() {
  const t = await getTranslations("common");

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-luxury-papyrus">
          <p className="font-ui text-sm text-luxury-muted">{t("loading")}</p>
        </div>
      }
    >
      <PersonnaliserConfigurator />
    </Suspense>
  );
}
