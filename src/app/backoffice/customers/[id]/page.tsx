import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateCustomerAction } from "@/app/backoffice/actions";
import { formatDate, type Customer } from "@/lib/crm/types";

type PageProps = { params: Promise<{ id: string }> };

export default async function CustomerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("customers").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const customer = data as Customer;

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/backoffice/customers" className="font-ui text-xs text-luxury-muted hover:underline">
        ← Clients
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-luxury-graphite">{customer.name}</h1>
      <p className="mt-2 text-sm text-luxury-muted">Créé le {formatDate(customer.created_at)}</p>

      <form action={updateCustomerAction} className="mt-8 space-y-4 rounded-2xl border border-luxury-stone bg-white p-6">
        <input type="hidden" name="id" value={customer.id} />
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Nom</span>
          <input
            name="name"
            required
            defaultValue={customer.name}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            defaultValue={customer.email}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Téléphone</span>
          <input
            name="phone"
            defaultValue={customer.phone ?? ""}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Adresse</span>
          <textarea
            name="address"
            rows={2}
            defaultValue={customer.address ?? ""}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Notes</span>
          <textarea
            name="notes"
            rows={3}
            defaultValue={customer.notes ?? ""}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="marketing_opt_in"
            defaultChecked={customer.marketing_opt_in}
            className="h-4 w-4"
          />
          Opt-in marketing / mailing
        </label>
        <button
          type="submit"
          className="rounded-full bg-luxury-forest px-6 py-2.5 font-ui text-xs uppercase tracking-wider text-white"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
