"use client";

import Link from "next/link";
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

  const navLinks = [
    { id: "models", href: "/modelos", label: t("particuliers") },
    { id: "pro", href: "/professionnels", label: t("pro") },
    { id: "craft", href: "/#constructif", label: t("craft") },
    { id: "contact", href: "/#contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md ${
        isDark
          ? "border-white/10 bg-luxury-graphite/80"
          : "border-luxury-stone/60 bg-luxury-papyrus/90"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <Logo size="header" variant={isDark ? "white" : "default"} />

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`font-ui text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                isDark
                  ? "text-white/80 hover:text-white"
                  : "text-luxury-muted hover:text-luxury-graphite"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher variant={isDark ? "dark" : "light"} />
          <Link
            href="/#contact"
            className={`rounded-full px-5 py-2 font-ui text-[11px] font-medium uppercase tracking-wider transition ${
              isDark
                ? "border border-white/20 bg-white/10 text-white hover:bg-luxury-forest hover:border-luxury-forest"
                : "bg-luxury-forest text-white hover:bg-luxury-forest-dark"
            }`}
          >
            {t("devis")}
          </Link>
        </div>
      </div>
    </header>
  );
}
