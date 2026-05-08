import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Anchor, ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TourCard from '../components/TourCard';

const BASE = 'http://localhost:8080/api/tours';

/* ── Golden glow wrapper for yacht cards ───────────────── */
const GoldenCard = ({ children }) => (
  <div
    className="rounded-2xl"
    style={{
      boxShadow:
        '0 0 0 1px rgba(234,179,8,0.28), 0 6px 40px rgba(234,179,8,0.14)',
      transition: 'box-shadow 0.35s ease, transform 0.35s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow =
        '0 0 0 2px rgba(234,179,8,0.60), 0 12px 56px rgba(234,179,8,0.32)';
      e.currentTarget.style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow =
        '0 0 0 1px rgba(234,179,8,0.28), 0 6px 40px rgba(234,179,8,0.14)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {children}
  </div>
);

/* ── Skeleton placeholder ──────────────────────────────── */
const SkeletonGrid = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-[28rem] rounded-2xl animate-pulse"
        style={{ background: 'var(--surface)' }}
      />
    ))}
  </div>
);

const YachtListing = () => {
  const { t } = useTranslation();
  const { slot } = useParams();
  const [yachts, setYachts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE}/yachts`)
      .then(r => r.json())
      .then(data => setYachts(data))
      .catch(err => console.error('Error fetching yachts:', err))
      .finally(() => setLoading(false));
  }, []);

  const slotTitle = slot === 'day' 
    ? t('yachtSelection.dayTour.title') 
    : t('yachtSelection.sunsetTour.title');
  const slotTime = slot === 'day' 
    ? t('yachtSelection.dayTour.time') 
    : t('yachtSelection.sunsetTour.time');

  return (
    <div className="pb-24">

      {/* ── Ultra-minimalist sleek header ─────────────────── */}
      <div className="bg-transparent" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <Link
              to="/yachts"
              className="inline-flex items-center text-sm md:text-base font-medium transition-colors hover:text-emerald-500"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft size={18} className="mr-2" />
              {t('yachtSelection.title')}
            </Link>

            <div className="flex items-center gap-3">
              {slot === 'day' ? <Sun className="text-yellow-500" size={24} /> : <Moon className="text-orange-500" size={24} />}
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                <h1 className="text-xl md:text-2xl font-bold leading-none" style={{ color: 'var(--text)' }}>
                  {slotTitle}
                </h1>
                <span className="hidden md:inline opacity-30" style={{ color: 'var(--text-secondary)' }}>|</span>
                <p className="text-base md:text-lg font-semibold leading-none" style={{ color: 'var(--text-secondary)' }}>
                  {slotTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Yacht grid ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        {loading ? (
          <SkeletonGrid count={3} />
        ) : yachts.length === 0 ? (
          <p className="text-center text-lg py-12 md:py-20" style={{ color: 'var(--text-secondary)' }}>
            {t('yachts.empty')}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {yachts.map(tour => (
              <GoldenCard key={tour.id}>
                <TourCard tour={tour} large slot={slot} />
              </GoldenCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default YachtListing;
