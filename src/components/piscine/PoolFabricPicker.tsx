"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { getLocalizedPoolFabricColors } from "@/data/pool-fabric";
import { PoolSwatchGrid } from "./PoolSwatchGrid";

type PoolFabricPickerProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export function PoolFabricPicker({ selectedId, onSelect }: PoolFabricPickerProps) {
  const locale = useLocale() as Locale;
  const fabrics = getLocalizedPoolFabricColors(locale);

  return (
    <PoolSwatchGrid
      items={fabrics.map((fabric) => ({
        id: fabric.id,
        image: fabric.image,
        label: fabric.code,
        title: `${fabric.code} — ${fabric.name} · 150 cm · ${fabric.weight} g/m²`,
      }))}
      selectedId={selectedId}
      onSelect={onSelect}
      variant="dense"
    />
  );
}
