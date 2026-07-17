import type { ModelLayoutZone } from "@/data/models";
import type { ModelOverride } from "@/data/model-overrides";
import {
  MODEL_OVERRIDES,
  STANDARD_HIGHLIGHTS,
  STANDARD_VALUE_PROPS,
} from "@/data/model-overrides";
import { defaultLocale, type Locale } from "@/i18n/config";
import type { ModelSlug } from "@/lib/model-catalog";

type ModelCopy = Partial<
  Pick<
    ModelOverride,
    | "tagline"
    | "description"
    | "introSubline"
    | "capacity"
    | "rooms"
    | "distribution"
    | "terrace"
    | "closingTagline"
  >
> & {
  layoutZones?: ModelLayoutZone[];
  planInternalMeasures?: string[];
};

const MODEL_I18N: Record<ModelSlug, Partial<Record<"pt" | "en", ModelCopy>>> = {
  equilibro: {
    pt: {
      tagline: "O equilíbrio perfeito entre espaço, luz e funcionalidade.",
      description:
        "Arquitetura cápsula de linhas depuradas e cantos arredondados. Fachada totalmente envidraçada em toda a extensão, terraço de madeira integrado e interior aberto sobre a natureza — cozinha contemporânea, sala de jantar, sala de estar e dois quartos num módulo pronto a habitar.",
      introSubline: "Concebido para uma vida harmoniosa no dia a dia.",
      capacity: "4 pessoas",
      rooms: "2 quartos",
      distribution: "2 quartos",
      terrace: "Integrado em toda a extensão",
      closingTagline: "O equilíbrio perfeito para uma vida harmoniosa.",
      planInternalMeasures: [
        "Largura interior ≈ 4,38 m",
        "Profundidade do terraço ≈ 2,25 m em toda a extensão",
      ],
      layoutZones: [
        {
          zone: "Quartos (esquerda)",
          detail:
            "Dois quartos independentes em espelho, cada um adequado a uma cama 160 × 200 cm.",
        },
        {
          zone: "Núcleo técnico (centro)",
          detail:
            "Bloco sanitário central com WC, duche, lavatório duplo e corredor de distribuição.",
        },
        {
          zone: "Cozinha e sala de jantar",
          detail:
            "Bancada linear com placa de 4 fogões e lava-loiça, aberta sobre uma grande mesa de jantar.",
        },
        {
          zone: "Sala e terraço",
          detail:
            "Espaço lounge a abrir para o terraço de madeira em toda a extensão de 11,80 m.",
        },
      ],
    },
    en: {
      tagline: "The perfect balance of space, light and functionality.",
      description:
        "Capsule architecture with clean lines and rounded corners. Fully glazed façade along the entire length, integrated timber deck and an interior open to nature — contemporary kitchen, dining area, living room and two bedrooms in a ready-to-live module.",
      introSubline: "Designed for harmonious everyday living.",
      capacity: "4 people",
      rooms: "2 bedrooms",
      distribution: "2 bedrooms",
      terrace: "Integrated full length",
      closingTagline: "The perfect balance for harmonious living.",
      planInternalMeasures: [
        "Interior width ≈ 4.38 m",
        "Terrace depth ≈ 2.25 m along the full length",
      ],
      layoutZones: [
        {
          zone: "Bedrooms (left)",
          detail:
            "Two independent mirror bedrooms, each suited to a 160 × 200 cm bed.",
        },
        {
          zone: "Technical core (centre)",
          detail:
            "Central bathroom block with WC, shower, double basin and distribution corridor.",
        },
        {
          zone: "Kitchen & dining",
          detail:
            "Linear worktop with 4-burner hob and sink, opening onto a large dining table.",
        },
        {
          zone: "Living & terrace",
          detail:
            "Lounge space opening onto the timber terrace along the full 11.80 m length.",
        },
      ],
    },
  },
  espacao: {
    pt: {
      tagline: "Espaço para viver plenamente cada momento.",
      description:
        "Grande módulo familiar com terraço integrado em toda a extensão. Quatro quartos, espaços de estar amplos e abertos — o equilíbrio perfeito entre design, conforto e liberdade para acolher até 8 pessoas.",
      introSubline: "O equilíbrio perfeito entre design, conforto e liberdade.",
      capacity: "6 a 8 pessoas",
      rooms: "4 quartos",
      distribution: "4 quartos",
      terrace: "Integrado em toda a extensão",
      closingTagline: "Espaço para viver plenamente, todos os dias.",
    },
    en: {
      tagline: "Space to fully live every moment.",
      description:
        "Large family module with full-length integrated terrace. Four bedrooms, spacious open living areas — the perfect balance of design, comfort and freedom for up to 8 people.",
      introSubline: "The perfect balance of design, comfort and freedom.",
      capacity: "6 to 8 people",
      rooms: "4 bedrooms",
      distribution: "4 bedrooms",
      terrace: "Integrated full length",
      closingTagline: "Space to live fully, every day.",
    },
  },
  essencia: {
    pt: {
      tagline: "O essencial do conforto, num design depurado e moderno.",
      description:
        "Módulo compacto de linhas arredondadas, ideal como estúdio de jardim ou residência secundária. Cozinha, casa de banho e espaço de estar aberto sobre um terraço de madeira.",
      capacity: "2 pessoas",
      rooms: "Estúdio",
      distribution: "Espaço aberto",
      terrace: "Terraço de madeira",
      closingTagline: "O essencial do conforto, no dia a dia.",
    },
    en: {
      tagline: "Essential comfort in a clean, modern design.",
      description:
        "Compact module with rounded lines — ideal as a garden studio or secondary residence. Kitchen, bathroom and living space open onto a timber terrace.",
      capacity: "2 people",
      rooms: "Studio",
      distribution: "Open space",
      terrace: "Timber terrace",
      closingTagline: "Essential comfort, every day.",
    },
  },
  forma: {
    pt: {
      tagline: "O essencial do conforto, num design depurado e moderno.",
      description:
        "Cápsula modular com moldura branca arredondada e lâminas horizontais para privacidade. Duas camas, casa de banho central e espaço de estar convivente com terraço.",
      capacity: "2 a 4 pessoas",
      rooms: "2 camas",
      distribution: "Espaço modulável",
      terrace: "Terraço de madeira",
      closingTagline: "A forma ao serviço do conforto.",
    },
    en: {
      tagline: "Essential comfort in a clean, modern design.",
      description:
        "Modular capsule with rounded white frame and horizontal slats for privacy. Two sleeping spaces, central bathroom and a welcoming living area with terrace.",
      capacity: "2 to 4 people",
      rooms: "2 berths",
      distribution: "Flexible space",
      terrace: "Timber terrace",
      closingTagline: "Form in service of comfort.",
    },
  },
  horizonte: {
    pt: {
      tagline: "O horizonte como inspiração.",
      description:
        "Design aberto para espaços luminosos e funcionais. Três quartos, terraço integrado em toda a extensão e grandes envidraçados para uma ligação total ao exterior.",
      introSubline: "Um design aberto para espaços luminosos e funcionais.",
      capacity: "4 a 6 pessoas",
      rooms: "3 quartos",
      distribution: "3 quartos",
      terrace: "Integrado em toda a extensão",
      closingTagline: "O horizonte como inspiração, o conforto como evidência.",
    },
    en: {
      tagline: "The horizon as inspiration.",
      description:
        "Open design for bright, functional spaces. Three bedrooms, full-length integrated terrace and large glazed openings for a full connection outdoors.",
      introSubline: "An open design for bright, functional spaces.",
      capacity: "4 to 6 people",
      rooms: "3 bedrooms",
      distribution: "3 bedrooms",
      terrace: "Integrated full length",
      closingTagline: "The horizon as inspiration, comfort as a given.",
    },
  },
  ideal: {
    pt: {
      tagline: "A escolha ideal para uma vida luminosa, prática e harmoniosa.",
      description:
        "Módulo panorâmico com paredes em gabião nas extremidades e fachada totalmente envidraçada. Três quartos e espaços de estar amplos para o dia a dia em plena luz.",
      capacity: "4 a 6 pessoas",
      rooms: "3 quartos",
      distribution: "3 quartos",
      terrace: "Integrado em toda a extensão",
      closingTagline: "A escolha ideal para uma vida harmoniosa.",
    },
    en: {
      tagline: "The ideal choice for bright, practical and harmonious living.",
      description:
        "Panoramic module with gabion walls at the ends and a fully glazed façade. Three bedrooms and spacious living areas for everyday life in full light.",
      capacity: "4 to 6 people",
      rooms: "3 bedrooms",
      distribution: "3 bedrooms",
      terrace: "Integrated full length",
      closingTagline: "The ideal choice for harmonious living.",
    },
  },
  linha: {
    pt: {
      tagline: "A elegância panorâmica, num design depurado e contemporâneo.",
      description:
        "Formato linear estreito (2,25 m) com fachada envidraçada em toda a extensão. Quarto, casa de banho e espaço de estar aberto — elegância em formato panorâmico.",
      capacity: "2 a 4 pessoas",
      rooms: "1 quarto",
      distribution: "1 quarto",
      terrace: "Integrado em toda a extensão",
      closingTagline: "A elegância em formato panorâmico.",
    },
    en: {
      tagline: "Panoramic elegance in a clean, contemporary design.",
      description:
        "Narrow linear format (2.25 m) with full-length glazed façade. Bedroom, bathroom and open living space — elegance in panoramic form.",
      capacity: "2 to 4 people",
      rooms: "1 bedroom",
      distribution: "1 bedroom",
      terrace: "Integrated full length",
      closingTagline: "Elegance in panoramic form.",
    },
  },
  luz: {
    pt: {
      tagline: "A luz no coração do espaço.",
      description:
        "Arquitetura aberta e elegante com paredes em gabião e envidraçados em toda a extensão. Dois quartos nas extremidades e espaço central otimizado para viver a quatro.",
      introSubline: "Uma arquitetura aberta e elegante.",
      capacity: "4 pessoas",
      rooms: "2 quartos",
      distribution: "2 quartos",
      terrace: "Integrado em toda a extensão",
      closingTagline: "A luz como assinatura arquitetónica.",
    },
    en: {
      tagline: "Light at the heart of the space.",
      description:
        "Open, elegant architecture with gabion walls and full-length glazing. Two bedrooms at the ends and a central space optimised for four.",
      introSubline: "Open, elegant architecture.",
      capacity: "4 people",
      rooms: "2 bedrooms",
      distribution: "2 bedrooms",
      terrace: "Integrated full length",
      closingTagline: "Light as an architectural signature.",
    },
  },
  materia: {
    pt: {
      tagline: "Arquitetura inteligente ao serviço do essencial.",
      description:
        "Módulo de linhas puras com lâminas verticais e fachada envidraçada. Três quartos, terraço integrado e espaços de estar generosos para um conforto duradouro e harmonioso.",
      introSubline: "Para um conforto duradouro e harmonioso.",
      capacity: "4 a 6 pessoas",
      rooms: "3 quartos",
      distribution: "3 quartos",
      terrace: "Integrado em toda a extensão",
      closingTagline: "Arquitetura inteligente ao serviço do essencial.",
    },
    en: {
      tagline: "Intelligent architecture in service of the essential.",
      description:
        "Clean-lined module with vertical slats and glazed façade. Three bedrooms, integrated terrace and generous living spaces for lasting, harmonious comfort.",
      introSubline: "For lasting, harmonious comfort.",
      capacity: "4 to 6 people",
      rooms: "3 bedrooms",
      distribution: "3 bedrooms",
      terrace: "Integrated full length",
      closingTagline: "Intelligent architecture in service of the essential.",
    },
  },
  origem: {
    pt: {
      tagline: "A origem de uma arte de viver contemporânea.",
      description:
        "Grande módulo familiar de 80 m² com quatro quartos e terraço integrado. Espaço pensado para o essencial, onde conforto, funcionalidade e design são um só.",
      capacity: "4 a 8 pessoas",
      rooms: "4 quartos",
      distribution: "4 quartos",
      terrace: "Integrado em toda a extensão",
      closingTagline: "A origem de uma arte de viver contemporânea.",
    },
    en: {
      tagline: "The origin of a contemporary art of living.",
      description:
        "Large 80 m² family module with four bedrooms and integrated terrace. A space designed for the essential, where comfort, functionality and design become one.",
      capacity: "4 to 8 people",
      rooms: "4 bedrooms",
      distribution: "4 bedrooms",
      terrace: "Integrated full length",
      closingTagline: "The origin of a contemporary art of living.",
    },
  },
  plano: {
    pt: {
      tagline: "O espaço no estado puro.",
      description:
        "Módulo linear de cantos arredondados e fachada totalmente envidraçada. Dois quartos nas extremidades, espaços centrais abertos e terraço de madeira em toda a extensão.",
      introSubline: "Para uma vida fluida, luminosa e funcional.",
      capacity: "4 pessoas",
      rooms: "2 quartos",
      distribution: "2 quartos",
      terrace: "Integrado em toda a extensão",
      closingTagline: "O espaço no estado puro.",
    },
    en: {
      tagline: "Space in its purest form.",
      description:
        "Linear module with rounded corners and a fully glazed façade. Two bedrooms at the ends, open central living spaces and a timber terrace along the full length.",
      introSubline: "For fluid, bright and functional living.",
      capacity: "4 people",
      rooms: "2 bedrooms",
      distribution: "2 bedrooms",
      terrace: "Integrated full length",
      closingTagline: "Space in its purest form.",
    },
  },
  ritmo: {
    pt: {
      tagline: "O essencial do conforto, num design depurado e moderno.",
      description:
        "Cápsula compacta com ecrã de lâminas verticais e terraço de madeira. Quarto, casa de banho, canto de cozinha e sala num formato otimizado para 2 a 4 pessoas.",
      capacity: "2 a 4 pessoas",
      rooms: "1 quarto",
      distribution: "Espaço aberto",
      terrace: "Terraço de madeira",
      closingTagline: "O ritmo do conforto no dia a dia.",
    },
    en: {
      tagline: "Essential comfort in a clean, modern design.",
      description:
        "Compact capsule with a vertical-slat screen and timber terrace. Bedroom, bathroom, kitchenette and living room in a format optimised for 2 to 4 people.",
      capacity: "2 to 4 people",
      rooms: "1 bedroom",
      distribution: "Open space",
      terrace: "Timber terrace",
      closingTagline: "The rhythm of everyday comfort.",
    },
  },
  superficie: {
    pt: {
      tagline: "A superfície ao serviço do conforto.",
      description:
        "O nosso modelo mais espaçoso — 90 m² interiores, três quartos, casa de banho dupla e sala-cozinha de 42,50 m². Terraços à frente e atrás para uma arte de viver sem compromisso.",
      introSubline: "Preço chave na mão — qualidade, durabilidade e vida sem compromisso.",
      capacity: "4 a 8 pessoas",
      rooms: "3 quartos",
      distribution: "3 quartos",
      closingTagline: "A superfície ao serviço do conforto.",
      planInternalMeasures: [
        "Q1: 12,00 m² · Q2: 10,20 m² · Q3: 10,20 m²",
        "Sala / Cozinha: 42,50 m²",
        "Terraço frente: 11,80 × 4,50 m",
      ],
    },
    en: {
      tagline: "Surface area in service of comfort.",
      description:
        "Our most spacious model — 90 m² interior, three bedrooms, dual bathroom and a 42.50 m² living-kitchen. Front and rear terraces for uncompromising living.",
      introSubline: "Turnkey price — quality, durability and uncompromising living.",
      capacity: "4 to 8 people",
      rooms: "3 bedrooms",
      distribution: "3 bedrooms",
      closingTagline: "Surface area in service of comfort.",
      planInternalMeasures: [
        "BR 1: 12.00 m² · BR 2: 10.20 m² · BR 3: 10.20 m²",
        "Living / Kitchen: 42.50 m²",
        "Front terrace: 11.80 × 4.50 m",
      ],
    },
  },
  volume: {
    pt: {
      tagline: "A arquitetura na sua forma mais pura.",
      description:
        "Módulo linear com paredes em gabião e fachada envidraçada em toda a extensão. Um quarto, casa de banho com banheira e espaço de estar aberto — o espaço no estado puro.",
      introSubline: "Um espaço de estar aberto, luminoso e perfeitamente equilibrado.",
      capacity: "2 pessoas",
      rooms: "1 quarto",
      distribution: "1 quarto",
      terrace: "Integrado em toda a extensão",
      closingTagline: "O espaço no estado puro.",
    },
    en: {
      tagline: "Architecture in its purest form.",
      description:
        "Linear module with gabion walls and full-length glazed façade. One bedroom, bathroom with bathtub and open living space — space in its purest form.",
      introSubline: "An open, bright and perfectly balanced living space.",
      capacity: "2 people",
      rooms: "1 bedroom",
      distribution: "1 bedroom",
      terrace: "Integrated full length",
      closingTagline: "Space in its purest form.",
    },
  },
};

