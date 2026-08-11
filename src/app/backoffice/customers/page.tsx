import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate, type Customer } from "@/lib/crm/types";

export default async function CustomersPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  const customers = (data ?? []) as Customer[];

  return (
    <div>
      <h1 className="font-serif text-3xl text-luxury-graphite">Clients</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">Fiches clients liées aux leads et commandes</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-luxury-stone bg-white">
        <table className="min-w-full text-left font-ui text-sm">
          <thead className="border-b border-luxury-stone bg-[#faf9f7] text-[11px] uppercase tracking-wider text-luxury-muted">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">Marketing</th>
              <th className="px-4 py-3">Créé</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-luxury-stone/60 last:border-0">
                <td className="px-4 py-3 font-medium">{customer.name}</td>
                <td className="px-4 py-3">{customer.email}</td>
                <td className="px-4 py-3">{customer.phone || "—"}</td>
                <td className="px-4 py-3">{customer.marketing_opt_in ? "Oui" : "Non"}</td>
                <td className="px-4 py-3 text-luxury-muted">{formatDate(customer.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/backoffice/customers/${customer.id}`}
                    className="text-luxury-forest hover:underline"
                  >
                    Ouvrir
                  </Link>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-luxury-muted">
                  Aucun client.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
