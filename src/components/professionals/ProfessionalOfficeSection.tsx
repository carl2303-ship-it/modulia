import Image from "next/image";
import Link from "next/link";
import { formatModelPrice, type ModelSpec } from "@/data/models";
import type { ProfessionalModel } from "@/data/professionals";

type ProfessionalOfficeSectionProps = {
  model: ProfessionalModel;
  reversed?: boolean;
};

function SpecGrid({ specs }: { specs: ModelSpec[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="rounded-2xl border border-luxury-stone/80 bg-luxury-papyrus/50 px-4 py-3"
        >
          <dt className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
            {spec.label}
          </dt>
          <dd className="mt-1 font-ui text-sm font-medium text-luxury-graphite">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ProfessionalOfficeSection({
  model,
  reversed = false,
}: ProfessionalOfficeSectionProps) {
  return (
    <section id={model.slug} className="scroll-mt-28 border-t border-luxury-stone/60 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 ${
            reversed ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="overflow-hidden rounded-3xl border border-luxury-stone bg-white p-3 shadow-luxury-sm">
            <Image
              src={model.heroImage}
              alt={`${model.name} — bureau modulaire Modulia`}
              width={1200}
              height={900}
              className="h-auto w-full rounded-2xl"
            />
          </div>

          <div>
            <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
              Professionnels
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-wide text-luxury-graphite sm:text-5xl">
              {model.name}
            </h2>
            <p className="mt-2 font-ui text-sm uppercase tracking-wider text-luxury-muted">
              {model.subtitle}
            </p>
            <p className="mt-4 font-serif text-lg italic text-luxury-muted">
              {model.tagline}
            </p>
            <p className="mt-6 font-ui text-sm leading-relaxed text-luxury-muted">
              {model.description}
            </p>

            <dl className="mt-8 flex flex-wrap gap-3">
              {[model.dimensions, model.workstations, model.height].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-luxury-stone bg-white px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-luxury-muted"
                >
                  {item}
                </span>
              ))}
            </dl>

            <p className="mt-10 font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
              À partir de
            </p>
            <p className="font-serif text-4xl text-luxury-graphite">
              {formatModelPrice(model.priceFrom)}
              <span className="ml-2 font-ui text-base text-luxury-muted">€ HT</span>
            </p>
            <p className="mt-2 font-ui text-xs text-luxury-forest">{model.priceNote}</p>

            <Link
              href={`/#contact?model=${model.slug}`}
              className="mt-8 inline-block rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-luxury-forest-dark"
            >
              Demander un devis
            </Link>
          </div>
        </div>

        {(model.interiorImage || model.bathroomImages?.length) && (
          <div className="mt-16">
            <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
              Espaces intérieurs
            </p>
            <h3 className="mt-2 font-serif text-2xl text-luxury-graphite">
              Vue intérieure & sanitaires
            </h3>
            <div className="mt-8 grid gap-4">
              {model.interiorImage && (
                <div className="overflow-hidden rounded-3xl border border-luxury-stone bg-white p-3 shadow-luxury-sm">
                  <Image
                    src={model.interiorImage}
                    alt={`Vue intérieure — ${model.name}`}
                    width={1200}
                    height={600}
                    className="h-auto w-full rounded-2xl"
                  />
                  <p className="mt-3 text-center font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                    Vue intérieure
                  </p>
                </div>
              )}
              {model.bathroomImages && model.bathroomImages.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {model.bathroomImages.map((src, index) => (
                    <div
                      key={src}
                      className="overflow-hidden rounded-3xl border border-luxury-stone bg-white p-3 shadow-luxury-sm"
                    >
                      <Image
                        src={src}
                        alt={`Salle de bains ${model.name} — vue ${index + 1}`}
                        width={500}
                        height={500}
                        className="mx-auto h-auto max-h-80 w-full rounded-2xl object-cover"
                      />
                      <p className="mt-3 text-center font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                        {index === 0 ? "WC intégré" : "Lavabo"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
              Plan
            </p>
            <h3 className="mt-2 font-serif text-2xl text-luxury-graphite">
              Agencement · {model.dimensions}
            </h3>
            <div className="mt-6 overflow-hidden rounded-3xl border border-luxury-stone bg-white p-4 shadow-luxury-sm">
              <Image
                src={model.planImage}
                alt={`Plan ${model.name}`}
                width={1000}
                height={600}
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>

          <div>
            <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
              Infrastructure
            </p>
            <h3 className="mt-2 font-serif text-2xl text-luxury-graphite">
              Réseaux & sanitaires
            </h3>
            <ul className="mt-6 space-y-3">
              {model.infrastructure.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-ui text-sm text-luxury-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-luxury-forest" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-10 font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
              Idéal pour
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {model.useCases.map((useCase) => (
                <span
                  key={useCase}
                  className="rounded-full border border-luxury-forest/20 bg-luxury-forest/5 px-4 py-2 font-ui text-[10px] uppercase tracking-wider text-luxury-forest"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
            Caractéristiques
          </p>
          <h3 className="mt-2 font-serif text-2xl text-luxury-graphite">Fiche technique</h3>
          <div className="mt-8">
            <SpecGrid specs={model.specs} />
          </div>
        </div>

        <div className="mt-12">
          <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
            Options
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {model.options.map((option) => (
              <span
                key={option}
                className="rounded-full border border-luxury-stone bg-white px-4 py-2 font-ui text-[11px] text-luxury-muted"
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
