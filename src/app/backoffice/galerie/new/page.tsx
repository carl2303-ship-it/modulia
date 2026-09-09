import Link from "next/link";
import { redirect } from "next/navigation";
import { GalleryUploadForm } from "@/components/backoffice/GalleryUploadForm";
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

      <GalleryUploadForm />
    </div>
  );
}
