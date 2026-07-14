"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ConfigSection } from "./ConfigSection";
import { EquilibroVisual } from "./EquilibroVisual";
import { ExteriorPicker } from "./ExteriorPicker";
import { InteriorPicker } from "./InteriorPicker";
import { TechnicalSection } from "./TechnicalSection";
import {
  ClimateCard,
  EquipmentCard,
  KitchenCard,
  TerraceCard,
  type EquipmentId,
} from "./EquipmentCards";
import { ContactModal, InfoModal } from "./Modals";
import { PriceBar } from "./PriceBar";
import {
  calculateTotalPrice,
  EQUIPMENT_INFO,
  EXTERIOR_FINISHES,
  INTERIOR_FINISHES,
  PRICES,
  type EquipmentState,
} from "./data";

const INITIAL_EQUIPMENT: EquipmentState = {
  solarWater: false,
  climate: "none",
  kitchen: false,
  kitchenMl: 4,
  appliances: false,
  civil: false,
  raccordement: false,
  kitExterieur: false,
  terrace: "none",
};

/**
 * Configurador interativo premium do modelo EQUILIBRO.
 * Layout split-screen: visual fixo (65%) + painel de configuração scrollável (35%).
 */
export function EquilibroConfigurator() {
  const [exteriorId, setExteriorId] = useState(EXTERIOR_FINISHES[0].id);
  const [interiorId, setInteriorId] = useState(INTERIOR_FINISHES[0].id);
  const [equipment, setEquipment] = useState<EquipmentState>(INITIAL_EQUIPMENT);
  const [openSection, setOpenSection] = useState<string>("exterior");
  const [infoModalId, setInfoModalId] = useState<EquipmentId | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const exteriorFinish = EXTERIOR_FINISHES.find((f) => f.id === exteriorId)!;
  const interiorFinish = INTERIOR_FINISHES.find((f) => f.id === interiorId)!;
  const totalPrice = useMemo(() => calculateTotalPrice(equipment), [equipment]);

  const toggleSection = (id: string) =>
    setOpenSection((prev) => (prev === id ? "" : id));

  const updateEquipment = <K extends keyof EquipmentState>(
    key: K,
    value: EquipmentState[K]
  ) => setEquipment((prev) => ({ ...prev, [key]: value }));

  const configSummary = (
    <ul className="space-y-1">
      <li>Extérieur: {exteriorFinish.name}</li>
      <li>Intérieur: {interiorFinish.name}</li>
      {equipment.solarWater && <li>Chauffe-eau Solaire</li>}
      {equipment.climate !== "none" && (
        <li>Climatisation {equipment.climate === "solar" ? "Solaire" : "Standard"}</li>
      )}
      {equipment.kitchen && <li>Cuisine {equipment.kitchenMl} ML</li>}
      {equipment.appliances && <li>Kit Électroménager</li>}
      {equipment.civil && <li>Génie Civil</li>}
      {equipment.raccordement && <li>Raccordement</li>}
      {equipment.kitExterieur && <li>Kit extérieur</li>}
      {equipment.terrace !== "none" && (
        <li>Terrasse {equipment.terrace === "large" ? "11,80 m" : "5,90 m"}</li>
      )}
    </ul>
  );

  return (
    <div className="min-h-screen bg-luxury-papyrus font-ui text-luxury-graphite">
      <div className="lg:flex">
        {/* ─── Lado Esquerdo: Visual fixo (65%) ─── */}
        <EquilibroVisual
          exteriorFinish={exteriorFinish}
          interiorTexture={interiorFinish.texture}
        />

        {/* ─── Lado Direito: Painel de configuração (35%) ─── */}
        <main className="config-panel-scroll relative min-h-screen w-full overflow-y-auto pb-32 lg:ml-[65%] lg:w-[35%] lg:pb-28">
          <div className="px-6 py-10 lg:px-10 lg:py-14 animate-fade-in">
            {/* Cabeçalho do modelo */}
            <header className="mb-10 border-b border-luxury-stone pb-10">
              <p className="font-ui text-[10px] font-medium uppercase tracking-[0.35em] text-luxury-forest">
                Modèle Signature
              </p>
              <h1 className="mt-3 font-serif text-4xl tracking-[0.2em] text-luxury-graphite lg:text-5xl">
                EQUILIBRO
              </h1>
              <p className="mt-4 font-serif text-base italic leading-relaxed text-luxury-muted lg:text-lg">
                L&apos;équilibre parfait entre espace, lumière et fonctionnalité.
              </p>
              <p className="mt-2 font-serif text-sm italic text-luxury-muted/80">
                Conçu pour une vie harmonieuse au quotidien.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {["≈ 46 m²", "11,80 m", "2 Chambres", "4 Personnes"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-luxury-stone bg-white px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-luxury-muted"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </header>

            <TechnicalSection />

            {/* Fase 1: Décor Extérieur */}
            <ConfigSection
              id="exterior"
              phase="Phase 01"
              title="Décor Extérieur À Claire-Voie"
              subtitle="Sélectionnez votre finition de façade"
              isOpen={openSection === "exterior"}
              onToggle={() => toggleSection("exterior")}
            >
              <ExteriorPicker
                finishes={EXTERIOR_FINISHES}
                selectedId={exteriorId}
                onSelect={setExteriorId}
              />
            </ConfigSection>

            {/* Fase 2: Plaquage Intérieur */}
            <ConfigSection
              id="interior"
              phase="Phase 02"
              title="Plaquage Bois Pour Murs Intérieurs"
              isOpen={openSection === "interior"}
              onToggle={() => toggleSection("interior")}
            >
              <InteriorPicker
                finishes={INTERIOR_FINISHES}
                selectedId={interiorId}
                onSelect={setInteriorId}
              />
            </ConfigSection>

            {/* Fase 3: Équipements */}
            <ConfigSection
              id="equipment"
              phase="Phase 03"
              title="Équipements & Ingénierie"
              subtitle="Personnalisez votre installation"
              isOpen={openSection === "equipment"}
              onToggle={() => toggleSection("equipment")}
            >
              <div className="space-y-4">
                <EquipmentCard
                  title="Chauffe-eau Solaire"
                  priceLabel={`+${PRICES.solarWater} €`}
                  enabled={equipment.solarWater}
                  onToggle={(v) => updateEquipment("solarWater", v)}
                  onInfo={() => setInfoModalId("solar-water")}
                />

                <ClimateCard
                  value={equipment.climate}
                  onChange={(v) => updateEquipment("climate", v)}
                  enabled={equipment.climate !== "none"}
                  onToggle={(v) =>
                    updateEquipment("climate", v ? "standard" : "none")
                  }
                  onInfo={() => setInfoModalId("climate")}
                />

                <KitchenCard
                  enabled={equipment.kitchen}
                  ml={equipment.kitchenMl}
                  onToggle={(v) => updateEquipment("kitchen", v)}
                  onMlChange={(ml) => updateEquipment("kitchenMl", ml)}
                  onInfo={() => setInfoModalId("kitchen")}
                />

                <EquipmentCard
                  title="Kit Électroménager"
                  priceLabel={`+${PRICES.appliances} €`}
                  enabled={equipment.appliances}
                  onToggle={(v) => updateEquipment("appliances", v)}
                  onInfo={() => setInfoModalId("appliances")}
                />

                <EquipmentCard
                  title="Génie Civil / Terrassement"
                  priceLabel={`+${PRICES.civil} €`}
                  enabled={equipment.civil}
                  onToggle={(v) => updateEquipment("civil", v)}
                  onInfo={() => setInfoModalId("civil")}
                />

                <EquipmentCard
                  title="Raccordement du module"
                  priceLabel={`+${PRICES.raccordement} € HT`}
                  enabled={equipment.raccordement}
                  onToggle={(v) => updateEquipment("raccordement", v)}
                  onInfo={() => setInfoModalId("raccordement")}
                />

                <TerraceCard
                  value={equipment.terrace}
                  onChange={(v) => updateEquipment("terrace", v)}
                  enabled={equipment.terrace !== "none"}
                  onToggle={(v) =>
                    updateEquipment("terrace", v ? "compact" : "none")
                  }
                  onInfo={() => setInfoModalId("terrasse")}
                />

                <EquipmentCard
                  title="Kit extérieur"
                  priceLabel={`+${PRICES.kitExterieur} €`}
                  enabled={equipment.kitExterieur}
                  onToggle={(v) => updateEquipment("kitExterieur", v)}
                  onInfo={() => setInfoModalId("kit-exterieur")}
                />
              </div>
            </ConfigSection>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-luxury-stone/60 pt-6">
              <Link
                href="/options"
                className="font-ui text-[11px] uppercase tracking-wider text-luxury-forest hover:underline"
              >
                Toutes les options →
              </Link>
              <Link
                href="/cuisines"
                className="font-ui text-[11px] uppercase tracking-wider text-luxury-muted hover:text-luxury-forest"
              >
                Cuisines
              </Link>
              <Link
                href="/piscine"
                className="font-ui text-[11px] uppercase tracking-wider text-luxury-muted hover:text-luxury-forest"
              >
                Piscine
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Barra de preço fixa */}
      <PriceBar totalPrice={totalPrice} onCtaClick={() => setContactOpen(true)} />

      {/* Modal informativo */}
      {infoModalId && (
        <InfoModal
          isOpen={!!infoModalId}
          onClose={() => setInfoModalId(null)}
          title={EQUIPMENT_INFO[infoModalId].title}
          description={EQUIPMENT_INFO[infoModalId].description}
          specs={EQUIPMENT_INFO[infoModalId].specs}
          image={EQUIPMENT_INFO[infoModalId].image}
        />
      )}

      {/* Modal de contacto */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        totalPrice={totalPrice}
        configSummary={configSummary}
      />
    </div>
  );
}
