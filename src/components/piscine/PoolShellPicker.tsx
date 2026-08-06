"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { getLocalizedPoolShellColors } from "@/data/pool-shell";
import { PoolSwatchGrid } from "./PoolSwatchGrid";

type PoolShellPickerProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export function PoolShellPicker({ selectedId, onSelect }: PoolShellPickerProps) {
  const locale = useLocale() as Locale;
  const colors = getLocalizedPoolShellColors(locale);

  return (
    <PoolSwatchGrid
      items={colors.map((color) => ({
        id: color.id,
        hex: color.hex,
        label: color.name,
      }))}
      selectedId={selectedId}
      onSelect={onSelect}
      variant="compact"
      columnsClass="grid grid-cols-3 gap-3 sm:grid-cols-3"
    />
  );
}
