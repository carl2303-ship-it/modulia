export type CgvLocale = "fr" | "pt" | "en";

export type CgvArticle = {
  title: string;
  paragraphs: string[];
  listItems?: string[];
};

export type CgvContent = {
  pageTitle: string;
  subtitle: string;
  articles: CgvArticle[];
  acceptance: string;
};

export const CGV_LOCALES: { id: CgvLocale; label: string }[] = [
  { id: "fr", label: "Français" },
  { id: "pt", label: "Português" },
  { id: "en", label: "English" },
];

export const CGV_CONTENT: Record<CgvLocale, CgvContent> = {
  fr: {
    pageTitle: "Conditions Générales de Vente",
    subtitle: "Espace ou Piscine Modulia",
    acceptance:
      "La signature du bon de commande implique l'acceptation pleine et entière des présentes CGV.",
    articles: [
      {
        title: "Article 1 – Objet",
        paragraphs: [
          "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la société Modulia et ses clients dans le cadre de la vente d'espaces modulaires, équipements et prestations associées.",
        ],
      },
      {
        title: "Article 2 – Produits et prestations",
        paragraphs: [
          "Modulia propose des constructions modulaires standards qui peuvent être personnalisées. Les caractéristiques techniques, plans et descriptifs sont fournis avant signature du bon de commande.",
          "Toute modification demandée par le client pourra entraîner un ajustement du prix et des délais.",
        ],
      },
      {
        title: "Article 3 – Prix",
        paragraphs: [
          "Les prix sont exprimés en euros (€), hors taxes (HT) et toutes taxes comprises (TTC).",
          "Les prix peuvent être révisés en fonction :",
        ],
        listItems: [
          "d'une augmentation des coûts des matières premières",
          "des modifications demandées par le client",
          "des contraintes techniques d'installation sur le terrain",
        ],
      },
      {
        title: "Article 4 – Commande",
        paragraphs: [
          "La commande est validée après :",
          "Toute commande validée est ferme et définitive.",
        ],
        listItems: [
          "signature du devis ou bon de commande",
          "versement d'un acompte de 30 %",
        ],
      },
      {
        title: "Article 5 – Paiement",
        paragraphs: [
          "Le paiement s'effectue selon l'échéancier suivant :",
          "Tout retard de paiement entraîne :",
        ],
        listItems: [
          "acompte à la commande : 30 %",
          "paiements intermédiaires après environ 30/35 jours : 30 % après présentation photo et au chargement dans le bateau",
          "deuxième acompte de 30 % à réception du module à Faro",
          "le solde à la livraison",
          "pénalités de retard",
          "indemnité forfaitaire pour frais de recouvrement",
        ],
      },
      {
        title: "Article 6 – Délais de livraison",
        paragraphs: [
          "Les délais de 90 jours sont donnés à titre indicatif. Modulia ne pourra être tenue responsable des retards liés à :",
        ],
        listItems: [
          "intempéries pendant le trajet",
          "problèmes d'approvisionnement",
          "cas de force majeure",
          "retards administratifs (douanes, etc.)",
        ],
      },
      {
        title: "Article 7 – Livraison et installation",
        paragraphs: [
          "La livraison comprend (à préciser) :",
          "Tout surcoût lié à des contraintes d'accès sera facturé.",
        ],
        listItems: [
          "transport des modules de Faro à votre domicile",
          "installation sur site dans la journée",
          "raccordement eau, électricité, écoulement : environ 1 à 2 jours",
          "le client doit garantir l'accessibilité du terrain par voie routière que nous aurons préalablement reconnue",
          "le terrain devra avoir été préalablement préparé pour accueillir le ou les modules ; si le client a choisi de le faire lui-même et que la livraison doit être reportée parce que le terrain n'est pas prêt, le module sera déposé à proximité de son implantation définitive ou un droit de garde de 150 € HT par jour sera exigé pour conserver le module sur notre parc",
        ],
      },
      {
        title: "Article 8 – Réception des travaux",
        paragraphs: [
          "La réception est effectuée en présence du client. Toute réserve doit être mentionnée sur le procès-verbal. Sans réserve, la livraison est considérée comme conforme.",
          "Si une anomalie est constatée, le client gardera 5 % du montant total jusqu'à réception définitive.",
        ],
      },
      {
        title: "Article 9 – Garanties",
        paragraphs: ["Les constructions bénéficient des garanties légales :"],
        listItems: ["garantie de parfait achèvement"],
      },
      {
        title: "Article 10 – Rétractation",
        paragraphs: [
          "Conformément à la loi, le client particulier dispose d'un délai de rétractation (si applicable). Ce droit ne s'applique pas aux produits personnalisés.",
        ],
      },
      {
        title: "Article 11 – Responsabilité",
        paragraphs: ["Modulia ne pourra être tenue responsable en cas :"],
        listItems: [
          "de mauvaise utilisation",
          "de modifications réalisées par un tiers",
          "de non-respect des normes par le client",
          "d'interdiction de mettre en place un module à l'endroit choisi par le client",
        ],
      },
      {
        title: "Article 12 – Force majeure",
        paragraphs: [
          "Aucune des parties ne pourra être tenue responsable en cas d'événement imprévisible empêchant l'exécution du contrat.",
        ],
      },
      {
        title: "Article 13 – Litiges",
        paragraphs: [
          "En cas de litige, une solution amiable sera recherchée. À défaut, les tribunaux compétents seront ceux du siège social de Modulia au Portugal.",
        ],
      },
      {
        title: "Article 14 – Acceptation des CGV",
        paragraphs: [
          "La signature du bon de commande implique l'acceptation pleine et entière des présentes CGV.",
        ],
      },
    ],
  },

  pt: {
    pageTitle: "Condições Gerais de Venda",
    subtitle: "Espaço ou Piscina Modulia",
    acceptance:
      "A assinatura da nota de encomenda implica a aceitação plena e integral das presentes CGV.",
    articles: [
      {
        title: "Artigo 1 – Objeto",
        paragraphs: [
          "As presentes Condições Gerais de Venda (CGV) regem as relações contratuais entre a sociedade Modulia e os seus clientes no âmbito da venda de espaços modulares, equipamentos e prestações associadas.",
        ],
      },
      {
        title: "Artigo 2 – Produtos e prestações",
        paragraphs: [
          "A Modulia propõe construções modulares standard que podem ser personalizadas. As características técnicas, plantas e descritivos são fornecidos antes da assinatura da nota de encomenda.",
          "Qualquer modificação solicitada pelo cliente poderá implicar um ajuste do preço e dos prazos.",
        ],
      },
      {
        title: "Artigo 3 – Preços",
        paragraphs: [
          "Os preços são expressos em euros (€), sem impostos (HT) e com todos os impostos incluídos (TTC).",
          "Os preços podem ser revistos em função de:",
        ],
        listItems: [
          "um aumento dos custos das matérias-primas",
          "modificações solicitadas pelo cliente",
          "constrangimentos técnicos de instalação no terreno",
        ],
      },
      {
        title: "Artigo 4 – Encomenda",
        paragraphs: [
          "A encomenda é validada após:",
          "Qualquer encomenda validada é firme e definitiva.",
        ],
        listItems: [
          "assinatura do orçamento ou nota de encomenda",
          "pagamento de um sinal de 30 %",
        ],
      },
      {
        title: "Artigo 5 – Pagamento",
        paragraphs: [
          "O pagamento efetua-se segundo o seguinte calendário:",
          "Qualquer atraso de pagamento implica:",
        ],
        listItems: [
          "sinal à encomenda: 30 %",
          "pagamentos intermédios após cerca de 30/35 dias: 30 % após apresentação fotográfica e no carregamento no navio",
          "segundo sinal de 30 % à receção do módulo em Faro",
          "saldo na entrega",
          "penalidades por atraso",
          "indenização forfetária por despesas de cobrança",
        ],
      },
      {
        title: "Artigo 6 – Prazos de entrega",
        paragraphs: [
          "Os prazos de 90 dias são indicativos. A Modulia não poderá ser responsabilizada por atrasos relacionados com:",
        ],
        listItems: [
          "intempéries durante o transporte",
          "problemas de abastecimento",
          "casos de força maior",
          "atrasos administrativos (alfândegas, etc.)",
        ],
      },
      {
        title: "Artigo 7 – Entrega e instalação",
        paragraphs: [
          "A entrega inclui (a precisar):",
          "Qualquer custo adicional relacionado com constrangimentos de acesso será faturado.",
        ],
        listItems: [
          "transporte dos módulos de Faro até à sua morada",
          "instalação no local no próprio dia",
          "ligação de água, eletricidade e evacuação: cerca de 1 a 2 dias",
          "o cliente deve garantir a acessibilidade do terreno por via rodoviária previamente reconhecida por nós",
          "o terreno deverá ter sido previamente preparado para receber o(s) módulo(s); se o cliente optar por fazê-lo ele próprio e a entrega tiver de ser adiada porque o terreno não está pronto, o módulo será depositado junto à sua implantação definitiva ou será exigido um direito de guarda de 150 € HT por dia para manter o módulo no nosso parque",
        ],
      },
      {
        title: "Artigo 8 – Receção dos trabalhos",
        paragraphs: [
          "A receção é efetuada na presença do cliente. Qualquer reserva deve ser mencionada no auto de receção. Sem reservas, a entrega é considerada conforme.",
          "Se for constatada uma anomalia, o cliente reterá 5 % do montante total até à receção definitiva.",
        ],
      },
      {
        title: "Artigo 9 – Garantias",
        paragraphs: ["As construções beneficiam das garantias legais:"],
        listItems: ["garantia de perfeito acabamento"],
      },
      {
        title: "Artigo 10 – Direito de retratação",
        paragraphs: [
          "Em conformidade com a lei, o cliente particular dispõe de um prazo de retratação (se aplicável). Este direito não se aplica a produtos personalizados.",
        ],
      },
      {
        title: "Artigo 11 – Responsabilidade",
        paragraphs: ["A Modulia não poderá ser responsabilizada em caso de:"],
        listItems: [
          "má utilização",
          "modificações realizadas por terceiros",
          "não cumprimento das normas por parte do cliente",
          "proibição de instalar um módulo no local escolhido pelo cliente",
        ],
      },
      {
        title: "Artigo 12 – Força maior",
        paragraphs: [
          "Nenhuma das partes poderá ser responsabilizada em caso de evento imprevisível que impeça a execução do contrato.",
        ],
      },
      {
        title: "Artigo 13 – Litígios",
        paragraphs: [
          "Em caso de litígio, será procurada uma solução amigável. Na sua falta, os tribunais competentes serão os do sede social da Modulia em Portugal.",
        ],
      },
      {
        title: "Artigo 14 – Aceitação das CGV",
        paragraphs: [
          "A assinatura da nota de encomenda implica a aceitação plena e integral das presentes CGV.",
        ],
      },
    ],
  },

  en: {
    pageTitle: "General Terms and Conditions of Sale",
    subtitle: "Modulia Space or Pool",
    acceptance:
      "Signing the order form implies full and complete acceptance of these GTC.",
    articles: [
      {
        title: "Article 1 – Purpose",
        paragraphs: [
          "These General Terms and Conditions of Sale (GTC) govern the contractual relationship between Modulia and its customers in the sale of modular spaces, equipment and related services.",
        ],
      },
      {
        title: "Article 2 – Products and services",
        paragraphs: [
          "Modulia offers standard modular constructions that can be customised. Technical specifications, plans and descriptions are provided before signing the order form.",
          "Any modification requested by the customer may result in an adjustment to the price and delivery times.",
        ],
      },
      {
        title: "Article 3 – Prices",
        paragraphs: [
          "Prices are expressed in euros (€), excluding tax (HT) and including all taxes (TTC).",
          "Prices may be revised depending on:",
        ],
        listItems: [
          "an increase in raw material costs",
          "modifications requested by the customer",
          "technical constraints for on-site installation",
        ],
      },
      {
        title: "Article 4 – Order",
        paragraphs: [
          "The order is confirmed after:",
          "Any confirmed order is firm and final.",
        ],
        listItems: [
          "signature of the quote or order form",
          "payment of a 30% deposit",
        ],
      },
      {
        title: "Article 5 – Payment",
        paragraphs: [
          "Payment is made according to the following schedule:",
          "Any late payment will result in:",
        ],
        listItems: [
          "deposit upon order: 30%",
          "interim payments after approximately 30/35 days: 30% after photo presentation and upon loading onto the vessel",
          "second deposit of 30% upon receipt of the module in Faro",
          "balance upon delivery",
          "late payment penalties",
          "flat-rate compensation for collection costs",
        ],
      },
      {
        title: "Article 6 – Delivery times",
        paragraphs: [
          "The 90-day delivery times are indicative. Modulia cannot be held liable for delays related to:",
        ],
        listItems: [
          "adverse weather during transport",
          "supply problems",
          "force majeure",
          "administrative delays (customs, etc.)",
        ],
      },
      {
        title: "Article 7 – Delivery and installation",
        paragraphs: [
          "Delivery includes (to be specified):",
          "Any additional cost related to access constraints will be invoiced.",
        ],
        listItems: [
          "transport of modules from Faro to your home",
          "on-site installation on the same day",
          "water, electricity and drainage connection: approximately 1 to 2 days",
          "the customer must ensure road access to the site, which we will have previously approved",
          "the site must have been prepared in advance to receive the module(s); if the customer chooses to do this themselves and delivery must be postponed because the site is not ready, the module will be placed near its final location or a storage fee of €150 HT per day will be charged to keep the module on our premises",
        ],
      },
      {
        title: "Article 8 – Acceptance of works",
        paragraphs: [
          "Acceptance is carried out in the presence of the customer. Any reservation must be noted on the acceptance report. Without reservation, delivery is deemed compliant.",
          "If a defect is found, the customer will retain 5% of the total amount until final acceptance.",
        ],
      },
      {
        title: "Article 9 – Warranties",
        paragraphs: ["The constructions benefit from legal warranties:"],
        listItems: ["warranty of perfect completion"],
      },
      {
        title: "Article 10 – Right of withdrawal",
        paragraphs: [
          "In accordance with the law, private customers have a right of withdrawal (where applicable). This right does not apply to customised products.",
        ],
      },
      {
        title: "Article 11 – Liability",
        paragraphs: ["Modulia cannot be held liable in the event of:"],
        listItems: [
          "misuse",
          "modifications carried out by a third party",
          "failure by the customer to comply with standards",
          "prohibition of installing a module at the location chosen by the customer",
        ],
      },
      {
        title: "Article 12 – Force majeure",
        paragraphs: [
          "Neither party may be held liable in the event of an unforeseeable event preventing performance of the contract.",
        ],
      },
      {
        title: "Article 13 – Disputes",
        paragraphs: [
          "In the event of a dispute, an amicable solution will be sought. Failing that, the competent courts will be those of Modulia's registered office in Portugal.",
        ],
      },
      {
        title: "Article 14 – Acceptance of the GTC",
        paragraphs: [
          "Signing the order form implies full and complete acceptance of these GTC.",
        ],
      },
    ],
  },
};
