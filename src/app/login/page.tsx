import { LoginForm } from "@/components/backoffice/LoginForm";

type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  // Respeitar ?next= apenas se for uma rota interna válida — caso contrário
  // deixar o LoginForm redirecionar pelo role do utilizador
  const nextPath =
    params.next &&
    params.next.startsWith("/") &&
    !params.next.startsWith("//")
      ? params.next
      : undefined;

  return (
    <div className="flex min-h-screen items-center bg-luxury-papyrus px-6 py-16">
      <div className="mx-auto w-full max-w-lg">
        <p className="text-center font-ui text-[10px] uppercase tracking-[0.35em] text-luxury-forest">
          Modulia
        </p>
        <h1 className="mt-3 text-center font-serif text-4xl text-luxury-graphite">Espace pro</h1>
        <p className="mt-3 text-center font-ui text-sm text-luxury-muted">
          Connexion propriétaires, showroom et commerciaux IAD
        </p>
        <div className="mt-10">
          <LoginForm nextPath={nextPath} />
        </div>
      </div>
    </div>
  );
}
