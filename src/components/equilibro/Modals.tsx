"use client";

import Image from "next/image";
import { useEffect, type ReactNode } from "react";

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
        aria-label="Fermer"
      />
      <div className="relative w-full max-w-md animate-slide-up rounded-3xl bg-luxury-papyrus p-8 shadow-luxury">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-luxury-stone font-ui text-luxury-muted transition hover:border-luxury-graphite hover:text-luxury-graphite"
          aria-label="Fermer"
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

/** Formulaire de contact intégré pour réservation / devis */
export function ContactModal({
  isOpen,
  onClose,
  totalPrice,
  configSummary,
  modelName = "EQUILIBRO",
}: ContactModalProps) {
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
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-luxury-graphite/50 backdrop-blur-md" onClick={onClose} aria-label="Fermer" />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-luxury-papyrus p-8 shadow-luxury sm:rounded-3xl animate-slide-up">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 text-luxury-muted hover:text-luxury-graphite"
          aria-label="Fermer"
        >
          ×
        </button>

        <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-luxury-forest">
          {modelName}
        </p>
        <h2 className="mt-2 font-serif text-3xl text-luxury-graphite">Demander un Devis</h2>
        <p className="mt-2 font-ui text-sm text-luxury-muted">
          Configuration estimée à{" "}
          <strong className="text-luxury-graphite">
            {new Intl.NumberFormat("fr-FR").format(totalPrice)} € TTC
          </strong>
        </p>

        <div className="mt-4 rounded-2xl border border-luxury-stone bg-white/60 p-4 font-ui text-xs text-luxury-muted">
          {configSummary}
        </div>

        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <label className="block">
            <span className="font-ui text-xs font-medium uppercase tracking-wider text-luxury-muted">Nom complet</span>
            <input required className="mt-2 w-full border-b border-luxury-stone bg-transparent py-2 font-ui text-sm text-luxury-graphite outline-none transition focus:border-luxury-forest" />
          </label>
          <label className="block">
            <span className="font-ui text-xs font-medium uppercase tracking-wider text-luxury-muted">Email</span>
            <input type="email" required className="mt-2 w-full border-b border-luxury-stone bg-transparent py-2 font-ui text-sm text-luxury-graphite outline-none transition focus:border-luxury-forest" />
          </label>
          <label className="block">
            <span className="font-ui text-xs font-medium uppercase tracking-wider text-luxury-muted">Téléphone</span>
            <input type="tel" className="mt-2 w-full border-b border-luxury-stone bg-transparent py-2 font-ui text-sm text-luxury-graphite outline-none transition focus:border-luxury-forest" />
          </label>
          <label className="block">
            <span className="font-ui text-xs font-medium uppercase tracking-wider text-luxury-muted">Message</span>
            <textarea rows={3} className="mt-2 w-full resize-none border-b border-luxury-stone bg-transparent py-2 font-ui text-sm text-luxury-graphite outline-none transition focus:border-luxury-forest" placeholder="Parlez-nous de votre projet..." />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-luxury-forest py-4 font-ui text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:bg-luxury-forest-dark"
          >
            Envoyer ma demande
          </button>
        </form>
      </div>
    </div>
  );
}
