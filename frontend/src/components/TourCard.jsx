import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import RevealImage from './RevealImage';
import { getCoverImage } from '../data/tours';

const CATEGORY_KEYS = {
  YACHT: 'card.category.yacht',
  INCITY: 'card.category.incity',
  OUTCITY: 'card.category.outcity',
};

/** Peak tilt at the card corners, in degrees. */
const MAX_TILT = 7;
const SPRING = { stiffness: 260, damping: 22, mass: 0.6 };

const TourCard = ({ tour, large = false, slot = null }) => {
  const { i18n, t } = useTranslation();
  const isRu = i18n.language === 'ru';
  const reduceMotion = useReducedMotion();

  /* Pointer position within the card, normalised to -0.5…0.5. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), SPRING);
  /* Specular sheen that follows the cursor across the card face. */
  const glareX = useTransform(px, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(py, [-0.5, 0.5], ['0%', '100%']);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.16), transparent 55%)`;

  const handlePointerMove = (event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - bounds.left) / bounds.width - 0.5);
    py.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetTilt = () => {
    px.set(0);
    py.set(0);
  };

  const title       = isRu && tour.titleRu       ? tour.titleRu       : tour.titleEn;
  const description = isRu && tour.descriptionRu ? tour.descriptionRu : tour.descriptionEn;

  const categoryKey = tour.category ? CATEGORY_KEYS[tour.category.toUpperCase()] : null;
  const categoryLabel = categoryKey ? t(categoryKey) : tour.category;
  const location = isRu ? (tour.locationRu || tour.locationEn) : tour.locationEn;
  const cardLabel = location || categoryLabel;

  const coverImage = getCoverImage(tour);

  return (
    <Link
      to={`/tour/${tour.id}${slot ? '?slot=' + slot : ''}`}
      className="group block h-full"
      style={{ perspective: 1200 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <m.article
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full flex flex-col overflow-hidden rounded-2xl bg-surface border border-line transition-[box-shadow,border-color] duration-300 hover:border-gold/40 hover:shadow-[0_18px_44px_rgba(11,31,63,0.16)]"
      >
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
              className={`font-display font-bold text-heading mb-2.5 leading-snug group-hover:text-primary transition-colors ${large ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}
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

        {/* Cursor-tracking sheen, decorative, above content but never clickable */}
        {!reduceMotion && (
          <m.span
            aria-hidden="true"
            style={{ backgroundImage: glare }}
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </m.article>
    </Link>
  );
};

export default TourCard;
