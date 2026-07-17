import { getTranslations } from "next-intl/server";

type SpecSection = {
  id: string;
  title: string;
  items: string[];
};

export async function TechnicalSpecs() {
  const t = await getTranslations("technicalSpecs");
  const allSections = t.raw("sections") as SpecSection[];
  const sections = allSections.filter((s) => s.id !== "usages");
  const usages = allSections.find((s) => s.id === "usages");

  return (
    <div className="mt-20 border-t border-luxury-stone/60 pt-20">
      <div className="max-w-3xl">
        <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
          {t("eyebrow")}
        </p>
        <h3 className="mt-3 font-serif text-3xl text-luxury-graphite sm:text-4xl">
          {t("title")}
        </h3>
        <p className="mt-4 font-ui text-sm leading-relaxed text-luxury-muted">
          {t("intro")}
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section.id}
            className="rounded-2xl border border-luxury-stone/80 bg-white p-6 shadow-luxury-sm"
          >
            <h4 className="font-ui text-sm font-medium uppercase tracking-wider text-luxury-forest">
              {section.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-ui text-sm leading-relaxed text-luxury-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-luxury-forest" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {usages && (
        <div className="mt-10">
          <p className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
            {usages.title}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {usages.items.map((usage) => (
              <span
                key={usage}
                className="rounded-full border border-luxury-forest/20 bg-luxury-forest/5 px-4 py-2 font-ui text-[10px] uppercase tracking-wider text-luxury-forest"
              >
                {usage}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
