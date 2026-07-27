import { defaultLocale, type Locale } from "@/i18n/config";

const ps = (file: string) => `/piscina/${file}`;

export type PoolFabricColor = {
  id: string;
  code: string;
  name: string;
  weight: number;
  hex: string;
  image: string;
};

export const POOL_FABRIC_COLORS: PoolFabricColor[] = [
  { id: "ad-1150072", code: "AD 1150072", name: "Gris clair", weight: 260, hex: "#e8e6e1", image: ps("fabric-ad-1150072.png") },
  { id: "ae-1150027", code: "AE 1150027", name: "Gris argent", weight: 280, hex: "#c5c2bc", image: ps("fabric-ae-1150027.png") },
  { id: "ae-1150028", code: "AE 1150028", name: "Gris bleu", weight: 280, hex: "#6b7a85", image: ps("fabric-ae-1150028.png") },
  { id: "ad-1150074", code: "AD 1150074", name: "Gris moyen", weight: 260, hex: "#9aa3a8", image: ps("fabric-ad-1150074.png") },
  { id: "ad-1150073", code: "AD 1150073", name: "Gris anthracite", weight: 260, hex: "#4a4f54", image: ps("fabric-ad-1150073.png") },
  { id: "ad-1150040", code: "AD 1150040", name: "Bleu ardoise", weight: 260, hex: "#3d5563", image: ps("fabric-ad-1150040.png") },
  { id: "ad-1150076", code: "AD 1150076", name: "Rouge vif", weight: 280, hex: "#d94a2a", image: ps("fabric-ad-1150076.png") },
  { id: "ad-1150071", code: "AD 1150071", name: "Rouille", weight: 260, hex: "#a85a3a", image: ps("fabric-ad-1150071.png") },
  { id: "ad-1150069", code: "AD 1150069", name: "Camel", weight: 260, hex: "#c9a06a", image: ps("fabric-ad-1150069.png") },
  { id: "ad-1150075", code: "AD 1150075", name: "Orange", weight: 280, hex: "#e87828", image: ps("fabric-ad-1150075.png") },
  { id: "ad-1150068", code: "AD 1150068", name: "Rouge", weight: 260, hex: "#c62828", image: ps("fabric-ad-1150068.png") },
  { id: "ab-1150088", code: "AB 1150088", name: "Taupe", weight: 220, hex: "#b8a894", image: ps("fabric-ab-1150088.png") },
  { id: "ad-1150078", code: "AD 1150078", name: "Beige clair", weight: 260, hex: "#d4c4a8", image: ps("fabric-ad-1150078.png") },
  { id: "ab-1150085", code: "AB 1150085", name: "Gris chaud", weight: 220, hex: "#8a8578", image: ps("fabric-ab-1150085.png") },
  { id: "ab-1150082", code: "AB 1150082", name: "Bleu ciel", weight: 220, hex: "#8ec4dc", image: ps("fabric-ab-1150082.png") },
  { id: "ab-1150080", code: "AB 1150080", name: "Vert sauge", weight: 220, hex: "#9aab7a", image: ps("fabric-ab-1150080.png") },
  { id: "ad-1150077", code: "AD 1150077", name: "Turquoise", weight: 280, hex: "#5ec4b8", image: ps("fabric-ad-1150077.png") },
  { id: "ab-1150081", code: "AB 1150081", name: "Bleu-gris pâle", weight: 220, hex: "#a8b8c4", image: ps("fabric-ab-1150081.png") },
  { id: "ab-1150083", code: "AB 1150083", name: "Bleu océan", weight: 220, hex: "#2a8a9a", image: ps("fabric-ab-1150083.png") },
  { id: "ab-1150084", code: "AB 1150084", name: "Vert forêt", weight: 220, hex: "#3a5a40", image: ps("fabric-ab-1150084.png") },
  {
    id: "ad-1150079-nude",
    code: "AD 1150079",
    name: "Nude",
    weight: 260,
    hex: "#d8b898",
    image: ps("fabric-ad-1150079-nude.png"),
  },
  {
    id: "ad-1150079-moutarde",
    code: "AD 1150079",
    name: "Moutarde",
    weight: 260,
    hex: "#d4a828",
    image: ps("fabric-ad-1150079-moutarde.png"),
  },
];

export const DEFAULT_POOL_FABRIC_ID = "ad-1150074";

export const POOL_FABRIC_OVERVIEW_IMAGE = ps("piscina-tecidos-outdoor.png");

export const POOL_FABRIC_HERO_IMAGE = ps("piscina-matelas-sofa.png");

const FABRIC_NAMES: Record<string, Partial<Record<Locale, string>>> = {
  "ad-1150072": { pt: "Cinzento claro", en: "Light grey" },
  "ae-1150027": { pt: "Cinzento prateado", en: "Silver grey" },
  "ae-1150028": { pt: "Cinzento azulado", en: "Blue grey" },
  "ad-1150074": { pt: "Cinzento médio", en: "Medium grey" },
  "ad-1150073": { pt: "Cinzento antracite", en: "Anthracite grey" },
  "ad-1150040": { pt: "Azul ardósia", en: "Slate blue" },
  "ad-1150076": { pt: "Vermelho vivo", en: "Bright red" },
  "ad-1150071": { pt: "Ferrugem", en: "Rust" },
  "ad-1150069": { pt: "Camel", en: "Camel" },
  "ad-1150075": { pt: "Laranja", en: "Orange" },
  "ad-1150068": { pt: "Vermelho", en: "Red" },
  "ab-1150088": { pt: "Taupe", en: "Taupe" },
  "ad-1150078": { pt: "Bege claro", en: "Light beige" },
  "ab-1150085": { pt: "Cinzento quente", en: "Warm grey" },
  "ab-1150082": { pt: "Azul céu", en: "Sky blue" },
  "ab-1150080": { pt: "Verde sálvia", en: "Sage green" },
  "ad-1150077": { pt: "Turquesa", en: "Turquoise" },
  "ab-1150081": { pt: "Azul-cinzento claro", en: "Pale blue-grey" },
  "ab-1150083": { pt: "Azul oceano", en: "Ocean blue" },
  "ab-1150084": { pt: "Verde floresta", en: "Forest green" },
  "ad-1150079-nude": { pt: "Nude", en: "Nude" },
  "ad-1150079-moutarde": { pt: "Mostarda", en: "Mustard" },
};

export function getLocalizedPoolFabricColors(locale: Locale = defaultLocale): PoolFabricColor[] {
  if (locale === defaultLocale) return POOL_FABRIC_COLORS;
  return POOL_FABRIC_COLORS.map((fabric) => ({
    ...fabric,
    name: FABRIC_NAMES[fabric.id]?.[locale] ?? fabric.name,
  }));
}

export function getPoolFabricById(
  id: string,
  locale: Locale = defaultLocale,
): PoolFabricColor | undefined {
  return getLocalizedPoolFabricColors(locale).find((fabric) => fabric.id === id);
}
