import { buildDefaultFinitions } from "@/components/personnaliser/FinitionPickers";
import {
  INITIAL_KITCHEN,
  INITIAL_PAID,
  INITIAL_POOL,
  type KitchenSelection,
  type PaidSelection,
  type PoolSelection,
} from "@/components/personnaliser/types";
import type { Locale } from "@/i18n/config";

export type ParsedOrderConfiguration = {
  modelSlug: string | null;
  finitions: Record<string, string>;
  paid: PaidSelection;
  kitchen: KitchenSelection;
  pool: PoolSelection;
};

export const EDITABLE_PIPELINE_STATUSES = ["pending", "ordered"] as const;

export function canEditOrderConfiguration(
  pipelineStatus: string,
  assignedTo: string | null,
  profileId: string,
  isOwner: boolean,
): boolean {
  if (!EDITABLE_PIPELINE_STATUSES.includes(pipelineStatus as (typeof EDITABLE_PIPELINE_STATUSES)[number])) {
    return false;
  }
  return isOwner || assignedTo === profileId;
}

export function parseOrderConfiguration(
  json: string | null | undefined,
  locale: Locale,
): ParsedOrderConfiguration {
  const defaults: ParsedOrderConfiguration = {
    modelSlug: null,
    finitions: buildDefaultFinitions(locale),
    paid: INITIAL_PAID,
    kitchen: INITIAL_KITCHEN,
    pool: INITIAL_POOL,
  };

  if (!json?.trim()) return defaults;

  try {
    const data = JSON.parse(json) as {
      modelSlug?: string;
      finitions?: Record<string, string>;
      paid?: Partial<PaidSelection> & { toggles?: Record<string, boolean> };
      kitchen?: Partial<KitchenSelection>;
      pool?: Partial<PoolSelection> & { linerColor?: string };
    };

    const paid = data.paid ?? {};
    const kitchen = data.kitchen ?? {};
    const pool = data.pool ?? {};

    return {
      modelSlug: data.modelSlug ?? null,
      finitions: { ...buildDefaultFinitions(locale), ...(data.finitions ?? {}) },
      paid: {
        ...INITIAL_PAID,
        ...paid,
        toggles: { ...INITIAL_PAID.toggles, ...(paid.toggles ?? {}) },
      },
      kitchen: {
        packs: kitchen.packs ?? INITIAL_KITCHEN.packs,
      },
      pool: {
        enabled: pool.enabled ?? INITIAL_POOL.enabled,
        shellColor: pool.shellColor ?? INITIAL_POOL.shellColor,
        fabricColor: pool.fabricColor ?? pool.linerColor ?? INITIAL_POOL.fabricColor,
        options: pool.options ?? INITIAL_POOL.options,
      },
    };
  } catch {
    return defaults;
  }
}
