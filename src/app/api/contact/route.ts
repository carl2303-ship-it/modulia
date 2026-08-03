import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { CONTACT_EMAIL } from "@/data/company";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  model?: string;
  message?: string;
};

function getRecipient(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || CONTACT_EMAIL;
}

async function sendContactEmail(payload: Required<Pick<ContactPayload, "name" | "email">> & ContactPayload) {
  const to = getRecipient();
  const subject = payload.model
    ? `Modulia — Nouveau contact · ${payload.model}`
    : "Modulia — Nouveau contact";

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const from = process.env.RESEND_FROM_EMAIL?.trim() || "Modulia <onboarding@resend.dev>";
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
        text: [
          `Nom: ${payload.name}`,
          `Email: ${payload.email}`,
          payload.phone ? `Téléphone: ${payload.phone}` : null,
          payload.model ? `Modèle: ${payload.model}` : null,
          "",
          payload.message || "(sans message)",
        ]
          .filter((line) => line !== null)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      throw new Error(`Resend error: ${detail}`);
    }
    return;
  }

  // Fallback sans clé API — FormSubmit (activer une fois via le mail de confirmation)
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || "",
      model: payload.model || "",
      message: payload.message || "",
      _subject: subject,
      _template: "table",
      _replyto: payload.email,
      _captcha: "false",
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`FormSubmit error: ${detail}`);
  }
}

async function saveToSupabase(payload: ContactPayload) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return;

  const supabase = createClient(url, key);
  const { error } = await supabase.from("contact_requests").insert({
    name: payload.name,
    email: payload.email,
    phone: payload.phone || null,
    model: payload.model || null,
    message: payload.message || null,
  });

  // Table absente → ignorer; autres erreurs → log
  if (error && error.code !== "42P01" && !error.message.includes("does not exist")) {
    console.error("contact_requests insert:", error.message);
  }
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

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const payload = { name, email, phone, model, message };

  try {
    await sendContactEmail(payload);
  } catch (err) {
    console.error("contact email failed:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }

  await saveToSupabase(payload);

  return NextResponse.json({ ok: true, to: getRecipient() });
}
