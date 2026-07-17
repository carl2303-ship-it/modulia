import type { Metadata } from "next";
import Link from "next/link";
import { KitchenSectionView } from "@/components/kitchens/KitchenSectionView";
import { SiteHeader } from "@/components/SiteHeader";
import {
  KITCHEN_APPLIANCE_SECTIONS,
  KITCHEN_BASE_CONTENT,
  KITCHEN_OPTION_SECTIONS,
} from "@/data/kitchen-content";

export const metadata: Metadata = {
  title: "Cuisines Modulia | Configuration de base & options",
  description:
    "Cuisine compacte incluse dans tous les modules — options Premium, Rangement, Buanderie, contemporaine et arrière cuisine.",
};

const CONFIG_OPTIONS = KITCHEN_OPTION_SECTIONS.filter((s) =>
  ["cuisine-premium", "cuisine-rangement", "cuisine-buanderie", "complement-cuisine"].includes(
    s.id,
  ),
);

const SUR_MESURE_OPTIONS = KITCHEN_OPTION_SECTIONS.filter((s) => s.id === "cuisine-contemporaine");

const APPLIANCE_BASE = KITCHEN_APPLIANCE_SECTIONS.find((s) => s.id === "electro-base");
const APPLIANCE_OPTION = KITCHEN_APPLIANCE_SECTIONS.find((s) => s.id === "electro-option");

export default function CuisinesPage() {
  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-20">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            Cuisine Modulia
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-luxury-graphite sm:text-5xl">
            Cuisines
          </h1>
          <p className="mt-6 max-w-2xl font-ui text-luxury-muted">
            Configuration de base incluse dans tous les modules, avec des options
            complémentaires pour adapter votre espace cuisine à vos besoins.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/options"
              className="rounded-full border border-luxury-stone bg-white px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest"
            >
              Options →
            </Link>
            <Link
              href="/personnalisation"
              className="rounded-full border border-luxury-stone bg-white px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest"
            >
              Personnalisation →
            </Link>
          </div>
        </section>

        <KitchenSectionView section={KITCHEN_BASE_CONTENT} />

        {APPLIANCE_BASE && <KitchenSectionView section={APPLIANCE_BASE} />}

        <section className="border-t border-luxury-stone/60 bg-white/40 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">
              Options & configurations
            </h2>
            <p className="mt-2 font-ui text-sm text-luxury-muted">
              Modules complémentaires pour équiper votre cuisine selon vos besoins.
            </p>
          </div>
        </section>

        {APPLIANCE_OPTION && <KitchenSectionView section={APPLIANCE_OPTION} />}

        {CONFIG_OPTIONS.map((section) => (
          <KitchenSectionView key={section.id} section={section} />
        ))}

        <section className="border-t border-luxury-stone/60 bg-white/40 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">
              Options sur mesure
            </h2>
            <p className="mt-2 font-ui text-sm text-luxury-muted">
              Cuisine contemporaine au mètre linéaire — design sur mesure.
            </p>
          </div>
        </section>

        {SUR_MESURE_OPTIONS.map((section) => (
          <KitchenSectionView key={section.id} section={section} />
        ))}

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl bg-luxury-graphite p-10 text-center lg:p-16">
            <h2 className="font-serif text-3xl text-white">Configurer votre cuisine</h2>
            <p className="mx-auto mt-4 max-w-lg font-ui text-sm text-white/60">
              Choisissez votre modèle et composez la cuisine adaptée à votre projet.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/modelos"
                className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-wider text-white"
              >
                Voir les modèles
              </Link>
              <Link
                href="/#contact"
                className="rounded-full border border-white/20 px-8 py-4 font-ui text-xs uppercase tracking-wider text-white"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <Link
            href="/options"
            className="font-ui text-xs uppercase tracking-wider text-luxury-forest hover:underline"
          >
            ← Options
          </Link>
        </section>
      </main>
    </div>
  );
}
