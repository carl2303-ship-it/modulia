import Link from "next/link";
import { getTranslations } from "next-intl/server";

const PATHWAYS = [
  { id: "maisons", href: "/modelos", titleKey: "pathMaisons", textKey: "pathMaisonsText" },
  { id: "bureaux", href: "/professionnels", titleKey: "pathBureaux", textKey: "pathBureauxText" },
  { id: "piscines", href: "/piscine", titleKey: "pathPiscines", textKey: "pathPiscinesText" },
] as const;

export async function HomePathways() {
  const t = await getTranslations("home");

  return (
    <section id="choix" className="border-t border-luxury-stone/50 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
          {t("pathEyebrow")}
        </p>
        <h2 className="mt-3 text-center font-serif text-3xl text-luxury-graphite sm:text-4xl">
          {t("pathTitle")}
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {PATHWAYS.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className="group block border-t border-luxury-graphite/15 pt-6 transition hover:border-luxury-forest"
            >
              <span className="font-ui text-[10px] uppercase tracking-[0.3em] text-luxury-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-2xl text-luxury-graphite transition group-hover:text-luxury-forest">
                {t(item.titleKey)}
              </h3>
              <p className="mt-3 font-ui text-sm leading-relaxed text-luxury-muted">
                {t(item.textKey)}
              </p>
              <span className="mt-6 inline-block font-ui text-[11px] uppercase tracking-wider text-luxury-forest">
                {t("pathCta")} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
