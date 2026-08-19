"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/crm/auth";
import { roleToSource } from "@/lib/crm/types";

export type SubmitReservationResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

export async function submitReservationAction(
  formData: FormData,
): Promise<SubmitReservationResult> {
  const profile = await getCurrentProfile();
  if (!profile || !profile.active) {
    redirect("/login?next=/vendedor/configurar");
  }

  const clientName = String(formData.get("client_name") ?? "").trim();
  const clientEmail = String(formData.get("client_email") ?? "").trim();
  const clientPhone = String(formData.get("client_phone") ?? "").trim() || null;
  const clientStreet = String(formData.get("client_street") ?? "").trim();
  const clientPostalCode = String(formData.get("client_postal_code") ?? "").trim();
  const clientCity = String(formData.get("client_city") ?? "").trim();
  const clientAddress =
    [clientStreet, clientPostalCode, clientCity].filter(Boolean).join(", ") || null;
  const marketingOptIn = formData.get("marketing_opt_in") === "on";
  const modelName = String(formData.get("model_name") ?? "").trim() || null;
  const configurationJson = String(formData.get("configuration") ?? "").trim() || null;
  const priceTtcRaw = Number(formData.get("price_ttc") ?? 0);
  const notes = String(formData.get("notes") ?? "").trim() || null;

  if (!clientName || !clientEmail || !clientPhone) {
    return { success: false, error: "Nom, email et téléphone du client sont requis." };
  }

  const supabase = await createClient();

  // Upsert customer by email
  let customerId: string;
  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .ilike("email", clientEmail)
    .maybeSingle();

  if (existing) {
    customerId = existing.id;
    await supabase
      .from("customers")
      .update({
        name: clientName,
        phone: clientPhone,
        address: clientAddress,
        marketing_opt_in: marketingOptIn,
      })
      .eq("id", existing.id);
  } else {
    const { data: created, error: custError } = await supabase
      .from("customers")
      .insert({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        address: clientAddress,
        marketing_opt_in: marketingOptIn,
        created_by: profile.id,
      })
      .select("id")
      .single();

    if (custError || !created) {
      return { success: false, error: custError?.message ?? "Impossible de créer le client." };
    }
    customerId = created.id;
  }

  const source = roleToSource(profile.role);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customerId,
      assigned_to: profile.id,
      source,
      pipeline_status: "pending",
      payment_status: "unpaid",
      model: modelName,
      configuration: configurationJson,
      price_ttc: priceTtcRaw,
      amount_paid: 0,
      delivery_name: clientName,
      delivery_email: clientEmail,
      delivery_phone: clientPhone,
      delivery_street: clientStreet || null,
      delivery_postal_code: clientPostalCode || null,
      delivery_city: clientCity || null,
      notes,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return { success: false, error: orderError?.message ?? "Impossible de créer la commande." };
  }

  // Commission auto si l'agent a un taux défini
  if (profile.commission_rate_pct > 0 && priceTtcRaw > 0) {
    const amount = Math.round((priceTtcRaw * profile.commission_rate_pct) / 100);
    await supabase.from("commission_entries").insert({
      order_id: order.id,
      agent_id: profile.id,
      rate_pct: profile.commission_rate_pct,
      base_ttc: priceTtcRaw,
      amount,
      payment_status: "a_pagar",
    });
  }

  return { success: true, orderId: order.id };
}
