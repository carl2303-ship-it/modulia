"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/config";
import { ConfigSection } from "@/components/equilibro/ConfigSection";
import { PriceBar } from "@/components/equilibro/PriceBar";
import { getModelBySlug, getModels } from "@/data/models";
import {
  getLocalizedFinitionCategories,
  getLocalizedKitchenOptions,
  getLocalizedOptionCategories,
  getLocalizedPoolModel,
  getLocalizedPoolOptions,
  type OptionItem,
} from "@/data/options-catalog";
import { getPoolFabricById } from "@/data/pool-fabric";
import { getPoolShellById } from "@/data/pool-shell";
import { FinitionPickers, buildDefaultFinitions } from "@/components/personnaliser/FinitionPickers";
import { KitchenPanel } from "@/components/personnaliser/KitchenPanel";
import { ModelPicker } from "@/components/personnaliser/ModelPicker";
import { ModelVisual } from "@/components/personnaliser/ModelVisual";
import { OptionDetailModal } from "@/components/personnaliser/OptionDetailModal";
import { PaidOptionsPanel } from "@/components/personnaliser/PaidOptionsPanel";
import { PoolPanel } from "@/components/personnaliser/PoolPanel";
import { calculateTotalPrice } from "@/components/personnaliser/pricing";
import {
  INITIAL_KITCHEN,
  INITIAL_PAID,
  INITIAL_POOL,
  type KitchenSelection,
  type PaidSelection,
  type PoolSelection,
} from "@/components/personnaliser/types";
import type { Profile } from "@/lib/crm/types";
import { submitReservationAction } from "@/app/vendedor/actions";

type Props = {
  profile: Profile;
};

const NUMBER_LOCALE: Record<Locale, string> = { fr: "fr-FR", pt: "pt-PT", en: "en-GB" };

type Step = "configurar" | "cliente" | "confirmacao";

