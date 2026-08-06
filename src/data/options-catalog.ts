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
        title: "Sol PVC",
        description: "12 coloris disponibles — pose rapide et entretien facile.",
        image: op("parquet flottant.jpg"),
        priceType: "inclus",
        priceLabel: "Inclus dans le prix",
        includedChoice: true,
        highlights: ["Chêne, noyer, gris…", "Anti-humidité", "Entretien facile"],
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
        priceLabel: "6 300 – 9 900 € TTC",
        highlights: ["11,80 m · 9 900 € TTC", "5,90 m · 6 300 € TTC"],
      },
      {
        id: "kit-exterieur",
        title: "Kit extérieur",
        description: "Appliques, prises IP44, robinet 2 sorties, tuyau et arrosoir.",
        image: op("kit exterieur.png"),
        price: 380,
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
        price: 159,
        priceType: "ttc",
      },
      {
        id: "ventilation-hvac-sdb",
        title: "Ventilation VMC salle de bains",
        description: "Air sain, confort au quotidien — ventilation performante et ultra silencieuse.",
        image: op("ventilation hvac.png"),
        price: 190,
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
        price: 30,
        priceType: "ttc",
        priceLabel: "250 € + 30 € TTC / mètre linéaire",
      },
      {
        id: "poignee",
        title: "Poignée connectée",
        description: "Serrure intelligente pour sécurité et confort.",
        image: op("poignee connectee.png"),
        price: 240,
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
        image: op("chauffe eau solaire.png"),
        priceLabel: "870 – 1 375 € TTC",
        highlights: ["Ballon 100 L · 870 €", "Ballon 200 L · 1 375 €", "Énergie solaire"],
      },
      {
        id: "climatisation",
        title: "Climatisation",
        description: "Standard ou solaire — modules pré-équipés.",
        image: op("climatisation.jpg"),
        priceLabel: "460 – 1 850 €",
        highlights: ["Standard · 460 €", "Solaire · 1 850 €"],
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
    id: "cuisine-lave-vaisselle",
    title: "Lave-vaisselle",
    description: "Remplacement simple à la place du réfrigérateur.",
    image: cz("cozinha-lave-vaisselle.png"),
    price: 349,
    priceType: "ttc",
  },
  {
    id: "cuisine-premium",
    title: "Option Premium",
    description: "Four, micro-ondes, cave à vin + tiroirs de rangement.",
    image: cz("cozinha opcao premium.jpg"),
    price: 1719,
    priceType: "ttc",
  },
  {
    id: "cuisine-rangement",
    title: "Option Rangement",
    description: "Réfrigérateur, congélateur + tiroirs de rangement.",
    image: cz("cozinha opcao frigo-congelador.jpg"),
    price: 1119,
    priceType: "ttc",
  },
  {
    id: "cuisine-buanderie",
    title: "Option Buanderie",
    description: "Four, micro-ondes, lave-linge + tiroirs de rangement.",
    image: cz("cozinha opcao forno micro-ondas lava ropa.jpg"),
    price: 1599,
    priceType: "ttc",
  },
  {
    id: "complement-cuisine",
    title: "Arrière cuisine",
    description: "Lave-vaisselle et machine à laver — module complémentaire intégré.",
    image: cz("opcao complemento cozinha1.jpg"),
    price: 1490,
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
  tagline: "Transformez votre terrasse en espace de détente haut de gamme",
  description:
    "Découvrez la SOFA POOL, une mini-piscine au design contemporain qui allie élégance, confort et technologie.\n\nAvec son format compact de 2,90 m × 2,90 m et sa profondeur de 70 cm, elle s’intègre parfaitement sur une terrasse, un rooftop, dans un jardin ou au sein d’un projet immobilier premium.\n\nSon esthétique minimaliste avec banquettes intégrées crée un véritable espace lounge et bien-être.",
  closing:
    "Une solution élégante pour profiter des plaisirs de l’eau sans les contraintes d’une piscine traditionnelle.",
  priceFrom: 9450,
  dimensions: "2,90 × 2,90 m",
  capacity: "Profondeur 70 cm",
  heroImage: ps("piscina-rooftop.png"),
  planImage: ps("piscina-dimensoes.png"),
  gallery: [ps("piscina.jpg"), ps("piscina1.JPG"), ps("piscina2.jpg")],
  included: [
    "Dimensions : 2,90 × 2,90 m",
    "Profondeur : 70 cm",
    "Système de filtration à sable",
    "Traitement au sel pour un confort optimal",
    "Compatible avec chauffage pour une utilisation prolongée",
    "Design moderne et compact",
    "Idéale pour terrasse, rooftop, villa, hôtel ou résidence haut de gamme",
  ],
  highlights: [
    "Installation simplifiée",
    "Faible encombrement",
    "Entretien réduit",
    "Consommation maîtrisée",
    "Confort premium et look exclusif",
  ],
};

export const POOL_OPTIONS: OptionItem[] = [
  {
    id: "pool-sel",
    title: "Traitement au sel",
    description: "Électrolyse au sel pour une eau cristalline.",
    image: ps("piscina-traitement-sel.png"),
    price: 570,
    priceType: "ttc",
  },
  {
    id: "pool-chauffage",
    title: "Chauffage",
    description: "Pompe à chaleur pour profiter de la piscine toute l'année.",
    image: ps("piscina-chauffage.png"),
    price: 1480,
    priceType: "ttc",
  },
];

/** Prix configurateur EQUILIBRO — synchronisé avec le catalogue */
export const CONFIGURATOR_PRICES = {
  solarWater: 870,
  solarWater200L: 1375,
  climateStandard: 460,
  climateSolar: 1850,
  kitchenPerMl: 250,
  appliances: 990,
  civil: 3000,
  raccordement: 2000,
  terrasseCompact: 6300,
  terrasseLarge: 9900,
  kitExterieur: 380,
  rideauxMotor: 250,
  rideauxPerMl: 30,
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
    rich: getOptionRich(item.id, locale),
    categoryId,
    categoryTitle,
  };
  return locale === defaultLocale
    ? { ...base, image: localizeImagePath(base.image, locale) }
    : localizeOptionItem(base, locale);
}

function localizeItems(items: OptionItem[], locale: Locale): OptionItem[] {
  return items.map((item) =>
    localizeOptionItem({ ...item, rich: getOptionRich(item.id, locale) }, locale),
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

/** Fiche piscine SOFA POOL localisée (tagline/description/closing/capacity/included/highlights) — images inchangées */
export function getLocalizedPoolModel(locale: Locale = defaultLocale): typeof POOL_MODEL {
  if (locale === defaultLocale) return POOL_MODEL;
  const copy = POOL_COPY[locale];
  return {
    ...POOL_MODEL,
    tagline: copy?.tagline ?? POOL_MODEL.tagline,
    description: copy?.description ?? POOL_MODEL.description,
    closing: copy?.closing ?? POOL_MODEL.closing,
    capacity: copy?.capacity ?? POOL_MODEL.capacity,
    included: copy?.included ?? POOL_MODEL.included,
    highlights: copy?.highlights ?? POOL_MODEL.highlights,
  };
}

export function getLocalizedPoolOptions(locale: Locale = defaultLocale): OptionItem[] {
  return localizeItems(POOL_OPTIONS, locale);
}
