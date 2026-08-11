import type { Locale } from "@/i18n/config";

export type CatalogCopy = {
  title: string;
  description?: string;
  priceLabel?: string;
  categoryTitle?: string;
};

/** Traductions PT/EN des fiches options (FR = source dans options-catalog) */
export const OPTION_COPY: Record<string, Partial<Record<Locale, CatalogCopy>>> = {
  "decor-exterior": {
    pt: {
      title: "Decoração exterior em ripado",
      description: "Estética, durável e sem manutenção — 6 cores premium + 8 standard.",
      priceLabel: "Incluído no preço",
    },
    en: {
      title: "Exterior slatted cladding",
      description: "Aesthetic, durable and maintenance-free — 6 premium + 8 standard colours.",
      priceLabel: "Included in the price",
    },
  },
  "lames-terrasse": {
    pt: {
      title: "Lâminas de terraço",
      description: "Escolha de cores para o terraço incluído em cada modelo — madeira compósita premium.",
      priceLabel: "Incluído no preço",
    },
    en: {
      title: "Deck boards",
      description: "Colour choice for the terrace included with every model — premium composite wood.",
      priceLabel: "Included in the price",
    },
  },
  "murs-decoratifs": {
    pt: {
      title: "Revestimentos murais decorativos",
      description: "Cores e acabamentos decorativos de alta gama.",
      priceLabel: "Incluído no preço",
    },
    en: {
      title: "Decorative wall coverings",
      description: "Premium decorative colours and finishes.",
      priceLabel: "Included in the price",
    },
  },
  parquet: {
    pt: {
      title: "Piso PVC",
      description: "12 cores disponíveis — instalação rápida e manutenção fácil.",
      priceLabel: "Incluído no preço",
    },
    en: {
      title: "PVC flooring",
      description: "12 colours available — quick installation and easy upkeep.",
      priceLabel: "Included in the price",
    },
  },
  "sdb-couleurs": {
    pt: {
      title: "Revestimentos murais — casa de banho",
      description: "Acabamentos impermeáveis para o seu espaço sanitário.",
      priceLabel: "Incluído no preço",
    },
    en: {
      title: "Wall coverings — bathroom",
      description: "Waterproof finishes for your bathroom space.",
      priceLabel: "Included in the price",
    },
  },
  terrasses: {
    pt: {
      title: "Terraços",
      description: "Terraço adicional além do incluído — grande 11,80 m ou compacto 5,90 m.",
      priceLabel: "6 300 – 9 900 € IVA incl.",
    },
    en: {
      title: "Terraces",
      description: "Extra terrace beyond the included one — large 11.80 m or compact 5.90 m.",
      priceLabel: "€6,300 – €9,900 incl. VAT",
    },
  },
  "kit-exterieur": {
    pt: {
      title: "Kit exterior",
      description: "Apliques, tomadas IP44, torneira 2 saídas, mangueira e regador.",
    },
    en: {
      title: "Outdoor kit",
      description: "Wall lights, IP44 sockets, dual-outlet tap, hose and watering can.",
    },
  },
  "kit-sdb": {
    pt: {
      title: "Kit casa de banho",
      description: "Acessórios design preto mate — toalheiro, saboneteira, etc.",
    },
    en: {
      title: "Bathroom kit",
      description: "Matte black design accessories — towel rail, soap dish, etc.",
    },
  },
  "ventilation-hvac-sdb": {
    pt: {
      title: "Ventilação AVAC casa de banho",
      description: "Ar saudável, conforto diário — ventilação de alto desempenho e ultra-silenciosa.",
    },
    en: {
      title: "Bathroom HVAC ventilation",
      description: "Healthy air, daily comfort — high-performance, ultra-quiet ventilation.",
    },
  },
  "vmc-sdb": {
    pt: {
      title: "Ventilação mecânica casa de banho",
      description: "Opção de ventilação para conforto e higiene.",
    },
    en: {
      title: "Bathroom mechanical ventilation",
      description: "Ventilation option for comfort and hygiene.",
    },
  },
  rideaux: {
    pt: {
      title: "Cortinas blackout",
      description: "Cortinas à medida para as suas janelas — vendidas ao metro linear.",
      priceLabel: "250 € + 30 € IVA incl. / metro linear",
    },
    en: {
      title: "Blackout curtains",
      description: "Bespoke curtains for your glazed openings — sold per linear metre.",
      priceLabel: "€250 + €30 incl. VAT / linear metre",
    },
  },
  poignee: {
    pt: {
      title: "Puxador conectado",
      description: "Fechadura inteligente para segurança e conforto.",
    },
    en: {
      title: "Smart handle",
      description: "Smart lock for security and comfort.",
    },
  },
  "chauffe-eau-solaire": {
    pt: {
      title: "Esquentador solar",
      description: "Em substituição do elétrico — energia renovável.",
      priceLabel: "870 – 1 375 € c/IVA",
    },
    en: {
      title: "Solar water heater",
      description: "Replaces the electric heater — renewable energy.",
      priceLabel: "€870 – €1,375 incl. VAT",
    },
  },
  climatisation: {
    pt: {
      title: "Climatização",
      description: "Standard ou solar — módulos pré-equipados.",
      priceLabel: "460 € – 1 850 €",
    },
    en: {
      title: "Air conditioning",
      description: "Standard or solar — pre-equipped modules.",
      priceLabel: "€460 – €1,850",
    },
  },
  "genie-civil": {
    pt: {
      title: "Engenharia civil / Terraplanagem",
      description: "Preparação dos pilares no seu terreno.",
    },
    en: {
      title: "Civil works / Groundworks",
      description: "Preparation of piles on your plot.",
    },
  },
  raccordement: {
    pt: {
      title: "Ligação do módulo",
      description: "Água, eletricidade e esgoto — instalação conforme.",
    },
    en: {
      title: "Module connection",
      description: "Water, electricity and drainage — compliant installation.",
    },
  },
  transport: {
    pt: {
      title: "Transporte e grua",
      description: "Incluído num raio de 30 km.",
    },
    en: {
      title: "Transport & crane",
      description: "Included within a 30 km radius.",
    },
  },
  "cuisine-lave-vaisselle": {
    pt: {
      title: "Máquina de lavar loiça",
      description: "Substituição simples em lugar do frigorífico.",
    },
    en: {
      title: "Dishwasher",
      description: "Simple swap in place of the fridge.",
    },
  },
  "cuisine-premium": {
    pt: { title: "Opção Premium", description: "Forno, micro-ondas, garrafeira + gavetas." },
    en: { title: "Premium option", description: "Oven, microwave, wine cooler + drawers." },
  },
  "cuisine-rangement": {
    pt: { title: "Opção Arrumação", description: "Frigorífico, congelador + gavetas." },
    en: { title: "Storage option", description: "Fridge, freezer + drawers." },
  },
  "cuisine-buanderie": {
    pt: { title: "Opção Lavandaria", description: "Forno, micro-ondas, máquina de lavar + gavetas." },
    en: { title: "Laundry option", description: "Oven, microwave, washing machine + drawers." },
  },
  "complement-cuisine": {
    pt: {
      title: "Traseira de cozinha",
      description: "Máquina de lavar loiça e máquina de lavar — módulo complementar integrado.",
    },
    en: {
      title: "Back kitchen",
      description: "Dishwasher and washing machine — integrated complementary module.",
    },
  },
  "electro-base": {
    pt: { title: "Kit eletrodomésticos base", description: "Pack de aparelhos encastráveis essenciais — incluído." },
    en: { title: "Base appliance kit", description: "Essential built-in appliance pack — included." },
  },
  "electro-option": {
    pt: { title: "Kit eletrodomésticos premium", description: "Pack premium com aparelhos de alta gama." },
    en: { title: "Premium appliance kit", description: "Premium pack with high-end appliances." },
  },
  "pool-house": {
    pt: {
      title: "Pool House",
      description:
        "Módulo bar e cozinha de verão — alumínio termolacado, madeira composta e bancada em quartzo. 5,90 × 4,50 m, para 6 a 8 pessoas.",
    },
    en: {
      title: "Pool House",
      description:
        "Bar and summer kitchen module — powder-coated aluminium, composite wood and quartz worktop. 5.90 × 4.50 m, for 6 to 8 people.",
    },
  },
  "pool-sel": {
    pt: { title: "Tratamento a sal", description: "Eletrólise a sal para água cristalina." },
    en: { title: "Salt treatment", description: "Salt electrolysis for crystal-clear water." },
  },
  "pool-chauffage": {
    pt: { title: "Aquecimento", description: "Bomba de calor para usufruir da piscina todo o ano." },
    en: { title: "Heating", description: "Heat pump to enjoy the pool all year round." },
  },
};

