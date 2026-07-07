const features = [
  {
    title: "Construção rápida",
    description:
      "Módulos pré-fabricados em fábrica controlada reduzem o tempo de obra em até 60% face à construção tradicional.",
    icon: "⚡",
  },
  {
    title: "Sustentabilidade",
    description:
      "Materiais selecionados, desperdício mínimo e isolamento de alto desempenho para um consumo energético reduzido.",
    icon: "🌿",
  },
  {
    title: "Personalização total",
    description:
      "Layouts, acabamentos e dimensões adaptados às suas necessidades — expanda módulos conforme a família cresce.",
    icon: "✦",
  },
  {
    title: "Qualidade garantida",
    description:
      "Controlo de qualidade rigoroso em ambiente industrial, com garantia estrutural e acompanhamento pós-entrega.",
    icon: "✓",
  },
];

export function Features() {
  return (
    <section id="vantagens" className="border-t border-modulia-100 bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-modulia-950 sm:text-4xl">
            Porquê escolher a Modulia?
          </h2>
          <p className="mt-4 text-lg text-modulia-700">
            Combinamos engenharia de precisão com design contemporâneo para
            entregar casas modulares que superam expectativas.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-modulia-100 bg-sand-50 p-6 transition hover:border-modulia-200 hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-modulia-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-modulia-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
