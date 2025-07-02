const CACHE_NAME = "woshite-index-cache-v1";
const urlsToCache = [
  "/", // ルート（GitHub Pagesの場合はURLに応じて調整）
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/jousou_data.json",
];

// インストール（初回読み込み時）
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// フェッチ（キャッシュ or ネット）
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // キャッシュにヒットすればそれを返す
      return response || fetch(event.request);
    })
  );
});

// 古いキャッシュの削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});