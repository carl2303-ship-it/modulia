/**
 * Spécifications techniques officielles — Modulia (texte propriétaire)
 */

export type TechnicalSpecSection = {
  id: string;
  title: string;
  items: string[];
};

export const TECHNICAL_SPECS_SECTIONS: TechnicalSpecSection[] = [
  {
    id: "structure",
    title: "Structure générale",
    items: [
      "Type : module préfabriqué habitable, transportable",
      "Structure porteuse : châssis en acier galvanisé ou acier thermolaqué",
      "Cadre autoportant conçu pour le transport et la pose par grue",
      "Durée de vie estimée : 30 à 50 ans selon entretien",
    ],
  },
  {
    id: "dimensions",
    title: "Dimensions & modularité",
    items: [
      "Longueur module : 5,90 à 11,80 m",
      "Largeur : 2,25 à 9 m",
      "Hauteur intérieure : 2,10 à 2,15 m",
      "Assemblage : modules juxtaposables ou superposables",
      "Surface : de 13 m² à plus de 100 m² selon configuration",
    ],
  },
  {
    id: "enveloppe",
    title: "Enveloppe & isolation",
    items: [
      "Murs extérieurs : panneaux sandwich acier / aluminium, isolation intégrée (laine de roche, laine de verre ou mousse PU)",
      "Isolation thermique conforme RE2020 / équivalent — R murs ≈ 3 à 4 m²·K/W, R toiture ≈ 5 à 6 m²·K/W",
      "Isolation acoustique : ≈ 35–45 dB selon composition",
      "Étanchéité : pare-vapeur + joints EPDM",
    ],
  },
  {
    id: "menuiseries",
    title: "Menuiseries",
    items: [
      "Façades vitrées : grandes baies vitrées aluminium",
      "Vitrage : double vitrage isolant (option triple vitrage), traitement thermique et solaire possible",
      "Portes : entrée aluminium sécurisée, serrure multipoints",
    ],
  },
  {
    id: "toiture",
    title: "Toiture",
    items: [
      "Type : toit plat technique",
      "Étanchéité : membrane EPDM ou PVC",
      "Options : toiture végétalisée, panneaux photovoltaïques",
    ],
  },
  {
    id: "equipements",
    title: "Équipements techniques",
    items: [
      "Électricité : installation aux normes NFC 15-100, tableau électrique intégré",
      "Plomberie : réseaux eau chaude / froide préinstallés, évacuation PVC",
      "Chauffage / climatisation : climatisation réversible (split ou gainable), option plancher chauffant",
      "Ventilation : VMC simple ou double flux",
    ],
  },
  {
    id: "interieur",
    title: "Aménagement intérieur",
    items: [
      "Revêtements de sol : PVC, parquet stratifié, carrelage",
      "Murs intérieurs : panneaux décoratifs ou plaques de plâtre",
      "Cuisine : bloc kitchenette prééquipé (option)",
      "Salle d'eau : douche, WC, meuble vasque préinstallés",
    ],
  },
  {
    id: "transport",
    title: "Transport & installation",
    items: [
      "Livraison : transport routier sur camion plateau",
      "Pose : sur dalle béton, plots béton ou pieux métalliques",
      "Temps d'installation : 1 à 3 jours (hors raccordements)",
    ],
  },
  {
    id: "usages",
    title: "Usages courants",
    items: [
      "Maison individuelle",
      "Bureau / open space",
      "Logement étudiant",
      "Hôtel modulaire",
      "Base vie de chantier",
      "Résidence secondaire",
    ],
  },
];
