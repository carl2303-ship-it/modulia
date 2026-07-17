/**
 * Contenu HTML traduisible extrait des fiches dans public/opcoes/
 * — les images de fiche ne sont pas affichées telles quelles sur le site.
 */

export type OptionFeature = {
  title: string;
  description: string;
};

export type OptionVariant = {
  label: string;
  price?: string;
  description?: string;
};

export type OptionColor = {
  name: string;
  code?: string;
  description?: string;
  hex?: string;
};

export type OptionInclude = {
  title: string;
  description: string;
};

export type OptionRichContent = {
  tagline?: string;
  intro?: string;
  features?: OptionFeature[];
  specs?: { label: string; value: string }[];
  variants?: OptionVariant[];
  colors?: OptionColor[];
  includes?: OptionInclude[];
  footerHighlights?: string[];
  gallery?: string[];
  /** Personnalisations incluses liées à cette option (ex. lames pour terrasse) */
  personalizationIds?: string[];
};

const op = (file: string) => `/opcoes/${file}`;

export const OPTIONS_RICH: Record<string, OptionRichContent> = {
  "decor-exterior": {
    tagline: "Esthétique, durable & sans entretien",
    intro:
      "Façade à claire-voie avec aspect bois naturel. Système à clips ou vis invisible, résistant aux intempéries, UV et humidité.",
    features: [
      { title: "Design moderne", description: "Aspect bois naturel et élégant" },
      { title: "Résistant & durable", description: "Résiste aux intempéries, UV et humidité" },
      { title: "Installation facile", description: "Système à clips ou vis invisible" },
      { title: "Écologique", description: "Matériau recyclable et respectueux de l'environnement" },
      { title: "Sans entretien", description: "Ne se peint pas, nettoyage à l'eau claire" },
    ],
    colors: [
      { name: "Bois de pomelo", hex: "#D4A574" },
      { name: "Café", hex: "#6B4423" },
      { name: "Bois de santal", hex: "#C4A882" },
      { name: "Vert encre", hex: "#1B4332" },
      { name: "Gris bleuté", hex: "#6B7B8C" },
      { name: "Noyer noir", hex: "#2C1810" },
      { name: "Rouge brun standard", hex: "#8B4513" },
      { name: "Bois rouge standard", hex: "#A0522D" },
      { name: "Jaune standard", hex: "#C4A35A" },
      { name: "Gris standard", hex: "#808080" },
      { name: "Noyer standard", hex: "#5C4033" },
      { name: "Noyer rouge standard", hex: "#6B3A2A" },
      { name: "Noir standard", hex: "#1A1A1A" },
    ],
    footerHighlights: [
      "Résistant aux intempéries",
      "Protection UV",
      "Anti-humidité / anti-moisissure",
      "Durable dans le temps",
    ],
    gallery: [op("decor exterieur.jpg")],
  },

  "lames-terrasse": {
    tagline: "Imperméable et anti-dérapant, sans entretien et sans odeur",
    intro:
      "Lames de terrasse en bois composite premium — résistantes aux UV, au gel et aux intempéries.",
    features: [
      { title: "Étanche", description: "100 % imperméable" },
      { title: "Anti-dérapant", description: "Surface sécurisée même mouillée" },
      { title: "Sans entretien", description: "Nettoyage facile à l'eau claire" },
      { title: "Sans odeur", description: "Matériau sans odeur désagréable" },
      { title: "Résistant", description: "Résiste aux UV, intempéries et gel" },
      { title: "Écologique", description: "Matériau recyclable" },
    ],
    colors: [
      { name: "Beige sable", hex: "#D4C4A8" },
      { name: "Chêne clair", hex: "#C9A86C" },
      { name: "Teck", hex: "#8B6914" },
      { name: "Noyer", hex: "#5C4033" },
      { name: "Gris", hex: "#6B6B6B" },
      { name: "Anthracite", hex: "#3D3D3D" },
    ],
    footerHighlights: [
      "Imperméable",
      "Anti-dérapant",
      "Sans entretien",
      "Durable et robuste",
      "Écologique et recyclable",
    ],
    gallery: [op("lames terrasse.jpg")],
  },

  terrasses: {
    tagline: "La nature comme prolongement",
    intro:
      "Terrasse supplémentaire en bois composite premium — en complément de la terrasse déjà incluse avec votre modèle Modulia.",
    features: [
      { title: "Résistantes aux intempéries", description: "Conçues pour l'extérieur" },
      { title: "Durables et solides", description: "Structure fiable dans le temps" },
      { title: "Entretien facile", description: "Nettoyage simple" },
      { title: "Bois composite premium", description: "Finition haut de gamme" },
    ],
    variants: [
      {
        label: "Grande terrasse 11,80 m",
        price: "11 000 € TTC",
        description: "Pour profiter pleinement de vos extérieurs",
      },
      {
        label: "Format compact 5,90 m",
        price: "7 000 € TTC",
        description: "Idéal pour petits espaces ou extensions",
      },
    ],
    footerHighlights: [
      "Résistante aux intempéries",
      "Anti-UV — ne décolore pas",
      "100 % recyclable",
      "Installation rapide et simple",
    ],
    gallery: [op("terrasses.png")],
  },

  "murs-interieurs": {
    tagline: "Aspect naturel, élégance intemporelle",
    intro:
      "Plaquage bois pour murs intérieurs — finitions chaleureuses et contemporaines, faciles à poser.",
    features: [
      { title: "Pin blanc", description: "Clair & lumineux" },
      { title: "Érable", description: "Doux & chaleureux" },
      { title: "Frêne gris", description: "Moderne & raffiné" },
      { title: "Noyer gris", description: "Élégant, intense ou profond selon la teinte" },
    ],
    colors: [
      { name: "Pin blanc", hex: "#F5F0E8", description: "Clair & lumineux" },
      { name: "Érable", hex: "#E8C9A0", description: "Doux & chaleureux" },
      { name: "Frêne gris", hex: "#B8B5AE", description: "Moderne & raffiné" },
      { name: "Noyer gris clair", hex: "#8B7355", description: "Élégant & intemporel" },
      { name: "Noyer gris foncé", hex: "#5C4A3D", description: "Intense & contemporain" },
      { name: "Noyer gris profond", hex: "#3D3229", description: "Profond & sophistiqué" },
    ],
    footerHighlights: [
      "Aspect naturel",
      "Résistant et durable",
      "Facile à poser",
      "Entretien facile",
      "Solution écologique",
    ],
    gallery: [op("plaquages bois.jpg")],
  },

  "murs-decoratifs": {
    tagline: "Série tissu, bois et pierre",
    intro:
      "Revêtements muraux décoratifs esthétiques, durables et faciles à entretenir — finitions bois, tissu, pierre et marbre.",
    features: [
      { title: "Design moderne", description: "Aspect naturel et élégant" },
      { title: "Résistant & durable", description: "Résiste aux UV et à l'humidité" },
      { title: "Installation facile", description: "Clips ou vis invisible" },
      { title: "Sans entretien", description: "Nettoyage à l'eau claire" },
    ],
    colors: [
      // Finitions bois à claire-voie
      { name: "Bois de pomelo", description: "Claire-voie", hex: "#C9956A" },
      { name: "Café", description: "Claire-voie", hex: "#5F4334" },
      { name: "Bois de santal", description: "Claire-voie", hex: "#8B5A3C" },
      { name: "Vert encre", description: "Claire-voie", hex: "#4A5238" },
      { name: "Gris bleuté", description: "Claire-voie", hex: "#6B7078" },
      { name: "Noyer noir", description: "Claire-voie", hex: "#2A221F" },
      // Série tissu
      { name: "Toile gris bleuté", code: "X386-A155", description: "Série tissu", hex: "#A8AEB8" },
      { name: "Lin lavande", code: "353-A155", description: "Série tissu", hex: "#D4D0D8" },
      { name: "Lin gris clair", code: "X526-A201", description: "Série tissu", hex: "#D6D4D0" },
      // Série pierre & marbre
      { name: "Marbre blanc", code: "D9006-1", description: "Série marbre", hex: "#F0ECEC" },
      { name: "Fleur de glace blanche", code: "D9013-1", description: "Série marbre", hex: "#EBE2E0" },
      { name: "Roche grise", code: "D9807-200", description: "Série pierre", hex: "#C5C0C0" },
      { name: "Gris fin", code: "D9051-1", description: "Série marbre", hex: "#C6C3C9" },
      // Série bois fin / mate / unie
      { name: "Érable", code: "M8025-300", description: "Série bois fin", hex: "#E0D4C4" },
      { name: "Noyer gris", code: "M8037-9", description: "Série bois fin", hex: "#8B7B6B" },
      { name: "Lin étoilé", code: "XZ213-001", description: "Jaune clair · Série mate", hex: "#EDE6D4" },
      { name: "Café au lait", code: "XC1003-2", description: "Série unie", hex: "#C4A882" },
      { name: "Bois ancien", code: "M8041-7", description: "Série bois fin", hex: "#A89078" },
    ],
    footerHighlights: [
      "Résistant à l'humidité",
      "Facile à nettoyer",
      "Matériaux de qualité",
      "Écologique",
      "Design moderne et élégant",
    ],
    gallery: [op("revetements muraux decoratifs.jpg")],
  },

  parquet: {
    tagline: "Revêtement de sol flottant",
    intro:
      "Parquet flottant à clipser sans colle — aspect bois authentique, résistant et facile d'entretien.",
    features: [
      { title: "Résistant & durable", description: "Résiste aux intempéries, UV et humidité" },
      { title: "Installation facile", description: "Système à clips sans colle" },
      { title: "Facile à entretenir", description: "Nettoyage simple à l'eau claire" },
      { title: "Design naturel", description: "Aspect bois authentique et élégant" },
    ],
    colors: [
      { name: "Chêne brun", hex: "#6B4423" },
      { name: "Chêne naturel", hex: "#C9A86C" },
      { name: "Gris cendré", hex: "#9A9690" },
      { name: "Noir charbon", hex: "#2C2C2C" },
      { name: "Chêne clair", hex: "#E8D4B0" },
      { name: "Gris anthracite", hex: "#4A4A4A" },
      { name: "Acajou", hex: "#6B3A2A" },
      { name: "Gris perle", hex: "#D4D0C8" },
      { name: "Noyer foncé", hex: "#3D2817" },
      { name: "Chêne miel", hex: "#D4A050" },
      { name: "Gris driftwood", hex: "#A8A098" },
      { name: "Noyer brun", hex: "#5C4033" },
    ],
    footerHighlights: [
      "Résistant aux chocs",
      "Anti-humidité / anti-moisissure",
      "Protection UV",
      "Pose rapide sans colle",
      "Écologique et recyclable",
    ],
    gallery: [op("parquet flottant.jpg")],
  },

  "sdb-couleurs": {
    tagline: "Plaquage étanche pour salle de bains",
    intro:
      "Revêtement mural de salle de bains 100 % imperméable — résistant à l'humidité, facile à nettoyer.",
    features: [
      { title: "Étanche", description: "100 % imperméable" },
      { title: "Résistant", description: "À l'humidité et aux éclaboussures" },
      { title: "Facile à nettoyer", description: "Entretien simplifié" },
      { title: "Installation rapide", description: "Pose professionnelle" },
    ],
    colors: [
      { name: "Gris clair", code: "PN-8007", description: "Texture fine", hex: "#D0CFD2" },
      { name: "Beige", code: "PH-8036-BS656", description: "Effet bois naturel", hex: "#DAC9BA" },
      { name: "Gris lin", code: "5-815-A138", description: "Effet tissu", hex: "#B8B6B4" },
      { name: "Blanc cassé", code: "B-315", description: "Effet lin", hex: "#EFE6E1" },
      { name: "Béton clair", code: "D-039", description: "Effet minéral", hex: "#C9C6C4" },
      { name: "Marbre blanc", code: "S-413", description: "Effet marbre", hex: "#F2F0F0" },
    ],
    footerHighlights: ["Étanche", "Résistant à l'humidité", "Facile à nettoyer", "Écologique"],
    gallery: [op("murs salle de bains.jpg")],
  },

  "kit-sdb": {
    tagline: "Design moderne noir mat",
    intro:
      "Kit d'accessoires salle de bains en finition noir mat — élégant, discret et prêt à installer dans votre module Modulia.",
    includes: [
      { title: "Porte-serviettes", description: "Pratique et élégant, espace optimisé" },
      { title: "Porte-savon", description: "Robuste et raffiné, facile à nettoyer" },
      { title: "Porte-papier", description: "Protection et durabilité" },
      { title: "Patère murale", description: "Solide, discrète et multi-usage" },
      { title: "Brosse WC", description: "Hygiénique, finition haut de gamme" },
      { title: "Porte-verre", description: "Verre dépoli, fixation sécurisée" },
    ],
    specs: [{ label: "Prix", value: "149 € TTC" }],
    footerHighlights: [
      "Résistant à l'humidité",
      "Durable et fiable",
      "Facile à nettoyer",
      "Installation simple",
      "Design moderne noir mat",
    ],
    gallery: [op("kit salle de bains.jpg")],
  },

  "vmc-sdb": {
    tagline: "Air sain, confort au quotidien",
    intro:
      "Ventilation mécanique pour salle de bains — évacuation efficace de l'humidité, fonctionnement silencieux.",
    features: [
      {
        title: "Évacuation efficace",
        description: "Élimine l'humidité, les odeurs et les polluants",
      },
      {
        title: "Fonctionnement silencieux",
        description: "Ventilation performante et discrète",
      },
      {
        title: "Protège votre salle de bains",
        description: "Prévient humidité, moisissure et mauvaises odeurs",
      },
      {
        title: "Économique & durable",
        description: "Faible consommation et longue durée de vie",
      },
    ],
    specs: [{ label: "Prix", value: "49 € TTC" }],
    footerHighlights: [
      "Air sain et confortable",
      "Installation facile",
      "Silencieuse et efficace",
      "Économique et durable",
    ],
    gallery: [op("ventilation mecanique.png")],
  },

  rideaux: {
    tagline: "Vendus au mètre linéaire",
    intro:
      "Rideaux occultants 100 % occultants — isolation phonique et thermique, tissu épais premium.",
    features: [
      { title: "Occultation totale", description: "Bloque la lumière pour un confort optimal" },
      { title: "Isolation phonique", description: "Réduit les bruits extérieurs" },
      { title: "Isolation thermique", description: "Conserve chaleur en hiver, fraîcheur en été" },
      { title: "Intimité préservée", description: "Protection des regards" },
      { title: "Tissu épais", description: "Qualité premium et durable" },
    ],
    colors: [
      { name: "Blanc", hex: "#FFFFFF" },
      { name: "Beige", hex: "#D4C4A8" },
      { name: "Gris clair", hex: "#C0C0C0" },
      { name: "Gris moyen", hex: "#808080" },
      { name: "Anthracite", hex: "#3D3D3D" },
      { name: "Bleu marine", hex: "#1B2A4A" },
      { name: "Vert sapin", hex: "#1B4332" },
      { name: "Taupe", hex: "#8B7D6B" },
      { name: "Noir", hex: "#1A1A1A" },
    ],
    specs: [{ label: "Tarif", value: "220 € TTC / mètre linéaire" }],
    footerHighlights: [
      "Sur mesure",
      "Finition soignée",
      "Entretien facile — lavable machine",
      "Qualité premium 100 % occultant",
    ],
    gallery: [op("rideaux.png")],
  },

  poignee: {
    tagline: "Sécurité et confort au quotidien",
    intro:
      "Poignée connectée intelligente — ouverture par empreinte, code PIN, carte RFID ou application mobile.",
    features: [
      { title: "Empreinte digitale", description: "Rapide et sécurisée" },
      { title: "Code PIN", description: "Saisie du code personnalisé" },
      { title: "Carte RFID", description: "Carte d'accès sécurisée" },
      { title: "Application mobile", description: "Contrôle à distance et gestion des accès" },
    ],
    specs: [
      { label: "Connectivité", value: "Wi-Fi intégré · Bluetooth" },
      { label: "Autonomie", value: "Piles jusqu'à 12 mois" },
      { label: "Prix", value: "225 € TTC" },
    ],
    footerHighlights: [
      "Sécurité renforcée",
      "Accès simplifié",
      "Alertes en temps réel",
      "Autonomie longue",
      "Installation facile",
    ],
    gallery: [op("poignee connectee.png")],
  },

  "chauffe-eau-solaire": {
    tagline: "En option — à la place du chauffe-eau électrique",
    intro:
      "Chauffe-eau solaire Haier — énergie renouvelable pour réduire vos factures et votre empreinte carbone.",
    features: [
      { title: "Énergie renouvelable", description: "Utilise l'énergie gratuite du soleil" },
      { title: "Économique", description: "Réduit vos factures d'énergie" },
      { title: "Durable", description: "Matériel fiable et longue durée de vie" },
      { title: "Écologique", description: "Zéro émission, respectueux de l'environnement" },
    ],
    specs: [{ label: "Prix", value: "875 € TTC" }],
    footerHighlights: [
      "Installation facile — système complet",
      "Eau chaude garantie toute l'année",
      "Solution durable",
    ],
    gallery: [op("chauffe eau solaire.jpg")],
  },

  climatisation: {
    tagline: "Solaire ou standard — modules pré-équipés",
    intro:
      "Climatisation intégrée pour un confort thermique toute l'année. Les modules Modulia sont pré-équipés.",
    features: [
      { title: "Climatisation solaire", description: "Écologique, autonome avec batterie intégrée" },
      { title: "Climatisation standard", description: "Performance optimale, fonctionnement silencieux" },
    ],
    variants: [
      {
        label: "Climatisation standard",
        price: "349 € TTC",
        description: "Refroidissement rapide, installation simple",
      },
      {
        label: "Climatisation solaire",
        price: "1 850 € TTC",
        description: "Panneaux solaires + batterie, moins de dépendance au réseau",
      },
    ],
    footerHighlights: [
      "Modules pré-équipés",
      "Installation rapide",
      "Confort toute l'année",
    ],
    gallery: [op("climatisation.jpg")],
  },

  "genie-civil": {
    tagline: "Préparation des plots sur votre terrain",
    intro:
      "Génie civil et terrassement — préparation, nivellement et implantation précise des fondations.",
    features: [
      { title: "Terrassement", description: "Préparation et nivellement de votre terrain" },
      { title: "Implantation précise", description: "Positionnement parfait des plots" },
      { title: "Travaux sécurisés", description: "Respect des normes et de la stabilité" },
      { title: "Travail propre et rapide", description: "Matériel professionnel et équipe qualifiée" },
    ],
    specs: [{ label: "Prix", value: "3 000 € HT" }],
    footerHighlights: [
      "Expertise et expérience",
      "Respect des délais et du budget",
      "Équipe qualifiée et matériel adapté",
      "Accompagnement personnalisé",
    ],
    gallery: [op("terrassement.png")],
  },

  raccordement: {
    tagline: "Eau · Électricité · Écoulement",
    intro:
      "Raccordement complet de votre module aux réseaux — installation conforme et sécurisée.",
    features: [
      { title: "Eau", description: "Raccordement aux arrivées d'eau, installation sécurisée" },
      { title: "Électricité", description: "Raccordement au réseau, mise en sécurité" },
      { title: "Écoulement", description: "Raccordement aux évacuations, sans fuite" },
    ],
    specs: [{ label: "Prix", value: "2 000 € HT" }],
    footerHighlights: [
      "Installation conforme",
      "Sécurité garantie",
      "Travail soigné et professionnel",
      "Intervention rapide",
    ],
    gallery: [op("raccordement.png")],
  },

  transport: {
    tagline: "Dans un rayon de 30 km",
    intro:
      "Transport et grutage professionnels inclus dans un rayon de 30 km autour du lieu de livraison.",
    features: [
      { title: "Transport sécurisé", description: "Livraison dans les meilleures conditions" },
      { title: "Grutage professionnel", description: "Déchargement et pose par des experts" },
      { title: "Rayon de 30 km", description: "Prestation incluse autour du lieu de livraison" },
      { title: "Sécurité & matériel", description: "Intervention conforme aux normes" },
    ],
    footerHighlights: [
      "Transport inclus",
      "Grutage inclus",
      "Rayon 30 km",
      "Sécurité garantie",
    ],
    gallery: [op("transport.jpg")],
  },

  "kit-exterieur": {
    tagline: "Fonctionnel & résistant",
    intro:
      "Tout le nécessaire pour un extérieur pratique et durable — éclairage, prises étanches et robinet.",
    includes: [
      { title: "2× Appliques murales", description: "Éclairage haut et bas, design moderne" },
      { title: "2× Prises de courant", description: "Étanches IP44 avec clapet de protection" },
      { title: "1× Robinet 2 sorties", description: "Double sortie, raccord rapide universel" },
      { title: "Inclus", description: "Raccords rapides, tuyau & arrosoir — prêt à l'emploi" },
    ],
    specs: [{ label: "Prix", value: "149 € TTC" }],
    footerHighlights: [
      "Résistant aux intempéries",
      "Étanche IP44",
      "Facile à installer",
      "Matériaux durables",
    ],
    gallery: [op("kit exterieur.png")],
  },
};

export function getOptionRich(id: string): OptionRichContent | undefined {
  return OPTIONS_RICH[id];
}
