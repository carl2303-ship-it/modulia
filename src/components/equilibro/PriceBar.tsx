"use client";

import { useTranslations } from "next-intl";
import { formatPrice, useAnimatedPrice } from "./useAnimatedPrice";

type PriceBarProps = {
  totalPrice: number;
  onCtaClick: () => void;
};

/**
 * Barra fixa inferior com preço animado e CTA de conversão.
 * Acompanha o scroll do utilizador (sticky).
 */
export function PriceBar({ totalPrice, onCtaClick }: PriceBarProps) {
  const animatedPrice = useAnimatedPrice(totalPrice);
  const t = useTranslations("personnaliser");
  const tCommon = useTranslations("common");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-luxury-stone/80 bg-luxury-papyrus/95 backdrop-blur-xl lg:left-[65%]">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center lg:max-w-none lg:px-10">
        <div>
          <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
            {t("priceTotal")}
          </p>
          <p className="font-serif text-2xl text-luxury-graphite sm:text-3xl">
            <span className="tabular-nums transition-opacity duration-300">
              {formatPrice(animatedPrice)}
            </span>
            <span className="ml-2 font-ui text-sm font-normal text-luxury-muted">
              € {tCommon("ttc")}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={onCtaClick}
          className="rounded-full bg-luxury-graphite px-8 py-4 font-ui text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-luxury-forest hover:shadow-glow sm:text-sm"
        >
          {t("devisCta")}
        </button>
      </div>
    </div>
  );
}
