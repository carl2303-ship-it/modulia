"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ModelData } from "@/data/models";

type ModelVisualProps = {
  model: ModelData | null;
};

/** Visuel sticky à gauche — modèle entier visible, sous le header */
export function ModelVisual({ model }: ModelVisualProps) {
  const t = useTranslations("personnaliser");
  const image = model?.images[0]?.src ?? "/logo-modulia.png";
  const alt = model?.images[0]?.alt ?? "Modulia";

  return (
    <aside className="relative hidden w-[65%] shrink-0 lg:sticky lg:top-20 lg:block lg:h-[calc(100vh-5rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#f7f3eb_0%,_#e5ddd0_100%)]" />
      {model ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center px-10 pb-36 pt-12">
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={alt}
                fill
                priority
                className="object-contain object-center"
                sizes="65vw"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-luxury-graphite/75 via-luxury-graphite/30 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-white/70">
              Modulia
            </p>
            <h2 className="mt-2 font-serif text-4xl tracking-wide text-white">
              {model.name}
            </h2>
            <p className="mt-3 max-w-md font-serif text-base italic text-white/80">
              {model.tagline}
            </p>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-serif text-2xl text-luxury-muted">
            {t("chooseModel")}
          </p>
        </div>
      )}
    </aside>
  );
}
