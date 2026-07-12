import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { recordLead } from '../utils/leads';
import { TOURS_API } from '../utils/api';
import RevealImage from '../components/RevealImage';

const SkeletonGrid = ({ count = 3 }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="h-[560px] animate-pulse rounded-2xl bg-white shadow-[0_4px_24px_rgba(11,31,63,0.06)]" />
    ))}
  </div>
);

const YachtCard = ({ tour, slot, lang, viewDetailsLabel, whatsappLabel, includedLabel }) => {
  const isRu = lang === 'ru';
  const title = isRu && tour.titleRu ? tour.titleRu : tour.titleEn;
  const description = isRu && tour.descriptionRu ? tour.descriptionRu : tour.descriptionEn;
  const coverImage = tour.imageUrls?.[0] || '/images/tours/lusca-vip-yacht-tour/Yatch_Lusca.jpg';
  const whatsappUrl = generateWhatsAppLink(lang, tour.titleEn, slot, tour.contactPhone);
  const highlights = tour.includedItems?.slice(0, 4) || [];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(11,31,63,0.06)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(11,31,63,0.12)]">
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
          <h2 className="font-display text-2xl font-bold leading-tight text-navy">
            {title}
          </h2>

          <p className="mt-4 line-clamp-3 text-sm font-light leading-relaxed text-secondary">
            {description}
          </p>

          {highlights.length > 0 && (
            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy">{includedLabel}</p>
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

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordLead({ tourId: tour.id, language: lang, source: 'yacht-listing', timeSlot: slot })}
            className="flex min-h-14 w-full items-center justify-center gap-2 bg-navy px-6 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-gold hover:text-navy"
          >
            <FaWhatsapp size={18} />
            {whatsappLabel}
          </a>
        </div>
      </div>
    </article>
  );
};

const YachtListing = () => {
  const { t, i18n } = useTranslation();
  const { slot } = useParams();
  const [yachts, setYachts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${TOURS_API}/yachts`)
      .then(response => response.json())
      .then(data => setYachts(data))
      .catch(error => console.error('Error fetching yachts:', error))
      .finally(() => setLoading(false));
  }, []);

  const slotTitle = slot === 'day'
    ? t('yachtSelection.dayTour.title')
    : t('yachtSelection.sunsetTour.title');

  const slotTime = slot === 'day'
    ? t('yachtSelection.dayTour.time')
    : t('yachtSelection.sunsetTour.time');

  return (
    <main className="min-h-screen bg-mist pb-20 text-ink">
      <section className="relative isolate overflow-hidden bg-navy">
        <RevealImage
          src="/images/tours/lusca-vip-yacht-tour/Yatch_Lusca_2.jpg"
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
            to="/yachts"
            className="mb-8 inline-flex items-center border border-white/20 px-4 py-2 text-sm font-semibold text-white/[0.82] transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={17} className="mr-2" />
            {t('yachtSelection.title')}
          </Link>

          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{slotTime}</p>
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
        {loading ? (
          <SkeletonGrid count={3} />
        ) : yachts.length === 0 ? (
          <p className="rounded-2xl bg-white px-6 py-16 text-center text-lg font-medium text-secondary shadow-sm">
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
                includedLabel={t('tourDetail.included')}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default YachtListing;
