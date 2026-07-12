import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './i18n/index.js';   // ← initialise i18next BEFORE rendering
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

/* ── Dismiss the boot splash (defined in index.html) ──────────
   The splash paints before the JS bundle loads; once the app has
   mounted we hold it long enough for the brand sequence to compose
   (fast loads shouldn't produce a jarring flash), then lift the
   curtain and remove it from the DOM. */
const MIN_SPLASH_MS = 1600;
const CURTAIN_MS = 850;
const splash = document.getElementById('splash');
if (splash) {
  const remaining = Math.max(0, MIN_SPLASH_MS - performance.now());
  window.setTimeout(() => {
    splash.classList.add('splash--hide');
    window.setTimeout(() => splash.remove(), CURTAIN_MS);
  }, remaining);
}
