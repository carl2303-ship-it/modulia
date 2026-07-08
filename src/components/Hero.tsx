import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-luxury-graphite pt-20">
      {/* Imagem cinematográfica EQUILIBRO */}
      <div className="absolute inset-0">
        <Image
          src="/equilibro/hero-1.png"
          alt="Modulia EQUILIBRO — casa modular de luxo"
          fill
          priority
          className="object-cover opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-graphite via-luxury-graphite/70 to-luxury-graphite/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-graphite/80 via-transparent to-luxury-graphite/40" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-6 py-20 lg:py-28">
        <p className="animate-fade-in font-ui text-[11px] font-medium uppercase tracking-[0.35em] text-luxury-forest">
          Casas modulares · Portugal
        </p>

        <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          L&apos;art de vivre
          <span className="block text-white/90">en harmonie avec la nature</span>
        </h1>

        <p className="mt-8 max-w-xl font-ui text-base leading-relaxed text-white/70 sm:text-lg">
          A Modulia projeta e fabrica casas modulares de luxo — sustentáveis,
          personalizáveis e prontas para viver. Descubra o modelo{" "}
          <strong className="font-medium text-white">EQUILIBRO</strong>.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/equilibro"
            className="rounded-full bg-luxury-forest px-8 py-4 font-ui text-xs font-medium uppercase tracking-[0.2em] text-white shadow-glow transition hover:bg-luxury-forest-dark"
          >
            Configurar EQUILIBRO
          </Link>
          <Link
            href="#modelos"
            className="rounded-full border border-white/25 bg-white/5 px-8 py-4 font-ui text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            Ver modelos
          </Link>
        </div>

        <dl className="mt-16 flex flex-wrap gap-8 border-t border-white/10 pt-10">
          {[
            { label: "Surface", value: "46 m²" },
            { label: "Prix dès", value: "71 000 €" },
            { label: "Livraison", value: "8–12 sem." },
          ].map((item) => (
            <div key={item.label}>
              <dt className="font-ui text-[10px] uppercase tracking-wider text-white/50">
                {item.label}
              </dt>
              <dd className="mt-1 font-serif text-2xl text-white">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
