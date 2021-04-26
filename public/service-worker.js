
'use strict';


// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v9';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = 
[ 
  '/offline.html',
  '/index.html',
  '/files/assets/malo.png',
  '/files/assets/malo_muerto.png',
  '/files/assets/game_over.png',
  '/files/assets/you_win.png',
  '/files/assets/bueno.png',
  '/files/assets/bueno_muerto.png',
  '/files/assets/shot1.png',
  '/files/assets/shot2.png',
  '/files/assets/jefe.png',
  '/files/assets/jefe_muerto.png',
  '/files/Boss.js',
  '/files/Character.js',
  '/files/Entity.js',
  '/files/Game.js',
  '/files/main.js',
  '/files/Opponent.js',
  '/files/Player.js',
  '/files/Shot.js',
  '/files/game.css',
  '/files/install.js'
];

self.addEventListener('install', (evt) => {
  console.log('[Servidor de trabajo] Instalado');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[Servidor] Pre-cacheando la página sin internet');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[Servidor de trabajo] Activo');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Servidor de trabajo] eliminando cache antigua', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  // CODELAB: Add fetch event handler here.
  // if (evt.request.mode !== 'navigate') {
  //   // Not a page navigation, bail.
  //   console.log("Fetch no navigate");
  //   return;
  // }
  console.log('[ServiceWorker] Fetch', evt.request.url);
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log("RESP", response);
              return response || fetch(evt.request);
            });
      })
  );
});


