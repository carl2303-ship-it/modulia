import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OptionDetailView } from "@/components/options/OptionDetailView";
import { SiteHeader } from "@/components/SiteHeader";
import { getFinitionById, getFinitionSlugs } from "@/data/options-catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getFinitionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getFinitionById(slug);
  if (!item) return { title: "Personnalisation | Modulia" };

  return {
    title: `${item.title} | Personnalisation Modulia`,
    description: item.rich?.intro ?? item.description,
  };
}

export default async function PersonnalisationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getFinitionById(slug);
  if (!item) notFound();

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />
      <main className="pt-20">
        <OptionDetailView option={item} listPath="/personnalisation" listLabel="Personnalisation" />
      </main>
    </div>
  );
}
