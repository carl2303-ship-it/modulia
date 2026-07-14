import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModelDetailView } from "@/components/models/ModelDetailView";
import {
  getAllModelSlugs,
  getModelBySlug,
} from "@/data/models";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllModelSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) return { title: "Modèle introuvable" };

  return {
    title: `${model.name} | Modulia — Maisons Modulaires`,
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
  const model = getModelBySlug(slug);

  if (!model) notFound();

  return <ModelDetailView model={model} />;
}
