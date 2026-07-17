/**
 * Contenu cuisines Modulia — textes extraits des fiches, images sans texte.
 */

import { localizedKitchenImage } from "@/lib/localized-assets";
import { defaultLocale, type Locale } from "@/i18n/config";

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

/** Traductions PT/EN des fiches cuisine (FR = source ci-dessus) */
type KitchenOverlay = Partial<Omit<KitchenSection, "id" | "image" | "gallery">>;

export const KITCHEN_I18N: Record<string, Partial<Record<Locale, KitchenOverlay>>> = {
  base: {
    pt: {
      title: "Cozinha Modulia",
      tagline: "Compacta, elegante e totalmente equipada.",
      intro:
        "A Cozinha Modulia concentra o essencial num formato inteligente para lhe oferecer o máximo de conforto no dia a dia. Incluída em todos os módulos — sem custo adicional.",
      features: [
        { title: "Compacta", description: "Formato otimizado para todos os espaços" },
        { title: "Funcional", description: "Tudo o essencial à mão" },
        { title: "Instalação rápida", description: "Pronta a instalar, ligações simples" },
        { title: "Económica", description: "Equipamentos eficientes e de baixo consumo" },
        { title: "Durável", description: "Materiais robustos e fáceis de manter" },
      ],
      includes: [
        "Armário superior com arrumação",
        "Armário inferior com arrumação",
        "Lava-loiça inox com misturadora",
        "Placa vitrocerâmica",
        "Exaustor integrado",
        "Frigorífico encastrado",
        "Iluminação LED integrada",
      ],
      idealFor: ["Estúdios e arrendamento", "Tiny houses", "Módulos habitáveis", "Escritórios e extensões"],
      availableOptions: [
        "Micro-ondas integrado",
        "Placa de indução",
        "Máquina de lavar loiça compacta",
        "Cores personalizadas",
      ],
      footerHighlights: [
        "Design moderno e intemporal",
        "Qualidade premium e acabamentos cuidados",
        "Otimização do espaço",
        "Compatível com toda a gama Modulia",
      ],
    },
    en: {
      title: "Modulia Kitchen",
      tagline: "Compact, elegant and fully equipped.",
      intro:
        "The Modulia Kitchen packs the essentials into a smart format to give you maximum everyday comfort. Included in every module — no extra cost.",
      features: [
        { title: "Compact", description: "Optimised format for every space" },
        { title: "Functional", description: "Everything essential within reach" },
        { title: "Quick installation", description: "Ready to fit, simple connections" },
        { title: "Economical", description: "Efficient, low-consumption appliances" },
        { title: "Durable", description: "Sturdy, easy-to-maintain materials" },
      ],
      includes: [
        "Upper cabinet with storage",
        "Lower cabinet with storage",
        "Stainless steel sink with mixer tap",
        "Ceramic hob",
        "Integrated extractor hood",
        "Built-in fridge",
        "Integrated LED lighting",
      ],
      idealFor: ["Studios & rentals", "Tiny houses", "Habitable modules", "Offices & extensions"],
      availableOptions: [
        "Built-in microwave",
        "Induction hob",
        "Compact dishwasher",
        "Custom colours",
      ],
      footerHighlights: [
        "Modern, timeless design",
        "Premium quality & careful finishes",
        "Space optimisation",
        "Compatible with the entire Modulia range",
      ],
    },
  },
  "cuisine-premium": {
    pt: {
      title: "Opção Premium",
      tagline: "Forno, micro-ondas, garrafeira e arrumação",
      intro:
        "Módulo complementar topo de gama para completar a sua cozinha base com forno, micro-ondas, garrafeira e gavetas de arrumação.",
      priceLabel: "1 299 € c/IVA",
      includes: ["Forno encastrável", "Micro-ondas integrado", "Garrafeira", "Gavetas de arrumação"],
      highlights: [
        "Modular",
        "Design moderno",
        "Pronto a instalar",
        "Garantia 2 anos estrutura, 5 anos estanquicidade",
      ],
    },
    en: {
      title: "Premium Option",
      tagline: "Oven, microwave, wine cooler & storage",
      intro:
        "High-end complementary module to enhance your base kitchen with an oven, microwave, wine cooler and storage drawers.",
      priceLabel: "€1,299 incl. VAT",
      includes: ["Built-in oven", "Integrated microwave", "Wine cooler", "Storage drawers"],
      highlights: [
        "Modular",
        "Modern design",
        "Ready to fit",
        "2-year structural warranty, 5-year watertightness",
      ],
    },
  },
  "cuisine-rangement": {
    pt: {
      title: "Opção Arrumação",
      tagline: "Frigorífico, congelador e arrumação",
      intro:
        "Módulo complementar com frigorífico, congelador e gavetas de arrumação para maximizar a capacidade de armazenamento.",
      priceLabel: "699 € c/IVA",
      includes: ["Frigorífico integrado", "Congelador", "Gavetas de arrumação"],
    },
    en: {
      title: "Storage Option",
      tagline: "Fridge, freezer & storage",
      intro:
        "Complementary module with fridge, freezer and storage drawers to maximise storage capacity.",
      priceLabel: "€699 incl. VAT",
      includes: ["Integrated fridge", "Freezer", "Storage drawers"],
    },
  },
  "cuisine-buanderie": {
    pt: {
      title: "Opção Lavandaria",
      tagline: "Forno, micro-ondas e máquina de lavar",
      intro:
        "Módulo complementar que combina forno, micro-ondas e máquina de lavar — ideal para espaços onde a lavandaria deve permanecer discreta.",
      priceLabel: "1 199 € c/IVA",
      includes: [
        "Forno encastrável",
        "Micro-ondas integrado",
        "Máquina de lavar roupa",
        "Gavetas de arrumação",
      ],
    },
    en: {
      title: "Laundry Option",
      tagline: "Oven, microwave & washing machine",
      intro:
        "Complementary module combining an oven, microwave and washing machine — ideal for spaces where the laundry area needs to stay discreet.",
      priceLabel: "€1,199 incl. VAT",
      includes: ["Built-in oven", "Integrated microwave", "Washing machine", "Storage drawers"],
    },
  },
  "cuisine-contemporaine": {
    pt: {
      title: "Cozinha contemporânea",
      tagline: "Design depurado e linhas modernas",
      intro:
        "Cozinha contemporânea à medida — acabamentos elegantes, materiais premium e integração harmoniosa no seu módulo Modulia.",
      priceLabel: "250 € c/IVA / metro linear",
      features: [
        { title: "Design moderno", description: "Acabamentos elegantes e harmoniosos" },
        { title: "À medida", description: "Adaptada ao comprimento do seu espaço" },
        { title: "Integração perfeita", description: "Compatível com todos os módulos Modulia" },
      ],
    },
    en: {
      title: "Contemporary kitchen",
      tagline: "Clean design and modern lines",
      intro:
        "Bespoke contemporary kitchen — elegant finishes, premium materials and seamless integration into your Modulia module.",
      priceLabel: "€250 incl. VAT / linear metre",
      features: [
        { title: "Modern design", description: "Elegant, harmonious finishes" },
        { title: "Made to measure", description: "Adapted to your space's length" },
        { title: "Perfect integration", description: "Compatible with all Modulia modules" },
      ],
    },
  },
  "complement-cuisine": {
    pt: {
      title: "Traseira de cozinha",
      tagline: "Móvel para máquina de lavar loiça e máquina de lavar roupa",
      intro:
        "Otimize o seu espaço e ganhe conforto no dia a dia com a opção traseira de cozinha Modulia. Prática, discreta e totalmente integrada, reúne o essencial num design depurado.",
      priceLabel: "990 € c/IVA",
      features: [
        { title: "Ganho de espaço", description: "Tudo o essencial reunido num mínimo de espaço" },
        { title: "Prático", description: "Máquina de lavar loiça e máquina de lavar roupa à mão" },
        { title: "Integrado", description: "Design harmonioso e perfeitamente integrado no seu módulo" },
        { title: "Durável", description: "Materiais robustos e resistentes à humidade" },
        { title: "Funcional", description: "Ideal para módulos, estúdios e espaços otimizados" },
      ],
      includes: [
        "Armário inferior com bancada",
        "Espaço para máquina de lavar loiça (60 cm)",
        "Espaço para máquina de lavar roupa (60 cm)",
        "Estante e armário superior de arrumação",
        "Acabamento premium e resistente à humidade",
      ],
      idealFor: [
        "Estúdios e arrendamento",
        "Módulos habitáveis",
        "Escritórios e extensões",
        "Casas de jardim",
        "Residências secundárias",
        "Espaços de bem-estar",
      ],
      footerHighlights: [
        "Conforto no dia a dia",
        "Materiais duráveis",
        "Instalação rápida",
        "Qualidade premium",
      ],
    },
    en: {
      title: "Back kitchen",
      tagline: "Dishwasher and washing machine unit",
      intro:
        "Optimise your space and gain everyday comfort with the Modulia back kitchen option. Practical, discreet and fully integrated, it brings the essentials together in a clean design.",
      priceLabel: "€990 incl. VAT",
      features: [
        { title: "Space-saving", description: "Everything essential in a minimal footprint" },
        { title: "Practical", description: "Dishwasher and washing machine within reach" },
        { title: "Integrated", description: "Harmonious design, perfectly built into your module" },
        { title: "Durable", description: "Sturdy, moisture-resistant materials" },
        { title: "Functional", description: "Ideal for modules, studios and optimised spaces" },
      ],
      includes: [
        "Lower cabinet with worktop",
        "Space for dishwasher (60 cm)",
        "Space for washing machine (60 cm)",
        "Shelf and upper storage cabinet",
        "Premium, moisture-resistant finish",
      ],
      idealFor: [
        "Studios & rentals",
        "Habitable modules",
        "Offices & extensions",
        "Garden houses",
        "Second homes",
        "Wellness spaces",
      ],
      footerHighlights: [
        "Everyday comfort",
        "Durable materials",
        "Quick installation",
        "Premium quality",
      ],
    },
  },
  "electro-base": {
    pt: {
      title: "Kit de eletrodomésticos",
      tagline: "Preto ou branco — incluído",
      intro:
        "Pack de aparelhos essenciais para equipar a sua cozinha — disponível em acabamento preto ou branco. Incluído na configuração.",
      includes: [
        "Forno — cozedura homogénea e eficiente",
        "Exaustor — extração eficaz e silenciosa",
        "Máquina de lavar loiça — grande capacidade, económica em água",
        "Micro-ondas — prático e rápido no dia a dia",
      ],
      highlights: ["Preto / Branco", "Materiais duráveis", "Economia de energia", "Design moderno"],
    },
    en: {
      title: "Appliance kit",
      tagline: "Black or white — included",
      intro:
        "Pack of essential appliances to equip your kitchen — available in black or white finish. Included in the configuration.",
      includes: [
        "Oven — even, high-performance cooking",
        "Extractor hood — quiet, efficient extraction",
        "Dishwasher — large capacity, water-efficient",
        "Microwave — practical and quick for everyday use",
      ],
      highlights: ["Black / White", "Durable materials", "Energy savings", "Modern design"],
    },
  },
  "electro-option": {
    pt: {
      title: "Kit de eletrodomésticos premium",
      tagline: "Funcional e eficiente",
      intro:
        "Pack completo de aparelhos encastráveis topo de gama para uma cozinha funcional desde o primeiro dia.",
      priceLabel: "990 € c/IVA",
      includes: [
        "Forno — cozedura homogénea e eficiente",
        "Exaustor — extração eficaz e silenciosa",
        "Máquina de lavar loiça — grande capacidade, económica em água",
        "Micro-ondas — prático e rápido no dia a dia",
      ],
      highlights: ["Materiais duráveis", "Economia de energia", "Instalação simples", "Design moderno"],
    },
    en: {
      title: "Premium appliance kit",
      tagline: "Functional & high-performance",
      intro:
        "Complete pack of high-end built-in appliances for a fully functional kitchen from day one.",
      priceLabel: "€990 incl. VAT",
      includes: [
        "Oven — even, high-performance cooking",
        "Extractor hood — quiet, efficient extraction",
        "Dishwasher — large capacity, water-efficient",
        "Microwave — practical and quick for everyday use",
      ],
      highlights: ["Durable materials", "Energy savings", "Simple installation", "Modern design"],
    },
  },
};

