export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  model?: string;
  message?: string;
};

/**
 * Envia o pedido via Netlify Forms (notificação e-mail no dashboard Netlify)
 * e via /api/contact (Supabase + Resend opcional).
 */
export async function submitContactRequest(payload: ContactPayload): Promise<void> {
  const netlifyBody = new URLSearchParams({
    "form-name": "contact",
    name: payload.name,
    email: payload.email,
    phone: payload.phone ?? "",
    model: payload.model ?? "",
    message: payload.message ?? "",
  });

  const [netlifyRes, apiRes] = await Promise.all([
    fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: netlifyBody.toString(),
    }),
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  ]);

  // Sucesso se pelo menos um canal funcionar
  if (!netlifyRes.ok && !apiRes.ok) {
    throw new Error("Contact submission failed");
  }
}
