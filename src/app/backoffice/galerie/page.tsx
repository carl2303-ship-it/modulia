import Link from "next/link";
import { redirect } from "next/navigation";
import {
  deleteGalleryItemAction,
  importStaticGalleryAction,
  updateGalleryItemAction,
} from "@/app/backoffice/actions";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItemRow } from "@/lib/crm/types";

export default async function GalerieBackofficePage() {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) redirect("/backoffice");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const items = (error ? [] : data ?? []) as GalleryItemRow[];
  const tableMissing = Boolean(error);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-luxury-graphite">Galerie</h1>
          <p className="mt-2 font-ui text-sm text-luxury-muted">
            Photos et vidéos du portfolio public (/galerie)
          </p>
        </div>
        <Link
          href="/backoffice/galerie/new"
          className="rounded-full bg-luxury-forest px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-white"
        >
          Ajouter un média
        </Link>
      </div>

      {tableMissing && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 font-ui text-sm text-amber-900">
          Table <code>gallery_items</code> introuvable. Appliquez la migration{" "}
          <code>supabase/migrations/20260909140000_gallery_items.sql</code> dans
          Supabase (SQL Editor), puis rechargez cette page.
        </div>
      )}

      {!tableMissing && items.length === 0 && (
        <div className="mt-6 rounded-2xl border border-luxury-stone bg-white p-6">
          <p className="font-ui text-sm text-luxury-muted">
            Aucun élément en base. Le site public affiche encore le fallback local
            (g01–g49). Importez-les en un clic, ou ajoutez de nouveaux médias.
          </p>
          <form action={importStaticGalleryAction} className="mt-4">
            <button
              type="submit"
              className="rounded-full border border-luxury-forest px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-luxury-forest hover:bg-luxury-forest/5"
            >
              Importer g01–g49
            </button>
          </form>
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-luxury-stone bg-white"
            >
              <div className="relative aspect-[4/3] bg-luxury-stone/30">
                {item.media_type === "video" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.poster_url || item.media_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute left-3 top-3 rounded-full bg-luxury-graphite/80 px-2.5 py-1 font-ui text-[10px] uppercase tracking-wider text-white">
                  {item.media_type === "video" ? "Vidéo" : "Photo"}
                </span>
                {!item.published && (
                  <span className="absolute right-3 top-3 rounded-full bg-amber-600/90 px-2.5 py-1 font-ui text-[10px] uppercase tracking-wider text-white">
                    Brouillon
                  </span>
                )}
              </div>

              <form action={updateGalleryItemAction} className="space-y-3 p-4">
                <input type="hidden" name="id" value={item.id} />
                <label className="block">
                  <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
                    Titre
                  </span>
                  <input
                    name="title"
                    defaultValue={item.title}
                    className="mt-1 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
                  />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
                      Ordre
                    </span>
                    <input
                      name="sort_order"
                      type="number"
                      defaultValue={item.sort_order}
                      className="mt-1 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="mt-6 flex items-center gap-2 font-ui text-sm text-luxury-graphite">
                    <input
                      type="checkbox"
                      name="published"
                      defaultChecked={item.published}
                      className="rounded border-luxury-stone"
                    />
                    Publié
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    className="rounded-full bg-luxury-forest px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-white"
                  >
                    Enregistrer
                  </button>
                  <button
                    formAction={deleteGalleryItemAction}
                    type="submit"
                    className="font-ui text-[11px] uppercase tracking-wider text-red-700 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
