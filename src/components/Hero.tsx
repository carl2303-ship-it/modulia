export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-modulia-100 via-sand-50 to-sand-50" />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-modulia-200 bg-white px-4 py-1 text-sm font-medium text-modulia-700">
            Casas modulares · Portugal
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-modulia-950 sm:text-5xl lg:text-6xl">
            O seu lar, construído com inteligência modular
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-modulia-700">
            A Modulia projeta e fabrica casas modulares sustentáveis — rápidas de
            instalar, eficientes energeticamente e totalmente personalizáveis ao
            seu estilo de vida.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#modelos"
              className="rounded-full bg-modulia-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-modulia-700/20 transition hover:bg-modulia-800"
            >
              Ver modelos
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-modulia-300 bg-white px-7 py-3 text-sm font-semibold text-modulia-800 transition hover:border-modulia-400"
            >
              Falar connosco
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-modulia-200 bg-gradient-to-br from-modulia-200 via-modulia-100 to-sand-100 shadow-2xl shadow-modulia-900/10">
            <div className="flex h-full flex-col justify-end p-8">
              <div className="rounded-2xl bg-white/80 p-6 backdrop-blur-sm">
                <p className="text-sm font-medium uppercase tracking-wider text-modulia-600">
                  Entrega estimada
                </p>
                <p className="mt-1 text-3xl font-bold text-modulia-900">8–12 semanas</p>
                <p className="mt-2 text-sm text-modulia-600">
                  Da conceção à chave na mão
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-modulia-200 bg-white px-5 py-4 shadow-lg">
            <p className="text-2xl font-bold text-modulia-800">A+</p>
            <p className="text-xs text-modulia-600">Eficiência energética</p>
          </div>
        </div>
      </div>
    </section>
  );
}
