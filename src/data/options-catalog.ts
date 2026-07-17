/**
 * Catalogue des options Modulia — fichiers dans public/opcoes, cozinhas, piscina
 */

import { getOptionRich, type OptionRichContent } from "@/data/options-rich";
import { defaultLocale, type Locale } from "@/i18n/config";
import { localizedOptionImage, localizedKitchenImage } from "@/lib/localized-assets";
import {
  CATEGORY_COPY,
  KITCHEN_BASE_COPY,
  NUMBER_LOCALE,
  POOL_COPY,
  PRICE_LABELS,
  resolveCategorySubtitle,
  resolveCategoryTitle,
  resolveOptionCopy,
} from "@/data/catalog-i18n";

export type OptionItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  price?: number;
  priceLabel?: string;
  priceType?: "ttc" | "ht" | "inclus" | "sur-devis";
  highlights?: string[];
  rich?: OptionRichContent;
  categoryId?: string;
  categoryTitle?: string;
  includedChoice?: boolean;
};

export type OptionCategory = {
  id: string;
  title: string;
  subtitle?: string;
  items: OptionItem[];
};

const op = (file: string) => `/opcoes/${file}`;
const cz = (file: string) => `/cozinhas/${file}`;
const ps = (file: string) => `/piscina/${file}`;

/** Choix de finitions inclus dans le prix du modèle — pas des options payantes */
export const FINITION_CATEGORIES: OptionCategory[] = [
  {
    id: "exterior-inclus",
    title: "Extérieur — choix inclus",
    subtitle: "Façade et lames de terrasse d'origine — personnalisation sans supplément",
    items: [
      {
        id: "decor-exterior",
        title: "Décor extérieur à claire-voie",
        description: "Esthétique, durable et sans entretien — 6 coloris premium + 8 standards.",
        image: op("decor exterieur.jpg"),
        priceType: "inclus",
        priceLabel: "Inclus dans le prix",
        includedChoice: true,
        highlights: ["Design moderne", "Résistant UV", "Sans entretien", "Écologique"],
      },
      {
        id: "lames-terrasse",
        title: "Lames de terrasse",
        description:
          "Choix de coloris pour la terrasse incluse avec chaque modèle — bois composite premium.",
        image: op("lames terrasse.jpg"),
        priceType: "inclus",
        priceLabel: "Inclus dans le prix",
        includedChoice: true,
      },
    ],
  },
  {
    id: "interior-inclus",
    title: "Intérieur — choix inclus",
    subtitle: "Murs, sols et salle de bains — inclus dans le prix du modèle",
    items: [
      {
        id: "murs-interieurs",
        title: "Plaquages bois — murs intérieurs",
        description: "Palette de finitions bois pour vos murs intérieurs.",
        image: op("plaquages bois.jpg"),
        priceType: "inclus",
        priceLabel: "Inclus dans le prix",
        includedChoice: true,
      },
      {
        id: "murs-decoratifs",
        title: "Revêtements muraux décoratifs",
        description: "Couleurs et finitions décoratives haut de gamme.",
        image: op("revetements muraux decoratifs.jpg"),
        priceType: "inclus",
        priceLabel: "Inclus dans le prix",
        includedChoice: true,
      },
      {
        id: "parquet",
        title: "Parquet flottant",
        description: "12 coloris disponibles — pose rapide sans colle.",
        image: op("parquet flottant.jpg"),
        priceType: "inclus",
        priceLabel: "Inclus dans le prix",
        includedChoice: true,
        highlights: ["Chêne, noyer, gris…", "Anti-humidité", "Écologique"],
      },
      {
        id: "sdb-couleurs",
        title: "Revêtements muraux — salle de bains",
        description: "Finitions étanches pour votre espace sanitaire.",
        image: op("murs salle de bains.jpg"),
        priceType: "inclus",
        priceLabel: "Inclus dans le prix",
        includedChoice: true,
      },
    ],
  },
];

