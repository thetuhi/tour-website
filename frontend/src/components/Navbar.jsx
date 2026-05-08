import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Sun, Moon, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const LANGS = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleDestinationsClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById('destinations');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('destinations');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: 'var(--glass-bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity"
          >
            <Compass size={28} />
            <span className="font-bold text-lg md:text-xl tracking-wider uppercase">Aura Tours</span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Nav links (desktop) */}
            <div className="hidden md:flex items-center gap-6 mr-2">
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-primary"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('nav.home')}
              </Link>
              <a
                href="#destinations"
                onClick={handleDestinationsClick}
                className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('nav.destinations')}
              </a>
              <a
                href="https://wa.me/905343194815"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:text-primary"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('nav.contact')}
              </a>
            </div>

            {/* Language switcher (desktop) */}
            <div
              className="hidden sm:flex items-center rounded-full p-0.5 gap-0.5"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {LANGS.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  title={lang.label}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                    i18n.language === lang.code
                      ? 'bg-primary text-slate-900 shadow-sm'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>

            {/* Theme toggle (desktop) */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full transition-all duration-200 hover:bg-primary/10 hover:text-primary"
              style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-primary/10 text-primary"
              style={{ border: '1px solid var(--border)' }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div 
          className="md:hidden border-t animate-in slide-in-from-top duration-300"
          style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
        >
          <div className="px-4 py-6 space-y-6">
            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-lg font-semibold px-4 py-2 rounded-xl transition-colors hover:bg-primary/10"
                style={{ color: 'var(--text)' }}
              >
                {t('nav.home')}
              </Link>
              <a
                href="#destinations"
                onClick={handleDestinationsClick}
                className="text-lg font-semibold px-4 py-2 rounded-xl transition-colors hover:bg-primary/10"
                style={{ color: 'var(--text)' }}
              >
                {t('nav.destinations')}
              </a>
              <a
                href="https://wa.me/905343194815"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold px-4 py-2 rounded-xl transition-colors hover:bg-primary/10"
                style={{ color: 'var(--text)' }}
              >
                {t('nav.contact')}
              </a>
            </div>

            <div className="flex items-center justify-between px-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              {/* Language Switcher (Mobile) */}
              <div
                className="flex items-center rounded-full p-1 gap-1"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {LANGS.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      i18n.language === lang.code
                        ? 'bg-primary text-slate-900'
                        : 'text-secondary hover:text-primary'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>

              {/* Theme Toggle (Mobile) */}
              <button
                onClick={toggleTheme}
                className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
