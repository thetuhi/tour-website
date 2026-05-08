import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { MessageCircle, CheckCircle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TourDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const slot = queryParams.get('slot');

  const { t, i18n } = useTranslation();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const isRu = i18n.language === 'ru';

  useEffect(() => {
    fetch(`http://localhost:8080/api/tours/${id}`)
      .then(res => res.json())
      .then(data => {
        setTour(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tour:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
          {t('tourDetail.notFound')}
        </h2>
        <Link to="/" className="text-primary hover:underline">
          {t('tourDetail.returnHome')}
        </Link>
      </div>
    );
  }

  const displayTitle       = isRu && tour.titleRu       ? tour.titleRu       : tour.titleEn;
  const displayDescription = isRu && tour.descriptionRu ? tour.descriptionRu : tour.descriptionEn;
  const whatsappUrl        = generateWhatsAppLink(i18n.language, tour.titleEn, slot);

  /* Gather images — fall back to a single placeholder if empty */
  const images = (tour.imageUrls && tour.imageUrls.length > 0)
    ? tour.imageUrls
    : ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <Link
        to="/"
        className="inline-flex items-center mb-6 md:mb-8 transition-colors hover:text-primary"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft size={18} md:size={20} className="mr-2" />
        {t('tourDetail.back')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

        {/* Left: Image Slider + Details */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">

          {/* ── Swiper Image Slider ──────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden tour-slider bg-black"
            style={{ border: '1px solid var(--border)' }}
          >
            {images.length === 1 ? (
              /* Single image — no slider needed */
              <div className="h-[40vh] md:h-[60vh] flex items-center justify-center">
                <img
                  src={images[0]}
                  alt={displayTitle}
                  className="w-auto h-full max-w-full max-h-full mx-auto object-contain"
                />
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                  nextEl: '.swiper-btn-next',
                  prevEl: '.swiper-btn-prev',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: true }}
                loop={true}
                className="h-[40vh] md:h-[60vh] relative"
              >
                {images.map((url, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center bg-black">
                    <img
                      src={url}
                      alt={`${displayTitle} — ${idx + 1}`}
                      className="w-auto h-full max-w-full max-h-full mx-auto object-contain"
                    />
                  </SwiperSlide>
                ))}

                {/* Custom navigation arrows */}
                <button
                  className="swiper-btn-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
                  style={{ background: 'rgba(0,0,0,0.45)', color: '#fff' }}
                >
                  <ChevronLeft size={18} md:size={22} />
                </button>
                <button
                  className="swiper-btn-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
                  style={{ background: 'rgba(0,0,0,0.45)', color: '#fff' }}
                >
                  <ChevronRight size={18} md:size={22} />
                </button>
              </Swiper>
            )}
          </div>

          <div className="glass-panel p-6 md:p-8">
            <div className="mb-4">
              <span className="px-3 py-1 bg-primary/20 text-primary text-xs md:text-sm font-bold rounded-full uppercase tracking-wider">
                {tour.category}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6" style={{ color: 'var(--text)' }}>
              {displayTitle}
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {displayDescription}
            </p>
          </div>

          <div className="glass-panel p-6 md:p-8 pb-32 lg:pb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center" style={{ color: 'var(--text)' }}>
              <CheckCircle className="text-primary mr-3" size={20} md:size={24} />
              {t('tourDetail.included')}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {tour.includedItems && tour.includedItems.map((item, index) => (
                <li key={index} className="flex items-center text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Contact Card */}
        <div className="lg:col-span-1">
          <div className="hidden lg:block glass-panel p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>
              {t('tourDetail.interested')}
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              {t('tourDetail.contactDesc')}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium tracking-wide py-2.5 px-6 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-emerald-900/20 mb-6"
            >
              <FaWhatsapp className="mr-2" size={18} />
              {t('tourDetail.whatsapp')}
            </a>

            {/* QR Code */}
            <div className="hidden md:block text-center pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              <p
                className="text-[10px] mb-3 uppercase tracking-[0.2em] font-semibold"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('tourDetail.scan')}
              </p>
              <div className="bg-white p-2 rounded-lg inline-block">
                <QRCodeSVG value={whatsappUrl} size={100} level="M" />
              </div>
            </div>
          </div>

          {/* Mobile Sticky Booking Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 backdrop-blur-lg border-t" style={{ background: 'var(--glass-bg)', borderColor: 'var(--border)' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 active:scale-95 text-white text-sm font-semibold tracking-wide py-3.5 px-6 rounded-full flex items-center justify-center transition-all shadow-xl shadow-emerald-900/40"
            >
              <FaWhatsapp className="mr-2" size={20} />
              {t('tourDetail.whatsapp')}
            </a>
          </div>
        </div>

      </div>
    </div>

  );
};

export default TourDetail;
