"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ConfigSection } from "@/components/equilibro/ConfigSection";
import { ContactModal } from "@/components/equilibro/Modals";
import { PriceBar } from "@/components/equilibro/PriceBar";
import { SiteHeader } from "@/components/SiteHeader";
import { MODELS_PARTICULIERS, getModelBySlug } from "@/data/models";
import {
  KITCHEN_OPTIONS,
  POOL_OPTIONS,
  getAllFinitions,
  getAllPaidOptions,
  type OptionItem,
} from "@/data/options-catalog";
import { FinitionPickers, buildDefaultFinitions } from "./FinitionPickers";
import { KitchenPanel } from "./KitchenPanel";
import { ModelPicker } from "./ModelPicker";
import { ModelVisual } from "./ModelVisual";
import { OptionDetailModal } from "./OptionDetailModal";
import { PaidOptionsPanel } from "./PaidOptionsPanel";
import { PoolPanel } from "./PoolPanel";
import { calculateTotalPrice } from "./pricing";
import {
  INITIAL_KITCHEN,
  INITIAL_PAID,
  INITIAL_POOL,
  type KitchenSelection,
  type PaidSelection,
  type PoolSelection,
} from "./types";

type PersonnaliserConfiguratorProps = {
  initialModelSlug?: string | null;
};

