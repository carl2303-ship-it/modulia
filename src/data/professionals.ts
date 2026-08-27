import type { ModelSpec } from "@/data/models";

export type ProfessionalGalleryImage = {
  src: string;
  label: string;
};

export type ProfessionalModel = {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  priceFrom: number;
  priceNote: string;
  priceTax?: "ht" | "ttc";
  heroImage: string;
  planImage: string;
  interiorImage?: string;
  bathroomImages?: string[];
  gallery?: ProfessionalGalleryImage[];
  productType?: "bureau" | "sanitaire";
  dimensions: string;
  height: string;
  workstations: string;
  specs: ModelSpec[];
  infrastructure: string[];
  useCases: string[];
  options: string[];
  benefits?: string[];
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
    slug: "bureau-6m",
    name: "BUREAU 5,90 M",
    subtitle: "Avec sanitaires intégrés",
    tagline: "Un espace complet, autonome et fonctionnel.",
    productType: "bureau",
    description:
      "Bureau modulaire autonome avec sanitaires intégrés (WC + lavabo). Solution idéale pour chantiers, événements et points de vente — confort, autonomie et efficacité en un seul module.",
    priceFrom: 15_225,
    priceNote: "Version autonome chantier / événement",
    priceTax: "ht",
    heroImage: "/escritorios/bureau-6m.png",
    planImage: "/escritorios/bureau plan 6m.jpg",
    interiorImage: "/escritorios/bureau-interior.png",
    bathroomImages: [
      "/escritorios/bureau-sdb-wc.png",
      "/escritorios/bureau-sdb-lavabo.png",
    ],
    dimensions: "5,90 × 2,25 m",
    height: "2,12 m",
    workstations: "3 postes de travail",
    specs: [
      { label: "Dimensions hors tout", value: "5,90 × 2,25 m" },
      { label: "Hauteur intérieure", value: "2,12 m" },
      ...SHARED_SPECS,
    ],
    infrastructure: SHARED_INFRASTRUCTURE,
    useCases: SHARED_USE_CASES,
    options: SHARED_OPTIONS,
  },
  {
    slug: "bureau-12m",
    name: "BUREAU 11,80 M",
    subtitle: "Avec sanitaires intégrés",
    tagline: "Un espace complet, autonome et fonctionnel.",
    productType: "bureau",
    description:
      "Version longue du bureau Modulia avec sanitaires intégrés. Six postes de travail, réseaux prêts à raccorder et finitions premium pour accueillir vos équipes sur chantier ou en événementiel.",
    priceFrom: 25_200,
    priceNote: "Version autonome chantier / événement",
    priceTax: "ht",
    heroImage: "/escritorios/bureau-12m.png",
    planImage: "/escritorios/bureau plan 12m.jpg",
    interiorImage: "/escritorios/bureau-interior.png",
    bathroomImages: [
      "/escritorios/bureau-sdb-wc.png",
      "/escritorios/bureau-sdb-lavabo.png",
    ],
    dimensions: "11,80 × 2,25 m",
    height: "2,12 m",
    workstations: "6 postes de travail",
    specs: [
      { label: "Dimensions hors tout", value: "11,80 × 2,25 m" },
      { label: "Hauteur intérieure", value: "2,12 m" },
      ...SHARED_SPECS,
    ],
    infrastructure: SHARED_INFRASTRUCTURE,
    useCases: SHARED_USE_CASES,
    options: SHARED_OPTIONS,
  },
  {
    slug: "sanitaires-modulaires",
    name: "SANITAIRES MODULAIRES",
    subtitle: "Hygiène, confort, durabilité",
    tagline: "Un espace propre, confortable et durable.",
    description:
      "Les sanitaires modulaires Modulia offrent une solution clé en main pour tous vos projets : plages, chantiers, événements, bases de vie ou espaces publics. Design moderne, matériaux résistants et installation rapide.",
    priceFrom: 21_000,
    priceNote: "100 % personnalisable — selon équipements, cabines et agencements",
    priceTax: "ht",
    productType: "sanitaire",
    heroImage: "/sanitaires/sanitaires-hero.png",
    planImage: "/sanitaires/sanitaires-plan.png",
    gallery: [
      { src: "/sanitaires/sanitaires-wc-douches.png", label: "WC — Douches" },
      { src: "/sanitaires/sanitaires-lavabos.png", label: "Lavabos" },
      { src: "/sanitaires/sanitaires-toilettes-femmes.png", label: "Toilettes femmes" },
    ],
    dimensions: "5,90 × 2,25 m",
    height: "2,55 m",
    workstations: "4 cabines + lavabos",
    specs: [
      { label: "Dimensions hors tout", value: "5,90 × 2,25 m" },
      { label: "Hauteur extérieure", value: "2,55 m" },
      { label: "Structure", value: "Acier galvanisé robuste" },
      { label: "Revêtement", value: "Extérieur haute résistance" },
      { label: "Toiture", value: "Monobloc" },
      { label: "Ventilation", value: "Intégrée" },
      { label: "Réseaux", value: "Eau, électricité, plomberie, évacuation" },
      { label: "Normes", value: "Conforme ERP / chantier" },
    ],
    infrastructure: [
      "4 cabines individuelles + zone lavabos centrale",
      "Réseaux eau, électricité, plomberie et évacuation",
      "Ventilation intégrée et sol antidérapant",
      "Module prêt à poser — raccordements sur site",
    ],
    useCases: [
      "Plages",
      "Chantiers",
      "Événements",
      "Bases de vie",
      "Espaces publics",
    ],
    options: [
      "100 % personnalisable",
      "Nombre de cabines",
      "Agencements sur mesure",
      "Signalétique & branding",
      "Finitions extérieures",
      "Climatisation / chauffage",
    ],
    benefits: [
      "Design moderne",
      "Hygiène optimale",
      "Installation rapide",
      "Résistant & durable",
      "Entretien facile",
    ],
  },
];

export const PROFESSIONAL_VALUE_PROPS = [
  { title: "Conception intelligente", description: "Modules pensés pour l'usage professionnel" },
  { title: "Matériaux durables", description: "Construction robuste et résistante" },
  { title: "Écologique", description: "Matériaux recyclables et faible impact" },
  { title: "Qualité premium", description: "Finitions haut de gamme" },
  { title: "Service personnalisé", description: "Accompagnement sur mesure" },
];
