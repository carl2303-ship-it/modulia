export const locales = ["fr", "pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export const localeHtmlLang: Record<Locale, string> = {
  fr: "fr",
  pt: "pt",
  en: "en",
};

export const localeOg: Record<Locale, string> = {
  fr: "fr_FR",
  pt: "pt_PT",
  en: "en_GB",
};
