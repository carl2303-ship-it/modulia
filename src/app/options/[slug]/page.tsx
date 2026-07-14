import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OptionDetailView } from "@/components/options/OptionDetailView";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllCatalogOptions, getOptionById } from "@/data/options-catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCatalogOptions().map((option) => ({ slug: option.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const option = getOptionById(slug);
  if (!option) return { title: "Option | Modulia" };

  return {
    title: `${option.title} | Options Modulia`,
    description: option.rich?.intro ?? option.description,
  };
}

export default async function OptionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const option = getOptionById(slug);
  if (!option) notFound();

  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <SiteHeader variant="light" />
      <main className="pt-20">
        <OptionDetailView option={option} />
      </main>
    </div>
  );
}
