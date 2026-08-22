/**
 * Carlos García Portfolio - High-Performance Service Worker (PWA Offline & Cache Engine)
 * Version: v2.0.0
 */

const CACHE_NAME = 'carlos-portfolio-v2.0.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/professional.css',
  '/assets/js/portfolio.js',
  '/images/pic00.webp',
  '/images/pic00.jpg',
  '/favicon.svg',
  '/favicon.png',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt'
];

// Install Event - Pre-cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback if offline
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
