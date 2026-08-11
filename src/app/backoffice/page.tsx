import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import {
  formatEuro,
  SOURCE_LABELS,
  type LeadSource,
  type Profile,
} from "@/lib/crm/types";

export default async function BackofficeDashboardPage() {
  const profile = await getCurrentProfile();
  const supabase = await createClient();
  const owner = isOwner(profile);

  let leadsQuery = supabase
    .from("leads")
    .select("id, status, total_price_ttc, source, assigned_to", { count: "exact" });
  let ordersQuery = supabase
    .from("orders")
    .select(
      "id, price_ttc, amount_paid, amount_due, pipeline_status, payment_status, source, assigned_to",
      { count: "exact" },
    );
  let commissionsQuery = supabase
    .from("commission_entries")
    .select("id, amount, payment_status, agent_id", { count: "exact" });

  if (!owner && profile) {
    if (profile.role === "showroom") {
      leadsQuery = leadsQuery.eq("source", "showroom");
      ordersQuery = ordersQuery.eq("source", "showroom");
    } else {
      leadsQuery = leadsQuery.eq("assigned_to", profile.id);
      ordersQuery = ordersQuery.eq("assigned_to", profile.id);
      commissionsQuery = commissionsQuery.eq("agent_id", profile.id);
    }
  }

  const [leadsRes, ordersRes, commissionsRes, customersRes, agentsRes] = await Promise.all([
    leadsQuery,
    ordersQuery,
    commissionsQuery,
    owner
      ? supabase.from("customers").select("id", { count: "exact", head: true })
      : Promise.resolve({ count: null }),
    owner
      ? supabase.from("profiles").select("id, full_name, email, role").eq("active", true)
      : Promise.resolve({ data: [] as Profile[] }),
  ]);

  const leads = leadsRes.data ?? [];
  const orders = ordersRes.data ?? [];
  const commissions = commissionsRes.data ?? [];
  const agents = (agentsRes.data ?? []) as Pick<Profile, "id" | "full_name" | "email" | "role">[];

  const newLeads = leads.filter((l) => l.status === "new").length;
  const converted = leads.filter((l) => l.status === "converted").length;
  const conversionRate =
    leads.length > 0 ? Math.round((converted / leads.length) * 100) : 0;
  const ca = orders.reduce((sum, o) => sum + Number(o.price_ttc || 0), 0);
  const due = orders.reduce((sum, o) => sum + Number(o.amount_due || 0), 0);
  const commissionsDue = commissions
    .filter((c) => c.payment_status === "a_pagar")
    .reduce((sum, c) => sum + Number(c.amount || 0), 0);

  const cards = [
    { label: "Leads", value: String(leadsRes.count ?? leads.length), href: "/backoffice/leads" },
    { label: "Nouveaux leads", value: String(newLeads), href: "/backoffice/leads" },
    { label: "Taux conversion", value: `${conversionRate} %`, href: "/backoffice/leads" },
    { label: "Commandes", value: String(ordersRes.count ?? orders.length), href: "/backoffice/orders" },
    { label: "CA TTC", value: formatEuro(ca), href: "/backoffice/orders" },
    { label: "Solde clients", value: formatEuro(due), href: "/backoffice/orders" },
    {
      label: "Commissions à payer",
      value: formatEuro(commissionsDue),
      href: "/backoffice/commissions",
    },
  ];

  if (owner && customersRes.count != null) {
    cards.push({
      label: "Clients",
      value: String(customersRes.count),
      href: "/backoffice/customers",
    });
  }

  const sources = Object.keys(SOURCE_LABELS) as LeadSource[];
  const byChannel = sources.map((source) => {
    const channelLeads = leads.filter((l) => l.source === source).length;
    const channelOrders = orders.filter((o) => o.source === source);
    const channelCa = channelOrders.reduce((s, o) => s + Number(o.price_ttc || 0), 0);
    return {
      source,
      label: SOURCE_LABELS[source],
      leads: channelLeads,
      orders: channelOrders.length,
      ca: channelCa,
    };
  });

  const byAgent = owner
    ? agents
        .filter((a) => a.role === "agent" || a.role === "showroom")
        .map((agent) => {
          const agentLeads = leads.filter((l) => l.assigned_to === agent.id).length;
          const agentOrders = orders.filter((o) => o.assigned_to === agent.id);
          const agentCa = agentOrders.reduce((s, o) => s + Number(o.price_ttc || 0), 0);
          const agentComm = commissions
            .filter((c) => c.agent_id === agent.id)
            .reduce((s, c) => s + Number(c.amount || 0), 0);
          return {
            id: agent.id,
            name: agent.full_name || agent.email,
            leads: agentLeads,
            orders: agentOrders.length,
            ca: agentCa,
            commissions: agentComm,
          };
        })
    : [];

  return (
    <div>
      <h1 className="font-serif text-3xl text-luxury-graphite">Tableau de bord</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        Vue {owner ? "globale" : "personnelle"} — leads, commandes et commissions
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-luxury-stone bg-white p-5 shadow-sm transition hover:border-luxury-forest/40"
          >
            <p className="font-ui text-[11px] uppercase tracking-wider text-luxury-muted">
              {card.label}
            </p>
            <p className="mt-3 font-serif text-3xl text-luxury-graphite">{card.value}</p>
          </Link>
        ))}
      </div>

      {owner && (
        <>
          <h2 className="mt-12 font-serif text-2xl text-luxury-graphite">Par canal</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-luxury-stone bg-white">
            <table className="min-w-full text-left font-ui text-sm">
              <thead className="border-b border-luxury-stone bg-[#faf9f7] text-[11px] uppercase tracking-wider text-luxury-muted">
                <tr>
                  <th className="px-4 py-3">Canal</th>
                  <th className="px-4 py-3">Leads</th>
                  <th className="px-4 py-3">Commandes</th>
                  <th className="px-4 py-3">CA TTC</th>
                </tr>
              </thead>
              <tbody>
                {byChannel.map((row) => (
                  <tr key={row.source} className="border-b border-luxury-stone/60 last:border-0">
                    <td className="px-4 py-3 font-medium">{row.label}</td>
                    <td className="px-4 py-3">{row.leads}</td>
                    <td className="px-4 py-3">{row.orders}</td>
                    <td className="px-4 py-3">{formatEuro(row.ca)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-12 font-serif text-2xl text-luxury-graphite">Par commercial</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-luxury-stone bg-white">
            <table className="min-w-full text-left font-ui text-sm">
              <thead className="border-b border-luxury-stone bg-[#faf9f7] text-[11px] uppercase tracking-wider text-luxury-muted">
                <tr>
                  <th className="px-4 py-3">Commercial</th>
                  <th className="px-4 py-3">Leads</th>
                  <th className="px-4 py-3">Commandes</th>
                  <th className="px-4 py-3">CA TTC</th>
                  <th className="px-4 py-3">Commissions</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {byAgent.map((row) => (
                  <tr key={row.id} className="border-b border-luxury-stone/60 last:border-0">
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3">{row.leads}</td>
                    <td className="px-4 py-3">{row.orders}</td>
                    <td className="px-4 py-3">{formatEuro(row.ca)}</td>
                    <td className="px-4 py-3">{formatEuro(row.commissions)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/backoffice/agents/${row.id}`}
                        className="text-luxury-forest hover:underline"
                      >
                        Fiche
                      </Link>
                    </td>
                  </tr>
                ))}
                {byAgent.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-luxury-muted">
                      Aucun commercial actif.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
