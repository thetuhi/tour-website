import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TourCard from '../components/TourCard';
import { Anchor, Building2, Globe, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BASE = 'http://localhost:8080/api/tours';

/* ── Skeleton placeholder ──────────────────────────────── */
const SkeletonGrid = ({ count = 3, cols = 3, tall = false }) => (
  <div
    className={`grid gap-8 grid-cols-1 ${
      cols === 2 ? 'md:grid-cols-2' :
      cols === 4 ? 'md:grid-cols-2 lg:grid-cols-4' :
                   'md:grid-cols-2 lg:grid-cols-3'
    }`}
  >
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`${tall ? 'h-[28rem]' : 'h-72'} rounded-2xl animate-pulse`}
        style={{ background: 'var(--surface)' }}
      />
    ))}
  </div>
);

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

/* ── Section divider ───────────────────────────────────── */
const Divider = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
    <div style={{ borderTop: '1px solid var(--border)' }} />
  </div>
);

/* ══════════════════════════════════════════════════════════
   Home — Three-tier layout: Yachts → In-City → Out-of-City
   ══════════════════════════════════════════════════════════ */
const Home = () => {
  const { t } = useTranslation();
  const [yachts, setYachts]         = useState([]);
  const [inCity, setInCity]         = useState([]);
  const [outOfCity, setOutOfCity]   = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${BASE}/yachts`).then(r => r.json()),
      fetch(`${BASE}/in-city`).then(r => r.json()),
      fetch(`${BASE}/out-of-city`).then(r => r.json()),
    ])
      .then(([y, ic, oc]) => {
        setYachts(y);
        setInCity(ic);
        setOutOfCity(oc);
      })
      .catch(err => console.error('Error fetching tours:', err))
      .finally(() => setLoading(false));
  }, []);

  /* Pre-translate yacht tags */
  const YACHT_TAGS = [
    t('yachts.tags.crew'),
    t('yachts.tags.dining'),
    t('yachts.tags.snorkel'),
    t('yachts.tags.champagne'),
  ];

  return (
    <div className="pb-24">

      {/* ════════════════════════════════════════════════════
          HERO — Kaleiçi Marina, Antalya
         ════════════════════════════════════════════════════ */}
      <div
        id="hero-section-wrapper"
        style={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.72)), url('/images/Antalya-kapak.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundColor: '#000',
        }}
      >
        <div className="text-center z-10 px-4 max-w-4xl mx-auto">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-yellow-400 uppercase mb-4">
            {t('hero.location')}
          </p>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.82)' }}>
            {t('hero.subtitle')}
          </p>
          <button
            onClick={() => document.getElementById('yachts')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-sky-500 text-slate-900 font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            {t('hero.cta')}
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          TIER 1 — 💎 Premium Yacht Charters
         ════════════════════════════════════════════════════ */}
      <section id="yachts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-24">
        <div className="flex items-center space-x-3 mb-3">
          <Anchor className="text-yellow-400" size={24} md:size={30} />
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)' }}>
            {t('yachts.title')}
          </h2>
        </div>
        <p className="text-sm md:text-base mb-3 ml-1" style={{ color: 'var(--text-secondary)' }}>
          {t('yachts.subtitle')}
        </p>
        {/* Premium tags */}
        <div className="flex gap-2 mb-8 md:mb-10 ml-1 flex-wrap">
          {YACHT_TAGS.map(label => (
            <span
              key={label}
              className="text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full border font-medium"
              style={{
                borderColor: 'rgba(234,179,8,0.40)',
                color: '#eab308',
                background: 'rgba(234,179,8,0.06)',
              }}
            >
              ✦ {label}
            </span>
          ))}
        </div>

        <div className="relative group overflow-hidden rounded-3xl border border-yellow-500/20 min-h-[300px] md:min-h-[400px] flex items-center">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110"
            style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('/images/Yatch_Lusca.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          <div className="relative z-10 max-w-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              {t('yachtSelection.title')}
            </h3>
            <p className="text-lg md:text-xl text-white/80 mb-8 drop-shadow-md">
              {t('yachtSelection.subtitle')}
            </p>
            
            <Link
              to="/yachts"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(234,179,8,0.4)]"
              style={{
                background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
                color: '#0f172a',
              }}
            >
              <Anchor size={20} />
              {t('yachts.viewAll')}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </section>

      <Divider />

      <div id="destinations" className="scroll-mt-24"></div>

      {/* ════════════════════════════════════════════════════
          TIER 2 — 🏛️ Discover Antalya (In-City)
         ════════════════════════════════════════════════════ */}
      <section id="in-city" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        <div className="flex items-center space-x-3 mb-3">
          <Building2 className="text-primary" size={24} md:size={30} />
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)' }}>
            {t('inCity.title')}
          </h2>
        </div>
        <p className="text-sm md:text-base mb-8 md:mb-10 ml-1" style={{ color: 'var(--text-secondary)' }}>
          {t('inCity.subtitle')}
        </p>

        {loading ? (
          <SkeletonGrid count={3} cols={3} />
        ) : inCity.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>{t('inCity.empty')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {inCity.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </section>

      <Divider />

      {/* ════════════════════════════════════════════════════
          TIER 3 — 🌍 Beyond Antalya (Out-of-City Excursions)
         ════════════════════════════════════════════════════ */}
      <section id="out-of-city" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        <div className="flex items-center space-x-3 mb-3">
          <Globe className="text-emerald-400" size={24} md:size={30} />
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)' }}>
            {t('outOfCity.title')}
          </h2>
        </div>
        <p className="text-sm md:text-base mb-8 md:mb-10 ml-1" style={{ color: 'var(--text-secondary)' }}>
          {t('outOfCity.subtitle')}
        </p>

        {loading ? (
          <SkeletonGrid count={2} cols={2} />
        ) : outOfCity.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>{t('outOfCity.empty')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
            {outOfCity.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