export const OPTION_CATEGORIES: OptionCategory[] = [
  {
    id: "exterior",
    title: "Options extérieur",
    subtitle: "Terrasses supplémentaires et aménagements de jardin",
    items: [
      {
        id: "terrasses",
        title: "Terrasses",
        description:
          "Terrasse supplémentaire en plus de celle incluse — grande 11,80 m ou format compact 5,90 m.",
        image: op("terrasses.png"),
        priceLabel: "7 000 – 11 000 € TTC",
        highlights: ["11,80 m · 11 000 € TTC", "5,90 m · 7 000 € TTC"],
      },
      {
        id: "kit-exterieur",
        title: "Kit extérieur",
        description: "Appliques, prises IP44, robinet 2 sorties, tuyau et arrosoir.",
        image: op("kit exterieur.png"),
        price: 149,
        priceType: "ttc",
      },
    ],
  },
  {
    id: "interior",
    title: "Options intérieur",
    subtitle: "Équipements et accessoires en supplément",
    items: [
      {
        id: "kit-sdb",
        title: "Kit salle de bains",
        description: "Accessoires design noir mat — porte-serviettes, porte-savon, etc.",
        image: op("kit salle de bains.jpg"),
        price: 149,
        priceType: "ttc",
      },
      {
        id: "vmc-sdb",
        title: "Ventilation mécanique salle de bains",
        description: "Option ventilation pour confort et hygiène.",
        image: op("ventilation mecanique.png"),
        price: 49,
        priceType: "ttc",
      },
      {
        id: "rideaux",
        title: "Rideaux occultants",
        description: "Rideaux sur mesure pour vos baies vitrées — vendus au mètre linéaire.",
        image: op("rideaux.png"),
        price: 220,
        priceType: "ttc",
        priceLabel: "220 € TTC / mètre linéaire",
      },
      {
        id: "poignee",
        title: "Poignée connectée",
        description: "Serrure intelligente pour sécurité et confort.",
        image: op("poignee connectee.png"),
        price: 225,
        priceType: "ttc",
      },
    ],
  },
  {
    id: "engineering",
    title: "Équipements & ingénierie",
    subtitle: "Confort, énergie et raccordements",
    items: [
      {
        id: "chauffe-eau-solaire",
        title: "Chauffe-eau solaire",
        description: "À la place du chauffe-eau électrique — énergie renouvelable.",
        image: op("chauffe eau solaire.jpg"),
        price: 875,
        priceType: "ttc",
        highlights: ["Économique", "Écologique", "Eau chaude garantie"],
      },
      {
        id: "climatisation",
        title: "Climatisation",
        description: "Standard ou solaire — modules pré-équipés.",
        image: op("climatisation.jpg"),
        priceLabel: "349 – 1 850 €",
        highlights: ["Standard · 349 €", "Solaire · 1 850 €"],
      },
      {
        id: "genie-civil",
        title: "Génie civil / Terrassement",
        description: "Préparation des plots sur votre terrain.",
        image: op("terrassement.png"),
        price: 3000,
        priceType: "ht",
      },
      {
        id: "raccordement",
        title: "Raccordement du module",
        description: "Eau, électricité et écoulement — installation conforme.",
        image: op("raccordement.png"),
        price: 2000,
        priceType: "ht",
      },
      {
        id: "transport",
        title: "Transport & grutage",
        description: "Inclus dans un rayon de 30 km.",
        image: op("transport.jpg"),
        priceType: "inclus",
        highlights: ["Transport inclus", "Grutage inclus", "Rayon 30 km"],
      },
    ],
  },
];

export const KITCHEN_BASE = {
  title: "Cuisine Modulia",
  tagline: "Compacte, élégante et parfaitement équipée.",
  description:
    "La Cuisine Modulia concentre l'essentiel dans un format intelligent pour vous offrir un maximum de confort au quotidien.",
  image: cz("cozinha base foto.jpg"),
  included: true,
  dimensions: "122 × 66 × 200 cm",
  highlights: [
    "Incluse dans tous les modules",
    "Format compact et fonctionnel",
    "Installation rapide",
    "Matériaux durables",
  ],
};

export const KITCHEN_OPTIONS: OptionItem[] = [
  {
    id: "cuisine-premium",
    title: "Option Premium",
    description: "Four, micro-ondes, cave à vin + tiroirs de rangement.",
    image: cz("cozinha opcao premium.jpg"),
    price: 1299,
    priceType: "ttc",
  },
  {
    id: "cuisine-rangement",
    title: "Option Rangement",
    description: "Réfrigérateur, congélateur + tiroirs de rangement.",
    image: cz("cozinha opcao frigo-congelador.jpg"),
    price: 699,
    priceType: "ttc",
  },
  {
    id: "cuisine-buanderie",
    title: "Option Buanderie",
    description: "Four, micro-ondes, lave-linge + tiroirs de rangement.",
    image: cz("cozinha opcao forno micro-ondas lava ropa.jpg"),
    price: 1199,
    priceType: "ttc",
  },
  {
    id: "cuisine-contemporaine",
    title: "Cuisine contemporaine",
    description: "Design épuré et lignes modernes — sur mesure au mètre linéaire.",
    image: cz("cuisine contemporaine.png"),
    priceLabel: "250 € TTC / mètre linéaire",
    price: 250,
    priceType: "ttc",
  },
  {
    id: "complement-cuisine",
    title: "Arrière cuisine",
    description: "Lave-vaisselle et machine à laver — module complémentaire intégré.",
    image: cz("opcao complemento cozinha1.jpg"),
    price: 990,
    priceType: "ttc",
  },
];

