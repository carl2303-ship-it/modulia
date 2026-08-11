"use client";

import { useActionState } from "react";
import { createBackofficeUserAction } from "@/app/backoffice/actions";
import { ROLE_LABELS, type UserRole } from "@/lib/crm/types";

const initialState: { ok?: boolean; error?: string; id?: string } | null = null;

export function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createBackofficeUserAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-luxury-stone bg-white p-6">
      <h2 className="font-serif text-xl text-luxury-graphite">Créer un accès</h2>
      <p className="font-ui text-sm text-luxury-muted">
        Commercial IAD, showroom ou propriétaire — sans passer par Supabase.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Nom complet</span>
          <input
            name="full_name"
            required
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="off"
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">
            Mot de passe provisoire
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
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Rôle</span>
          <select
            name="role"
            defaultValue="agent"
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
            Commission % (TTC)
          </span>
          <input
            name="commission_rate_pct"
            type="number"
            step="0.01"
            min="0"
            max="100"
            defaultValue={0}
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Téléphone</span>
          <input name="phone" className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-luxury-muted">Agence</span>
          <input
            name="agency"
            placeholder="IAD…"
            className="mt-2 w-full rounded-xl border border-luxury-stone px-3 py-2 text-sm"
          />
        </label>
      </div>

      {state?.error && <p className="font-ui text-sm text-red-600">{state.error}</p>}
      {state?.ok && (
        <p className="font-ui text-sm text-luxury-forest">
          Compte créé. La personne peut se connecter sur /login avec cet email et le mot de passe
          provisoire.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-luxury-forest px-6 py-2.5 font-ui text-xs uppercase tracking-wider text-white disabled:opacity-60"
      >
        {pending ? "Création…" : "Créer le compte"}
      </button>
    </form>
  );
}
