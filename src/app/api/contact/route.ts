import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/data/company";
import { createClient } from "@/lib/supabase/server";
import { parsePriceTtc, roleToSource, type LeadSource, type UserRole } from "@/lib/crm/types";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  model?: string;
  message?: string;
  configuration?: string;
  totalPrice?: string;
  marketingOptIn?: boolean;
};

function getRecipient(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || CONTACT_EMAIL;
}

async function sendWithResend(
  payload: Required<Pick<ContactPayload, "name" | "email">> & ContactPayload,
): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) return false;

  const to = getRecipient();
  const from = process.env.RESEND_FROM_EMAIL?.trim() || "Modulia <onboarding@resend.dev>";
  const subject = payload.model
    ? `Modulia — Nouveau contact · ${payload.model}`
    : "Modulia — Nouveau contact";

  const bodyText = [
    `Nom: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Téléphone: ${payload.phone}` : null,
    payload.model ? `Modèle: ${payload.model}` : null,
    payload.totalPrice ? `Total estimé: ${payload.totalPrice}` : null,
    "",
    payload.configuration ? `CONFIGURATION\n${payload.configuration}` : null,
    payload.configuration ? "" : null,
    payload.message ? `MESSAGE\n${payload.message}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject,
      text: bodyText || "(sans message)",
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend error: ${detail}`);
  }
  return true;
}

async function saveLead(payload: {
  name: string;
  email: string;
  phone: string;
  model: string;
  message: string;
  configuration: string;
  totalPrice: string;
  marketingOptIn: boolean;
}): Promise<{ saved: boolean; leadId?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let assignedTo: string | null = null;
  let source: LeadSource = "website";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, role, active")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.active) {
      assignedTo = profile.id;
      source = roleToSource(profile.role as UserRole);
    }
  }

  const { data: leadId, error } = await supabase.rpc("submit_public_lead", {
    p_name: payload.name,
    p_email: payload.email,
    p_phone: payload.phone || null,
    p_model: payload.model || null,
    p_message: payload.message || null,
    p_configuration: payload.configuration || null,
    p_total_price_ttc: parsePriceTtc(payload.totalPrice),
    p_source: source,
    p_assigned_to: assignedTo,
    p_marketing_opt_in: payload.marketingOptIn,
    p_created_by: assignedTo,
  });

  if (error) {
    console.error("submit_public_lead:", error.message);
    return { saved: false };
  }

  return { saved: true, leadId: leadId as string };
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const model = String(body.model ?? "").trim();
  const message = String(body.message ?? "").trim();
  const configuration = String(body.configuration ?? "").trim();
  const totalPrice = String(body.totalPrice ?? "").trim();
  const marketingOptIn = Boolean(body.marketingOptIn);

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const payload = { name, email, phone, model, message, configuration, totalPrice };

  let emailed = false;
  try {
    emailed = await sendWithResend(payload);
  } catch (err) {
    console.error("contact resend failed:", err);
  }

  const { saved, leadId } = await saveLead({ ...payload, marketingOptIn });

  return NextResponse.json({
    ok: true,
    to: getRecipient(),
    emailed,
    saved,
    leadId: leadId ?? null,
  });
}
