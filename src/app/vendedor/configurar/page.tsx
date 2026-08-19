import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentProfile } from "@/lib/crm/auth";
import { VendedorConfigurator } from "@/components/vendedor/VendedorConfigurator";

export const metadata = {
  title: "Configurer | Modulia Vendeur",
  robots: { index: false },
};

export default async function VendedorConfigurarPage() {
  const profile = await getCurrentProfile();

  if (!profile || !profile.active) {
    redirect("/login?next=/vendedor/configurar");
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-luxury-papyrus">
          <p className="font-ui text-sm text-luxury-muted">Chargement…</p>
        </div>
      }
    >
      <VendedorConfigurator profile={profile} />
    </Suspense>
  );
}
