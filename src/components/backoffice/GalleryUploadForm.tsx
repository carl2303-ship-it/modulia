"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createGalleryItemAction } from "@/app/backoffice/actions";
import { createClient } from "@/lib/supabase/client";

const MAX_BYTES = 100 * 1024 * 1024;

export function GalleryUploadForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setProgress(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("file");
    let mediaUrl = String(formData.get("media_url") ?? "").trim();
    let mediaType = "image";

    try {
      if (file instanceof File && file.size > 0) {
        if (file.size > MAX_BYTES) {
          setError("Fichier trop volumineux (max. 100 Mo).");
          return;
        }

        mediaType = file.type.startsWith("video/") ? "video" : "image";
        const ext =
          file.name.split(".").pop()?.toLowerCase() ||
          (mediaType === "video" ? "mp4" : "jpg");
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        setProgress("Upload en cours…");
        const supabase = createClient();
        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(path, file, {
            contentType: file.type || undefined,
            upsert: false,
          });
        if (uploadError) throw new Error(uploadError.message);

        const { data: publicData } = supabase.storage
          .from("gallery")
          .getPublicUrl(path);
        mediaUrl = publicData.publicUrl;
      } else if (mediaUrl) {
        const lower = mediaUrl.toLowerCase();
        if (/\.(mp4|webm|mov)(\?|$)/.test(lower) || lower.includes("video")) {
          mediaType = "video";
        }
      } else {
        setError("Ajoutez un fichier ou une URL.");
        return;
      }

      setProgress("Enregistrement…");

      const payload = new FormData();
      payload.set("title", String(formData.get("title") ?? ""));
      payload.set("media_url", mediaUrl);
      payload.set("media_type", mediaType);
      if (formData.get("published")) {
        payload.set("published", "on");
      }

      startTransition(() => {
        void createGalleryItemAction(payload)
          .then(() => {
            router.push("/backoffice/galerie");
            router.refresh();
          })
          .catch((err: unknown) => {
            setError(err instanceof Error ? err.message : "Erreur d’enregistrement");
            setProgress(null);
          });
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d’upload");
      setProgress(null);
    }
  }

  const busy = pending || Boolean(progress);

  return (
    <form
      onSubmit={onSubmit}
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
          disabled={busy}
          className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-luxury-forest/10 file:px-3 file:py-1 file:text-xs file:text-luxury-forest"
        />
        <span className="mt-1 block font-ui text-[11px] text-luxury-muted">
          Max. 100 Mo — upload direct vers Supabase
        </span>
      </label>

      <label className="block">
        <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
          Ou URL (optionnel)
        </span>
        <input
          name="media_url"
          type="text"
          placeholder="https://… ou /galerie/g01.jpg"
          disabled={busy}
          className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
        />
      </label>

      <label className="block">
        <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Titre</span>
        <input
          name="title"
          placeholder="Cuisine contemporaine"
          disabled={busy}
          className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
        />
      </label>

      <label className="flex items-center gap-2 font-ui text-sm text-luxury-graphite">
        <input
          type="checkbox"
          name="published"
          defaultChecked
          disabled={busy}
          className="rounded border-luxury-stone"
        />
        Publier immédiatement sur /galerie
      </label>

      {progress && (
        <p className="font-ui text-sm text-luxury-forest">{progress}</p>
      )}
      {error && <p className="font-ui text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="rounded-full bg-luxury-forest px-5 py-2.5 font-ui text-xs uppercase tracking-wider text-white disabled:opacity-60"
      >
        {busy ? "Patientez…" : "Enregistrer"}
      </button>
    </form>
  );
}
