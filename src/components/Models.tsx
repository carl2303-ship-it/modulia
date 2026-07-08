import Image from "next/image";

const models = [
  {
    name: "Modulia S",
    area: "45 m²",
    rooms: "T1",
    price: "desde 89.000 €",
    description: "Compacta e eficiente — ideal para primeiro lar ou investimento.",
    cta: "#contacto",
    ctaLabel: "Solicitar informação",
  },
  {
    name: "EQUILIBRO",
    area: "46 m²",
    rooms: "T2",
    price: "desde 71.000 €",
    description: "L'équilibre parfait entre espace, lumière et fonctionnalité.",
    featured: true,
    cta: "/equilibro",
    ctaLabel: "Configurer",
    image: "/equilibro/hero-1.png",
  },
  {
    name: "Modulia L",
    area: "110 m²",
    rooms: "T3",
    price: "desde 179.000 €",
    description: "Espaço generoso para famílias que valorizam qualidade de vida.",
    cta: "#contacto",
    ctaLabel: "Solicitar informação",
  },
];

export function Models() {
  return (
    <section id="modelos" className="bg-luxury-papyrus py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-luxury-forest">
            Collection
          </p>
          <h2 className="mt-3 font-serif text-4xl text-luxury-graphite sm:text-5xl">
            Os nossos modelos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-ui text-luxury-muted">
            Três linhas base, infinitas possibilidades de personalização.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {models.map((model) => (
            <article
              key={model.name}
              className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-lg ${
                model.featured
                  ? "border-modulia-400 ring-2 ring-modulia-400/30"
                  : "border-modulia-100"
              }`}
            >
              {model.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-modulia-700 px-4 py-1 text-xs font-semibold text-white">
                  Mais popular
                </span>
              )}
              <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-modulia-100 to-modulia-200">
                {"image" in model && model.image && (
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold text-modulia-900">{model.name}</h3>
              <p className="mt-1 text-sm text-modulia-600">
                {model.area} · {model.rooms}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-modulia-700">
                {model.description}
              </p>
              <p className="mt-6 text-xl font-bold text-modulia-800">{model.price}</p>
              <a
                href={model.cta}
                className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold transition ${
                  model.featured
                    ? "bg-modulia-700 text-white hover:bg-modulia-800"
                    : "border border-modulia-300 text-modulia-800 hover:border-modulia-500"
                }`}
              >
                {model.ctaLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
