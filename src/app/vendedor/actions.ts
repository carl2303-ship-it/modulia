"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import { EDITABLE_PIPELINE_STATUSES } from "@/lib/crm/parse-order-configuration";
import { roleToSource } from "@/lib/crm/types";

export type SubmitReservationResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

type ReservationFields = {
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  clientStreet: string;
  clientPostalCode: string;
  clientCity: string;
  clientAddress: string | null;
  marketingOptIn: boolean;
  modelName: string | null;
  configurationJson: string | null;
  priceTtcRaw: number;
  notes: string | null;
};

function readReservationFields(formData: FormData): ReservationFields {
  const clientName = String(formData.get("client_name") ?? "").trim();
  const clientEmail = String(formData.get("client_email") ?? "").trim();
  const clientPhone = String(formData.get("client_phone") ?? "").trim() || null;
  const clientStreet = String(formData.get("client_street") ?? "").trim();
  const clientPostalCode = String(formData.get("client_postal_code") ?? "").trim();
  const clientCity = String(formData.get("client_city") ?? "").trim();
  const clientAddress =
    [clientStreet, clientPostalCode, clientCity].filter(Boolean).join(", ") || null;

  return {
    clientName,
    clientEmail,
    clientPhone,
    clientStreet,
    clientPostalCode,
    clientCity,
    clientAddress,
    marketingOptIn: formData.get("marketing_opt_in") === "on",
    modelName: String(formData.get("model_name") ?? "").trim() || null,
    configurationJson: String(formData.get("configuration") ?? "").trim() || null,
    priceTtcRaw: Number(formData.get("price_ttc") ?? 0),
    notes: String(formData.get("notes") ?? "").trim() || null,
  };
}

async function upsertCustomer(
  supabase: Awaited<ReturnType<typeof createClient>>,
  profileId: string,
  fields: ReservationFields,
): Promise<{ customerId: string } | { error: string }> {
  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .ilike("email", fields.clientEmail)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("customers")
      .update({
        name: fields.clientName,
        phone: fields.clientPhone,
        address: fields.clientAddress,
        marketing_opt_in: fields.marketingOptIn,
      })
      .eq("id", existing.id);
    return { customerId: existing.id };
  }

  const { data: created, error: custError } = await supabase
    .from("customers")
    .insert({
      name: fields.clientName,
      email: fields.clientEmail,
      phone: fields.clientPhone,
      address: fields.clientAddress,
      marketing_opt_in: fields.marketingOptIn,
      created_by: profileId,
    })
    .select("id")
    .single();

  if (custError || !created) {
    return { error: custError?.message ?? "Impossible de créer le client." };
  }

  return { customerId: created.id };
}

async function refreshCommission(
  supabase: Awaited<ReturnType<typeof createClient>>,
  orderId: string,
  priceTtc: number,
) {
  const { data: commission } = await supabase
    .from("commission_entries")
    .select("id, rate_pct")
    .eq("order_id", orderId)
    .maybeSingle();

  if (!commission) return;

  const amount = Math.round((priceTtc * Number(commission.rate_pct)) / 100);
  await supabase
    .from("commission_entries")
    .update({ base_ttc: priceTtc, amount })
    .eq("id", commission.id);
}

export async function submitReservationAction(
  formData: FormData,
): Promise<SubmitReservationResult> {
  const profile = await getCurrentProfile();
  if (!profile || !profile.active) {
    redirect("/login?next=/vendedor/configurar");
  }

  const fields = readReservationFields(formData);
  if (!fields.clientName || !fields.clientEmail || !fields.clientPhone) {
    return { success: false, error: "Nom, email et téléphone du client sont requis." };
  }

  const supabase = await createClient();
  const customerResult = await upsertCustomer(supabase, profile.id, fields);
  if ("error" in customerResult) {
    return { success: false, error: customerResult.error };
  }

  const source = roleToSource(profile.role);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customerResult.customerId,
      assigned_to: profile.id,
      source,
      pipeline_status: "pending",
      payment_status: "unpaid",
      model: fields.modelName,
      configuration: fields.configurationJson,
      price_ttc: fields.priceTtcRaw,
      amount_paid: 0,
      delivery_name: fields.clientName,
      delivery_email: fields.clientEmail,
      delivery_phone: fields.clientPhone,
      delivery_street: fields.clientStreet || null,
      delivery_postal_code: fields.clientPostalCode || null,
      delivery_city: fields.clientCity || null,
      notes: fields.notes,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    return { success: false, error: orderError?.message ?? "Impossible de créer la commande." };
  }

  if (profile.commission_rate_pct > 0 && fields.priceTtcRaw > 0) {
    const amount = Math.round((fields.priceTtcRaw * profile.commission_rate_pct) / 100);
    await supabase.from("commission_entries").insert({
      order_id: order.id,
      agent_id: profile.id,
      rate_pct: profile.commission_rate_pct,
      base_ttc: fields.priceTtcRaw,
      amount,
      payment_status: "a_pagar",
    });
  }

  return { success: true, orderId: order.id };
}

export async function updateReservationAction(
  formData: FormData,
): Promise<SubmitReservationResult> {
  const profile = await getCurrentProfile();
  if (!profile || !profile.active) {
    redirect("/login?next=/vendedor/configurar");
  }

  const orderId = String(formData.get("order_id") ?? "").trim();
  if (!orderId) {
    return { success: false, error: "Commande introuvable." };
  }

  const fields = readReservationFields(formData);
  if (!fields.clientName || !fields.clientEmail || !fields.clientPhone) {
    return { success: false, error: "Nom, email et téléphone du client sont requis." };
  }

  const supabase = await createClient();
  const { data: existingOrder, error: fetchError } = await supabase
    .from("orders")
    .select("id, assigned_to, pipeline_status")
    .eq("id", orderId)
    .maybeSingle();

  if (fetchError || !existingOrder) {
    return { success: false, error: "Commande introuvable." };
  }

  const owner = isOwner(profile);
  const assignedTo = existingOrder.assigned_to as string | null;
  const pipelineStatus = existingOrder.pipeline_status as string;

  if (!owner && assignedTo !== profile.id) {
    return { success: false, error: "Vous ne pouvez pas modifier cette commande." };
  }

  if (!EDITABLE_PIPELINE_STATUSES.includes(pipelineStatus as (typeof EDITABLE_PIPELINE_STATUSES)[number])) {
    return {
      success: false,
      error: "Cette commande ne peut plus être modifiée (production ou installation en cours).",
    };
  }

  const customerResult = await upsertCustomer(supabase, profile.id, fields);
  if ("error" in customerResult) {
    return { success: false, error: customerResult.error };
  }

  const { error: orderError } = await supabase
    .from("orders")
    .update({
      customer_id: customerResult.customerId,
      model: fields.modelName,
      configuration: fields.configurationJson,
      price_ttc: fields.priceTtcRaw,
      delivery_name: fields.clientName,
      delivery_email: fields.clientEmail,
      delivery_phone: fields.clientPhone,
      delivery_street: fields.clientStreet || null,
      delivery_postal_code: fields.clientPostalCode || null,
      delivery_city: fields.clientCity || null,
      notes: fields.notes,
    })
    .eq("id", orderId);

  if (orderError) {
    return { success: false, error: orderError.message };
  }

  await refreshCommission(supabase, orderId, fields.priceTtcRaw);

  revalidatePath("/backoffice/orders");
  revalidatePath(`/backoffice/orders/${orderId}`);
  revalidatePath("/backoffice/commissions");
  revalidatePath("/backoffice");

  return { success: true, orderId };
}
