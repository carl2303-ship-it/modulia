import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { canEditOrderConfiguration } from "@/lib/crm/parse-order-configuration";
import { updateOrderAction } from "@/app/backoffice/actions";
import { ConfigurationView } from "@/components/backoffice/ConfigurationView";
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
  const canEditConfiguration = canEditOrderConfiguration(
    typed.pipeline_status,
    typed.assigned_to,
    profile?.id ?? "",
    owner,
  );
  const customer = typed.customer as { phone?: string | null; address?: string | null } | null;
  const addressParts = customer?.address
    ?.split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const fallbackCity = addressParts && addressParts.length > 1 ? addressParts[addressParts.length - 1] : null;

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
        {(typed.customer as { name?: string } | null)?.name ||
          typed.delivery_name ||
          typed.model ||
          "Commande"}
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

      <div className="mt-6 rounded-2xl border border-luxury-stone bg-white p-6">
        <h2 className="font-serif text-xl text-luxury-graphite">Client & livraison</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Nom client</dt>
            <dd className="mt-1 text-luxury-graphite">{typed.delivery_name || "—"}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Email client</dt>
            <dd className="mt-1 text-luxury-graphite">{typed.delivery_email || "—"}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Téléphone</dt>
            <dd className="mt-1 text-luxury-graphite">
              {typed.delivery_phone || customer?.phone || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Rue / Adresse</dt>
            <dd className="mt-1 text-luxury-graphite">{typed.delivery_street || customer?.address || "—"}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Code postal</dt>
            <dd className="mt-1 text-luxury-graphite">{typed.delivery_postal_code || "—"}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Ville</dt>
            <dd className="mt-1 text-luxury-graphite">{typed.delivery_city || fallbackCity || "—"}</dd>
          </div>
        </dl>
      </div>

      {typed.configuration && (
        <div className="mt-6 rounded-2xl border border-luxury-stone bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl">Configuration</h2>
            {canEditConfiguration && (
              <Link
                href={`/vendedor/configurar?order=${typed.id}`}
                className="rounded-full border border-luxury-forest px-4 py-2 font-ui text-xs uppercase tracking-wider text-luxury-forest hover:bg-luxury-forest hover:text-white"
              >
                Modifier la configuration
              </Link>
            )}
          </div>
          <ConfigurationView configuration={typed.configuration} />
        </div>
      )}

      {!typed.configuration && canEditConfiguration && (
        <div className="mt-6 rounded-2xl border border-luxury-stone bg-white p-6">
          <p className="font-ui text-sm text-luxury-muted">
            Aucune configuration enregistrée pour cette commande.
          </p>
          <Link
            href={`/vendedor/configurar?order=${typed.id}`}
            className="mt-4 inline-block rounded-full border border-luxury-forest px-4 py-2 font-ui text-xs uppercase tracking-wider text-luxury-forest hover:bg-luxury-forest hover:text-white"
          >
            Ajouter une configuration
          </Link>
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
          <label className="block sm:col-span-2">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Nom client</span>
            <input
              name="delivery_name"
              type="text"
              defaultValue={typed.delivery_name ?? ""}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Email client</span>
            <input
              name="delivery_email"
              type="email"
              defaultValue={typed.delivery_email ?? ""}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Téléphone</span>
            <input
              name="delivery_phone"
              type="text"
              defaultValue={typed.delivery_phone ?? ""}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Rue / Adresse</span>
            <input
              name="delivery_street"
              type="text"
              defaultValue={typed.delivery_street ?? ""}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Code postal</span>
            <input
              name="delivery_postal_code"
              type="text"
              defaultValue={typed.delivery_postal_code ?? ""}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Ville</span>
            <input
              name="delivery_city"
              type="text"
              defaultValue={typed.delivery_city ?? ""}
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
