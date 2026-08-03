"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";

type SiteHeaderProps = {
  variant?: "dark" | "light";
};

/** Header partilhado — variante escura (homepage) ou clara (páginas internas) */
export function SiteHeader({ variant = "dark" }: SiteHeaderProps) {
  const t = useTranslations("nav");
  const isDark = variant === "dark";
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: "maisons", href: "/modelos", label: t("maisons") },
    { id: "bureaux", href: "/professionnels", label: t("bureaux") },
    { id: "piscines", href: "/piscine", label: t("piscines") },
    { id: "craft", href: "/#savoir-faire", label: t("craft") },
    { id: "contact", href: "/#contact", label: t("contact") },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = isDark
    ? "text-white/85 hover:text-white"
    : "text-luxury-graphite/75 hover:text-luxury-graphite";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md ${
        isDark
          ? "border-white/10 bg-luxury-graphite/80"
          : "border-luxury-stone/60 bg-white/90"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Logo size="header" variant={isDark ? "white" : "default"} />

        <nav className="hidden items-center gap-3 lg:flex lg:gap-4 xl:gap-6">
          {navLinks.map((link, index) => (
            <span key={link.id} className="flex items-center gap-3 lg:gap-4 xl:gap-6">
              {index > 0 && (
                <span
                  aria-hidden
                  className={`select-none font-ui text-xs ${
                    isDark ? "text-white/25" : "text-luxury-stone"
                  }`}
                >
                  /
                </span>
              )}
              <Link
                href={link.href}
                className={`whitespace-nowrap font-ui text-[12px] font-medium tracking-wide transition xl:text-[13px] ${linkClass}`}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher variant={isDark ? "dark" : "light"} />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMenuOpen((open) => !open)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
              isDark
                ? "border-white/20 text-white"
                : "border-luxury-stone text-luxury-graphite"
            }`}
          >
            <span className="sr-only">{menuOpen ? t("closeMenu") : t("openMenu")}</span>
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 rounded-full transition ${
                  isDark ? "bg-white" : "bg-luxury-graphite"
                } ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-4 rounded-full transition ${
                  isDark ? "bg-white" : "bg-luxury-graphite"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-4 rounded-full transition ${
                  isDark ? "bg-white" : "bg-luxury-graphite"
                } ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className={`border-t lg:hidden ${
            isDark
              ? "border-white/10 bg-luxury-graphite"
              : "border-luxury-stone/60 bg-white"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-3 py-3.5 font-ui text-base font-medium tracking-wide transition ${
                  isDark
                    ? "text-white/90 hover:bg-white/10"
                    : "text-luxury-graphite hover:bg-luxury-stone/40"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
