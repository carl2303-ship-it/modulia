import { CONTACT_EMAIL } from "@/data/company";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  model?: string;
  message?: string;
};

type FormSubmitResponse = {
  success?: string | boolean;
  message?: string;
};

/**
 * Envia o e-mail via FormSubmit (browser → contact@moduliahome.com)
 * e grava o pedido em /api/contact (Supabase + Resend opcional).
 */
export async function submitContactRequest(payload: ContactPayload): Promise<void> {
  const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || CONTACT_EMAIL;
  const subject = payload.model
    ? `Modulia — Nouveau contact · ${payload.model}`
    : "Modulia — Nouveau contact";

  const emailPromise = fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? "",
      model: payload.model ?? "",
      message: payload.message ?? "",
      _subject: subject,
      _template: "table",
      _replyto: payload.email,
      _captcha: "false",
    }),
  }).then(async (res) => {
    const data = (await res.json().catch(() => ({}))) as FormSubmitResponse;
    return { res, data };
  });

  const apiPromise = fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const [emailResult, apiRes] = await Promise.all([emailPromise, apiPromise]);

  const successFlag = emailResult.data.success;
  const emailAccepted =
    emailResult.res.ok &&
    (successFlag === true || successFlag === "true" || successFlag === undefined);

  const msg = String(emailResult.data.message ?? "").toLowerCase();
  const activationPending =
    msg.includes("activat") || msg.includes("confirm") || msg.includes("verif");

  // E-mail ok, ou ativação pendente + API ok, ou só API (Resend no servidor)
  if (emailAccepted || activationPending || apiRes.ok) {
    return;
  }

  throw new Error(
    emailResult.data.message || `Contact submission failed (${emailResult.res.status}/${apiRes.status})`,
  );
}