const HIGHLIGHTS: Record<"pt" | "en", string[]> = {
  pt: [
    "Design depurado — linhas modernas e atemporais",
    "Conforto ótimo — espaços funcionais e bem pensados",
    "Materiais duráveis — construção robusta e resistente",
    "Instalação rápida — módulo pronto a usar",
    "Respeito ambiental — materiais ecológicos e baixo impacto",
  ],
  en: [
    "Clean design — modern, timeless lines",
    "Optimal comfort — functional, well-planned spaces",
    "Durable materials — robust, resilient construction",
    "Fast installation — ready-to-use module",
    "Environmental care — ecological materials, low impact",
  ],
};

const VALUE_PROPS: Record<"pt" | "en", typeof STANDARD_VALUE_PROPS> = {
  pt: [
    { title: "Design depurado", description: "Linhas modernas e atemporais" },
    { title: "Conforto ótimo", description: "Espaços funcionais e bem pensados" },
    { title: "Materiais duráveis", description: "Construção robusta e resistente" },
    { title: "Instalação rápida", description: "Módulo pronto a usar" },
    { title: "Respeito ambiental", description: "Materiais ecológicos e baixo impacto" },
  ],
  en: [
    { title: "Clean design", description: "Modern, timeless lines" },
    { title: "Optimal comfort", description: "Functional, well-planned spaces" },
    { title: "Durable materials", description: "Robust, resilient construction" },
    { title: "Fast installation", description: "Ready-to-use module" },
    { title: "Environmental care", description: "Ecological materials, low impact" },
  ],
};

