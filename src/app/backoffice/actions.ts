"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile, isOwner } from "@/lib/crm/auth";
import {
  extractIadExternalRef,
  isValidIadListingUrl,
  titleFromIadUrl,
} from "@/lib/crm/terrains";
import type {
  CommissionPaymentStatus,
  LeadStatus,
  PaymentStatus,
  PipelineStatus,
  TerrainStatus,
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
  const iban = String(formData.get("iban") ?? "").trim();
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
      iban,
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

  // Store optional financial data after user creation
  if (data.id && iban) {
    await supabase.from("profiles").update({ iban }).eq("id", data.id);
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
  const iban = String(formData.get("iban") ?? "");
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
      iban: iban || null,
      role,
      commission_rate_pct,
      active,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/backoffice/agents");
  revalidatePath(`/backoffice/agents/${id}`);
}

export async function updateBackofficePasswordAction(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ ok?: boolean; error?: string }> {
  const profile = await getCurrentProfile();
  if (!profile || !isOwner(profile)) {
    return { error: "Réservé aux propriétaires" };
  }

  const id = String(formData.get("id") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("password_confirm") ?? "");

  if (!id) {
    return { error: "Compte introuvable" };
  }
  if (password.length < 8) {
    return { error: "Mot de passe: 8 caractères minimum" };
  }
  if (password !== passwordConfirm) {
    return { error: "Les mots de passe ne correspondent pas" };
  }

  const supabase = await createClient();
  const { data: target, error: targetError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (targetError || !target) {
    return { error: "Compte introuvable" };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) {
    return { error: "Session expirée — reconnectez-vous" };
  }

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createAdminClient } = await import("@/lib/supabase/admin");
      const admin = createAdminClient();
      const { error } = await admin.auth.admin.updateUserById(id, { password });
      if (error) {
        return { error: error.message };
      }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Mise à jour impossible" };
    }
    revalidatePath(`/backoffice/agents/${id}`);
    revalidatePath("/backoffice/agents");
    return { ok: true };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    return { error: "Configuration Supabase manquante" };
  }

  const res = await fetch(`${baseUrl}/functions/v1/update-backoffice-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, password }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
  };

  if (!res.ok || !data.ok) {
    return { error: data.error || `Mise à jour impossible (${res.status})` };
  }

  revalidatePath(`/backoffice/agents/${id}`);
  revalidatePath("/backoffice/agents");
  return { ok: true };
}

export async function deleteBackofficeUserAction(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ ok?: boolean; error?: string }> {
  const profile = await getCurrentProfile();
  if (!profile || !isOwner(profile)) {
    return { error: "Réservé aux propriétaires" };
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { error: "Compte introuvable" };
  }
  if (id === profile.id) {
    return { error: "Vous ne pouvez pas supprimer votre propre compte" };
  }

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) {
    return { error: "Session expirée — reconnectez-vous" };
  }

  // Prefer service role when available (Netlify / local)
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createAdminClient } = await import("@/lib/supabase/admin");
      const admin = createAdminClient();
      const { error } = await admin.auth.admin.deleteUser(id);
      if (error) {
        return { error: error.message };
      }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Suppression impossible" };
    }
    revalidatePath("/backoffice/agents");
    revalidatePath("/backoffice");
    redirect("/backoffice/agents");
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    return { error: "Configuration Supabase manquante" };
  }

  const res = await fetch(`${baseUrl}/functions/v1/delete-backoffice-user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
  };

  if (!res.ok || !data.ok) {
    return { error: data.error || `Suppression impossible (${res.status})` };
  }

  revalidatePath("/backoffice/agents");
  revalidatePath("/backoffice");
  redirect("/backoffice/agents");
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

export async function deleteMailingListAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) throw new Error("Réservé aux propriétaires");

  const listId = String(formData.get("list_id") ?? "").trim();
  if (!listId) throw new Error("Liste introuvable");

  const supabase = await createClient();
  const { error } = await supabase.from("mailing_lists").delete().eq("id", listId);
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

