import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/SiteHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("galerie");
  return {
    title: `${t("title")} | Modulia`,
    description: t("intro"),
  };
}

export default async function GaleriePage() {
  const t = await getTranslations("galerie");

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
          <GalleryGrid />
        </section>
      </main>
    </div>
  );
}
