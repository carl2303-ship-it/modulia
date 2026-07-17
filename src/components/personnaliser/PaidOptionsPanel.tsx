"use client";

import Image from "next/image";
import {
  CONFIGURATOR_PRICES,
  OPTION_CATEGORIES,
  formatOptionPrice,
  getAllPaidOptions,
  type OptionItem,
} from "@/data/options-catalog";
import type { PaidSelection } from "./types";

type PaidOptionsPanelProps = {
  paid: PaidSelection;
  onChange: (paid: PaidSelection) => void;
  onOpenDetail: (option: OptionItem) => void;
};

function formatEuro(n: number, ht = false) {
  return `+${new Intl.NumberFormat("fr-FR").format(n)} €${ht ? " HT" : ""}`;
}

function DetailTrigger({
  option,
  onOpenDetail,
  children,
}: {
  option: OptionItem;
  onOpenDetail: (option: OptionItem) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpenDetail(option)}
      className="min-w-0 flex-1 text-left transition hover:opacity-80"
    >
      {children}
    </button>
  );
}

export function PaidOptionsPanel({
  paid,
  onChange,
  onOpenDetail,
}: PaidOptionsPanelProps) {
  const catalog = getAllPaidOptions();

  const setToggle = (id: string, value: boolean) => {
    onChange({
      ...paid,
      toggles: { ...paid.toggles, [id]: value },
    });
  };

  return (
    <div className="space-y-6">
      {OPTION_CATEGORIES.map((category) => (
        <div key={category.id}>
          <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
            {category.title}
          </p>
          <div className="mt-3 space-y-3">
            {category.items.map((raw) => {
              const item = catalog.find((o) => o.id === raw.id) ?? raw;

              if (item.id === "transport") {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenDetail(item)}
                    className="w-full rounded-2xl border border-luxury-stone/80 bg-white/50 px-4 py-3 text-left transition hover:border-luxury-muted"
                  >
                    <p className="font-ui text-sm text-luxury-graphite">{item.title}</p>
                    <p className="mt-1 font-ui text-[11px] text-luxury-muted">
                      Inclus dans un rayon de 30 km — voir le détail
                    </p>
                  </button>
                );
              }

              if (item.id === "terrasses") {
                const enabled = paid.terrasse !== "none";
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border px-4 py-4 transition ${
                      enabled
                        ? "border-luxury-forest bg-white"
                        : "border-luxury-stone bg-white/60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenDetail(item)}
                        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                      >
                        <Image src={item.image} alt="" fill className="object-cover" sizes="56px" />
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <DetailTrigger option={item} onOpenDetail={onOpenDetail}>
                            <p className="font-ui text-sm text-luxury-graphite">{item.title}</p>
                            <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                              Voir le détail →
                            </p>
                          </DetailTrigger>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={enabled}
                            onClick={() =>
                              onChange({
                                ...paid,
                                terrasse: enabled ? "none" : "compact",
                              })
                            }
                            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                              enabled ? "bg-luxury-forest" : "bg-luxury-stone"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                                enabled ? "left-5" : "left-0.5"
                              }`}
                            />
                          </button>
                        </div>
                        {enabled && (
                          <div className="mt-3 flex flex-col gap-2">
                            {(
                              [
                                ["compact", "5,90 m", CONFIGURATOR_PRICES.terrasseCompact],
                                ["large", "11,80 m", CONFIGURATOR_PRICES.terrasseLarge],
                              ] as const
                            ).map(([id, label, price]) => (
                              <button
                                key={id}
                                type="button"
                                onClick={() => onChange({ ...paid, terrasse: id })}
                                className={`rounded-xl border px-3 py-2 text-left font-ui text-xs transition ${
                                  paid.terrasse === id
                                    ? "border-luxury-forest bg-luxury-forest/5 text-luxury-forest"
                                    : "border-luxury-stone text-luxury-muted"
                                }`}
                              >
                                {label} — {formatEuro(price)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.id === "climatisation") {
                const enabled = paid.climate !== "none";
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border px-4 py-4 transition ${
                      enabled
                        ? "border-luxury-forest bg-white"
                        : "border-luxury-stone bg-white/60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenDetail(item)}
                        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                      >
                        <Image src={item.image} alt="" fill className="object-cover" sizes="56px" />
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <DetailTrigger option={item} onOpenDetail={onOpenDetail}>
                            <p className="font-ui text-sm text-luxury-graphite">{item.title}</p>
                            <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                              Voir le détail →
                            </p>
                          </DetailTrigger>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={enabled}
                            onClick={() =>
                              onChange({
                                ...paid,
                                climate: enabled ? "none" : "standard",
                              })
                            }
                            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                              enabled ? "bg-luxury-forest" : "bg-luxury-stone"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                                enabled ? "left-5" : "left-0.5"
                              }`}
                            />
                          </button>
                        </div>
                        {enabled && (
                          <div className="mt-3 flex flex-col gap-2">
                            {(
                              [
                                ["standard", "Standard", CONFIGURATOR_PRICES.climateStandard],
                                ["solar", "Solaire", CONFIGURATOR_PRICES.climateSolar],
                              ] as const
                            ).map(([id, label, price]) => (
                              <button
                                key={id}
                                type="button"
                                onClick={() => onChange({ ...paid, climate: id })}
                                className={`rounded-xl border px-3 py-2 text-left font-ui text-xs transition ${
                                  paid.climate === id
                                    ? "border-luxury-forest bg-luxury-forest/5 text-luxury-forest"
                                    : "border-luxury-stone text-luxury-muted"
                                }`}
                              >
                                {label} — {formatEuro(price)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.id === "rideaux") {
                const enabled = !!paid.toggles["rideaux"];
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border px-4 py-4 transition ${
                      enabled
                        ? "border-luxury-forest bg-white"
                        : "border-luxury-stone bg-white/60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenDetail(item)}
                        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <DetailTrigger option={item} onOpenDetail={onOpenDetail}>
                            <p className="font-ui text-sm text-luxury-graphite">{item.title}</p>
                            <p className="mt-1 font-ui text-[11px] text-luxury-muted">
                              220 € TTC / ml
                            </p>
                            <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                              Voir le détail →
                            </p>
                          </DetailTrigger>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={enabled}
                            onClick={() => setToggle("rideaux", !enabled)}
                            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                              enabled ? "bg-luxury-forest" : "bg-luxury-stone"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                                enabled ? "left-5" : "left-0.5"
                              }`}
                            />
                          </button>
                        </div>
                        {enabled && (
                          <div className="mt-3">
                            <label className="flex items-center justify-between font-ui text-xs text-luxury-muted">
                              <span>Mètres linéaires</span>
                              <span className="text-luxury-graphite">{paid.rideauxMl} ml</span>
                            </label>
                            <input
                              type="range"
                              min={1}
                              max={12}
                              value={paid.rideauxMl}
                              onChange={(e) =>
                                onChange({
                                  ...paid,
                                  rideauxMl: Number(e.target.value),
                                })
                              }
                              className="mt-2 w-full accent-luxury-forest"
                            />
                            <p className="mt-1 font-ui text-[11px] text-luxury-forest">
                              {formatEuro(220 * paid.rideauxMl)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              const enabled = !!paid.toggles[item.id];
              const priceLabel =
                item.price != null
                  ? formatEuro(item.price, item.priceType === "ht")
                  : formatOptionPrice(item);

              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                    enabled
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
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <DetailTrigger option={item} onOpenDetail={onOpenDetail}>
                        <p className="font-ui text-sm text-luxury-graphite">{item.title}</p>
                        <p className="mt-0.5 font-ui text-[11px] text-luxury-muted">
                          {priceLabel}
                        </p>
                        <p className="mt-0.5 font-ui text-[10px] text-luxury-forest">
                          Voir le détail →
                        </p>
                      </DetailTrigger>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        onClick={() => setToggle(item.id, !enabled)}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          enabled ? "bg-luxury-forest" : "bg-luxury-stone"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                            enabled ? "left-5" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
