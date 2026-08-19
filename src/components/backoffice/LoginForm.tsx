"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ nextPath, dark = false }: { nextPath?: string; dark?: boolean }) {
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

    // Se nextPath foi explicitamente fornecido, usa-o
    if (nextPath) {
      router.replace(nextPath);
      router.refresh();
      return;
    }

    // Caso contrário, redireciona baseado no role do utilizador
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .single();

    const role = profile?.role as string | undefined;
    if (role === "agent" || role === "showroom") {
      router.replace("/vendedor/configurar");
    } else {
      router.replace("/backoffice");
    }
    router.refresh();
  }

  const labelClass = dark
    ? "font-ui text-xs uppercase tracking-wider text-white/50"
    : "font-ui text-xs uppercase tracking-wider text-luxury-muted";
  const inputClass = dark
    ? "mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-ui text-sm text-white placeholder-white/30 outline-none focus:border-luxury-forest"
    : "mt-2 w-full rounded-xl border border-luxury-stone bg-white px-4 py-3 font-ui text-sm outline-none focus:border-luxury-forest";
  const backLinkClass = dark
    ? "text-center font-ui text-xs text-white/40"
    : "text-center font-ui text-xs text-luxury-muted";

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-5">
      <label className="block">
        <span className={labelClass}>Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>Mot de passe</span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </label>
      {error && <p className="font-ui text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-luxury-forest py-3 font-ui text-xs uppercase tracking-wider text-white disabled:opacity-60"
      >
        {loading ? "Connexion…" : "Se connecter"}
      </button>
      <p className={backLinkClass}>
        <Link href="/" className="hover:underline">
          ← Retour au site
        </Link>
      </p>
    </form>
  );
}
