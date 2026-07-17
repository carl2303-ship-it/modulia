import Link from "next/link";
import { ModelGallery } from "@/components/models/ModelGallery";
import { ModelNavigation } from "@/components/models/ModelNavigation";
import { ModelPlanSection } from "@/components/models/ModelPlanSection";
import { ModelRichSections } from "@/components/models/ModelRichSections";
import { SiteHeader } from "@/components/SiteHeader";
import {
  formatModelPrice,
  getAdjacentModels,
  type ModelData,
} from "@/data/models";

type ModelDetailViewProps = {
  model: ModelData;
};

export function ModelDetailView({ model }: ModelDetailViewProps) {
  const adjacent = getAdjacentModels(model.slug);

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-20">
        {/* Breadcrumb */}
        <nav className="mx-auto max-w-7xl px-6 py-6 font-ui text-[11px] uppercase tracking-wider text-luxury-muted">
          <Link href="/" className="transition hover:text-luxury-forest">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link href="/modelos" className="transition hover:text-luxury-forest">
            Particuliers
          </Link>
          <span className="mx-2">/</span>
          <span className="text-luxury-graphite">{model.name}</span>
        </nav>

        {/* Hero: galeria + info */}
        <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 lg:grid-cols-2 lg:items-start lg:gap-16">
          <ModelGallery images={model.images} modelName={model.name} />

          <div className="lg:pt-4">
            <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
              Particuliers
            </p>
            <h1 className="mt-3 font-serif text-4xl tracking-[0.12em] text-luxury-graphite sm:text-5xl">
              {model.name}
            </h1>
            <p className="mt-4 font-serif text-lg italic leading-relaxed text-luxury-muted">
              {model.tagline}
            </p>
            {model.rich?.introSubline && (
              <p className="mt-2 font-serif text-base italic text-luxury-muted/80">
                {model.rich.introSubline}
              </p>
            )}
            <p className="mt-6 font-ui text-sm leading-relaxed text-luxury-muted">
              {model.description}
            </p>

            <dl className="mt-8 flex flex-wrap gap-3">
              {[model.area, model.rooms, model.capacity].map((item) => (
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
              <span className="ml-2 font-ui text-base text-luxury-muted">€ TTC</span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {model.configuratorUrl ? (
                <Link
                  href={model.configuratorUrl}
                  className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-luxury-forest-dark"
                >
                  Personnaliser
                </Link>
              ) : (
                <Link
                  href={`/#contact?model=${model.slug}`}
                  className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-luxury-forest-dark"
                >
                  Demander un devis
                </Link>
              )}
              <Link
                href="/#contact"
                className="rounded-full border border-luxury-stone bg-white px-8 py-4 font-ui text-xs font-medium uppercase tracking-[0.18em] text-luxury-graphite transition hover:border-luxury-graphite"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>

        {/* Características técnicas */}
        <section className="border-t border-luxury-stone/60 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
              Fiche technique
            </p>
            <h2 className="mt-2 font-serif text-3xl text-luxury-graphite">
              Caractéristiques
            </h2>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {model.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-2xl border border-luxury-stone/80 bg-luxury-papyrus/50 px-5 py-4"
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

            <div className="mt-10 flex flex-wrap gap-2">
              {model.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-luxury-forest/20 bg-luxury-forest/5 px-4 py-2 font-ui text-[10px] uppercase tracking-wider text-luxury-forest"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </section>

        {model.rich && <ModelRichSections rich={model.rich} />}

        {/* Planta */}        <div className="mx-auto max-w-7xl px-6">
          <ModelPlanSection
            planImage={model.planImage}
            planLabel={model.planLabel}
            modelName={model.name}
          />
        </div>

        {/* CTA final */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="overflow-hidden rounded-3xl bg-luxury-graphite p-10 text-center lg:p-16">
            <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-luxury-forest">
              Modulia
            </p>
            <h2 className="mt-4 font-serif text-3xl text-white lg:text-4xl">
              Prêt à concrétiser votre projet {model.name}?
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-ui text-sm text-white/60">
              {model.rich?.closingTagline ??
                "Notre équipe vous accompagne de la conception à l'installation."}
            </p>            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {model.configuratorUrl && (
                <Link
                  href={model.configuratorUrl}
                  className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-[0.18em] text-white transition hover:bg-luxury-forest-dark"
                >
                  Personnaliser en ligne
                </Link>
              )}
              <Link
                href="/#contact"
                className="rounded-full border border-white/20 px-8 py-4 font-ui text-xs uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </section>

        {adjacent && (
          <ModelNavigation previous={adjacent.previous} next={adjacent.next} />
        )}
      </main>
    </div>
  );
}
