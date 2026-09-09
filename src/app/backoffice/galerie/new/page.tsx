import Link from "next/link";
import { redirect } from "next/navigation";
import { createGalleryItemAction } from "@/app/backoffice/actions";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";

export default async function NewGalleryItemPage() {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) redirect("/backoffice");

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/backoffice/galerie" className="font-ui text-xs text-luxury-muted hover:underline">
        ← Galerie
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-luxury-graphite">Ajouter un média</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        Uploadez une photo ou une vidéo, ou collez une URL publique.
      </p>

      <form
        action={createGalleryItemAction}
        encType="multipart/form-data"
        className="mt-8 space-y-4 rounded-2xl border border-luxury-stone bg-white p-6"
      >
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
            Fichier (image ou vidéo)
          </span>
          <input
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-luxury-forest/10 file:px-3 file:py-1 file:text-xs file:text-luxury-forest"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
            Ou URL (optionnel)
          </span>
          <input
            name="media_url"
            type="text"
            placeholder="https://… ou /galerie/g01.jpg"
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Titre</span>
          <input
            name="title"
            placeholder="Cuisine contemporaine"
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>

        <label className="flex items-center gap-2 font-ui text-sm text-luxury-graphite">
          <input
            type="checkbox"
            name="published"
            defaultChecked
            className="rounded border-luxury-stone"
          />
          Publier immédiatement sur /galerie
        </label>

        <button
          type="submit"
          className="rounded-full bg-luxury-forest px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-white"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
