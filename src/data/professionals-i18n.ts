import type { ProfessionalModel } from "@/data/professionals";
import { PROFESSIONAL_MODELS, PROFESSIONAL_VALUE_PROPS } from "@/data/professionals";
import { defaultLocale, type Locale } from "@/i18n/config";

const SHARED_PT = {
  specs: {
    Structure: "Aço galvanizado robusto",
    Isolation: "Térmico e acústico",
    Façade: "Vidro de segurança",
    Éclairage: "LED integrado",
    Sol: "Reforçado, acabamento premium",
    Sanitaires: "WC + lavatório integrados",
    Réseaux: "Água, esgoto e eletricidade prontos a ligar",
    Normes: "Conforme as normas em vigor",
    "Dimensions hors tout": "Dimensões exteriores",
    "Hauteur intérieure": "Altura interior",
  } as Record<string, string>,
  useCases: [
    "Estaleiros",
    "Eventos",
    "Bases de vida",
    "Salas de reunião",
    "Pontos de venda autónomos",
  ],
  options: [
    "Climatização / aquecimento",
    "Mobiliário integrado",
    "Iluminação LED premium",
    "Terraço exterior",
    "Vidro opaco",
    "Branding e sinalética",
  ],
  infrastructure: [
    "Sanitários integrados — WC + lavatório completos",
    "Rede de água e esgoto pronta a ligar",
    "Ligação elétrica pronta (16 A recomendado)",
    "Uso interior / exterior polivalente",
  ],
  subtitle: "Com sanitários integrados",
  tagline: "Um espaço completo, autónomo e funcional.",
  priceNote: "Versão autónoma estaleiro / evento",
  workstations12: "6 postos de trabalho",
  workstations6: "3 postos de trabalho",
  desc12:
    "Versão longa do escritório Modulia com sanitários integrados. Seis postos de trabalho, redes prontas a ligar e acabamentos premium para acolher as suas equipas em estaleiro ou em eventos.",
  desc6:
    "Escritório modular autónomo com sanitários integrados (WC + lavatório). Solução ideal para estaleiros, eventos e pontos de venda — conforto, autonomia e eficiência num só módulo.",
};

const SHARED_EN = {
  specs: {
    Structure: "Robust galvanised steel",
    Isolation: "Thermal and acoustic",
    Façade: "Safety glazing",
    Éclairage: "Integrated LED",
    Sol: "Reinforced, premium finish",
    Sanitaires: "Integrated WC + washbasin",
    Réseaux: "Water, drainage and electricity ready to connect",
    Normes: "Compliant with current standards",
    "Dimensions hors tout": "Overall dimensions",
    "Hauteur intérieure": "Interior height",
  } as Record<string, string>,
  useCases: [
    "Construction sites",
    "Events",
    "Living bases",
    "Meeting rooms",
    "Standalone retail points",
  ],
  options: [
    "Air conditioning / heating",
    "Built-in furniture",
    "Premium LED lighting",
    "Outdoor terrace",
    "Privacy glazing",
    "Branding & signage",
  ],
  infrastructure: [
    "Integrated sanitary facilities — full WC + washbasin",
    "Water & drainage network ready to connect",
    "Electrical connection ready (16 A recommended)",
    "Versatile indoor / outdoor use",
  ],
  subtitle: "With integrated sanitary facilities",
  tagline: "A complete, autonomous and functional space.",
  priceNote: "Autonomous site / event version",
  workstations12: "6 workstations",
  workstations6: "3 workstations",
  desc12:
    "Long version of the Modulia office with integrated sanitary facilities. Six workstations, ready-to-connect utilities and premium finishes to host your teams on site or at events.",
  desc6:
    "Autonomous modular office with integrated sanitary facilities (WC + washbasin). Ideal for sites, events and retail points — comfort, autonomy and efficiency in a single module.",
};

const VALUE_PROPS: Record<"pt" | "en", typeof PROFESSIONAL_VALUE_PROPS> = {
  pt: [
    { title: "Conceção inteligente", description: "Módulos pensados para uso profissional" },
    { title: "Materiais duráveis", description: "Construção robusta e resistente" },
    { title: "Ecológico", description: "Materiais recicláveis e baixo impacto" },
    { title: "Qualidade premium", description: "Acabamentos de alta gama" },
    { title: "Serviço personalizado", description: "Acompanhamento à medida" },
  ],
  en: [
    { title: "Smart design", description: "Modules designed for professional use" },
    { title: "Durable materials", description: "Robust, resilient construction" },
    { title: "Ecological", description: "Recyclable materials, low impact" },
    { title: "Premium quality", description: "High-end finishes" },
    { title: "Personalised service", description: "Bespoke support" },
  ],
};

function localizeModel(model: ProfessionalModel, locale: Locale): ProfessionalModel {
  if (locale === defaultLocale) return model;
  const pack = locale === "pt" ? SHARED_PT : SHARED_EN;
  const is12 = model.slug === "bureau-12m";

  return {
    ...model,
    subtitle: pack.subtitle,
    tagline: pack.tagline,
    description: is12 ? pack.desc12 : pack.desc6,
    priceNote: pack.priceNote,
    workstations: is12 ? pack.workstations12 : pack.workstations6,
    infrastructure: pack.infrastructure,
    useCases: pack.useCases,
    options: pack.options,
    specs: model.specs.map((spec) => ({
      label: pack.specs[spec.label] ?? spec.label,
      value: pack.specs[spec.value] ?? spec.value,
    })),
  };
}

export function getProfessionalModels(locale: Locale = defaultLocale): ProfessionalModel[] {
  return PROFESSIONAL_MODELS.map((m) => localizeModel(m, locale));
}

export function getProfessionalValueProps(locale: Locale = defaultLocale) {
  if (locale === defaultLocale) return PROFESSIONAL_VALUE_PROPS;
  return VALUE_PROPS[locale as "pt" | "en"] ?? PROFESSIONAL_VALUE_PROPS;
}
