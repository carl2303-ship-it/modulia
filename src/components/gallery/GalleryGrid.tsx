"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { GalleryDisplayItem } from "@/data/gallery";

export function GalleryGrid({ items }: { items: GalleryDisplayItem[] }) {
  const t = useTranslations("galerie");
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeIndex = activeId ? items.findIndex((item) => item.id === activeId) : -1;
  const active = activeIndex >= 0 ? items[activeIndex] : null;

  const close = useCallback(() => setActiveId(null), []);
  const showPrev = useCallback(() => {
    if (activeIndex < 0 || items.length === 0) return;
    setActiveId(items[(activeIndex - 1 + items.length) % items.length].id);
  }, [activeIndex, items]);
  const showNext = useCallback(() => {
    if (activeIndex < 0 || items.length === 0) return;
    setActiveId(items[(activeIndex + 1) % items.length].id);
  }, [activeIndex, items]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, showPrev, showNext]);

  if (items.length === 0) {
    return (
      <p className="font-ui text-sm text-luxury-muted">{t("empty")}</p>
    );
  }

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, index) => (
          <GalleryTile
            key={item.id}
            item={item}
            videoBadge={t("videoBadge")}
            onOpen={() => setActiveId(item.id)}
            priority={index < 4}
          />
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-luxury-graphite/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-5 top-5 font-ui text-xs uppercase tracking-wider text-white/80 hover:text-white"
          >
            {t("close")}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-6 font-ui text-2xl text-white/70 hover:text-white sm:left-6"
            aria-label={t("prev")}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-6 font-ui text-2xl text-white/70 hover:text-white sm:right-6"
            aria-label={t("next")}
          >
            ›
          </button>
          <figure
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {active.type === "video" ? (
              <video
                key={active.id}
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                playsInline
                className="mx-auto max-h-[75vh] w-auto max-w-full rounded-sm"
              />
            ) : (
              <Image
                src={active.src}
                alt={active.label}
                width={1400}
                height={1050}
                className="mx-auto max-h-[75vh] w-auto rounded-sm object-contain"
                priority
                unoptimized={isRemoteSrc(active.src)}
              />
            )}
            <figcaption className="mt-4 text-center">
              <p className="font-serif text-xl text-white">{active.label}</p>
              <p className="mt-2 font-ui text-xs text-white/40">
                {activeIndex + 1} / {items.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

function isRemoteSrc(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function GalleryTile({
  item,
  videoBadge,
  onOpen,
  priority,
}: {
  item: GalleryDisplayItem;
  videoBadge: string;
  onOpen: () => void;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group mb-4 block w-full break-inside-avoid text-left outline-none"
    >
      <div className="relative overflow-hidden bg-luxury-stone/30">
        {item.type === "video" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.poster || item.src}
            alt={item.label}
            className="h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <Image
            src={item.src}
            alt={item.label}
            width={1200}
            height={900}
            priority={priority}
            unoptimized={isRemoteSrc(item.src)}
            className="h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
        {item.type === "video" && (
          <span className="absolute left-3 top-3 rounded-full bg-luxury-graphite/80 px-3 py-1 font-ui text-[10px] uppercase tracking-wider text-white">
            {videoBadge}
          </span>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-graphite/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-serif text-lg text-white">{item.label}</p>
        </div>
      </div>
    </button>
  );
}
