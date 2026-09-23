import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Automatically register and update PWA Service Worker
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('[PWA SW] New content available, reloading...');
    updateSW(true);
  },
  onOfflineReady() {
    console.log('[PWA SW] Service worker registered and offline ready!');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
