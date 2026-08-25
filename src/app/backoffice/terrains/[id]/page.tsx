import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { updateTerrainAction } from "@/app/backoffice/actions";
import {
  formatDate,
  TERRAIN_STATUS_LABELS,
  type Terrain,
  type TerrainStatus,
} from "@/lib/crm/types";

type PageProps = { params: Promise<{ id: string }> };

export default async function TerrainDetailPage({ params }: PageProps) {
  const { id } = await params;
  const profile = await getCurrentProfile();
  const owner = isOwner(profile);
  const supabase = await createClient();

  const { data } = await supabase
    .from("terrains")
    .select("*, creator:profiles!created_by(full_name, email)")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();
  const terrain = data as Terrain;

  if (!owner && terrain.created_by !== profile?.id) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/backoffice/terrains" className="font-ui text-xs text-luxury-muted hover:underline">
        ← Terrains
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-luxury-graphite">{terrain.title}</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        {TERRAIN_STATUS_LABELS[terrain.status]} · {formatDate(terrain.created_at)}
        {owner && terrain.creator
          ? ` · ${(terrain.creator as { full_name?: string }).full_name || ""}`
          : ""}
      </p>

      <p className="mt-4">
        <a
          href={terrain.listing_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-ui text-sm text-luxury-forest hover:underline"
        >
          Voir l&apos;annonce IAD →
        </a>
      </p>

      <form action={updateTerrainAction} className="mt-8 space-y-4 rounded-2xl border border-luxury-stone bg-white p-6">
        <input type="hidden" name="id" value={terrain.id} />

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
            Lien annonce IAD *
          </span>
          <input
            name="listing_url"
            type="url"
            required
            defaultValue={terrain.listing_url}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Titre *</span>
          <input
            name="title"
            required
            defaultValue={terrain.title}
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
            defaultValue={terrain.location}
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
              defaultValue={terrain.area_m2 ?? ""}
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
              defaultValue={terrain.price_ttc ?? ""}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">URL image</span>
          <input
            name="image_url"
            type="url"
            defaultValue={terrain.image_url ?? ""}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Description</span>
          <textarea
            name="description"
            rows={3}
            defaultValue={terrain.description ?? ""}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Statut</span>
          <select
            name="status"
            defaultValue={terrain.status}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          >
            {(Object.keys(TERRAIN_STATUS_LABELS) as TerrainStatus[]).map((key) => (
              <option key={key} value={key}>
                {TERRAIN_STATUS_LABELS[key]}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="rounded-full bg-luxury-forest px-6 py-2.5 font-ui text-xs uppercase tracking-wider text-white"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
