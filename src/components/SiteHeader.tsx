"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { ProSessionBadge } from "@/components/auth/ProSessionBadge";

type SiteHeaderProps = {
  /** Mantido por compatibilidade — o header é sempre claro */
  variant?: "dark" | "light";
};

/** Header partilhado — fundo branco, texto preto, logo Modulia */
export function SiteHeader(_props: SiteHeaderProps = {}) {
  const { variant } = _props;
  void variant;
  const t = useTranslations("nav");
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-luxury-stone/60 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <Logo size="header" className="min-w-[5.83rem]" />

        <nav className="hidden items-center gap-3 lg:flex lg:gap-4 xl:gap-6">
          {navLinks.map((link, index) => (
            <span key={link.id} className="flex items-center gap-3 lg:gap-4 xl:gap-6">
              {index > 0 && (
                <span aria-hidden className="select-none font-ui text-xs text-luxury-stone">
                  /
                </span>
              )}
              <Link
                href={link.href}
                className="whitespace-nowrap font-ui text-[12px] font-medium tracking-wide text-black/80 transition hover:text-black xl:text-[13px]"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ProSessionBadge />
          <LanguageSwitcher variant="light" />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-luxury-stone text-black lg:hidden"
          >
            <span className="sr-only">{menuOpen ? t("closeMenu") : t("openMenu")}</span>
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 rounded-full bg-black transition ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-4 rounded-full bg-black transition ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-4 rounded-full bg-black transition ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-luxury-stone/60 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3.5 font-ui text-base font-medium tracking-wide text-black transition hover:bg-luxury-stone/40"
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
