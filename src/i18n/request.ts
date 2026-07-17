import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";

/** Parse the first preferred language out of an Accept-Language header value. */
function localeFromAcceptLanguage(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;

  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0]?.slice(0, 2).toLowerCase())
    .find((lang) => isLocale(lang));

  return preferred && isLocale(preferred) ? preferred : null;
}

export default getRequestConfig(async () => {
  const store = await cookies();
  const raw = store.get(LOCALE_COOKIE)?.value;

  let locale: Locale;
  if (isLocale(raw)) {
    locale = raw;
  } else {
    const headerStore = await headers();
    locale = localeFromAcceptLanguage(headerStore.get("accept-language")) ?? defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
