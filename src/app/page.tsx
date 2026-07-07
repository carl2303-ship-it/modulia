import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Models } from "@/components/Models";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-sand-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <Models />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
