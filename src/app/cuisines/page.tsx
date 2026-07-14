import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OptionFichaCard } from "@/components/options/OptionFichaCard";
import { SiteHeader } from "@/components/SiteHeader";
import {
  KITCHEN_APPLIANCES,
  KITCHEN_BASE,
  KITCHEN_OPTIONS,
} from "@/data/options-catalog";

export const metadata: Metadata = {
  title: "Cuisines Modulia | Options & Configurations",
  description:
    "Cuisine compacte incluse dans tous les modules — options Premium, Rangement et Buanderie.",
};

export default function CuisinesPage() {
  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-20">
        <section className="mx-auto max-w-7xl px-6 py-16 lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
              Cuisine Modulia
            </p>
            <h1 className="mt-4 font-serif text-4xl text-luxury-graphite sm:text-5xl">
              {KITCHEN_BASE.title}
            </h1>
            <p className="mt-4 font-serif text-lg italic text-luxury-muted">
              {KITCHEN_BASE.tagline}
            </p>
            <p className="mt-6 font-ui text-sm leading-relaxed text-luxury-muted">
              {KITCHEN_BASE.description}
            </p>
            <span className="mt-6 inline-block rounded-full bg-luxury-forest px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-white">
              Incluse — aucun supplément
            </span>
            <p className="mt-4 font-ui text-sm text-luxury-muted">
              Dimensions : {KITCHEN_BASE.dimensions}
            </p>
            <ul className="mt-6 space-y-2">
              {KITCHEN_BASE.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 font-ui text-sm text-luxury-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-luxury-forest" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-luxury-stone bg-white p-4 shadow-luxury-sm lg:mt-0">
            <Image
              src={KITCHEN_BASE.image}
              alt="Cuisine Modulia de base"
              width={900}
              height={700}
              className="h-auto w-full rounded-2xl"
              priority
            />
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">Galerie</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {KITCHEN_BASE.gallery.map((src) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-2xl border border-luxury-stone bg-white p-3"
                >
                  <Image src={src} alt="Cuisine Modulia" width={500} height={400} className="h-auto w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">Options & configurations</h2>
            <p className="mt-2 font-ui text-sm text-luxury-muted">
              Modules complémentaires pour équiper votre cuisine selon vos besoins.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {KITCHEN_OPTIONS.map((item) => (
                <OptionFichaCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">Électroménager</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {KITCHEN_APPLIANCES.map((item) => (
                <OptionFichaCard key={item.id} item={item} />
              ))}
            </div>
            <div className="mt-10 overflow-hidden rounded-3xl border border-luxury-stone bg-white p-4">
              <Image
                src="/cozinhas/cozinhas com precos opcoes.jpg"
                alt="Fiche cuisines et prix"
                width={1200}
                height={900}
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <Link
            href="/options"
            className="font-ui text-xs uppercase tracking-wider text-luxury-forest hover:underline"
          >
            ← Toutes les options
          </Link>
        </section>
      </main>
    </div>
  );
}
