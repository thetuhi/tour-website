import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { DURATION, EASE } from '../motion/presets';
import {
  analyticsAvailable,
  getStoredConsent,
  setConsent,
  COOKIE_SETTINGS_EVENT,
} from '../utils/measure';

/**
 * KVKK/GDPR cookie consent dialog, centred over a dimmed page. Appears only
 * when analytics is actually configured (a measurement ID exists) AND the
 * visitor has not chosen yet, or when re-opened from the footer's "cookie
 * settings" link. Accept loads GA via setConsent(true); reject keeps it off.
 * See utils/measure.js.
 *
 * Escape closes without recording anything, which is safe: no choice means no
 * tracking, and the dialog simply asks again next visit.
 *
 * NOTE ON THE FILENAME: not CookieConsent.jsx, for the same reason measure.js
 * is not analytics.js. Ad blocker annoyance lists block requests whose URL
 * contains "cookieconsent", and in dev Vite serves this module under its real
 * path, so the blocked import took the whole app down. Keep names off the
 * filter lists: no cookie, consent, banner, tracking or analytics in filenames.
 */
const PrivacyChoice = () => {
  const { t } = useTranslation();
  // Initial visibility computed once: shown when analytics is configured and the
  // visitor has not chosen yet. The effect only wires the re-open listener, so
  // no setState runs directly inside it.
  const [visible, setVisible] = useState(
    () => analyticsAvailable() && !getStoredConsent(),
  );

  const reduceMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    const reopen = () => {
      openerRef.current = document.activeElement;
      setVisible(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  /* Modal behaviour: focus moves in, Tab stays inside, Escape closes. */
  useEffect(() => {
    if (!visible) return undefined;

    const dialog = dialogRef.current;
    const focusable = () =>
      [...dialog.querySelectorAll('a[href], button:not([disabled])')];
    // The dialog itself, not a button: pre-focusing accept or reject would put
    // a thumb on the scale for a choice that has to be freely given.
    dialog.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setVisible(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const target = event.shiftKey ? first : last;
      if (document.activeElement === target || !dialog.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  /* Hand focus back to whatever opened the dialog, e.g. the footer link. */
  useEffect(() => {
    if (visible) return;
    openerRef.current?.focus?.();
    openerRef.current = null;
  }, [visible]);

  const choose = (granted) => {
    setConsent(granted);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="fixed inset-0 z-[95] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.fast, ease: EASE }}
        >
          <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" aria-hidden="true" />

          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-choice-title"
            aria-describedby="privacy-choice-text"
            tabIndex={-1}
            className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-navy p-7 shadow-2xl sm:p-9"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: DURATION.base, ease: EASE }}
          >
            <h2
              id="privacy-choice-title"
              className="mb-3 font-display text-2xl font-bold text-white sm:text-3xl"
            >
              {t('cookie.title')}
            </h2>
            <p id="privacy-choice-text" className="mb-7 text-sm leading-relaxed text-white/80">
              {t('cookie.text')}{' '}
              <Link
                to="/policies/privacy"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {t('cookie.policy')}
              </Link>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => choose(true)}
                className="min-h-11 flex-1 bg-primary px-5 text-xs font-bold uppercase tracking-[0.15em] text-navy transition-colors hover:bg-white"
              >
                {t('cookie.accept')}
              </button>
              <button
                type="button"
                onClick={() => choose(false)}
                className="min-h-11 flex-1 border border-white/25 px-5 text-xs font-bold uppercase tracking-[0.15em] text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {t('cookie.reject')}
              </button>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyChoice;
