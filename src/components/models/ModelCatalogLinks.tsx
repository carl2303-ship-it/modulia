import Link from "next/link";
import { getTranslations } from "next-intl/server";

type ModelCatalogLinksProps = {
  /** Variante mais compacta para páginas de detalhe */
  compact?: boolean;
};

/** Mini-secção com links para Personalização e Options */
export async function ModelCatalogLinks({ compact = false }: ModelCatalogLinksProps) {
  const t = await getTranslations("modelCatalogLinks");

  return (
    <section
      className={`border-t border-luxury-stone/60 ${
        compact ? "py-12" : "bg-white/50 py-14"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className={compact ? "text-left" : "text-center"}>
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            {t("eyebrow")}
          </p>
          <h2
            className={`mt-3 font-serif text-luxury-graphite ${
              compact ? "text-2xl" : "text-3xl"
            }`}
          >
            {t("title")}
          </h2>
          <p
            className={`mt-3 font-ui text-sm text-luxury-muted ${
              compact ? "max-w-xl" : "mx-auto max-w-xl"
            }`}
          >
            {t("text")}
          </p>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 ${
            compact ? "justify-start" : "justify-center"
          }`}
        >
          <Link
            href="/personnalisation"
            className="rounded-full border border-luxury-stone bg-white px-6 py-3 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest hover:text-luxury-forest"
          >
            {t("personnalisation")}
          </Link>
          <Link
            href="/options"
            className="rounded-full border border-luxury-stone bg-white px-6 py-3 font-ui text-xs uppercase tracking-wider text-luxury-graphite transition hover:border-luxury-forest hover:text-luxury-forest"
          >
            {t("options")}
          </Link>
          <Link
            href="/personnaliser"
            className="rounded-full bg-luxury-forest px-6 py-3 font-ui text-xs uppercase tracking-wider text-white transition hover:bg-luxury-forest-dark"
          >
            {t("personnaliser")}
          </Link>
        </div>
      </div>
    </section>
  );
}
