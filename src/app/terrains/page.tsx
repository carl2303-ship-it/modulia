import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/SiteHeader";
import { createClient } from "@/lib/supabase/server";
import { formatEuro, type Terrain } from "@/lib/crm/types";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("terrains");
  return {
    title: `${t("title")} | Modulia`,
    description: t("intro"),
  };
}

export default async function TerrainsPublicPage() {
  const t = await getTranslations("terrains");
  const tCommon = await getTranslations("common");
  const supabase = await createClient();

  const { data } = await supabase
    .from("terrains")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const terrains = (data ?? []) as Terrain[];

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-40">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-luxury-graphite sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl font-ui text-lg leading-relaxed text-luxury-muted">
            {t("intro")}
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {terrains.map((terrain) => (
              <article
                key={terrain.id}
                className="overflow-hidden rounded-3xl border border-luxury-stone bg-white"
              >
                <div className="relative aspect-[4/3] bg-luxury-stone/40">
                  {terrain.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={terrain.image_url}
                      alt={terrain.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                        Modulia
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="font-ui text-[10px] uppercase tracking-wider text-luxury-forest">
                    {terrain.location}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-luxury-graphite">{terrain.title}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {terrain.area_m2 != null && (
                      <span className="rounded-full border border-luxury-stone px-3 py-1 font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                        {terrain.area_m2} m²
                      </span>
                    )}
                    {terrain.price_ttc != null && terrain.price_ttc > 0 && (
                      <span className="rounded-full border border-luxury-stone px-3 py-1 font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                        {formatEuro(terrain.price_ttc)} {tCommon("ttc")}
                      </span>
                    )}
                  </div>
                  {terrain.description && (
                    <p className="mt-4 line-clamp-3 font-ui text-sm leading-relaxed text-luxury-muted">
                      {terrain.description}
                    </p>
                  )}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={terrain.listing_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-luxury-graphite px-5 py-2.5 font-ui text-[11px] uppercase tracking-wider text-white hover:bg-luxury-forest"
                    >
                      {t("seeListing")}
                    </a>
                    <Link
                      href={`/personnaliser`}
                      className="rounded-full border border-luxury-stone px-5 py-2.5 font-ui text-[11px] uppercase tracking-wider text-luxury-graphite hover:border-luxury-forest hover:text-luxury-forest"
                    >
                      {t("configureHouse")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {terrains.length === 0 && (
            <p className="mt-16 font-ui text-sm text-luxury-muted">{t("empty")}</p>
          )}
        </section>
      </main>
    </div>
  );
}
