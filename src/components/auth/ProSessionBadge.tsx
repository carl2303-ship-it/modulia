"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ProUser = {
  email: string;
  fullName: string;
};

export function ProSessionBadge() {
  const [user, setUser] = useState<ProUser | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function load() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (!authUser || !mounted) {
        setUser(null);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", authUser.id)
        .maybeSingle();
      if (!mounted) return;
      setUser({
        email: profile?.email || authUser.email || "",
        fullName: profile?.full_name || authUser.email || "Pro",
      });
    }

    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      load();
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (user) {
    return (
      <Link
        href="/backoffice"
        className="hidden whitespace-nowrap rounded-full border border-luxury-forest/30 bg-luxury-forest/5 px-3 py-1.5 font-ui text-[11px] font-medium text-luxury-forest transition hover:bg-luxury-forest/10 sm:inline-flex"
        title={user.email}
      >
        {user.fullName.split(" ")[0]} · CRM
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="hidden whitespace-nowrap font-ui text-[11px] font-medium tracking-wide text-black/60 transition hover:text-black sm:inline-flex"
    >
      Espace pro
    </Link>
  );
}
