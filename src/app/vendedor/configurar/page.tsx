import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { toOrderEditPayload } from "@/lib/crm/order-edit";
import { canEditOrderConfiguration } from "@/lib/crm/parse-order-configuration";
import type { Customer, Order } from "@/lib/crm/types";
import { createClient } from "@/lib/supabase/server";
import { VendedorConfigurator } from "@/components/vendedor/VendedorConfigurator";

export const metadata = {
  title: "Configurer | Modulia Vendeur",
  robots: { index: false },
};

type PageProps = {
  searchParams: Promise<{ order?: string }>;
};

export default async function VendedorConfigurarPage({ searchParams }: PageProps) {
  const profile = await getCurrentProfile();

  if (!profile || !profile.active) {
    redirect("/login?next=/vendedor/configurar");
  }

  const { order: orderId } = await searchParams;
  let editOrder = null;

  if (orderId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("orders")
      .select("*, customer:customers(*)")
      .eq("id", orderId)
      .maybeSingle();

    if (!data) notFound();

    const order = data as Order;
    const owner = isOwner(profile);

    if (
      !canEditOrderConfiguration(order.pipeline_status, order.assigned_to, profile.id, owner)
    ) {
      redirect(`/backoffice/orders/${orderId}`);
    }

    editOrder = toOrderEditPayload(order, (order.customer as Customer | null) ?? null);
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-luxury-papyrus">
          <p className="font-ui text-sm text-luxury-muted">Chargement…</p>
        </div>
      }
    >
      <VendedorConfigurator profile={profile} editOrder={editOrder} />
    </Suspense>
  );
}
