"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { getLocalizedPoolLinerColors } from "@/data/pool-liner";
import { PoolSwatchGrid } from "./PoolSwatchGrid";

type PoolLinerPickerProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export function PoolLinerPicker({ selectedId, onSelect }: PoolLinerPickerProps) {
  const locale = useLocale() as Locale;
  const colors = getLocalizedPoolLinerColors(locale);

  return (
    <PoolSwatchGrid
      items={colors.map((color) => ({
        id: color.id,
        image: color.image,
        label: color.name,
      }))}
      selectedId={selectedId}
      onSelect={onSelect}
      variant="compact"
    />
  );
}
