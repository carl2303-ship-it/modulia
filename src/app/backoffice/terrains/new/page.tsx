import Link from "next/link";
import { createTerrainAction } from "@/app/backoffice/actions";

export default function NewTerrainPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/backoffice/terrains" className="font-ui text-xs text-luxury-muted hover:underline">
        ← Terrains
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-luxury-graphite">Ajouter un terrain</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        Collez le lien IAD Portugal. Le terrain est publié immédiatement sur le site.
      </p>

      <form action={createTerrainAction} className="mt-8 space-y-4 rounded-2xl border border-luxury-stone bg-white p-6">
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
            Lien annonce IAD *
          </span>
          <input
            name="listing_url"
            type="url"
            required
            placeholder="https://www.iadportugal.pt/anuncio/terreno-venda-…/r985363"
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Titre</span>
          <input
            name="title"
            placeholder="Terreno Conceição 250 m²"
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
            Localisation *
          </span>
          <input
            name="location"
            required
            placeholder="Conceição, Faro"
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
              Surface (m²)
            </span>
            <input
              name="area_m2"
              type="number"
              step="0.01"
              min="0"
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
              Prix TTC (€)
            </span>
            <input
              name="price_ttc"
              type="number"
              step="1"
              min="0"
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
            URL image (optionnel)
          </span>
          <input
            name="image_url"
            type="url"
            placeholder="https://…"
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
            Description courte
          </span>
          <textarea
            name="description"
            rows={3}
            placeholder="Idéal pour une maison Modulia…"
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>

        <button
          type="submit"
          className="rounded-full bg-luxury-forest px-6 py-2.5 font-ui text-xs uppercase tracking-wider text-white"
        >
          Publier sur le site
        </button>
      </form>
    </div>
  );
}
