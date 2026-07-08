"use client";

import type { InteriorFinish } from "./data";

type InteriorPickerProps = {
  finishes: InteriorFinish[];
  selectedId: string;
  onSelect: (id: string) => void;
};

/** Botões horizontais com textura simulada para plaquage bois intérieur */
export function InteriorPicker({ finishes, selectedId, onSelect }: InteriorPickerProps) {
  return (
    <div className="flex flex-col gap-3">
      {finishes.map((finish) => {
        const isSelected = finish.id === selectedId;
        return (
          <button
            key={finish.id}
            type="button"
            onClick={() => onSelect(finish.id)}
            className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-500 ease-luxury ${
              isSelected
                ? "border-luxury-forest bg-white shadow-luxury-sm"
                : "border-luxury-stone bg-luxury-papyrus/50 hover:border-luxury-muted hover:bg-white"
            }`}
            aria-pressed={isSelected}
          >
            <span
              className="h-10 w-16 shrink-0 rounded-xl shadow-inner"
              style={{ background: finish.texture }}
            />
            <span
              className={`font-ui text-sm tracking-wide transition-colors ${
                isSelected ? "text-luxury-graphite font-medium" : "text-luxury-muted"
              }`}
            >
              {finish.name}
            </span>
            {isSelected && (
              <svg className="ml-auto h-4 w-4 text-luxury-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
