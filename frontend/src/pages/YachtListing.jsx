import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Music, Utensils, Waves, Wifi } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { generateWhatsAppLink } from '../utils/whatsapp';

const BASE = 'http://localhost:8080/api/tours';

const amenityIcons = [
  { icon: Wifi, label: 'WiFi' },
  { icon: Utensils, label: 'Food' },
  { icon: Waves, label: 'Swim' },
  { icon: Music, label: 'Music' },
  { icon: Camera, label: 'Photos' },
];

const SkeletonGrid = ({ count = 3 }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="h-[580px] animate-pulse rounded-[20px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]" />
    ))}
  </div>
);

const YachtCard = ({ tour, slot, lang, viewDetailsLabel, whatsappLabel }) => {
  const isRu = lang === 'ru';
  const title = isRu && tour.titleRu ? tour.titleRu : tour.titleEn;
  const description = isRu && tour.descriptionRu ? tour.descriptionRu : tour.descriptionEn;
  const coverImage = tour.imageUrls?.[0] || '/images/Yatch_Lusca.jpg';
  const whatsappUrl = generateWhatsAppLink(lang, tour.titleEn, slot);

  return (
    <article className="group flex h-full min-h-[580px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]">
      <Link to={`/tour/${tour.id}${slot ? '?slot=' + slot : ''}`} className="relative block h-60 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute right-4 top-4 rounded-lg bg-[#D4AF37] px-3 py-1.5 text-xs font-bold uppercase text-white shadow-lg">
          VIP
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div>
          <h2
            className="text-2xl font-bold leading-tight text-[#0B1F3F]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {title}
          </h2>

          <p className="mt-4 line-clamp-3 text-sm font-light leading-relaxed text-[#687386]">
            {description}
          </p>

          <div className="mt-5">
            <p className="mb-3 text-sm font-bold text-[#0B1F3F]">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {amenityIcons.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E6ECF2] text-[#00B4D8]"
                >
                  <Icon size={18} strokeWidth={2} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <Link
            to={`/tour/${tour.id}${slot ? '?slot=' + slot : ''}`}
            className="mb-4 inline-flex items-center text-sm font-bold text-[#00B4D8]"
          >
            {viewDetailsLabel}
            <ArrowRight size={16} className="ml-1" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] px-6 text-base font-semibold text-white shadow-[0_4px_16px_rgba(0,180,216,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#0077B6] hover:to-[#005f8c] hover:shadow-[0_6px_24px_rgba(0,180,216,0.40)]"
          >
            <FaWhatsapp size={20} />
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
    fetch(`${BASE}/yachts`)
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
    <main className="min-h-screen bg-[#F5F7FA] pb-20 text-[#2C3E50]">
      <section className="relative isolate overflow-hidden bg-[#0B1F3F]">
        <img
          src="/images/Yatch_Lusca_2.jpg"
          alt={slotTitle}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.38]"
          style={{ objectPosition: 'center 52%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3F] via-[#0B1F3F]/[0.86] to-[#0B1F3F]/40" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/yachts"
            className="mb-8 inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/[0.82] transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={17} className="mr-2" />
            {t('yachtSelection.title')}
          </Link>

          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase text-[#D4AF37]">{slotTime}</p>
            <h1
              className="text-4xl font-bold leading-tight text-white md:text-6xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
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
          <p className="rounded-3xl bg-white px-6 py-16 text-center text-lg font-medium text-[#8E99AB] shadow-sm">
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
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default YachtListing;
