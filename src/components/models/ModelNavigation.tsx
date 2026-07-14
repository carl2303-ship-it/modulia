import Link from "next/link";
import { ModelThumbnail } from "@/components/models/ModelThumbnail";
import type { ModelNavItem } from "@/data/models";

type ModelNavigationProps = {
  previous: ModelNavItem;
  next: ModelNavItem;
};

function NavCard({
  model,
  direction,
}: {
  model: ModelNavItem;
  direction: "previous" | "next";
}) {
  const isPrevious = direction === "previous";

  return (
    <Link
      href={`/modelos/${model.slug}`}
      className={`group flex flex-1 items-stretch overflow-hidden rounded-2xl border border-luxury-stone bg-white shadow-luxury-sm transition duration-500 hover:-translate-y-0.5 hover:border-luxury-forest/30 hover:shadow-luxury ${
        isPrevious ? "flex-row" : "flex-row-reverse text-right"
      }`}
    >
      <div className="relative aspect-[4/3] w-36 shrink-0 overflow-hidden bg-luxury-stone sm:w-44 lg:w-52">
        <ModelThumbnail
          src={model.image}
          alt={model.name}
          sizes="(max-width: 640px) 144px, 208px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-graphite/30 to-transparent" />
      </div>

      <div
        className={`flex flex-1 flex-col justify-center px-5 py-4 sm:px-6 ${
          isPrevious ? "items-start" : "items-end"
        }`}
      >
        <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
          {isPrevious ? "Modèle précédent" : "Modèle suivant"}
        </p>
        <p className="mt-2 font-serif text-xl tracking-wide text-luxury-graphite transition group-hover:text-luxury-forest sm:text-2xl">
          {model.name}
        </p>
        <p className="mt-1 hidden font-ui text-xs leading-relaxed text-luxury-muted sm:line-clamp-2">
          {model.tagline}
        </p>
        <span
          className={`mt-3 font-ui text-[11px] uppercase tracking-wider text-luxury-forest ${
            isPrevious ? "" : "flex flex-row-reverse items-center gap-1"
          }`}
        >
          {isPrevious ? "← Voir le modèle" : "Voir le modèle →"}
        </span>
      </div>
    </Link>
  );
}

export function ModelNavigation({ previous, next }: ModelNavigationProps) {
  return (
    <section className="border-t border-luxury-stone/60 bg-luxury-papyrus py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-muted">
          Explorer la collection
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <NavCard model={previous} direction="previous" />
          <NavCard model={next} direction="next" />
        </div>
      </div>
    </section>
  );
}