export const CATEGORY_COPY: Record<string, Partial<Record<Locale, string>>> = {
  "exterior-inclus": {
    pt: "Exterior — escolha incluída",
    en: "Exterior — included choice",
  },
  "interior-inclus": {
    pt: "Interior — escolha incluída",
    en: "Interior — included choice",
  },
  exterior: { pt: "Opções exterior", en: "Outdoor options" },
  interior: { pt: "Opções interior", en: "Indoor options" },
  engineering: { pt: "Equipamentos e engenharia", en: "Equipment & engineering" },
};

/** Traductions des sous-titres de catégories (FR = source dans options-catalog) */
export const CATEGORY_SUBTITLE: Record<string, Partial<Record<Locale, string>>> = {
  "exterior-inclus": {
    pt: "Fachada e lâminas de terraço de origem — personalização sem custo adicional",
    en: "Original façade and deck boards — customisation at no extra cost",
  },
  "interior-inclus": {
    pt: "Paredes, pisos e casa de banho — incluídos no preço do modelo",
    en: "Walls, floors and bathroom — included in the model price",
  },
  exterior: {
    pt: "Terraços adicionais e arranjos de jardim",
    en: "Extra terraces and garden fittings",
  },
  interior: {
    pt: "Equipamentos e acessórios em suplemento",
    en: "Extra equipment and accessories",
  },
  engineering: {
    pt: "Conforto, energia e ligações",
    en: "Comfort, energy and connections",
  },
};

