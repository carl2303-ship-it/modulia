import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { KitchenSectionView } from "@/components/kitchens/KitchenSectionView";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getLocalizedKitchenAppliances,
  getLocalizedKitchenBase,
  getLocalizedKitchenOptions,
} from "@/data/kitchen-content";
import { defaultLocale, isLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cuisines");
  return {
    title: `${t("title")} | Modulia`,
    description: t("intro"),
  };
}

export default async function CuisinesPage() {
  const t = await getTranslations("cuisines");
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;

  const kitchenBase = getLocalizedKitchenBase(locale);
  const kitchenOptions = getLocalizedKitchenOptions(locale);
  const kitchenAppliances = getLocalizedKitchenAppliances(locale);

  const configOptions = kitchenOptions.filter((s) =>
    ["cuisine-premium", "cuisine-rangement", "cuisine-buanderie", "complement-cuisine"].includes(
      s.id,
    ),
  );
  const surMesureOptions = kitchenOptions.filter((s) => s.id === "cuisine-contemporaine");
  const applianceBase = kitchenAppliances.find((s) => s.id === "electro-base");
  const applianceOption = kitchenAppliances.find((s) => s.id === "electro-option");

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-20">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-luxury-graphite sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl font-ui text-luxury-muted">
            {t("intro")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/options"
              className="rounded-full border border-luxury-stone bg-white px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest"
            >
              {t("ctaOptions")}
            </Link>
            <Link
              href="/personnalisation"
              className="rounded-full border border-luxury-stone bg-white px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest"
            >
              {t("ctaPersonnalisation")}
            </Link>
          </div>
        </section>

        <KitchenSectionView section={kitchenBase} />

        {applianceBase && <KitchenSectionView section={applianceBase} />}

        <section className="border-t border-luxury-stone/60 bg-white/40 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">
              {t("optionsConfig")}
            </h2>
            <p className="mt-2 font-ui text-sm text-luxury-muted">
              {t("optionsConfigSub")}
            </p>
          </div>
        </section>

        {applianceOption && <KitchenSectionView section={applianceOption} />}

        {configOptions.map((section) => (
          <KitchenSectionView key={section.id} section={section} />
        ))}

        <section className="border-t border-luxury-stone/60 bg-white/40 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">
              {t("surMesure")}
            </h2>
            <p className="mt-2 font-ui text-sm text-luxury-muted">
              {t("surMesureSub")}
            </p>
          </div>
        </section>

        {surMesureOptions.map((section) => (
          <KitchenSectionView key={section.id} section={section} />
        ))}

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl bg-luxury-graphite p-10 text-center lg:p-16">
            <h2 className="font-serif text-3xl text-white">{t("ctaTitle")}</h2>
            <p className="mx-auto mt-4 max-w-lg font-ui text-sm text-white/60">
              {t("ctaText")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/modelos"
                className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-wider text-white"
              >
                {t("seeModels")}
              </Link>
              <Link
                href="/#contact"
                className="rounded-full border border-white/20 px-8 py-4 font-ui text-xs uppercase tracking-wider text-white"
              >
                {t("devis")}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <Link
            href="/options"
            className="font-ui text-xs uppercase tracking-wider text-luxury-forest hover:underline"
          >
            ← {t("ctaOptions")}
          </Link>
        </section>
      </main>
    </div>
  );
}