export const KITCHEN_APPLIANCES: OptionItem[] = [
  {
    id: "electro-base",
    title: "Kit électroménager base",
    description: "Pack d'appareils encastrables essentiels — inclus.",
    image: cz("kit electromenager base.jpg"),
    priceType: "inclus",
    priceLabel: "Inclus",
  },
  {
    id: "electro-option",
    title: "Kit électroménager premium",
    description: "Pack premium avec appareils haut de gamme.",
    image: cz("kit electromenager premium.png"),
    price: 990,
    priceType: "ttc",
  },
];

export const POOL_MODEL = {
  name: "SOFA POOL",
  tagline: "Compacte, élégante et confortable.",
  description:
    "La Sofa Pool transforme chaque espace en un véritable coin de détente. Format modulaire sans terrassement, prête à installer.",
  priceFrom: 9450,
  dimensions: "2,90 × 2,20 × 0,70 m",
  capacity: "2 à 4 personnes",
  heroImage: ps("piscina.jpg"),
  planImage: ps("piscina dimensoes.jpg"),
  gallery: [ps("piscina1.JPG"), ps("piscina2.jpg"), ps("piscina cores fundo.jpg"), ps("piscina cores sofas.jpg")],
  included: [
    "Système de filtration intégré",
    "Pompe haut rendement",
    "Skimmer de surface",
    "Buses de refoulement",
    "Éclairage LED",
    "Revêtement intérieur haute qualité",
  ],
  highlights: [
    "Débordement 3 côtés",
    "Espace lounge intégré",
    "Sans terrassement",
    "Transport facile",
  ],
};

export const POOL_OPTIONS: OptionItem[] = [
  {
    id: "pool-sel",
    title: "Traitement au sel",
    description: "Électrolyse au sel pour une eau cristalline.",
    image: ps("piscina ficha tecnica.jpg"),
    price: 570,
    priceType: "ttc",
  },
  {
    id: "pool-chauffage",
    title: "Chauffage",
    description: "Pompe à chaleur pour profiter de la piscine toute l'année.",
    image: ps("piscina ficha tecnica.jpg"),
    price: 1480,
    priceType: "ttc",
  },
];

/** Prix configurateur EQUILIBRO — synchronisé avec le catalogue */
export const CONFIGURATOR_PRICES = {
  solarWater: 875,
  climateStandard: 349,
  climateSolar: 1850,
  kitchenPerMl: 250,
  appliances: 990,
  civil: 3000,
  raccordement: 2000,
  terrasseCompact: 7000,
  terrasseLarge: 11000,
  kitExterieur: 149,
} as const;

export function formatOptionPrice(item: OptionItem, locale: Locale = defaultLocale): string {
  if (item.priceLabel) return item.priceLabel;
  const labels = PRICE_LABELS[locale];
  if (item.priceType === "inclus") return labels.inclusLabel;
  if (item.price == null) return labels.surDevis;
  const suffix = item.priceType === "ht" ? labels.htSuffix : labels.ttcSuffix;
  return `${new Intl.NumberFormat(NUMBER_LOCALE[locale]).format(item.price)} ${suffix}`;
}

/** Localise le chemin d'image d'une option ("/opcoes/…", "/cozinhas/…") — la piscine reste inchangée */
function localizeImagePath(image: string, locale: Locale): string {
  if (image.startsWith("/opcoes/")) {
    return localizedOptionImage(image.slice("/opcoes/".length), locale);
  }
  if (image.startsWith("/cozinhas/")) {
    return localizedKitchenImage(image.slice("/cozinhas/".length), locale);
  }
  return image;
}

function localizePriceLabel(item: OptionItem, locale: Locale): string | undefined {
  if (!item.priceLabel || item.priceType !== "inclus") return item.priceLabel;
  const labels = PRICE_LABELS[locale];
  if (item.priceLabel === "Inclus dans le prix") return labels.inclusInPrice;
  if (item.priceLabel === "Inclus") return labels.inclusLabel;
  return item.priceLabel;
}

/** Applique les traductions PT/EN (titre, description, image, prix, catégorie, contenu riche) à une fiche */
export function localizeOptionItem(item: OptionItem, locale: Locale): OptionItem {
  if (locale === defaultLocale) {
    return { ...item, image: localizeImagePath(item.image, locale) };
  }
  const copy = resolveOptionCopy(item.id, locale, {
    title: item.title,
    description: item.description,
    priceLabel: item.priceLabel,
  });
  const categoryTitle = item.categoryId
    ? (CATEGORY_COPY[item.categoryId]?.[locale] ?? item.categoryTitle)
    : item.categoryTitle;
  return {
    ...item,
    title: copy.title,
    description: copy.description ?? item.description,
    image: localizeImagePath(item.image, locale),
    categoryTitle,
    priceLabel: copy.priceLabel ?? localizePriceLabel(item, locale),
    rich: getOptionRich(item.id, locale) ?? item.rich,
  };
}

