/**
 * Catalogue des options Modulia — fichiers dans public/opcoes, cozinhas, piscina
 */

import { getOptionRich, type OptionRichContent } from "@/data/options-rich";

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
    subtitle: "Façade et lames de terrasse — personnalisation sans supplément",
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
        description: "Bois composite premium, résistant aux intempéries.",
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
    subtitle: "Terrasses et aménagements en supplément",
    items: [
      {
        id: "terrasses",
        title: "Terrasses",
        description: "Grande terrasse 11,80 m ou format compact 5,90 m.",
        image: op("terrasses.png"),
        priceLabel: "7 000 – 11 000 € TTC",
        highlights: ["11,80 m · 11 000 € TTC", "5,90 m · 7 000 € TTC"],
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
  {
    id: "outdoor",
    title: "Extérieur & jardin",
    items: [
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
];

export const KITCHEN_BASE = {
  title: "Cuisine Modulia",
  tagline: "Compacte, évolutive et intelligente.",
  description:
    "La cuisine Modulia s'intègre parfaitement dans tous nos modules. L'essentiel à portée de main, dans un design épuré et moderne.",
  image: cz("cozinha base.jpg"),
  included: true,
  dimensions: "122 × 66 × 200 cm",
  highlights: [
    "Incluse dans tous les modules",
    "Format compact et fonctionnel",
    "Installation rapide",
    "Matériaux durables",
  ],
  gallery: [
    cz("cozinha base 1.jpg"),
    cz("cozinha base 2.jpg"),
    cz("opcao cozinha contemporanea.jpg"),
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
    id: "complement-cuisine",
    title: "Complément cuisine",
    description: "Module complémentaire pour agrandir l'espace cuisine.",
    image: cz("opcao complemento cozinha.jpg"),
    priceType: "sur-devis",
  },
];

export const KITCHEN_APPLIANCES: OptionItem[] = [
  {
    id: "electro-base",
    title: "Kit électroménager base",
    description: "Pack d'appareils encastrables essentiels.",
    image: cz("kit electromenager base.jpg"),
    price: 990,
    priceType: "ttc",
  },
  {
    id: "electro-option",
    title: "Kit électroménager option",
    description: "Pack premium avec appareils haut de gamme.",
    image: cz("kit electromenager opcao.jpg"),
    priceType: "sur-devis",
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

export function formatOptionPrice(item: OptionItem): string {
  if (item.priceLabel) return item.priceLabel;
  if (item.priceType === "inclus") return "Inclus";
  if (item.price == null) return "Sur devis";
  const suffix = item.priceType === "ht" ? " € HT" : " € TTC";
  return new Intl.NumberFormat("fr-FR").format(item.price) + suffix;
}

function enrichOption(
  item: OptionItem,
  categoryId: string,
  categoryTitle: string,
): OptionItem {
  return {
    ...item,
    rich: getOptionRich(item.id),
    categoryId,
    categoryTitle,
  };
}

export function getAllCatalogOptions(): OptionItem[] {
  return [...FINITION_CATEGORIES, ...OPTION_CATEGORIES].flatMap((category) =>
    category.items.map((item) =>
      enrichOption(item, category.id, category.title),
    ),
  );
}

export function getOptionById(id: string): OptionItem | undefined {
  return getAllCatalogOptions().find((item) => item.id === id);
}

export function getOptionSlugs(): string[] {
  return getAllCatalogOptions().map((item) => item.id);
}
