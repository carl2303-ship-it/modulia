import type { ModelSlug } from "@/lib/model-catalog";

export type InstallationCosts = {
  modules: 1 | 2 | 3;
  civil: number;
  raccordement: number;
};

/** Génie civil / raccordement HT selon le nombre de modules du modèle */
export const MODEL_INSTALLATION_COSTS: Record<ModelSlug, InstallationCosts> = {
  essencia: { modules: 1, civil: 3_000, raccordement: 2_000 },
  forma: { modules: 2, civil: 3_000, raccordement: 3_000 },
  ritmo: { modules: 2, civil: 3_000, raccordement: 3_000 },
  linha: { modules: 1, civil: 3_000, raccordement: 3_000 },
  luz: { modules: 1, civil: 3_000, raccordement: 3_000 },
  volume: { modules: 2, civil: 4_000, raccordement: 4_000 },
  plano: { modules: 2, civil: 4_000, raccordement: 4_000 },
  equilibro: { modules: 2, civil: 4_000, raccordement: 4_000 },
  materia: { modules: 2, civil: 4_000, raccordement: 4_000 },
  ideal: { modules: 2, civil: 4_000, raccordement: 4_000 },
  horizonte: { modules: 2, civil: 4_000, raccordement: 4_000 },
  espacao: { modules: 3, civil: 6_000, raccordement: 6_000 },
  origem: { modules: 3, civil: 6_000, raccordement: 6_000 },
  superficie: { modules: 3, civil: 6_000, raccordement: 6_000 },
};

export const DEFAULT_INSTALLATION_COSTS: InstallationCosts = {
  modules: 1,
  civil: 3_000,
  raccordement: 2_000,
};

export function getInstallationCosts(slug: string | null | undefined): InstallationCosts {
  if (!slug) return DEFAULT_INSTALLATION_COSTS;
  return MODEL_INSTALLATION_COSTS[slug as ModelSlug] ?? DEFAULT_INSTALLATION_COSTS;
}
