import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

type Benefit = {
  title: string;
  description: string;
};

const CONSTRUCTIF_IMAGES: Record<Locale, string> = {
  fr: "/home/principe-constructif-fr.png",
  pt: "/home/principe-constructif-pt.png",
  en: "/home/principe-constructif-en.png",
};

/**
 * Secção « Principe constructif » — imagem localizada + bénéfices (sem pastilhas numeradas).
 */
export async function ConstructionPrinciple() {
  const t = await getTranslations("construction");
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const benefits = t.raw("benefits") as Benefit[];
  const imageSrc = CONSTRUCTIF_IMAGES[locale] ?? CONSTRUCTIF_IMAGES.fr;

  return (
    <section id="constructif" className="border-t border-luxury-stone/60 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-serif text-4xl text-luxury-graphite sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 font-ui text-base leading-relaxed text-luxury-muted">
            {t("intro")}
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-luxury-stone bg-white p-4 shadow-luxury-sm sm:p-6">
          <Image
            src={imageSrc}
            alt={t("imageAlt")}
            width={1400}
            height={1800}
            className="h-auto w-full rounded-2xl"
          />
        </div>

        <div className="mt-16 grid gap-8 border-t border-luxury-stone/50 pt-12 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <div key={benefit.title}>
              <h3 className="font-ui text-[11px] font-medium uppercase tracking-wider text-luxury-graphite">
                {benefit.title}
              </h3>
              <p className="mt-2 font-ui text-sm leading-relaxed text-luxury-muted">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <TechnicalSpecs />

        <p className="mt-16 text-center font-ui text-[11px] uppercase tracking-[0.25em] text-luxury-muted">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
