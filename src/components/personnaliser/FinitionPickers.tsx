"use client";

import { FINITION_CATEGORIES, getAllFinitions } from "@/data/options-catalog";
import { getOptionRich } from "@/data/options-rich";

type FinitionPickersProps = {
  selections: Record<string, string>;
  onSelect: (finitionId: string, colorName: string) => void;
};

/** Pickers de couleurs pour chaque finition incluse */
export function FinitionPickers({ selections, onSelect }: FinitionPickersProps) {
  const finitions = getAllFinitions();

  return (
    <div className="space-y-8">
      {FINITION_CATEGORIES.map((category) => (
        <div key={category.id}>
          <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
            {category.title}
          </p>
          <div className="mt-4 space-y-6">
            {category.items.map((item) => {
              const rich = getOptionRich(item.id) ?? finitions.find((f) => f.id === item.id)?.rich;
              const colors = rich?.colors ?? [];
              if (colors.length === 0) return null;
              const selected = selections[item.id];

              return (
                <div key={item.id}>
                  <h4 className="font-serif text-base text-luxury-graphite">{item.title}</h4>
                  <p className="mt-1 font-ui text-[11px] text-luxury-muted">
                    Inclus — sans supplément
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4">
                    {colors.map((color) => {
                      const isSelected = selected === color.name;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => onSelect(item.id, color.name)}
                          aria-pressed={isSelected}
                          aria-label={color.name}
                          className="group flex flex-col items-center gap-2"
                        >
                          <span
                            className={`relative h-10 w-10 rounded-full transition-all duration-300 ${
                              isSelected
                                ? "scale-110 ring-2 ring-luxury-forest ring-offset-2 ring-offset-luxury-papyrus"
                                : "ring-1 ring-luxury-stone hover:scale-105"
                            }`}
                            style={{
                              backgroundColor: color.hex ?? "#C4B5A0",
                            }}
                          >
                            {isSelected && (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  className="h-3.5 w-3.5 text-white drop-shadow"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </span>
                            )}
                          </span>
                          <span
                            className={`text-center font-ui text-[9px] leading-tight ${
                              isSelected
                                ? "font-medium text-luxury-forest"
                                : "text-luxury-muted"
                            }`}
                          >
                            {color.name}
                          </span>
                          {color.description && (
                            <span className="text-center font-ui text-[8px] leading-tight text-luxury-muted/70">
                              {color.description}
                            </span>
                          )}
                          {color.code && !color.description && (
                            <span className="text-center font-ui text-[8px] text-luxury-muted/60">
                              {color.code}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Initialise les finitions avec la première couleur de chaque palette */
export function buildDefaultFinitions(): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const item of getAllFinitions()) {
    const colors = getOptionRich(item.id)?.colors;
    if (colors?.[0]) defaults[item.id] = colors[0].name;
  }
  return defaults;
}
