"use client";

import type { ReactNode } from "react";
import type { ClimateOption } from "./data";
import { PRICES } from "./data";
import type { EquipmentId } from "./data";

type ToggleProps = {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

/** Toggle switch cápsula — inspirado no logótipo Modulia */
export function LuxuryToggle({ enabled, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={`toggle-capsule ${enabled ? "bg-luxury-forest" : "bg-luxury-stone"}`}
    >
      <span
        className={`toggle-capsule-knob ${enabled ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}

type EquipmentCardProps = {
  title: string;
  priceLabel: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
  onInfo: () => void;
  children?: ReactNode;
};

/** Card de equipamento com preço e toggle */
export function EquipmentCard({
  title,
  priceLabel,
  enabled,
  onToggle,
  onInfo,
  children,
}: EquipmentCardProps) {
  return (
    <article
      className={`rounded-2xl border p-5 transition-all duration-500 ease-luxury ${
        enabled
          ? "border-luxury-forest/30 bg-white shadow-luxury-sm"
          : "border-luxury-stone bg-luxury-papyrus/30 hover:border-luxury-muted/50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <h4 className="font-ui text-sm font-medium text-luxury-graphite">{title}</h4>
          <button
            type="button"
            onClick={onInfo}
            className="flex h-5 w-5 items-center justify-center rounded-full border border-luxury-stone font-ui text-[10px] text-luxury-muted transition hover:border-luxury-forest hover:text-luxury-forest"
            aria-label={`Informations sur ${title}`}
          >
            i
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-ui text-sm tabular-nums ${enabled ? "text-luxury-forest font-medium" : "text-luxury-muted"}`}>
            {priceLabel}
          </span>
          <LuxuryToggle enabled={enabled} onChange={onToggle} label={title} />
        </div>
      </div>
      {children && (
        <div
          className={`mt-4 overflow-hidden transition-all duration-500 ease-luxury ${
            enabled ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {children}
        </div>
      )}
    </article>
  );
}

type ClimateSelectorProps = {
  value: ClimateOption;
  onChange: (value: ClimateOption) => void;
  enabled: boolean;
  onToggle: (value: boolean) => void;
  onInfo: () => void;
};

/** Card B: seletor duplo Standard / Solaire */
export function ClimateCard({ value, onChange, enabled, onToggle, onInfo }: ClimateSelectorProps) {
  const priceLabel =
    !enabled ? "—" : value === "solar" ? `+${PRICES.climateSolar} €` : `+${PRICES.climateStandard} €`;

  return (
    <EquipmentCard
      title="Climatisation"
      priceLabel={priceLabel}
      enabled={enabled}
      onToggle={onToggle}
      onInfo={onInfo}
    >
      <div className="flex gap-2">
        {(
          [
            { id: "standard" as const, label: "Standard", price: PRICES.climateStandard },
            { id: "solar" as const, label: "Solaire", price: PRICES.climateSolar },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex-1 rounded-xl border px-3 py-3 font-ui text-xs transition-all duration-300 ${
              value === opt.id
                ? "border-luxury-forest bg-luxury-forest/5 text-luxury-forest"
                : "border-luxury-stone text-luxury-muted hover:border-luxury-muted"
            }`}
          >
            <span className="block font-medium">{opt.label}</span>
            <span className="mt-0.5 block tabular-nums">+{opt.price} €</span>
          </button>
        ))}
      </div>
    </EquipmentCard>
  );
}

type KitchenCardProps = {
  enabled: boolean;
  ml: number;
  onToggle: (v: boolean) => void;
  onMlChange: (ml: number) => void;
  onInfo: () => void;
};

export function KitchenCard({ enabled, ml, onToggle, onMlChange, onInfo }: KitchenCardProps) {
  return (
    <EquipmentCard
      title="Cuisine Contemporaine"
      priceLabel={enabled ? `+${PRICES.kitchenPerMl * ml} €` : "—"}
      enabled={enabled}
      onToggle={onToggle}
      onInfo={onInfo}
    >
      <div className="flex items-center justify-between">
        <span className="font-ui text-xs text-luxury-muted">Mètres linéaires</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onMlChange(Math.max(1, ml - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-luxury-stone font-ui text-luxury-graphite transition hover:border-luxury-forest"
          >
            −
          </button>
          <span className="w-8 text-center font-ui text-sm font-medium tabular-nums text-luxury-graphite">{ml}</span>
          <button
            type="button"
            onClick={() => onMlChange(Math.min(12, ml + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-luxury-stone font-ui text-luxury-graphite transition hover:border-luxury-forest"
          >
            +
          </button>
        </div>
      </div>
      <p className="mt-2 font-ui text-[10px] text-luxury-muted">{PRICES.kitchenPerMl} € / ML</p>
    </EquipmentCard>
  );
}

export type { EquipmentId };
