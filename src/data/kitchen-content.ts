/**
 * Contenu cuisines Modulia — textes extraits des fiches, images sans texte.
 */

export type KitchenFeature = {
  title: string;
  description: string;
};

export type KitchenSection = {
  id: string;
  title: string;
  tagline?: string;
  intro?: string;
  image: string;
  gallery?: string[];
  priceLabel?: string;
  included?: boolean;
  dimensions?: string;
  features?: KitchenFeature[];
  includes?: string[];
  idealFor?: string[];
  availableOptions?: string[];
  highlights?: string[];
  footerHighlights?: string[];
};

const cz = (file: string) => `/cozinhas/${file}`;

export const KITCHEN_BASE_CONTENT: KitchenSection = {
  id: "base",
  title: "Cuisine Modulia",
  tagline: "Compacte, élégante et parfaitement équipée.",
  intro:
    "La Cuisine Modulia concentre l'essentiel dans un format intelligent pour vous offrir un maximum de confort au quotidien. Incluse dans tous les modules — aucun supplément.",
  image: cz("cozinha base foto.jpg"),
  included: true,
  dimensions: "122 × 66 × 200 cm",
  features: [
    { title: "Compacte", description: "Format optimisé pour tous les espaces" },
    { title: "Fonctionnelle", description: "Tout l'essentiel à portée de main" },
    { title: "Installation rapide", description: "Prête à poser, raccordements simples" },
    { title: "Économique", description: "Équipements performants et basse consommation" },
    { title: "Durable", description: "Matériaux robustes et faciles à entretenir" },
  ],
  includes: [
    "Meuble haut avec rangements",
    "Meuble bas avec rangement",
    "Évier inox avec mitigeur",
    "Plaque de cuisson vitrocéramique",
    "Hotte intégrée",
    "Réfrigérateur encastré",
    "Éclairage LED intégré",
  ],
  idealFor: [
    "Studios & locations",
    "Tiny houses",
    "Modules habitables",
    "Bureaux & extensions",
  ],
  availableOptions: [
    "Micro-ondes intégré",
    "Plaque induction",
    "Lave-vaisselle compact",
    "Coloris personnalisés",
  ],
  footerHighlights: [
    "Design moderne & intemporel",
    "Qualité premium & finitions soignées",
    "Optimisation de l'espace",
    "Compatible avec toute la gamme Modulia",
  ],
};

