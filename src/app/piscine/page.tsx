import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OptionFichaCard } from "@/components/options/OptionFichaCard";
import { SiteHeader } from "@/components/SiteHeader";
import { POOL_MODEL, POOL_OPTIONS } from "@/data/options-catalog";
import { formatModelPrice } from "@/data/models";

export const metadata: Metadata = {
  title: "Sofa Pool | Piscine Modulaire Modulia",
  description:
    "Piscine modulaire Sofa Pool — 9 450 € TTC clé en main. Compacte, élégante, sans terrassement.",
};

export default function PiscinePage() {
  const pool = POOL_MODEL;

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-20">
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-luxury-stone bg-white p-4 shadow-luxury-sm">
            <Image
              src={pool.heroImage}
              alt={pool.name}
              width={1000}
              height={750}
              className="h-auto w-full rounded-2xl"
              priority
            />
          </div>

          <div>
            <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
              Piscine modulaire
            </p>
            <h1 className="mt-4 font-serif text-4xl text-luxury-graphite sm:text-5xl">
              {pool.name}
            </h1>
            <p className="mt-4 font-serif text-lg italic text-luxury-muted">{pool.tagline}</p>
            <p className="mt-6 font-ui text-sm leading-relaxed text-luxury-muted">
              {pool.description}
            </p>

            <dl className="mt-8 flex flex-wrap gap-3">
              {[pool.dimensions, pool.capacity].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-luxury-stone bg-white px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-luxury-muted"
                >
                  {item}
                </span>
              ))}
            </dl>

            <p className="mt-10 font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
              Prix clé en main
            </p>
            <p className="font-serif text-4xl text-luxury-graphite">
              {formatModelPrice(pool.priceFrom)}
              <span className="ml-2 font-ui text-base text-luxury-muted">€ TTC</span>
            </p>

            <Link
              href="/#contact?model=piscine-sofa-pool"
              className="mt-8 inline-block rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-wider text-white"
            >
              Demander un devis
            </Link>
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">Points forts</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {pool.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-luxury-forest/20 bg-luxury-forest/5 px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-luxury-forest"
                >
                  {h}
                </span>
              ))}
            </div>

            <h3 className="mt-12 font-ui text-sm font-medium uppercase tracking-wider text-luxury-muted">
              Équipements inclus
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {pool.included.map((item) => (
                <li key={item} className="flex items-start gap-2 font-ui text-sm text-luxury-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-luxury-forest" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">Options</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {POOL_OPTIONS.map((item) => (
                <OptionFichaCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
              Architecture
            </p>
            <h2 className="mt-2 font-serif text-3xl text-luxury-graphite">Dimensions</h2>
            <div className="mt-8 max-w-2xl overflow-hidden rounded-3xl border border-luxury-stone bg-white p-4">
              <Image
                src={pool.planImage}
                alt="Dimensions Sofa Pool"
                width={800}
                height={600}
                className="h-auto w-full rounded-2xl"
              />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pool.gallery.map((src) => (
                <div key={src} className="overflow-hidden rounded-2xl border border-luxury-stone p-2">
                  <Image src={src} alt={pool.name} width={400} height={300} className="h-auto w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <Link href="/options" className="font-ui text-xs uppercase tracking-wider text-luxury-forest hover:underline">
            ← Toutes les options
          </Link>
        </section>
      </main>
    </div>
  );
}
