import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ModelCatalogGrid } from "@/components/models/ModelCatalogGrid";
import { ModelCatalogLinks } from "@/components/models/ModelCatalogLinks";
import { SiteHeader } from "@/components/SiteHeader";
import { getModels } from "@/data/models";
import { defaultLocale, isLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("models");
  return {
    title: `${t("title")} | Modulia`,
    description: t("metaDescription"),
  };
}

export default async function ModelosPage() {
  const t = await getTranslations("models");
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const models = getModels(locale);

  const benefits = t.raw("benefits") as string[];
  const specs = t.raw("specs") as string[];
  const ideals = t.raw("ideals") as string[];
  const introParagraphs = t.raw("introParagraphs") as string[];

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader variant="light" />

      <main className="pt-40">
        <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            {t("pageEyebrow")}
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl text-luxury-graphite sm:text-5xl lg:text-6xl">
            {t("headline")}
          </h1>
          <div className="mt-8 max-w-3xl space-y-4">
            {introParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="font-ui text-base leading-relaxed text-luxury-muted sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="border-t border-luxury-stone/50 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite sm:text-4xl">
              {t("benefitsTitle")}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-ui text-sm leading-relaxed text-luxury-muted"
                >
                  <span className="mt-0.5 text-luxury-forest" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-luxury-stone/50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite sm:text-4xl">
              {t("specsTitle")}
            </h2>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {specs.map((item) => (
                <li key={item} className="flex items-start gap-2 font-ui text-sm text-luxury-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-luxury-forest" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-luxury-stone/50 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite sm:text-4xl">
              {t("idealsTitle")}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {ideals.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-luxury-forest/20 bg-luxury-forest/5 px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-luxury-forest"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-luxury-stone/50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite sm:text-4xl">
              {t("pricingTitle")}
            </h2>
            <p className="mt-4 font-serif text-4xl text-luxury-graphite sm:text-5xl">
              {t("pricingValue")}
            </p>
            <p className="mt-6 max-w-2xl font-ui text-base leading-relaxed text-luxury-muted">
              {t("closing")}
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-block rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-wider text-white transition hover:bg-luxury-forest-dark"
            >
              {t("contactCta")}
            </Link>
            <p className="mt-4 font-ui text-xs text-luxury-muted">{t("contactHint")}</p>
          </div>
        </section>

        <section className="border-t border-luxury-stone/50 py-12">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
              {t("catalogEyebrow")}
            </p>
            <h2 className="mt-3 font-serif text-3xl text-luxury-graphite sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-ui text-sm text-luxury-muted">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <ModelCatalogLinks />
        <ModelCatalogGrid models={models} />
      </main>
    </div>
  );
}