export const KITCHEN_OPTION_SECTIONS: KitchenSection[] = [
  {
    id: "cuisine-premium",
    title: "Option Premium",
    tagline: "Four, micro-ondes, cave à vin & rangement",
    intro:
      "Module complémentaire haut de gamme pour compléter votre cuisine de base avec un four, un micro-ondes, une cave à vin et des tiroirs de rangement.",
    image: cz("cozinha opcao premium.jpg"),
    priceLabel: "1 299 € TTC",
    includes: [
      "Four encastrable",
      "Micro-ondes intégré",
      "Cave à vin",
      "Tiroirs de rangement",
    ],
    highlights: [
      "Modulable",
      "Design moderne",
      "Prêt à poser",
      "Garantie 2 ans structure, 5 ans étanchéité",
    ],
  },
  {
    id: "cuisine-rangement",
    title: "Option Rangement",
    tagline: "Réfrigérateur, congélateur & rangement",
    intro:
      "Module complémentaire avec réfrigérateur, congélateur et tiroirs de rangement pour maximiser la capacité de stockage.",
    image: cz("cozinha opcao frigo-congelador.jpg"),
    priceLabel: "699 € TTC",
    includes: [
      "Réfrigérateur intégré",
      "Congélateur",
      "Tiroirs de rangement",
    ],
  },
  {
    id: "cuisine-buanderie",
    title: "Option Buanderie",
    tagline: "Four, micro-ondes & lave-linge",
    intro:
      "Module complémentaire combinant four, micro-ondes et lave-linge — idéal pour les espaces où la buanderie doit rester discrète.",
    image: cz("cozinha opcao forno micro-ondas lava ropa.jpg"),
    priceLabel: "1 199 € TTC",
    includes: [
      "Four encastrable",
      "Micro-ondes intégré",
      "Lave-linge",
      "Tiroirs de rangement",
    ],
  },
  {
    id: "cuisine-contemporaine",
    title: "Cuisine contemporaine",
    tagline: "Design épuré et lignes modernes",
    intro:
      "Cuisine contemporaine sur mesure — finitions élégantes, matériaux premium et intégration harmonieuse dans votre module Modulia.",
    image: cz("cuisine contemporaine.png"),
    priceLabel: "250 € TTC / mètre linéaire",
    features: [
      { title: "Design moderne", description: "Finitions élégantes et harmonieuses" },
      { title: "Sur mesure", description: "Adaptée à la longueur de votre espace" },
      { title: "Intégration parfaite", description: "Compatible avec tous les modules Modulia" },
    ],
  },
  {
    id: "complement-cuisine",
    title: "Arrière cuisine",
    tagline: "Meuble lave-vaisselle et machine à laver",
    intro:
      "Optimisez votre espace et gagnez en confort au quotidien avec l'option arrière cuisine Modulia. Pratique, discrète et totalement intégrée, elle regroupe l'essentiel dans un design épuré.",
    image: cz("opcao complemento cozinha1.jpg"),
    priceLabel: "990 € TTC",
    features: [
      { title: "Gain de place", description: "Tout l'essentiel regroupé dans un minimum d'espace" },
      { title: "Pratique", description: "Lave-vaisselle et machine à laver à portée de main" },
      { title: "Intégré", description: "Design harmonieux et parfaitement intégré à votre module" },
      { title: "Durable", description: "Matériaux robustes et résistants à l'humidité" },
      { title: "Fonctionnel", description: "Idéal pour modules, studios et espaces optimisés" },
    ],
    includes: [
      "Meuble bas avec plan de travail",
      "Espace pour lave-vaisselle (60 cm)",
      "Espace pour machine à laver (60 cm)",
      "Étagère et meuble haut de rangement",
      "Finition premium et résistante à l'humidité",
    ],
    dimensions: "122 × 66 × 200 cm",
    idealFor: [
      "Studios & locations",
      "Modules habitables",
      "Bureaux & extensions",
      "Maisons de jardin",
      "Résidences secondaires",
      "Espaces bien-être",
    ],
    footerHighlights: [
      "Confort au quotidien",
      "Matériaux durables",
      "Installation rapide",
      "Qualité premium",
    ],
  },
];

export const KITCHEN_APPLIANCE_SECTIONS: KitchenSection[] = [
  {
    id: "electro-base",
    title: "Kit électroménager",
    tagline: "Noir ou blanc — inclus",
    intro:
      "Pack d'appareils essentiels pour équiper votre cuisine — disponible en finition noire ou blanche. Inclus dans la configuration.",
    image: cz("kit electromenager base.jpg"),
    included: true,
    includes: [
      "Four — cuisson homogène et performante",
      "Hotte — aspiration efficace et silencieuse",
      "Lave-vaisselle — grande capacité, économe en eau",
      "Micro-ondes — pratique et rapide au quotidien",
    ],
    highlights: [
      "Noir / Blanc",
      "Matériaux durables",
      "Économie d'énergie",
      "Design moderne",
    ],
  },
  {
    id: "electro-option",
    title: "Kit électroménager premium",
    tagline: "Fonctionnel & performant",
    intro:
      "Pack complet d'appareils encastrables haut de gamme pour une cuisine fonctionnelle dès l'emménagement.",
    image: cz("kit electromenager premium.png"),
    priceLabel: "990 € TTC",
    includes: [
      "Four — cuisson homogène et performante",
      "Hotte — aspiration efficace et silencieuse",
      "Lave-vaisselle — grande capacité, économe en eau",
      "Micro-ondes — pratique et rapide au quotidien",
    ],
    highlights: [
      "Matériaux durables",
      "Économie d'énergie",
      "Installation simple",
      "Design moderne",
    ],
  },
];

export function getKitchenSection(id: string): KitchenSection | undefined {
  if (id === "base") return KITCHEN_BASE_CONTENT;
  return (
    KITCHEN_OPTION_SECTIONS.find((s) => s.id === id) ??
    KITCHEN_APPLIANCE_SECTIONS.find((s) => s.id === id)
  );
}
