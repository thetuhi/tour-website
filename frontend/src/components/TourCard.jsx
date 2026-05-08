import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TourCard = ({ tour, large = false, slot = null }) => {
  const { i18n, t } = useTranslation();
  const isRu = i18n.language === 'ru';

  const title       = isRu && tour.titleRu       ? tour.titleRu       : tour.titleEn;
  const description = isRu && tour.descriptionRu ? tour.descriptionRu : tour.descriptionEn;

  /* Use the first image from the imageUrls array, or a fallback */
  const coverImage = (tour.imageUrls && tour.imageUrls.length > 0)
    ? tour.imageUrls[0]
    : 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200';

  return (
    <Link to={`/tour/${tour.id}${slot ? '?slot=' + slot : ''}`} className="group block h-full">
      <div
        className="overflow-hidden h-full flex flex-col rounded-2xl"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Image */}
        <div className={`relative overflow-hidden flex-shrink-0 ${large ? 'h-56 md:h-80' : 'h-48 md:h-56'}`}>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          {/* Category badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 bg-primary/90 text-slate-900 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider">
              {tour.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex-grow flex flex-col justify-between z-20 relative">
          <div>
            <h3
              className={`font-bold mb-2 group-hover:text-primary transition-colors ${large ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}
              style={{ color: 'var(--text)' }}
            >
              {title}
            </h3>
            <p className="line-clamp-2 md:line-clamp-3 text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
              {description}
            </p>
          </div>
          <div className="mt-4 md:mt-5 flex items-center text-primary text-xs md:text-sm font-semibold group-hover:translate-x-2 transition-transform">
            {t('card.viewDetails')} <ArrowRight size={14} md:size={15} className="ml-1" />
          </div>
        </div>

      </div>
    </Link>
  );
};

export default TourCard;
