/**
 * Google Analytics 4 — the only analytics/lead-measurement layer.
 * Configure VITE_GA_MEASUREMENT_ID (G-XXXXXXXXXX) in .env to enable;
 * without it every call below is a silent no-op, so local development
 * and preview builds send nothing.
 */
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initAnalytics = () => {
  if (!MEASUREMENT_ID) return;

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
