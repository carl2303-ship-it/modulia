import Link from "next/link";

const navLinks = [
  { href: "#modelos", label: "Modelos" },
  { href: "#vantagens", label: "Vantagens" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-modulia-200/60 bg-sand-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-modulia-700 text-sm font-bold text-white">
            M
          </span>
          <span className="text-xl font-semibold tracking-tight text-modulia-900">
            Modulia
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-modulia-700 transition hover:text-modulia-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="rounded-full bg-modulia-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-modulia-800"
        >
          Pedir orçamento
        </a>
      </div>
    </header>
  );
}
