"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AgentAttributionBanner() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || !mounted) {
        setLabel(null);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, email, role")
        .eq("id", user.id)
        .maybeSingle();
      if (!mounted || !profile) return;
      setLabel(profile.full_name || profile.email);
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (!label) return null;

  return (
    <p className="rounded-xl border border-luxury-forest/20 bg-luxury-forest/5 px-3 py-2 font-ui text-xs text-luxury-forest">
      Demande associée à <strong>{label}</strong> — origine enregistrée automatiquement.
    </p>
  );
}
