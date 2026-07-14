import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CONTACT_PHONES, SHOWROOM } from "@/data/company";

export function Footer() {
  return (
    <footer className="border-t border-modulia-200 bg-modulia-950 py-12 text-modulia-300">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <Logo size="lg" linked={false} />
          <div className="text-center sm:text-right">
            <p className="font-ui text-[10px] uppercase tracking-wider text-modulia-400">
              Contact
            </p>
            <div className="mt-2 space-y-1 text-sm">
              {CONTACT_PHONES.map((phone) => (
                <div key={phone.tel}>
                  <span className="text-modulia-500">{phone.label} — </span>
                  <a href={`tel:${phone.tel}`} className="hover:text-white hover:underline">
                    {phone.display}
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 font-ui text-[10px] uppercase tracking-wider text-modulia-400">
              {SHOWROOM.title}
            </p>
            <address className="mt-2 not-italic text-sm leading-relaxed">
              {SHOWROOM.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-modulia-800 pt-8 sm:flex-row sm:justify-between">
          <Link
            href="/cgv"
            className="font-ui text-xs uppercase tracking-wider text-modulia-300 transition hover:text-white"
          >
            CGV · FR / PT / EN
          </Link>
          <p className="text-sm">
            © {new Date().getFullYear()} Modulia. Maisons modulaires durables.
          </p>
        </div>
      </div>
    </footer>
  );
}
