import {
  CONFIGURATOR_PRICES,
  KITCHEN_OPTIONS,
  POOL_MODEL,
  POOL_OPTIONS,
  getAllPaidOptions,
} from "@/data/options-catalog";
import { getInstallationCosts } from "@/data/installation-costs";
import type {
  KitchenSelection,
  PaidSelection,
  PersonnaliserState,
  PoolSelection,
} from "./types";

export function calculatePaidPrice(paid: PaidSelection, modelSlug?: string | null): number {
  let total = 0;
  const catalog = getAllPaidOptions();
  const installation = getInstallationCosts(modelSlug);

  for (const [id, on] of Object.entries(paid.toggles)) {
    if (!on) continue;
    if (id === "rideaux") {
      total +=
        CONFIGURATOR_PRICES.rideauxMotor +
        CONFIGURATOR_PRICES.rideauxPerMl * paid.rideauxMl;
      continue;
    }
    if (id === "transport") continue;
    if (id === "genie-civil") {
      total += installation.civil;
      continue;
    }
    if (id === "raccordement") {
      total += installation.raccordement;
      continue;
    }
    const item = catalog.find((o) => o.id === id);
    if (item?.price != null) total += item.price;
  }

  if (paid.terrasse === "compact") total += CONFIGURATOR_PRICES.terrasseCompact;
  if (paid.terrasse === "large") total += CONFIGURATOR_PRICES.terrasseLarge;
  if (paid.climate === "standard") total += CONFIGURATOR_PRICES.climateStandard;
  if (paid.climate === "solar") total += CONFIGURATOR_PRICES.climateSolar;
  if (paid.solarWater === "150L") total += CONFIGURATOR_PRICES.solarWater;
  if (paid.solarWater === "200L") total += CONFIGURATOR_PRICES.solarWater200L;

  return total;
}

export function calculateKitchenPrice(kitchen: KitchenSelection): number {
  let total = 0;

  for (const packId of kitchen.packs) {
    const pack = KITCHEN_OPTIONS.find((o) => o.id === packId);
    if (pack?.price != null) total += pack.price;
  }

  return total;
}

export function calculatePoolPrice(pool: PoolSelection): number {
  if (!pool.enabled) return 0;
  let total = POOL_MODEL.priceFrom;
  for (const optId of pool.options) {
    const opt = POOL_OPTIONS.find((o) => o.id === optId);
    if (opt?.price != null) total += opt.price;
  }
  return total;
}

export function calculateTotalPrice(
  basePrice: number,
  state: PersonnaliserState,
): number {
  return (
    basePrice +
    calculatePaidPrice(state.paid, state.modelSlug) +
    calculateKitchenPrice(state.kitchen) +
    calculatePoolPrice(state.pool)
  );
}
