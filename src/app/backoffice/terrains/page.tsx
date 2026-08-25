import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import {
  formatDate,
  formatEuro,
  TERRAIN_STATUS_LABELS,
  type Terrain,
} from "@/lib/crm/types";

export default async function TerrainsBackofficePage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const owner = isOwner(profile);

  let query = supabase
    .from("terrains")
    .select("*, creator:profiles!created_by(full_name, email)")
    .order("created_at", { ascending: false });

  if (!owner && profile) {
    query = query.eq("created_by", profile.id);
  }

  const { data } = await query;
  const terrains = (data ?? []) as Terrain[];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-luxury-graphite">Terrains</h1>
          <p className="mt-2 font-ui text-sm text-luxury-muted">
            Annonces IAD publiées immédiatement sur le site public
          </p>
        </div>
        <Link
          href="/backoffice/terrains/new"
          className="rounded-full bg-luxury-forest px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-white"
        >
          Ajouter un terrain
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-luxury-stone bg-white">
        <table className="min-w-full text-left font-ui text-sm">
          <thead className="border-b border-luxury-stone bg-[#faf9f7] text-[11px] uppercase tracking-wider text-luxury-muted">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Localisation</th>
              <th className="px-4 py-3">Surface</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Statut</th>
              {owner && <th className="px-4 py-3">Commercial</th>}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {terrains.map((terrain) => (
              <tr key={terrain.id} className="border-b border-luxury-stone/60 last:border-0">
                <td className="px-4 py-3 text-luxury-muted">{formatDate(terrain.created_at)}</td>
                <td className="px-4 py-3 font-medium text-luxury-graphite">{terrain.title}</td>
                <td className="px-4 py-3">{terrain.location || "—"}</td>
                <td className="px-4 py-3">
                  {terrain.area_m2 != null ? `${terrain.area_m2} m²` : "—"}
                </td>
                <td className="px-4 py-3">{formatEuro(terrain.price_ttc)}</td>
                <td className="px-4 py-3">{TERRAIN_STATUS_LABELS[terrain.status]}</td>
                {owner && (
                  <td className="px-4 py-3 text-luxury-muted">
                    {(terrain.creator as { full_name?: string } | null)?.full_name || "—"}
                  </td>
                )}
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/backoffice/terrains/${terrain.id}`}
                    className="text-luxury-forest hover:underline"
                  >
                    Éditer
                  </Link>
                </td>
              </tr>
            ))}
            {terrains.length === 0 && (
              <tr>
                <td
                  colSpan={owner ? 8 : 7}
                  className="px-4 py-10 text-center text-luxury-muted"
                >
                  Aucun terrain pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
