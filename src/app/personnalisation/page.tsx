import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { OptionFichaCard } from "@/components/options/OptionFichaCard";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllFinitions, getLocalizedFinitionCategories } from "@/data/options-catalog";
import type { Locale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("personnalisation");
  return {
    title: `${t("title")} | Modulia`,
    description: t("intro"),
  };
}

export default async function PersonnalisationPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("personnalisation");
  const finitionCategories = getLocalizedFinitionCategories(locale);
  const finitionsById = Object.fromEntries(
    getAllFinitions(locale).map((item) => [item.id, item]),
  );

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
              href="/personnaliser"
              className="rounded-full bg-luxury-forest px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-white transition hover:bg-luxury-forest-dark"
            >
              {t("ctaPersonnaliser")}
            </Link>
            <Link
              href="/modelos"
              className="rounded-full border border-luxury-stone bg-white px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest"
            >
              {t("ctaModels")}
            </Link>
            <Link
              href="/options"
              className="rounded-full border border-luxury-stone bg-white px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest"
            >
              {t("ctaOptions")}
            </Link>
          </div>
        </section>

        {finitionCategories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="scroll-mt-28 border-t border-luxury-stone/60 py-16"
          >
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="font-serif text-3xl text-luxury-graphite">{category.title}</h2>
              {category.subtitle && (
                <p className="mt-2 font-ui text-sm text-luxury-muted">{category.subtitle}</p>
              )}
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <OptionFichaCard
                    key={item.id}
                    item={finitionsById[item.id]}
                    detailPath="/personnalisation"
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl bg-luxury-graphite p-10 text-center lg:p-16">
            <h2 className="font-serif text-3xl text-white">{t("readyTitle")}</h2>
            <p className="mx-auto mt-4 max-w-lg font-ui text-sm text-white/60">
              {t("readyText")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/personnaliser"
                className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-wider text-white"
              >
                {t("personnaliser")}
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
      </main>
    </div>
  );
}
