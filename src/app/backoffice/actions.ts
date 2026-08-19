"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import type {
  CommissionPaymentStatus,
  LeadStatus,
  PaymentStatus,
  PipelineStatus,
  UserRole,
} from "@/lib/crm/types";

export async function updateLeadAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Non authentifié");

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as LeadStatus;
  const assignedToRaw = String(formData.get("assigned_to") ?? "");
  const assigned_to = assignedToRaw === "" ? null : assignedToRaw;

  const supabase = await createClient();
  const patch: Record<string, unknown> = { status };
  if (isOwner(profile)) {
    patch.assigned_to = assigned_to;
  }

  const { error } = await supabase.from("leads").update(patch).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/backoffice/leads");
  revalidatePath(`/backoffice/leads/${id}`);
  revalidatePath("/backoffice");
}

export async function convertLeadToOrderAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Non authentifié");

  const leadId = String(formData.get("lead_id") ?? "");
  const supabase = await createClient();

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .single();
  if (leadError || !lead) throw new Error(leadError?.message || "Lead introuvable");

  let customerId = lead.customer_id as string | null;
  let customerSnapshot: {
    name: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
  } = {
    name: lead.name ?? null,
    email: lead.email ?? null,
    phone: lead.phone ?? null,
    address: null,
  };
  if (!customerId) {
    const { data: existing } = await supabase
      .from("customers")
      .select("id, name, email, phone, address")
      .ilike("email", lead.email)
      .maybeSingle();

    if (existing) {
      customerId = existing.id;
      customerSnapshot = {
        name: existing.name ?? lead.name ?? null,
        email: existing.email ?? lead.email ?? null,
        phone: existing.phone ?? lead.phone ?? null,
        address: existing.address ?? null,
      };
    } else {
      const { data: created, error: custError } = await supabase
        .from("customers")
        .insert({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          created_by: profile.id,
        })
        .select("id, name, email, phone, address")
        .single();
      if (custError || !created) throw new Error(custError?.message || "Client non créé");
      customerId = created.id;
      customerSnapshot = {
        name: created.name ?? lead.name ?? null,
        email: created.email ?? lead.email ?? null,
        phone: created.phone ?? lead.phone ?? null,
        address: created.address ?? null,
      };
    }
  } else {
    const { data: linkedCustomer } = await supabase
      .from("customers")
      .select("name, email, phone, address")
      .eq("id", customerId)
      .maybeSingle();
    if (linkedCustomer) {
      customerSnapshot = {
        name: linkedCustomer.name ?? lead.name ?? null,
        email: linkedCustomer.email ?? lead.email ?? null,
        phone: linkedCustomer.phone ?? lead.phone ?? null,
        address: linkedCustomer.address ?? null,
      };
    }
  }

  const price = Number(lead.total_price_ttc ?? 0);
  const assignedTo = (lead.assigned_to as string | null) ?? profile.id;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      lead_id: lead.id,
      customer_id: customerId,
      assigned_to: assignedTo,
      source: lead.source,
      pipeline_status: "pending",
      payment_status: "unpaid",
      model: lead.model,
      configuration: lead.configuration,
      price_ttc: price,
      amount_paid: 0,
      delivery_name: customerSnapshot.name,
      delivery_email: customerSnapshot.email,
      delivery_phone: customerSnapshot.phone,
      delivery_street: customerSnapshot.address,
      delivery_postal_code: null,
      delivery_city: null,
      notes: lead.message,
    })
    .select("id")
    .single();

  if (orderError || !order) throw new Error(orderError?.message || "Commande non créée");

  await supabase
    .from("leads")
    .update({ status: "converted", customer_id: customerId })
    .eq("id", lead.id);

  // Snapshot commission if assignee has a rate
  const { data: agent } = await supabase
    .from("profiles")
    .select("id, commission_rate_pct, role")
    .eq("id", assignedTo)
    .maybeSingle();

  if (agent && Number(agent.commission_rate_pct) > 0) {
    const rate = Number(agent.commission_rate_pct);
    const amount = Math.round((price * rate) / 100);
    await supabase.from("commission_entries").upsert(
      {
        order_id: order.id,
        agent_id: agent.id,
        rate_pct: rate,
        base_ttc: price,
        amount,
        payment_status: "a_pagar",
      },
      { onConflict: "order_id,agent_id" },
    );
  }

  revalidatePath("/backoffice/leads");
  revalidatePath("/backoffice/orders");
  revalidatePath("/backoffice/commissions");
  revalidatePath("/backoffice");
}

