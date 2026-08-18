"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { getLocalizedPoolFabricColors } from "@/data/pool-fabric";
import { getLocalizedPoolShellColors } from "@/data/pool-shell";
import { PoolSwatchGrid } from "./PoolSwatchGrid";

export function PoolShellCatalog() {
  const locale = useLocale() as Locale;
  const colors = getLocalizedPoolShellColors(locale);

  return (
    <PoolSwatchGrid
      items={colors.map((color) => ({
        id: color.id,
        hex: color.hex,
        label: color.name,
      }))}
      variant="compact"
      columnsClass="grid grid-cols-3 gap-3 sm:max-w-md"
    />
  );
}

export function PoolFabricCatalog() {
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
      variant="dense"
    />
  );
}
