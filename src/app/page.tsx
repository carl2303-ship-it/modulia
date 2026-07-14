import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ModuliaPhilosophy } from "@/components/ModuliaPhilosophy";
import { ConstructionPrinciple } from "@/components/ConstructionPrinciple";
import { Features } from "@/components/Features";
import { Models } from "@/components/Models";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-luxury-papyrus">
      <Header />
      <main>
        <Hero />
        <ModuliaPhilosophy />
        <ConstructionPrinciple />
        <Features />
        <Models />
        <Contact />
      </main>
    </div>
  );
}
