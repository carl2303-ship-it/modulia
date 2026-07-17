import Image from "next/image";
import type { KitchenSection } from "@/data/kitchen-content";

type KitchenSectionViewProps = {
  section: KitchenSection;
  compact?: boolean;
};

export function KitchenSectionView({ section, compact = false }: KitchenSectionViewProps) {
  return (
    <article className={compact ? "" : "border-t border-luxury-stone/60 py-16"}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={compact ? "" : "lg:grid lg:grid-cols-2 lg:items-start lg:gap-16"}>
          <div className="overflow-hidden rounded-3xl border border-luxury-stone bg-white p-3 shadow-luxury-sm">
            <Image
              src={section.image}
              alt={section.title}
              width={1000}
              height={750}
              className="h-auto w-full rounded-2xl"
            />
          </div>

          <div className={compact ? "mt-8" : "lg:pt-4"}>
            <h2 className="font-serif text-3xl text-luxury-graphite sm:text-4xl">
              {section.title}
            </h2>
            {section.tagline && (
              <p className="mt-3 font-serif text-lg italic text-luxury-muted">
                {section.tagline}
              </p>
            )}
            {section.intro && (
              <p className="mt-6 font-ui text-sm leading-relaxed text-luxury-muted">
                {section.intro}
              </p>
            )}

            {section.included && (
              <span className="mt-6 inline-block rounded-full bg-luxury-forest px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-white">
                Incluse — aucun supplément
              </span>
            )}

            {section.priceLabel && (
              <p className="mt-6 font-serif text-3xl text-luxury-graphite">
                {section.priceLabel}
              </p>
            )}

            {section.dimensions && (
              <p className="mt-4 font-ui text-sm text-luxury-muted">
                Dimensions : {section.dimensions}
              </p>
            )}
          </div>
        </div>

        {section.features && section.features.length > 0 && (
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {section.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-luxury-stone/80 bg-white px-5 py-4 shadow-luxury-sm"
              >
                <dt className="font-ui text-[10px] uppercase tracking-wider text-luxury-forest">
                  {feature.title}
                </dt>
                <dd className="mt-2 font-ui text-sm text-luxury-muted">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {section.includes && section.includes.length > 0 && (
          <div className="mt-10">
            <h3 className="font-ui text-sm font-medium uppercase tracking-wider text-luxury-graphite">
              {section.id === "base" ? "Équipements inclus" : "Contenu"}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {section.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-luxury-stone/80 bg-luxury-papyrus/50 px-5 py-3"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-luxury-forest" />
                  <span className="font-ui text-sm text-luxury-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {section.idealFor && section.idealFor.length > 0 && (
          <div className="mt-10">
            <h3 className="font-ui text-sm font-medium uppercase tracking-wider text-luxury-graphite">
              Idéale pour
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {section.idealFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-luxury-stone bg-white px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-luxury-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {section.availableOptions && section.availableOptions.length > 0 && (
          <div className="mt-10">
            <h3 className="font-ui text-sm font-medium uppercase tracking-wider text-luxury-graphite">
              Options disponibles
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {section.availableOptions.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-luxury-forest/20 bg-luxury-forest/5 px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-luxury-forest"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {section.highlights && section.highlights.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {section.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-luxury-stone bg-white px-4 py-2 font-ui text-[10px] uppercase tracking-wider text-luxury-muted"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {section.footerHighlights && section.footerHighlights.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-3 rounded-3xl bg-luxury-graphite px-6 py-8">
            {section.footerHighlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2 font-ui text-[10px] uppercase tracking-wider text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {section.gallery && section.gallery.length > 0 && !compact && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {section.gallery.map((src) => (
              <div
                key={src}
                className="overflow-hidden rounded-2xl border border-luxury-stone bg-white p-3"
              >
                <Image
                  src={src}
                  alt={section.title}
                  width={600}
                  height={450}
                  className="h-auto w-full rounded-xl"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
