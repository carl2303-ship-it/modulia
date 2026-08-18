export type ModelTypology = "T0" | "T1" | "T2" | "T3" | "T4";

export const MODEL_TYPOLOGIES: ModelTypology[] = ["T0", "T1", "T2", "T3", "T4"];

function countToTypology(count: number): ModelTypology {
  if (count <= 0) return "T0";
  if (count === 1) return "T1";
  if (count === 2) return "T2";
  if (count === 3) return "T3";
  return "T4";
}

function typologyToCount(typology: ModelTypology): number {
  return typology === "T0" ? 0 : Number(typology.slice(1));
}

/** Studio → 0 · "1 à 4 chambres" → { min: 1, max: 4 } */
export function getRoomCountRange(rooms: string): { min: number; max: number } {
  const r = rooms.toLowerCase();
  if (/\bstudio\b|couchage/.test(r)) return { min: 0, max: 0 };
  const nums = [...r.matchAll(/(\d+)/g)].map((m) => Number(m[1]));
  if (nums.length === 0) return { min: 1, max: 1 };
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

/** Studio / couchages → T0 · 1 ch. → T1 · 2 ch. → T2 · 3 ch. → T3 · 4 ch. → T4 */
export function getModelTypology(rooms: string): ModelTypology {
  return countToTypology(getRoomCountRange(rooms).max);
}

/** Badge : "T2" ou "T1–T4" pour une plage de chambres. */
export function getModelTypologyLabel(rooms: string): string {
  const { min, max } = getRoomCountRange(rooms);
  if (min === max) return countToTypology(min);
  return `${countToTypology(min)}–${countToTypology(max)}`;
}

export function modelMatchesTypology(rooms: string, typology: ModelTypology): boolean {
  const { min, max } = getRoomCountRange(rooms);
  const n = typologyToCount(typology);
  return n >= min && n <= max;
}
