"use client";

import type { ReactNode } from "react";
import type { ClimateOption, SolarWaterOption, TerraceOption } from "./data";
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

/** Card chauffe-eau solaire — 100 L / 200 L */
export function SolarWaterCard({
  value,
  onChange,
  enabled,
  onToggle,
  onInfo,
}: {
  value: SolarWaterOption;
  onChange: (value: SolarWaterOption) => void;
  enabled: boolean;
  onToggle: (value: boolean) => void;
  onInfo: () => void;
}) {
  const priceLabel =
    !enabled
      ? "—"
      : value === "200L"
        ? `+${PRICES.solarWater200L} €`
        : `+${PRICES.solarWater} €`;

  return (
    <EquipmentCard
      title="Chauffe-eau Solaire"
      priceLabel={priceLabel}
      enabled={enabled}
      onToggle={onToggle}
      onInfo={onInfo}
    >
      <div className="flex gap-2">
        {(
          [
            { id: "150L" as const, label: "Ballon 100 L", price: PRICES.solarWater },
            { id: "200L" as const, label: "Ballon 200 L", price: PRICES.solarWater200L },
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

type TerraceCardProps = {
  value: TerraceOption;
  onChange: (value: TerraceOption) => void;
  enabled: boolean;
  onToggle: (value: boolean) => void;
  onInfo: () => void;
};

export function TerraceCard({ value, onChange, enabled, onToggle, onInfo }: TerraceCardProps) {
  const priceLabel =
    !enabled
      ? "—"
      : value === "large"
        ? `+${PRICES.terrasseLarge} €`
        : `+${PRICES.terrasseCompact} €`;

  return (
    <EquipmentCard
      title="Terrasse bois composite"
      priceLabel={priceLabel}
      enabled={enabled}
      onToggle={onToggle}
      onInfo={onInfo}
    >
      <div className="flex gap-2">
        {(
          [
            { id: "compact" as const, label: "5,90 m", price: PRICES.terrasseCompact },
            { id: "large" as const, label: "11,80 m", price: PRICES.terrasseLarge },
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

export type { EquipmentId };
