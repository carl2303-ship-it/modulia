import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import {
  formatDate,
  formatEuro,
  LEAD_STATUS_LABELS,
  SOURCE_LABELS,
  type Lead,
  type LeadStatus,
} from "@/lib/crm/types";

const LEAD_STATUS_BADGE: Record<LeadStatus, string> = {
  new: "bg-orange-100 text-orange-800 border-orange-200",
  contacted: "bg-green-100 text-green-800 border-green-200",
  qualified: "bg-red-100 text-red-800 border-red-200",
  converted: "bg-violet-100 text-violet-800 border-violet-200",
  lost: "bg-slate-100 text-slate-700 border-slate-200",
};

export default async function LeadsPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const owner = isOwner(profile);

  let query = supabase
    .from("leads")
    .select("*, assignee:profiles!assigned_to(id, full_name, email)")
    .order("created_at", { ascending: false });

  if (!owner && profile) {
    if (profile.role === "showroom") query = query.eq("source", "showroom");
    else query = query.eq("assigned_to", profile.id);
  }

  const { data } = await query;
  const leads = (data ?? []) as Lead[];

  return (
    <div>
      <h1 className="font-serif text-3xl text-luxury-graphite">Leads</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        Demandes de contact et configurations envoyées depuis le site
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-luxury-stone bg-white">
        <table className="min-w-full text-left font-ui text-sm">
          <thead className="border-b border-luxury-stone bg-[#faf9f7] text-[11px] uppercase tracking-wider text-luxury-muted">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Modèle</th>
              <th className="px-4 py-3">Origine</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Assigné</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-luxury-stone/60 last:border-0">
                <td className="px-4 py-3 text-luxury-muted">{formatDate(lead.created_at)}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-luxury-graphite">{lead.name}</div>
                  <div className="text-xs text-luxury-muted">{lead.email}</div>
                </td>
                <td className="px-4 py-3">{lead.model || "—"}</td>
                <td className="px-4 py-3">{SOURCE_LABELS[lead.source]}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${LEAD_STATUS_BADGE[lead.status]}`}
                  >
                    {LEAD_STATUS_LABELS[lead.status]}
                  </span>
                </td>
                <td className="px-4 py-3">{formatEuro(lead.total_price_ttc)}</td>
                <td className="px-4 py-3 text-luxury-muted">
                  {(lead.assignee as { full_name?: string } | null)?.full_name || "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/backoffice/leads/${lead.id}`}
                    className="text-luxury-forest hover:underline"
                  >
                    Ouvrir
                  </Link>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-luxury-muted">
                  Aucun lead pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
