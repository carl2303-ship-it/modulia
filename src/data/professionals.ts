import type { ModelSpec } from "@/data/models";

export type ProfessionalModel = {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  priceFrom: number;
  priceNote: string;
  heroImage: string;
  planImage: string;
  interiorImage?: string;
  bathroomImages?: string[];
  dimensions: string;
  height: string;
  workstations: string;
  specs: ModelSpec[];
  infrastructure: string[];
  useCases: string[];
  options: string[];
};

const SHARED_SPECS: ModelSpec[] = [
  { label: "Structure", value: "Acier galvanisé robuste" },
  { label: "Isolation", value: "Thermique et acoustique" },
  { label: "Façade", value: "Vitrage sécurisé" },
  { label: "Éclairage", value: "LED intégré" },
  { label: "Sol", value: "Renforcé, finition premium" },
  { label: "Sanitaires", value: "WC + lavabo intégrés" },
  { label: "Réseaux", value: "Eau, évacuation et électricité prêts à raccorder" },
  { label: "Normes", value: "Conforme aux standards en vigueur" },
];

const SHARED_USE_CASES = [
  "Chantiers",
  "Événements",
  "Bases de vie",
  "Salles de réunion",
  "Points de vente autonomes",
];

const SHARED_OPTIONS = [
  "Climatisation / chauffage",
  "Mobilier intégré",
  "Éclairage LED premium",
  "Terrasse extérieure",
  "Vitrage occultant",
  "Branding & signalétique",
];

const SHARED_INFRASTRUCTURE = [
  "Sanitaires intégrés — WC + lavabo complets",
  "Réseau eau & évacuation prêt à raccorder",
  "Branchement électrique prêt (16 A conseillé)",
  "Usage intérieur / extérieur polyvalent",
];

export const PROFESSIONAL_MODELS: ProfessionalModel[] = [
  {
    slug: "bureau-12m",
    name: "BUREAU 12M",
    subtitle: "Avec sanitaires intégrés",
    tagline: "Un espace complet, autonome et fonctionnel.",
    description:
      "Version longue du bureau Modulia avec sanitaires intégrés. Six postes de travail, réseaux prêts à raccorder et finitions premium pour accueillir vos équipes sur chantier ou en événementiel.",
    priceFrom: 24_000,
    priceNote: "Version autonome chantier / événement",
    heroImage: "/escritorios/bureau-12m.png",
    planImage: "/escritorios/bureau plan 12m.jpg",
    dimensions: "12,00 × 2,25 m",
    height: "2,25 m",
    workstations: "6 postes de travail",
    specs: [
      { label: "Dimensions hors tout", value: "12,00 × 2,25 m" },
      { label: "Hauteur intérieure", value: "2,25 m" },
      ...SHARED_SPECS,
    ],
    infrastructure: SHARED_INFRASTRUCTURE,
    useCases: SHARED_USE_CASES,
    options: SHARED_OPTIONS,
  },
  {
    slug: "bureau-6m",
    name: "BUREAU 6M",
    subtitle: "Avec sanitaires intégrés",
    tagline: "Un espace complet, autonome et fonctionnel.",
    description:
      "Bureau modulaire autonome avec sanitaires intégrés (WC + lavabo). Solution idéale pour chantiers, événements et points de vente — confort, autonomie et efficacité en un seul module.",
    priceFrom: 14_500,
    priceNote: "Version autonome chantier / événement",
    heroImage: "/escritorios/bureau-6m.png",
    planImage: "/escritorios/bureau plan 6m.jpg",
    interiorImage: "/escritorios/bureau-6m-interior.png",
    bathroomImages: [
      "/escritorios/bureau-6m-sdb-wide.png",
      "/escritorios/bureau-6m-sdb-vanity.png",
    ],
    dimensions: "6,00 × 2,25 m",
    height: "2,25 m",
    workstations: "3 postes de travail",
    specs: [
      { label: "Dimensions hors tout", value: "6,00 × 2,25 m" },
      { label: "Hauteur intérieure", value: "2,25 m" },
      ...SHARED_SPECS,
    ],
    infrastructure: SHARED_INFRASTRUCTURE,
    useCases: SHARED_USE_CASES,
    options: SHARED_OPTIONS,
  },
];

export const PROFESSIONAL_VALUE_PROPS = [
  { title: "Conception intelligente", description: "Modules pensés pour l'usage professionnel" },
  { title: "Matériaux durables", description: "Construction robuste et résistante" },
  { title: "Écologique", description: "Matériaux recyclables et faible impact" },
  { title: "Qualité premium", description: "Finitions haut de gamme" },
  { title: "Service personnalisé", description: "Accompagnement sur mesure" },
];
