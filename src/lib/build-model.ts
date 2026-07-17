import type { ModelData, ModelRichContent, ModelSpec } from "@/data/models";
import type { ModelOverride } from "@/data/model-overrides";
import {
  getStandardHighlights,
  getStandardValueProps,
  localizeKeyFeatureDesc,
  localizeKeyFeatureTitle,
  localizeSpecLabel,
  localizeSpecValue,
  resolveModelOverride,
} from "@/data/model-overrides-i18n";
import { defaultLocale, type Locale } from "@/i18n/config";
import {
  getModelAssets,
  MODEL_SLUGS,
  type ModelSlug,
} from "@/lib/model-catalog";

function formatDimensions(length: string, width: string): string {
  return `${length.replace(" m", "")} × ${width}`;
}

function buildSpecs(override: ModelOverride, locale: Locale): ModelSpec[] {
  const specs: ModelSpec[] = [
    {
      label: localizeSpecLabel("Dimensions hors tout", locale),
      value: formatDimensions(override.length, override.width),
    },
    {
      label: localizeSpecLabel("Hauteur intérieure", locale),
      value: "2,25 m",
    },
    {
      label: localizeSpecLabel("Surface intérieure", locale),
      value: override.area,
    },
    {
      label: localizeSpecLabel("Capacité", locale),
      value: override.capacity,
    },
    {
      label: localizeSpecLabel("Structure", locale),
      value: localizeSpecValue("Acier galvanisé", locale),
    },
    {
      label: localizeSpecLabel("Isolation", locale),
      value: localizeSpecValue("Haute performance", locale),
    },
  ];

  if (override.terrace) {
    specs.push({
      label: localizeSpecLabel("Terrasse", locale),
      value: override.terrace,
    });
  }

  specs.push({
    label: localizeSpecLabel("Distribution", locale),
    value: override.distribution,
  });

  return specs;
}

function buildKeyFeatures(
  override: ModelOverride,
  locale: Locale,
): NonNullable<ModelRichContent["keyFeatures"]> {
  const livingDesc =
    locale === "pt"
      ? "Amplos e abertos"
      : locale === "en"
        ? "Spacious and open"
        : "Spacieuses et ouvertes";

  if (override.terrace && override.length.startsWith("11")) {
    return [
      { title: localizeKeyFeatureTitle("Longueur", locale), description: override.length },
      { title: localizeKeyFeatureTitle("Largeur", locale), description: override.width },
      { title: localizeKeyFeatureTitle("Terrasse", locale), description: override.terrace },
      {
        title: localizeKeyFeatureTitle("Distribution", locale),
        description: override.distribution,
      },
      {
        title: localizeKeyFeatureTitle("Pièces de vie", locale),
        description: livingDesc,
      },
    ];
  }

  return [
    { title: localizeKeyFeatureTitle("Longueur", locale), description: override.length },
    { title: localizeKeyFeatureTitle("Largeur", locale), description: override.width },
    { title: localizeKeyFeatureTitle("Surface", locale), description: override.area },
    {
      title: localizeKeyFeatureTitle("Distribution", locale),
      description: override.distribution,
    },
    { title: localizeKeyFeatureTitle("Capacité", locale), description: override.capacity },
  ];
}

const IMAGE_ALT: Record<Locale, (name: string, n: 1 | 2) => string> = {
  fr: (name, n) => `${name} — vue 3D ${n}`,
  pt: (name, n) => `${name} — vista 3D ${n}`,
  en: (name, n) => `${name} — 3D view ${n}`,
};

const PLAN_LABEL: Record<Locale, (dimensions: string) => string> = {
  fr: (d) => `Plan & Dimensions · ${d}`,
  pt: (d) => `Planta e dimensões · ${d}`,
  en: (d) => `Plan & dimensions · ${d}`,
};

export function buildModelFromSlug(
  slug: ModelSlug,
  locale: Locale = defaultLocale,
): ModelData {
  const assets = getModelAssets(slug);
  const override = resolveModelOverride(slug, locale);
  const dimensions = formatDimensions(override.length, override.width);

  const rich: ModelRichContent = {
    introSubline: override.introSubline,
    keyFeatures: buildKeyFeatures(override, locale).map((f) => ({
      title: f.title,
      description: localizeKeyFeatureDesc(f.description, locale),
    })),
    valueProps: getStandardValueProps(locale),
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
      { src: assets.hero1, alt: IMAGE_ALT[locale](override.name, 1) },
      { src: assets.hero2, alt: IMAGE_ALT[locale](override.name, 2) },
    ],
    planImage: assets.planImage,
    planLabel: PLAN_LABEL[locale](dimensions),
    specs: buildSpecs(override, locale),
    highlights: getStandardHighlights(locale),
    rooms: override.rooms,
    area: override.area,
    capacity: override.capacity,
    configuratorUrl: `/personnaliser?model=${slug}`,
    rich,
  };
}

export function buildAllModels(locale: Locale = defaultLocale): ModelData[] {
  return MODEL_SLUGS.map((slug) => buildModelFromSlug(slug, locale)).sort(
    (a, b) => b.priceFrom - a.priceFrom,
  );
}
