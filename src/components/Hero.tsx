"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-luxury-graphite md:min-h-[100svh] md:pt-20">
      <div className="relative h-[52svh] min-h-[300px] max-h-[520px] w-full md:absolute md:inset-0 md:h-full md:max-h-none">
        <Image
          src="/home/hero.png"
          alt="Modulia"
          fill
          priority
          className="object-cover object-[50%_38%] md:object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-luxury-graphite/10 via-transparent to-luxury-graphite
            md:bg-gradient-to-t md:from-luxury-graphite/80 md:via-luxury-graphite/25 md:to-luxury-graphite/5"
        />
        <div className="absolute inset-y-0 left-0 hidden w-[45%] bg-gradient-to-r from-luxury-graphite/55 via-luxury-graphite/20 to-transparent lg:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-8 md:flex md:min-h-[calc(100svh-5rem)] md:flex-col md:justify-end md:pb-16 md:pt-20 lg:justify-center lg:pb-28 lg:pt-28">
        <div className="max-w-xl lg:max-w-lg">
          <p className="font-ui text-[11px] font-medium uppercase tracking-[0.35em] text-luxury-forest">
            {t("heroEyebrow")}
          </p>

          <h1 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            {t("heroTitle")}{" "}
            <span className="font-semibold">{t("heroPrice")}</span>
          </h1>

          <p className="mt-4 font-ui text-base leading-relaxed text-white/85 sm:text-lg">
            {t("heroText")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/modelos"
              className="rounded-full bg-luxury-forest px-6 py-3.5 font-ui text-xs font-medium uppercase tracking-[0.2em] text-white shadow-glow transition hover:bg-luxury-forest-dark sm:px-8 sm:py-4"
            >
              {t("heroCta")}
            </Link>
            <Link
              href="#philosophie"
              className="rounded-full border border-white/25 bg-white/5 px-6 py-3.5 font-ui text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white/10 sm:px-8 sm:py-4"
            >
              {t("heroPhilosophy")}
            </Link>
          </div>
        </div>

        <dl className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-6 sm:gap-8 sm:pt-8 lg:mt-16 lg:pt-10">
          {[
            { label: t("statFrom"), value: t("heroPrice") },
            { label: t("statModels"), value: "14" },
            { label: t("statDelivery"), value: t("statDeliveryValue") },
          ].map((item) => (
            <div key={item.label}>
              <dt className="font-ui text-[10px] uppercase tracking-wider text-white/50">
                {item.label}
              </dt>
              <dd className="mt-1 font-serif text-xl text-white sm:text-2xl">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
