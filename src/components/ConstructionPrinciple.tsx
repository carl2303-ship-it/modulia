import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";

type Layer = {
  title: string;
  items: string[];
};

type Benefit = {
  title: string;
  description: string;
};

/**
 * Secção « Principe constructif » — infografia numerada (multilingue).
 */
export async function ConstructionPrinciple() {
  const t = await getTranslations("construction");
  const layers = t.raw("layers") as Layer[];
  const benefits = t.raw("benefits") as Benefit[];

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

        <div className="mt-14 overflow-hidden rounded-3xl border border-luxury-stone bg-luxury-papyrus p-4 shadow-luxury-sm sm:p-6">
          <Image
            src="/home/principe-constructif.png"
            alt={t("imageAlt")}
            width={1400}
            height={1800}
            className="h-auto w-full rounded-2xl"
          />
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map((layer, index) => (
            <article
              key={layer.title}
              className="rounded-2xl border border-luxury-stone/80 bg-luxury-papyrus/50 p-6"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-luxury-forest text-sm font-medium text-white">
                {index + 1}
              </div>
              <h3 className="font-ui text-sm font-medium uppercase tracking-wider text-luxury-forest">
                {layer.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-ui text-sm text-luxury-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-luxury-forest" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-luxury-stone bg-white p-6 text-center transition hover:border-luxury-forest/30 hover:shadow-luxury-sm"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-luxury-forest/10">
                <span className="h-2 w-2 rounded-full bg-luxury-forest" />
              </div>
              <h3 className="font-ui text-[11px] font-medium uppercase tracking-wider text-luxury-graphite">
                {benefit.title}
              </h3>
              <p className="mt-2 font-ui text-xs leading-relaxed text-luxury-muted">
                {benefit.description}
              </p>
            </article>
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
