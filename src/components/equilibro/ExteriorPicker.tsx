"use client";

import type { ExteriorFinish } from "./data";

type ExteriorPickerProps = {
  finishes: ExteriorFinish[];
  selectedId: string;
  onSelect: (id: string) => void;
};

/**
 * Grelha de círculos de cor para acabamento exterior.
 * Ao selecionar, a cor é aplicada via overlay na imagem da casa (ver EquilibroVisual).
 */
export function ExteriorPicker({ finishes, selectedId, onSelect }: ExteriorPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-5 sm:grid-cols-6">
      {finishes.map((finish) => {
        const isSelected = finish.id === selectedId;
        return (
          <button
            key={finish.id}
            type="button"
            onClick={() => onSelect(finish.id)}
            className="group flex flex-col items-center gap-3"
            aria-pressed={isSelected}
            aria-label={finish.name}
          >
            <span
              className={`relative h-12 w-12 rounded-full transition-all duration-500 ease-luxury ${
                isSelected
                  ? "ring-2 ring-luxury-forest ring-offset-4 ring-offset-luxury-papyrus scale-110 shadow-glow"
                  : "ring-1 ring-luxury-stone hover:scale-105 hover:ring-luxury-muted"
              }`}
              style={{ backgroundColor: finish.color }}
            >
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </span>
            <span
              className={`font-ui text-[10px] leading-tight text-center transition-colors duration-300 ${
                isSelected ? "text-luxury-forest font-medium" : "text-luxury-muted"
              }`}
            >
              {finish.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
