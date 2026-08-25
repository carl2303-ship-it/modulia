"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type OwnerLeadAlertsProps = {
  enabled: boolean;
};

type IncomingLead = {
  id: string;
  name: string | null;
  model: string | null;
};

export function OwnerLeadAlerts({ enabled }: OwnerLeadAlertsProps) {
  const [lastLead, setLastLead] = useState<IncomingLead | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(
    typeof window !== "undefined" && "Notification" in window
      ? Notification.permission
      : "unsupported",
  );

  const canAskPermission = useMemo(
    () => permission !== "unsupported" && permission !== "granted",
    [permission],
  );

  useEffect(() => {
    if (!enabled) return;

    const supabase = createClient();
    const channel = supabase
      .channel("owner-leads-alerts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          const lead = payload.new as { id?: string; name?: string | null; model?: string | null };
          if (!lead?.id) return;

          const incoming: IncomingLead = {
            id: lead.id,
            name: lead.name ?? null,
            model: lead.model ?? null,
          };

          setLastLead(incoming);

          if ("Notification" in window && Notification.permission === "granted") {
            const title = "Nouveau lead Modulia";
            const body = `${incoming.name || "Client"}${incoming.model ? ` · ${incoming.model}` : ""}`;
            const n = new Notification(title, {
              body,
              tag: `lead-${incoming.id}`,
            });
            n.onclick = () => {
              window.focus();
              window.location.href = `/backoffice/leads/${incoming.id}`;
            };
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [enabled]);

  async function requestPermission() {
    if (!("Notification" in window)) {
      setPermission("unsupported");
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
  }

  if (!enabled) return null;

  return (
    <div className="mb-4 space-y-2 rounded-xl border border-luxury-stone bg-white p-3">
      <p className="font-ui text-[11px] uppercase tracking-wider text-luxury-muted">
        Alertes leads (owner)
      </p>

      {canAskPermission && (
        <button
          type="button"
          onClick={requestPermission}
          className="rounded-full border border-luxury-forest px-3 py-1.5 font-ui text-[11px] uppercase tracking-wider text-luxury-forest hover:bg-luxury-forest/5"
        >
          Activer les notifications navigateur
        </button>
      )}

      {permission === "unsupported" && (
        <p className="font-ui text-xs text-luxury-muted">
          Notifications non supportées sur ce navigateur/appareil.
        </p>
      )}

      {permission === "granted" && (
        <p className="font-ui text-xs text-luxury-muted">
          Notifications actives. Vous recevrez un popup à chaque nouveau lead.
        </p>
      )}

      {lastLead && (
        <div className="rounded-lg bg-luxury-forest/10 px-3 py-2">
          <p className="font-ui text-xs text-luxury-graphite">
            Nouveau lead: <strong>{lastLead.name || "Client"}</strong>
            {lastLead.model ? ` · ${lastLead.model}` : ""}
          </p>
          <Link
            href={`/backoffice/leads/${lastLead.id}`}
            className="mt-1 inline-block font-ui text-[11px] uppercase tracking-wider text-luxury-forest hover:underline"
          >
            Ouvrir le lead
          </Link>
        </div>
      )}
    </div>
  );
}

