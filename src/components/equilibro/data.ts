/** Dados estáticos e tipos do configurador EQUILIBRO */

export const BASE_PRICE = 71_000;

/** Imagens oficiais do modelo EQUILIBRO */
export const HERO_IMAGES = [
  { id: "vue-1", src: "/equilibro/hero-1.png", alt: "EQUILIBRO — vue 3D paysage oliviers" },
  { id: "vue-2", src: "/equilibro/hero-2.png", alt: "EQUILIBRO — vue 3D façade vitrée" },
  { id: "vue-3", src: "/equilibro/hero-3.png", alt: "EQUILIBRO — vue 3D perspective latérale" },
] as const;

export const PLAN_IMAGE = {
  src: "/equilibro/plan.png",
  alt: "Plan architectural EQUILIBRO-07 — 11,80 × 6,75 m",
};

export const FICHA_IMAGE = {
  src: "/equilibro/ficha-tecnica.png",
  alt: "Fiche technique Modèle EQUILIBRO",
};

/** Características técnicas oficiais */
export const TECHNICAL_SPECS = [
  { label: "Dimensions ext.", value: "11,80 × 4,50 m" },
  { label: "Hauteur int.", value: "2,25 m" },
  { label: "Surface int.", value: "~46 m²" },
  { label: "Capacité", value: "4 personnes" },
  { label: "Structure", value: "Acier galvanisé" },
  { label: "Isolation", value: "Haute performance" },
] as const;

export const VALUE_PROPS = [
  "Design Épuré",
  "Confort Optimal",
  "Matériaux Durables",
  "Installation Rapide",
  "Respect Environnement",
] as const;

export type ExteriorFinish = {
  id: string;
  name: string;
  color: string;
  /** Opacidade do overlay CSS sobre a imagem da casa */
  overlayOpacity: number;
};

export type InteriorFinish = {
  id: string;
  name: string;
  texture: string;
};

export type EquipmentId =
  | "solar-water"
  | "climate"
  | "kitchen"
  | "appliances"
  | "civil";

export type ClimateOption = "none" | "standard" | "solar";

export type EquipmentState = {
  solarWater: boolean;
  climate: ClimateOption;
  kitchen: boolean;
  kitchenMl: number;
  appliances: boolean;
  civil: boolean;
};

export type EquipmentInfo = {
  id: EquipmentId;
  title: string;
  description: string;
  specs: string[];
};

/** Acabamentos exteriores à claire-voie */
export const EXTERIOR_FINISHES: ExteriorFinish[] = [
  { id: "pomelo", name: "Bois de pomelo", color: "#D4A574", overlayOpacity: 0.42 },
  { id: "cafe", name: "Café", color: "#6B4423", overlayOpacity: 0.48 },
  { id: "santal", name: "Bois de santal", color: "#C4A882", overlayOpacity: 0.4 },
  { id: "vert-encre", name: "Vert encre", color: "#1B4332", overlayOpacity: 0.52 },
  { id: "gris-bleute", name: "Gris bleuté", color: "#6B7B8C", overlayOpacity: 0.45 },
  { id: "noyer-noir", name: "Noyer noir", color: "#2C1810", overlayOpacity: 0.55 },
];

/** Plaquages bois intérieurs */
export const INTERIOR_FINISHES: InteriorFinish[] = [
  { id: "pin-blanc", name: "Pin blanc", texture: "linear-gradient(135deg, #F5F0E8 0%, #E8DFD0 100%)" },
  { id: "erable", name: "Érable", texture: "linear-gradient(135deg, #E8C9A0 0%, #D4A574 100%)" },
  { id: "frene-gris", name: "Frêne gris", texture: "linear-gradient(135deg, #B8B5AE 0%, #9A9690 100%)" },
  { id: "noyer-gris", name: "Noyer gris", texture: "linear-gradient(135deg, #5C4A3D 0%, #3D3229 100%)" },
];

/** Fichas técnicas para modais informativos */
export const EQUIPMENT_INFO: Record<EquipmentId, EquipmentInfo> = {
  "solar-water": {
    id: "solar-water",
    title: "Chauffe-eau Solaire",
    description:
      "Système thermodynamique haute performance pour eau chaude sanitaire, réduisant votre empreinte énergétique jusqu'à 70%.",
    specs: [
      "Capacité 200L · Certification Solar Keymark",
      "Panneaux intégrés au design de toiture",
      "Garantie constructeur 10 ans",
    ],
  },
  climate: {
    id: "climate",
    title: "Climatisation",
    description:
      "Confort thermique toute l'année avec des solutions adaptées à l'architecture modulaire EQUILIBRO.",
    specs: [
      "Standard: Pompe à chaleur réversible 3,5 kW",
      "Solaire: PAC couplée panneaux photovoltaïques",
      "Contrôle intelligent via application",
    ],
  },
  kitchen: {
    id: "kitchen",
    title: "Cuisine Contemporaine",
    description:
      "Aménagement sur mesure avec finitions premium, plan de travail en pierre reconstituée et éclairage LED intégré.",
    specs: [
      "Tarif au mètre linéaire (ML)",
      "Façades laquées ou bois massif",
      "Évier sous-plan et robinetterie design",
    ],
  },
  appliances: {
    id: "appliances",
    title: "Kit Électroménager",
    description:
      "Pack complet d'appareils encastrables haut de gamme pour une cuisine fonctionnelle dès l'emménagement.",
    specs: [
      "Four, plaque induction, hotte, lave-vaisselle",
      "Réfrigérateur combiné classe A+++",
      "Installation et mise en service incluses",
    ],
  },
  civil: {
    id: "civil",
    title: "Génie Civil / Terrassement",
    description:
      "Préparation complète du terrain : fondations, raccordements et terrassement pour une installation clé en main.",
    specs: [
      "Étude de sol et fondations adaptées",
      "Raccordements eau, électricité, assainissement",
      "Nivellement et préparation d'accès",
    ],
  },
};

/** Preços unitários dos equipamentos (€) */
export const PRICES = {
  solarWater: 875,
  climateStandard: 349,
  climateSolar: 1850,
  kitchenPerMl: 250,
  appliances: 990,
  civil: 3000,
} as const;

/** Calcula o preço total com base nas seleções do utilizador */
export function calculateTotalPrice(equipment: EquipmentState): number {
  let total = BASE_PRICE;

  if (equipment.solarWater) total += PRICES.solarWater;
  if (equipment.climate === "standard") total += PRICES.climateStandard;
  if (equipment.climate === "solar") total += PRICES.climateSolar;
  if (equipment.kitchen) total += PRICES.kitchenPerMl * equipment.kitchenMl;
  if (equipment.appliances) total += PRICES.appliances;
  if (equipment.civil) total += PRICES.civil;

  return total;
}
