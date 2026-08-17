"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/config";
import {
  formatOptionPrice,
  getLocalizedKitchenBase,
  getLocalizedKitchenOptions,
  type OptionItem,
} from "@/data/options-catalog";
import type { KitchenSelection } from "./types";

type KitchenPanelProps = {
  kitchen: KitchenSelection;
  onChange: (kitchen: KitchenSelection) => void;
  onOpenDetail: (option: OptionItem) => void;
};

export function KitchenPanel({ kitchen, onChange, onOpenDetail }: KitchenPanelProps) {
  const t = useTranslations("personnaliser");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;

  const kitchenBase = getLocalizedKitchenBase(locale);
  const categoryTitle = t("phaseCuisine");
  const kitchenOptions = getLocalizedKitchenOptions(locale).map((item) => ({
    ...item,
    categoryTitle,
  }));

  const togglePack = (id: string) => {
    const packs = kitchen.packs.includes(id)
      ? kitchen.packs.filter((p) => p !== id)
      : [...kitchen.packs, id];
    onChange({ ...kitchen, packs });
  };

  const packOptions = kitchenOptions;

  const kitchenBaseAsOption: OptionItem = {
    id: "cuisine-base",
    title: kitchenBase.title,
    description: kitchenBase.description,
    image: kitchenBase.image,
    priceType: "inclus",
    priceLabel: tCommon("inclus"),
    highlights: kitchenBase.highlights,
    categoryTitle: t("phaseCuisine"),
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-luxury-forest/30 bg-luxury-forest/5 px-4 py-3">
        <button
          type="button"
          onClick={() => onOpenDetail(kitchenBaseAsOption)}
          className="w-full text-left transition hover:opacity-80"
        >
          <p className="font-ui text-sm text-luxury-graphite">{kitchenBase.title}</p>
          <p className="mt-1 font-ui text-[11px] text-luxury-muted">
            {t("kitchenIncludedHint")}
          </p>
          <p className="mt-1 font-ui text-[10px] text-luxury-forest">{t("seeDetail")}</p>
        </button>
      </div>

      <div>
        <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
          {t("optionsCuisine")}
        </p>
        <div className="mt-3 space-y-3">
          {packOptions.map((item) => {
            const on = kitchen.packs.includes(item.id);
            return (
              <div
                key={item.id}
                className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                  on
                    ? "border-luxury-forest bg-white"
                    : "border-luxury-stone bg-white/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onOpenDetail(item)}
                  className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                >
                  <Image src={item.image} alt="" fill className="object-cover" sizes="56px" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDetail(item)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="font-ui text-sm text-luxury-graphite">{item.title}</p>
                  <p className="mt-0.5 font-ui text-[11px] text-luxury-muted">
                    {formatOptionPrice(item, locale)}
                  </p>
                  <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                    {t("seeDetail")}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => togglePack(item.id)}
                  aria-pressed={on}
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    on
                      ? "border-luxury-forest bg-luxury-forest text-white"
                      : "border-luxury-stone"
                  }`}
                >
                  {on ? "✓" : ""}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
