/**
 * Catálogo de modelos Modulia — Particulares
 * Gerado a partir das pastas em public/ + fichas técnicas.
 */

import { buildAllModels, buildModelFromSlug } from "@/lib/build-model";
import { defaultLocale, type Locale } from "@/i18n/config";
import { MODEL_SLUGS, type ModelSlug } from "@/lib/model-catalog";

export type ModelSpec = {
  label: string;
  value: string;
};

export type ModelImage = {
  src: string;
  alt: string;
};

export type ModelFeatureBlock = {
  title: string;
  description: string;
};

export type ModelLayoutZone = {
  zone: string;
  detail: string;
};

export type ModelRichContent = {
  introSubline?: string;
  keyFeatures?: ModelFeatureBlock[];
  valueProps?: ModelFeatureBlock[];
  layoutZones?: ModelLayoutZone[];
  planFootprint?: string;
  planInternalMeasures?: string[];
  closingTagline?: string;
};

export type ModelData = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceFrom: number;
  category: "particuliers";
  featured?: boolean;
  images: ModelImage[];
  planImage?: string;
  planLabel?: string;
  specs: ModelSpec[];
  highlights: string[];
  rooms: string;
  area: string;
  capacity: string;
  configuratorUrl?: string;
  rich?: ModelRichContent;
};

/** Catálogo FR (compat / listagens estáticas) */
export const MODELS_PARTICULIERS: ModelData[] = buildAllModels(defaultLocale);

export function getModels(locale: Locale = defaultLocale): ModelData[] {
  return buildAllModels(locale);
}

function isModelSlug(slug: string): slug is ModelSlug {
  return (MODEL_SLUGS as readonly string[]).includes(slug);
}

export function getModelBySlug(
  slug: string,
  locale: Locale = defaultLocale,
): ModelData | undefined {
  if (!isModelSlug(slug)) return undefined;
  return buildModelFromSlug(slug, locale);
}

export function getAllModelSlugs(): string[] {
  return MODELS_PARTICULIERS.map((m) => m.slug);
}

export type ModelNavItem = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

function toNavItem(model: ModelData): ModelNavItem {
  return {
    slug: model.slug,
    name: model.name,
    tagline: model.tagline,
    image: model.images[0]?.src ?? "/logo-modulia.png",
  };
}

/** Modèles adjacents selon l'ordre du catalogue (prix décroissant). */
export function getAdjacentModels(
  slug: string,
  locale: Locale = defaultLocale,
): {
  previous: ModelNavItem;
  next: ModelNavItem;
} | null {
  const models = getModels(locale);
  const index = models.findIndex((m) => m.slug === slug);
  if (index === -1) return null;

  const total = models.length;
  const previous = models[(index - 1 + total) % total];
  const next = models[(index + 1) % total];

  return {
    previous: toNavItem(previous),
    next: toNavItem(next),
  };
}

const NUMBER_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  pt: "pt-PT",
  en: "en-GB",
};

export function formatModelPrice(value: number, locale: Locale = defaultLocale): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(value);
}
