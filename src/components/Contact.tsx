"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { CONTACT_EMAIL, CONTACT_PHONES, SHOWROOM } from "@/data/company";
import { MODELS_PARTICULIERS } from "@/data/models";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      model: String(formData.get("model") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_requests").insert(payload);

      if (error) {
        if (error.code === "42P01" || error.message.includes("does not exist")) {
          setStatus("success");
          setMessage("Demande reçue ! Nous vous contacterons très prochainement.");
          form.reset();
          return;
        }
        throw error;
      }

      setStatus("success");
      setMessage("Merci ! Nous avons bien reçu votre demande et vous contacterons très prochainement.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Envoi impossible. Veuillez réessayer ou nous contacter par e-mail.");
    }
  }

  return (
    <section id="contact" className="border-t border-modulia-100 bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-modulia-950 sm:text-4xl">
            Demandez votre devis
          </h2>
          <p className="mt-4 text-lg text-modulia-700">
            Parlez-nous de votre projet. Notre équipe vous répond sous 48 heures
            avec une proposition personnalisée.
          </p>
          <dl className="mt-10 space-y-4 text-sm text-modulia-700">
            <div>
              <dt className="font-semibold text-modulia-900">E-mail</dt>
              <dd>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-modulia-700 hover:text-modulia-900 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-modulia-900">Téléphone</dt>
              <dd className="space-y-1">
                {CONTACT_PHONES.map((phone) => (
                  <div key={phone.tel}>
                    <span className="text-modulia-500">{phone.label} — </span>
                    <a
                      href={`tel:${phone.tel}`}
                      className="text-modulia-700 hover:text-modulia-900 hover:underline"
                    >
                      {phone.display}
                    </a>
                  </div>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-modulia-900">{SHOWROOM.title}</dt>
              <dd>
                <address className="not-italic">
                  {SHOWROOM.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={SHOWROOM.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-modulia-600 underline-offset-2 hover:text-modulia-800 hover:underline"
                >
                  Voir sur la carte
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-modulia-100 bg-sand-50 p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-modulia-800">Nom</span>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-modulia-200 bg-white px-4 py-2.5 text-sm outline-none ring-modulia-500 focus:ring-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-modulia-800">E-mail</span>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-modulia-200 bg-white px-4 py-2.5 text-sm outline-none ring-modulia-500 focus:ring-2"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-modulia-800">Téléphone</span>
              <input
                name="phone"
                type="tel"
                className="mt-1 w-full rounded-xl border border-modulia-200 bg-white px-4 py-2.5 text-sm outline-none ring-modulia-500 focus:ring-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-modulia-800">Modèle</span>
              <select
                name="model"
                className="mt-1 w-full rounded-xl border border-modulia-200 bg-white px-4 py-2.5 text-sm outline-none ring-modulia-500 focus:ring-2"
              >
                <option value="">Sélectionner…</option>
                {MODELS_PARTICULIERS.map((model) => (
                  <option key={model.slug} value={model.name}>
                    {model.name}
                  </option>
                ))}
                <option value="Sur mesure">Sur mesure</option>
                <optgroup label="Piscine">
                  <option value="SOFA POOL">SOFA POOL</option>
                </optgroup>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-modulia-800">Message</span>
            <textarea
              name="message"
              rows={4}
              className="mt-1 w-full rounded-xl border border-modulia-200 bg-white px-4 py-2.5 text-sm outline-none ring-modulia-500 focus:ring-2"
              placeholder="Décrivez votre projet…"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-modulia-700 py-3 text-sm font-semibold text-white transition hover:bg-modulia-800 disabled:opacity-60"
          >
            {status === "loading" ? "Envoi en cours…" : "Envoyer la demande"}
          </button>

          {message && (
            <p
              className={`text-center text-sm ${
                status === "success" ? "text-modulia-700" : "text-red-600"
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
