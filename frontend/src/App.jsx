import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { trackPageView } from './utils/measure';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyChoice from './components/PrivacyChoice';
import RouteErrorBoundary from './components/RouteErrorBoundary';
import Home from './pages/Home';

/* Home ships in the main bundle, it is the landing route and must paint fast.
   The rest are split out: TourDetail alone pulls Swiper, the lightbox and the
   QR renderer, none of which the homepage needs. */
const TourDetail = lazy(() => import('./pages/TourDetail'));
const YachtListing = lazy(() => import('./pages/YachtListing'));
const PolicyPage = lazy(() => import('./pages/PolicyPage'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));

/** Holds the page background while a route chunk loads, no spinner flash. */
const RouteFallback = () => <div className="min-h-[60vh]" aria-hidden="true" />;

/**
 * Resets scroll on forward (PUSH/REPLACE) navigations so detail pages open
 * at the top. POP (back/forward) is left to the browser's own scroll
 * restoration so the visitor returns to their place in the list.
 * behavior: 'instant' bypasses the global `scroll-behavior: smooth`.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, navigationType]);

  return null;
}

/** GA4 page_view on every route change (initial config has send_page_view off). */
function PageViewTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
}

function App() {
  const location = useLocation();
  // Detail pages show a fixed bottom CTA bar below lg, give the footer clearance
  const hasFixedCtaBar = location.pathname.startsWith('/tour/');

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
    >
      <ScrollToTop />
      <PageViewTracker />
      <Navbar />
      <main className="flex-grow">
        <RouteErrorBoundary routeKey={location.pathname}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/yachts" element={<YachtListing />} />
              <Route path="/yachts/:slot" element={<YachtListing />} />
              <Route path="/tour/:id" element={<TourDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/policies/:slug" element={<PolicyPage />} />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </main>
      <Footer withCtaClearance={hasFixedCtaBar} />
      <PrivacyChoice />
    </div>
  );
}

export default App;
