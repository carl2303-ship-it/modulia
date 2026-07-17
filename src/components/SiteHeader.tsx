import Link from "next/link";
import { Logo } from "@/components/Logo";

const navLinks = [
  { id: "models", href: "/modelos", label: "Particuliers" },
  { id: "personnaliser", href: "/personnaliser", label: "Personnaliser" },
  { id: "personnalisation", href: "/personnalisation", label: "Personnalisation" },
  { id: "options", href: "/options", label: "Options" },
  { id: "pro", href: "/professionnels", label: "Professionnels" },
  { id: "craft", href: "/#constructif", label: "Savoir-faire" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

type SiteHeaderProps = {
  variant?: "dark" | "light";
};

/** Header partilhado — variante escura (homepage) ou clara (páginas internas) */
export function SiteHeader({ variant = "dark" }: SiteHeaderProps) {
  const isDark = variant === "dark";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md ${
        isDark
          ? "border-white/10 bg-luxury-graphite/80"
          : "border-luxury-stone/60 bg-luxury-papyrus/90"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo
          size="header"
          variant={isDark ? "white" : "default"}
        />

        <nav className="hidden items-center gap-8 md:flex">
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

        <Link
          href="/#contact"
          className={`rounded-full px-5 py-2 font-ui text-[11px] font-medium uppercase tracking-wider transition ${
            isDark
              ? "border border-white/20 bg-white/10 text-white hover:bg-luxury-forest hover:border-luxury-forest"
              : "bg-luxury-forest text-white hover:bg-luxury-forest-dark"
          }`}
        >
          Demander un devis
        </Link>
      </div>
    </header>
  );
}
