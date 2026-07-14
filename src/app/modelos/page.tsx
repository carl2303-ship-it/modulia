import type { Metadata } from "next";
import Link from "next/link";
import { ModelThumbnail } from "@/components/models/ModelThumbnail";
import { SiteHeader } from "@/components/SiteHeader";
import { MODELS_PARTICULIERS, formatModelPrice } from "@/data/models";

export const metadata: Metadata = {
  title: "Modèles Particuliers | Modulia",
  description:
    "Découvrez tous les modèles Modulia pour particuliers — maisons modulaires de luxe, personnalisables et prêtes à vivre.",
};

export default function ModelosPage() {
  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-20">
        <section className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            Collection Particuliers
          </p>
          <h1 className="mt-4 font-serif text-4xl text-luxury-graphite sm:text-5xl lg:text-6xl">
            Nos modèles
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-ui text-luxury-muted">
            Chaque modèle Modulia est conçu pour s&apos;intégrer harmonieusement
            dans son environnement. Explorez les caractéristiques, les plans et
            les vues 3D de chaque maison.{" "}
            <Link href="/professionnels" className="text-luxury-forest hover:underline">
              Découvrir aussi nos bureaux professionnels →
            </Link>
          </p>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {MODELS_PARTICULIERS.map((model) => (
            <Link
              key={model.slug}
              href={`/modelos/${model.slug}`}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-white shadow-luxury-sm transition duration-500 hover:-translate-y-1 hover:shadow-luxury ${
                model.featured ? "border-luxury-forest/30 ring-1 ring-luxury-forest/20" : "border-luxury-stone"
              }`}
            >
              {model.featured && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-luxury-forest px-3 py-1 font-ui text-[10px] uppercase tracking-wider text-white">
                  Signature
                </span>
              )}

              <div className="relative aspect-[4/3] overflow-hidden bg-luxury-stone">
                <ModelThumbnail
                  src={model.images[0]?.src ?? "/logo-modulia.png"}
                  alt={model.name}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-graphite/40 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-8">
                <p className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                  {model.area} · {model.rooms}
                </p>
                <h2 className="mt-2 font-serif text-2xl tracking-wide text-luxury-graphite group-hover:text-luxury-forest transition">
                  {model.name}
                </h2>
                <p className="mt-3 flex-1 font-ui text-sm leading-relaxed text-luxury-muted">
                  {model.tagline}
                </p>
                <p className="mt-6 font-serif text-xl text-luxury-graphite">
                  dès {formatModelPrice(model.priceFrom)} €
                </p>
                <span className="mt-4 font-ui text-[11px] uppercase tracking-wider text-luxury-forest">
                  Voir le modèle →
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
