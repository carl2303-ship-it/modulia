export type SolarWaterOption = "none" | "150L" | "200L";

export type PaidSelection = {
  /** Simple on/off options */
  toggles: Record<string, boolean>;
  /** Variant options: terrasses, climatisation, chauffe-eau solaire */
  terrasse: "none" | "compact" | "large";
  climate: "none" | "standard" | "solar";
  solarWater: SolarWaterOption;
  /** Rideaux — mètres linéaires when enabled */
  rideauxMl: number;
};

export type KitchenSelection = {
  packs: string[];
};

export type PoolSelection = {
  enabled: boolean;
  shellColor: string;
  fabricColor: string;
  options: string[];
};

export type PersonnaliserState = {
  modelSlug: string | null;
  finitions: Record<string, string>;
  paid: PaidSelection;
  kitchen: KitchenSelection;
  pool: PoolSelection;
};

export const INITIAL_PAID: PaidSelection = {
  toggles: {},
  terrasse: "none",
  climate: "none",
  solarWater: "none",
  rideauxMl: 4,
};

export const INITIAL_KITCHEN: KitchenSelection = {
  packs: [],
};

export const INITIAL_POOL: PoolSelection = {
  enabled: false,
  shellColor: "blanc",
  fabricColor: "ad-1150074",
  options: [],
};
