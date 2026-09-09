"use client";

import {
  deleteGalleryItemAction,
  moveGalleryItemAction,
  updateGalleryItemAction,
} from "@/app/backoffice/actions";
import type { GalleryItemRow } from "@/lib/crm/types";

export function GalleryManager({ items }: { items: GalleryItemRow[] }) {
  return (
    <div className="mt-8 space-y-3">
      <p className="font-ui text-sm text-luxury-muted">
        Utilisez ↑ / ↓ pour réordonner, puis « Supprimer » pour retirer un média du
        site public.
      </p>

      <ul className="divide-y divide-luxury-stone overflow-hidden rounded-2xl border border-luxury-stone bg-white">
        {items.map((item, index) => (
          <li key={item.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-luxury-stone/30 sm:h-24 sm:w-36">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  item.media_type === "video"
                    ? item.poster_url || item.media_url
                    : item.media_url
                }
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full bg-luxury-graphite/80 px-2 py-0.5 font-ui text-[10px] uppercase tracking-wider text-white">
                {index + 1} · {item.media_type === "video" ? "Vidéo" : "Photo"}
              </span>
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              <form action={updateGalleryItemAction} className="flex flex-wrap items-end gap-3">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="sort_order" value={item.sort_order} />
                <label className="min-w-[12rem] flex-1">
                  <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
                    Titre
                  </span>
                  <input
                    name="title"
                    defaultValue={item.title}
                    className="mt-1 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
                  />
                </label>
                <label className="flex items-center gap-2 pb-2 font-ui text-sm text-luxury-graphite">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={item.published}
                    className="rounded border-luxury-stone"
                  />
                  Publié
                </label>
                <button
                  type="submit"
                  className="rounded-full bg-luxury-forest px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-white"
                >
                  Enregistrer
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-2">
                <form action={moveGalleryItemAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button
                    type="submit"
                    disabled={index === 0}
                    className="rounded-full border border-luxury-stone px-3 py-1.5 font-ui text-[11px] uppercase tracking-wider text-luxury-graphite disabled:opacity-30"
                    title="Monter"
                  >
                    ↑ Monter
                  </button>
                </form>
                <form action={moveGalleryItemAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button
                    type="submit"
                    disabled={index === items.length - 1}
                    className="rounded-full border border-luxury-stone px-3 py-1.5 font-ui text-[11px] uppercase tracking-wider text-luxury-graphite disabled:opacity-30"
                    title="Descendre"
                  >
                    ↓ Descendre
                  </button>
                </form>
                <form
                  action={deleteGalleryItemAction}
                  onSubmit={(e) => {
                    const ok = window.confirm(
                      `Supprimer « ${item.title || "ce média"} » de la galerie ?`,
                    );
                    if (!ok) e.preventDefault();
                  }}
                >
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-200 px-3 py-1.5 font-ui text-[11px] uppercase tracking-wider text-red-700 hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                </form>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
