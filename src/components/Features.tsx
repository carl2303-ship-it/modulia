import { getTranslations } from "next-intl/server";

type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

export async function Features() {
  const t = await getTranslations("features");
  const features = t.raw("items") as FeatureItem[];

  return (
    <section id="avantages" className="border-t border-modulia-100 bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-modulia-950 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-modulia-700">
            {t("subtitle")}
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
