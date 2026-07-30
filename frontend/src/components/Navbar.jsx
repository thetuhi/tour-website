import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import LogoMark from './Logo';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_NUMBER, generateTelegramLink } from '../utils/whatsapp';
import { recordLead } from '../utils/leads';
import { useTheme } from '../context/ThemeContext';
import { EASE, DURATION } from '../motion/presets';
import { BRAND_NAME } from '../config/agency';

const LANGS = [
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
];

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? t('nav.theme.toLight') : t('nav.theme.toDark')}
      title={isDark ? t('nav.theme.toLight') : t('nav.theme.toDark')}
      className={`relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl text-primary transition-colors hover:bg-primary/10 ${className}`}
      style={{ border: '1px solid var(--border)' }}
    >
      <AnimatePresence initial={false} mode="wait">
        <m.span
          key={isDark ? 'moon' : 'sun'}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, rotate: -45 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, rotate: 45 }}
          transition={{ duration: DURATION.fast, ease: EASE }}
          className="absolute flex items-center justify-center"
        >
          {isDark ? <Moon size={20} /> : <Sun size={20} />}
        </m.span>
      </AnimatePresence>
    </button>
  );
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

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
          <div className="flex min-w-0 items-center">
            <Link
              to="/"
              className="flex min-w-0 items-center gap-2 text-primary transition-opacity hover:opacity-80"
            >
              <LogoMark size={30} className="shrink-0" />
              <span className="truncate font-bold text-base sm:text-lg tracking-[0.12em] uppercase">
                {BRAND_NAME}
              </span>
            </Link>
          </div>

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
              <Link
                to="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('nav.about')}
              </Link>
              <Link
                to="/faq"
                className="text-sm font-medium transition-colors hover:text-primary"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('faq.nav')}
              </Link>
              <div className="flex items-center gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordLead({ language: i18n.language, source: 'navbar' })}
                  aria-label={t('contact.whatsapp')}
                  title={t('contact.whatsapp')}
                  className="transition-colors hover:text-primary"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <FaWhatsapp size={20} />
                </a>
                <a
                  href={generateTelegramLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordLead({ language: i18n.language, source: 'navbar-telegram' })}
                  aria-label={t('contact.telegram')}
                  title={t('contact.telegram')}
                  className="transition-colors hover:text-primary"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <FaTelegramPlane size={20} />
                </a>
              </div>
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
                      ? 'bg-navy text-white shadow-sm dark:bg-gold dark:text-navy'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={t('nav.menu')}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-colors hover:bg-primary/10 text-primary"
              style={{ border: '1px solid var(--border)' }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            className="md:hidden overflow-hidden border-t"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
          >
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Nav Links */}
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
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
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold px-4 py-2 rounded-xl transition-colors hover:bg-primary/10"
                  style={{ color: 'var(--text)' }}
                >
                  {t('nav.about')}
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold px-4 py-2 rounded-xl transition-colors hover:bg-primary/10"
                  style={{ color: 'var(--text)' }}
                >
                  {t('faq.nav')}
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordLead({ language: i18n.language, source: 'navbar-mobile' })}
                  className="flex items-center gap-2 text-lg font-semibold px-4 py-2 rounded-xl transition-colors hover:bg-primary/10"
                  style={{ color: 'var(--text)' }}
                >
                  <FaWhatsapp size={18} className="text-primary" />
                  {t('contact.whatsapp')}
                </a>
                <a
                  href={generateTelegramLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordLead({ language: i18n.language, source: 'navbar-mobile-telegram' })}
                  className="flex items-center gap-2 text-lg font-semibold px-4 py-2 rounded-xl transition-colors hover:bg-primary/10"
                  style={{ color: 'var(--text)' }}
                >
                  <FaTelegramPlane size={18} className="text-primary" />
                  {t('contact.telegram')}
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
                          ? 'bg-navy text-white dark:bg-gold dark:text-navy'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
