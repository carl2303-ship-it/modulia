"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { getLocalizedPoolLinerColors } from "@/data/pool-liner";
import { getLocalizedPoolFabricColors } from "@/data/pool-fabric";
import { PoolSwatchGrid } from "./PoolSwatchGrid";

export function PoolLinerCatalog() {
  const locale = useLocale() as Locale;
  const colors = getLocalizedPoolLinerColors(locale);

  return (
    <PoolSwatchGrid
      items={colors.map((color) => ({
        id: color.id,
        image: color.image,
        label: color.name,
      }))}
      variant="compact"
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