const SPEC_LABELS: Record<"pt" | "en", Record<string, string>> = {
  pt: {
    "Dimensions hors tout": "Dimensões exteriores",
    "Hauteur intérieure": "Altura interior",
    "Surface intérieure": "Área interior",
    Capacité: "Capacidade",
    Structure: "Estrutura",
    Isolation: "Isolamento",
    Terrasse: "Terraço",
    Distribution: "Distribuição",
    "Acier galvanisé": "Aço galvanizado",
    "Haute performance": "Alta performance",
  },
  en: {
    "Dimensions hors tout": "Overall dimensions",
    "Hauteur intérieure": "Interior height",
    "Surface intérieure": "Interior area",
    Capacité: "Capacity",
    Structure: "Structure",
    Isolation: "Insulation",
    Terrasse: "Terrace",
    Distribution: "Layout",
    "Acier galvanisé": "Galvanised steel",
    "Haute performance": "High performance",
  },
};

const KEY_FEATURE_TITLES: Record<"pt" | "en", Record<string, string>> = {
  pt: {
    Longueur: "Comprimento",
    Largeur: "Largura",
    Terrasse: "Terraço",
    Distribution: "Distribuição",
    "Pièces de vie": "Espaços de estar",
    Surface: "Área",
    Capacité: "Capacidade",
  },
  en: {
    Longueur: "Length",
    Largeur: "Width",
    Terrasse: "Terrace",
    Distribution: "Layout",
    "Pièces de vie": "Living spaces",
    Surface: "Area",
    Capacité: "Capacity",
  },
};

