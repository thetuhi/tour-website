import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import YachtSelection from './pages/YachtSelection';
import YachtListing from './pages/YachtListing';

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const hideFooter = location.pathname === '/yachts';

  return (
    <ThemeProvider>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/yachts" element={<YachtSelection />} />
            <Route path="/yachts/:slot" element={<YachtListing />} />
            <Route path="/tour/:id" element={<TourDetail />} />
          </Routes>
        </main>
        {!hideFooter && (
          <footer
            className="py-8 text-center text-sm"
            style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            <p>{t('footer', { year: new Date().getFullYear() })}</p>
          </footer>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
