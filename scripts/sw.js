var CACHE_NAME = 'bavardercsh-6';
var urlsToCache = [
  '/',
  '/material.css',
  '/bavarder.js',
  '/settings.js',
  "/msgscreen.js",
  "/favicon.ico",
  "/toggle-md.css",
  "/manifest.webmanifest",
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        Promise.all([caches.open(CACHE_NAME), self.skipWaiting()])
            .then(function(cache) {
                console.log('Opened Cache');
                return cache[0].addAll(urlsToCache)
            })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });

self.addEventListener('activate', function(event) {

    var cacheWhitelist = [''];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1){
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

});


self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var action = event.action;
  
    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('http://www.stormprograms.com');
      notification.close();
    }
});