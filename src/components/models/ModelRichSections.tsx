import type { ModelRichContent } from "@/data/models";

type ModelRichSectionsProps = {
  rich: ModelRichContent;
};

/**
 * Sections HTML traduisibles — données extraites des fiches (sans image officielle).
 */
export function ModelRichSections({ rich }: ModelRichSectionsProps) {
  return (
    <>
      {/* Barra d'attributs clés */}
      {rich.keyFeatures && rich.keyFeatures.length > 0 && (
        <section className="border-t border-luxury-stone/60 bg-luxury-graphite py-14">
          <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-6 sm:grid-cols-3 lg:grid-cols-5">
            {rich.keyFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-luxury-graphite px-4 py-8 text-center"
              >
                <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-luxury-forest">
                  {feature.title}
                </p>
                <p className="mt-2 font-ui text-sm font-medium text-white">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Distribution intérieure */}
      {rich.layoutZones && rich.layoutZones.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
              Plan & Dimensions
            </p>
            <h2 className="mt-2 font-serif text-3xl text-luxury-graphite">
              Distribution intérieure
            </h2>
            {rich.planFootprint && (
              <p className="mt-3 font-ui text-sm text-luxury-forest">
                Empreinte totale : {rich.planFootprint}
              </p>
            )}

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {rich.layoutZones.map((zone) => (
                <article
                  key={zone.zone}
                  className="rounded-2xl border border-luxury-stone bg-white p-6 shadow-luxury-sm"
                >
                  <h3 className="font-ui text-sm font-medium uppercase tracking-wider text-luxury-forest">
                    {zone.zone}
                  </h3>
                  <p className="mt-3 font-ui text-sm leading-relaxed text-luxury-muted">
                    {zone.detail}
                  </p>
                </article>
              ))}
            </div>

            {rich.planInternalMeasures && (
              <ul className="mt-8 flex flex-wrap gap-3">
                {rich.planInternalMeasures.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-luxury-stone bg-luxury-papyrus/80 px-4 py-2 font-ui text-[11px] text-luxury-muted"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Valeurs Modulia */}
      {rich.valueProps && rich.valueProps.length > 0 && (
        <section className="border-t border-luxury-stone/60 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
              Modulia
            </p>
            <h2 className="mt-2 font-serif text-3xl text-luxury-graphite">
              Nos engagements
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {rich.valueProps.map((prop) => (
                <article
                  key={prop.title}
                  className="rounded-2xl border border-luxury-stone/80 p-6 text-center transition hover:border-luxury-forest/30 hover:shadow-luxury-sm"
                >
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-luxury-forest/10">
                    <span className="h-2 w-2 rounded-full bg-luxury-forest" />
                  </div>
                  <h3 className="font-ui text-[11px] font-medium uppercase tracking-wider text-luxury-graphite">
                    {prop.title}
                  </h3>
                  <p className="mt-2 font-ui text-xs leading-relaxed text-luxury-muted">
                    {prop.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
