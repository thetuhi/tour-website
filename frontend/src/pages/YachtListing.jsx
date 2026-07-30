import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { generateWhatsAppLink, generateTelegramLink } from '../utils/whatsapp';
import { recordLead } from '../utils/leads';
import { getToursByCategory, getCoverImage } from '../data/tours';
import RevealImage from '../components/RevealImage';

const YachtCard = ({ tour, slot, lang, viewDetailsLabel, whatsappLabel, telegramLabel, includedLabel }) => {
  const isRu = lang === 'ru';
  const title = isRu && tour.titleRu ? tour.titleRu : tour.titleEn;
  const description = isRu && tour.descriptionRu ? tour.descriptionRu : tour.descriptionEn;
  const coverImage = getCoverImage(tour);
  const whatsappUrl = generateWhatsAppLink(lang, tour.titleEn, slot, tour.contactPhone);
  const telegramUrl = generateTelegramLink(tour.contactPhone);
  const included = (isRu && tour.includedItemsRu) || tour.includedItemsEn || [];
  const highlights = included.slice(0, 4);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_4px_20px_rgba(11,31,63,0.06)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_14px_36px_rgba(11,31,63,0.16)]">
      <Link to={`/tour/${tour.id}${slot ? '?slot=' + slot : ''}`} className="relative block h-60 overflow-hidden">
        <RevealImage
          src={coverImage}
          alt={title}
          tone="light"
          containerClassName="absolute inset-0"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        <span className="absolute right-4 top-4 bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-navy shadow-lg">
          VIP
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div>
          <h2 className="font-display text-2xl font-bold leading-tight text-heading">
            {title}
          </h2>

          <p className="mt-4 line-clamp-3 text-sm font-light leading-relaxed text-secondary">
            {description}
          </p>

          {highlights.length > 0 && (
            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-heading">{includedLabel}</p>
              <div className="flex flex-wrap gap-2">
                {highlights.map(item => (
                  <span
                    key={item}
                    className="border border-line px-3 py-1.5 text-[11px] font-medium text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6">
          <Link
            to={`/tour/${tour.id}${slot ? '?slot=' + slot : ''}`}
            className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
          >
            {viewDetailsLabel}
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordLead({ tourId: tour.id, tourTitle: tour.titleEn, language: lang, source: 'yacht-listing', timeSlot: slot })}
              className="flex min-h-14 flex-1 items-center justify-center gap-2 bg-navy px-6 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-gold hover:text-navy dark:bg-gold dark:text-navy dark:hover:bg-white"
            >
              <FaWhatsapp size={18} />
              {whatsappLabel}
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordLead({ tourId: tour.id, tourTitle: tour.titleEn, language: lang, source: 'yacht-listing-telegram', timeSlot: slot })}
              aria-label={telegramLabel}
              title={telegramLabel}
              className="flex min-h-14 w-14 shrink-0 items-center justify-center border border-primary text-primary transition-colors duration-300 hover:bg-primary hover:text-navy"
            >
              <FaTelegramPlane size={20} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

const YachtListing = () => {
  const { t, i18n } = useTranslation();
  const { slot } = useParams();
  const yachts = getToursByCategory('YACHT');

  const slotTitle = slot === 'day'
    ? t('yachtSelection.dayTour.title')
    : slot === 'sunset'
    ? t('yachtSelection.sunsetTour.title')
    : t('yachts.title');

  const slotEyebrow = slot === 'day'
    ? t('yachtSelection.dayTour.time')
    : slot === 'sunset'
    ? t('yachtSelection.sunsetTour.time')
    : t('yachts.eyebrow');

  return (
    <div className="min-h-screen bg-mist pb-20 text-ink">
      <section className="relative isolate overflow-hidden bg-navy">
        <RevealImage
          src="/images/tours/lusca-vip-yacht-tour/lusca-2.webp"
          alt={slotTitle}
          tone="dark"
          containerClassName="absolute inset-0"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 52%' }}
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-navy/[0.62]" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/[0.86] to-navy/40" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-8 inline-flex items-center border border-white/20 px-4 py-2 text-sm font-semibold text-white/[0.82] transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={17} className="mr-2" />
            {t('policy.back')}
          </Link>

          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{slotEyebrow}</p>
            <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {slotTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/[0.78] md:text-lg">
              {t('yachts.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        {yachts.length === 0 ? (
          <p className="rounded-2xl bg-surface px-6 py-16 text-center text-lg font-medium text-secondary shadow-sm">
            {t('yachts.empty')}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {yachts.map(tour => (
              <YachtCard
                key={tour.id}
                tour={tour}
                slot={slot}
                lang={i18n.language}
                viewDetailsLabel={t('card.viewDetails')}
                whatsappLabel={t('tourDetail.whatsapp')}
                telegramLabel={t('contact.telegram')}
                includedLabel={t('tourDetail.included')}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default YachtListing;
