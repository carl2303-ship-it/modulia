"use client";

import Image from "next/image";
import {
  POOL_MODEL,
  POOL_OPTIONS,
  formatOptionPrice,
  type OptionItem,
} from "@/data/options-catalog";
import type { PoolSelection } from "./types";

type PoolPanelProps = {
  pool: PoolSelection;
  onChange: (pool: PoolSelection) => void;
  onOpenDetail: (option: OptionItem) => void;
};

export function PoolPanel({ pool, onChange, onOpenDetail }: PoolPanelProps) {
  const toggleOption = (id: string) => {
    const options = pool.options.includes(id)
      ? pool.options.filter((o) => o !== id)
      : [...pool.options, id];
    onChange({ ...pool, options });
  };

  const poolAsOption: OptionItem = {
    id: "sofa-pool",
    title: POOL_MODEL.name,
    description: POOL_MODEL.description,
    image: POOL_MODEL.heroImage,
    price: POOL_MODEL.priceFrom,
    priceType: "ttc",
    priceLabel: `dès ${new Intl.NumberFormat("fr-FR").format(POOL_MODEL.priceFrom)} € TTC`,
    highlights: POOL_MODEL.highlights,
    categoryTitle: "Piscine",
  };

  return (
    <div className="space-y-4">
      <div
        className={`rounded-2xl border px-4 py-4 transition ${
          pool.enabled
            ? "border-luxury-forest bg-white"
            : "border-luxury-stone bg-white/60"
        }`}
      >
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => onOpenDetail(poolAsOption)}
            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"
          >
            <Image
              src={POOL_MODEL.heroImage}
              alt={POOL_MODEL.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onOpenDetail(poolAsOption)}
                className="text-left"
              >
                <p className="font-ui text-sm text-luxury-graphite">{POOL_MODEL.name}</p>
                <p className="mt-0.5 font-ui text-[11px] text-luxury-muted">
                  dès {new Intl.NumberFormat("fr-FR").format(POOL_MODEL.priceFrom)} €
                  TTC
                </p>
                <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                  Voir le détail →
                </p>
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={pool.enabled}
                onClick={() =>
                  onChange({
                    ...pool,
                    enabled: !pool.enabled,
                    options: !pool.enabled ? pool.options : [],
                  })
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  pool.enabled ? "bg-luxury-forest" : "bg-luxury-stone"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                    pool.enabled ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            <p className="mt-2 font-ui text-[11px] leading-relaxed text-luxury-muted">
              {POOL_MODEL.tagline}
            </p>
          </div>
        </div>
      </div>

      {pool.enabled && (
        <div className="space-y-2">
          <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
            Options piscine
          </p>
          {POOL_OPTIONS.map((item) => {
            const on = pool.options.includes(item.id);
            return (
              <div
                key={item.id}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 transition ${
                  on
                    ? "border-luxury-forest bg-luxury-forest/5"
                    : "border-luxury-stone bg-white/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    onOpenDetail({ ...item, categoryTitle: "Piscine" })
                  }
                  className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg"
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenDetail({ ...item, categoryTitle: "Piscine" })
                  }
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="font-ui text-xs text-luxury-graphite">{item.title}</p>
                  <p className="mt-0.5 font-ui text-[11px] text-luxury-muted">
                    {formatOptionPrice(item)}
                  </p>
                  <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                    Voir le détail →
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => toggleOption(item.id)}
                  aria-pressed={on}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
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
      )}
    </div>
  );
}
