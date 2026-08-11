import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { ROLE_LABELS, type Profile } from "@/lib/crm/types";
import { CreateUserForm } from "@/components/backoffice/CreateUserForm";

export default async function AgentsPage() {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) redirect("/backoffice");

  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("*").order("full_name");
  const agents = (data ?? []) as Profile[];

  return (
    <div>
      <h1 className="font-serif text-3xl text-luxury-graphite">Commerciaux & comptes</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        Créez les accès (commerciaux IAD, showroom, propriétaires) et gérez commissions / rôles.
      </p>

      <div className="mt-8">
        <CreateUserForm />
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-luxury-stone bg-white">
        <table className="min-w-full text-left font-ui text-sm">
          <thead className="border-b border-luxury-stone bg-[#faf9f7] text-[11px] uppercase tracking-wider text-luxury-muted">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3">Agence</th>
              <th className="px-4 py-3">Commission %</th>
              <th className="px-4 py-3">Actif</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-b border-luxury-stone/60 last:border-0">
                <td className="px-4 py-3 font-medium">{agent.full_name || "—"}</td>
                <td className="px-4 py-3">{agent.email}</td>
                <td className="px-4 py-3">{ROLE_LABELS[agent.role]}</td>
                <td className="px-4 py-3">{agent.agency || "—"}</td>
                <td className="px-4 py-3">{agent.commission_rate_pct} %</td>
                <td className="px-4 py-3">{agent.active ? "Oui" : "Non"}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/backoffice/agents/${agent.id}`}
                    className="text-luxury-forest hover:underline"
                  >
                    Éditer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
