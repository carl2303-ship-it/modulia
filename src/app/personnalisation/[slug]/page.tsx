import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { OptionDetailView } from "@/components/options/OptionDetailView";
import { SiteHeader } from "@/components/SiteHeader";
import { getFinitionById, getFinitionSlugs } from "@/data/options-catalog";
import { defaultLocale, isLocale } from "@/i18n/config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getFinitionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getTranslations("personnalisation");
  const item = getFinitionById(slug, locale);
  if (!item) return { title: `${t("title")} | Modulia` };

  return {
    title: `${item.title} | ${t("title")} Modulia`,
    description: item.rich?.intro ?? item.description,
  };
}

export default async function PersonnalisationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getTranslations("personnalisation");
  const item = getFinitionById(slug, locale);
  if (!item) notFound();

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />
      <main className="pt-20">
        <OptionDetailView
          option={item}
          listPath="/personnalisation"
          listLabel={t("title")}
        />
      </main>
    </div>
  );
}
