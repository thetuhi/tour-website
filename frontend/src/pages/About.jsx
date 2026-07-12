import { Anchor, Languages, ShieldCheck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import RevealImage from '../components/RevealImage';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { recordLead } from '../utils/leads';
import { BRAND_NAME, AGENCY_NAME, AGENCY_LICENSE_NUMBER } from '../config/agency';

/**
 * About page: the brand story and the official agency identity, in the same
 * editorial language as the rest of the site. All copy lives in the i18n
 * files; the agency identity comes from the central config.
 */
const About = () => {
  const { t, i18n } = useTranslation();
  const whatsappUrl = generateWhatsAppLink(i18n.language);

  const values = [
    { icon: Anchor, title: t('about.values.curated.title'), desc: t('about.values.curated.desc') },
    {
      icon: ShieldCheck,
      title: t('about.values.licensed.title'),
      desc: t('about.values.licensed.desc', { agency: AGENCY_NAME, number: AGENCY_LICENSE_NUMBER }),
    },
    { icon: FaWhatsapp, title: t('about.values.personal.title'), desc: t('about.values.personal.desc') },
    { icon: Languages, title: t('about.values.bilingual.title'), desc: t('about.values.bilingual.desc') },
  ];

  return (
    <main className="min-h-screen bg-mist pb-20 text-ink">
      {/* Navy hero band */}
      <section className="relative isolate overflow-hidden bg-navy">
        <RevealImage
          src="/images/tours/lusca-vip-yacht-tour/Yatch_Lusca_2.jpg"
          alt=""
          tone="dark"
          containerClassName="absolute inset-0"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-navy/[0.78]" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/60" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t('about.eyebrow')}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            {t('about.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/80 md:text-lg">
            {t('about.subtitle', { brand: BRAND_NAME })}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="-mt-10 rounded-2xl bg-white p-6 shadow-[0_12px_48px_rgba(11,31,63,0.10)] sm:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t('about.storyEyebrow')}
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
            {t('about.storyTitle')}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base font-light leading-8 text-secondary md:text-lg">
            <p>{t('about.story1', { brand: BRAND_NAME })}</p>
            <p>{t('about.story2', { brand: BRAND_NAME, agency: AGENCY_NAME })}</p>
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">{AGENCY_NAME}</p>
            <p className="mt-1 text-xs text-secondary">
              {t('footer.license', { number: AGENCY_LICENSE_NUMBER })}
            </p>
          </div>
        </article>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {values.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(11,31,63,0.06)] md:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mist text-gold">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">{title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-secondary">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="rounded-3xl bg-navy px-6 py-12 text-center md:px-14 md:py-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            {t('about.ctaTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-light leading-relaxed text-white/70">
            {t('about.ctaDesc')}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordLead({ language: i18n.language, source: 'about' })}
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 bg-gold px-8 text-xs font-bold uppercase tracking-[0.15em] text-navy transition-colors duration-300 hover:bg-white"
          >
            <FaWhatsapp size={18} />
            {t('about.cta')}
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;
