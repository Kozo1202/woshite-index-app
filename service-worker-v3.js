const CACHE_NAME = 'woshite-index-cache-v3';
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
  './hotsuma_aya10.json',
  './hotsuma_aya11.json',
  './hotsuma_aya12.json',
  './hotsuma_aya13.json',
  './hotsuma_aya14.json',
  './hotsuma_aya15.json',
  './hotsuma_aya16.json',
  './hotsuma_aya17.json',
  './hotsuma_aya18.json',
  './hotsuma_aya19i.json',
  './hotsuma_aya19ro.json',
  './hotsuma_aya20.json',
  './hotsuma_aya21.json',
  './hotsuma_aya22.json',
  './hotsuma_aya23.json',
  './hotsuma_aya24.json',
  './hotsuma_aya25.json',
  './hotsuma_aya26.json',
  './hotsuma_aya27.json',
  './hotsuma_aya28.json',
  './hotsuma_aya29.json',
  './hotsuma_aya30.json',
  './hotsuma_aya31.json',
  './hotsuma_aya32.json',
  './hotsuma_aya33.json',
  './hotsuma_aya34.json',
  './hotsuma_aya35.json',
  './hotsuma_aya36.json',
  './hotsuma_aya37.json',
  './hotsuma_aya38.json',
  './hotsuma_aya39.json',
  './hotsuma_aya40.json',
  './mikasa_kuninaduganobu.json'
];

// 🪄 インストール時に即座に反映
self.addEventListener('install', event => {
  self.skipWaiting(); // 🔥 新しいSWを即適用！

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 🚀 アクティブ時にすぐクライアントを乗っ取る
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(
          keys.map(key => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      ),
      clients.claim() // 🔥 全クライアントに即適用！
    ])
  );
});

// 🌐 キャッシュ優先＋ネット fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});