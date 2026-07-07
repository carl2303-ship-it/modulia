export function Footer() {
  return (
    <footer className="border-t border-modulia-200 bg-modulia-950 py-12 text-modulia-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-modulia-700 text-xs font-bold text-white">
            M
          </span>
          <span className="font-semibold text-white">Modulia</span>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Modulia. Casas modulares sustentáveis.
        </p>
      </div>
    </footer>
  );
}
