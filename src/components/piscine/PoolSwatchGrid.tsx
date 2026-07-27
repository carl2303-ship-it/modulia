"use client";

import Image from "next/image";

export type PoolSwatchItem = {
  id: string;
  image: string;
  label: string;
  title?: string;
};

type PoolSwatchGridProps = {
  items: PoolSwatchItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  /** compact = 44px swatches, dense = 40px */
  variant?: "compact" | "dense";
  columnsClass?: string;
};

export function PoolSwatchGrid({
  items,
  selectedId,
  onSelect,
  variant = "compact",
  columnsClass,
}: PoolSwatchGridProps) {
  const interactive = Boolean(onSelect);
  const swatchSize = variant === "dense" ? "h-10 w-10" : "h-11 w-11";
  const gridClass =
    columnsClass ??
    (variant === "dense"
      ? "grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-11"
      : "grid grid-cols-4 gap-3 sm:grid-cols-8");

  return (
    <div className={gridClass}>
      {items.map((item) => {
        const isSelected = item.id === selectedId;
        const title = item.title ?? item.label;

        const inner = (
          <>
            <div
              className={`relative ${swatchSize} overflow-hidden rounded-lg border border-black/10 shadow-sm`}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover"
                sizes={variant === "dense" ? "40px" : "44px"}
                quality={90}
              />
            </div>
            <span
              className={`mt-1 block max-w-[4.5rem] truncate text-center font-ui leading-tight ${
                variant === "dense" ? "text-[8px]" : "text-[9px]"
              } ${isSelected ? "font-medium text-luxury-forest" : "text-luxury-muted"}`}
            >
              {item.label}
            </span>
          </>
        );

        if (!interactive) {
          return (
            <div key={item.id} className="flex flex-col items-center" title={title}>
              {inner}
            </div>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            title={title}
            onClick={() => onSelect?.(item.id)}
            aria-pressed={isSelected}
            className={`flex flex-col items-center rounded-lg p-1 transition ${
              isSelected ? "bg-luxury-forest/10 ring-1 ring-luxury-forest/30" : "hover:bg-luxury-stone/40"
            }`}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}
