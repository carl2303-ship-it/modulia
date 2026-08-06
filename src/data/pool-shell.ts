import { defaultLocale, type Locale } from "@/i18n/config";

export type PoolShellColor = {
  id: string;
  name: string;
  hex: string;
};

/** Couleur de la structure / coque de la piscine — avant le liner */
export const POOL_SHELL_COLORS: PoolShellColor[] = [
  { id: "blanc", name: "Blanc", hex: "#f5f5f5" },
  { id: "gris", name: "Gris", hex: "#9a9a9a" },
  { id: "marron", name: "Marron", hex: "#6b4423" },
];

export const DEFAULT_POOL_SHELL_ID = "blanc";

const SHELL_NAMES: Record<string, Partial<Record<Locale, string>>> = {
  blanc: { pt: "Branco", en: "White" },
  gris: { pt: "Cinzento", en: "Grey" },
  marron: { pt: "Castanho", en: "Brown" },
};

export function getLocalizedPoolShellColors(
  locale: Locale = defaultLocale,
): PoolShellColor[] {
  if (locale === defaultLocale) return POOL_SHELL_COLORS;
  return POOL_SHELL_COLORS.map((color) => ({
    ...color,
    name: SHELL_NAMES[color.id]?.[locale] ?? color.name,
  }));
}

export function getPoolShellById(
  id: string,
  locale: Locale = defaultLocale,
): PoolShellColor | undefined {
  return getLocalizedPoolShellColors(locale).find((color) => color.id === id);
}
