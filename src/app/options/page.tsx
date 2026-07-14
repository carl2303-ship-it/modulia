import type { Metadata } from "next";
import Link from "next/link";
import { OptionFichaCard } from "@/components/options/OptionFichaCard";
import { SiteHeader } from "@/components/SiteHeader";
import { OPTION_CATEGORIES, getAllCatalogOptions } from "@/data/options-catalog";

export const metadata: Metadata = {
  title: "Options & Personnalisation | Modulia",
  description:
    "Découvrez toutes les options Modulia — finitions, équipements, terrasses, raccordements et plus.",
};

export default function OptionsPage() {
  const optionsById = Object.fromEntries(
    getAllCatalogOptions().map((option) => [option.id, option]),
  );

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-20">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            Personnalisation
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-luxury-graphite sm:text-5xl">
            Options & finitions
          </h1>
          <p className="mt-6 max-w-2xl font-ui text-luxury-muted">
            Personnalisez votre module Modulia avec nos finitions, équipements et
            services. Configurez en ligne{" "}
            <Link href="/modelos" className="text-luxury-forest hover:underline">
              tous nos modèles
            </Link>{" "}
            ou demandez un devis personnalisé.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cuisines"
              className="rounded-full border border-luxury-stone bg-white px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest"
            >
              Cuisines →
            </Link>
            <Link
              href="/piscine"
              className="rounded-full border border-luxury-stone bg-white px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest"
            >
              Piscine →
            </Link>
          </div>
        </section>

        {OPTION_CATEGORIES.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="scroll-mt-28 border-t border-luxury-stone/60 py-16"
          >
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="font-serif text-3xl text-luxury-graphite">{category.title}</h2>
              {category.subtitle && (
                <p className="mt-2 font-ui text-sm text-luxury-muted">{category.subtitle}</p>
              )}
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <OptionFichaCard key={item.id} item={optionsById[item.id]} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl bg-luxury-graphite p-10 text-center lg:p-16">
            <h2 className="font-serif text-3xl text-white">Prêt à personnaliser ?</h2>
            <p className="mx-auto mt-4 max-w-lg font-ui text-sm text-white/60">
              Configurez en ligne tous nos modèles ou contactez notre équipe pour un projet sur mesure.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/modelos"
                className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-wider text-white"
              >
                Voir les modèles
              </Link>              <Link
                href="/#contact"
                className="rounded-full border border-white/20 px-8 py-4 font-ui text-xs uppercase tracking-wider text-white"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
