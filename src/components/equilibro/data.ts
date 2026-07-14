/** Dados estáticos e tipos do configurador EQUILIBRO */

import { getModelAssets } from "@/lib/model-catalog";
import { CONFIGURATOR_PRICES } from "@/data/options-catalog";

const assets = getModelAssets("equilibro");

export const BASE_PRICE = 71_000;

/** Renders 3D officiels — dossier public/equilibro/ */
export const HERO_IMAGES = [
  { id: "vue-1", src: assets.hero1, alt: "EQUILIBRO — vue 3D paysage oliviers" },
  { id: "vue-2", src: assets.hero2, alt: "EQUILIBRO — vue 3D façade vitrée" },
] as const;

export const PLAN_IMAGE = assets.planImage;

/** Características técnicas oficiais — fiche EQUILIBRO */
export const TECHNICAL_SPECS = [
  { label: "Dimensions hors tout", value: "11,80 × 4,50 m" },
  { label: "Hauteur intérieure", value: "2,25 m" },
  { label: "Surface intérieure", value: "≈ 46 m²" },
  { label: "Capacité", value: "4 personnes" },
  { label: "Structure", value: "Acier galvanisé" },
  { label: "Isolation", value: "Haute performance" },
] as const;

export const KEY_FEATURES = [
  { title: "Longueur", value: "11,80 m" },
  { title: "Largeur", value: "4,50 m" },
  { title: "Terrasse", value: "Intégrée toute longueur" },
  { title: "Distribution", value: "2 chambres" },
  { title: "Pièces de vie", value: "Spacieuses et ouvertes" },
] as const;

export const VALUE_PROPS = [
  { title: "Design épuré", description: "Lignes modernes et intemporelles" },
  { title: "Confort optimal", description: "Espaces fonctionnels et bien pensés" },
  { title: "Matériaux durables", description: "Construction robuste et résistante" },
  { title: "Installation rapide", description: "Module prêt à l'emploi" },
  { title: "Respect environnement", description: "Matériaux écologiques et faible impact" },
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
  | "civil"
  | "raccordement"
  | "kit-exterieur"
  | "terrasse";

export type ClimateOption = "none" | "standard" | "solar";
export type TerraceOption = "none" | "compact" | "large";

export type EquipmentState = {
  solarWater: boolean;
  climate: ClimateOption;
  kitchen: boolean;
  kitchenMl: number;
  appliances: boolean;
  civil: boolean;
  raccordement: boolean;
  kitExterieur: boolean;
  terrace: TerraceOption;
};

export type EquipmentInfo = {
  id: EquipmentId;
  title: string;
  description: string;
  specs: string[];
  image?: string;
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
    image: "/opcoes/chauffe eau solaire.jpg",
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
    image: "/opcoes/climatisation.jpg",
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
    image: "/cozinhas/cozinha base.jpg",
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
    image: "/cozinhas/kit electromenager base.jpg",
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
    image: "/opcoes/terrassement.png",
    description:
      "Préparation complète du terrain : fondations, raccordements et terrassement pour une installation clé en main.",
    specs: [
      "Étude de sol et fondations adaptées",
      "Raccordements eau, électricité, assainissement",
      "Nivellement et préparation d'accès",
    ],
  },
  raccordement: {
    id: "raccordement",
    title: "Raccordement du module",
    image: "/opcoes/raccordement.png",
    description: "Raccordement eau, électricité et évacuation — installation conforme.",
    specs: ["Eau · Électricité · Écoulement", "Installation sécurisée", "2 000 € HT"],
  },
  "kit-exterieur": {
    id: "kit-exterieur",
    title: "Kit extérieur",
    image: "/opcoes/kit exterieur.png",
    description: "Appliques, prises IP44, robinet et tuyau — prêt à l'emploi.",
    specs: ["2 appliques murales", "2 prises étanches IP44", "Robinet 2 sorties + tuyau"],
  },
  terrasse: {
    id: "terrasse",
    title: "Terrasse bois composite",
    image: "/opcoes/terrasses.png",
    description: "Terrasse premium résistante aux intempéries.",
    specs: ["5,90 m · 7 000 € TTC", "11,80 m · 11 000 € TTC", "100 % recyclable"],
  },
};

/** Preços unitários dos equipamentos (€) — sync options-catalog */
export const PRICES = {
  solarWater: CONFIGURATOR_PRICES.solarWater,
  climateStandard: CONFIGURATOR_PRICES.climateStandard,
  climateSolar: CONFIGURATOR_PRICES.climateSolar,
  kitchenPerMl: CONFIGURATOR_PRICES.kitchenPerMl,
  appliances: CONFIGURATOR_PRICES.appliances,
  civil: CONFIGURATOR_PRICES.civil,
  raccordement: CONFIGURATOR_PRICES.raccordement,
  kitExterieur: CONFIGURATOR_PRICES.kitExterieur,
  terrasseCompact: CONFIGURATOR_PRICES.terrasseCompact,
  terrasseLarge: CONFIGURATOR_PRICES.terrasseLarge,
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
  if (equipment.raccordement) total += PRICES.raccordement;
  if (equipment.kitExterieur) total += PRICES.kitExterieur;
  if (equipment.terrace === "compact") total += PRICES.terrasseCompact;
  if (equipment.terrace === "large") total += PRICES.terrasseLarge;

  return total;
}
