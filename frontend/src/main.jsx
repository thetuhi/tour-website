import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import './i18n/index.js';   // ← initialise i18next BEFORE rendering
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { splashLiftIn } from './motion/splash.js';
import { applyStoredConsent } from './utils/measure.js';

// Consent-gated: GA starts only if the visitor already accepted on a past
// visit, and a stored refusal is re-asserted. A fresh visitor has no stored
// choice and sees the dialog first (components/PrivacyChoice.jsx).
applyStoredConsent();

/* LazyMotion + domAnimation loads only the DOM animation features (~60% of
   the full framer-motion bundle). It is why components import `m` instead of
   `motion`, `motion.*` would pull the whole feature set back in. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LazyMotion features={domAnimation} strict>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LazyMotion>
    </ThemeProvider>
  </StrictMode>,
);

/* ── Dismiss the boot splash (defined in index.html) ──────────
   The splash paints before the JS bundle loads; once the app has
   mounted we hold it long enough for the brand sequence to compose
   (fast loads shouldn't produce a jarring flash), then lift the
   curtain. `__liftSplash` owns the DOM side, it is also what the
   failsafe timer in index.html calls if this bundle never runs. */
window.setTimeout(() => window.__liftSplash?.(), splashLiftIn());
