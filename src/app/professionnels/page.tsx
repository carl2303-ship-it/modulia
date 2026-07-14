import type { Metadata } from "next";
import Link from "next/link";
import { ProfessionalOfficeSection } from "@/components/professionals/ProfessionalOfficeSection";
import { SiteHeader } from "@/components/SiteHeader";
import {
  PROFESSIONAL_MODELS,
  PROFESSIONAL_VALUE_PROPS,
} from "@/data/professionals";
import { formatModelPrice } from "@/data/models";

export const metadata: Metadata = {
  title: "Espaces Professionnels | Modulia",
  description:
    "Bureaux modulaires autonomes avec sanitaires intégrés — solutions chantier, événementiel et points de vente. Bureau 6M et 12M.",
};

export default function ProfessionnelsPage() {
  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-20">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            Collection Professionnels
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-luxury-graphite sm:text-5xl lg:text-6xl">
            Bureaux modulaires autonomes
          </h1>
          <p className="mt-6 max-w-2xl font-ui text-lg leading-relaxed text-luxury-muted">
            Espaces clé en main avec sanitaires intégrés, réseaux prêts à raccorder
            et finitions premium — pour chantiers, événements et activités
            professionnelles.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {PROFESSIONAL_MODELS.map((model) => (
              <Link
                key={model.slug}
                href={`#${model.slug}`}
                className="rounded-full border border-luxury-stone bg-white px-6 py-3 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest hover:text-luxury-forest"
              >
                {model.name} — dès {formatModelPrice(model.priceFrom)} € HT
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 bg-luxury-graphite py-14">
          <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-6 sm:grid-cols-3 lg:grid-cols-5">
            {PROFESSIONAL_VALUE_PROPS.map((prop) => (
              <div key={prop.title} className="bg-luxury-graphite px-4 py-8 text-center">
                <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-luxury-forest">
                  {prop.title}
                </p>
                <p className="mt-2 font-ui text-sm text-white/80">{prop.description}</p>
              </div>
            ))}
          </div>
        </section>

        {PROFESSIONAL_MODELS.map((model, index) => (
          <ProfessionalOfficeSection
            key={model.slug}
            model={model}
            reversed={index % 2 === 1}
          />
        ))}

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="overflow-hidden rounded-3xl bg-luxury-graphite p-10 text-center lg:p-16">
            <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-luxury-forest">
              Modulia Professionnels
            </p>
            <h2 className="mt-4 font-serif text-3xl text-white lg:text-4xl">
              Un espace clé en main pour booster vos activités
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-ui text-sm text-white/60">
              Attirez, accueillez, convainquez. Modulia s&apos;occupe du reste.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-[0.18em] text-white transition hover:bg-luxury-forest-dark"
              >
                Demander un devis
              </Link>
              <Link
                href="/modelos"
                className="rounded-full border border-white/20 px-8 py-4 font-ui text-xs uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
              >
                Voir les modèles particuliers
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
              Besoin du détail complet ?
            </p>
            <p className="mt-4 font-ui text-sm text-luxury-muted">
              Toutes les informations techniques sont présentées sur cette page en
              français. Contactez-nous pour une fiche détaillée dans votre langue.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-block rounded-full bg-luxury-forest px-8 py-3 font-ui text-xs uppercase tracking-wider text-white"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
