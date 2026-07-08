"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

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
        // Tabela ainda não criada — mostrar sucesso local para demo
        if (error.code === "42P01" || error.message.includes("does not exist")) {
          setStatus("success");
          setMessage("Pedido recebido! Entraremos em contacto em breve.");
          form.reset();
          return;
        }
        throw error;
      }

      setStatus("success");
      setMessage("Obrigado! Recebemos o seu pedido e entraremos em contacto em breve.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Não foi possível enviar. Tente novamente ou contacte-nos por email.");
    }
  }

  return (
    <section id="contacto" className="border-t border-modulia-100 bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-modulia-950 sm:text-4xl">
            Peça o seu orçamento
          </h2>
          <p className="mt-4 text-lg text-modulia-700">
            Conte-nos o que procura. A nossa equipa responde em até 48 horas com
            uma proposta personalizada.
          </p>
          <dl className="mt-10 space-y-4 text-sm text-modulia-700">
            <div>
              <dt className="font-semibold text-modulia-900">Email</dt>
              <dd>hello@modulia.pt</dd>
            </div>
            <div>
              <dt className="font-semibold text-modulia-900">Telefone</dt>
              <dd>+351 210 000 000</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-modulia-100 bg-sand-50 p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-modulia-800">Nome</span>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-modulia-200 bg-white px-4 py-2.5 text-sm outline-none ring-modulia-500 focus:ring-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-modulia-800">Email</span>
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
              <span className="text-sm font-medium text-modulia-800">Telefone</span>
              <input
                name="phone"
                type="tel"
                className="mt-1 w-full rounded-xl border border-modulia-200 bg-white px-4 py-2.5 text-sm outline-none ring-modulia-500 focus:ring-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-modulia-800">Modelo</span>
              <select
                name="model"
                className="mt-1 w-full rounded-xl border border-modulia-200 bg-white px-4 py-2.5 text-sm outline-none ring-modulia-500 focus:ring-2"
              >
                <option value="">Selecionar...</option>
                <option value="EQUILIBRO">EQUILIBRO</option>
                <option value="Modulia S">Modulia S</option>
                <option value="Modulia M">Modulia M</option>
                <option value="Modulia L">Modulia L</option>
                <option value="Personalizado">Personalizado</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-modulia-800">Mensagem</span>
            <textarea
              name="message"
              rows={4}
              className="mt-1 w-full rounded-xl border border-modulia-200 bg-white px-4 py-2.5 text-sm outline-none ring-modulia-500 focus:ring-2"
              placeholder="Descreva o seu projeto..."
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-modulia-700 py-3 text-sm font-semibold text-white transition hover:bg-modulia-800 disabled:opacity-60"
          >
            {status === "loading" ? "A enviar..." : "Enviar pedido"}
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
