"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/config";
import type { OptionItem } from "@/data/options-catalog";
import { formatOptionPrice, getLocalizedPoolModel } from "@/data/options-catalog";
import { getOptionRich } from "@/data/options-rich";
import { getLocalizedKitchenSection } from "@/data/kitchen-content";

type OptionDetailModalProps = {
  option: OptionItem | null;
  isOpen: boolean;
  onClose: () => void;
};

/** Popup de détail pour une option payante */
export function OptionDetailModal({
  option,
  isOpen,
  onClose,
}: OptionDetailModalProps) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !option) return null;

  const poolModel = getLocalizedPoolModel(locale);
  const rich = option.rich ?? getOptionRich(option.id, locale);
  const kitchen = getLocalizedKitchenSection(
    option.id === "cuisine-base"
      ? "base"
      : option.id === "electro-option"
        ? "electro-option"
        : option.id === "electro-base"
          ? "electro-base"
          : option.id,
    locale,
  );
  const image =
    rich?.gallery?.[0] ?? kitchen?.image ?? option.image;
  const specs =
    rich?.features?.map((f) => `${f.title} — ${f.description}`) ??
    kitchen?.features?.map((f) => `${f.title} — ${f.description}`) ??
    option.highlights ??
    (option.id === "sofa-pool" ? poolModel.highlights : undefined) ??
    [];
  const includes =
    rich?.includes?.map((i) => i.title) ??
    kitchen?.includes ??
    (option.id === "sofa-pool" ? poolModel.included : []) ??
    [];
  const variants = rich?.variants ?? [];
  const colors = rich?.colors ?? [];
  const intro = rich?.intro ?? kitchen?.intro ?? option.description;
  const tagline = rich?.tagline ?? kitchen?.tagline;
  const priceDisplay =
    kitchen?.priceLabel ??
    (kitchen?.included || option.priceType === "inclus"
      ? t("inclus")
      : formatOptionPrice(option, locale));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="option-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-luxury-graphite/50 backdrop-blur-md"
        onClick={onClose}
        aria-label={t("close")}
      />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-luxury-papyrus p-8 shadow-luxury animate-slide-up sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-luxury-stone font-ui text-luxury-muted transition hover:border-luxury-graphite hover:text-luxury-graphite"
          aria-label={t("close")}
        >
          ×
        </button>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-luxury-stone">
          <Image
            src={image}
            alt={option.title}
            fill
            className="object-cover"
            sizes="500px"
          />
        </div>

        {option.categoryTitle && (
          <p className="mt-5 font-ui text-[10px] uppercase tracking-[0.3em] text-luxury-forest">
            {option.categoryTitle}
          </p>
        )}
        <h2
          id="option-detail-title"
          className="mt-2 pr-8 font-serif text-2xl text-luxury-graphite sm:text-3xl"
        >
          {option.title}
        </h2>
        {tagline && (
          <p className="mt-2 font-serif text-base italic text-luxury-muted">
            {tagline}
          </p>
        )}
        <p className="mt-4 font-serif text-2xl text-luxury-graphite">
          {priceDisplay}
        </p>
        <p className="mt-4 font-ui text-sm leading-relaxed text-luxury-muted">
          {intro}
        </p>

        {colors.length > 0 && (
          <div className="mt-6 border-t border-luxury-stone pt-6">
            <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
              {t("colorsAvailable")}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {colors.map((color) => (
                <div key={color.name} className="flex flex-col items-center gap-1.5">
                  <span
                    className="h-8 w-8 rounded-full ring-1 ring-luxury-stone"
                    style={{ backgroundColor: color.hex ?? "#C4B5A0" }}
                    title={color.name}
                  />
                  <span className="max-w-[4.5rem] text-center font-ui text-[9px] text-luxury-muted">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {variants.length > 0 && (
          <ul className="mt-6 space-y-2 border-t border-luxury-stone pt-6">
            {variants.map((v) => (
              <li key={v.label} className="font-ui text-xs text-luxury-graphite">
                <span className="font-medium">{v.label}</span>
                {v.price ? ` — ${v.price}` : ""}
                {v.description ? (
                  <span className="mt-0.5 block text-luxury-muted">
                    {v.description}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        )}

        {includes.length > 0 && (
          <ul className="mt-6 space-y-2 border-t border-luxury-stone pt-6">
            {includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 font-ui text-xs text-luxury-graphite"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-luxury-forest" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {specs.length > 0 && (
          <ul className="mt-6 space-y-2 border-t border-luxury-stone pt-6">
            {specs.map((spec) => (
              <li
                key={spec}
                className="flex items-start gap-2 font-ui text-xs text-luxury-graphite"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-luxury-forest" />
                {spec}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded-full bg-luxury-graphite py-3.5 font-ui text-xs uppercase tracking-wider text-white transition hover:bg-luxury-forest"
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
}
