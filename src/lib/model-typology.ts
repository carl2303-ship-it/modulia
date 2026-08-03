export type ModelTypology = "T0" | "T1" | "T2" | "T3" | "T4";

export const MODEL_TYPOLOGIES: ModelTypology[] = ["T0", "T1", "T2", "T3", "T4"];

/** Studio / couchages → T0 · 1 ch. → T1 · 2 ch. → T2 · 3 ch. → T3 · 4 ch. → T4 */
export function getModelTypology(rooms: string): ModelTypology {
  const r = rooms.toLowerCase();
  if (/\bstudio\b|couchage/.test(r)) return "T0";
  const match = r.match(/(\d+)/);
  const count = match ? Number(match[1]) : 0;
  if (count <= 1) return "T1";
  if (count === 2) return "T2";
  if (count === 3) return "T3";
  return "T4";
}
