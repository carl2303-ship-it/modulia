import { defaultLocale, type Locale } from "@/i18n/config";

export type PoolShellColor = {
  id: string;
  name: string;
  hex: string;
};

/** Couleur de la structure / coque de la piscine */
export const POOL_SHELL_COLORS: PoolShellColor[] = [
  { id: "blanc", name: "Blanc", hex: "#f5f5f5" },
  { id: "gris-clair", name: "Gris clair", hex: "#c8c8c8" },
  { id: "gris-fonce", name: "Gris foncé", hex: "#3f3f3f" },
];

export const DEFAULT_POOL_SHELL_ID = "blanc";

const SHELL_NAMES: Record<string, Partial<Record<Locale, string>>> = {
  blanc: { pt: "Branco", en: "White" },
  "gris-clair": { pt: "Cinzento claro", en: "Light grey" },
  "gris-fonce": { pt: "Cinzento escuro", en: "Dark grey" },
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
