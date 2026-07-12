import { Link } from 'react-router-dom';
import { Compass, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
import { POLICIES, POLICY_ORDER } from '../content/policies';
import { BRAND_NAME, AGENCY_NAME, AGENCY_LICENSE_NUMBER } from '../config/agency';

const CONTACT_PHONE_DISPLAY = '+90 534 319 48 15';

/**
 * Premium navy site footer: brand + relationship statement, explore and
 * policy navigation, and the official agency block (MARŞ TRAVEL, licence
 * number, contact). The agency identity repeats in the bottom bar so it is
 * visible even where the columns collapse. `withCtaClearance` reserves space
 * for the fixed WhatsApp bar shown on detail pages below the lg breakpoint.
 */
const Footer = ({ withCtaClearance = false }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('ru') ? 'ru' : 'en';

  return (
    <footer className={`bg-navy text-white ${withCtaClearance ? 'pb-28 lg:pb-0' : ''}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.1fr_1.3fr] lg:gap-12">

          {/* Brand + relationship statement */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 text-white transition-opacity hover:opacity-80">
              <Compass size={22} className="text-gold" />
              <span className="font-display text-lg font-bold uppercase tracking-[0.25em]">
                {BRAND_NAME}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-white/60">
              {t('footer.relation', { brand: BRAND_NAME, agency: AGENCY_NAME })}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label={t('footer.explore')}>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
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
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </nav>

          {/* Policies */}
          <nav aria-label={t('footer.policies')}>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
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
            </ul>
          </nav>

          {/* Official agency */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              {t('footer.official')}
            </h3>
            <div className="mt-5 border border-white/15 bg-white/[0.04] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                {AGENCY_NAME}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                {t('footer.license', { number: AGENCY_LICENSE_NUMBER })}
              </p>
              <div className="mt-4 space-y-2.5 text-xs text-white/60">
                <p className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0 text-gold" />
                  {t('footer.location')}
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <FaWhatsapp size={14} className="shrink-0 text-gold" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>{t('footer.rights', { year: new Date().getFullYear(), brand: BRAND_NAME })}</p>
          <p>
            {AGENCY_NAME} · {t('footer.licenseShort', { number: AGENCY_LICENSE_NUMBER })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
