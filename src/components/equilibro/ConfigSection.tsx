"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ConfigSectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  phase: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
};

/**
 * Secção expansível estilo accordion premium.
 * Animação suave de altura com transição CSS luxury.
 */
export function ConfigSection({
  title,
  subtitle,
  phase,
  isOpen,
  onToggle,
  children,
}: ConfigSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, children]);

  return (
    <section className="border-b border-luxury-stone/60">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-start justify-between gap-4 py-8 text-left transition-opacity duration-300 hover:opacity-80"
        aria-expanded={isOpen}
      >
        <div>
          <p className="font-ui text-[10px] font-medium uppercase tracking-[0.25em] text-luxury-muted">
            {phase}
          </p>
          <h3 className="mt-2 font-serif text-xl text-luxury-graphite transition-colors group-hover:text-luxury-forest">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 font-ui text-xs text-luxury-muted">{subtitle}</p>
          )}
        </div>
        <span
          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-luxury-stone font-ui text-lg text-luxury-muted transition-all duration-500 ease-luxury ${
            isOpen ? "rotate-45 border-luxury-forest text-luxury-forest" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>

      <div
        className="overflow-hidden transition-[height] duration-700 ease-luxury"
        style={{ height }}
      >
        <div ref={contentRef} className="pb-8">
          {children}
        </div>
      </div>
    </section>
  );
}
