"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ModelThumbnail } from "@/components/models/ModelThumbnail";
import {
  formatModelPrice,
  type ModelData,
  type ModelTypology,
} from "@/data/models";
import { MODEL_TYPOLOGIES, modelMatchesTypology } from "@/lib/model-typology";
import { sortModelsByCatalogOrder } from "@/lib/model-catalog";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

type SortMode = "price" | "typology";

type ModelCatalogGridProps = {
  models: ModelData[];
};

export function ModelCatalogGrid({ models }: ModelCatalogGridProps) {
  const t = useTranslations("models");
  const raw = useLocale();
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;
  const [typology, setTypology] = useState<ModelTypology | "all">("all");
  const [sortMode, setSortMode] = useState<SortMode>("price");

  const filtered = useMemo(() => {
    const list =
      typology === "all"
        ? [...models]
        : models.filter((m) => modelMatchesTypology(m.rooms, typology));

    if (sortMode === "typology") {
      const order: Record<ModelTypology, number> = { T0: 0, T1: 1, T2: 2, T3: 3, T4: 4 };
      return list.sort((a, b) => {
        const byType = order[a.typology] - order[b.typology];
        return byType !== 0 ? byType : a.priceFrom - b.priceFrom;
      });
    }

    return sortModelsByCatalogOrder(list);
  }, [models, typology, sortMode]);

  return (
    <div>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={typology === "all"}
            onClick={() => setTypology("all")}
            label={t("filterAll")}
          />
          {MODEL_TYPOLOGIES.map((typo) => (
            <FilterChip
              key={typo}
              active={typology === typo}
              onClick={() => setTypology(typo)}
              label={typo}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={sortMode === "price"}
            onClick={() => setSortMode("price")}
            label={t("sortPrice")}
          />
          <FilterChip
            active={sortMode === "typology"}
            onClick={() => setSortMode("typology")}
            label={t("sortTypology")}
          />
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((model) => (
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
              <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 font-ui text-[10px] uppercase tracking-wider text-luxury-graphite">
                {model.typologyLabel}
              </span>
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
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 font-ui text-[11px] uppercase tracking-wider transition ${
        active
          ? "bg-luxury-forest text-white"
          : "border border-luxury-stone bg-white text-luxury-muted hover:border-luxury-forest hover:text-luxury-forest"
      }`}
    >
      {label}
    </button>
  );
}
