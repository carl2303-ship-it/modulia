import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import {
  createMailingListAction,
  syncOptInToMailingListAction,
} from "@/app/backoffice/actions";
import { DeleteMailingListButton } from "@/components/backoffice/DeleteMailingListButton";
import type { MailingList } from "@/lib/crm/types";

export default async function MailingPage() {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) redirect("/backoffice");

  const supabase = await createClient();
  const { data: lists } = await supabase
    .from("mailing_lists")
    .select("*")
    .order("created_at", { ascending: false });

  const mailingLists = (lists ?? []) as MailingList[];

  const listsWithCounts = await Promise.all(
    mailingLists.map(async (list) => {
      const { count } = await supabase
        .from("mailing_list_members")
        .select("id", { count: "exact", head: true })
        .eq("list_id", list.id);
      return { ...list, member_count: count ?? 0 };
    }),
  );

  const { count: optInCount } = await supabase
    .from("customers")
    .select("id", { count: "exact", head: true })
    .eq("marketing_opt_in", true);

  const { data: optInCustomers } = await supabase
    .from("customers")
    .select("name, email, phone")
    .eq("marketing_opt_in", true)
    .order("email");

  const csv =
    "name,email,phone\n" +
    (optInCustomers ?? [])
      .map((c) =>
        [c.name, c.email, c.phone ?? ""]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

  return (
    <div>
      <h1 className="font-serif text-3xl text-luxury-graphite">Mailing</h1>
      <p className="mt-2 font-ui text-sm text-luxury-muted">
        Listes et export des clients opt-in ({optInCount ?? 0} contacts)
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-luxury-stone bg-white p-6">
          <h2 className="font-serif text-xl">Listes</h2>
          <ul className="mt-4 space-y-3">
            {listsWithCounts.map((list) => (
              <li
                key={list.id}
                className="flex items-center justify-between rounded-xl border border-luxury-stone/70 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-luxury-graphite">{list.name}</p>
                  <p className="text-xs text-luxury-muted">{list.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-luxury-muted">{list.member_count} membres</span>
                  <form action={syncOptInToMailingListAction}>
                    <input type="hidden" name="list_id" value={list.id} />
                    <button type="submit" className="text-xs text-luxury-forest hover:underline">
                      Sync opt-in
                    </button>
                  </form>
                  <DeleteMailingListButton listId={list.id} listName={list.name} />
                </div>
              </li>
            ))}
          </ul>

          <form action={createMailingListAction} className="mt-6 space-y-3 border-t border-luxury-stone pt-6">
            <p className="text-[11px] uppercase tracking-wider text-luxury-muted">Nouvelle liste</p>
            <input
              name="name"
              required
              placeholder="Nom"
              className="w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
            <input
              name="description"
              placeholder="Description"
              className="w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-full bg-luxury-forest px-5 py-2 font-ui text-xs uppercase tracking-wider text-white"
            >
              Créer
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-luxury-stone bg-white p-6">
          <h2 className="font-serif text-xl">Export CSV (opt-in)</h2>
          <p className="mt-2 text-sm text-luxury-muted">
            Copiez ou téléchargez la liste des clients ayant accepté le marketing.
          </p>
          <textarea
            readOnly
            value={csv}
            rows={16}
            className="mt-4 w-full rounded-xl border border-luxury-stone bg-[#faf9f7] p-3 font-mono text-xs"
          />
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
            download="modulia-mailing-optin.csv"
            className="mt-4 inline-block rounded-full border border-luxury-forest px-5 py-2 font-ui text-xs uppercase tracking-wider text-luxury-forest"
          >
            Télécharger CSV
          </a>
        </div>
      </div>
    </div>
  );
}
