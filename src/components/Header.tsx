import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const navLinks = [
  { href: "/equilibro", label: "EQUILIBRO" },
  { href: "#modelos", label: "Modelos" },
  { href: "#vantagens", label: "Vantagens" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-luxury-graphite/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo size="md" className="brightness-0 invert" />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-ui text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contacto"
          className="rounded-full border border-white/20 bg-white/10 px-5 py-2 font-ui text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-luxury-forest hover:border-luxury-forest"
        >
          Pedir orçamento
        </Link>
      </div>
    </header>
  );
}