/** Fiche cuisine de base (résumé affiché sur les pages options/personnalisation) */
export const KITCHEN_BASE_COPY: Partial<
  Record<Locale, { title: string; tagline: string; description: string; highlights: string[] }>
> = {
  pt: {
    title: "Cozinha Modulia",
    tagline: "Compacta, elegante e totalmente equipada.",
    description:
      "A Cozinha Modulia concentra o essencial num formato inteligente para lhe oferecer o máximo de conforto no dia a dia.",
    highlights: [
      "Incluída em todos os módulos",
      "Formato compacto e funcional",
      "Instalação rápida",
      "Materiais duráveis",
    ],
  },
  en: {
    title: "Modulia Kitchen",
    tagline: "Compact, elegant and fully equipped.",
    description:
      "The Modulia Kitchen packs the essentials into a smart format to give you maximum everyday comfort.",
    highlights: [
      "Included in every module",
      "Compact, functional format",
      "Quick installation",
      "Durable materials",
    ],
  },
};

/** Fiche piscine SOFA POOL */
export const POOL_COPY: Partial<
  Record<
    Locale,
    {
      tagline: string;
      description: string;
      closing: string;
      capacity: string;
      included: string[];
      highlights: string[];
    }
  >
> = {
  pt: {
    tagline: "Transforme o seu terraço num espaço de relaxamento de topo",
    description:
      "Descubra a SOFA POOL, uma mini-piscina de design contemporâneo que alia elegância, conforto e tecnologia.\n\nCom o seu formato compacto de 2,90 m × 2,90 m e profundidade de 70 cm, integra-se perfeitamente num terraço, rooftop, jardim ou num projeto imobiliário premium.\n\nA estética minimalista com bancos integrados cria um verdadeiro espaço lounge e bem-estar.",
    closing:
      "Uma solução elegante para desfrutar dos prazeres da água sem as restrições de uma piscina tradicional.",
    capacity: "Profundidade 70 cm",
    included: [
      "Dimensões: 2,90 × 2,90 m",
      "Profundidade: 70 cm",
      "Sistema de filtração a areia",
      "Tratamento a sal para conforto ótimo",
      "Compatível com aquecimento para utilização prolongada",
      "Design moderno e compacto",
      "Ideal para terraço, rooftop, villa, hotel ou residência de topo",
    ],
    highlights: [
      "Instalação simplificada",
      "Pouco espaço ocupado",
      "Manutenção reduzida",
      "Consumo controlado",
      "Conforto premium e look exclusivo",
    ],
  },
  en: {
    tagline: "Turn your terrace into a high-end relaxation space",
    description:
      "Discover the SOFA POOL — a contemporary mini-pool that combines elegance, comfort and technology.\n\nWith its compact 2.90 m × 2.90 m footprint and 70 cm depth, it fits perfectly on a terrace, rooftop, garden or within a premium property project.\n\nIts minimalist aesthetic with integrated benches creates a true lounge and wellness space.",
    closing:
      "An elegant way to enjoy the pleasures of water without the constraints of a traditional pool.",
    capacity: "Depth 70 cm",
    included: [
      "Dimensions: 2.90 × 2.90 m",
      "Depth: 70 cm",
      "Sand filtration system",
      "Salt treatment for optimal comfort",
      "Compatible with heating for extended use",
      "Modern, compact design",
      "Ideal for terrace, rooftop, villa, hotel or high-end residence",
    ],
    highlights: [
      "Simplified installation",
      "Small footprint",
      "Low maintenance",
      "Controlled consumption",
      "Premium comfort and exclusive look",
    ],
  },
};

