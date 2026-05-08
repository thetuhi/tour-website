import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Music,
  Utensils,
  Waves,
  Wifi,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { generateWhatsAppLink } from '../utils/whatsapp';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const amenityIcons = [
  { icon: Wifi, label: 'WiFi' },
  { icon: Utensils, label: 'Dining' },
  { icon: Waves, label: 'Swimming' },
  { icon: Music, label: 'Music' },
  { icon: Camera, label: 'Photos' },
];

const fallbackImage = '/images/Yatch_Lusca.jpg';

const TourDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const slot = new URLSearchParams(location.search).get('slot');

  const { t, i18n } = useTranslation();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const isRu = i18n.language === 'ru';

  useEffect(() => {
    fetch(`http://localhost:8080/api/tours/${id}`)
      .then(response => response.json())
      .then(data => setTour(data))
      .catch(error => console.error('Error fetching tour:', error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#F5F7FA]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#E6ECF2] border-t-[#00B4D8]" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-[#0B1F3F]">{t('tourDetail.notFound')}</h2>
        <Link to="/" className="font-semibold text-[#00B4D8] hover:underline">
          {t('tourDetail.returnHome')}
        </Link>
      </div>
    );
  }

  const displayTitle = isRu && tour.titleRu ? tour.titleRu : tour.titleEn;
  const displayDescription = isRu && tour.descriptionRu ? tour.descriptionRu : tour.descriptionEn;
  const whatsappUrl = generateWhatsAppLink(i18n.language, tour.titleEn, slot);
  const images = tour.imageUrls?.length ? tour.imageUrls : [fallbackImage];
  const backTarget = slot ? `/yachts/${slot}` : '/';
  const slotTime = slot === 'day'
    ? t('yachtSelection.dayTour.time')
    : slot === 'sunset'
      ? t('yachtSelection.sunsetTour.time')
      : null;

  return (
    <main className="min-h-screen bg-[#F5F7FA] pb-28 text-[#2C3E50] lg:pb-20">
      <section className="relative isolate overflow-hidden bg-[#0B1F3F]">
        <img
          src={images[0]}
          alt={displayTitle}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.35]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3F] via-[#0B1F3F]/90 to-[#0B1F3F]/[0.55]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,_rgba(0,180,216,0.16),_transparent_42%,_rgba(212,175,55,0.16))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <Link
            to={backTarget}
            className="mb-8 inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/[0.82] transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={17} className="mr-2" />
            {t('tourDetail.back')}
          </Link>

          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-[#D4AF37] px-3 py-1.5 text-xs font-bold uppercase text-white shadow-lg">
                {tour.category === 'YACHT' ? 'VIP Yacht' : tour.category}
              </span>
              {slotTime && (
                <span className="rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase text-white backdrop-blur">
                  {slotTime}
                </span>
              )}
            </div>

            <h1
              className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {displayTitle}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-[28px] bg-[#0B1F3F] shadow-[0_12px_48px_rgba(0,0,0,0.12)]">
            {images.length === 1 ? (
              <div className="h-[48vh] min-h-[360px]">
                <img src={images[0]} alt={displayTitle} className="h-full w-full object-cover" />
              </div>
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
                  <SwiperSlide key={url} className="bg-[#0B1F3F]">
                    <img
                      src={url}
                      alt={`${displayTitle} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </SwiperSlide>
                ))}

                <button className="detail-swiper-prev absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0B1F3F] shadow-lg backdrop-blur transition-transform hover:scale-105">
                  <ChevronLeft size={22} />
                </button>
                <button className="detail-swiper-next absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0B1F3F] shadow-lg backdrop-blur transition-transform hover:scale-105">
                  <ChevronRight size={22} />
                </button>
              </Swiper>
            )}
          </div>

          <article className="rounded-[24px] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:p-8">
            <p className="mb-3 text-sm font-bold uppercase text-[#00B4D8]">Experience</p>
            <h2
              className="text-3xl font-bold leading-tight text-[#0B1F3F] md:text-4xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {displayTitle}
            </h2>
            <p className="mt-5 text-base font-light leading-8 text-[#687386] md:text-lg">
              {displayDescription}
            </p>
          </article>

          <article className="rounded-[24px] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F8FC] text-[#00B4D8]">
                <CheckCircle size={23} />
              </span>
              <h2
                className="text-2xl font-bold text-[#0B1F3F]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t('tourDetail.included')}
              </h2>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tour.includedItems?.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex items-center rounded-2xl border border-[#E6ECF2] bg-[#F5F7FA] px-4 py-3 text-sm font-semibold text-[#2C3E50]"
                >
                  <span className="mr-3 h-2 w-2 rounded-full bg-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="hidden rounded-[24px] bg-white p-6 shadow-[0_12px_48px_rgba(0,0,0,0.10)] lg:block">
            <div className="grid grid-cols-5 gap-2">
              {amenityIcons.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  title={label}
                  className="flex h-11 items-center justify-center rounded-xl border border-[#E6ECF2] text-[#00B4D8]"
                >
                  <Icon size={18} strokeWidth={2} />
                </span>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] px-6 text-base font-semibold text-white shadow-[0_4px_16px_rgba(0,180,216,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#0077B6] hover:to-[#005f8c] hover:shadow-[0_6px_24px_rgba(0,180,216,0.40)]"
            >
              <FaWhatsapp size={20} />
              {t('tourDetail.whatsapp')}
            </a>

            <div className="mt-6 border-t border-[#E6ECF2] pt-6 text-center">
              <p className="mb-3 text-xs font-bold uppercase text-[#8E99AB]">{t('tourDetail.scan')}</p>
              <div className="inline-block rounded-2xl border border-[#E6ECF2] bg-white p-3">
                <QRCodeSVG value={whatsappUrl} size={112} level="M" />
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/20 bg-[#0B1F3F]/[0.92] p-4 backdrop-blur-xl lg:hidden">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] px-6 text-base font-semibold text-white shadow-[0_6px_24px_rgba(0,180,216,0.35)]"
            >
              <FaWhatsapp size={20} />
              {t('tourDetail.whatsapp')}
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default TourDetail;
