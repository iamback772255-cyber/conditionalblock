/**
 * PWA (Progressive Web App) Manager
 * Handles service worker registration and offline capabilities
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        console.log('Service Worker registered', reg);
      })
      .catch((err) => {
        console.error('Service Worker registration failed', err);
      });
  });
}

export const isOnline = () => navigator.onLine;

export const onOnline = (callback) => {
  window.addEventListener('online', callback);
  return () => window.removeEventListener('online', callback);
};

export const onOffline = (callback) => {
  window.addEventListener('offline', callback);
  return () => window.removeEventListener('offline', callback);
};

export const installPrompt = () => {
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
  }
};

export const isPWAInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         navigator.standalone === true;
};