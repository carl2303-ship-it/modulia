import type { GalleryItemRow, GalleryMediaType } from "@/lib/crm/types";

export type GalleryDisplayItem = {
  id: string;
  src: string;
  type: GalleryMediaType;
  poster?: string;
  label: string;
};

/** Fallback local si la table gallery_items est vide / non migrée */
export const STATIC_GALLERY_FALLBACK: GalleryDisplayItem[] = Array.from(
  { length: 49 },
  (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `static-g${n}`,
      src: `/galerie/g${n}.jpg`,
      type: "image" as const,
      label: `Module ${n}`,
    };
  },
);

export function toGalleryDisplayItem(row: GalleryItemRow): GalleryDisplayItem {
  return {
    id: row.id,
    src: row.media_url,
    type: row.media_type,
    poster: row.poster_url ?? undefined,
    label: row.title || (row.media_type === "video" ? "Vidéo" : "Photo"),
  };
}
