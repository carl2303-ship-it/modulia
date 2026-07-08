"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HERO_IMAGES, type ExteriorFinish } from "./data";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/#modelos", label: "Modèles" },
  { href: "/#contacto", label: "Contact" },
];

type EquilibroVisualProps = {
  exteriorFinish: ExteriorFinish;
  interiorTexture: string;
};

/**
 * Painel visual esquerdo (65%) — renders 3D oficiais com galeria e overlay de cor.
 */
export function EquilibroVisual({ exteriorFinish, interiorTexture }: EquilibroVisualProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="relative h-[50vh] lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[65%]">
      <div className="relative h-full w-full overflow-hidden bg-luxury-graphite">
        {/* Galeria de renders 3D oficiais */}
        {HERO_IMAGES.map((img, index) => (
          <Image
            key={img.id}
            src={img.src}
            alt={img.alt}
            fill
            priority={index === 0}
            className={`object-cover transition-all duration-[1.2s] ease-luxury ${
              index === activeImage
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-[1.03] opacity-0"
            }`}
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
        ))}

        {/* Overlay de cor exterior — máscara focada na zona da casa */}
        <div
          className="exterior-overlay absolute inset-0"
          style={{
            backgroundColor: exteriorFinish.color,
            opacity: exteriorFinish.overlayOpacity * 0.65,
            maskImage: "linear-gradient(to bottom, transparent 5%, black 35%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 5%, black 35%, black 85%, transparent 100%)",
          }}
          aria-hidden
        />

        {/* Gradiente cinematográfico */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-graphite/40 via-transparent to-luxury-graphite/50" />

        {/* Barra de plaquage intérieur */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-700 ease-luxury"
          style={{ background: interiorTexture }}
          aria-hidden
        />
      </div>

      {/* Navegação + logótipo */}
      <header className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-6 lg:px-10 lg:py-8">
        <Link href="/" className="transition-opacity duration-300 hover:opacity-80">
          <Image
            src="/logo-modulia.png"
            alt="Modulia"
            width={160}
            height={64}
            className="h-11 w-auto drop-shadow-lg sm:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-ui text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Badge do modelo */}
      <div className="absolute bottom-24 left-6 lg:bottom-28 lg:left-10">
        <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/70">
          Collection Modulia
        </p>
        <p className="mt-1 font-serif text-4xl tracking-[0.15em] text-white lg:text-5xl">
          EQUILIBRO
        </p>
        <p className="mt-2 font-ui text-[11px] uppercase tracking-wider text-white/60">
          11,80 m · Terrasse intégrée · 2 chambres
        </p>
      </div>

      {/* Selector de vistas 3D */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 lg:left-10 lg:right-10">
        <div className="flex gap-2">
          {HERO_IMAGES.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveImage(index)}
              className={`relative h-14 w-20 overflow-hidden rounded-xl border-2 transition-all duration-500 ease-luxury sm:h-16 sm:w-24 ${
                index === activeImage
                  ? "border-white shadow-luxury scale-105"
                  : "border-white/30 opacity-70 hover:opacity-100"
              }`}
              aria-label={`Vue ${index + 1}`}
              aria-pressed={index === activeImage}
            >
              <Image src={img.src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>

        <p className="hidden font-ui text-[10px] uppercase tracking-[0.2em] text-white/50 sm:block">
          Vue {activeImage + 1} / {HERO_IMAGES.length}
        </p>
      </div>
    </div>
  );
}
