import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { OptionDetailView } from "@/components/options/OptionDetailView";
import { SiteHeader } from "@/components/SiteHeader";
import { getPaidOptionById, getPaidOptionSlugs } from "@/data/options-catalog";
import { defaultLocale, isLocale } from "@/i18n/config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPaidOptionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getTranslations("options");
  const option = getPaidOptionById(slug, locale);
  if (!option) return { title: `${t("title")} | Modulia` };

  return {
    title: `${option.title} | ${t("title")} Modulia`,
    description: option.rich?.intro ?? option.description,
  };
}

export default async function OptionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = await getTranslations("options");
  const option = getPaidOptionById(slug, locale);
  if (!option) notFound();

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />
      <main className="pt-20">
        <OptionDetailView option={option} listPath="/options" listLabel={t("title")} />
      </main>
    </div>
  );
}
