/**
 * Google Analytics 4, the only analytics/lead-measurement layer.
 *
 * NOTE ON THE FILENAME: this file must not be called analytics.js. In dev,
 * Vite serves modules under their real paths, and the standard ad blocker
 * filter lists block any request whose URL contains "analytics.js". The
 * request then fails with ERR_BLOCKED_BY_CLIENT, and because the module is
 * imported statically the whole graph fails: React never mounts and the site
 * is a blank white page for anyone running a blocker. Keep the neutral name.
 *
 * Configure VITE_GA_MEASUREMENT_ID (G-XXXXXXXXXX) in .env to enable;
 * without it every call below is a silent no-op, so local development
 * and preview builds send nothing.
 *
 * Consent-gated (KVKK/GDPR): GA is NOT loaded until the visitor accepts.
 * `main.jsx` calls initAnalytics only when a prior 'granted' choice is
 * stored; otherwise the cookie banner (components/PrivacyChoice.jsx) asks
 * first and calls setConsent, which starts GA on accept.
 */
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/** localStorage key holding the visitor's choice: 'granted' | 'denied'. */
export const CONSENT_STORAGE_KEY = 'aj-cookie-consent';
/** Fired to re-open the banner so a visitor can change their choice. */
export const COOKIE_SETTINGS_EVENT = 'aj:cookie-settings';

/** True only when GA is actually configured; the banner is pointless otherwise. */
export const analyticsAvailable = () => Boolean(MEASUREMENT_ID);

export const getStoredConsent = () => {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
};

let started = false;

export const initAnalytics = () => {
  if (started || !MEASUREMENT_ID) return;
  started = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // SPA: route changes are reported manually via trackPageView.
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

/**
 * Applies the stored choice on every page load. Accept starts GA. Refusal
 * re-asserts Google's opt-out flag, which otherwise only existed in the tab
 * where the visitor clicked reject: nothing loads GA without consent today,
 * so this is depth rather than a hole, but it keeps the refusal true for the
 * whole session however gtag might arrive later.
 */
export const applyStoredConsent = () => {
  const stored = getStoredConsent();
  if (!MEASUREMENT_ID || !stored) return;
  if (stored === 'granted') initAnalytics();
  else window[`ga-disable-${MEASUREMENT_ID}`] = true;
};

/**
 * Records the visitor's cookie choice and acts on it: accept starts GA,
 * reject sets Google's `ga-disable-<ID>` flag so nothing is sent even if a
 * script was already present. Safe to call repeatedly (e.g. from the banner
 * or a "cookie settings" re-open).
 */
export const setConsent = (granted) => {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, granted ? 'granted' : 'denied');
  } catch {
    /* private mode: choice still applies for this session */
  }
  if (!MEASUREMENT_ID) return;
  if (granted) {
    window[`ga-disable-${MEASUREMENT_ID}`] = false;
    initAnalytics();
  } else {
    window[`ga-disable-${MEASUREMENT_ID}`] = true;
  }
};

/** Re-opens the consent banner so the visitor can change a stored choice. */
export const openCookieSettings = () => {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
};

export const trackEvent = (name, params = {}) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
};

export const trackPageView = (path) => {
  trackEvent('page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};
