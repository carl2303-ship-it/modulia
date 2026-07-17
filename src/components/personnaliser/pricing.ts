import {
  CONFIGURATOR_PRICES,
  KITCHEN_APPLIANCES,
  KITCHEN_OPTIONS,
  POOL_MODEL,
  POOL_OPTIONS,
  getAllPaidOptions,
} from "@/data/options-catalog";
import type {
  KitchenSelection,
  PaidSelection,
  PersonnaliserState,
  PoolSelection,
} from "./types";

export function calculatePaidPrice(paid: PaidSelection): number {
  let total = 0;
  const catalog = getAllPaidOptions();

  for (const [id, on] of Object.entries(paid.toggles)) {
    if (!on) continue;
    if (id === "rideaux") {
      total += 220 * paid.rideauxMl;
      continue;
    }
    if (id === "transport") continue;
    const item = catalog.find((o) => o.id === id);
    if (item?.price != null) total += item.price;
  }

  if (paid.terrasse === "compact") total += CONFIGURATOR_PRICES.terrasseCompact;
  if (paid.terrasse === "large") total += CONFIGURATOR_PRICES.terrasseLarge;
  if (paid.climate === "standard") total += CONFIGURATOR_PRICES.climateStandard;
  if (paid.climate === "solar") total += CONFIGURATOR_PRICES.climateSolar;

  return total;
}

export function calculateKitchenPrice(kitchen: KitchenSelection): number {
  let total = 0;

  for (const packId of kitchen.packs) {
    const pack = KITCHEN_OPTIONS.find((o) => o.id === packId);
    if (pack?.price != null) total += pack.price;
  }

  if (kitchen.contemporaine) {
    total += CONFIGURATOR_PRICES.kitchenPerMl * kitchen.contemporaineMl;
  }

  if (kitchen.appliances === "option") {
    const premium = KITCHEN_APPLIANCES.find((o) => o.id === "electro-option");
    if (premium?.price != null) total += premium.price;
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
    calculatePaidPrice(state.paid) +
    calculateKitchenPrice(state.kitchen) +
    calculatePoolPrice(state.pool)
  );
}
