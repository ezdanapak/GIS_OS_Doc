// GIS OS Docs — Service Worker (ოფლაინ ქეში)
const CACHE_NAME = 'gis-os-docs-v1';

// ინსტალაციისას — ძირითადი გვერდები წინასწარ შეინახება
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/404.html',
      ]);
    })
  );
  self.skipWaiting();
});

// გააქტიურება — ძველი ქეში წაიშლება
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) { return name !== CACHE_NAME; })
          .map(function (name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

// მოთხოვნების დამუშავება — ჯერ ქეში, მერე ინტერნეტი
self.addEventListener('fetch', function (event) {
  // მხოლოდ GET მოთხოვნები
  if (event.request.method !== 'GET') return;

  // გარე რესურსები (CDN, fonts) — პირდაპირ ინტერნეტი
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (cached) {
        // ქეშიდან + ფონური განახლება (Stale-While-Revalidate)
        const networkFetch = fetch(event.request).then(function (response) {
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(function () {
          // ინტერნეტი არ არის — ქეშიდანაა
          return cached;
        });

        return cached || networkFetch;
      });
    })
  );
});