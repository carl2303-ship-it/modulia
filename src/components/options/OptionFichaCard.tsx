import Image from "next/image";
import Link from "next/link";
import type { OptionItem } from "@/data/options-catalog";
import { formatOptionPrice } from "@/data/options-catalog";

type OptionFichaCardProps = {
  item: OptionItem;
  onSelect?: () => void;
  detailPath?: string;
};

export function OptionFichaCard({ item, onSelect, detailPath = "/options" }: OptionFichaCardProps) {
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-luxury-stone">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-ui text-sm font-medium uppercase tracking-wider text-luxury-graphite">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 font-ui text-sm leading-relaxed text-luxury-muted">
          {item.description}
        </p>
        {item.highlights && (
          <ul className="mt-3 space-y-1">
            {item.highlights.map((h) => (
              <li key={h} className="font-ui text-[11px] text-luxury-forest">
                · {h}
              </li>
            ))}
          </ul>
        )}
        {!item.includedChoice && (
          <p className="mt-4 font-serif text-xl text-luxury-graphite">
            {formatOptionPrice(item)}
          </p>
        )}
        {!onSelect && (
          <span className="mt-4 font-ui text-[11px] uppercase tracking-wider text-luxury-forest">
            {item.includedChoice ? "Voir les coloris →" : "Voir le détail →"}
          </span>
        )}
        {onSelect && (
          <button
            type="button"
            onClick={onSelect}
            className="mt-4 text-left font-ui text-[11px] uppercase tracking-wider text-luxury-forest hover:underline"
          >
            En savoir plus
          </button>
        )}
      </div>
    </>
  );

  if (onSelect) {
    return (
      <article className="group flex flex-col overflow-hidden rounded-3xl border border-luxury-stone bg-white shadow-luxury-sm transition hover:-translate-y-0.5 hover:shadow-luxury">
        {content}
      </article>
    );
  }

  return (
    <Link
      href={`${detailPath}/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-luxury-stone bg-white shadow-luxury-sm transition hover:-translate-y-0.5 hover:shadow-luxury"
    >
      {content}
    </Link>
  );
}
