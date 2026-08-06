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
      "Murs : panneaux isolants laine de roche 70 mm",
      "Isolation performante : XPS + laine de roche 70 mm",
      "Isolation acoustique : ≈ 35–45 dB selon composition",
      "Étanchéité : pare-vapeur + joints EPDM",
    ],
  },
  {
    id: "menuiseries",
    title: "Menuiseries",
    items: [
      "Porte aluminium",
      "Fenêtres aluminium double vitrage",
      "Baies vitrées aluminium double vitrage",
    ],
  },
  {
    id: "toiture",
    title: "Toiture",
    items: [
      "Type : toit plat technique",
      "Isolation intégrée",
      "Étanchéité : membrane EPDM ou PVC",
    ],
  },
  {
    id: "equipements",
    title: "Équipements techniques",
    items: [
      "Électricité : installation aux normes NFC 15-100, tableau électrique intégré",
      "Plomberie : réseaux eau chaude / froide préinstallés, évacuation PVC",
      "Climatisation : standard ou solaire",
      "Ventilation : VMC mécanique ou électrique",
    ],
  },
  {
    id: "interieur",
    title: "Aménagement intérieur",
    items: [
      "Revêtements de sol : sol PVC",
      "Carrelage : salle d'eau uniquement",
      "Cuisine : en partie aménagée",
      "Salle d'eau : douche, WC, meuble vasque préinstallés",
      "Terrasse : acier laqué et bois composite (selon modèle)",
    ],
  },
  {
    id: "transport",
    title: "Transport & installation",
    items: [
      "Livraison : transport routier sur camion plateau",
      "Pose : sur dalle béton, plots béton ou pieux métalliques — préparer min. 3 semaines avant",
      "Temps d'installation : 2 jours par module (raccordement eau, eaux usées, électricité inclus)",
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
