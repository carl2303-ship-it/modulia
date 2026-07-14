/**
 * Catálogo de modelos Modulia — Particulares
 * Gerado a partir das pastas em public/ + fichas técnicas.
 */

import { buildAllModels } from "@/lib/build-model";

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

export const MODELS_PARTICULIERS: ModelData[] = buildAllModels();

export function getModelBySlug(slug: string): ModelData | undefined {
  return MODELS_PARTICULIERS.find((m) => m.slug === slug);
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
export function getAdjacentModels(slug: string): {
  previous: ModelNavItem;
  next: ModelNavItem;
} | null {
  const index = MODELS_PARTICULIERS.findIndex((m) => m.slug === slug);
  if (index === -1) return null;

  const total = MODELS_PARTICULIERS.length;
  const previous = MODELS_PARTICULIERS[(index - 1 + total) % total];
  const next = MODELS_PARTICULIERS[(index + 1) % total];

  return {
    previous: toNavItem(previous),
    next: toNavItem(next),
  };
}

export function formatModelPrice(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(value);
}
