import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HomePathways } from "@/components/HomePathways";
import { ModuliaPhilosophy } from "@/components/ModuliaPhilosophy";
import { ConstructionPrinciple } from "@/components/ConstructionPrinciple";
import { Features } from "@/components/Features";
import { Models } from "@/components/Models";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <HomePathways />
        <ModuliaPhilosophy />
        <ConstructionPrinciple />
        <Features />
        <Models />
        <Contact />
      </main>
    </div>
  );
}
