import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import YachtSelection from './pages/YachtSelection';
import YachtListing from './pages/YachtListing';
import PolicyPage from './pages/PolicyPage';
import About from './pages/About';

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

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/yachts';
  // Detail pages show a fixed bottom CTA bar below lg — give the footer clearance
  const hasFixedCtaBar = location.pathname.startsWith('/tour/');

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
    >
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/yachts" element={<YachtSelection />} />
          <Route path="/yachts/:slot" element={<YachtListing />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/policies/:slug" element={<PolicyPage />} />
        </Routes>
      </main>
      {!hideFooter && <Footer withCtaClearance={hasFixedCtaBar} />}
    </div>
  );
}

export default App;
