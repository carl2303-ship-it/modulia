"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ nextPath = "/backoffice" }: { nextPath?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signError) {
      setError(signError.message);
      setLoading(false);
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-5">
      <label className="block">
        <span className="font-ui text-xs uppercase tracking-wider text-luxury-muted">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-luxury-stone bg-white px-4 py-3 font-ui text-sm outline-none focus:border-luxury-forest"
        />
      </label>
      <label className="block">
        <span className="font-ui text-xs uppercase tracking-wider text-luxury-muted">Mot de passe</span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-luxury-stone bg-white px-4 py-3 font-ui text-sm outline-none focus:border-luxury-forest"
        />
      </label>
      {error && <p className="font-ui text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-luxury-forest py-3 font-ui text-xs uppercase tracking-wider text-white disabled:opacity-60"
      >
        {loading ? "Connexion…" : "Se connecter"}
      </button>
      <p className="text-center font-ui text-xs text-luxury-muted">
        <Link href="/" className="hover:underline">
          ← Retour au site
        </Link>
      </p>
    </form>
  );
}
