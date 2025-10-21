const CACHE_NAME = `capitalprintgh-cache-v${Date.now()}`;
const FALLBACK_URL = '/index.html';

const urlsToCache = [
    '/',
    '/index.html',
    '/MainLayout.css',
    '/home.css',
    '/allproducts.css',
    '/app.css',
    '/bootstrap.css',
    '/bootstrap.grid.css',
    '/bootstrap.reboot.css',
    '/bootstrap.utilities.css',
    '/design.css',
    '/solution.css',
    '/images/icon-192.png'
];

// Install: Cache essential assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>
            Promise.all(
                urlsToCache.map(url =>
                    fetch(url).then(response => {
                        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
                        return cache.put(url, response);
                    }).catch(err => console.warn(`Skipping ${url}:`, err))
                )
            )
        ).then(() => self.skipWaiting())
    );
});

// Activate: Clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }))
        ).then(() => self.clients.claim())
    );
});

// Fetch: Network-first with fallback to cache or index.html
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() =>
            caches.match(event.request).then(response =>
                response || (event.request.mode === 'navigate' ? caches.match(FALLBACK_URL) : undefined)
            )
        )
    );
});
