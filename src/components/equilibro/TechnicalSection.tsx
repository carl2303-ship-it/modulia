import Image from "next/image";
import { KEY_FEATURES, PLAN_IMAGE, TECHNICAL_SPECS, VALUE_PROPS } from "./data";

/**
 * Caractéristiques techniques en HTML — plan en image JPEG.
 */
export function TechnicalSection() {
  return (
    <section className="border-b border-luxury-stone/60 py-10">
      <p className="font-ui text-[10px] font-medium uppercase tracking-[0.25em] text-luxury-muted">
        Architecture
      </p>
      <h3 className="mt-2 font-serif text-xl text-luxury-graphite">
        Plan & Caractéristiques
      </h3>

      <div className="mt-6 overflow-hidden rounded-2xl border border-luxury-stone bg-white p-3 shadow-luxury-sm">
        <Image
          src={PLAN_IMAGE}
          alt="Plan architectural EQUILIBRO"
          width={1200}
          height={900}
          className="h-auto w-full rounded-xl"
        />
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4">
        {TECHNICAL_SPECS.map((spec) => (
          <div
            key={spec.label}
            className="rounded-xl border border-luxury-stone/80 bg-luxury-papyrus/50 px-4 py-3"
          >
            <dt className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
              {spec.label}
            </dt>
            <dd className="mt-1 font-ui text-sm font-medium text-luxury-graphite">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {KEY_FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-luxury-stone/60 bg-white px-3 py-2 text-center"
          >
            <p className="font-ui text-[9px] uppercase tracking-wider text-luxury-forest">
              {f.title}
            </p>
            <p className="font-ui text-[11px] text-luxury-graphite">{f.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {VALUE_PROPS.map((prop) => (
          <span
            key={prop.title}
            className="rounded-full border border-luxury-forest/20 bg-luxury-forest/5 px-3 py-1.5 font-ui text-[10px] uppercase tracking-wider text-luxury-forest"
            title={prop.description}
          >
            {prop.title}
          </span>
        ))}
      </div>
    </section>
  );
}
