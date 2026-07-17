"use client";

import Image from "next/image";
import {
  CONFIGURATOR_PRICES,
  KITCHEN_APPLIANCES,
  KITCHEN_BASE,
  KITCHEN_OPTIONS,
  formatOptionPrice,
  type OptionItem,
} from "@/data/options-catalog";
import type { KitchenSelection } from "./types";

type KitchenPanelProps = {
  kitchen: KitchenSelection;
  onChange: (kitchen: KitchenSelection) => void;
  onOpenDetail: (option: OptionItem) => void;
};

export function KitchenPanel({ kitchen, onChange, onOpenDetail }: KitchenPanelProps) {
  const togglePack = (id: string) => {
    const packs = kitchen.packs.includes(id)
      ? kitchen.packs.filter((p) => p !== id)
      : [...kitchen.packs, id];
    onChange({ ...kitchen, packs });
  };

  const packOptions = KITCHEN_OPTIONS.filter((o) => o.id !== "cuisine-contemporaine");
  const contemporaine = KITCHEN_OPTIONS.find((o) => o.id === "cuisine-contemporaine");
  const electroBase = KITCHEN_APPLIANCES.find((a) => a.id === "electro-base");
  const electroPremium = KITCHEN_APPLIANCES.find((a) => a.id === "electro-option");

  const kitchenBaseAsOption: OptionItem = {
    id: "cuisine-base",
    title: KITCHEN_BASE.title,
    description: KITCHEN_BASE.description,
    image: KITCHEN_BASE.image,
    priceType: "inclus",
    priceLabel: "Inclus",
    highlights: KITCHEN_BASE.highlights,
    categoryTitle: "Cuisine",
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-luxury-forest/30 bg-luxury-forest/5 px-4 py-3">
        <button
          type="button"
          onClick={() => onOpenDetail(kitchenBaseAsOption)}
          className="w-full text-left transition hover:opacity-80"
        >
          <p className="font-ui text-sm text-luxury-graphite">{KITCHEN_BASE.title}</p>
          <p className="mt-1 font-ui text-[11px] text-luxury-muted">
            Incluse dans tous les modules — aucun supplément
          </p>
          <p className="mt-1 font-ui text-[10px] text-luxury-forest">Voir le détail →</p>
        </button>
      </div>

      <div>
        <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
          Options cuisine
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
                  onClick={() => onOpenDetail({ ...item, categoryTitle: "Cuisine" })}
                  className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                >
                  <Image src={item.image} alt="" fill className="object-cover" sizes="56px" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDetail({ ...item, categoryTitle: "Cuisine" })}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="font-ui text-sm text-luxury-graphite">{item.title}</p>
                  <p className="mt-0.5 font-ui text-[11px] text-luxury-muted">
                    {formatOptionPrice(item)}
                  </p>
                  <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                    Voir le détail →
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
              onClick={() =>
                onOpenDetail({ ...contemporaine, categoryTitle: "Cuisine" })
              }
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
                  onClick={() =>
                    onOpenDetail({ ...contemporaine, categoryTitle: "Cuisine" })
                  }
                  className="text-left"
                >
                  <p className="font-ui text-sm text-luxury-graphite">
                    {contemporaine.title}
                  </p>
                  <p className="mt-1 font-ui text-[11px] text-luxury-muted">
                    {CONFIGURATOR_PRICES.kitchenPerMl} € TTC / ml — sur mesure
                  </p>
                  <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                    Voir le détail →
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
                    <span>Mètres linéaires</span>
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
                    {new Intl.NumberFormat("fr-FR").format(
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
          Électroménager
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
                onClick={() =>
                  onOpenDetail({ ...electroBase, categoryTitle: "Cuisine" })
                }
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
                  {electroBase.title} — Inclus
                </p>
                <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                  Voir le détail →
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
                onClick={() =>
                  onOpenDetail({ ...electroPremium, categoryTitle: "Cuisine" })
                }
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
                  {electroPremium.title} — +990 € TTC
                </p>
                <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                  Voir le détail →
                </p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
