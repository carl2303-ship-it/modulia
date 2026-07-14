"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CGV_CONTENT,
  CGV_LOCALES,
  type CgvLocale,
} from "@/data/cgv-content";

const BACK_LABELS: Record<CgvLocale, string> = {
  fr: "← Accueil",
  pt: "← Início",
  en: "← Home",
};

export function CgvView() {
  const [locale, setLocale] = useState<CgvLocale>("fr");
  const content = CGV_CONTENT[locale];

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
        Modulia
      </p>
      <h1 className="mt-4 font-serif text-4xl text-luxury-graphite sm:text-5xl">
        {content.pageTitle}
      </h1>
      <p className="mt-3 font-serif text-lg italic text-luxury-muted">
        {content.subtitle}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {CGV_LOCALES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLocale(item.id)}
            className={`rounded-full px-5 py-2 font-ui text-xs uppercase tracking-wider transition ${
              locale === item.id
                ? "bg-luxury-forest text-white"
                : "border border-luxury-stone bg-white text-luxury-muted hover:border-luxury-forest"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-12 space-y-10">
        {content.articles.map((article, index) => (
          <section key={`${locale}-${index}`}>
            <h2 className="font-ui text-sm font-medium uppercase tracking-wider text-luxury-graphite">
              {article.title}
            </h2>
            <div className="mt-4 space-y-4">
              {article.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-ui text-sm leading-relaxed text-luxury-muted"
                >
                  {paragraph}
                </p>
              ))}
              {article.listItems && (
                <ul className="space-y-2 pl-1">
                  {article.listItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-ui text-sm leading-relaxed text-luxury-muted"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-luxury-forest" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-luxury-forest/20 bg-luxury-forest/5 px-6 py-5">
        <p className="font-ui text-sm leading-relaxed text-luxury-graphite">
          {content.acceptance}
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/"
          className="font-ui text-xs uppercase tracking-wider text-luxury-forest hover:underline"
        >
          {BACK_LABELS[locale]}
        </Link>
      </div>
    </article>
  );
}
