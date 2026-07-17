"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  variant?: "dark" | "light";
};

/** Selector FR | PT | EN — cookie NEXT_LOCALE, mesma URL */
export function LanguageSwitcher({ variant = "light" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const isDark = variant === "dark";

  const setLocale = (next: Locale) => {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      className={`flex items-center gap-1 font-ui text-[10px] uppercase tracking-[0.18em] ${
        pending ? "opacity-60" : ""
      }`}
      role="group"
      aria-label="Language"
    >
      {locales.map((code, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 && (
            <span className={isDark ? "text-white/30" : "text-luxury-stone"}>|</span>
          )}
          <button
            type="button"
            onClick={() => setLocale(code)}
            disabled={pending}
            className={`px-1 transition ${
              locale === code
                ? isDark
                  ? "text-white"
                  : "text-luxury-forest"
                : isDark
                  ? "text-white/50 hover:text-white"
                  : "text-luxury-muted hover:text-luxury-graphite"
            }`}
            aria-pressed={locale === code}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
