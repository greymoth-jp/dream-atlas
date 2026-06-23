/* Dream Atlas service worker — offline app shell, real installability.
   Same-origin shell is cache-first; the cross-origin atlas Worker is never cached. */
const CACHE = "dream-atlas-v1";
const SHELL = ["./", "./index.html", "./engine.js", "./og.png", "./icon-192.png", "./icon-512.png", "./manifest.json"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;            // let the atlas Worker fetch go straight to network
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
