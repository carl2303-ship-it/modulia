import Image from "next/image";

type ModelPlanSectionProps = {
  planImage?: string;
  planLabel?: string;
  modelName: string;
};

/**
 * Plan du modèle — image PNG ({slug}-plan.png) sans texte intégré.
 */
export function ModelPlanSection({
  planImage,
  planLabel,
  modelName,
}: ModelPlanSectionProps) {
  return (
    <section className="border-t border-luxury-stone/60 py-16">
      <div>
        <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-muted">
          Architecture
        </p>
        <h2 className="mt-2 font-serif text-3xl text-luxury-graphite">Plan du modèle</h2>
        {planLabel && (
          <p className="mt-2 font-ui text-sm text-luxury-muted">{planLabel}</p>
        )}
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-luxury-stone bg-white p-4 shadow-luxury-sm">
        {planImage ? (
          <Image
            src={planImage}
            alt={`Plan architectural — ${modelName}`}
            width={1400}
            height={1000}
            className="h-auto w-full rounded-2xl"
          />
        ) : (
          <div className="flex min-h-[320px] flex-col items-center justify-center p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-luxury-stone bg-luxury-papyrus font-serif text-xl text-luxury-muted">
              PL
            </div>
            <p className="mt-6 font-serif text-xl text-luxury-graphite">Plan à venir</p>
            <p className="mt-2 max-w-sm font-ui text-sm text-luxury-muted">
              L&apos;image du plan sera bientôt disponible.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