export async function createTerrainAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Non authentifié");

  const listing_url = String(formData.get("listing_url") ?? "").trim();
  const titleRaw = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const areaRaw = String(formData.get("area_m2") ?? "").trim();
  const priceRaw = String(formData.get("price_ttc") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!isValidIadListingUrl(listing_url)) {
    throw new Error("Lien IAD invalide — utilisez une URL iadportugal.pt");
  }

  const external_ref = extractIadExternalRef(listing_url);
  const title = titleRaw || titleFromIadUrl(listing_url) || "Terreno IAD";
  if (!location) throw new Error("Localisation requise");

  const area_m2 = areaRaw ? Number(areaRaw.replace(",", ".")) : null;
  const price_ttc = priceRaw ? Number(priceRaw.replace(",", ".").replace(/\s/g, "")) : null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("terrains")
    .insert({
      created_by: profile.id,
      listing_url,
      external_ref,
      title,
      location,
      area_m2: Number.isFinite(area_m2 as number) ? area_m2 : null,
      price_ttc: Number.isFinite(price_ttc as number) ? price_ttc : null,
      image_url: image_url || null,
      description: description || null,
      status: "published",
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("Cet annonce IAD est déjà enregistrée");
    }
    throw new Error(error.message);
  }

  revalidatePath("/backoffice/terrains");
  revalidatePath("/terrains");
  redirect(`/backoffice/terrains/${data.id}`);
}

export async function updateTerrainAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Non authentifié");

  const id = String(formData.get("id") ?? "");
  const listing_url = String(formData.get("listing_url") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const areaRaw = String(formData.get("area_m2") ?? "").trim();
  const priceRaw = String(formData.get("price_ttc") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const status = String(formData.get("status") ?? "published") as TerrainStatus;

  if (!id) throw new Error("Terrain introuvable");
  if (!isValidIadListingUrl(listing_url)) {
    throw new Error("Lien IAD invalide — utilisez une URL iadportugal.pt");
  }
  if (!title || !location) throw new Error("Titre et localisation requis");
  if (!["published", "archived"].includes(status)) {
    throw new Error("Statut invalide");
  }

  const area_m2 = areaRaw ? Number(areaRaw.replace(",", ".")) : null;
  const price_ttc = priceRaw ? Number(priceRaw.replace(",", ".").replace(/\s/g, "")) : null;

  const supabase = await createClient();
  const { error } = await supabase
    .from("terrains")
    .update({
      listing_url,
      external_ref: extractIadExternalRef(listing_url),
      title,
      location,
      area_m2: Number.isFinite(area_m2 as number) ? area_m2 : null,
      price_ttc: Number.isFinite(price_ttc as number) ? price_ttc : null,
      image_url: image_url || null,
      description: description || null,
      status,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      throw new Error("Cet annonce IAD est déjà enregistrée");
    }
    throw new Error(error.message);
  }

  revalidatePath("/backoffice/terrains");
  revalidatePath(`/backoffice/terrains/${id}`);
  revalidatePath("/terrains");
}

export async function createGalleryItemAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) throw new Error("Réservé aux propriétaires");

  const title = String(formData.get("title") ?? "").trim();
  const published =
    formData.get("published") === "on" || formData.get("published") === "true";
  const media_url = String(formData.get("media_url") ?? "").trim();
  const media_type_raw = String(formData.get("media_type") ?? "image").trim();
  let media_type: "image" | "video" =
    media_type_raw === "video" ? "video" : "image";

  if (!media_url) throw new Error("Ajoutez un fichier ou une URL");

  const lower = media_url.toLowerCase();
  if (media_type === "image" && /\.(mp4|webm|mov)(\?|$)/.test(lower)) {
    media_type = "video";
  }

  const supabase = await createClient();
  const { data: maxRow } = await supabase
    .from("gallery_items")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const sort_order = (maxRow?.sort_order ?? 0) + 10;

  const { error } = await supabase.from("gallery_items").insert({
    title: title || (media_type === "video" ? "Vidéo" : "Photo"),
    media_type,
    media_url,
    sort_order,
    published,
    created_by: profile!.id,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/backoffice/galerie");
  revalidatePath("/galerie");
}

export async function updateGalleryItemAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) throw new Error("Réservé aux propriétaires");

  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Élément introuvable");

  const title = String(formData.get("title") ?? "").trim();
  const sort_order = Number(formData.get("sort_order") ?? 0);
  const published =
    formData.get("published") === "on" || formData.get("published") === "true";

  const supabase = await createClient();
  const { error } = await supabase
    .from("gallery_items")
    .update({
      title,
      sort_order: Number.isFinite(sort_order) ? sort_order : 0,
      published,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/backoffice/galerie");
  revalidatePath("/galerie");
}

export async function moveGalleryItemAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) throw new Error("Réservé aux propriétaires");

  const id = String(formData.get("id") ?? "").trim();
  const direction = String(formData.get("direction") ?? "").trim();
  if (!id || (direction !== "up" && direction !== "down")) {
    throw new Error("Paramètres invalides");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("id, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  const rows = data ?? [];
  const index = rows.findIndex((row) => row.id === id);
  if (index < 0) throw new Error("Élément introuvable");

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= rows.length) return;

  const current = rows[index];
  const neighbor = rows[swapIndex];
  const currentOrder = current.sort_order;
  const neighborOrder = neighbor.sort_order;

  // If equal, force distinct values so swap is visible
  const nextCurrent = neighborOrder === currentOrder ? neighborOrder + (direction === "up" ? -1 : 1) : neighborOrder;
  const nextNeighbor = neighborOrder === currentOrder ? currentOrder : currentOrder;

  const { error: errA } = await supabase
    .from("gallery_items")
    .update({ sort_order: nextCurrent })
    .eq("id", current.id);
  if (errA) throw new Error(errA.message);

  const { error: errB } = await supabase
    .from("gallery_items")
    .update({ sort_order: nextNeighbor })
    .eq("id", neighbor.id);
  if (errB) throw new Error(errB.message);

  revalidatePath("/backoffice/galerie");
  revalidatePath("/galerie");
}

