import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getFaq } from '../content/faq';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { recordLead } from '../utils/leads';
import { AGENCY_NAME, AGENCY_LICENSE_NUMBER } from '../config/agency';
import { DURATION, EASE } from '../motion/presets';
import Reveal from '../components/Reveal';

/**
 * One accordion row.
 *
 * The button owns the expanded state (`aria-expanded`) and points at the panel
 * it controls (`aria-controls`); the panel points back at its button
 * (`aria-labelledby`) so screen readers announce the question when the answer
 * gets focus. A native <button> is used rather than a div so keyboard
 * activation and focus order come for free.
 */
const FaqRow = ({ item, isOpen, onToggle }) => {
  const reduceMotion = useReducedMotion();
  const uid = useId();
  const buttonId = `faq-q-${uid}`;
  const panelId = `faq-a-${uid}`;

  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-black/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary md:px-7 md:py-6 dark:hover:bg-white/[0.03]"
        >
          <span className="font-display text-lg font-bold leading-snug text-heading md:text-xl">
            {item.question}
          </span>
          <m.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: reduceMotion ? 0 : DURATION.fast, ease: EASE }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-primary"
          >
            <ChevronDown size={18} aria-hidden="true" />
          </m.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : DURATION.fast, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-5 pb-6 md:px-7 md:pb-7">
              {item.answer.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-3xl text-[0.95rem] font-light leading-7 text-secondary md:text-base md:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const items = getFaq(i18n.language);
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  const whatsappUrl = generateWhatsAppLink(i18n.language);

  /* FAQPage structured data. Rendered from the same source as the visible
     answers so the two can never drift apart — Google penalises schema that
     does not match on-page content. */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.join(' '),
      },
    })),
  };

  return (
    <div className="min-h-screen bg-mist pb-20 text-ink">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-navy">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-10 inline-flex items-center border border-white/20 px-4 py-2 text-sm font-semibold text-white/[0.82] transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={17} className="mr-2" />
            {t('policy.back')}
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t('faq.eyebrow')}
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {t('faq.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/70">
            {t('faq.subtitle')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="-mt-8 overflow-hidden rounded-2xl bg-surface shadow-[0_12px_48px_rgba(11,31,63,0.10)]">
            {items.map(item => (
              <FaqRow
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(current => (current === item.id ? null : item.id))}
              />
            ))}
          </div>
        </Reveal>

        {/* Still unanswered → the site's single conversion path */}
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl bg-navy px-6 py-10 text-center md:px-12 md:py-12">
            <h2 className="mx-auto max-w-xl font-display text-2xl font-bold leading-tight text-white md:text-3xl">
              {t('faq.ctaTitle')}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm font-light leading-relaxed text-white/70 md:text-base">
              {t('faq.ctaDesc')}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordLead({ language: i18n.language, source: 'faq' })}
              className="mt-7 inline-flex min-h-14 items-center justify-center gap-2 bg-gold px-8 text-xs font-bold uppercase tracking-[0.15em] text-navy transition-colors duration-300 hover:bg-white"
            >
              <FaWhatsapp size={18} />
              {t('about.cta')}
            </a>
          </div>
        </Reveal>

        <div className="mt-8 text-center text-xs text-secondary">
          {AGENCY_NAME} · {t('footer.licenseShort', { number: AGENCY_LICENSE_NUMBER })}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
