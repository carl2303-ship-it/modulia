/* Service worker Modulia — réseau d'abord, cache de secours pour l'offline */
const CACHE = "modulia-v1";
const PRECACHE = ["/manifest.webmanifest", "/icon-192x192.png", "/icon-512x512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Ne pas intercepter le HMR / assets Next en développement
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.includes("hot-update") ||
    url.pathname === "/sw.js"
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (url.origin === self.location.origin && response.ok && request.destination === "document") {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => cached || caches.match("/")),
      ),
  );
});
