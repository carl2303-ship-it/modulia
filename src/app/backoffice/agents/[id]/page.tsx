import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { updateAgentAction } from "@/app/backoffice/actions";
import { formatEuro, ROLE_LABELS, type Profile, type UserRole } from "@/lib/crm/types";

type PageProps = { params: Promise<{ id: string }> };

export default async function AgentDetailPage({ params }: PageProps) {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) redirect("/backoffice");

  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const agent = data as Profile;

  const [{ count: leadsCount }, { count: ordersCount }, commissionsRes] = await Promise.all([
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("assigned_to", id),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("assigned_to", id),
    supabase.from("commission_entries").select("amount, payment_status").eq("agent_id", id),
  ]);

  const commissions = commissionsRes.data ?? [];
  const totalCommission = commissions.reduce((s, c) => s + Number(c.amount || 0), 0);
  const dueCommission = commissions
    .filter((c) => c.payment_status === "a_pagar")
    .reduce((s, c) => s + Number(c.amount || 0), 0);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/backoffice/agents" className="font-ui text-xs text-luxury-muted hover:underline">
        ← Commerciaux
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-luxury-graphite">
        {agent.full_name || agent.email}
      </h1>
      <p className="mt-2 text-sm text-luxury-muted">{ROLE_LABELS[agent.role]}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-luxury-stone bg-white p-4">
          <p className="text-[11px] uppercase tracking-wider text-luxury-muted">Leads</p>
          <p className="mt-2 font-serif text-2xl">{leadsCount ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-luxury-stone bg-white p-4">
          <p className="text-[11px] uppercase tracking-wider text-luxury-muted">Commandes</p>
          <p className="mt-2 font-serif text-2xl">{ordersCount ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-luxury-stone bg-white p-4">
          <p className="text-[11px] uppercase tracking-wider text-luxury-muted">Commissions dues</p>
          <p className="mt-2 font-serif text-2xl">{formatEuro(dueCommission)}</p>
          <p className="mt-1 text-xs text-luxury-muted">Total {formatEuro(totalCommission)}</p>
        </div>
      </div>

      <form action={updateAgentAction} className="mt-8 space-y-4 rounded-2xl border border-luxury-stone bg-white p-6">
        <input type="hidden" name="id" value={agent.id} />
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Nom complet</span>
          <input
            name="full_name"
            defaultValue={agent.full_name}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Téléphone</span>
          <input
            name="phone"
            defaultValue={agent.phone ?? ""}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Agence</span>
          <input
            name="agency"
            defaultValue={agent.agency ?? ""}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
            IBAN (paiement commissions)
          </span>
          <input
            name="iban"
            defaultValue={agent.iban ?? ""}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Rôle</span>
          <select
            name="role"
            defaultValue={agent.role}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          >
            {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => (
              <option key={role} value={role}>
                {ROLE_LABELS[role]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
            Commission % (sur TTC)
          </span>
          <input
            name="commission_rate_pct"
            type="number"
            step="0.01"
            min="0"
            max="100"
            defaultValue={agent.commission_rate_pct}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked={agent.active} className="h-4 w-4" />
          Compte actif
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
