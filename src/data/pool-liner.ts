import { defaultLocale, type Locale } from "@/i18n/config";

const ps = (file: string) => `/piscina/${file}`;

export type PoolLinerColor = {
  id: string;
  name: string;
  hex: string;
  image: string;
};

export const POOL_LINER_COLORS: PoolLinerColor[] = [
  { id: "bleu-pale", name: "Bleu pâle", hex: "#a8cce8", image: ps("liner-bleu-pale.png") },
  { id: "sable", name: "Sable", hex: "#c4b49a", image: ps("liner-sable.png") },
  { id: "bleu-france", name: "Bleu France", hex: "#1e88c7", image: ps("liner-bleu-france.png") },
  { id: "gris", name: "Gris", hex: "#9e9e9e", image: ps("liner-gris.png") },
  { id: "vert-caraibe", name: "Vert Caraïbe", hex: "#2ec4b6", image: ps("liner-vert-caraibe.png") },
  {
    id: "gris-anthracite",
    name: "Gris anthracite",
    hex: "#4a4a4a",
    image: ps("liner-gris-anthracite.png"),
  },
  { id: "blanc", name: "Blanc", hex: "#f0f0f0", image: ps("liner-blanc.png") },
  { id: "noir", name: "Noir", hex: "#1a1a1a", image: ps("liner-noir.png") },
];

export const DEFAULT_POOL_LINER_ID = "bleu-france";

export const POOL_LINER_OVERVIEW_IMAGE = ps("piscina-couleurs-liner.png");

const LINER_NAMES: Record<string, Partial<Record<Locale, string>>> = {
  "bleu-pale": { pt: "Azul claro", en: "Pale blue" },
  sable: { pt: "Areia", en: "Sand" },
  "bleu-france": { pt: "Azul França", en: "French blue" },
  gris: { pt: "Cinzento", en: "Grey" },
  "vert-caraibe": { pt: "Verde Caraíbas", en: "Caribbean green" },
  "gris-anthracite": { pt: "Cinzento antracite", en: "Anthracite grey" },
  blanc: { pt: "Branco", en: "White" },
  noir: { pt: "Preto", en: "Black" },
};

export function getLocalizedPoolLinerColors(locale: Locale = defaultLocale): PoolLinerColor[] {
  if (locale === defaultLocale) return POOL_LINER_COLORS;
  return POOL_LINER_COLORS.map((color) => ({
    ...color,
    name: LINER_NAMES[color.id]?.[locale] ?? color.name,
  }));
}

export function getPoolLinerById(
  id: string,
  locale: Locale = defaultLocale,
): PoolLinerColor | undefined {
  return getLocalizedPoolLinerColors(locale).find((color) => color.id === id);
}
