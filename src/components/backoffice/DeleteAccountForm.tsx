"use client";

import { useActionState } from "react";
import { deleteBackofficeUserAction } from "@/app/backoffice/actions";

const initialState: { ok?: boolean; error?: string } | null = null;

type Props = {
  userId: string;
  label: string;
};

export function DeleteAccountForm({ userId, label }: Props) {
  const [state, formAction, pending] = useActionState(
    deleteBackofficeUserAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="mt-8 space-y-3 rounded-2xl border border-red-200 bg-red-50/40 p-6"
      onSubmit={(e) => {
        const ok = window.confirm(
          `Supprimer définitivement le compte « ${label} » ?\nCette action est irréversible.`,
        );
        if (!ok) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={userId} />
      <h2 className="font-serif text-xl text-luxury-graphite">Supprimer le compte</h2>
      <p className="font-ui text-sm text-luxury-muted">
        Supprime l&apos;accès Auth et le profil. Les leads / commandes restent, sans
        commercial assigné. Les commissions de ce compte sont effacées.
      </p>
      {state?.error && <p className="font-ui text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-red-700 px-6 py-2.5 font-ui text-xs uppercase tracking-wider text-white disabled:opacity-60"
      >
        {pending ? "Suppression…" : "Supprimer définitivement"}
      </button>
    </form>
  );
}
