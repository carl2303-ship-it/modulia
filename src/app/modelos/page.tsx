import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ModelCatalogLinks } from "@/components/models/ModelCatalogLinks";
import { ModelThumbnail } from "@/components/models/ModelThumbnail";
import { SiteHeader } from "@/components/SiteHeader";
import { formatModelPrice, getModels } from "@/data/models";
import { defaultLocale, isLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("models");
  return {
    title: `${t("title")} | Modulia`,
    description: t("subtitle"),
  };
}

export default async function ModelosPage() {
  const t = await getTranslations("models");
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const models = getModels(locale);

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-20">
        <section className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            {t("pageEyebrow")}
          </p>
          <h1 className="mt-4 font-serif text-4xl text-luxury-graphite sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-ui text-luxury-muted">
            {t("pageIntro")}{" "}
            <Link href="/professionnels" className="text-luxury-forest hover:underline">
              {t("discoverPro")}
            </Link>
          </p>
        </section>

        <ModelCatalogLinks />

        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <Link
              key={model.slug}
              href={`/modelos/${model.slug}`}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-white shadow-luxury-sm transition duration-500 hover:-translate-y-1 hover:shadow-luxury ${
                model.featured
                  ? "border-luxury-forest/30 ring-1 ring-luxury-forest/20"
                  : "border-luxury-stone"
              }`}
            >
              {model.featured && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-luxury-forest px-3 py-1 font-ui text-[10px] uppercase tracking-wider text-white">
                  {t("signature")}
                </span>
              )}

              <div className="relative aspect-[4/3] overflow-hidden bg-luxury-stone">
                <ModelThumbnail
                  src={model.images[0]?.src ?? "/logo-modulia.png"}
                  alt={model.name}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-graphite/40 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-8">
                <p className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                  {model.area} · {model.rooms}
                </p>
                <h2 className="mt-2 font-serif text-2xl tracking-wide text-luxury-graphite transition group-hover:text-luxury-forest">
                  {model.name}
                </h2>
                <p className="mt-3 flex-1 font-ui text-sm leading-relaxed text-luxury-muted">
                  {model.tagline}
                </p>
                <p className="mt-6 font-serif text-xl text-luxury-graphite">
                  {t("from")} {formatModelPrice(model.priceFrom, locale)} €
                </p>
                <span className="mt-4 font-ui text-[11px] uppercase tracking-wider text-luxury-forest">
                  {t("viewModel")}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}

