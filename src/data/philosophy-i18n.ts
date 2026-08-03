import type { Locale } from "@/i18n/config";
import { MODULIA_PHILOSOPHY } from "@/data/philosophy";

type PhilosophyContent = typeof MODULIA_PHILOSOPHY;

const PT: PhilosophyContent = {
  eyebrow: "Saber-fazer",
  title: "A génese da Modulia",
  intro: ["Construir de outra forma. Viver de outra forma."],
  lead: [
    "Cada grande projeto nasce de uma convicção.",
    "A nossa é simples: o habitat deve evoluir com a sua época.",
  ],
  body: [
    "Há mais de 30 anos, a nossa equipa imagina, concebe e realiza construções modulares para os eventos mais prestigiados da Europa. Das 24 Horas de Le Mans aos maiores concertos, passando por competições internacionais de desporto de alto nível, desenvolvemos um saber-fazer em que a exigência, a precisão e a qualidade nunca são opcionais.",
    "Estes anos de experiência ensinaram-nos uma coisa essencial: uma construção modular pode ser muito mais do que uma solução rápida. Pode tornar-se uma nova forma de habitar — mais inteligente, mais sustentável e mais elegante.",
    "Foi esta visão que deu origem à Modulia.",
    "Escolhemos Portugal porque acreditamos profundamente no seu futuro. Terra de inovação, qualidade de vida e oportunidades, o país enfrenta hoje um desafio maior: permitir a cada um viver em condições acessíveis, preservando o ambiente e a identidade.",
    "O custo do solo aumenta, os prazos de construção alongam-se e as empresas do setor têm dificuldade em responder à procura. Ao mesmo tempo, as necessidades não param de crescer: habitação para famílias, alojamento para colaboradores, residências sénior, projetos turísticos ou habitação de proximidade.",
    "Perante esta realidade, escolhemos dar uma resposta concreta.",
    "As casas Modulia associam arquitetura contemporânea, design intemporal e desempenho técnico de alto nível. Foram concebidas para oferecer conforto duradouro, qualidade de fabrico irrepreensível e uma rapidez de execução que responde às exigências do mundo de hoje.",
    "Mas a Modulia é muito mais do que um construtor.",
    "Somos um parceiro de projetos. Acompanhamos investidores privados, autarquias, municípios e profissionais do turismo na criação de lugares de vida com sentido. De aldeias turísticas a residências sénior, de programas de habitação social a bairros residenciais de nova geração, imaginamos soluções adaptadas às necessidades de cada território.",
    "A nossa ambição é participar na transformação do habitat em Portugal, propondo construções mais responsáveis, mais acessíveis e mais sustentáveis, sem nunca abdicar da estética, da qualidade nem do conforto.",
    "Porque construir uma casa não é apenas juntar materiais.",
    "É criar um lugar de vida.",
    "É oferecer perspetivas.",
    "É imaginar o mundo que deixaremos às gerações futuras.",
  ],
  closing: [
    "A Modulia encarna esta visão.",
    "Uma nova maneira de construir.",
    "Uma nova maneira de habitar.",
    "O habitat de amanhã, disponível desde hoje.",
  ],
  highlights: [
    { label: "Experiência", value: "Mais de 30 anos" },
    { label: "Raízes", value: "Portugal" },
    { label: "Visão", value: "Habitat acessível e sustentável" },
    { label: "Papel", value: "Parceiro de projetos" },
  ],
};

const EN: PhilosophyContent = {
  eyebrow: "Know-how",
  title: "The genesis of Modulia",
  intro: ["Build differently. Live differently."],
  lead: [
    "Every great project begins with a conviction.",
    "Ours is simple: housing must evolve with its time.",
  ],
  body: [
    "For more than 30 years, our team has imagined, designed and delivered modular constructions for Europe’s most prestigious events. From the 24 Hours of Le Mans to the biggest concerts and top-level international sports competitions, we have built expertise where excellence, precision and quality are never optional.",
    "Those years taught us something essential: modular construction can be far more than a fast solution. It can become a new way of living — smarter, more sustainable and more elegant.",
    "That vision gave birth to Modulia.",
    "We chose Portugal because we deeply believe in its future. A land of innovation, quality of life and opportunity, the country now faces a major challenge: enabling everyone to live in accessible conditions while preserving its environment and identity.",
    "Land costs are rising, construction timelines are lengthening and building firms struggle to meet demand. At the same time, needs keep growing: homes for families, accommodation for employees, senior residences, tourism projects and local housing.",
    "Faced with this reality, we chose to deliver a concrete response.",
    "Modulia homes combine contemporary architecture, timeless design and high-level technical performance. They are designed for lasting comfort, irreproachable build quality and a speed of delivery that meets today’s world.",
    "But Modulia is far more than a builder.",
    "We are a project partner. We support private investors, local authorities, municipalities and tourism professionals in creating places to live that matter. From tourist villages to senior residences, social housing programmes to next-generation neighbourhoods, we design solutions tailored to each territory.",
    "Our ambition is to help transform housing in Portugal by offering constructions that are more responsible, more accessible and more sustainable — without ever giving up aesthetics, quality or comfort.",
    "Because building a home is not only about assembling materials.",
    "It is creating a place to live.",
    "It is opening up possibilities.",
    "It is imagining the world we will leave to future generations.",
  ],
  closing: [
    "Modulia embodies that vision.",
    "A new way to build.",
    "A new way to live.",
    "Tomorrow’s housing, available today.",
  ],
  highlights: [
    { label: "Experience", value: "Over 30 years" },
    { label: "Home base", value: "Portugal" },
    { label: "Vision", value: "Accessible & sustainable housing" },
    { label: "Role", value: "Project partner" },
  ],
};

export function getPhilosophy(locale: Locale): PhilosophyContent {
  if (locale === "pt") return PT;
  if (locale === "en") return EN;
  return MODULIA_PHILOSOPHY;
}
