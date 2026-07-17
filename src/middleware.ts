import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

const ONE_YEAR = 60 * 60 * 24 * 365;

/** Parse the first preferred language out of an Accept-Language header value. */
function localeFromAcceptLanguage(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;

  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0]?.slice(0, 2).toLowerCase())
    .find((lang) => isLocale(lang));

  return preferred && isLocale(preferred) ? preferred : null;
}

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const hasLocaleCookie = isLocale(request.cookies.get(LOCALE_COOKIE)?.value);
  if (!hasLocaleCookie) {
    const locale =
      localeFromAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale;

    const target = response ?? NextResponse.next({ request });
    target.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: ONE_YEAR,
      sameSite: "lax",
    });
    return target;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
