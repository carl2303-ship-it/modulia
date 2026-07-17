"use client";

import Image from "next/image";
import type { ModelData } from "@/data/models";
import { formatPrice } from "@/components/equilibro/useAnimatedPrice";

type ModelPickerProps = {
  models: ModelData[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};

export function ModelPicker({ models, selectedSlug, onSelect }: ModelPickerProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {models.map((model) => {
        const selected = model.slug === selectedSlug;
        const thumb = model.images[0]?.src ?? "/logo-modulia.png";
        return (
          <button
            key={model.slug}
            type="button"
            onClick={() => onSelect(model.slug)}
            aria-pressed={selected}
            className={`group overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
              selected
                ? "border-luxury-forest bg-white shadow-luxury-sm ring-1 ring-luxury-forest"
                : "border-luxury-stone bg-white/60 hover:border-luxury-muted"
            }`}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={thumb}
                alt={model.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="200px"
              />
            </div>
            <div className="px-3 py-3">
              <p
                className={`font-ui text-[11px] font-medium uppercase tracking-wider ${
                  selected ? "text-luxury-forest" : "text-luxury-graphite"
                }`}
              >
                {model.name}
              </p>
              <p className="mt-1 font-ui text-[10px] text-luxury-muted">
                dès {formatPrice(model.priceFrom)} €
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
