import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { updateCommissionPaymentAction } from "@/app/backoffice/actions";
import {
  COMMISSION_PAYMENT_LABELS,
  formatDate,
  formatEuro,
  type CommissionEntry,
  type CommissionPaymentStatus,
} from "@/lib/crm/types";

export default async function CommissionsPage() {
  const profile = await getCurrentProfile();
  const owner = isOwner(profile);
  const supabase = await createClient();

  let query = supabase
    .from("commission_entries")
    .select(
      "*, agent:profiles!agent_id(full_name, email), order:orders(model, price_ttc)",
    )
    .order("created_at", { ascending: false });

  if (!owner && profile) {
    query = query.eq("agent_id", profile.id);
  }

  const { data } = await query;
  const entries = (data ?? []) as CommissionEntry[];

  const due = entries
    .filter((e) => e.payment_status === "a_pagar")
    .reduce((s, e) => s + Number(e.amount || 0), 0);

  return (
    <div>
      <h1 className="font-serif text-3xl text-luxury-graphite">Commissions</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        Calculées sur le prix TTC · À payer : {formatEuro(due)}
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-luxury-stone bg-white">
        <table className="min-w-full text-left font-ui text-sm">
          <thead className="border-b border-luxury-stone bg-[#faf9f7] text-[11px] uppercase tracking-wider text-luxury-muted">
            <tr>
              <th className="px-4 py-3">Date</th>
              {owner && <th className="px-4 py-3">Commercial</th>}
              <th className="px-4 py-3">Base TTC</th>
              <th className="px-4 py-3">Taux</th>
              <th className="px-4 py-3">Montant</th>
              <th className="px-4 py-3">Statut</th>
              {owner && <th className="px-4 py-3">Action</th>}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-luxury-stone/60 last:border-0">
                <td className="px-4 py-3 text-luxury-muted">{formatDate(entry.created_at)}</td>
                {owner && (
                  <td className="px-4 py-3">
                    {(entry.agent as { full_name?: string } | null)?.full_name || "—"}
                  </td>
                )}
                <td className="px-4 py-3">{formatEuro(entry.base_ttc)}</td>
                <td className="px-4 py-3">{entry.rate_pct} %</td>
                <td className="px-4 py-3 font-medium">{formatEuro(entry.amount)}</td>
                <td className="px-4 py-3">{COMMISSION_PAYMENT_LABELS[entry.payment_status]}</td>
                {owner && (
                  <td className="px-4 py-3">
                    <form action={updateCommissionPaymentAction} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={entry.id} />
                      <select
                        name="payment_status"
                        defaultValue={entry.payment_status}
                        className="rounded-lg border border-luxury-stone px-2 py-1 text-xs"
                      >
                        {(Object.keys(COMMISSION_PAYMENT_LABELS) as CommissionPaymentStatus[]).map(
                          (key) => (
                            <option key={key} value={key}>
                              {COMMISSION_PAYMENT_LABELS[key]}
                            </option>
                          ),
                        )}
                      </select>
                      <button type="submit" className="text-xs text-luxury-forest hover:underline">
                        OK
                      </button>
                    </form>
                  </td>
                )}
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={owner ? 7 : 5} className="px-4 py-10 text-center text-luxury-muted">
                  Aucune commission.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
