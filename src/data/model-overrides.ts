import type { ModelLayoutZone, ModelRichContent } from "@/data/models";
import type { ModelSlug } from "@/lib/model-catalog";

export type ModelOverride = {
  name: string;
  tagline: string;
  description: string;
  introSubline?: string;
  priceFrom: number;
  length: string;
  width: string;
  area: string;
  capacity: string;
  rooms: string;
  distribution: string;
  terrace?: string;
  featured?: boolean;
  closingTagline?: string;
  layoutZones?: ModelLayoutZone[];
  planInternalMeasures?: string[];
};

export const STANDARD_HIGHLIGHTS = [
  "Design épuré — lignes modernes et intemporelles",
  "Confort optimal — espaces fonctionnels et bien pensés",
  "Matériaux durables — construction robuste et résistante",
  "Installation rapide — module prêt à l'emploi",
  "Respect environnement — matériaux écologiques et faible impact",
];

export const STANDARD_VALUE_PROPS: NonNullable<ModelRichContent["valueProps"]> = [
  { title: "Design épuré", description: "Lignes modernes et intemporelles" },
  { title: "Confort optimal", description: "Espaces fonctionnels et bien pensés" },
  { title: "Matériaux durables", description: "Construction robuste et résistante" },
  { title: "Installation rapide", description: "Module prêt à l'emploi" },
  { title: "Respect environnement", description: "Matériaux écologiques et faible impact" },
];

