"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-white md:min-h-[100svh] md:pt-40">
      <div className="relative h-[58svh] min-h-[320px] max-h-[560px] w-full md:absolute md:inset-0 md:h-full md:max-h-none">
        <Image
          src="/homepage-maison-piscine.png"
          alt={t("heroImageAlt")}
          fill
          priority
          className="object-cover object-[50%_55%] md:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent md:from-white/95 md:via-white/35 md:to-white/10" />
        <div className="absolute inset-y-0 left-0 hidden w-[42%] bg-gradient-to-r from-white/70 via-white/25 to-transparent lg:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-8 md:flex md:min-h-[calc(100svh-10rem)] md:flex-col md:justify-end md:pb-20 md:pt-40 lg:justify-center lg:pb-28">
        <div className="max-w-xl">
          <p className="font-serif text-4xl tracking-wide text-luxury-graphite sm:text-5xl lg:text-6xl">
            Modulia
          </p>
          <h1 className="mt-4 font-serif text-2xl leading-snug text-luxury-graphite sm:text-3xl lg:text-4xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 max-w-md font-ui text-base leading-relaxed text-luxury-muted sm:text-lg">
            {t("heroText")}
          </p>
        </div>
      </div>
    </section>
  );
}
