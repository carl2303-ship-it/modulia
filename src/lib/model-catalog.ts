/**
 * Catálogo automático dos modelos em public/[slug]/
 * Resolve caminhos com os nomes de ficheiro reais das pastas.
 */

export type ModelFolderAssets = {
  slug: string;
  folder: string;
  ficha: string;
  hero1: string;
  hero2: string;
  planImage: string;
  planCotado: string;
  planSemCotacoes: string;
};

/** 14 modelos particulares — pasta em public/ */
export const MODEL_SLUGS = [
  "equilibro",
  "espacao",
  "essencia",
  "forma",
  "horizonte",
  "ideal",
  "linha",
  "luz",
  "materia",
  "origem",
  "plano",
  "ritmo",
  "superficie",
  "volume",
] as const;

export type ModelSlug = (typeof MODEL_SLUGS)[number];

/** Mapeamento slug → nome da pasta (quando difere por encoding) */
const FOLDER_ALIASES: Record<ModelSlug, string> = {
  equilibro: "equilibro",
  espacao: "espa\u00e7ao", // pasta "espaçao" no disco
  essencia: "essencia",
  forma: "forma",
  horizonte: "horizonte",
  ideal: "ideal",
  linha: "linha",
  luz: "luz",
  materia: "materia",
  origem: "origem",
  plano: "plano",
  ritmo: "ritmo",
  superficie: "superficie",
  volume: "volume",
};

const ASSET_MAP: Record<
  ModelSlug,
  Omit<ModelFolderAssets, "slug" | "folder" | "planImage">
> = {
  equilibro: {
    ficha: "/equilibro/equilibro.jpg",
    hero1: "/equilibro/EQUILIBRO VUE 3D 1.png",
    hero2: "/equilibro/EQUILIBRO VUE 3D 2.png",
    planCotado: "/equilibro/Equilibro.pdf",
    planSemCotacoes: "/equilibro/Equilibrio sem medidas.pdf",
  },
  espacao: {
    ficha: "/espa\u00e7ao/espa\u00e7ao.jpg",
    hero1: "/espa\u00e7ao/ESPACAO VUE 3D 1.png",
    hero2: "/espa\u00e7ao/ESPACAO VUE 3D 2.png",
    planCotado: "/espa\u00e7ao/Terrasse 2.pdf",
    planSemCotacoes: "/espa\u00e7ao/Terrasse 2 sem medidas.pdf",
  },
  essencia: {
    ficha: "/essencia/ESSENCIA.jpg",
    hero1: "/essencia/ESSENCIA VUE 3D 1.png",
    hero2: "/essencia/ESSENCIA VUE 3D 2.png",
    planCotado: "/essencia/Essencia.pdf",
    planSemCotacoes: "/essencia/Essencia sem medidas.pdf",
  },
  forma: {
    ficha: "/forma/forma.jpg",
    hero1: "/forma/FORMA VUE 3D 1.png",
    hero2: "/forma/FORMA VUE 3D 2.png",
    planCotado: "/forma/Forma.pdf",
    planSemCotacoes: "/forma/Forma sem medidas.pdf",
  },
  horizonte: {
    ficha: "/horizonte/horizonte.jpg",
    hero1: "/horizonte/HORIZONTE VUE 3D.png",
    hero2: "/horizonte/HORIZONTE VUE 3D 2.png",
    planCotado: "/horizonte/Horizonte.pdf",
    planSemCotacoes: "/horizonte/Horizonte sem medidas.pdf",
  },
  ideal: {
    ficha: "/ideal/IDEAL.jpg",
    hero1: "/ideal/IDEAL VUE 3D 1.png",
    hero2: "/ideal/IDEAL VUE 3D 2.png",
    planCotado: "/ideal/Ideal.pdf",
    planSemCotacoes: "/ideal/Ideal sem medidas.pdf",
  },
  linha: {
    ficha: "/linha/LINHA.jpg",
    hero1: "/linha/LINHA VUE 3D 1.png",
    hero2: "/linha/LINHA VUE 3D 2.png",
    planCotado: "/linha/Linha.pdf",
    planSemCotacoes: "/linha/Linha sem medidas.pdf",
  },
  luz: {
    ficha: "/luz/luz.jpg",
    hero1: "/luz/LUZ VUE 3D 1.png",
    hero2: "/luz/LUZ VUE 3D 2.png",
    planCotado: "/luz/Luz.pdf",
    planSemCotacoes: "/luz/Luz sem medidas.pdf",
  },
  materia: {
    ficha: "/materia/mat\u00e9ria.jpg",
    hero1: "/materia/MATERIA VUE 3D 1.png",
    hero2: "/materia/MATERIA VUE 3D 2.png",
    planCotado: "/materia/Materia.pdf",
    planSemCotacoes: "/materia/Materia sem medidas.pdf",
  },
  origem: {
    ficha: "/origem/origem.jpg",
    hero1: "/origem/ORIGEM VUE 3D 1.png",
    hero2: "/origem/ORIGEM VUE 3D 2.png",
    planCotado: "/origem/origem.pdf",
    planSemCotacoes: "/origem/origem sem medidas.pdf",
  },
  plano: {
    ficha: "/plano/plano.jpg",
    hero1: "/plano/PLANO VUE 3D 1.png",
    hero2: "/plano/PLANO VUE 3D 2.png",
    planCotado: "/plano/Plano.pdf",
    planSemCotacoes: "/plano/Plano sem medidas.pdf",
  },
  ritmo: {
    ficha: "/ritmo/RITMO.jpg",
    hero1: "/ritmo/RITMO VUE 3D 1.png",
    hero2: "/ritmo/RITMO VUE 3D 2.png",
    planCotado: "/ritmo/Ritmo.pdf",
    planSemCotacoes: "/ritmo/Ritmo sem medidas.pdf",
  },
  superficie: {
    ficha: "/superficie/superficie.jpg",
    hero1: "/superficie/SUPERFICIE VUE 3D 1.png",
    hero2: "/superficie/SUPERFICIE VUE 3D 2.png",
    planCotado: "/superficie/Superficie.pdf",
    planSemCotacoes: "/superficie/Superficie sem medidas.pdf",
  },
  volume: {
    ficha: "/volume/VOLUME.jpg",
    hero1: "/volume/VOLUME VUE 3D 1.png",
    hero2: "/volume/VOLUME VUE 3D 2.png",
    planCotado: "/volume/Volume.pdf",
    planSemCotacoes: "/volume/Volume sem medidas.pdf",
  },
};

export function getModelAssets(slug: ModelSlug): ModelFolderAssets {
  const folder = FOLDER_ALIASES[slug];
  const planFile = slug === folder ? `${slug}-plan.png` : `${folder}-plan.png`;
  return {
    slug,
    folder,
    planImage: `/${folder}/${planFile}`,
    ...ASSET_MAP[slug],
  };
}

export function getAllModelAssets(): ModelFolderAssets[] {
  return MODEL_SLUGS.map(getModelAssets);
}

export function formatSlugToName(slug: ModelSlug): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1).toUpperCase();
}
