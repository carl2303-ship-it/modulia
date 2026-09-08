export type GalleryItem = {
  id: string;
  src: string;
  /** Clé i18n dans messages.galerie.items.* */
  labelKey: string;
};

/** Photos exclusives de la galerie Modulia */
export const GALLERY_ITEMS: GalleryItem[] = Array.from({ length: 27 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `g${n}`,
    src: `/galerie/g${n}.jpg`,
    labelKey: `g${n}`,
  };
});
