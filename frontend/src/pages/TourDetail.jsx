import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { recordLead } from '../utils/leads';
import { getTourById } from '../data/tours';
import { resolveFaq } from '../content/faq';
import { BRAND_NAME } from '../config/agency';
import RevealImage from '../components/RevealImage';
import ImageLightbox from '../components/ImageLightbox';
import FaqAccordion from '../components/FaqAccordion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fallbackImage = '/images/tours/lusca-vip-yacht-tour/lusca-1.webp';

const TourDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const slot = new URLSearchParams(location.search).get('slot');

  const { t, i18n } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isRu = i18n.language === 'ru';
  const tour = getTourById(id);

  if (!tour) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 font-display text-3xl font-bold text-heading">{t('tourDetail.notFound')}</h2>
        <Link to="/" className="font-semibold text-primary hover:underline">
          {t('tourDetail.returnHome')}
        </Link>
      </div>
    );
  }

  const displayTitle = isRu && tour.titleRu ? tour.titleRu : tour.titleEn;
  const displayDescription = isRu && tour.descriptionRu ? tour.descriptionRu : tour.descriptionEn;
  const whatsappUrl = generateWhatsAppLink(i18n.language, tour.titleEn, slot, tour.contactPhone);
  // The QR always encodes the short English link: percent-encoded Cyrillic
  // text makes the URL ~4x longer, which turns the QR into an unscannably
  // dense pattern at this size.
  const qrWhatsappUrl = generateWhatsAppLink('en', tour.titleEn, slot, tour.contactPhone);
  const displayLocation = isRu ? (tour.locationRu || tour.locationEn) : tour.locationEn;
  const displayDuration = isRu ? (tour.durationRu || tour.durationEn) : tour.durationEn;
  const handleRequestClick = () =>
    recordLead({ tourId: tour.id, tourTitle: tour.titleEn, language: i18n.language, source: 'tour-detail', timeSlot: slot });
  const images = tour.imageUrls?.length ? tour.imageUrls : [fallbackImage];
  const faqItems = resolveFaq(tour.faq, i18n.language);
  const backTarget = slot ? `/yachts/${slot}` : '/';
  const slotTime = slot === 'day'
    ? t('yachtSelection.dayTour.time')
    : slot === 'sunset'
      ? t('yachtSelection.sunsetTour.time')
      : null;

  const categoryLabel = tour.category === 'YACHT'
    ? t('card.category.yacht')
    : tour.category === 'INCITY'
      ? t('card.category.incity')
      : tour.category === 'OUTCITY'
        ? t('card.category.outcity')
        : tour.category;

  return (
    <div className="min-h-screen bg-mist pb-28 text-ink lg:pb-20">
      <section className="relative isolate overflow-hidden bg-navy">
        <RevealImage
          src={images[0]}
          alt={displayTitle}
          tone="dark"
          containerClassName="absolute inset-0"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-navy/[0.65]" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/[0.55]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <Link
            to={backTarget}
            className="mb-8 inline-flex items-center border border-white/20 px-4 py-2 text-sm font-semibold text-white/[0.82] transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={17} className="mr-2" />
            {t('tourDetail.back')}
          </Link>

          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-navy">
                {categoryLabel}
              </span>
              {slotTime && (
                <span className="border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white">
                  {slotTime}
                </span>
              )}
              {displayLocation && (
                <span className="border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white">
                  {displayLocation}
                </span>
              )}
              {displayDuration && (
                <span className="border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white">
                  {displayDuration}
                </span>
              )}
            </div>

            <h1 className="max-w-4xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {displayTitle}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl bg-navy shadow-[0_12px_48px_rgba(11,31,63,0.12)]">
            {images.length === 1 ? (
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                aria-label={`${t('lightbox.view')}: ${displayTitle}`}
                className="block h-[48vh] min-h-[360px] w-full"
              >
                <RevealImage
                  src={images[0]}
                  alt={displayTitle}
                  tone="dark"
                  containerClassName="relative h-full w-full"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ) : (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                  nextEl: '.detail-swiper-next',
                  prevEl: '.detail-swiper-prev',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5200, disableOnInteraction: true }}
                loop
                className="tour-slider relative h-[48vh] min-h-[360px]"
              >
                {images.map((url, index) => (
                  <SwiperSlide key={url} className="bg-navy">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`${t('lightbox.view')}: ${displayTitle} ${index + 1}`}
                      className="block h-full w-full"
                    >
                      <RevealImage
                        src={url}
                        alt={`${displayTitle} ${index + 1}`}
                        tone="dark"
                        containerClassName="relative h-full w-full"
                        className="h-full w-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </button>
                  </SwiperSlide>
                ))}

                <button className="detail-swiper-prev absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition-transform hover:scale-105">
                  <ChevronLeft size={22} />
                </button>
                <button className="detail-swiper-next absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition-transform hover:scale-105">
                  <ChevronRight size={22} />
                </button>
              </Swiper>
            )}
          </div>

          <article className="rounded-2xl bg-surface p-6 shadow-[0_4px_24px_rgba(11,31,63,0.06)] md:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {t('tourDetail.eyebrow')}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-heading md:text-4xl">
              {displayTitle}
            </h2>
            <p className="mt-5 text-base font-light leading-8 text-secondary md:text-lg">
              {displayDescription}
            </p>
          </article>

          <article className="rounded-2xl bg-surface p-6 shadow-[0_4px_24px_rgba(11,31,63,0.06)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mist text-gold">
                <CheckCircle size={23} />
              </span>
              <h2 className="font-display text-2xl font-bold text-heading">
                {t('tourDetail.included')}
              </h2>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tour.includedItems?.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex items-center border border-line bg-mist px-4 py-3 text-sm font-medium text-ink"
                >
                  <span className="mr-3 h-2 w-2 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="hidden rounded-2xl bg-surface p-6 shadow-[0_12px_48px_rgba(11,31,63,0.10)] lg:block">
            <h3 className="font-display text-2xl font-bold text-heading">
              {t('tourDetail.interested')}
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-secondary">
              {t('tourDetail.contactDesc', { brand: BRAND_NAME })}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRequestClick}
              className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 bg-navy px-6 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-gold hover:text-navy dark:bg-gold dark:text-navy dark:hover:bg-white"
            >
              <FaWhatsapp size={18} />
              {t('tourDetail.whatsapp')}
            </a>

            <div className="mt-6 border-t border-line pt-6 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-secondary">{t('tourDetail.scan')}</p>
              <div className="inline-block border border-line bg-white p-3">
                <QRCodeSVG value={qrWhatsappUrl} size={112} level="M" />
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/20 bg-navy p-4 lg:hidden">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRequestClick}
              className="flex min-h-14 w-full items-center justify-center gap-2 bg-gold px-6 text-xs font-bold uppercase tracking-[0.15em] text-navy"
            >
              <FaWhatsapp size={18} />
              {t('tourDetail.whatsapp')}
            </a>
          </div>
        </aside>
      </section>

      {faqItems.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {t('tourDetail.faqEyebrow')}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-heading md:text-4xl">
              {t('tourDetail.faqTitle')}
            </h2>
          </div>

          <FaqAccordion
            items={faqItems}
            defaultOpenId={faqItems[0]?.id ?? null}
            twoColumn
            className="overflow-hidden rounded-2xl bg-surface shadow-[0_4px_24px_rgba(11,31,63,0.06)]"
          />
        </section>
      )}

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images.map((url, index) => ({
            src: url,
            alt: images.length > 1 ? `${displayTitle} ${index + 1}` : displayTitle,
          }))}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default TourDetail;
