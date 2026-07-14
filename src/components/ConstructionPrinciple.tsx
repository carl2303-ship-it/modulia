import Image from "next/image";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";

const LAYERS = [
  {
    number: 1,
    title: "Toit",
    items: ["Panneaux de couverture", "Étanchéité", "Finition extérieure"],
  },
  {
    number: 2,
    title: "Toiture",
    items: ["Panneau isolant XPS", "Structure de toit", "Plafond suspendu"],
  },
  {
    number: 3,
    title: "Murs",
    items: ["Panneau extérieur", "Panneau isolant XPS", "Mur intérieur"],
  },
  {
    number: 4,
    title: "Mur extérieur",
    items: ["Panneau extérieur", "Isolation XPS", "Finition façade"],
  },
  {
    number: 5,
    title: "Menuiseries",
    items: [
      "Châssis de porte",
      "Cadre aluminium à rupture de pont thermique",
      "Double vitrage trempé",
    ],
  },
  {
    number: 6,
    title: "Bloc mur technique",
    items: [
      "Panneau extérieur",
      "Isolation XPS",
      "Plaque ciment",
      "Finition intérieure",
    ],
  },
  {
    number: 7,
    title: "Plancher",
    items: [
      "Revêtement de sol (bois / parquet)",
      "Panneau isolant XPS",
      "Plaque ciment",
      "Base structurelle",
    ],
  },
  {
    number: 8,
    title: "Structure porteuse",
    items: ["Structure acier galvanisé"],
  },
];

const BENEFITS = [
  {
    title: "Isolation performante",
    description: "Panneaux isolants haute performance (XPS)",
  },
  {
    title: "Matériaux durables",
    description: "Matériaux sélectionnés pour leur résistance et longévité",
  },
  {
    title: "Confort thermique",
    description: "Excellente régulation thermique été comme hiver",
  },
  {
    title: "Construction précision",
    description: "Assemblage maîtrisé et contrôle qualité rigoureux",
  },
  {
    title: "Écologique",
    description: "Matériaux recyclables et respectueux de l'environnement",
  },
];

/**
 * Secção « Principe constructif » — infografia numerada (multilingue).
 */
export function ConstructionPrinciple() {
  return (
    <section id="constructif" className="border-t border-luxury-stone/60 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
            Savoir-faire Modulia
          </p>
          <h2 className="mt-3 font-serif text-4xl text-luxury-graphite sm:text-5xl">
            Principe constructif des modules
          </h2>
          <p className="mt-6 font-ui text-base leading-relaxed text-luxury-muted">
            Conçus avec des matériaux de qualité et des techniques de construction
            avancées pour garantir durabilité, confort et performance.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-luxury-stone bg-luxury-papyrus p-4 shadow-luxury-sm sm:p-6">
          <Image
            src="/home/principe-constructif.png"
            alt="Vue éclatée de la construction modulaire Modulia"
            width={1400}
            height={1800}
            className="h-auto w-full rounded-2xl"
          />
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LAYERS.map((layer) => (
            <article
              key={layer.number}
              className="rounded-2xl border border-luxury-stone/80 bg-luxury-papyrus/50 p-6"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-luxury-forest text-sm font-medium text-white">
                {layer.number}
              </div>
              <h3 className="font-ui text-sm font-medium uppercase tracking-wider text-luxury-forest">
                {layer.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-ui text-sm text-luxury-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-luxury-forest" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-luxury-stone bg-white p-6 text-center transition hover:border-luxury-forest/30 hover:shadow-luxury-sm"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-luxury-forest/10">
                <span className="h-2 w-2 rounded-full bg-luxury-forest" />
              </div>
              <h3 className="font-ui text-[11px] font-medium uppercase tracking-wider text-luxury-graphite">
                {benefit.title}
              </h3>
              <p className="mt-2 font-ui text-xs leading-relaxed text-luxury-muted">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>

        <TechnicalSpecs />

        <p className="mt-16 text-center font-ui text-[11px] uppercase tracking-[0.25em] text-luxury-muted">
          Modulia — Solutions modulaires haut de gamme
        </p>
      </div>
    </section>
  );
}
