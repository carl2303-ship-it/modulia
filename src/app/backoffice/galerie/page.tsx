import Link from "next/link";
import { redirect } from "next/navigation";
import { importStaticGalleryAction } from "@/app/backoffice/actions";
import { GalleryManager } from "@/components/backoffice/GalleryManager";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItemRow } from "@/lib/crm/types";

const SUPABASE_SQL_URL =
  "https://supabase.com/dashboard/project/yjnkhwgfxycbdmhfdtlp/sql/new";

const STATIC_GALLERY_URLS = Array.from({ length: 49 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/galerie/g${n}.jpg`;
});

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
  const existingUrls = new Set(items.map((item) => item.media_url));
  const missingStaticCount = STATIC_GALLERY_URLS.filter(
    (url) => !existingUrls.has(url),
  ).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-luxury-graphite">Galerie</h1>
          <p className="mt-2 font-ui text-sm text-luxury-muted">
            Ajouter, réordonner et supprimer les photos / vidéos du portfolio public
          </p>
        </div>
        {!error && (
          <Link
            href="/backoffice/galerie/new"
            className="rounded-full bg-luxury-forest px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-white"
          >
            Ajouter un média
          </Link>
        )}
      </div>

      {error && (
        <div className="mt-6 space-y-4 rounded-2xl border border-amber-300 bg-amber-50 p-6">
          <p className="font-serif text-xl text-amber-950">
            Étape 1 obligatoire — créer la table Galerie
          </p>
          <p className="font-ui text-sm leading-relaxed text-amber-950/90">
            La table <code className="rounded bg-amber-100 px-1">gallery_items</code>{" "}
            n’est pas accessible. Ouvrez le{" "}
            <a
              href={SUPABASE_SQL_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-luxury-forest underline"
            >
              SQL Editor Supabase
            </a>
            , exécutez{" "}
            <code className="rounded bg-amber-100 px-1">
              20260909140000_gallery_items.sql
            </code>
            , puis rechargez.
          </p>
          <p className="font-ui text-[11px] text-amber-900/70">
            {error.code ? `${error.code} — ` : ""}
            {error.message}
          </p>
        </div>
      )}

      {!error && missingStaticCount > 0 && (
        <div className="mt-6 rounded-2xl border-2 border-luxury-forest/30 bg-white p-6">
          <p className="font-serif text-xl text-luxury-graphite">
            Importer les photos du site ({missingStaticCount} manquantes)
          </p>
          <p className="mt-2 max-w-2xl font-ui text-sm leading-relaxed text-luxury-muted">
            Vous avez déjà {items.length} média(s) en base (ex. vidéos). Ce bouton
            ajoute seulement les photos locales g01–g49 qui ne sont pas encore
            présentes, sans écraser vos vidéos.
          </p>
          <form action={importStaticGalleryAction} className="mt-5">
            <button
              type="submit"
              className="rounded-full bg-luxury-forest px-8 py-3.5 font-ui text-sm uppercase tracking-wider text-white"
            >
              Importer g01–g49 pour les gérer
            </button>
          </form>
        </div>
      )}

      {!error && items.length === 0 && missingStaticCount === 0 && (
        <p className="mt-8 font-ui text-sm text-luxury-muted">
          Aucun média. Ajoutez une photo ou une vidéo.
        </p>
      )}

      {items.length > 0 && <GalleryManager items={items} />}
    </div>
  );
}
