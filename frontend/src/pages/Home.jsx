import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TourCard from '../components/TourCard';
import RevealImage from '../components/RevealImage';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TOURS_API } from '../utils/api';

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
        className={`${tall ? 'h-[30rem]' : 'h-[24rem]'} rounded-2xl animate-pulse bg-white border border-line`}
      />
    ))}
  </div>
);

/* ── Editorial section header ──────────────────────────── */
const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <header className="max-w-3xl mb-10 md:mb-14">
    <p className="mb-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] md:tracking-[0.3em] text-gold">
      {eyebrow}
    </p>
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-navy">
      {title}
    </h2>
    <p className="mt-4 text-base md:text-lg font-light leading-relaxed text-secondary">
      {subtitle}
    </p>
  </header>
);

/* ── Section divider ───────────────────────────────────── */
const Divider = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-28">
    <div className="border-t border-line" />
  </div>
);

/* ══════════════════════════════════════════════════════════
   Home — Three-tier layout: Yachts → In-City → Out-of-City
   ══════════════════════════════════════════════════════════ */
const Home = () => {
  const { t } = useTranslation();
  const [inCity, setInCity]         = useState([]);
  const [outOfCity, setOutOfCity]   = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${TOURS_API}/in-city`).then(r => r.json()),
      fetch(`${TOURS_API}/out-of-city`).then(r => r.json()),
    ])
      .then(([ic, oc]) => {
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
        className="min-h-viewport relative flex w-full items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#040C1A' }}
      >
        <RevealImage
          src="/images/Antalya-kapak.jpg"
          alt=""
          tone="dark"
          cinematic
          containerClassName="absolute inset-0"
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(rgba(4,12,26,0.42), rgba(4,12,26,0.74))' }}
        />
        <div className="relative text-center z-10 px-4 max-w-4xl mx-auto">
          <p className="text-xs md:text-sm font-semibold tracking-[0.35em] text-gold uppercase mb-6">
            {t('hero.location')}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold text-white mb-6 md:mb-8 drop-shadow-lg leading-[1.08]">
            {t('hero.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-2xl mb-10 md:mb-12 max-w-2xl mx-auto font-light" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {t('hero.subtitle')}
          </p>
          <button
            onClick={() => document.getElementById('yachts')?.scrollIntoView({ behavior: 'smooth' })}
            className="max-w-full border border-white/50 text-white uppercase tracking-[0.18em] md:tracking-[0.25em] text-xs md:text-sm font-semibold px-6 py-3.5 md:px-10 md:py-4 hover:bg-white hover:text-navy transition-colors duration-300"
          >
            {t('hero.cta')}
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          TIER 1 — Private Yacht Escapes
         ════════════════════════════════════════════════════ */}
      <section id="yachts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-28 scroll-mt-24">
        <SectionHeader
          eyebrow={t('yachts.eyebrow')}
          title={t('yachts.title')}
          subtitle={t('yachts.subtitle')}
        />

        {/* Premium tags */}
        <div className="flex gap-2.5 mb-10 flex-wrap">
          {YACHT_TAGS.map(label => (
            <span
              key={label}
              className="text-[10px] md:text-xs px-3 py-1.5 border border-gold/40 text-gold font-medium uppercase tracking-[0.12em]"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="relative group overflow-hidden rounded-3xl min-h-[380px] md:min-h-[480px] flex items-end bg-navy">
          {/* Background Image with Overlay — below the fold, so loaded lazily */}
          <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <RevealImage
              src="/images/tours/lusca-vip-yacht-tour/Yatch_Lusca.jpg"
              alt=""
              tone="dark"
              containerClassName="absolute inset-0"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(rgba(11,31,63,0.15), rgba(11,31,63,0.82))' }}
            />
          </div>

          <div className="relative z-10 max-w-2xl p-8 md:p-14">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
              {t('yachtSelection.title')}
            </h3>
            <p className="text-base md:text-xl text-white/80 font-light mb-8 md:mb-10">
              {t('yachtSelection.subtitle')}
            </p>

            <Link
              to="/yachts"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-gold text-navy px-6 sm:px-10 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-white transition-colors duration-300"
            >
              {t('yachts.viewAll')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </section>

      <Divider />

      <div id="destinations" className="scroll-mt-24"></div>

      {/* ════════════════════════════════════════════════════
          TIER 2 — Discover Antalya (In-City)
         ════════════════════════════════════════════════════ */}
      <section id="in-city" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <SectionHeader
          eyebrow={t('inCity.eyebrow')}
          title={t('inCity.title')}
          subtitle={t('inCity.subtitle')}
        />

        {loading ? (
          <SkeletonGrid count={3} cols={3} />
        ) : inCity.length === 0 ? (
          <p className="text-secondary">{t('inCity.empty')}</p>
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
          TIER 3 — Beyond Antalya (Out-of-City Journeys)
         ════════════════════════════════════════════════════ */}
      <section id="out-of-city" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <SectionHeader
          eyebrow={t('outOfCity.eyebrow')}
          title={t('outOfCity.title')}
          subtitle={t('outOfCity.subtitle')}
        />

        {loading ? (
          <SkeletonGrid count={2} cols={2} />
        ) : outOfCity.length === 0 ? (
          <p className="text-secondary">{t('outOfCity.empty')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
            {outOfCity.map(tour => (
              <TourCard key={tour.id} tour={tour} large />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