export async function updateOrderAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Non authentifié");

  const id = String(formData.get("id") ?? "");
  const pipeline_status = String(formData.get("pipeline_status") ?? "") as PipelineStatus;
  const payment_status = String(formData.get("payment_status") ?? "") as PaymentStatus;
  const price_ttc = Number(formData.get("price_ttc") ?? 0);
  const amount_paid = Number(formData.get("amount_paid") ?? 0);
  const notes = String(formData.get("notes") ?? "");
  const delivery_name = String(formData.get("delivery_name") ?? "").trim();
  const delivery_email = String(formData.get("delivery_email") ?? "").trim();
  const delivery_phone = String(formData.get("delivery_phone") ?? "").trim();
  const delivery_street = String(formData.get("delivery_street") ?? "").trim();
  const delivery_postal_code = String(formData.get("delivery_postal_code") ?? "").trim();
  const delivery_city = String(formData.get("delivery_city") ?? "").trim();
  const assignedToRaw = String(formData.get("assigned_to") ?? "");

  const supabase = await createClient();
  const patch: Record<string, unknown> = {
    pipeline_status,
    payment_status,
    price_ttc,
    amount_paid,
    notes: notes || null,
    delivery_name: delivery_name || null,
    delivery_email: delivery_email || null,
    delivery_phone: delivery_phone || null,
    delivery_street: delivery_street || null,
    delivery_postal_code: delivery_postal_code || null,
    delivery_city: delivery_city || null,
  };
  if (isOwner(profile) && assignedToRaw !== undefined) {
    patch.assigned_to = assignedToRaw === "" ? null : assignedToRaw;
  }

  const { error } = await supabase.from("orders").update(patch).eq("id", id);
  if (error) throw new Error(error.message);

  // Refresh commission amount if price changed
  const { data: commission } = await supabase
    .from("commission_entries")
    .select("id, rate_pct")
    .eq("order_id", id)
    .maybeSingle();

  if (commission) {
    const amount = Math.round((price_ttc * Number(commission.rate_pct)) / 100);
    await supabase
      .from("commission_entries")
      .update({ base_ttc: price_ttc, amount })
      .eq("id", commission.id);
  }

  revalidatePath("/backoffice/orders");
  revalidatePath(`/backoffice/orders/${id}`);
  revalidatePath("/backoffice/commissions");
  revalidatePath("/backoffice");
}

export async function updateCommissionPaymentAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) throw new Error("Réservé aux propriétaires");

  const id = String(formData.get("id") ?? "");
  const payment_status = String(formData.get("payment_status") ?? "") as CommissionPaymentStatus;

  const supabase = await createClient();
  const { error } = await supabase
    .from("commission_entries")
    .update({
      payment_status,
      paid_at: payment_status === "pago" ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/backoffice/commissions");
  revalidatePath("/backoffice");
}

export async function createBackofficeUserAction(
  _prev: { ok?: boolean; error?: string; id?: string } | null,
  formData: FormData,
): Promise<{ ok?: boolean; error?: string; id?: string }> {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) {
    return { error: "Réservé aux propriétaires" };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const full_name = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const agency = String(formData.get("agency") ?? "").trim();
  const role = String(formData.get("role") ?? "agent") as UserRole;
  const commission_rate_pct = Number(formData.get("commission_rate_pct") ?? 0);

  if (!email || !password) {
    return { error: "Email et mot de passe requis" };
  }
  if (password.length < 8) {
    return { error: "Mot de passe: 8 caractères minimum" };
  }
  if (!["owner", "showroom", "agent"].includes(role)) {
    return { error: "Rôle invalide" };
  }

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) {
    return { error: "Session expirée — reconnectez-vous" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    return { error: "Configuration Supabase manquante" };
  }

  const res = await fetch(`${baseUrl}/functions/v1/create-backoffice-user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      full_name,
      phone,
      agency,
      role,
      commission_rate_pct,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    id?: string;
  };

  if (!res.ok || !data.ok) {
    return { error: data.error || `Création impossible (${res.status})` };
  }

  revalidatePath("/backoffice/agents");
  revalidatePath("/backoffice");
  return { ok: true, id: data.id };
}

export async function updateAgentAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) throw new Error("Réservé aux propriétaires");

  const id = String(formData.get("id") ?? "");
  const full_name = String(formData.get("full_name") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const agency = String(formData.get("agency") ?? "");
  const role = String(formData.get("role") ?? "agent") as UserRole;
  const commission_rate_pct = Number(formData.get("commission_rate_pct") ?? 0);
  const active = formData.get("active") === "on" || formData.get("active") === "true";

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name,
      phone: phone || null,
      agency: agency || null,
      role,
      commission_rate_pct,
      active,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/backoffice/agents");
  revalidatePath(`/backoffice/agents/${id}`);
}

export async function updateCustomerAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Non authentifié");

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const address = String(formData.get("address") ?? "");
  const notes = String(formData.get("notes") ?? "");
  const marketing_opt_in =
    formData.get("marketing_opt_in") === "on" || formData.get("marketing_opt_in") === "true";

  const supabase = await createClient();
  const { error } = await supabase
    .from("customers")
    .update({
      name,
      email,
      phone: phone || null,
      address: address || null,
      notes: notes || null,
      marketing_opt_in,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/backoffice/customers");
  revalidatePath(`/backoffice/customers/${id}`);
  revalidatePath("/backoffice/mailing");
}

export async function createMailingListAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) throw new Error("Réservé aux propriétaires");

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!name) throw new Error("Nom requis");

  const supabase = await createClient();
  const { error } = await supabase.from("mailing_lists").insert({
    name,
    description: description || null,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/backoffice/mailing");
}

export async function syncOptInToMailingListAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) throw new Error("Réservé aux propriétaires");

  const listId = String(formData.get("list_id") ?? "");
  const supabase = await createClient();

  const { data: customers } = await supabase
    .from("customers")
    .select("id")
    .eq("marketing_opt_in", true);

  if (customers?.length) {
    const rows = customers.map((c) => ({ list_id: listId, customer_id: c.id }));
    const { error } = await supabase
      .from("mailing_list_members")
      .upsert(rows, { onConflict: "list_id,customer_id" });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/backoffice/mailing");
}
