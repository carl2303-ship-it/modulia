import type { ModelData, ModelRichContent, ModelSpec } from "@/data/models";
import {
  MODEL_OVERRIDES,
  STANDARD_HIGHLIGHTS,
  STANDARD_VALUE_PROPS,
} from "@/data/model-overrides";
import {
  getModelAssets,
  MODEL_SLUGS,
  type ModelSlug,
} from "@/lib/model-catalog";

function formatDimensions(length: string, width: string): string {
  return `${length.replace(" m", "")} × ${width}`;
}

function buildSpecs(override: (typeof MODEL_OVERRIDES)[ModelSlug]): ModelSpec[] {
  const specs: ModelSpec[] = [
    {
      label: "Dimensions hors tout",
      value: formatDimensions(override.length, override.width),
    },
    { label: "Hauteur intérieure", value: "2,25 m" },
    { label: "Surface intérieure", value: override.area },
    { label: "Capacité", value: override.capacity },
    { label: "Structure", value: "Acier galvanisé" },
    { label: "Isolation", value: "Haute performance" },
  ];

  if (override.terrace) {
    specs.push({ label: "Terrasse", value: override.terrace });
  }

  specs.push({ label: "Distribution", value: override.distribution });

  return specs;
}

function buildKeyFeatures(
  override: (typeof MODEL_OVERRIDES)[ModelSlug],
): NonNullable<ModelRichContent["keyFeatures"]> {
  if (override.terrace && override.length.startsWith("11")) {
    return [
      { title: "Longueur", description: override.length },
      { title: "Largeur", description: override.width },
      { title: "Terrasse", description: override.terrace },
      { title: "Distribution", description: override.distribution },
      { title: "Pièces de vie", description: "Spacieuses et ouvertes" },
    ];
  }

  return [
    { title: "Longueur", description: override.length },
    { title: "Largeur", description: override.width },
    { title: "Surface", description: override.area },
    { title: "Distribution", description: override.distribution },
    { title: "Capacité", description: override.capacity },
  ];
}

export function buildModelFromSlug(slug: ModelSlug): ModelData {
  const assets = getModelAssets(slug);
  const override = MODEL_OVERRIDES[slug];
  const dimensions = formatDimensions(override.length, override.width);

  const rich: ModelRichContent = {
    introSubline: override.introSubline,
    keyFeatures: buildKeyFeatures(override),
    valueProps: STANDARD_VALUE_PROPS,
    layoutZones: override.layoutZones,
    planFootprint: dimensions,
    planInternalMeasures: override.planInternalMeasures,
    closingTagline: override.closingTagline,
  };

  return {
    slug,
    name: override.name,
    tagline: override.tagline,
    description: override.description,
    priceFrom: override.priceFrom,
    category: "particuliers",
    featured: override.featured,
    images: [
      { src: assets.hero1, alt: `${override.name} — vue 3D 1` },
      { src: assets.hero2, alt: `${override.name} — vue 3D 2` },
    ],
    planImage: assets.planImage,
    planLabel: `Plan & Dimensions · ${dimensions}`,
    specs: buildSpecs(override),
    highlights: STANDARD_HIGHLIGHTS,
    rooms: override.rooms,
    area: override.area,
    capacity: override.capacity,
    configuratorUrl: `/personnaliser?model=${slug}`,
    rich,
  };
}

export function buildAllModels(): ModelData[] {
  return MODEL_SLUGS.map(buildModelFromSlug).sort(
    (a, b) => b.priceFrom - a.priceFrom,
  );
}
