const CACHE_NAME = "hub-cache-v6"; // ⚠️ Sempre aumente a versão aqui

const urlsToCache = [
  "./",
  "index.html",
  "manifest.json"
];

self.addEventListener("install", event => {
  self.skipWaiting(); // força ativação imediata

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // remove cache antigo
          }
        })
      );
    })
  );

  return self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});






