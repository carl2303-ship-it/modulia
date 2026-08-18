import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { OptionFichaCard } from "@/components/options/OptionFichaCard";
import { SiteHeader } from "@/components/SiteHeader";
import { getLocalizedPoolModel, getLocalizedPoolOptions } from "@/data/options-catalog";
import { PoolFabricCatalog, PoolShellCatalog } from "@/components/piscine/PoolCatalogSwatches";
import { formatModelPrice } from "@/data/models";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("piscine");
  const pool = getLocalizedPoolModel(isLocale(locale) ? locale : defaultLocale);
  return {
    title: `${pool.name} | ${t("badge")} Modulia`,
    description: t("metaDescription", { price: formatModelPrice(pool.priceFrom) }),
  };
}

export default async function PiscinePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("piscine");
  const resolvedLocale = isLocale(locale) ? locale : defaultLocale;
  const pool = getLocalizedPoolModel(resolvedLocale);
  const poolOptions = getLocalizedPoolOptions(resolvedLocale);
  const poolHouse = poolOptions.find((item) => item.id === "pool-house");
  const accessoryOptions = poolOptions.filter((item) => item.id !== "pool-house");

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />

      <main className="pt-40">
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-luxury-stone bg-white p-4 shadow-luxury-sm">
            <Image
              src={pool.heroImage}
              alt={pool.name}
              width={1000}
              height={750}
              className="h-auto w-full rounded-2xl"
              priority
            />
          </div>

          <div>
            <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
              {t("badge")}
            </p>
            <h1 className="mt-4 font-serif text-4xl text-luxury-graphite sm:text-5xl">
              {pool.name}
            </h1>
            <p className="mt-4 font-serif text-lg italic text-luxury-muted">{pool.tagline}</p>
            <div className="mt-6 space-y-4 font-ui text-sm leading-relaxed text-luxury-muted">
              {pool.description.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-8 flex flex-wrap gap-3">
              {[pool.dimensions, pool.capacity].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-luxury-stone bg-white px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-luxury-muted"
                >
                  {item}
                </span>
              ))}
            </dl>

            <p className="mt-10 font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
              {t("priceLabel")}
            </p>
            <p className="font-serif text-4xl text-luxury-graphite">
              {formatModelPrice(pool.priceFrom)}
              <span className="ml-2 font-ui text-base text-luxury-muted">€ TTC</span>
            </p>

            <p className="mt-6 max-w-md font-ui text-sm leading-relaxed text-luxury-muted">
              {pool.closing}
            </p>

            <Link
              href="/#contact?model=piscine-sofa-pool"
              className="mt-8 inline-block rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-wider text-white"
            >
              {t("devis")}
            </Link>
            <p className="mt-4 font-ui text-xs text-luxury-muted">{t("contactHint")}</p>
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">{t("includedTitle")}</h2>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {pool.included.map((item) => (
                <li key={item} className="flex items-start gap-2 font-ui text-sm text-luxury-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-luxury-forest" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-serif text-2xl text-luxury-graphite">{t("highlightsTitle")}</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {pool.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-luxury-forest/20 bg-luxury-forest/5 px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-luxury-forest"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">{t("shellTitle")}</h2>
            <p className="mt-4 max-w-2xl font-ui text-sm text-luxury-muted">{t("shellIntro")}</p>
            <div className="mt-8">
              <PoolShellCatalog />
            </div>
            <Link
              href="/personnaliser?model=equilibro"
              className="mt-8 inline-block font-ui text-xs uppercase tracking-wider text-luxury-forest hover:underline"
            >
              {t("configureCta")} →
            </Link>
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">{t("fabricTitle")}</h2>
            <p className="mt-4 max-w-2xl font-ui text-sm text-luxury-muted">{t("fabricIntro")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(["fabricFeatureUv", "fabricFeatureWater", "fabricFeatureMold", "fabricFeatureWear"] as const).map(
                (key) => (
                  <span
                    key={key}
                    className="rounded-full border border-luxury-forest/20 bg-luxury-forest/5 px-3 py-1.5 font-ui text-[10px] uppercase tracking-wider text-luxury-forest"
                  >
                    {t(key)}
                  </span>
                ),
              )}
            </div>
            <div className="mt-8">
              <PoolFabricCatalog />
            </div>
          </div>
        </section>

        {poolHouse && (
          <section className="border-t border-luxury-stone/60 py-16">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start">
              <div className="overflow-hidden rounded-3xl border border-luxury-stone bg-white p-4 shadow-luxury-sm">
                <Image
                  src={poolHouse.image}
                  alt={poolHouse.title}
                  width={1000}
                  height={750}
                  className="h-auto w-full rounded-2xl"
                />
                {poolHouse.rich?.gallery && poolHouse.rich.gallery.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {poolHouse.rich.gallery.slice(1, 5).map((src) => (
                      <div key={src} className="overflow-hidden rounded-xl border border-luxury-stone/60">
                        <Image
                          src={src}
                          alt={poolHouse.title}
                          width={240}
                          height={180}
                          className="h-auto w-full"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
                  {t("badge")}
                </p>
                <h2 className="mt-4 font-serif text-3xl text-luxury-graphite sm:text-4xl">
                  {t("poolHouseTitle")}
                </h2>
                <p className="mt-4 font-ui text-sm leading-relaxed text-luxury-muted">
                  {t("poolHouseIntro")}
                </p>
                <p className="mt-4 font-ui text-sm leading-relaxed text-luxury-muted">
                  {poolHouse.description}
                </p>
                {poolHouse.highlights && (
                  <ul className="mt-6 space-y-2">
                    {poolHouse.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 font-ui text-sm text-luxury-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-luxury-forest" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-10 font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                  {t("priceLabel")}
                </p>
                <p className="font-serif text-4xl text-luxury-graphite">
                  {formatModelPrice(poolHouse.price ?? 27500)}
                  <span className="ml-2 font-ui text-base text-luxury-muted">€ TTC</span>
                </p>
                <Link
                  href="/options/pool-house"
                  className="mt-8 inline-block rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-wider text-white"
                >
                  {t("poolHouseCta")}
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">{t("optionsTitle")}</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {accessoryOptions.map((item) => (
                <OptionFichaCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
              {t("architectureLabel")}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-luxury-graphite">{t("dimensionsTitle")}</h2>
            <div className="mt-8 max-w-2xl overflow-hidden rounded-3xl border border-luxury-stone bg-white p-4">
              <Image
                src={pool.planImage}
                alt={`${t("dimensionsTitle")} ${pool.name}`}
                width={800}
                height={600}
                className="h-auto w-full rounded-2xl"
              />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pool.gallery.map((src) => (
                <div key={src} className="overflow-hidden rounded-2xl border border-luxury-stone p-2">
                  <Image src={src} alt={pool.name} width={400} height={300} className="h-auto w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <Link href="/options" className="font-ui text-xs uppercase tracking-wider text-luxury-forest hover:underline">
            ← {t("backToOptions")}
          </Link>
        </section>
      </main>
    </div>
  );
}