export async function deleteGalleryItemAction(formData: FormData) {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) throw new Error("Réservé aux propriétaires");

  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Élément introuvable");

  const supabase = await createClient();
  const { data: row } = await supabase
    .from("gallery_items")
    .select("media_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) throw new Error(error.message);

  // Best-effort: remove from storage if URL belongs to gallery bucket
  const url = row?.media_url as string | undefined;
  if (url?.includes("/storage/v1/object/public/gallery/")) {
    const path = url.split("/storage/v1/object/public/gallery/")[1];
    if (path) {
      await supabase.storage.from("gallery").remove([decodeURIComponent(path)]);
    }
  }

  revalidatePath("/backoffice/galerie");
  revalidatePath("/galerie");
}

export async function importStaticGalleryAction() {
  const profile = await getCurrentProfile();
  if (!isOwner(profile)) throw new Error("Réservé aux propriétaires");

  const supabase = await createClient();
  const { data: existing, error: existingError } = await supabase
    .from("gallery_items")
    .select("media_url, sort_order");
  if (existingError) throw new Error(existingError.message);

  const existingUrls = new Set((existing ?? []).map((row) => row.media_url));
  const maxOrder = (existing ?? []).reduce(
    (max, row) => Math.max(max, row.sort_order ?? 0),
    0,
  );

  const rows = Array.from({ length: 49 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      title: `Module ${n}`,
      media_type: "image" as const,
      media_url: `/galerie/g${n}.jpg`,
      sort_order: maxOrder + (i + 1) * 10,
      published: true,
      created_by: profile!.id,
    };
  }).filter((row) => !existingUrls.has(row.media_url));

  if (rows.length === 0) {
    throw new Error("Toutes les photos g01–g49 sont déjà importées");
  }

  const { error } = await supabase.from("gallery_items").insert(rows);
  if (error) throw new Error(error.message);

  revalidatePath("/backoffice/galerie");
  revalidatePath("/galerie");
  redirect("/backoffice/galerie");
}
