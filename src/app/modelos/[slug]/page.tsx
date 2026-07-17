import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ModelDetailView } from "@/components/models/ModelDetailView";
import { getAllModelSlugs, getModelBySlug } from "@/data/models";
import { defaultLocale, isLocale } from "@/i18n/config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllModelSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const model = getModelBySlug(slug, locale);
  if (!model) {
    const t = await getTranslations("modelDetail");
    return { title: t("notFound") };
  }

  return {
    title: `${model.name} | Modulia`,
    description: model.description,
    openGraph: {
      title: `${model.name} | Modulia`,
      description: model.tagline,
      images: model.images[0] ? [{ url: model.images[0].src }] : [],
    },
  };
}

export default async function ModelPage({ params }: PageProps) {
  const { slug } = await params;
  const raw = await getLocale();
  const locale = isLocale(raw) ? raw : defaultLocale;
  const model = getModelBySlug(slug, locale);

  if (!model) notFound();

  return <ModelDetailView model={model} locale={locale} />;
}
