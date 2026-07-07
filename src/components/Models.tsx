const models = [
  {
    name: "Modulia S",
    area: "45 m²",
    rooms: "T1",
    price: "desde 89.000 €",
    description: "Compacta e eficiente — ideal para primeiro lar ou investimento.",
  },
  {
    name: "Modulia M",
    area: "75 m²",
    rooms: "T2",
    price: "desde 129.000 €",
    description: "O equilíbrio perfeito entre espaço, conforto e preço.",
    featured: true,
  },
  {
    name: "Modulia L",
    area: "110 m²",
    rooms: "T3",
    price: "desde 179.000 €",
    description: "Espaço generoso para famílias que valorizam qualidade de vida.",
  },
];

export function Models() {
  return (
    <section id="modelos" className="bg-sand-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-modulia-950 sm:text-4xl">
            Os nossos modelos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-modulia-700">
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
              <div className="mb-6 aspect-video rounded-2xl bg-gradient-to-br from-modulia-100 to-modulia-200" />
              <h3 className="text-2xl font-bold text-modulia-900">{model.name}</h3>
              <p className="mt-1 text-sm text-modulia-600">
                {model.area} · {model.rooms}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-modulia-700">
                {model.description}
              </p>
              <p className="mt-6 text-xl font-bold text-modulia-800">{model.price}</p>
              <a
                href="#contacto"
                className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold transition ${
                  model.featured
                    ? "bg-modulia-700 text-white hover:bg-modulia-800"
                    : "border border-modulia-300 text-modulia-800 hover:border-modulia-500"
                }`}
              >
                Solicitar informação
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
