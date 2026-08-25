/** Helpers for IAD Portugal land listing URLs */

const IAD_HOST = "iadportugal.pt";

export function isValidIadListingUrl(raw: string): boolean {
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    return host === IAD_HOST || host.endsWith(`.${IAD_HOST}`);
  } catch {
    return false;
  }
}

/** Extract ref like r985363 from /anuncio/.../r985363 */
export function extractIadExternalRef(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    const match = url.pathname.match(/\/(r\d+)\/?$/i);
    return match?.[1]?.toLowerCase() ?? null;
  } catch {
    return null;
  }
}

/** Guess a readable title from the slug path if the user left title empty */
export function titleFromIadUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    const parts = url.pathname.split("/").filter(Boolean);
    // e.g. anuncio / terreno-venda-conceicao-250m2 / r985363
    const slug = parts.find((p) => p.startsWith("terreno") || p.includes("venda"));
    if (!slug) return null;
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();
  } catch {
    return null;
  }
}
