"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/crm/types";
import { ROLE_LABELS } from "@/lib/crm/types";

const NAV = [
  { href: "/backoffice", label: "Tableau de bord", ownerOnly: false },
  { href: "/backoffice/leads", label: "Leads", ownerOnly: false },
  { href: "/backoffice/orders", label: "Commandes", ownerOnly: false },
  { href: "/backoffice/customers", label: "Clients", ownerOnly: false },
  { href: "/backoffice/agents", label: "Commerciaux", ownerOnly: true },
  { href: "/backoffice/commissions", label: "Commissions", ownerOnly: false },
  { href: "/backoffice/mailing", label: "Mailing", ownerOnly: true },
] as const;

export function BackofficeNav({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  const router = useRouter();
  const isOwner = profile.role === "owner";

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-b border-luxury-stone bg-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="border-b border-luxury-stone px-5 py-6">
        <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-luxury-forest">Modulia CRM</p>
        <p className="mt-2 font-serif text-xl text-luxury-graphite">
          {profile.full_name || profile.email}
        </p>
        <p className="mt-1 font-ui text-[11px] text-luxury-muted">{ROLE_LABELS[profile.role]}</p>
      </div>
      <nav className="flex flex-1 flex-wrap gap-1 p-3 lg:flex-col">
        {NAV.filter((item) => !item.ownerOnly || isOwner).map((item) => {
          const active =
            item.href === "/backoffice"
              ? pathname === "/backoffice"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-3 py-2.5 font-ui text-sm transition ${
                active
                  ? "bg-luxury-forest/10 font-medium text-luxury-forest"
                  : "text-luxury-muted hover:bg-luxury-stone/40 hover:text-luxury-graphite"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-2 border-t border-luxury-stone p-4">
        <Link href="/" className="block font-ui text-xs text-luxury-muted hover:underline">
          ← Site public
        </Link>
        <button
          type="button"
          onClick={logout}
          className="font-ui text-xs uppercase tracking-wider text-luxury-forest hover:underline"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
