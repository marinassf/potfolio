const CACHE_NAME = 'portfolio-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/animations.css',
  '/js/script.js',
  '/js/particles.js',
  '/js/carousel.js',
  '/js/skills-map.js',
  '/js/timeline.js',
  '/js/signature.js',
  '/assets/images/developer-illustration.svg',
  '/assets/images/about-image.jpg',
  '/assets/images/project1.jpg',
  '/assets/images/project2.jpg',
  '/assets/images/project3.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});