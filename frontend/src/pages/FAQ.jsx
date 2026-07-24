import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getFaq } from '../content/faq';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { recordLead } from '../utils/leads';
import { AGENCY_NAME, AGENCY_LICENSE_NUMBER } from '../config/agency';
import Reveal from '../components/Reveal';
import FaqAccordion from '../components/FaqAccordion';

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const items = getFaq(i18n.language);

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
          <FaqAccordion
            items={items}
            defaultOpenId={items[0]?.id ?? null}
            className="-mt-8 overflow-hidden rounded-2xl bg-surface shadow-[0_12px_48px_rgba(11,31,63,0.10)]"
          />
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
