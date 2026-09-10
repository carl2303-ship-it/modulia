"use client";

import { useActionState } from "react";
import { updateBackofficePasswordAction } from "@/app/backoffice/actions";

const initialState: { ok?: boolean; error?: string } | null = null;

type Props = {
  userId: string;
  label: string;
};

export function ResetPasswordForm({ userId, label }: Props) {
  const [state, formAction, pending] = useActionState(
    updateBackofficePasswordAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="mt-8 space-y-4 rounded-2xl border border-luxury-stone bg-white p-6"
    >
      <input type="hidden" name="id" value={userId} />
      <h2 className="font-serif text-xl text-luxury-graphite">
        Modifier le mot de passe
      </h2>
      <p className="font-ui text-sm text-luxury-muted">
        Définissez un nouveau mot de passe pour « {label} ». La personne pourra se
        connecter immédiatement avec ce mot de passe.
      </p>
      <label className="block">
        <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
          Nouveau mot de passe
        </span>
        <input
          name="password"
          type="text"
          required
          minLength={8}
          autoComplete="new-password"
          className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
        />
      </label>
      <label className="block">
        <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
          Confirmer
        </span>
        <input
          name="password_confirm"
          type="text"
          required
          minLength={8}
          autoComplete="new-password"
          className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
        />
      </label>
      {state?.error && <p className="font-ui text-sm text-red-600">{state.error}</p>}
      {state?.ok && (
        <p className="font-ui text-sm text-luxury-forest">
          Mot de passe mis à jour. Communiquez-le à la personne concernée.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-luxury-forest px-6 py-2.5 font-ui text-xs uppercase tracking-wider text-white disabled:opacity-60"
      >
        {pending ? "Enregistrement…" : "Enregistrer le mot de passe"}
      </button>
    </form>
  );
}