/** Libellés communs pour les prix (inclus / sur devis / suffixes TTC-HT) */
export const PRICE_LABELS: Record<
  Locale,
  {
    inclusLabel: string;
    inclusInPrice: string;
    surDevis: string;
    ttcSuffix: string;
    htSuffix: string;
  }
> = {
  fr: {
    inclusLabel: "Inclus",
    inclusInPrice: "Inclus dans le prix",
    surDevis: "Sur devis",
    ttcSuffix: "€ TTC",
    htSuffix: "€ HT",
  },
  pt: {
    inclusLabel: "Incluído",
    inclusInPrice: "Incluído no preço",
    surDevis: "Sob consulta",
    ttcSuffix: "€ IVA incl.",
    htSuffix: "€ +IVA",
  },
  en: {
    inclusLabel: "Included",
    inclusInPrice: "Included in the price",
    surDevis: "On request",
    ttcSuffix: "€ incl. VAT",
    htSuffix: "€ excl. VAT",
  },
};

/** Locale ICU utilisée pour le formatage des nombres/prix */
export const NUMBER_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  pt: "pt-PT",
  en: "en-GB",
};

export function resolveOptionCopy(
  id: string,
  locale: Locale,
  fallback: { title: string; description: string; priceLabel?: string },
): CatalogCopy {
  const entry = OPTION_COPY[id]?.[locale];
  if (!entry) return fallback;
  return {
    title: entry.title,
    description: entry.description ?? fallback.description,
    priceLabel: entry.priceLabel ?? fallback.priceLabel,
  };
}

export function resolveCategoryTitle(id: string, locale: Locale, fallback: string): string {
  return CATEGORY_COPY[id]?.[locale] ?? fallback;
}

export function resolveCategorySubtitle(
  id: string,
  locale: Locale,
  fallback?: string,
): string | undefined {
  return CATEGORY_SUBTITLE[id]?.[locale] ?? fallback;
}
