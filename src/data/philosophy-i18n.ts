import type { Locale } from "@/i18n/config";
import { MODULIA_PHILOSOPHY } from "@/data/philosophy";

type PhilosophyContent = typeof MODULIA_PHILOSOPHY;

const PT: PhilosophyContent = {
  eyebrow: "A nossa visão",
  title: "Filosofia de vida Modulia",
  intro: [
    "A Modulia é uma nova forma de habitar: simples, contemporânea e acessível.",
    "As nossas casas modulares são concebidas para se adaptar ao seu modo de vida, hoje e amanhã.",
  ],
  body: [
    "Compostas por módulos inteligentemente montados, as casas Modulia oferecem configurações de 2, 3 ou 4 quartos, pensadas para conforto e funcionalidade no dia a dia. Cada modelo inclui casa de banho com WC, cozinha equipada e uma sala convivente com canto de refeições — o verdadeiro coração da casa.",
    "Consoante o modelo, é possível acrescentar um ou dois terraços em estrutura de alumínio e madeira, para prolongar o espaço de vida para o exterior e usufruir plenamente do ambiente.",
    "Os módulos existem em 5,90 m ou 11,80 m de comprimento, com largura fixa de 2,25 m, garantindo conceção controlada, fabrico otimizado e elevada qualidade de acabamento.",
    "Fiel à sua filosofia, a Modulia torna a casa contemporânea acessível, com soluções económicas e performantes, a partir de 920 € HT.",
  ],
  closing:
    "A Modulia é a escolha de um habitat moderno, evolutivo e controlado, onde design rima com liberdade.",
  highlights: [
    { label: "Configurações", value: "2, 3 ou 4 quartos" },
    { label: "Incluído", value: "WC · Cozinha · Sala refeições" },
    { label: "Módulos", value: "5,90 m ou 11,80 m × 2,25 m" },
    { label: "A partir de", value: "920 € HT / m²" },
  ],
};

const EN: PhilosophyContent = {
  eyebrow: "Our vision",
  title: "Modulia living philosophy",
  intro: [
    "Modulia is a new way of living: simple, contemporary and accessible.",
    "Our modular homes are designed to adapt to your lifestyle, today and tomorrow.",
  ],
  body: [
    "Built from intelligently assembled modules, Modulia homes offer 2, 3 or 4-bedroom layouts designed for everyday comfort and functionality. Every model includes a shower room with WC, a fitted kitchen, and a welcoming living area with dining space — the true heart of the home.",
    "Depending on the model, one or two terraces in aluminium and wood structure can be added to extend living outdoors and fully enjoy your surroundings.",
    "Modules come in 5.90 m or 11.80 m lengths, with a fixed width of 2.25 m, ensuring controlled design, optimised manufacturing and high finishing quality.",
    "True to its philosophy, Modulia makes contemporary living accessible, with economical and high-performing solutions from €920 excl. VAT.",
  ],
  closing:
    "Modulia is the choice of a modern, evolutive and controlled home, where design meets freedom.",
  highlights: [
    { label: "Layouts", value: "2, 3 or 4 bedrooms" },
    { label: "Included", value: "Bathroom · Kitchen · Living-dining" },
    { label: "Modules", value: "5.90 m or 11.80 m × 2.25 m" },
    { label: "From", value: "€920 excl. VAT / m²" },
  ],
};

export function getPhilosophy(locale: Locale): PhilosophyContent {
  if (locale === "pt") return PT;
  if (locale === "en") return EN;
  return MODULIA_PHILOSOPHY;
}
