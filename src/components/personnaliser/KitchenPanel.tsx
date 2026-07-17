"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/config";
import {
  CONFIGURATOR_PRICES,
  formatOptionPrice,
  getLocalizedKitchenAppliances,
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

const NUMBER_LOCALE: Record<Locale, string> = { fr: "fr-FR", pt: "pt-PT", en: "en-GB" };

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
  const kitchenAppliances = getLocalizedKitchenAppliances(locale).map((item) => ({
    ...item,
    categoryTitle,
  }));

  const togglePack = (id: string) => {
    const packs = kitchen.packs.includes(id)
      ? kitchen.packs.filter((p) => p !== id)
      : [...kitchen.packs, id];
    onChange({ ...kitchen, packs });
  };

  const packOptions = kitchenOptions.filter((o) => o.id !== "cuisine-contemporaine");
  const contemporaine = kitchenOptions.find((o) => o.id === "cuisine-contemporaine");
  const electroBase = kitchenAppliances.find((a) => a.id === "electro-base");
  const electroPremium = kitchenAppliances.find((a) => a.id === "electro-option");

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

      {contemporaine && (
        <div
          className={`rounded-2xl border px-4 py-4 transition ${
            kitchen.contemporaine
              ? "border-luxury-forest bg-white"
              : "border-luxury-stone bg-white/60"
          }`}
        >
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => onOpenDetail(contemporaine)}
              className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
            >
              <Image
                src={contemporaine.image}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
              />
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onOpenDetail(contemporaine)}
                  className="text-left"
                >
                  <p className="font-ui text-sm text-luxury-graphite">
                    {contemporaine.title}
                  </p>
                  <p className="mt-1 font-ui text-[11px] text-luxury-muted">
                    {formatOptionPrice(contemporaine, locale)}
                  </p>
                  <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                    {t("seeDetail")}
                  </p>
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={kitchen.contemporaine}
                  onClick={() =>
                    onChange({ ...kitchen, contemporaine: !kitchen.contemporaine })
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    kitchen.contemporaine ? "bg-luxury-forest" : "bg-luxury-stone"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                      kitchen.contemporaine ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
              {kitchen.contemporaine && (
                <div className="mt-3">
                  <label className="flex items-center justify-between font-ui text-xs text-luxury-muted">
                    <span>{t("linearMeters")}</span>
                    <span className="text-luxury-graphite">
                      {kitchen.contemporaineMl} ml
                    </span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={10}
                    value={kitchen.contemporaineMl}
                    onChange={(e) =>
                      onChange({
                        ...kitchen,
                        contemporaineMl: Number(e.target.value),
                      })
                    }
                    className="mt-2 w-full accent-luxury-forest"
                  />
                  <p className="mt-1 font-ui text-[11px] text-luxury-forest">
                    +
                    {new Intl.NumberFormat(NUMBER_LOCALE[locale]).format(
                      CONFIGURATOR_PRICES.kitchenPerMl * kitchen.contemporaineMl,
                    )}{" "}
                    €
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
          {t("electromenager")}
        </p>
        <div className="mt-3 space-y-2">
          {electroBase && (
            <div
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition ${
                kitchen.appliances === "base"
                  ? "border-luxury-forest bg-luxury-forest/5"
                  : "border-luxury-stone bg-white/60"
              }`}
            >
              <button
                type="button"
                onClick={() => onOpenDetail(electroBase)}
                className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg"
              >
                <Image
                  src={electroBase.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...kitchen, appliances: "base" })}
                className="min-w-0 flex-1 text-left"
              >
                <p
                  className={`font-ui text-xs ${
                    kitchen.appliances === "base"
                      ? "text-luxury-forest"
                      : "text-luxury-muted"
                  }`}
                >
                  {electroBase.title} — {tCommon("inclus")}
                </p>
                <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                  {t("seeDetail")}
                </p>
              </button>
            </div>
          )}
          {electroPremium && (
            <div
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition ${
                kitchen.appliances === "option"
                  ? "border-luxury-forest bg-luxury-forest/5"
                  : "border-luxury-stone bg-white/60"
              }`}
            >
              <button
                type="button"
                onClick={() => onOpenDetail(electroPremium)}
                className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg"
              >
                <Image
                  src={electroPremium.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...kitchen, appliances: "option" })}
                className="min-w-0 flex-1 text-left"
              >
                <p
                  className={`font-ui text-xs ${
                    kitchen.appliances === "option"
                      ? "text-luxury-forest"
                      : "text-luxury-muted"
                  }`}
                >
                  {electroPremium.title} — +{formatOptionPrice(electroPremium, locale)}
                </p>
                <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                  {t("seeDetail")}
                </p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