/** Dados extraídos das fichas técnicas em public/[modelo]/ */
export const MODEL_OVERRIDES: Record<ModelSlug, ModelOverride> = {
  equilibro: {
    name: "EQUILIBRO",
    tagline: "L'équilibre parfait entre espace, lumière et fonctionnalité.",
    description:
      "Architecture capsule aux lignes épurées et coins arrondis. Façade entièrement vitrée sur toute la longueur, terrasse bois intégrée et intérieur ouvert sur la nature — cuisine contemporaine, salle à manger, salon et deux chambres dans un module prêt à vivre.",
    introSubline: "Conçu pour une vie harmonieuse au quotidien.",
    priceFrom: 71_000,
    length: "11,80 m",
    width: "4,50 m",
    area: "≈ 46 m²",
    capacity: "4 personnes",
    rooms: "2 chambres",
    distribution: "2 chambres",
    terrace: "Intégrée toute longueur",
    closingTagline: "L'équilibre parfait pour une vie harmonieuse.",
    planInternalMeasures: [
      "Largeur intérieure ≈ 4,38 m",
      "Profondeur terrasse ≈ 2,25 m sur toute la longueur",
    ],
    layoutZones: [
      {
        zone: "Chambres (gauche)",
        detail:
          "Deux chambres indépendantes en miroir, chacune adaptée à un lit 160 × 200 cm.",
      },
      {
        zone: "Cœur technique (centre)",
        detail:
          "Bloc sanitaire central avec WC, douche, double vasque et couloir de distribution.",
      },
      {
        zone: "Cuisine & salle à manger",
        detail:
          "Plan de travail linéaire avec plaque 4 feux et évier, ouvert sur une grande table à manger.",
      },
      {
        zone: "Salon & terrasse",
        detail:
          "Espace lounge ouvrant sur la terrasse bois sur toute la longueur de 11,80 m.",
      },
    ],
  },
  espacao: {
    name: "ESPAÇAO",
    tagline: "De l'espace pour vivre pleinement chaque moment.",
    description:
      "Grand module familial avec terrasse intégrée sur toute la longueur. Quatre chambres, pièces de vie spacieuses et ouvertes — l'équilibre parfait entre design, confort et liberté pour accueillir jusqu'à 8 personnes.",
    introSubline: "L'équilibre parfait entre design, confort et liberté.",
    priceFrom: 95_000,
    length: "11,80 m",
    width: "9,00 m",
    area: "≈ 82 m²",
    capacity: "6 à 8 personnes",
    rooms: "4 chambres",
    distribution: "4 chambres",
    terrace: "Intégrée toute longueur",
    closingTagline: "De l'espace pour vivre pleinement, chaque jour.",
  },
  essencia: {
    name: "ESSENCIA",
    tagline: "L'essentiel du confort, dans un design épuré et moderne.",
    description:
      "Module compact aux lignes arrondies, idéal pour un studio de jardin ou une résidence secondaire. Cuisine, salle de bains et espace de vie ouvert sur une terrasse bois.",
    priceFrom: 19_000,
    length: "5,90 m",
    width: "4,50 m",
    area: "13,27 m²",
    capacity: "2 personnes",
    rooms: "Studio",
    distribution: "Espace ouvert",
    terrace: "Terrasse bois",
    closingTagline: "L'essentiel du confort, au quotidien.",
  },
  forma: {
    name: "FORMA",
    tagline: "L'essentiel du confort, dans un design épuré et moderne.",
    description:
      "Capsule modulaire avec cadre blanc arrondi et lames horizontales pour l'intimité. Deux couchages, salle de bains centrale et espace de vie convivial avec terrasse.",
    priceFrom: 30_000,
    length: "5,90 m",
    width: "4,50 m",
    area: "13,27 m²",
    capacity: "2 à 4 personnes",
    rooms: "2 couchages",
    distribution: "Espace modulable",
    terrace: "Terrasse bois",
    closingTagline: "La forme au service du confort.",
  },
  horizonte: {
    name: "HORIZONTE",
    tagline: "L'horizon comme inspiration.",
    description:
      "Design ouvert pour des espaces lumineux et fonctionnels. Trois chambres, terrasse intégrée sur toute la longueur et grandes baies vitrées pour une connexion totale avec l'extérieur.",
    introSubline: "Un design ouvert pour des espaces lumineux et fonctionnels.",
    priceFrom: 74_000,
    length: "11,80 m",
    width: "4,50 m",
    area: "≈ 53 m²",
    capacity: "4 à 6 personnes",
    rooms: "3 chambres",
    distribution: "3 chambres",
    terrace: "Intégrée toute longueur",
    closingTagline: "L'horizon comme inspiration, le confort comme évidence.",
  },
  ideal: {
    name: "IDÉAL",
    tagline: "Le choix idéal pour une vie lumineuse, pratique et harmonieuse.",
    description:
      "Module panoramique avec murs en gabion aux extrémités et façade entièrement vitrée. Trois chambres et pièces de vie spacieuses pour une vie au quotidien en pleine lumière.",
    priceFrom: 73_000,
    length: "11,80 m",
    width: "4,50 m",
    area: "≈ 52 m²",
    capacity: "4 à 6 personnes",
    rooms: "3 chambres",
    distribution: "3 chambres",
    terrace: "Intégrée toute longueur",
    closingTagline: "Le choix idéal pour une vie harmonieuse.",
  },
  linha: {
    name: "LINHA",
    tagline: "L'élégance panoramique, dans un design épuré et contemporain.",
    description:
      "Format linéaire étroit (2,25 m) avec façade vitrée pleine longueur. Chambre, salle de bains et espace de vie ouvert — l'élégance en format panoramique.",
    priceFrom: 40_000,
    length: "11,80 m",
    width: "2,25 m",
    area: "≈ 26 m²",
    capacity: "2 à 4 personnes",
    rooms: "1 chambre",
    distribution: "1 chambre",
    terrace: "Intégrée toute longueur",
    closingTagline: "L'élégance en format panoramique.",
  },
  luz: {
    name: "LUZ",
    tagline: "La lumière au cœur de l'espace.",
    description:
      "Architecture ouverte et élégante avec murs en gabion et baies vitrées sur toute la longueur. Deux chambres aux extrémités et espace central optimisé pour la vie à quatre.",
    introSubline: "Une architecture ouverte et élégante.",
    priceFrom: 42_000,
    length: "11,80 m",
    width: "2,25 m",
    area: "≈ 28 m²",
    capacity: "4 personnes",
    rooms: "2 chambres",
    distribution: "2 chambres",
    terrace: "Intégrée toute longueur",
    closingTagline: "La lumière comme signature architecturale.",
  },
  materia: {
    name: "MATÉRIA",
    tagline: "L'architecture intelligente au service de l'essentiel.",
    description:
      "Module aux lignes pures avec lames verticales et façade vitrée. Trois chambres, terrasse intégrée et pièces de vie généreuses pour un confort durable et harmonieux.",
    introSubline: "Pour un confort durable et harmonieux.",
    priceFrom: 72_000,
    length: "11,80 m",
    width: "4,50 m",
    area: "≈ 47 m²",
    capacity: "4 à 6 personnes",
    rooms: "3 chambres",
    distribution: "3 chambres",
    terrace: "Intégrée toute longueur",
    closingTagline: "L'architecture intelligente au service de l'essentiel.",
  },
  origem: {
    name: "ORIGEM",
    tagline: "L'origine d'un art de vivre contemporain.",
    description:
      "Grand module familial de 80 m² avec quatre chambres et terrasse intégrée. Espace pensé pour l'essentiel, où confort, fonctionnalité et design ne font qu'un.",
    priceFrom: 97_000,
    length: "11,80 m",
    width: "6,75 m",
    area: "≈ 80 m²",
    capacity: "4 à 8 personnes",
    rooms: "4 chambres",
    distribution: "4 chambres",
    terrace: "Intégrée toute longueur",
    closingTagline: "L'origine d'un art de vivre contemporain.",
  },
  plano: {
    name: "PLANO",
    tagline: "L'espace à l'état pur.",
    description:
      "Module linéaire aux coins arrondis et façade entièrement vitrée. Deux chambres aux extrémités, pièces de vie centrales ouvertes et terrasse bois sur toute la longueur.",
    introSubline: "Pour une vie fluide, lumineuse et fonctionnelle.",
    priceFrom: 70_000,
    length: "11,80 m",
    width: "4,50 m",
    area: "≈ 45 m²",
    capacity: "4 personnes",
    rooms: "2 chambres",
    distribution: "2 chambres",
    terrace: "Intégrée toute longueur",
    closingTagline: "L'espace à l'état pur.",
  },
  ritmo: {
    name: "RITMO",
    tagline: "L'essentiel du confort, dans un design épuré et moderne.",
    description:
      "Capsule compacte avec écran de lames verticales et terrasse bois. Chambre, salle de bains, coin cuisine et salon dans un format optimisé pour 2 à 4 personnes.",
    priceFrom: 32_000,
    length: "5,90 m",
    width: "4,50 m",
    area: "13,27 m²",
    capacity: "2 à 4 personnes",
    rooms: "1 chambre",
    distribution: "Espace ouvert",
    terrace: "Terrasse bois",
    closingTagline: "Le rythme du confort au quotidien.",
  },
  superficie: {
    name: "SUPERFICIE",
    tagline: "La superficie au service du confort.",
    description:
      "Notre modèle le plus spacieux — 90 m² intérieurs, trois chambres, double salle de bains et séjour-cuisine de 42,50 m². Terrasses avant et arrière pour un art de vivre sans compromis.",
    introSubline: "Prix clé en main — qualité, durabilité et vie sans compromis.",
    priceFrom: 130_000,
    length: "11,80 m",
    width: "9,00 m",
    area: "≈ 90 m²",
    capacity: "4 à 8 personnes",
    rooms: "3 chambres",
    distribution: "3 chambres",
    terrace: "17,90 m²",
    closingTagline: "La superficie au service du confort.",
    planInternalMeasures: [
      "CH 1 : 12,00 m² · CH 2 : 10,20 m² · CH 3 : 10,20 m²",
      "Séjour / Cuisine : 42,50 m²",
      "Terrasse avant : 11,80 × 4,50 m",
    ],
  },
  volume: {
    name: "VOLUME",
    tagline: "L'architecture dans sa forme la plus pure.",
    description:
      "Module linéaire avec murs en gabion et façade vitrée pleine longueur. Une chambre, salle de bains avec baignoire et espace de vie ouvert — l'espace à l'état pur.",
    introSubline: "Un espace de vie ouvert, lumineux et parfaitement équilibré.",
    priceFrom: 69_000,
    length: "11,80 m",
    width: "4,50 m",
    area: "≈ 44 m²",
    capacity: "2 personnes",
    rooms: "1 chambre",
    distribution: "1 chambre",
    terrace: "Intégrée toute longueur",
    closingTagline: "L'espace à l'état pur.",
  },
};