export function PersonnaliserConfigurator({
  initialModelSlug = null,
}: PersonnaliserConfiguratorProps) {
  const searchParams = useSearchParams();
  const queryModel = searchParams.get("model");
  const resolvedInitial =
    initialModelSlug ??
    (queryModel && getModelBySlug(queryModel) ? queryModel : null);

  const [modelSlug, setModelSlug] = useState<string | null>(resolvedInitial);
  const [finitions, setFinitions] = useState(buildDefaultFinitions);
  const [paid, setPaid] = useState<PaidSelection>(INITIAL_PAID);
  const [kitchen, setKitchen] = useState<KitchenSelection>(INITIAL_KITCHEN);
  const [pool, setPool] = useState<PoolSelection>(INITIAL_POOL);
  const [openSection, setOpenSection] = useState<string>(
    resolvedInitial ? "finitions" : "modele",
  );
  const [contactOpen, setContactOpen] = useState(false);
  const [detailOption, setDetailOption] = useState<OptionItem | null>(null);

  const model = modelSlug ? getModelBySlug(modelSlug) ?? null : null;
  const basePrice = model?.priceFrom ?? 0;
  const totalPrice = useMemo(
    () =>
      calculateTotalPrice(basePrice, {
        modelSlug,
        finitions,
        paid,
        kitchen,
        pool,
      }),
    [basePrice, modelSlug, finitions, paid, kitchen, pool],
  );

  const toggleSection = (id: string) =>
    setOpenSection((prev) => (prev === id ? "" : id));

  const handleSelectModel = (slug: string) => {
    setModelSlug(slug);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("model", slug);
      window.history.replaceState({}, "", url.toString());
    }
    setOpenSection("finitions");
  };

  const configSummary = (
    <ul className="space-y-1">
      <li>
        <strong>Modèle :</strong> {model?.name ?? "—"}
      </li>
      {getAllFinitions().map((f) =>
        finitions[f.id] ? (
          <li key={f.id}>
            {f.title} : {finitions[f.id]}
          </li>
        ) : null,
      )}
      {paid.terrasse !== "none" && (
        <li>
          Terrasse {paid.terrasse === "large" ? "11,80 m" : "5,90 m"}
        </li>
      )}
      {paid.climate !== "none" && (
        <li>
          Climatisation {paid.climate === "solar" ? "solaire" : "standard"}
        </li>
      )}
      {Object.entries(paid.toggles)
        .filter(([, on]) => on)
        .map(([id]) => {
          const item = getAllPaidOptions().find((o) => o.id === id);
          if (!item) return null;
          if (id === "rideaux") {
            return (
              <li key={id}>
                {item.title} ({paid.rideauxMl} ml)
              </li>
            );
          }
          return <li key={id}>{item.title}</li>;
        })}
      {kitchen.packs.map((id) => {
        const pack = KITCHEN_OPTIONS.find((o) => o.id === id);
        return pack ? <li key={id}>{pack.title}</li> : null;
      })}
      {kitchen.contemporaine && (
        <li>Cuisine contemporaine {kitchen.contemporaineMl} ml</li>
      )}
      {kitchen.appliances === "base" ? (
        <li>Kit électroménager base (inclus)</li>
      ) : (
        <li>Kit électroménager premium (+990 €)</li>
      )}
      {pool.enabled && (
        <>
          <li>Sofa Pool</li>
          {pool.options.map((id) => {
            const opt = POOL_OPTIONS.find((o) => o.id === id);
            return opt ? <li key={id}>{opt.title}</li> : null;
          })}
        </>
      )}
    </ul>
  );

  return (
    <div className="min-h-screen bg-luxury-papyrus font-ui text-luxury-graphite">
      <SiteHeader variant="light" />

      <div className="pt-20">
        <div className="lg:flex">
          <ModelVisual model={model} />

          <main className="config-panel-scroll relative min-h-[calc(100vh-5rem)] w-full pb-32 lg:w-[35%] lg:pb-28">
          {/* Mobile hero — modèle entier */}
          {model && (
            <div className="relative flex h-64 w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,_#f7f3eb_0%,_#e5ddd0_100%)] lg:hidden">
              <div className="relative h-full w-full px-4 py-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={model.images[0]?.src}
                  alt={model.name}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-luxury-graphite/70 to-transparent px-6 pb-5 pt-16">
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/70">
                  Modulia
                </p>
                <h1 className="mt-1 font-serif text-3xl text-white">{model.name}</h1>
              </div>
            </div>
          )}

          <div className="px-6 py-10 lg:px-10 lg:py-14">
            <header className="mb-8 border-b border-luxury-stone pb-8">
              <p className="font-ui text-[10px] font-medium uppercase tracking-[0.35em] text-luxury-forest">
                Configurateur
              </p>
              <h1 className="mt-3 font-serif text-3xl text-luxury-graphite lg:text-4xl">
                Personnaliser
              </h1>
              <p className="mt-3 font-ui text-sm leading-relaxed text-luxury-muted">
                Choisissez votre modèle, vos finitions incluses, puis les options
                en supplément.
              </p>
              {model && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {[model.area, model.rooms, model.capacity].map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-luxury-stone bg-white px-3 py-1.5 font-ui text-[10px] uppercase tracking-wider text-luxury-muted"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <ConfigSection
              id="modele"
              phase="Phase 01"
              title="Modèle"
              subtitle="Sélectionnez votre module Modulia"
              isOpen={openSection === "modele"}
              onToggle={() => toggleSection("modele")}
            >
              <ModelPicker
                models={MODELS_PARTICULIERS}
                selectedSlug={modelSlug}
                onSelect={handleSelectModel}
              />
            </ConfigSection>

            <ConfigSection
              id="finitions"
              phase="Phase 02"
              title="Personnalisation incluse"
              subtitle="Couleurs et finitions — sans supplément"
              isOpen={openSection === "finitions"}
              onToggle={() => toggleSection("finitions")}
            >
              <FinitionPickers
                selections={finitions}
                onSelect={(id, color) =>
                  setFinitions((prev) => ({ ...prev, [id]: color }))
                }
              />
            </ConfigSection>

            <ConfigSection
              id="options"
              phase="Phase 03"
              title="Options"
              subtitle="Équipements et services en supplément"
              isOpen={openSection === "options"}
              onToggle={() => toggleSection("options")}
            >
              <PaidOptionsPanel
                paid={paid}
                onChange={setPaid}
                onOpenDetail={setDetailOption}
              />
            </ConfigSection>

            <ConfigSection
              id="cuisine"
              phase="Phase 04"
              title="Cuisine"
              subtitle="Base incluse + options et électroménager"
              isOpen={openSection === "cuisine"}
              onToggle={() => toggleSection("cuisine")}
            >
              <KitchenPanel
                kitchen={kitchen}
                onChange={setKitchen}
                onOpenDetail={setDetailOption}
              />
            </ConfigSection>

            <ConfigSection
              id="piscine"
              phase="Phase 05"
              title="Piscine"
              subtitle="Sofa Pool et options"
              isOpen={openSection === "piscine"}
              onToggle={() => toggleSection("piscine")}
            >
              <PoolPanel
                pool={pool}
                onChange={setPool}
                onOpenDetail={setDetailOption}
              />
            </ConfigSection>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-luxury-stone/60 pt-6">
              <Link
                href="/personnalisation"
                className="font-ui text-[11px] uppercase tracking-wider text-luxury-forest hover:underline"
              >
                Catalogue finitions →
              </Link>
              <Link
                href="/options"
                className="font-ui text-[11px] uppercase tracking-wider text-luxury-muted hover:text-luxury-forest"
              >
                Catalogue options →
              </Link>
              <Link
                href="/modelos"
                className="font-ui text-[11px] uppercase tracking-wider text-luxury-muted hover:text-luxury-forest"
              >
                Modèles
              </Link>
            </div>
          </div>
          </main>
        </div>
      </div>

      <PriceBar
        totalPrice={totalPrice}
        onCtaClick={() => {
          if (!modelSlug) {
            setOpenSection("modele");
            return;
          }
          setContactOpen(true);
        }}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        totalPrice={totalPrice}
        configSummary={configSummary}
        modelName={model?.name ?? "Modulia"}
      />

      <OptionDetailModal
        option={detailOption}
        isOpen={!!detailOption}
        onClose={() => setDetailOption(null)}
      />
    </div>
  );
}
