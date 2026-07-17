"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ModelThumbnail } from "@/components/models/ModelThumbnail";
import { formatModelPrice, getModels } from "@/data/models";
import { defaultLocale, isLocale } from "@/i18n/config";

export function Models() {
  const t = useTranslations("models");
  const raw = useLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const models = getModels(locale);

  return (
    <section id="modelos" className="bg-luxury-papyrus py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-luxury-forest">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-4xl text-luxury-graphite sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-ui text-luxury-muted">
            {t("subtitle")}
          </p>
          <Link
            href="/modelos"
            className="mt-6 inline-block font-ui text-xs uppercase tracking-wider text-luxury-forest transition hover:text-luxury-forest-dark"
          >
            {t("seeAll")}
          </Link>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <article
              key={model.slug}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-luxury-stone bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-luxury"
            >
              <Link
                href={`/modelos/${model.slug}`}
                className="relative block aspect-video overflow-hidden bg-luxury-stone"
              >
                <ModelThumbnail
                  src={model.images[0]?.src ?? "/logo-modulia.png"}
                  alt={model.name}
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </Link>

              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-serif text-2xl text-luxury-graphite">{model.name}</h3>
                <p className="mt-1 font-ui text-sm text-luxury-muted">
                  {model.area} · {model.rooms}
                </p>
                <p className="mt-4 flex-1 font-ui text-sm leading-relaxed text-luxury-muted">
                  {model.tagline}
                </p>
                <p className="mt-6 font-serif text-xl text-luxury-graphite">
                  {t("from")} {formatModelPrice(model.priceFrom, locale)} €
                </p>
                <Link
                  href={`/modelos/${model.slug}`}
                  className="mt-6 block rounded-full border border-luxury-stone py-3 text-center font-ui text-xs font-medium uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-graphite"
                >
                  {t("viewModel")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
