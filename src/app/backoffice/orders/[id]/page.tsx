import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { updateOrderAction } from "@/app/backoffice/actions";
import {
  formatDate,
  formatEuro,
  PAYMENT_LABELS,
  PIPELINE_LABELS,
  SOURCE_LABELS,
  type Order,
  type PaymentStatus,
  type PipelineStatus,
  type Profile,
} from "@/lib/crm/types";

type PageProps = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const profile = await getCurrentProfile();
  const owner = isOwner(profile);
  const supabase = await createClient();

  const { data: order } = await supabase
    .from("orders")
    .select("*, customer:customers(*), assignee:profiles!assigned_to(*)")
    .eq("id", id)
    .maybeSingle();

  if (!order) notFound();
  const typed = order as Order;

  let agents: Profile[] = [];
  if (owner) {
    const { data } = await supabase.from("profiles").select("*").eq("active", true).order("full_name");
    agents = (data ?? []) as Profile[];
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/backoffice/orders" className="font-ui text-xs text-luxury-muted hover:underline">
        ← Commandes
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-luxury-graphite">
        {(typed.customer as { name?: string } | null)?.name || typed.model || "Commande"}
      </h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        {SOURCE_LABELS[typed.source]} · {formatDate(typed.created_at)}
      </p>

      <dl className="mt-8 grid gap-4 rounded-2xl border border-luxury-stone bg-white p-6 sm:grid-cols-3">
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Prix TTC</dt>
          <dd className="mt-1 font-serif text-2xl">{formatEuro(typed.price_ttc)}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Payé</dt>
          <dd className="mt-1 font-serif text-2xl">{formatEuro(typed.amount_paid)}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Solde</dt>
          <dd className="mt-1 font-serif text-2xl">{formatEuro(typed.amount_due)}</dd>
        </div>
      </dl>

      {typed.configuration && (
        <div className="mt-6 rounded-2xl border border-luxury-stone bg-white p-6">
          <h2 className="font-serif text-xl">Configuration</h2>
          <pre className="mt-3 whitespace-pre-wrap font-ui text-sm text-luxury-muted">
            {typed.configuration}
          </pre>
        </div>
      )}

      <form action={updateOrderAction} className="mt-6 space-y-4 rounded-2xl border border-luxury-stone bg-white p-6">
        <input type="hidden" name="id" value={typed.id} />
        <h2 className="font-serif text-xl">Mettre à jour</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Pipeline</span>
            <select
              name="pipeline_status"
              defaultValue={typed.pipeline_status}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            >
              {(Object.keys(PIPELINE_LABELS) as PipelineStatus[]).map((key) => (
                <option key={key} value={key}>
                  {PIPELINE_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Paiement client</span>
            <select
              name="payment_status"
              defaultValue={typed.payment_status}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            >
              {(Object.keys(PAYMENT_LABELS) as PaymentStatus[]).map((key) => (
                <option key={key} value={key}>
                  {PAYMENT_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Prix TTC (€)</span>
            <input
              name="price_ttc"
              type="number"
              step="1"
              defaultValue={typed.price_ttc}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Montant payé (€)</span>
            <input
              name="amount_paid"
              type="number"
              step="1"
              defaultValue={typed.amount_paid}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
          </label>
        </div>

        {owner && (
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Assigné à</span>
            <select
              name="assigned_to"
              defaultValue={typed.assigned_to ?? ""}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            >
              <option value="">—</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.full_name || agent.email}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Notes</span>
          <textarea
            name="notes"
            rows={3}
            defaultValue={typed.notes ?? ""}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
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
