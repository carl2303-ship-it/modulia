"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "modulia-install-dismissed";
const DISMISS_DAYS = 14;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    ("standalone" in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function wasDismissedRecently(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const at = Number(raw);
    if (Number.isNaN(at)) return false;
    return Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function dismiss() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

/** Popup d'installation PWA — style sombre aligné sur l'icône Modulia */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandalone() || wasDismissedRecently()) return;

    // Register service worker (production only — évite conflits avec Next.js HMR)
    if (
      process.env.NODE_ENV === "production" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      // Slight delay so it doesn't fight first paint
      window.setTimeout(() => setOpen(true), 1800);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    // iOS: no beforeinstallprompt — show Share instructions after delay
    if (isIos() && !isStandalone()) {
      window.setTimeout(() => {
        if (!wasDismissedRecently()) {
          setIosHint(true);
          setOpen(true);
        }
      }, 2500);
    }

    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const close = () => {
    dismiss();
    setOpen(false);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === "accepted") {
      setOpen(false);
    } else {
      close();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
        aria-label="Fermer"
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-t-3xl bg-[#1a1a1a] shadow-2xl animate-slide-up sm:rounded-3xl">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#2d5a3d]/35 blur-3xl" />

        <div className="relative px-8 pb-8 pt-10 text-center">
          <div className="mx-auto overflow-hidden rounded-[1.35rem] shadow-lg ring-1 ring-white/10">
            <Image
              src="/icon-192x192.png"
              alt="Modulia"
              width={88}
              height={88}
              className="h-[88px] w-[88px]"
              priority
            />
          </div>

          <h2
            id="install-title"
            className="mt-6 font-ui text-lg font-medium tracking-[0.2em] text-white"
          >
            MODULIA
          </h2>
          <p className="mt-3 font-ui text-sm leading-relaxed text-white/60">
            Installez l&apos;application pour accéder rapidement à nos modèles,
            personnaliser et demander un devis.
          </p>

          {iosHint ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left">
              <p className="font-ui text-xs leading-relaxed text-white/80">
                Sur iPhone / iPad&nbsp;: appuyez sur{" "}
                <span className="font-medium text-white">Partager</span>{" "}
                <span aria-hidden className="inline-block text-[#4ade80]">
                  ⎋
                </span>{" "}
                puis{" "}
                <span className="font-medium text-white">Sur l&apos;écran d&apos;accueil</span>.
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3">
            {!iosHint && deferred ? (
              <button
                type="button"
                onClick={install}
                className="rounded-full bg-[#2d5a3d] px-6 py-3.5 font-ui text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#3a6f4c]"
              >
                Installer l&apos;application
              </button>
            ) : null}
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-white/15 px-6 py-3 font-ui text-xs uppercase tracking-[0.18em] text-white/70 transition hover:border-white/30 hover:text-white"
            >
              {iosHint ? "Compris" : "Plus tard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
