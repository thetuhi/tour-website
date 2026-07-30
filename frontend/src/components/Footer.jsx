import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import LogoMark from './Logo';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_NUMBER, CONTACT_PHONE_DISPLAY, generateTelegramLink } from '../utils/whatsapp';
import { recordLead } from '../utils/leads';
import { POLICIES, POLICY_ORDER } from '../content/policies';
import { BRAND_NAME, AGENCY_NAME, AGENCY_LICENSE_NUMBER, SOCIAL_LINKS, OFFICE } from '../config/agency';
import { trackEvent, analyticsAvailable, openCookieSettings } from '../utils/measure';
import OfficeMap from './OfficeMap';

/** Icon per social platform; extend alongside SOCIAL_LINKS in config/agency.js. */
const SOCIAL_ICONS = {};
import TursabBadge from './TursabBadge';

/**
 * Premium navy site footer: brand + relationship statement, explore and
 * policy navigation, and the official agency block (MARŞ TRAVEL, licence
 * number, contact). The legal agency identity appears only in that official
 * block; the bottom bar carries the copyright and a brand tagline rather than
 * repeating it. `withCtaClearance` reserves space for the fixed WhatsApp bar
 * shown on detail pages below the lg breakpoint.
 */
const Footer = ({ withCtaClearance = false }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('ru') ? 'ru' : 'en';

  return (
    <footer className={`bg-navy text-white ${withCtaClearance ? 'pb-28 lg:pb-0' : ''}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.1fr_1.3fr] lg:gap-12">

          {/* Brand + relationship statement */}
          <div>
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2.5 text-white transition-opacity hover:opacity-80"
            >
              <LogoMark size={26} className="text-primary" />
              <span className="font-display text-lg font-bold uppercase tracking-[0.18em]">
                {BRAND_NAME}
              </span>
            </Link>
            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-8">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
                  {t('footer.follow')}
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map(({ id, label, handle, url }) => {
                    const Icon = SOCIAL_ICONS[id];
                    return (
                      <a
                        key={id}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label}, ${handle}`}
                        onClick={() => trackEvent('social_click', { platform: id })}
                        className="inline-flex items-center gap-2.5 border border-white/15 px-4 py-2.5 text-sm text-white/75 transition-colors hover:border-primary/60 hover:text-white"
                      >
                        {Icon && <Icon size={16} className="shrink-0 text-primary" />}
                        {handle}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Office map sits in this column: it fills the space the brand
                copy leaves empty, instead of stacking under the agency block
                and stretching the whole footer. */}
            <div className="mt-8 max-w-xs">
              <OfficeMap />
            </div>
          </div>

          {/* Explore */}
          <nav aria-label={t('footer.explore')}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              {t('footer.explore')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/" className="text-white/70 transition-colors hover:text-white">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/yachts" className="text-white/70 transition-colors hover:text-white">
                  {t('footer.yachts')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 transition-colors hover:text-white">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 transition-colors hover:text-white">
                  {t('faq.nav')}
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordLead({ language: i18n.language, source: 'footer-nav' })}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </nav>

          {/* Policies */}
          <nav aria-label={t('footer.policies')}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              {t('footer.policies')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {POLICY_ORDER.map(slug => (
                <li key={slug}>
                  <Link
                    to={`/policies/${slug}`}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {POLICIES[slug][lang].title}
                  </Link>
                </li>
              ))}
              {/* Withdrawing consent has to be as easy as giving it (KVKK/GDPR),
                  so the re-open link sits with the other legal links rather than
                  as a stray button under the copyright. */}
              {analyticsAvailable() && (
                <li>
                  <button
                    type="button"
                    onClick={openCookieSettings}
                    className="text-left text-white/70 transition-colors hover:text-white"
                  >
                    {t('cookie.settings')}
                  </button>
                </li>
              )}
            </ul>
          </nav>

          {/* Official agency */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              {t('footer.official')}
            </h3>
            <div className="mt-5 border border-white/15 bg-white/[0.04] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                {AGENCY_NAME}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                {t('footer.license', { number: AGENCY_LICENSE_NUMBER })}
              </p>
              <p className="mt-3 text-xs leading-6 text-white/55">
                {t('footer.operates', { brand: BRAND_NAME })}
              </p>

              <div className="mt-4 border-t border-white/10 pt-4">
                <TursabBadge variant="full" onDark />
                <p className="mt-3 text-[11px] leading-relaxed text-white/50">
                  {t('footer.tursab')}
                </p>
              </div>

              <div className="mt-4 space-y-2.5 text-xs text-white/60">
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                  {OFFICE.address}
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordLead({ language: i18n.language, source: 'footer-phone' })}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <FaWhatsapp size={14} className="shrink-0 text-primary" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <a
                  href={generateTelegramLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordLead({ language: i18n.language, source: 'footer-telegram' })}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <FaTelegramPlane size={14} className="shrink-0 text-primary" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar, just the copyright. The legal agency identity (name +
            licence number) is not repeated here; it lives solely in the Official
            Agency card above. */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/45">
            {t('footer.rights', { year: new Date().getFullYear(), brand: BRAND_NAME })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
