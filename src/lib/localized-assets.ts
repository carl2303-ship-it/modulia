import localizedAssetMap from "@/data/localized-asset-map.json";
import { defaultLocale, type Locale } from "@/i18n/config";

type AssetKind = "opcoes" | "cozinhas";

function localizedPath(
  kind: AssetKind,
  file: string,
  locale: Locale,
  base: string,
): string {
  const stem = file.replace(/\.[^.]+$/, "");
  const map = localizedAssetMap[kind] as Record<
    string,
    Partial<Record<Locale, string>>
  >;
  const entry = map[stem];
  if (!entry) return `${base}/${file}`;

  const loc: Locale = entry[locale]
    ? locale
    : entry[defaultLocale]
      ? defaultLocale
      : (Object.keys(entry)[0] as Locale);
  return `${base}/${loc}/${entry[loc]!}`;
}

/** Image d'option localisée (/opcoes/{locale}/…) — fallback FR */
export function localizedOptionImage(
  file: string,
  locale: Locale = defaultLocale,
): string {
  return localizedPath("opcoes", file, locale, "/opcoes");
}

/** Image cuisine localisée — fallback dossier partagé /cozinhas */
export function localizedKitchenImage(
  file: string,
  locale: Locale = defaultLocale,
): string {
  const stem = file.replace(/\.[^.]+$/, "");
  const map = localizedAssetMap.cozinhas as Record<
    string,
    Partial<Record<Locale, string>>
  >;
  if (map[stem]) {
    return localizedPath("cozinhas", file, locale, "/cozinhas");
  }
  return `/cozinhas/${file}`;
}
