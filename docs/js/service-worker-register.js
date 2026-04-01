// Service Worker-ის რეგისტრაცია PWA ოფლაინ მხარდაჭერისთვის
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    // base href-დან ავტომატურად პოულობს სწორ მისამართს
    // (მუშაობს custom domain-ზეც და GitHub Pages subdirectory-ზეც)
    var base = document.querySelector('base');
    var swUrl = base
      ? new URL('service-worker.js', base.href).href
      : '/service-worker.js';

    navigator.serviceWorker
      .register(swUrl)
      .then(function (registration) {
        console.log('Service Worker დარეგისტრირდა:', registration.scope);
      })
      .catch(function (error) {
        console.error('Service Worker-ის შეცდომა:', error);
      });
  });
}