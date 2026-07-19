import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { POLICIES, POLICY_ORDER } from '../content/policies';
import { AGENCY_NAME, AGENCY_LICENSE_NUMBER } from '../config/agency';

/**
 * Editorial legal page for a single policy document (privacy / terms /
 * cancellation). Content comes from src/content/policies.js in the active
 * language; the agency identity line is repeated under the article so the
 * licence stays visible wherever a visitor lands.
 */
const PolicyPage = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('ru') ? 'ru' : 'en';
  const policy = POLICIES[slug]?.[lang];

  if (!policy) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 font-display text-3xl font-bold text-heading">{t('policy.notFound')}</h2>
        <Link to="/" className="font-semibold text-primary hover:underline">
          {t('policy.back')}
        </Link>
      </div>
    );
  }

  const otherPolicies = POLICY_ORDER.filter(key => key !== slug);

  return (
    <div className="min-h-screen bg-mist pb-16 text-ink">
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
            {t('policy.eyebrow')}
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {policy.title}
          </h1>
          <p className="mt-4 text-sm text-white/60">
            {t('policy.updated', { date: policy.updated })}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="-mt-8 rounded-2xl bg-surface p-6 shadow-[0_12px_48px_rgba(11,31,63,0.10)] sm:p-10">
          <p className="text-base font-light leading-8 text-secondary">{policy.intro}</p>

          {policy.sections.map(section => (
            <section key={section.heading} className="mt-9">
              <h2 className="font-display text-xl font-bold text-heading sm:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs.map(paragraph => (
                <p key={paragraph} className="mt-3 text-[0.95rem] font-light leading-7 text-secondary">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <div className="mt-12 border-t border-line pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-heading">{AGENCY_NAME}</p>
            <p className="mt-1 text-xs text-secondary">
              {t('footer.license', { number: AGENCY_LICENSE_NUMBER })}
            </p>
          </div>
        </article>

        <nav aria-label={t('policy.also')} className="mt-8 pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {t('policy.also')}
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {otherPolicies.map(key => (
              <Link
                key={key}
                to={`/policies/${key}`}
                className="border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-primary"
              >
                {POLICIES[key][lang].title}
              </Link>
            ))}
          </div>
        </nav>
      </section>
    </div>
  );
};

export default PolicyPage;
