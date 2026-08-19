import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { convertLeadToOrderAction, updateLeadAction } from "@/app/backoffice/actions";
import { ConfigurationView } from "@/components/backoffice/ConfigurationView";
import {
  formatDate,
  formatEuro,
  LEAD_STATUS_LABELS,
  SOURCE_LABELS,
  type Lead,
  type LeadStatus,
  type Profile,
} from "@/lib/crm/types";

const LEAD_STATUS_BADGE: Record<LeadStatus, string> = {
  new: "bg-orange-100 text-orange-800 border-orange-200",
  contacted: "bg-green-100 text-green-800 border-green-200",
  qualified: "bg-red-100 text-red-800 border-red-200",
  converted: "bg-violet-100 text-violet-800 border-violet-200",
  lost: "bg-slate-100 text-slate-700 border-slate-200",
};

type PageProps = { params: Promise<{ id: string }> };

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params;
  const profile = await getCurrentProfile();
  const owner = isOwner(profile);
  const supabase = await createClient();

  const { data: lead } = await supabase
    .from("leads")
    .select("*, assignee:profiles!assigned_to(*)")
    .eq("id", id)
    .maybeSingle();

  if (!lead) notFound();

  let agents: Profile[] = [];
  if (owner) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("active", true)
      .order("full_name");
    agents = (data ?? []) as Profile[];
  }

  const typed = lead as Lead;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/backoffice/leads" className="font-ui text-xs text-luxury-muted hover:underline">
        ← Leads
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-luxury-graphite">{typed.name}</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        {typed.email}
        {typed.phone ? ` · ${typed.phone}` : ""} · {formatDate(typed.created_at)}
      </p>

      <dl className="mt-8 grid gap-4 rounded-2xl border border-luxury-stone bg-white p-6 sm:grid-cols-2">
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Modèle</dt>
          <dd className="mt-1 text-luxury-graphite">{typed.model || "—"}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Origine</dt>
          <dd className="mt-1 text-luxury-graphite">{SOURCE_LABELS[typed.source]}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Prix estimé TTC</dt>
          <dd className="mt-1 text-luxury-graphite">{formatEuro(typed.total_price_ttc)}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-luxury-muted">Statut</dt>
          <dd className="mt-1">
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${LEAD_STATUS_BADGE[typed.status]}`}
            >
              {LEAD_STATUS_LABELS[typed.status]}
            </span>
          </dd>
        </div>
      </dl>

      {typed.configuration && (
        <div className="mt-6 rounded-2xl border border-luxury-stone bg-white p-6">
          <h2 className="mb-4 font-serif text-xl text-luxury-graphite">Configuration</h2>
          <ConfigurationView configuration={typed.configuration} />
        </div>
      )}

      {typed.message && (
        <div className="mt-6 rounded-2xl border border-luxury-stone bg-white p-6">
          <h2 className="font-serif text-xl text-luxury-graphite">Message</h2>
          <p className="mt-3 font-ui text-sm text-luxury-muted">{typed.message}</p>
        </div>
      )}

      <form action={updateLeadAction} className="mt-6 space-y-4 rounded-2xl border border-luxury-stone bg-white p-6">
        <input type="hidden" name="id" value={typed.id} />
        <h2 className="font-serif text-xl text-luxury-graphite">Mettre à jour</h2>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Statut</span>
          <select
            name="status"
            defaultValue={typed.status}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          >
            {(Object.keys(LEAD_STATUS_LABELS) as LeadStatus[]).map((key) => (
              <option key={key} value={key}>
                {LEAD_STATUS_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
        {owner && (
          <label className="block">
            <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Assigné à</span>
            <select
              name="assigned_to"
              defaultValue={typed.assigned_to ?? ""}
              className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            >
              <option value="">— Non assigné —</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.full_name || agent.email} ({agent.role})
                </option>
              ))}
            </select>
          </label>
        )}
        <button
          type="submit"
          className="rounded-full bg-luxury-forest px-6 py-2.5 font-ui text-xs uppercase tracking-wider text-white"
        >
          Enregistrer
        </button>
      </form>

      {typed.status !== "converted" && (
        <form action={convertLeadToOrderAction} className="mt-4">
          <input type="hidden" name="lead_id" value={typed.id} />
          <button
            type="submit"
            className="rounded-full border border-luxury-forest px-6 py-2.5 font-ui text-xs uppercase tracking-wider text-luxury-forest"
          >
            Convertir en commande
          </button>
        </form>
      )}
    </div>
  );
}
