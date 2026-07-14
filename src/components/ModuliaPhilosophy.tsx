import Link from "next/link";
import { MODULIA_PHILOSOPHY } from "@/data/philosophy";

export function ModuliaPhilosophy() {
  const { eyebrow, title, intro, body, closing, highlights } = MODULIA_PHILOSOPHY;

  return (
    <section id="philosophie" className="scroll-mt-28 border-t border-luxury-stone/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-4xl text-luxury-graphite sm:text-5xl">
            {title}
          </h2>
          <div className="mt-8 space-y-4">
            {intro.map((paragraph) => (
              <p
                key={paragraph}
                className="font-serif text-xl leading-relaxed text-luxury-graphite sm:text-2xl"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-luxury-stone bg-white px-5 py-4 text-center shadow-luxury-sm"
            >
              <p className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                {item.label}
              </p>
              <p className="mt-2 font-ui text-sm font-medium text-luxury-graphite">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-6">
          {body.map((paragraph) => (
            <p
              key={paragraph}
              className="font-ui text-base leading-relaxed text-luxury-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center font-serif text-2xl italic text-luxury-graphite">
          {closing}
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/modelos"
            className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs uppercase tracking-[0.18em] text-white transition hover:bg-luxury-forest-dark"
          >
            Découvrir les modèles
          </Link>
          <Link
            href="#constructif"
            className="rounded-full border border-luxury-stone bg-white px-8 py-4 font-ui text-xs uppercase tracking-[0.18em] text-luxury-graphite transition hover:border-luxury-forest"
          >
            Principe constructif
          </Link>
        </div>
      </div>
    </section>
  );
}
