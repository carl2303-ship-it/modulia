import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import {
  formatDate,
  formatEuro,
  PAYMENT_LABELS,
  PIPELINE_LABELS,
  SOURCE_LABELS,
  type Order,
} from "@/lib/crm/types";

export default async function OrdersPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const owner = isOwner(profile);

  let query = supabase
    .from("orders")
    .select(
      "*, assignee:profiles!assigned_to(full_name), customer:customers(name, email, phone, address)",
    )
    .order("created_at", { ascending: false });

  if (!owner && profile) {
    if (profile.role === "showroom") query = query.eq("source", "showroom");
    else query = query.eq("assigned_to", profile.id);
  }

  const { data } = await query;
  const orders = (data ?? []) as Order[];
  const getCityFromAddress = (address?: string | null) => {
    if (!address) return null;
    const parts = address
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    return parts.length > 1 ? parts[parts.length - 1] : null;
  };

  return (
    <div>
      <h1 className="font-serif text-3xl text-luxury-graphite">Commandes</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        Pipeline, paiements clients et soldes
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-luxury-stone bg-white">
        <table className="min-w-full text-left font-ui text-sm">
          <thead className="border-b border-luxury-stone bg-[#faf9f7] text-[11px] uppercase tracking-wider text-luxury-muted">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">Ville</th>
              <th className="px-4 py-3">Modèle</th>
              <th className="px-4 py-3">Pipeline</th>
              <th className="px-4 py-3">Paiement</th>
              <th className="px-4 py-3">Prix TTC</th>
              <th className="px-4 py-3">Solde</th>
              <th className="px-4 py-3">Origine</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-luxury-stone/60 last:border-0">
                <td className="px-4 py-3 text-luxury-muted">{formatDate(order.created_at)}</td>
                <td className="px-4 py-3">
                  {(order.customer as { name?: string } | null)?.name || order.delivery_name || "—"}
                </td>
                <td className="px-4 py-3 text-luxury-muted">
                  {order.delivery_phone ||
                    (order.customer as { phone?: string | null } | null)?.phone ||
                    "—"}
                </td>
                <td className="px-4 py-3 text-luxury-muted">
                  {order.delivery_city ||
                    getCityFromAddress((order.customer as { address?: string | null } | null)?.address) ||
                    "—"}
                </td>
                <td className="px-4 py-3">{order.model || "—"}</td>
                <td className="px-4 py-3">{PIPELINE_LABELS[order.pipeline_status]}</td>
                <td className="px-4 py-3">{PAYMENT_LABELS[order.payment_status]}</td>
                <td className="px-4 py-3">{formatEuro(order.price_ttc)}</td>
                <td className="px-4 py-3">{formatEuro(order.amount_due)}</td>
                <td className="px-4 py-3">{SOURCE_LABELS[order.source]}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/backoffice/orders/${order.id}`}
                    className="text-luxury-forest hover:underline"
                  >
                    Ouvrir
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={11} className="px-4 py-10 text-center text-luxury-muted">
                  Aucune commande.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
