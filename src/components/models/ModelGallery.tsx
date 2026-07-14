"use client";

import Image from "next/image";
import { useState } from "react";
import type { ModelImage } from "@/data/models";

type ModelGalleryProps = {
  images: ModelImage[];
  modelName: string;
};

/**
 * Galeria com 3 vistas 3D — miniaturas + transição suave.
 * Mostra placeholder premium se a imagem ainda não foi carregada.
 */
export function ModelGallery({ images, modelName }: ModelGalleryProps) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-luxury-stone shadow-luxury">
        {images.map((img, index) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-all duration-700 ease-luxury ${
              index === active ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
            }`}
          >
            {failed[index] ? (
              <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-luxury-stone to-luxury-papyrus p-8 text-center">
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-luxury-muted">
                  Vue {index + 1}
                </p>
                <p className="mt-2 font-serif text-lg text-luxury-graphite">{modelName}</p>
                <p className="mt-1 font-ui text-xs text-luxury-muted">Image à venir</p>
              </div>
            ) : (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority={index === 0}
                onError={() => setFailed((prev) => ({ ...prev, [index]: true }))}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        {images.map((img, index) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(index)}
            className={`relative h-16 w-24 overflow-hidden rounded-xl border-2 transition-all duration-500 ease-luxury sm:h-20 sm:w-28 ${
              index === active
                ? "border-luxury-forest shadow-luxury-sm scale-105"
                : "border-luxury-stone opacity-70 hover:opacity-100"
            }`}
            aria-label={`Vue ${index + 1}`}
            aria-pressed={index === active}
          >
            {!failed[index] ? (
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover"
                sizes="112px"
                onError={() => setFailed((prev) => ({ ...prev, [index]: true }))}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-luxury-stone font-ui text-xs text-luxury-muted">
                {index + 1}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
