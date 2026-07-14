import Image from "next/image";
import Link from "next/link";
import type { OptionItem } from "@/data/options-catalog";
import { formatOptionPrice } from "@/data/options-catalog";

type OptionDetailViewProps = {
  option: OptionItem;
};

export function OptionDetailView({ option }: OptionDetailViewProps) {
  const rich = option.rich;

  return (
    <article>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div className="overflow-hidden rounded-3xl border border-luxury-stone bg-white p-3 shadow-luxury-sm">
          <Image
            src={rich?.gallery?.[0] ?? option.image}
            alt={option.title}
            width={1000}
            height={750}
            className="h-auto w-full rounded-2xl"
            priority
          />
          {rich?.gallery && rich.gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {rich.gallery.slice(1).map((src) => (
                <div key={src} className="overflow-hidden rounded-xl border border-luxury-stone/60">
                  <Image
                    src={src}
                    alt={option.title}
                    width={400}
                    height={300}
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {option.categoryTitle && (
            <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
              {option.categoryTitle}
            </p>
          )}
          <h1 className="mt-3 font-serif text-4xl text-luxury-graphite sm:text-5xl">
            {option.title}
          </h1>
          {rich?.tagline && (
            <p className="mt-3 font-serif text-lg italic text-luxury-muted">
              {rich.tagline}
            </p>
          )}
          <p className="mt-6 font-ui text-sm leading-relaxed text-luxury-muted">
            {rich?.intro ?? option.description}
          </p>

          <p className="mt-8 font-serif text-3xl text-luxury-graphite">
            {formatOptionPrice(option)}
          </p>

          <Link
            href={`/#contact?option=${option.id}`}
            className="mt-8 inline-block rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-wider text-white transition hover:bg-luxury-forest-dark"
          >
            Demander un devis
          </Link>
        </div>
      </section>

      {rich?.features && rich.features.length > 0 && (
        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">Caractéristiques</h2>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rich.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-luxury-stone/80 bg-white px-5 py-4 shadow-luxury-sm"
                >
                  <dt className="font-ui text-[10px] uppercase tracking-wider text-luxury-forest">
                    {feature.title}
                  </dt>
                  <dd className="mt-2 font-ui text-sm text-luxury-muted">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {rich?.includes && rich.includes.length > 0 && (
        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">Contenu du kit</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {rich.includes.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-luxury-stone/80 bg-luxury-papyrus/50 px-5 py-4"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-luxury-forest" />
                  <div>
                    <p className="font-ui text-sm font-medium text-luxury-graphite">
                      {item.title}
                    </p>
                    <p className="mt-1 font-ui text-sm text-luxury-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {rich?.variants && rich.variants.length > 0 && (
        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">Formats & tarifs</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {rich.variants.map((variant) => (
                <div
                  key={variant.label}
                  className="rounded-3xl border border-luxury-stone bg-white p-6 shadow-luxury-sm"
                >
                  <p className="font-ui text-sm font-medium uppercase tracking-wider text-luxury-graphite">
                    {variant.label}
                  </p>
                  {variant.price && (
                    <p className="mt-3 font-serif text-2xl text-luxury-forest">
                      {variant.price}
                    </p>
                  )}
                  {variant.description && (
                    <p className="mt-2 font-ui text-sm text-luxury-muted">
                      {variant.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {rich?.colors && rich.colors.length > 0 && (
        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">Coloris disponibles</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rich.colors.map((color) => (
                <div
                  key={`${color.name}-${color.code ?? ""}`}
                  className="flex items-center gap-4 rounded-2xl border border-luxury-stone/80 bg-white px-4 py-3"
                >
                  <span
                    className="h-10 w-10 shrink-0 rounded-full border border-luxury-stone"
                    style={{ backgroundColor: color.hex ?? "#E8E4DC" }}
                  />
                  <div>
                    <p className="font-ui text-sm font-medium text-luxury-graphite">
                      {color.name}
                    </p>
                    {(color.code || color.description) && (
                      <p className="font-ui text-[11px] text-luxury-muted">
                        {[color.code, color.description].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {rich?.specs && rich.specs.length > 0 && (
        <section className="border-t border-luxury-stone/60 py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-serif text-3xl text-luxury-graphite">Informations</h2>
            <dl className="mt-8 space-y-4">
              {rich.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between gap-4 border-b border-luxury-stone/60 pb-4"
                >
                  <dt className="font-ui text-sm text-luxury-muted">{spec.label}</dt>
                  <dd className="font-ui text-sm font-medium text-luxury-graphite">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {rich?.footerHighlights && rich.footerHighlights.length > 0 && (
        <section className="border-t border-luxury-stone/60 bg-luxury-graphite py-14">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-6">
            {rich.footerHighlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-ui text-[10px] uppercase tracking-wider text-white/80"
              >
                {highlight}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Link
          href="/options"
          className="font-ui text-xs uppercase tracking-wider text-luxury-forest hover:underline"
        >
          ← Toutes les options
        </Link>
      </section>
    </article>
  );
}
