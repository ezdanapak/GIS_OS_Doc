// Service Worker-ის რეგისტრაცია PWA ოფლაინ მხარდაჭერისთვის
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(function (registration) {
        console.log('Service Worker დარეგისტრირდა:', registration.scope);
      })
      .catch(function (error) {
        console.log('Service Worker-ის შეცდომა:', error);
      });
  });
}