export function VendedorConfigurator({ profile }: Props) {
  const t = useTranslations("personnaliser");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;

  const [step, setStep] = useState<Step>("configurar");
  const [modelSlug, setModelSlug] = useState<string | null>(null);
  const [finitions, setFinitions] = useState(() => buildDefaultFinitions(locale));
  const [paid, setPaid] = useState<PaidSelection>(INITIAL_PAID);
  const [kitchen, setKitchen] = useState<KitchenSelection>(INITIAL_KITCHEN);
  const [pool, setPool] = useState<PoolSelection>(INITIAL_POOL);
  const [openSection, setOpenSection] = useState<string>("modele");
  const [detailOption, setDetailOption] = useState<OptionItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const models = getModels(locale);
  const model = modelSlug ? getModelBySlug(modelSlug, locale) ?? null : null;
  const basePrice = model?.priceFrom ?? 0;
  const totalPrice = useMemo(
    () => calculateTotalPrice(basePrice, { modelSlug, finitions, paid, kitchen, pool }),
    [basePrice, modelSlug, finitions, paid, kitchen, pool],
  );

  const toggleSection = (id: string) => setOpenSection((prev) => (prev === id ? "" : id));

  const handleSelectModel = (slug: string) => {
    setModelSlug(slug);
    setOpenSection("finitions");
  };

  // Build config summary — mesma lógica do PersonnaliserConfigurator
  const allFinitions = getLocalizedFinitionCategories(locale).flatMap((c) => c.items);
  const allPaidOptions = getLocalizedOptionCategories(locale).flatMap((c) => c.items);
  const kitchenOptions = getLocalizedKitchenOptions(locale);
  const poolModel = getLocalizedPoolModel(locale);
  const poolOptions = getLocalizedPoolOptions(locale);

  const formatMeters = (n: number) =>
    `${new Intl.NumberFormat(NUMBER_LOCALE[locale], {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n)} m`;

  const configSummaryLines: string[] = [
    `${t("modelLabel")} ${model?.name ?? "—"}`,
    ...allFinitions
      .filter((f) => finitions[f.id])
      .map((f) => `${f.title} : ${finitions[f.id]}`),
  ];
  if (paid.terrasse !== "none") {
    configSummaryLines.push(
      `${t("terrace")} ${paid.terrasse === "large" ? formatMeters(11.8) : formatMeters(5.9)}`,
    );
  }
  if (paid.climate !== "none") {
    configSummaryLines.push(
      `${t("airConditioning")} ${paid.climate === "solar" ? t("solar") : t("standard")}`,
    );
  }
  if (paid.solarWater !== "none") {
    configSummaryLines.push(
      `${t("solarWaterHeater")} ${paid.solarWater === "200L" ? t("tank200L") : t("tank150L")}`,
    );
  }
  for (const [id, on] of Object.entries(paid.toggles)) {
    if (!on) continue;
    const item = allPaidOptions.find((o) => o.id === id);
    if (!item) continue;
    configSummaryLines.push(
      id === "rideaux" ? `${item.title} (${paid.rideauxMl} ml)` : item.title,
    );
  }
  for (const id of kitchen.packs) {
    const pack = kitchenOptions.find((o) => o.id === id);
    if (pack) configSummaryLines.push(pack.title);
  }
  if (pool.enabled) {
    configSummaryLines.push(poolModel.name);
    const shell = getPoolShellById(pool.shellColor, locale);
    if (shell) configSummaryLines.push(t("poolShellSummary", { color: shell.name }));
    const fabric = getPoolFabricById(pool.fabricColor, locale);
    if (fabric) {
      configSummaryLines.push(
        t("poolFabricSummary", { fabric: `${fabric.code} — ${fabric.name}` }),
      );
    }
    for (const id of pool.options) {
      const opt = poolOptions.find((o) => o.id === id);
      if (opt) configSummaryLines.push(opt.title);
    }
  }

  const configurationJson = JSON.stringify({
    modelSlug,
    finitions,
    paid,
    kitchen,
    pool,
    summary: configSummaryLines,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    fd.set("model_name", model?.name ?? "");
    fd.set("configuration", configurationJson);
    fd.set("price_ttc", String(totalPrice));

    startTransition(async () => {
      const result = await submitReservationAction(fd);
      if (result.success) {
        setOrderId(result.orderId);
        setStep("confirmacao");
      } else {
        setFormError(result.error);
      }
    });
  }

  function resetAll() {
    setStep("configurar");
    setModelSlug(null);
    setFinitions(buildDefaultFinitions(locale));
    setPaid(INITIAL_PAID);
    setKitchen(INITIAL_KITCHEN);
    setPool(INITIAL_POOL);
    setOpenSection("modele");
    setOrderId(null);
    setFormError(null);
  }

  // ── Confirmação ─────────────────────────────────────────────────────────────
  if (step === "confirmacao") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-luxury-papyrus px-6 py-20 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-luxury-forest/10 text-luxury-forest">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="mt-6 font-serif text-3xl text-luxury-graphite">Commande enregistrée</h2>
        <p className="mt-3 max-w-sm font-ui text-sm leading-relaxed text-luxury-muted">
          La commande a bien été créée dans le backoffice.{" "}
          {orderId && (
            <span className="font-medium text-luxury-graphite">
              Ref. #{orderId.slice(0, 8).toUpperCase()}
            </span>
          )}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/backoffice/orders"
            className="rounded-full bg-luxury-graphite px-6 py-3 font-ui text-xs uppercase tracking-wider text-white hover:bg-luxury-forest"
          >
            Voir dans le backoffice
          </Link>
          <button
            onClick={resetAll}
            className="rounded-full border border-luxury-stone px-6 py-3 font-ui text-xs uppercase tracking-wider text-luxury-graphite hover:border-luxury-forest hover:text-luxury-forest"
          >
            Nouvelle configuration
          </button>
        </div>
      </div>
    );
  }

  // ── Données client ───────────────────────────────────────────────────────────
  if (step === "cliente") {
    return (
      <div className="min-h-screen bg-luxury-papyrus">
        <header className="border-b border-luxury-stone bg-white px-6 py-4">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <div>
              <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
                Modulia · Espace Vendeur
              </p>
              <p className="mt-0.5 font-ui text-xs text-luxury-muted">
                {profile.full_name}
                {" · "}
                {profile.role === "agent" ? "Commercial IAD" : "Showroom"}
              </p>
            </div>
            <button
              onClick={() => setStep("configurar")}
              className="font-ui text-xs uppercase tracking-wider text-luxury-muted hover:text-luxury-forest"
            >
              ← Modifier
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-6 py-12">
          {/* Résumé config */}
          <div className="mb-8 rounded-2xl border border-luxury-stone bg-white p-6">
            <p className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
              Configuration sélectionnée
            </p>
            <p className="mt-1 font-serif text-2xl text-luxury-graphite">{model?.name ?? "—"}</p>
            {configSummaryLines.length > 1 && (
              <ul className="mt-3 space-y-0.5">
                {configSummaryLines.slice(1).map((line, i) => (
                  <li key={i} className="font-ui text-xs text-luxury-muted">
                    {line}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 font-ui text-xl font-semibold text-luxury-graphite">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(totalPrice)}{" "}
              <span className="text-sm font-normal text-luxury-muted">{tCommon("ttc")}</span>
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <h2 className="font-serif text-2xl text-luxury-graphite">Informations client</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                  Nom complet *
                </span>
                <input
                  name="client_name"
                  required
                  type="text"
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-luxury-stone bg-white px-4 py-3 font-ui text-sm outline-none focus:border-luxury-forest"
                />
              </label>
              <label className="block">
                <span className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                  Email *
                </span>
                <input
                  name="client_email"
                  required
                  type="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-luxury-stone bg-white px-4 py-3 font-ui text-sm outline-none focus:border-luxury-forest"
                />
              </label>
              <label className="block">
                <span className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                  Téléphone *
                </span>
                <input
                  name="client_phone"
                  required
                  type="tel"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-luxury-stone bg-white px-4 py-3 font-ui text-sm outline-none focus:border-luxury-forest"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                  Rue / Adresse
                </span>
                <input
                  name="client_street"
                  type="text"
                  autoComplete="street-address"
                  className="mt-2 w-full rounded-xl border border-luxury-stone bg-white px-4 py-3 font-ui text-sm outline-none focus:border-luxury-forest"
                />
              </label>
              <label className="block">
                <span className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                  Code postal
                </span>
                <input
                  name="client_postal_code"
                  type="text"
                  autoComplete="postal-code"
                  className="mt-2 w-full rounded-xl border border-luxury-stone bg-white px-4 py-3 font-ui text-sm outline-none focus:border-luxury-forest"
                />
              </label>
              <label className="block">
                <span className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                  Ville
                </span>
                <input
                  name="client_city"
                  type="text"
                  autoComplete="address-level2"
                  className="mt-2 w-full rounded-xl border border-luxury-stone bg-white px-4 py-3 font-ui text-sm outline-none focus:border-luxury-forest"
                />
              </label>
            </div>

            <label className="block">
              <span className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">
                Notes internes
              </span>
              <textarea
                name="notes"
                rows={3}
                className="mt-2 w-full rounded-xl border border-luxury-stone bg-white px-4 py-3 font-ui text-sm outline-none focus:border-luxury-forest"
                placeholder="Informations complémentaires pour le backoffice…"
              />
            </label>

            <label className="flex items-start gap-3">
              <input
                name="marketing_opt_in"
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-luxury-stone accent-luxury-forest"
              />
              <span className="font-ui text-xs leading-relaxed text-luxury-muted">
                Le client accepte de recevoir des communications commerciales de Modulia
              </span>
            </label>

            {formError && (
              <p className="rounded-xl bg-red-50 px-4 py-3 font-ui text-sm text-red-600">
                {formError}
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-luxury-forest px-8 py-3 font-ui text-xs uppercase tracking-wider text-white disabled:opacity-60"
              >
                {isPending ? "Enregistrement…" : "Créer la commande"}
              </button>
              <button
                type="button"
                onClick={() => setStep("configurar")}
                className="rounded-full border border-luxury-stone px-6 py-3 font-ui text-xs uppercase tracking-wider text-luxury-graphite hover:border-luxury-forest"
              >
                Modifier la config
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ── Configurateur (Étape 1) ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-luxury-papyrus font-ui text-luxury-graphite">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-luxury-stone/50 bg-white/95 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-6">
          <div>
            <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
              Modulia · Espace Vendeur
            </p>
            <p className="font-ui text-[10px] text-luxury-muted">
              {profile.full_name}
              {" · "}
              {profile.role === "agent" ? "Commercial IAD" : "Showroom"}
            </p>
          </div>
          <Link
            href="/backoffice"
            className="font-ui text-xs uppercase tracking-wider text-luxury-muted hover:text-luxury-forest"
          >
            Backoffice →
          </Link>
        </div>
      </header>

      <div className="pt-14">
        <div className="lg:flex">
          <ModelVisual model={model} />

          <main className="config-panel-scroll relative min-h-[calc(100vh-5rem)] w-full pb-32 lg:w-[35%] lg:pb-28">
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
              </div>
            )}

            <div className="px-6 py-10 lg:px-10 lg:py-14">
              <header className="mb-8 border-b border-luxury-stone pb-8">
                <p className="font-ui text-[10px] font-medium uppercase tracking-[0.35em] text-luxury-forest">
                  {t("eyebrow")}
                </p>
                <h1 className="mt-3 font-serif text-3xl text-luxury-graphite lg:text-4xl">
                  {t("title")}
                </h1>
                <p className="mt-3 font-ui text-sm leading-relaxed text-luxury-muted">
                  {t("intro")}
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
                title={t("phaseModel")}
                subtitle={t("phaseModelSub")}
                isOpen={openSection === "modele"}
                onToggle={() => toggleSection("modele")}
              >
                <ModelPicker models={models} selectedSlug={modelSlug} onSelect={handleSelectModel} />
              </ConfigSection>

              <ConfigSection
                id="finitions"
                phase="Phase 02"
                title={t("phaseFinitions")}
                subtitle={t("phaseFinitionsSub")}
                isOpen={openSection === "finitions"}
                onToggle={() => toggleSection("finitions")}
              >
                <FinitionPickers
                  selections={finitions}
                  onSelect={(id, color) => setFinitions((prev) => ({ ...prev, [id]: color }))}
                />
              </ConfigSection>

              <ConfigSection
                id="options"
                phase="Phase 03"
                title={t("phaseOptions")}
                subtitle={t("phaseOptionsSub")}
                isOpen={openSection === "options"}
                onToggle={() => toggleSection("options")}
              >
                <PaidOptionsPanel paid={paid} onChange={setPaid} onOpenDetail={setDetailOption} />
              </ConfigSection>

              <ConfigSection
                id="cuisine"
                phase="Phase 04"
                title={t("phaseCuisine")}
                subtitle={t("phaseCuisineSub")}
                isOpen={openSection === "cuisine"}
                onToggle={() => toggleSection("cuisine")}
              >
                <KitchenPanel kitchen={kitchen} onChange={setKitchen} onOpenDetail={setDetailOption} />
              </ConfigSection>

              <ConfigSection
                id="piscine"
                phase="Phase 05"
                title={t("phasePiscine")}
                subtitle={t("phasePiscineSub")}
                isOpen={openSection === "piscine"}
                onToggle={() => toggleSection("piscine")}
              >
                <PoolPanel pool={pool} onChange={setPool} onOpenDetail={setDetailOption} />
              </ConfigSection>
            </div>
          </main>
        </div>
      </div>

      <PriceBar
        totalPrice={totalPrice}
        ctaLabel="Infos client →"
        onCtaClick={() => {
          if (!modelSlug) {
            setOpenSection("modele");
            return;
          }
          setStep("cliente");
        }}
      />

      <OptionDetailModal
        option={detailOption}
        isOpen={!!detailOption}
        onClose={() => setDetailOption(null)}
      />
    </div>
  );
}