const KEY_FEATURE_DESC: Record<"pt" | "en", Record<string, string>> = {
  pt: {
    "Spacieuses et ouvertes": "Amplos e abertos",
  },
  en: {
    "Spacieuses et ouvertes": "Spacious and open",
  },
};

export function resolveModelOverride(slug: ModelSlug, locale: Locale): ModelOverride {
  const base = MODEL_OVERRIDES[slug];
  if (locale === defaultLocale) return base;
  const overlay = MODEL_I18N[slug]?.[locale as "pt" | "en"];
  if (!overlay) return base;
  return { ...base, ...overlay };
}

export function getStandardHighlights(locale: Locale): string[] {
  if (locale === defaultLocale) return STANDARD_HIGHLIGHTS;
  return HIGHLIGHTS[locale as "pt" | "en"] ?? STANDARD_HIGHLIGHTS;
}

export function getStandardValueProps(locale: Locale): typeof STANDARD_VALUE_PROPS {
  if (locale === defaultLocale) return STANDARD_VALUE_PROPS;
  return VALUE_PROPS[locale as "pt" | "en"] ?? STANDARD_VALUE_PROPS;
}

export function localizeSpecLabel(label: string, locale: Locale): string {
  if (locale === defaultLocale) return label;
  return SPEC_LABELS[locale as "pt" | "en"]?.[label] ?? label;
}

export function localizeSpecValue(value: string, locale: Locale): string {
  if (locale === defaultLocale) return value;
  return SPEC_LABELS[locale as "pt" | "en"]?.[value] ?? value;
}

export function localizeKeyFeatureTitle(title: string, locale: Locale): string {
  if (locale === defaultLocale) return title;
  return KEY_FEATURE_TITLES[locale as "pt" | "en"]?.[title] ?? title;
}

export function localizeKeyFeatureDesc(desc: string, locale: Locale): string {
  if (locale === defaultLocale) return desc;
  return KEY_FEATURE_DESC[locale as "pt" | "en"]?.[desc] ?? desc;
}
