import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RevealImage from './RevealImage';

const CATEGORY_KEYS = {
  YACHT: 'card.category.yacht',
  INCITY: 'card.category.incity',
  OUTCITY: 'card.category.outcity',
};

const TourCard = ({ tour, large = false, slot = null }) => {
  const { i18n, t } = useTranslation();
  const isRu = i18n.language === 'ru';

  const title       = isRu && tour.titleRu       ? tour.titleRu       : tour.titleEn;
  const description = isRu && tour.descriptionRu ? tour.descriptionRu : tour.descriptionEn;

  const categoryKey = tour.category ? CATEGORY_KEYS[tour.category.toUpperCase()] : null;
  const categoryLabel = categoryKey ? t(categoryKey) : tour.category;
  const location = isRu ? (tour.locationRu || tour.locationEn) : tour.locationEn;
  const cardLabel = location || categoryLabel;

  /* Use the first image from the imageUrls array, or a fallback */
  const coverImage = (tour.imageUrls && tour.imageUrls.length > 0)
    ? tour.imageUrls[0]
    : 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200';

  return (
    <Link to={`/tour/${tour.id}${slot ? '?slot=' + slot : ''}`} className="group block h-full">
      <article className="h-full flex flex-col overflow-hidden rounded-2xl bg-white border border-line transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_18px_44px_rgba(11,31,63,0.10)]">
        {/* Image */}
        <div className={`relative overflow-hidden flex-shrink-0 ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <RevealImage
            src={coverImage}
            alt={title}
            tone="light"
            containerClassName="absolute inset-0"
            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          {/* Location / category label */}
          <span className="absolute bottom-4 left-4 z-10 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-white/95">
            {cardLabel}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3
              className={`font-display font-bold text-navy mb-2.5 leading-snug group-hover:text-primary transition-colors ${large ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}
            >
              {title}
            </h3>
            <p className="line-clamp-2 md:line-clamp-3 text-xs md:text-sm font-light leading-relaxed text-secondary">
              {description}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {t('card.viewDetails')}
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default TourCard;
