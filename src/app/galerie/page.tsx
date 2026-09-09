import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/SiteHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import {
  STATIC_GALLERY_FALLBACK,
  toGalleryDisplayItem,
} from "@/data/gallery";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItemRow } from "@/lib/crm/types";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("galerie");
  return {
    title: `${t("title")} | Modulia`,
    description: t("intro"),
  };
}

async function loadGalleryItems() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return STATIC_GALLERY_FALLBACK;
    }

    return (data as GalleryItemRow[]).map(toGalleryDisplayItem);
  } catch {
    return STATIC_GALLERY_FALLBACK;
  }
}

export default async function GaleriePage() {
  const t = await getTranslations("galerie");
  const items = await loadGalleryItems();

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-36 sm:pt-40">
        <section className="mx-auto max-w-7xl px-6 pb-6 pt-10 sm:pt-14">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl tracking-wide text-luxury-graphite sm:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl font-ui text-base leading-relaxed text-luxury-muted sm:text-lg">
            {t("intro")}
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 pt-8">
          <GalleryGrid items={items} />
        </section>
      </main>
    </div>
  );
}