function kitchenImageFile(image: string): string {
  return image.startsWith("/cozinhas/") ? image.slice("/cozinhas/".length) : image;
}

function localizeKitchenSection(section: KitchenSection, locale: Locale): KitchenSection {
  const localizedImage = localizedKitchenImage(kitchenImageFile(section.image), locale);
  const localizedGallery = section.gallery?.map((file) =>
    localizedKitchenImage(kitchenImageFile(file), locale),
  );
  if (locale === defaultLocale) {
    return { ...section, image: localizedImage, gallery: localizedGallery ?? section.gallery };
  }
  const overlay = KITCHEN_I18N[section.id]?.[locale];
  return {
    ...section,
    ...overlay,
    image: localizedImage,
    gallery: localizedGallery ?? section.gallery,
  };
}

export function getLocalizedKitchenBase(locale: Locale = defaultLocale): KitchenSection {
  return localizeKitchenSection(KITCHEN_BASE_CONTENT, locale);
}

export function getLocalizedKitchenOptions(locale: Locale = defaultLocale): KitchenSection[] {
  return KITCHEN_OPTION_SECTIONS.map((section) => localizeKitchenSection(section, locale));
}

export function getLocalizedKitchenAppliances(locale: Locale = defaultLocale): KitchenSection[] {
  return KITCHEN_APPLIANCE_SECTIONS.map((section) => localizeKitchenSection(section, locale));
}

export function getLocalizedKitchenSection(
  id: string,
  locale: Locale = defaultLocale,
): KitchenSection | undefined {
  const section = getKitchenSection(id);
  return section ? localizeKitchenSection(section, locale) : undefined;
}
