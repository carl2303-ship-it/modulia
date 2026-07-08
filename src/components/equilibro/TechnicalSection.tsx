"use client";

import Image from "next/image";
import { FICHA_IMAGE, PLAN_IMAGE, TECHNICAL_SPECS, VALUE_PROPS } from "./data";

/**
 * Secção técnica com planta arquitectónica e ficha do modelo.
 */
export function TechnicalSection() {
  return (
    <section className="border-b border-luxury-stone/60 py-10">
      <p className="font-ui text-[10px] font-medium uppercase tracking-[0.25em] text-luxury-muted">
        Architecture
      </p>
      <h3 className="mt-2 font-serif text-xl text-luxury-graphite">
        Plan & Caractéristiques
      </h3>

      {/* Planta EQUILIBRO-07 */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-luxury-stone bg-white p-4 shadow-luxury-sm">
        <Image
          src={PLAN_IMAGE.src}
          alt={PLAN_IMAGE.alt}
          width={800}
          height={500}
          className="h-auto w-full rounded-xl"
        />
        <p className="mt-3 text-center font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
          Plan EQUILIBRO-07 · 11,80 × 6,75 m
        </p>
      </div>

      {/* Grid de especificações */}
      <dl className="mt-8 grid grid-cols-2 gap-4">
        {TECHNICAL_SPECS.map((spec) => (
          <div
            key={spec.label}
            className="rounded-xl border border-luxury-stone/80 bg-luxury-papyrus/50 px-4 py-3"
          >
            <dt className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
              {spec.label}
            </dt>
            <dd className="mt-1 font-ui text-sm font-medium text-luxury-graphite">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Value props */}
      <div className="mt-8 flex flex-wrap gap-2">
        {VALUE_PROPS.map((prop) => (
          <span
            key={prop}
            className="rounded-full border border-luxury-forest/20 bg-luxury-forest/5 px-3 py-1.5 font-ui text-[10px] uppercase tracking-wider text-luxury-forest"
          >
            {prop}
          </span>
        ))}
      </div>

      {/* Ficha técnica completa (imagem promocional) */}
      <details className="group mt-8">
        <summary className="cursor-pointer list-none font-ui text-xs uppercase tracking-wider text-luxury-forest transition hover:text-luxury-forest-dark">
          <span className="border-b border-luxury-forest/30 pb-0.5 group-open:border-luxury-forest">
            Voir la fiche technique complète
          </span>
        </summary>
        <div className="mt-4 overflow-hidden rounded-2xl border border-luxury-stone bg-white p-3 shadow-luxury-sm">
          <Image
            src={FICHA_IMAGE.src}
            alt={FICHA_IMAGE.alt}
            width={900}
            height={1200}
            className="h-auto w-full rounded-xl"
          />
        </div>
      </details>
    </section>
  );
}
