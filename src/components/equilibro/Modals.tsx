"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/config";

type InfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  specs: string[];
  image?: string;
};

/** Modal informativo minimalista para fichas técnicas */
export function InfoModal({ isOpen, onClose, title, description, specs, image }: InfoModalProps) {
  const t = useTranslations("common");

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <button
        type="button"
        className="absolute inset-0 bg-luxury-graphite/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-label={t("close")}
      />
      <div className="relative w-full max-w-md animate-slide-up rounded-3xl bg-luxury-papyrus p-8 shadow-luxury">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-luxury-stone font-ui text-luxury-muted transition hover:border-luxury-graphite hover:text-luxury-graphite"
          aria-label={t("close")}
        >
          ×
        </button>
        <h2 id="info-modal-title" className="pr-10 font-serif text-2xl text-luxury-graphite">
          {title}
        </h2>
        {image && (
          <div className="relative mt-4 aspect-video overflow-hidden rounded-xl border border-luxury-stone">
            <Image src={image} alt={title} fill className="object-cover object-top" sizes="400px" />
          </div>
        )}
        <p className="mt-4 font-ui text-sm leading-relaxed text-luxury-muted">{description}</p>
        <ul className="mt-6 space-y-2 border-t border-luxury-stone pt-6">
          {specs.map((spec) => (
            <li key={spec} className="flex items-start gap-2 font-ui text-xs text-luxury-graphite">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-luxury-forest" />
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  configSummary: ReactNode;
  modelName?: string;
};

const NUMBER_LOCALE: Record<Locale, string> = { fr: "fr-FR", pt: "pt-PT", en: "en-GB" };

/** Formulaire de contact intégré pour réservation / devis */
export function ContactModal({
  isOpen,
  onClose,
  totalPrice,
  configSummary,
  modelName = "EQUILIBRO",
}: ContactModalProps) {
  const t = useTranslations("personnaliser");
  const tContact = useTranslations("contact");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setFeedback("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const userMessage = String(formData.get("message") ?? "").trim();
    const summaryText =
      typeof configSummary === "string"
        ? configSummary
        : `Configuration ${modelName} — ${new Intl.NumberFormat(NUMBER_LOCALE[locale]).format(totalPrice)} € TTC`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          model: modelName,
          message: [summaryText, userMessage].filter(Boolean).join("\n\n"),
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setFeedback(tContact("successFull"));
      form.reset();
    } catch {
      setStatus("error");
      setFeedback(tContact("errorMsg"));
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-luxury-graphite/50 backdrop-blur-md" onClick={onClose} aria-label={tCommon("close")} />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-luxury-papyrus p-8 shadow-luxury sm:rounded-3xl animate-slide-up">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 text-luxury-muted hover:text-luxury-graphite"
          aria-label={tCommon("close")}
        >
          ×
        </button>

        <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-forest">
          {modelName}
        </p>
        <h2 className="mt-2 font-serif text-3xl text-luxury-graphite">{t("contact.title")}</h2>
        <p className="mt-2 font-ui text-sm text-luxury-muted">
          {t("contact.estimatedAt")}{" "}
          <strong className="text-luxury-graphite">
            {new Intl.NumberFormat(NUMBER_LOCALE[locale]).format(totalPrice)} € {tCommon("ttc")}
          </strong>
        </p>

        <div className="mt-4 rounded-2xl border border-luxury-stone bg-white/60 p-4 font-ui text-xs text-luxury-muted">
          {configSummary}
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="font-ui text-xs font-medium uppercase tracking-wider text-luxury-muted">{t("contact.name")}</span>
            <input
              name="name"
              required
              className="mt-2 w-full border-b border-luxury-stone bg-transparent py-2 font-ui text-sm text-luxury-graphite outline-none transition focus:border-luxury-forest"
            />
          </label>
          <label className="block">
            <span className="font-ui text-xs font-medium uppercase tracking-wider text-luxury-muted">{t("contact.email")}</span>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full border-b border-luxury-stone bg-transparent py-2 font-ui text-sm text-luxury-graphite outline-none transition focus:border-luxury-forest"
            />
          </label>
          <label className="block">
            <span className="font-ui text-xs font-medium uppercase tracking-wider text-luxury-muted">{t("contact.phone")}</span>
            <input
              name="phone"
              type="tel"
              className="mt-2 w-full border-b border-luxury-stone bg-transparent py-2 font-ui text-sm text-luxury-graphite outline-none transition focus:border-luxury-forest"
            />
          </label>
          <label className="block">
            <span className="font-ui text-xs font-medium uppercase tracking-wider text-luxury-muted">{t("contact.message")}</span>
            <textarea
              name="message"
              rows={3}
              className="mt-2 w-full resize-none border-b border-luxury-stone bg-transparent py-2 font-ui text-sm text-luxury-graphite outline-none transition focus:border-luxury-forest"
              placeholder={t("contact.messagePlaceholder")}
            />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-luxury-forest py-4 font-ui text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:bg-luxury-forest-dark disabled:opacity-60"
          >
            {status === "loading" ? tContact("submitting") : t("contact.submit")}
          </button>
          {feedback && (
            <p
              className={`text-center font-ui text-sm ${
                status === "success" ? "text-luxury-forest" : "text-red-600"
              }`}
              role="status"
            >
              {feedback}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