function enrichOption(
  item: OptionItem,
  categoryId: string,
  categoryTitle: string,
  locale: Locale = defaultLocale,
): OptionItem {
  const base: OptionItem = {
    ...item,
    rich: getOptionRich(item.id, defaultLocale),
    categoryId,
    categoryTitle,
  };
  return locale === defaultLocale
    ? { ...base, image: localizeImagePath(base.image, locale) }
    : localizeOptionItem(base, locale);
}

function localizeItems(items: OptionItem[], locale: Locale): OptionItem[] {
  return items.map((item) =>
    localizeOptionItem({ ...item, rich: getOptionRich(item.id, defaultLocale) }, locale),
  );
}

export function getLocalizedFinitionCategories(locale: Locale = defaultLocale): OptionCategory[] {
  return FINITION_CATEGORIES.map((category) => ({
    ...category,
    title: resolveCategoryTitle(category.id, locale, category.title),
    subtitle: resolveCategorySubtitle(category.id, locale, category.subtitle),
    items: category.items.map((item) => enrichOption(item, category.id, category.title, locale)),
  }));
}

export function getLocalizedOptionCategories(locale: Locale = defaultLocale): OptionCategory[] {
  return OPTION_CATEGORIES.map((category) => ({
    ...category,
    title: resolveCategoryTitle(category.id, locale, category.title),
    subtitle: resolveCategorySubtitle(category.id, locale, category.subtitle),
    items: category.items.map((item) => enrichOption(item, category.id, category.title, locale)),
  }));
}

export function getAllFinitions(locale: Locale = defaultLocale): OptionItem[] {
  return getLocalizedFinitionCategories(locale).flatMap((category) => category.items);
}

export function getAllPaidOptions(locale: Locale = defaultLocale): OptionItem[] {
  return getLocalizedOptionCategories(locale).flatMap((category) => category.items);
}

export function getAllCatalogOptions(locale: Locale = defaultLocale): OptionItem[] {
  return [...getAllFinitions(locale), ...getAllPaidOptions(locale)];
}

export function getFinitionById(id: string, locale: Locale = defaultLocale): OptionItem | undefined {
  return getAllFinitions(locale).find((item) => item.id === id);
}

export function getPaidOptionById(id: string, locale: Locale = defaultLocale): OptionItem | undefined {
  return getAllPaidOptions(locale).find((item) => item.id === id);
}

export function getOptionById(id: string, locale: Locale = defaultLocale): OptionItem | undefined {
  return getFinitionById(id, locale) ?? getPaidOptionById(id, locale);
}

export function getFinitionSlugs(): string[] {
  return getAllFinitions().map((item) => item.id);
}

export function getPaidOptionSlugs(): string[] {
  return getAllPaidOptions().map((item) => item.id);
}

export function getOptionSlugs(): string[] {
  return getAllCatalogOptions().map((item) => item.id);
}

/** Fiche cuisine de base localisée (titre/tagline/description/highlights + image) */
export function getLocalizedKitchenBase(locale: Locale = defaultLocale): typeof KITCHEN_BASE {
  const image = localizeImagePath(KITCHEN_BASE.image, locale);
  if (locale === defaultLocale) return { ...KITCHEN_BASE, image };
  const copy = KITCHEN_BASE_COPY[locale];
  return {
    ...KITCHEN_BASE,
    title: copy?.title ?? KITCHEN_BASE.title,
    tagline: copy?.tagline ?? KITCHEN_BASE.tagline,
    description: copy?.description ?? KITCHEN_BASE.description,
    highlights: copy?.highlights ?? KITCHEN_BASE.highlights,
    image,
  };
}

export function getLocalizedKitchenOptions(locale: Locale = defaultLocale): OptionItem[] {
  return localizeItems(KITCHEN_OPTIONS, locale);
}

export function getLocalizedKitchenAppliances(locale: Locale = defaultLocale): OptionItem[] {
  return localizeItems(KITCHEN_APPLIANCES, locale);
}

/** Fiche piscine SOFA POOL localisée (tagline/description/capacity/included/highlights) — images inchangées */
export function getLocalizedPoolModel(locale: Locale = defaultLocale): typeof POOL_MODEL {
  if (locale === defaultLocale) return POOL_MODEL;
  const copy = POOL_COPY[locale];
  return {
    ...POOL_MODEL,
    tagline: copy?.tagline ?? POOL_MODEL.tagline,
    description: copy?.description ?? POOL_MODEL.description,
    capacity: copy?.capacity ?? POOL_MODEL.capacity,
    included: copy?.included ?? POOL_MODEL.included,
    highlights: copy?.highlights ?? POOL_MODEL.highlights,
  };
}

export function getLocalizedPoolOptions(locale: Locale = defaultLocale): OptionItem[] {
  return localizeItems(POOL_OPTIONS, locale);
}
