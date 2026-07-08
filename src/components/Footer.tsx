import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-modulia-200 bg-modulia-950 py-12 text-modulia-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <Logo size="lg" linked={false} />
        <p className="text-sm">
          © {new Date().getFullYear()} Modulia. Casas modulares sustentáveis.
        </p>
      </div>
    </footer>
  );
}
