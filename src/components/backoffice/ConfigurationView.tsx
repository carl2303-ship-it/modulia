"use client";

type ConfigData = {
  modelSlug?: string;
  finitions?: Record<string, string>;
  paid?: {
    toggles?: Record<string, boolean>;
    terrasse?: string;
    climate?: string;
    solarWater?: string;
    rideauxMl?: number;
  };
  kitchen?: {
    packs?: string[];
    appliances?: string;
  };
  pool?: {
    enabled?: boolean;
    shellColor?: string;
    linerColor?: string;
    fabricColor?: string;
    options?: string[];
  };
  summary?: string[];
};

const FINITION_LABELS: Record<string, string> = {
  "decor-exterior": "Décor extérieur",
  "lames-terrasse": "Lames de terrasse",
  "murs-decoratifs": "Revêtements muraux",
  "parquet": "Sol PVC / Parquet",
  "sdb-couleurs": "Salle de bains",
};

const TERRASSE_LABELS: Record<string, string> = {
  compact: "Terrasse compacte (5,90 m)",
  large: "Terrasse large (11,80 m)",
};

const CLIMATE_LABELS: Record<string, string> = {
  standard: "Climatisation standard",
  solar: "Climatisation solaire",
};

const SOLAR_WATER_LABELS: Record<string, string> = {
  "150L": "Chauffe-eau solaire 150 L",
  "200L": "Chauffe-eau solaire 200 L",
};

const TOGGLE_LABELS: Record<string, string> = {
  "vmc-sdb": "Ventilation mécanique salle de bains",
  "kit-exterieur": "Kit extérieur",
  "kit-sdb": "Kit salle de bains",
  "rideaux": "Rideaux",
  "pergola": "Pergola",
  "store-banne": "Store banne",
  "volets-roulants": "Volets roulants",
  "panneaux-solaires": "Panneaux solaires",
  "domotique": "Domotique",
  "alarme": "Alarme",
  "borne-recharge": "Borne de recharge EV",
};

const KITCHEN_PACK_LABELS: Record<string, string> = {
  "cuisine-premium": "Option Premium",
  "cuisine-ilot": "Îlot central",
  "cuisine-wine": "Cave à vin",
};

const POOL_SHELL_LABELS: Record<string, string> = {
  blanc: "Blanc",
  gris: "Gris",
  beige: "Beige",
  anthracite: "Gris anthracite",
  bleu: "Bleu",
};

const POOL_OPTION_LABELS: Record<string, string> = {
  "pool-house": "Pool House",
  "pool-chauffage": "Chauffage piscine",
  "pool-couverture": "Couverture automatique",
  "pool-nage": "Contre-courant de nage",
  "pool-lumiere": "Éclairage LED",
  "pool-robot": "Robot nettoyeur",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-luxury-stone/40 last:border-0">
      <span className="font-ui text-[11px] uppercase tracking-wider text-luxury-muted shrink-0">{label}</span>
      <span className="font-ui text-sm text-luxury-graphite text-right">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-luxury-stone bg-luxury-papyrus/50 p-4">
      <p className="mb-3 font-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-luxury-forest">
        {title}
      </p>
      {children}
    </div>
  );
}

type Props = { configuration: string };

export function ConfigurationView({ configuration }: Props) {
  let data: ConfigData;
  try {
    data = JSON.parse(configuration) as ConfigData;
  } catch {
    // Fallback: se não for JSON válido, mostrar como texto simples mas formatado
    return (
      <pre className="whitespace-pre-wrap font-ui text-sm text-luxury-muted">{configuration}</pre>
    );
  }

  const { finitions, paid, kitchen, pool } = data;

  const hasFinitions = finitions && Object.values(finitions).some(Boolean);
  const hasPaidOptions =
    paid &&
    (paid.terrasse !== "none" ||
      paid.climate !== "none" ||
      paid.solarWater !== "none" ||
      Object.values(paid.toggles ?? {}).some(Boolean));
  const hasKitchen =
    kitchen && ((kitchen.packs?.length ?? 0) > 0 || kitchen.appliances === "option");
  const hasPool = pool?.enabled;

  return (
    <div className="space-y-4">
      {/* Modèle */}
      {data.modelSlug && (
        <Section title="Modèle">
          <Row
            label="Modèle"
            value={
              data.summary?.[0]?.replace(/^Modèle\s*:\s*/i, "").trim() ||
              data.modelSlug.toUpperCase()
            }
          />
        </Section>
      )}

      {/* Finitions */}
      {hasFinitions && (
        <Section title="Finitions & couleurs">
          {Object.entries(finitions!).map(([id, value]) =>
            value ? (
              <Row key={id} label={FINITION_LABELS[id] ?? id} value={value} />
            ) : null,
          )}
        </Section>
      )}

      {/* Options payantes */}
      {hasPaidOptions && (
        <Section title="Options & équipements">
          {paid!.terrasse && paid!.terrasse !== "none" && (
            <Row label="Terrasse" value={TERRASSE_LABELS[paid!.terrasse] ?? paid!.terrasse} />
          )}
          {paid!.climate && paid!.climate !== "none" && (
            <Row
              label="Climatisation"
              value={CLIMATE_LABELS[paid!.climate] ?? paid!.climate}
            />
          )}
          {paid!.solarWater && paid!.solarWater !== "none" && (
            <Row
              label="Chauffe-eau"
              value={SOLAR_WATER_LABELS[paid!.solarWater] ?? paid!.solarWater}
            />
          )}
          {Object.entries(paid!.toggles ?? {}).map(([id, on]) =>
            on ? (
              <Row
                key={id}
                label={TOGGLE_LABELS[id] ?? id}
                value={
                  id === "rideaux" && paid!.rideauxMl
                    ? `${paid!.rideauxMl} ml`
                    : "Inclus"
                }
              />
            ) : null,
          )}
        </Section>
      )}

      {/* Cuisine */}
      {hasKitchen && (
        <Section title="Cuisine">
          <Row label="Base" value="Cuisine équipée (incluse)" />
          {kitchen!.packs?.map((id) => (
            <Row key={id} label="Option" value={KITCHEN_PACK_LABELS[id] ?? id} />
          ))}
          {kitchen!.appliances === "option" && (
            <Row label="Électroménager" value="Pack Premium" />
          )}
        </Section>
      )}

      {/* Piscine */}
      {hasPool && (
        <Section title="Piscine SOFA POOL">
          {pool!.shellColor && (
            <Row
              label="Couleur coque"
              value={POOL_SHELL_LABELS[pool!.shellColor] ?? pool!.shellColor}
            />
          )}
          {pool!.fabricColor && (
            <Row label="Référence toile" value={pool!.fabricColor.toUpperCase()} />
          )}
          {pool!.options?.map((id) => (
            <Row key={id} label="Option" value={POOL_OPTION_LABELS[id] ?? id} />
          ))}
        </Section>
      )}

      {/* Fallback si rien de structuré */}
      {!hasFinitions && !hasPaidOptions && !hasKitchen && !hasPool && (
        <p className="font-ui text-sm text-luxury-muted">
          Aucune option configurée.
        </p>
      )}
    </div>
  );
}
