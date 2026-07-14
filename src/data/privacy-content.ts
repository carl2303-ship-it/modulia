export type PrivacyLocale = "fr" | "pt" | "en";

export type PrivacyArticle = {
  title: string;
  paragraphs: string[];
  listItems?: string[];
};

export type PrivacyContent = {
  pageTitle: string;
  subtitle: string;
  lastUpdated: string;
  articles: PrivacyArticle[];
  footerNote: string;
};

export const PRIVACY_LOCALES: { id: PrivacyLocale; label: string }[] = [
  { id: "fr", label: "Français" },
  { id: "pt", label: "Português" },
  { id: "en", label: "English" },
];

export const PRIVACY_CONTENT: Record<PrivacyLocale, PrivacyContent> = {
  fr: {
    pageTitle: "Politique de confidentialité",
    subtitle: "Protection des données personnelles — Modulia",
    lastUpdated: "Dernière mise à jour : juillet 2026",
    footerNote:
      "Pour toute question relative à vos données personnelles, contactez-nous à contact@moduliahome.com.",
    articles: [
      {
        title: "1. Responsable du traitement",
        paragraphs: [
          "La société Modulia, dont le showroom est situé au Sitio do conseguinte N°442A, Nacional 125, 8100-294 Loulé (Portugal), est responsable du traitement des données personnelles collectées via le site moduliahome.com et dans le cadre de ses relations commerciales.",
          "Contact : contact@moduliahome.com",
        ],
      },
      {
        title: "2. Données collectées",
        paragraphs: ["Nous pouvons collecter les catégories de données suivantes :"],
        listItems: [
          "identité et coordonnées : nom, prénom, adresse e-mail, numéro de téléphone",
          "informations relatives à votre projet : modèle souhaité, message, préférences de configuration",
          "données de navigation : pages consultées, type d'appareil, navigateur, adresse IP (logs techniques)",
          "données de cookies : selon vos choix (voir section Cookies)",
        ],
      },
      {
        title: "3. Finalités du traitement",
        paragraphs: ["Vos données sont traitées pour les finalités suivantes :"],
        listItems: [
          "répondre à vos demandes de contact, devis ou d'information",
          "assurer le suivi commercial de votre projet Modulia",
          "gérer la relation client et l'exécution des commandes",
          "améliorer le site, sa sécurité et l'expérience utilisateur",
          "respecter nos obligations légales et réglementaires",
        ],
      },
      {
        title: "4. Base légale",
        paragraphs: ["Conformément au RGPD, nos traitements reposent sur :"],
        listItems: [
          "votre consentement (formulaire de contact, cookies non essentiels)",
          "l'exécution de mesures précontractuelles ou contractuelles (devis, commande)",
          "notre intérêt légitime (sécurité du site, amélioration des services)",
          "le respect d'obligations légales",
        ],
      },
      {
        title: "5. Durée de conservation",
        paragraphs: [
          "Les demandes de contact sont conservées pendant 3 ans à compter du dernier échange, sauf relation commerciale en cours ou obligation légale de conservation plus longue.",
          "Les données liées à une commande sont conservées pendant la durée de la relation contractuelle, puis archivées conformément aux obligations comptables et fiscales en vigueur (généralement 10 ans).",
          "Les logs techniques sont conservés pour une durée limitée, proportionnée aux besoins de sécurité du site.",
        ],
      },
      {
        title: "6. Destinataires et sous-traitants",
        paragraphs: [
          "Vos données sont accessibles uniquement aux personnes habilitées au sein de Modulia et à nos prestataires techniques, dans la limite nécessaire à leurs missions :",
        ],
        listItems: [
          "hébergement du site (Netlify ou équivalent)",
          "base de données et formulaires (Supabase)",
          "outils de communication et de gestion commerciale",
        ],
      },
      {
        title: "7. Transferts hors Union européenne",
        paragraphs: [
          "Certains prestataires peuvent traiter des données en dehors de l'Union européenne. Dans ce cas, Modulia s'assure que des garanties appropriées sont mises en place (clauses contractuelles types, décisions d'adéquation ou mesures équivalentes).",
        ],
      },
      {
        title: "8. Cookies",
        paragraphs: [
          "Le site peut utiliser des cookies strictement nécessaires au fonctionnement (sécurité, session, préférences techniques).",
          "Des cookies de mesure d'audience ou de personnalisation ne sont déposés qu'avec votre consentement, lorsqu'ils sont activés.",
          "Vous pouvez configurer votre navigateur pour refuser les cookies ou les supprimer à tout moment.",
        ],
      },
      {
        title: "9. Sécurité",
        paragraphs: [
          "Modulia met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre l'accès non autorisé, la perte, la destruction ou l'altération.",
          "Aucune transmission sur Internet n'étant totalement sécurisée, nous ne pouvons garantir une sécurité absolue, mais nous limitons l'accès aux données au strict nécessaire.",
        ],
      },
      {
        title: "10. Vos droits",
        paragraphs: [
          "Conformément au RGPD, vous disposez des droits suivants : accès, rectification, effacement, limitation, opposition, portabilité et retrait du consentement.",
          "Pour exercer vos droits, adressez votre demande à contact@moduliahome.com en précisant l'objet de votre requête et, le cas échéant, une copie d'un justificatif d'identité.",
          "Vous pouvez également introduire une réclamation auprès de l'autorité de contrôle compétente :",
        ],
        listItems: [
          "Portugal : Comissão Nacional de Proteção de Dados (CNPD) — www.cnpd.pt",
          "France : Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr",
        ],
      },
      {
        title: "11. Modifications",
        paragraphs: [
          "Modulia se réserve le droit de modifier la présente politique de confidentialité à tout moment. La version en vigueur est celle publiée sur cette page, avec indication de la date de mise à jour.",
        ],
      },
    ],
  },
  pt: {
    pageTitle: "Política de Privacidade",
    subtitle: "Proteção de dados pessoais — Modulia",
    lastUpdated: "Última atualização: julho de 2026",
    footerNote:
      "Para qualquer questão relacionada com os seus dados pessoais, contacte-nos em contact@moduliahome.com.",
    articles: [
      {
        title: "1. Responsável pelo tratamento",
        paragraphs: [
          "A sociedade Modulia, com showroom no Sitio do conseguinte N°442A, Nacional 125, 8100-294 Loulé (Portugal), é responsável pelo tratamento dos dados pessoais recolhidos através do site moduliahome.com e no âmbito das suas relações comerciais.",
          "Contacto: contact@moduliahome.com",
        ],
      },
      {
        title: "2. Dados recolhidos",
        paragraphs: ["Podemos recolher as seguintes categorias de dados:"],
        listItems: [
          "identidade e contactos: nome, apelido, e-mail, número de telefone",
          "informações sobre o seu projeto: modelo pretendido, mensagem, preferências de configuração",
          "dados de navegação: páginas visitadas, tipo de dispositivo, navegador, endereço IP (registos técnicos)",
          "dados de cookies: conforme as suas escolhas (ver secção Cookies)",
        ],
      },
      {
        title: "3. Finalidades do tratamento",
        paragraphs: ["Os seus dados são tratados para as seguintes finalidades:"],
        listItems: [
          "responder aos seus pedidos de contacto, orçamento ou informação",
          "assegurar o acompanhamento comercial do seu projeto Modulia",
          "gerir a relação com o cliente e a execução de encomendas",
          "melhorar o site, a sua segurança e a experiência do utilizador",
          "cumprir obrigações legais e regulamentares",
        ],
      },
      {
        title: "4. Base legal",
        paragraphs: ["Em conformidade com o RGPD, os nossos tratamentos assentam em:"],
        listItems: [
          "o seu consentimento (formulário de contacto, cookies não essenciais)",
          "a execução de medidas pré-contratuais ou contratuais (orçamento, encomenda)",
          "o nosso interesse legítimo (segurança do site, melhoria dos serviços)",
          "o cumprimento de obrigações legais",
        ],
      },
      {
        title: "5. Prazo de conservação",
        paragraphs: [
          "Os pedidos de contacto são conservados durante 3 anos a partir do último contacto, salvo relação comercial em curso ou obrigação legal de conservação mais longa.",
          "Os dados relacionados com uma encomenda são conservados durante a relação contratual e, posteriormente, arquivados de acordo com as obrigações contabilísticas e fiscais em vigor (geralmente 10 anos).",
          "Os registos técnicos são conservados por um período limitado, proporcional às necessidades de segurança do site.",
        ],
      },
      {
        title: "6. Destinatários e subcontratantes",
        paragraphs: [
          "Os seus dados são acessíveis apenas a pessoas autorizadas na Modulia e aos nossos prestadores técnicos, na medida necessária às suas funções:",
        ],
        listItems: [
          "alojamento do site (Netlify ou equivalente)",
          "base de dados e formulários (Supabase)",
          "ferramentas de comunicação e gestão comercial",
        ],
      },
      {
        title: "7. Transferências fora da União Europeia",
        paragraphs: [
          "Alguns prestadores podem tratar dados fora da União Europeia. Nesse caso, a Modulia assegura a implementação de garantias adequadas (cláusulas contratuais-tipo, decisões de adequação ou medidas equivalentes).",
        ],
      },
      {
        title: "8. Cookies",
        paragraphs: [
          "O site pode utilizar cookies estritamente necessários ao funcionamento (segurança, sessão, preferências técnicas).",
          "Cookies de medição de audiência ou de personalização apenas são depositados com o seu consentimento, quando ativados.",
          "Pode configurar o seu navegador para recusar cookies ou eliminá-los a qualquer momento.",
        ],
      },
      {
        title: "9. Segurança",
        paragraphs: [
          "A Modulia implementa medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado, perda, destruição ou alteração.",
          "Nenhuma transmissão na Internet é totalmente segura; não podemos garantir segurança absoluta, mas limitamos o acesso aos dados ao estritamente necessário.",
        ],
      },
      {
        title: "10. Os seus direitos",
        paragraphs: [
          "Em conformidade com o RGPD, dispõe dos seguintes direitos: acesso, retificação, apagamento, limitação, oposição, portabilidade e retirada do consentimento.",
          "Para exercer os seus direitos, envie o pedido para contact@moduliahome.com, indicando o objeto do pedido e, quando aplicável, cópia de um documento de identificação.",
          "Pode também apresentar reclamação junto da autoridade de controlo competente:",
        ],
        listItems: [
          "Portugal: Comissão Nacional de Proteção de Dados (CNPD) — www.cnpd.pt",
          "França: Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr",
        ],
      },
      {
        title: "11. Alterações",
        paragraphs: [
          "A Modulia reserva-se o direito de alterar a presente política de privacidade a qualquer momento. A versão em vigor é a publicada nesta página, com indicação da data de atualização.",
        ],
      },
    ],
  },
  en: {
    pageTitle: "Privacy Policy",
    subtitle: "Personal data protection — Modulia",
    lastUpdated: "Last updated: July 2026",
    footerNote:
      "For any questions regarding your personal data, please contact us at contact@moduliahome.com.",
    articles: [
      {
        title: "1. Data controller",
        paragraphs: [
          "Modulia, with its showroom at Sitio do conseguinte N°442A, Nacional 125, 8100-294 Loulé (Portugal), is the data controller for personal data collected through moduliahome.com and in the course of its commercial relationships.",
          "Contact: contact@moduliahome.com",
        ],
      },
      {
        title: "2. Data collected",
        paragraphs: ["We may collect the following categories of data:"],
        listItems: [
          "identity and contact details: name, surname, email address, phone number",
          "project information: desired model, message, configuration preferences",
          "browsing data: pages viewed, device type, browser, IP address (technical logs)",
          "cookie data: according to your choices (see Cookies section)",
        ],
      },
      {
        title: "3. Purposes of processing",
        paragraphs: ["Your data is processed for the following purposes:"],
        listItems: [
          "responding to your contact, quote or information requests",
          "managing the commercial follow-up of your Modulia project",
          "managing the customer relationship and order fulfilment",
          "improving the website, its security and user experience",
          "complying with legal and regulatory obligations",
        ],
      },
      {
        title: "4. Legal basis",
        paragraphs: ["In accordance with the GDPR, our processing is based on:"],
        listItems: [
          "your consent (contact form, non-essential cookies)",
          "performance of pre-contractual or contractual measures (quote, order)",
          "our legitimate interest (website security, service improvement)",
          "compliance with legal obligations",
        ],
      },
      {
        title: "5. Retention period",
        paragraphs: [
          "Contact requests are retained for 3 years from the last exchange, unless an ongoing commercial relationship or a longer legal retention obligation applies.",
          "Data related to an order is retained for the duration of the contractual relationship and then archived in accordance with applicable accounting and tax obligations (generally 10 years).",
          "Technical logs are retained for a limited period, proportionate to the website's security needs.",
        ],
      },
      {
        title: "6. Recipients and processors",
        paragraphs: [
          "Your data is accessible only to authorised Modulia staff and our technical service providers, to the extent necessary for their tasks:",
        ],
        listItems: [
          "website hosting (Netlify or equivalent)",
          "database and forms (Supabase)",
          "communication and sales management tools",
        ],
      },
      {
        title: "7. Transfers outside the European Union",
        paragraphs: [
          "Some providers may process data outside the European Union. In such cases, Modulia ensures that appropriate safeguards are in place (standard contractual clauses, adequacy decisions or equivalent measures).",
        ],
      },
      {
        title: "8. Cookies",
        paragraphs: [
          "The website may use cookies that are strictly necessary for operation (security, session, technical preferences).",
          "Audience measurement or personalisation cookies are only placed with your consent, when enabled.",
          "You can configure your browser to refuse cookies or delete them at any time.",
        ],
      },
      {
        title: "9. Security",
        paragraphs: [
          "Modulia implements appropriate technical and organisational measures to protect your data against unauthorised access, loss, destruction or alteration.",
          "No transmission over the Internet is completely secure; we cannot guarantee absolute security, but we limit data access to what is strictly necessary.",
        ],
      },
      {
        title: "10. Your rights",
        paragraphs: [
          "In accordance with the GDPR, you have the following rights: access, rectification, erasure, restriction, objection, portability and withdrawal of consent.",
          "To exercise your rights, send your request to contact@moduliahome.com, stating the subject of your request and, where applicable, a copy of proof of identity.",
          "You may also lodge a complaint with the competent supervisory authority:",
        ],
        listItems: [
          "Portugal: Comissão Nacional de Proteção de Dados (CNPD) — www.cnpd.pt",
          "France: Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr",
        ],
      },
      {
        title: "11. Changes",
        paragraphs: [
          "Modulia reserves the right to amend this privacy policy at any time. The current version is the one published on this page, with the update date indicated.",
        ],
      },
    ],
  },
};
