const CACHE_NAME = 'woshite-index-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './jousou_data.json',
  './hotsuma_aya1.json',
  './hotsuma_aya2.json',
  './hotsuma_aya3.json',
  './hotsuma_aya4.json',
  './hotsuma_aya5.json',
  './hotsuma_aya6.json',
  './hotsuma_aya7.json',
  './hotsuma_aya8.json',
  './hotsuma_aya9.json',
  './hotsuma_aya10.json'
];

// インストール時にキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// リクエスト時の挙動
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
