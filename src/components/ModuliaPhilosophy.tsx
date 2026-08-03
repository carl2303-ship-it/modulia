import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { getPhilosophy } from "@/data/philosophy-i18n";
import { isLocale, defaultLocale } from "@/i18n/config";

export async function ModuliaPhilosophy() {
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getTranslations("philosophy");
  const { eyebrow, title, intro, lead, body, closing, highlights } =
    getPhilosophy(locale);

  return (
    <section id="savoir-faire" className="scroll-mt-28 border-t border-luxury-stone/50 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-4xl text-luxury-graphite sm:text-5xl">
            {title}
          </h2>
          <div className="mt-8 space-y-2">
            {intro.map((line) => (
              <p
                key={line}
                className="font-serif text-2xl leading-snug text-luxury-graphite sm:text-3xl"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-8 space-y-3">
            {lead.map((paragraph) => (
              <p
                key={paragraph}
                className="font-serif text-lg leading-relaxed text-luxury-muted sm:text-xl"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="border-t border-luxury-graphite/15 px-2 py-4 text-center"
            >
              <p className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                {item.label}
              </p>
              <p className="mt-2 font-ui text-sm font-medium text-luxury-graphite">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-6">
          {body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 56)}
              className="font-ui text-base leading-relaxed text-luxury-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl space-y-3 text-center">
          {closing.map((line, index) => (
            <p
              key={line}
              className={
                index === 0
                  ? "font-serif text-2xl text-luxury-graphite sm:text-3xl"
                  : index === closing.length - 1
                    ? "pt-2 font-serif text-xl italic text-luxury-forest sm:text-2xl"
                    : "font-serif text-xl text-luxury-graphite sm:text-2xl"
              }
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/modelos"
            className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-[0.18em] text-white transition hover:bg-luxury-forest-dark"
          >
            {t("ctaModels")}
          </Link>
          <Link
            href="#constructif"
            className="rounded-full border border-luxury-stone bg-white px-8 py-4 font-ui text-xs uppercase tracking-[0.18em] text-luxury-graphite transition hover:border-luxury-forest"
          >
            {t("ctaConstructif")}
          </Link>
        </div>
      </div>
    </section>
  );
}
