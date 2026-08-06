import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { CONTACT_PHONES, SHOWROOM } from "@/data/company";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-luxury-stone/60 bg-white py-12 text-black/75">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <Logo size="footer" linked={false} />
          <div className="text-center sm:text-right">
            <p className="font-ui text-[10px] uppercase tracking-wider text-black/50">
              {t("contact")}
            </p>
            <div className="mt-2 space-y-1 text-sm">
              {CONTACT_PHONES.map((phone) => (
                <div key={phone.tel}>
                  <span className="text-black/45">{phone.label} — </span>
                  <a href={`tel:${phone.tel}`} className="text-black hover:underline">
                    {phone.display}
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 font-ui text-[10px] uppercase tracking-wider text-black/50">
              {SHOWROOM.title}
            </p>
            <address className="mt-2 not-italic text-sm leading-relaxed text-black/75">
              {SHOWROOM.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-4 flex justify-center sm:justify-end">
              <LanguageSwitcher variant="light" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-luxury-stone/60 pt-8 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            <Link
              href="/cgv"
              className="font-ui text-xs uppercase tracking-wider text-black/70 transition hover:text-black"
            >
              {t("cgv")}
            </Link>
            <Link
              href="/confidentialite"
              className="font-ui text-xs uppercase tracking-wider text-black/70 transition hover:text-black"
            >
              {t("privacy")}
            </Link>
          </div>
          <p className="text-sm text-black/60">
            © {new Date().getFullYear()} Modulia. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
