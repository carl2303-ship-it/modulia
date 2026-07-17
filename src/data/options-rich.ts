/**
 * Contenu HTML traduisible extrait des fiches dans public/opcoes/
 * — les images de fiche ne sont pas affichées telles quelles sur le site.
 */

import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

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

/** Traductions PT/EN du contenu riche — la galerie et les personalizationIds restent partagés (FR = source) */
type RichOverlay = Partial<Omit<OptionRichContent, "gallery" | "personalizationIds">>;

export const OPTIONS_RICH_I18N: Record<string, Partial<Record<Locale, RichOverlay>>> = {
  "decor-exterior": {
    pt: {
      tagline: "Estética, durável e sem manutenção",
      intro:
        "Fachada em ripado com aspeto de madeira natural. Sistema de encaixe ou parafuso invisível, resistente às intempéries, UV e humidade.",
      features: [
        { title: "Design moderno", description: "Aspeto de madeira natural e elegante" },
        { title: "Resistente e durável", description: "Resiste às intempéries, UV e humidade" },
        { title: "Instalação fácil", description: "Sistema de encaixe ou parafuso invisível" },
        { title: "Ecológico", description: "Material reciclável e respeitador do ambiente" },
        { title: "Sem manutenção", description: "Não pinta, limpeza apenas com água" },
      ],
      colors: [
        { name: "Madeira toranja", hex: "#D4A574" },
        { name: "Café", hex: "#6B4423" },
        { name: "Madeira sândalo", hex: "#C4A882" },
        { name: "Verde tinta", hex: "#1B4332" },
        { name: "Cinza azulado", hex: "#6B7B8C" },
        { name: "Nogueira preta", hex: "#2C1810" },
        { name: "Castanho-avermelhado standard", hex: "#8B4513" },
        { name: "Madeira vermelha standard", hex: "#A0522D" },
        { name: "Amarelo standard", hex: "#C4A35A" },
        { name: "Cinza standard", hex: "#808080" },
        { name: "Nogueira standard", hex: "#5C4033" },
        { name: "Nogueira avermelhada standard", hex: "#6B3A2A" },
        { name: "Preto standard", hex: "#1A1A1A" },
      ],
      footerHighlights: [
        "Resistente às intempéries",
        "Proteção UV",
        "Anti-humidade / anti-mofo",
        "Durável ao longo do tempo",
      ],
    },
    en: {
      tagline: "Aesthetic, durable and maintenance-free",
      intro:
        "Slatted cladding with a natural wood look. Clip or hidden-screw fitting system, weatherproof, UV- and moisture-resistant.",
      features: [
        { title: "Modern design", description: "Natural, elegant wood look" },
        { title: "Resistant & durable", description: "Weather, UV and moisture resistant" },
        { title: "Easy installation", description: "Clip or hidden-screw system" },
        { title: "Eco-friendly", description: "Recyclable, environmentally responsible material" },
        { title: "Maintenance-free", description: "Never needs painting, clean with water only" },
      ],
      colors: [
        { name: "Pomelo wood", hex: "#D4A574" },
        { name: "Coffee", hex: "#6B4423" },
        { name: "Sandalwood", hex: "#C4A882" },
        { name: "Ink green", hex: "#1B4332" },
        { name: "Blue-grey", hex: "#6B7B8C" },
        { name: "Black walnut", hex: "#2C1810" },
        { name: "Standard red-brown", hex: "#8B4513" },
        { name: "Standard red wood", hex: "#A0522D" },
        { name: "Standard yellow", hex: "#C4A35A" },
        { name: "Standard grey", hex: "#808080" },
        { name: "Standard walnut", hex: "#5C4033" },
        { name: "Standard red walnut", hex: "#6B3A2A" },
        { name: "Standard black", hex: "#1A1A1A" },
      ],
      footerHighlights: [
        "Weather-resistant",
        "UV protection",
        "Moisture / mould resistant",
        "Long-lasting durability",
      ],
    },
  },

  "lames-terrasse": {
    pt: {
      tagline: "Impermeável e antiderrapante, sem manutenção e sem odor",
      intro:
        "Lâminas de terraço em madeira compósita premium — resistentes aos UV, ao gelo e às intempéries.",
      features: [
        { title: "Estanque", description: "100 % impermeável" },
        { title: "Antiderrapante", description: "Superfície segura mesmo húmida" },
        { title: "Sem manutenção", description: "Limpeza fácil apenas com água" },
        { title: "Sem odor", description: "Material sem odor desagradável" },
        { title: "Resistente", description: "Resiste aos UV, intempéries e gelo" },
        { title: "Ecológico", description: "Material reciclável" },
      ],
      colors: [
        { name: "Areia bege", hex: "#D4C4A8" },
        { name: "Carvalho claro", hex: "#C9A86C" },
        { name: "Teca", hex: "#8B6914" },
        { name: "Nogueira", hex: "#5C4033" },
        { name: "Cinza", hex: "#6B6B6B" },
        { name: "Antracite", hex: "#3D3D3D" },
      ],
      footerHighlights: [
        "Impermeável",
        "Antiderrapante",
        "Sem manutenção",
        "Durável e robusto",
        "Ecológico e reciclável",
      ],
    },
    en: {
      tagline: "Waterproof and slip-resistant, maintenance-free and odourless",
      intro:
        "Premium composite wood deck boards — UV, frost and weather resistant.",
      features: [
        { title: "Waterproof", description: "100 % watertight" },
        { title: "Slip-resistant", description: "Safe surface even when wet" },
        { title: "Maintenance-free", description: "Easy cleaning with water only" },
        { title: "Odourless", description: "No unpleasant smell" },
        { title: "Resistant", description: "Resists UV, weather and frost" },
        { title: "Eco-friendly", description: "Recyclable material" },
      ],
      colors: [
        { name: "Sand beige", hex: "#D4C4A8" },
        { name: "Light oak", hex: "#C9A86C" },
        { name: "Teak", hex: "#8B6914" },
        { name: "Walnut", hex: "#5C4033" },
        { name: "Grey", hex: "#6B6B6B" },
        { name: "Anthracite", hex: "#3D3D3D" },
      ],
      footerHighlights: [
        "Waterproof",
        "Slip-resistant",
        "Maintenance-free",
        "Durable and robust",
        "Eco-friendly and recyclable",
      ],
    },
  },

  terrasses: {
    pt: {
      tagline: "A natureza como prolongamento",
      intro:
        "Terraço adicional em madeira compósita premium — complementar ao terraço já incluído no seu modelo Modulia.",
      features: [
        { title: "Resistentes às intempéries", description: "Concebidas para o exterior" },
        { title: "Duráveis e sólidas", description: "Estrutura fiável ao longo do tempo" },
        { title: "Manutenção fácil", description: "Limpeza simples" },
        { title: "Madeira compósita premium", description: "Acabamento de alta gama" },
      ],
      variants: [
        {
          label: "Terraço grande 11,80 m",
          price: "11 000 € c/IVA",
          description: "Para aproveitar totalmente o seu exterior",
        },
        {
          label: "Formato compacto 5,90 m",
          price: "7 000 € c/IVA",
          description: "Ideal para espaços pequenos ou extensões",
        },
      ],
      footerHighlights: [
        "Resistente às intempéries",
        "Anti-UV — não desbota",
        "100 % reciclável",
        "Instalação rápida e simples",
      ],
    },
    en: {
      tagline: "Nature as an extension of your home",
      intro:
        "Extra terrace in premium composite wood — complementing the terrace already included with your Modulia model.",
      features: [
        { title: "Weather-resistant", description: "Designed for outdoor use" },
        { title: "Durable and solid", description: "Reliable structure over time" },
        { title: "Easy upkeep", description: "Simple cleaning" },
        { title: "Premium composite wood", description: "High-end finish" },
      ],
      variants: [
        {
          label: "Large terrace 11.80 m",
          price: "€11,000 incl. VAT",
          description: "To fully enjoy your outdoor space",
        },
        {
          label: "Compact format 5.90 m",
          price: "€7,000 incl. VAT",
          description: "Ideal for small spaces or extensions",
        },
      ],
      footerHighlights: [
        "Weather-resistant",
        "UV-resistant — won't fade",
        "100 % recyclable",
        "Quick and simple installation",
      ],
    },
  },

  "murs-interieurs": {
    pt: {
      tagline: "Aspeto natural, elegância intemporal",
      intro:
        "Revestimento de madeira para paredes interiores — acabamentos acolhedores e contemporâneos, fáceis de instalar.",
      features: [
        { title: "Pinho branco", description: "Claro e luminoso" },
        { title: "Ácer", description: "Suave e acolhedor" },
        { title: "Freixo cinza", description: "Moderno e refinado" },
        { title: "Nogueira cinza", description: "Elegante, intenso ou profundo segundo o tom" },
      ],
      colors: [
        { name: "Pinho branco", hex: "#F5F0E8", description: "Claro e luminoso" },
        { name: "Ácer", hex: "#E8C9A0", description: "Suave e acolhedor" },
        { name: "Freixo cinza", hex: "#B8B5AE", description: "Moderno e refinado" },
        { name: "Nogueira cinza claro", hex: "#8B7355", description: "Elegante e intemporal" },
        { name: "Nogueira cinza escuro", hex: "#5C4A3D", description: "Intenso e contemporâneo" },
        { name: "Nogueira cinza profundo", hex: "#3D3229", description: "Profundo e sofisticado" },
      ],
      footerHighlights: [
        "Aspeto natural",
        "Resistente e durável",
        "Fácil de instalar",
        "Manutenção fácil",
        "Solução ecológica",
      ],
    },
    en: {
      tagline: "Natural look, timeless elegance",
      intro:
        "Wood panelling for interior walls — warm, contemporary finishes, easy to install.",
      features: [
        { title: "White pine", description: "Light & bright" },
        { title: "Maple", description: "Soft & warm" },
        { title: "Grey ash", description: "Modern & refined" },
        { title: "Grey walnut", description: "Elegant, intense or deep depending on shade" },
      ],
      colors: [
        { name: "White pine", hex: "#F5F0E8", description: "Light & bright" },
        { name: "Maple", hex: "#E8C9A0", description: "Soft & warm" },
        { name: "Grey ash", hex: "#B8B5AE", description: "Modern & refined" },
        { name: "Light grey walnut", hex: "#8B7355", description: "Elegant & timeless" },
        { name: "Dark grey walnut", hex: "#5C4A3D", description: "Intense & contemporary" },
        { name: "Deep grey walnut", hex: "#3D3229", description: "Deep & sophisticated" },
      ],
      footerHighlights: [
        "Natural look",
        "Resistant and durable",
        "Easy to install",
        "Easy upkeep",
        "Eco-friendly solution",
      ],
    },
  },

  "murs-decoratifs": {
    pt: {
      tagline: "Série tecido, madeira e pedra",
      intro:
        "Revestimentos murais decorativos esteticamente agradáveis, duráveis e fáceis de manter — acabamentos em madeira, tecido, pedra e mármore.",
      features: [
        { title: "Design moderno", description: "Aspeto natural e elegante" },
        { title: "Resistente e durável", description: "Resiste aos UV e à humidade" },
        { title: "Instalação fácil", description: "Encaixe ou parafuso invisível" },
        { title: "Sem manutenção", description: "Limpeza apenas com água" },
      ],
      colors: [
        { name: "Madeira toranja", description: "Ripado", hex: "#C9956A" },
        { name: "Café", description: "Ripado", hex: "#5F4334" },
        { name: "Madeira sândalo", description: "Ripado", hex: "#8B5A3C" },
        { name: "Verde tinta", description: "Ripado", hex: "#4A5238" },
        { name: "Cinza azulado", description: "Ripado", hex: "#6B7078" },
        { name: "Nogueira preta", description: "Ripado", hex: "#2A221F" },
        { name: "Tecido cinza azulado", code: "X386-A155", description: "Série tecido", hex: "#A8AEB8" },
        { name: "Linho lavanda", code: "353-A155", description: "Série tecido", hex: "#D4D0D8" },
        { name: "Linho cinza claro", code: "X526-A201", description: "Série tecido", hex: "#D6D4D0" },
        { name: "Mármore branco", code: "D9006-1", description: "Série mármore", hex: "#F0ECEC" },
        { name: "Flor de gelo branca", code: "D9013-1", description: "Série mármore", hex: "#EBE2E0" },
        { name: "Rocha cinza", code: "D9807-200", description: "Série pedra", hex: "#C5C0C0" },
        { name: "Cinza fino", code: "D9051-1", description: "Série mármore", hex: "#C6C3C9" },
        { name: "Ácer", code: "M8025-300", description: "Série madeira fina", hex: "#E0D4C4" },
        { name: "Nogueira cinza", code: "M8037-9", description: "Série madeira fina", hex: "#8B7B6B" },
        { name: "Linho estrelado", code: "XZ213-001", description: "Amarelo claro · Série mate", hex: "#EDE6D4" },
        { name: "Café com leite", code: "XC1003-2", description: "Série lisa", hex: "#C4A882" },
        { name: "Madeira antiga", code: "M8041-7", description: "Série madeira fina", hex: "#A89078" },
      ],
      footerHighlights: [
        "Resistente à humidade",
        "Fácil de limpar",
        "Materiais de qualidade",
        "Ecológico",
        "Design moderno e elegante",
      ],
    },
    en: {
      tagline: "Fabric, wood and stone series",
      intro:
        "Decorative wall coverings that are aesthetic, durable and easy to maintain — wood, fabric, stone and marble finishes.",
      features: [
        { title: "Modern design", description: "Natural, elegant look" },
        { title: "Resistant & durable", description: "UV and moisture resistant" },
        { title: "Easy installation", description: "Clips or hidden screws" },
        { title: "Maintenance-free", description: "Clean with water only" },
      ],
      colors: [
        { name: "Pomelo wood", description: "Slatted", hex: "#C9956A" },
        { name: "Coffee", description: "Slatted", hex: "#5F4334" },
        { name: "Sandalwood", description: "Slatted", hex: "#8B5A3C" },
        { name: "Ink green", description: "Slatted", hex: "#4A5238" },
        { name: "Blue-grey", description: "Slatted", hex: "#6B7078" },
        { name: "Black walnut", description: "Slatted", hex: "#2A221F" },
        { name: "Blue-grey fabric", code: "X386-A155", description: "Fabric series", hex: "#A8AEB8" },
        { name: "Lavender linen", code: "353-A155", description: "Fabric series", hex: "#D4D0D8" },
        { name: "Light grey linen", code: "X526-A201", description: "Fabric series", hex: "#D6D4D0" },
        { name: "White marble", code: "D9006-1", description: "Marble series", hex: "#F0ECEC" },
        { name: "White ice flower", code: "D9013-1", description: "Marble series", hex: "#EBE2E0" },
        { name: "Grey rock", code: "D9807-200", description: "Stone series", hex: "#C5C0C0" },
        { name: "Fine grey", code: "D9051-1", description: "Marble series", hex: "#C6C3C9" },
        { name: "Maple", code: "M8025-300", description: "Fine wood series", hex: "#E0D4C4" },
        { name: "Grey walnut", code: "M8037-9", description: "Fine wood series", hex: "#8B7B6B" },
        { name: "Starry linen", code: "XZ213-001", description: "Light yellow · Matte series", hex: "#EDE6D4" },
        { name: "Latte", code: "XC1003-2", description: "Plain series", hex: "#C4A882" },
        { name: "Aged wood", code: "M8041-7", description: "Fine wood series", hex: "#A89078" },
      ],
      footerHighlights: [
        "Moisture-resistant",
        "Easy to clean",
        "Quality materials",
        "Eco-friendly",
        "Modern, elegant design",
      ],
    },
  },

  parquet: {
    pt: {
      tagline: "Revestimento de piso flutuante",
      intro:
        "Parquet flutuante com encaixe sem cola — aspeto de madeira autêntico, resistente e fácil de manter.",
      features: [
        { title: "Resistente e durável", description: "Resiste às intempéries, UV e humidade" },
        { title: "Instalação fácil", description: "Sistema de encaixe sem cola" },
        { title: "Fácil de manter", description: "Limpeza simples com água" },
        { title: "Design natural", description: "Aspeto de madeira autêntico e elegante" },
      ],
      colors: [
        { name: "Carvalho castanho", hex: "#6B4423" },
        { name: "Carvalho natural", hex: "#C9A86C" },
        { name: "Cinza cinzento", hex: "#9A9690" },
        { name: "Preto carvão", hex: "#2C2C2C" },
        { name: "Carvalho claro", hex: "#E8D4B0" },
        { name: "Cinza antracite", hex: "#4A4A4A" },
        { name: "Mogno", hex: "#6B3A2A" },
        { name: "Cinza pérola", hex: "#D4D0C8" },
        { name: "Nogueira escura", hex: "#3D2817" },
        { name: "Carvalho mel", hex: "#D4A050" },
        { name: "Cinza driftwood", hex: "#A8A098" },
        { name: "Nogueira castanha", hex: "#5C4033" },
      ],
      footerHighlights: [
        "Resistente a impactos",
        "Anti-humidade / anti-mofo",
        "Proteção UV",
        "Instalação rápida sem cola",
        "Ecológico e reciclável",
      ],
    },
    en: {
      tagline: "Floating floor covering",
      intro:
        "Glue-free clip-together floating parquet — authentic wood look, resistant and easy to maintain.",
      features: [
        { title: "Resistant & durable", description: "Weather, UV and moisture resistant" },
        { title: "Easy installation", description: "Glue-free clip system" },
        { title: "Easy upkeep", description: "Simple cleaning with water" },
        { title: "Natural design", description: "Authentic, elegant wood look" },
      ],
      colors: [
        { name: "Brown oak", hex: "#6B4423" },
        { name: "Natural oak", hex: "#C9A86C" },
        { name: "Ash grey", hex: "#9A9690" },
        { name: "Charcoal black", hex: "#2C2C2C" },
        { name: "Light oak", hex: "#E8D4B0" },
        { name: "Anthracite grey", hex: "#4A4A4A" },
        { name: "Mahogany", hex: "#6B3A2A" },
        { name: "Pearl grey", hex: "#D4D0C8" },
        { name: "Dark walnut", hex: "#3D2817" },
        { name: "Honey oak", hex: "#D4A050" },
        { name: "Driftwood grey", hex: "#A8A098" },
        { name: "Brown walnut", hex: "#5C4033" },
      ],
      footerHighlights: [
        "Impact-resistant",
        "Moisture / mould resistant",
        "UV protection",
        "Quick glue-free installation",
        "Eco-friendly and recyclable",
      ],
    },
  },

  "sdb-couleurs": {
    pt: {
      tagline: "Revestimento estanque para casa de banho",
      intro:
        "Revestimento mural de casa de banho 100 % impermeável — resistente à humidade, fácil de limpar.",
      features: [
        { title: "Estanque", description: "100 % impermeável" },
        { title: "Resistente", description: "À humidade e a salpicos" },
        { title: "Fácil de limpar", description: "Manutenção simplificada" },
        { title: "Instalação rápida", description: "Colocação profissional" },
      ],
      colors: [
        { name: "Cinza claro", code: "PN-8007", description: "Textura fina", hex: "#D0CFD2" },
        { name: "Bege", code: "PH-8036-BS656", description: "Efeito madeira natural", hex: "#DAC9BA" },
        { name: "Cinza linho", code: "5-815-A138", description: "Efeito tecido", hex: "#B8B6B4" },
        { name: "Branco quebrado", code: "B-315", description: "Efeito linho", hex: "#EFE6E1" },
        { name: "Betão claro", code: "D-039", description: "Efeito mineral", hex: "#C9C6C4" },
        { name: "Mármore branco", code: "S-413", description: "Efeito mármore", hex: "#F2F0F0" },
      ],
      footerHighlights: ["Estanque", "Resistente à humidade", "Fácil de limpar", "Ecológico"],
    },
    en: {
      tagline: "Waterproof panelling for bathrooms",
      intro:
        "100 % waterproof bathroom wall covering — moisture-resistant, easy to clean.",
      features: [
        { title: "Waterproof", description: "100 % watertight" },
        { title: "Resistant", description: "To moisture and splashes" },
        { title: "Easy to clean", description: "Simplified upkeep" },
        { title: "Quick installation", description: "Professional fitting" },
      ],
      colors: [
        { name: "Light grey", code: "PN-8007", description: "Fine texture", hex: "#D0CFD2" },
        { name: "Beige", code: "PH-8036-BS656", description: "Natural wood effect", hex: "#DAC9BA" },
        { name: "Linen grey", code: "5-815-A138", description: "Fabric effect", hex: "#B8B6B4" },
        { name: "Off-white", code: "B-315", description: "Linen effect", hex: "#EFE6E1" },
        { name: "Light concrete", code: "D-039", description: "Mineral effect", hex: "#C9C6C4" },
        { name: "White marble", code: "S-413", description: "Marble effect", hex: "#F2F0F0" },
      ],
      footerHighlights: ["Waterproof", "Moisture-resistant", "Easy to clean", "Eco-friendly"],
    },
  },

  "kit-sdb": {
    pt: {
      tagline: "Design moderno preto mate",
      intro:
        "Kit de acessórios de casa de banho em acabamento preto mate — elegante, discreto e pronto a instalar no seu módulo Modulia.",
      includes: [
        { title: "Toalheiro", description: "Prático e elegante, espaço otimizado" },
        { title: "Saboneteira", description: "Robusta e refinada, fácil de limpar" },
        { title: "Porta-rolos", description: "Proteção e durabilidade" },
        { title: "Cabide de parede", description: "Sólido, discreto e multiuso" },
        { title: "Escova de WC", description: "Higiénica, acabamento de alta gama" },
        { title: "Porta-copos", description: "Vidro esmerilado, fixação segura" },
      ],
      specs: [{ label: "Preço", value: "149 € c/IVA" }],
      footerHighlights: [
        "Resistente à humidade",
        "Durável e fiável",
        "Fácil de limpar",
        "Instalação simples",
        "Design moderno preto mate",
      ],
    },
    en: {
      tagline: "Modern matte black design",
      intro:
        "Bathroom accessory kit in matte black finish — elegant, discreet and ready to install in your Modulia module.",
      includes: [
        { title: "Towel rail", description: "Practical and elegant, optimised space" },
        { title: "Soap dish", description: "Sturdy and refined, easy to clean" },
        { title: "Toilet roll holder", description: "Protection and durability" },
        { title: "Wall hook", description: "Solid, discreet and multi-purpose" },
        { title: "Toilet brush", description: "Hygienic, high-end finish" },
        { title: "Glass holder", description: "Frosted glass, secure fixing" },
      ],
      specs: [{ label: "Price", value: "€149 incl. VAT" }],
      footerHighlights: [
        "Moisture-resistant",
        "Durable and reliable",
        "Easy to clean",
        "Simple installation",
        "Modern matte black design",
      ],
    },
  },

  "vmc-sdb": {
    pt: {
      tagline: "Ar saudável, conforto no dia a dia",
      intro:
        "Ventilação mecânica para casa de banho — extração eficaz da humidade, funcionamento silencioso.",
      features: [
        { title: "Extração eficaz", description: "Elimina humidade, odores e poluentes" },
        { title: "Funcionamento silencioso", description: "Ventilação eficiente e discreta" },
        { title: "Protege a sua casa de banho", description: "Previne humidade, mofo e mau odor" },
        { title: "Económica e durável", description: "Baixo consumo e longa vida útil" },
      ],
      specs: [{ label: "Preço", value: "49 € c/IVA" }],
      footerHighlights: [
        "Ar saudável e confortável",
        "Instalação fácil",
        "Silenciosa e eficaz",
        "Económica e durável",
      ],
    },
    en: {
      tagline: "Fresh air, everyday comfort",
      intro:
        "Mechanical ventilation for bathrooms — efficient moisture extraction, quiet operation.",
      features: [
        { title: "Efficient extraction", description: "Removes moisture, odours and pollutants" },
        { title: "Quiet operation", description: "Powerful yet discreet ventilation" },
        { title: "Protects your bathroom", description: "Prevents damp, mould and bad odours" },
        { title: "Economical & durable", description: "Low consumption, long lifespan" },
      ],
      specs: [{ label: "Price", value: "€49 incl. VAT" }],
      footerHighlights: [
        "Healthy, comfortable air",
        "Easy installation",
        "Quiet and efficient",
        "Economical and durable",
      ],
    },
  },

  rideaux: {
    pt: {
      tagline: "Vendidas ao metro linear",
      intro:
        "Cortinas blackout 100 % opacas — isolamento acústico e térmico, tecido espesso premium.",
      features: [
        { title: "Opacidade total", description: "Bloqueia a luz para um conforto ótimo" },
        { title: "Isolamento acústico", description: "Reduz os ruídos exteriores" },
        { title: "Isolamento térmico", description: "Mantém o calor no inverno, a frescura no verão" },
        { title: "Privacidade preservada", description: "Protege do olhar exterior" },
        { title: "Tecido espesso", description: "Qualidade premium e duradoura" },
      ],
      colors: [
        { name: "Branco", hex: "#FFFFFF" },
        { name: "Bege", hex: "#D4C4A8" },
        { name: "Cinza claro", hex: "#C0C0C0" },
        { name: "Cinza médio", hex: "#808080" },
        { name: "Antracite", hex: "#3D3D3D" },
        { name: "Azul-marinho", hex: "#1B2A4A" },
        { name: "Verde pinho", hex: "#1B4332" },
        { name: "Taupe", hex: "#8B7D6B" },
        { name: "Preto", hex: "#1A1A1A" },
      ],
      specs: [{ label: "Preço", value: "220 € c/IVA / metro linear" }],
      footerHighlights: [
        "Sob medida",
        "Acabamento cuidado",
        "Fácil manutenção — lavável na máquina",
        "Qualidade premium 100 % opaca",
      ],
    },
    en: {
      tagline: "Sold per linear metre",
      intro:
        "100 % blackout curtains — sound and thermal insulation, premium thick fabric.",
      features: [
        { title: "Total blackout", description: "Blocks light for optimal comfort" },
        { title: "Sound insulation", description: "Reduces outside noise" },
        { title: "Thermal insulation", description: "Keeps warmth in winter, coolness in summer" },
        { title: "Privacy preserved", description: "Protects from outside view" },
        { title: "Thick fabric", description: "Premium, durable quality" },
      ],
      colors: [
        { name: "White", hex: "#FFFFFF" },
        { name: "Beige", hex: "#D4C4A8" },
        { name: "Light grey", hex: "#C0C0C0" },
        { name: "Medium grey", hex: "#808080" },
        { name: "Anthracite", hex: "#3D3D3D" },
        { name: "Navy blue", hex: "#1B2A4A" },
        { name: "Pine green", hex: "#1B4332" },
        { name: "Taupe", hex: "#8B7D6B" },
        { name: "Black", hex: "#1A1A1A" },
      ],
      specs: [{ label: "Rate", value: "€220 incl. VAT / linear metre" }],
      footerHighlights: [
        "Made to measure",
        "Careful finish",
        "Easy care — machine washable",
        "Premium 100 % blackout quality",
      ],
    },
  },

  poignee: {
    pt: {
      tagline: "Segurança e conforto no dia a dia",
      intro:
        "Fechadura conectada inteligente — abertura por impressão digital, código PIN, cartão RFID ou aplicação móvel.",
      features: [
        { title: "Impressão digital", description: "Rápida e segura" },
        { title: "Código PIN", description: "Introdução de código personalizado" },
        { title: "Cartão RFID", description: "Cartão de acesso seguro" },
        { title: "Aplicação móvel", description: "Controlo remoto e gestão de acessos" },
      ],
      specs: [
        { label: "Conectividade", value: "Wi-Fi integrado · Bluetooth" },
        { label: "Autonomia", value: "Pilhas até 12 meses" },
        { label: "Preço", value: "225 € c/IVA" },
      ],
      footerHighlights: [
        "Segurança reforçada",
        "Acesso simplificado",
        "Alertas em tempo real",
        "Longa autonomia",
        "Instalação fácil",
      ],
    },
    en: {
      tagline: "Security and everyday comfort",
      intro:
        "Smart connected handle — unlock by fingerprint, PIN code, RFID card or mobile app.",
      features: [
        { title: "Fingerprint", description: "Fast and secure" },
        { title: "PIN code", description: "Enter your personal code" },
        { title: "RFID card", description: "Secure access card" },
        { title: "Mobile app", description: "Remote control and access management" },
      ],
      specs: [
        { label: "Connectivity", value: "Built-in Wi-Fi · Bluetooth" },
        { label: "Battery life", value: "Batteries last up to 12 months" },
        { label: "Price", value: "€225 incl. VAT" },
      ],
      footerHighlights: [
        "Enhanced security",
        "Simplified access",
        "Real-time alerts",
        "Long battery life",
        "Easy installation",
      ],
    },
  },

  "chauffe-eau-solaire": {
    pt: {
      tagline: "Opcional — em substituição do esquentador elétrico",
      intro:
        "Esquentador solar Haier — energia renovável para reduzir as suas contas e a sua pegada de carbono.",
      features: [
        { title: "Energia renovável", description: "Utiliza a energia gratuita do sol" },
        { title: "Económico", description: "Reduz as suas contas de energia" },
        { title: "Durável", description: "Equipamento fiável e de longa duração" },
        { title: "Ecológico", description: "Zero emissões, respeita o ambiente" },
      ],
      specs: [{ label: "Preço", value: "875 € c/IVA" }],
      footerHighlights: [
        "Instalação fácil — sistema completo",
        "Água quente garantida todo o ano",
        "Solução durável",
      ],
    },
    en: {
      tagline: "Optional — replaces the electric water heater",
      intro:
        "Haier solar water heater — renewable energy to cut your bills and carbon footprint.",
      features: [
        { title: "Renewable energy", description: "Uses free energy from the sun" },
        { title: "Economical", description: "Reduces your energy bills" },
        { title: "Durable", description: "Reliable equipment with a long lifespan" },
        { title: "Eco-friendly", description: "Zero emissions, environmentally friendly" },
      ],
      specs: [{ label: "Price", value: "€875 incl. VAT" }],
      footerHighlights: [
        "Easy installation — complete system",
        "Hot water guaranteed all year round",
        "A durable solution",
      ],
    },
  },

  climatisation: {
    pt: {
      tagline: "Solar ou standard — módulos pré-equipados",
      intro:
        "Climatização integrada para um conforto térmico durante todo o ano. Os módulos Modulia são pré-equipados.",
      features: [
        { title: "Climatização solar", description: "Ecológica, autónoma com bateria integrada" },
        { title: "Climatização standard", description: "Desempenho ótimo, funcionamento silencioso" },
      ],
      variants: [
        {
          label: "Climatização standard",
          price: "349 € c/IVA",
          description: "Arrefecimento rápido, instalação simples",
        },
        {
          label: "Climatização solar",
          price: "1 850 € c/IVA",
          description: "Painéis solares + bateria, menor dependência da rede",
        },
      ],
      footerHighlights: ["Módulos pré-equipados", "Instalação rápida", "Conforto todo o ano"],
    },
    en: {
      tagline: "Solar or standard — pre-equipped modules",
      intro:
        "Integrated air conditioning for year-round thermal comfort. Modulia modules come pre-equipped.",
      features: [
        { title: "Solar air conditioning", description: "Eco-friendly, self-sufficient with built-in battery" },
        { title: "Standard air conditioning", description: "Optimal performance, quiet operation" },
      ],
      variants: [
        {
          label: "Standard air conditioning",
          price: "€349 incl. VAT",
          description: "Fast cooling, simple installation",
        },
        {
          label: "Solar air conditioning",
          price: "€1,850 incl. VAT",
          description: "Solar panels + battery, less reliance on the grid",
        },
      ],
      footerHighlights: ["Pre-equipped modules", "Quick installation", "Year-round comfort"],
    },
  },

  "genie-civil": {
    pt: {
      tagline: "Preparação dos pilares no seu terreno",
      intro:
        "Engenharia civil e terraplanagem — preparação, nivelamento e implantação precisa das fundações.",
      features: [
        { title: "Terraplanagem", description: "Preparação e nivelamento do seu terreno" },
        { title: "Implantação precisa", description: "Posicionamento perfeito dos pilares" },
        { title: "Obras seguras", description: "Cumprimento das normas e da estabilidade" },
        { title: "Trabalho limpo e rápido", description: "Equipamento profissional e equipa qualificada" },
      ],
      specs: [{ label: "Preço", value: "3 000 € s/IVA" }],
      footerHighlights: [
        "Experiência e conhecimento",
        "Cumprimento de prazos e orçamento",
        "Equipa qualificada e equipamento adequado",
        "Acompanhamento personalizado",
      ],
    },
    en: {
      tagline: "Preparing the piles on your plot",
      intro:
        "Civil engineering and groundworks — preparation, levelling and precise foundation layout.",
      features: [
        { title: "Groundworks", description: "Preparing and levelling your plot" },
        { title: "Precise layout", description: "Perfect positioning of the piles" },
        { title: "Safe works", description: "Compliance with standards and stability" },
        { title: "Clean, fast work", description: "Professional equipment and qualified team" },
      ],
      specs: [{ label: "Price", value: "€3,000 excl. VAT" }],
      footerHighlights: [
        "Expertise and experience",
        "On-time, on-budget delivery",
        "Qualified team and suitable equipment",
        "Personalised support",
      ],
    },
  },

  raccordement: {
    pt: {
      tagline: "Água · Eletricidade · Escoamento",
      intro: "Ligação completa do seu módulo às redes — instalação conforme e segura.",
      features: [
        { title: "Água", description: "Ligação às entradas de água, instalação segura" },
        { title: "Eletricidade", description: "Ligação à rede, colocação em segurança" },
        { title: "Escoamento", description: "Ligação às drenagens, sem fugas" },
      ],
      specs: [{ label: "Preço", value: "2 000 € s/IVA" }],
      footerHighlights: [
        "Instalação conforme",
        "Segurança garantida",
        "Trabalho cuidado e profissional",
        "Intervenção rápida",
      ],
    },
    en: {
      tagline: "Water · Electricity · Drainage",
      intro: "Complete connection of your module to the utility networks — compliant, secure installation.",
      features: [
        { title: "Water", description: "Connection to water supply, secure installation" },
        { title: "Electricity", description: "Connection to the grid, safety compliance" },
        { title: "Drainage", description: "Connection to wastewater outlets, leak-free" },
      ],
      specs: [{ label: "Price", value: "€2,000 excl. VAT" }],
      footerHighlights: [
        "Compliant installation",
        "Guaranteed safety",
        "Careful, professional work",
        "Prompt service",
      ],
    },
  },

  transport: {
    pt: {
      tagline: "Num raio de 30 km",
      intro:
        "Transporte e grua profissionais incluídos num raio de 30 km em torno do local de entrega.",
      features: [
        { title: "Transporte seguro", description: "Entrega nas melhores condições" },
        { title: "Grua profissional", description: "Descarga e colocação por especialistas" },
        { title: "Raio de 30 km", description: "Serviço incluído em torno do local de entrega" },
        { title: "Segurança e equipamento", description: "Intervenção conforme as normas" },
      ],
      footerHighlights: [
        "Transporte incluído",
        "Grua incluída",
        "Raio de 30 km",
        "Segurança garantida",
      ],
    },
    en: {
      tagline: "Within a 30 km radius",
      intro:
        "Professional transport and crane service included within a 30 km radius of the delivery site.",
      features: [
        { title: "Secure transport", description: "Delivery in the best conditions" },
        { title: "Professional crane service", description: "Unloading and positioning by experts" },
        { title: "30 km radius", description: "Service included around the delivery site" },
        { title: "Safety & equipment", description: "Work compliant with standards" },
      ],
      footerHighlights: [
        "Transport included",
        "Crane service included",
        "30 km radius",
        "Guaranteed safety",
      ],
    },
  },

  "kit-exterieur": {
    pt: {
      tagline: "Funcional e resistente",
      intro:
        "Tudo o que precisa para um exterior prático e duradouro — iluminação, tomadas estanques e torneira.",
      includes: [
        { title: "2× Apliques de parede", description: "Iluminação alta e baixa, design moderno" },
        { title: "2× Tomadas elétricas", description: "Estanques IP44 com tampa de proteção" },
        { title: "1× Torneira 2 saídas", description: "Dupla saída, ligação rápida universal" },
        { title: "Incluído", description: "Ligações rápidas, mangueira e regador — pronto a usar" },
      ],
      specs: [{ label: "Preço", value: "149 € c/IVA" }],
      footerHighlights: [
        "Resistente às intempéries",
        "Estanque IP44",
        "Fácil de instalar",
        "Materiais duráveis",
      ],
    },
    en: {
      tagline: "Functional & resistant",
      intro:
        "Everything you need for a practical, long-lasting outdoor space — lighting, weatherproof sockets and a tap.",
      includes: [
        { title: "2× Wall lights", description: "High and low lighting, modern design" },
        { title: "2× Power sockets", description: "IP44 weatherproof with protective cover" },
        { title: "1× Dual-outlet tap", description: "Two outlets, universal quick connector" },
        { title: "Included", description: "Quick connectors, hose & watering can — ready to use" },
      ],
      specs: [{ label: "Price", value: "€149 incl. VAT" }],
      footerHighlights: [
        "Weather-resistant",
        "IP44 waterproof",
        "Easy to install",
        "Durable materials",
      ],
    },
  },
};

export function getOptionRich(
  id: string,
  locale: Locale = defaultLocale,
): OptionRichContent | undefined {
  const base = OPTIONS_RICH[id];
  if (!base) return undefined;
  if (locale === defaultLocale) return base;
  const overlay = OPTIONS_RICH_I18N[id]?.[locale];
  if (!overlay) return base;
  return { ...base, ...overlay };
}
