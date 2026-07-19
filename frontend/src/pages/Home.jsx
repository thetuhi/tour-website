import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import TourCard from '../components/TourCard';
import RevealImage from '../components/RevealImage';
import Reveal from '../components/Reveal';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getToursByCategory } from '../data/tours';
import { BRAND_NAME } from '../config/agency';
import { DURATION, EASE, HERO_DELAY, VIEWPORT, maskUp, staggerContainer } from '../motion/presets';

/* ── Editorial section header ──────────────────────────── */
const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <Reveal.Group as="header" className="max-w-3xl mb-10 md:mb-14" stagger={0.1}>
    <Reveal.Item className="mb-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] md:tracking-[0.3em] text-gold">
      {eyebrow}
    </Reveal.Item>
    <Reveal.Item
      as="h2"
      className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-heading"
    >
      {title}
    </Reveal.Item>
    <Reveal.Item className="mt-4 text-base md:text-lg font-light leading-relaxed text-secondary">
      {subtitle}
    </Reveal.Item>
  </Reveal.Group>
);

/* ── Section divider ───────────────────────────────────── */
const Divider = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-28">
    <m.div
      className="border-t border-line origin-left"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slow, ease: EASE }}
    />
  </div>
);

/* ══════════════════════════════════════════════════════════
   Home — Three-tier layout: Yachts → In-City → Out-of-City
   ══════════════════════════════════════════════════════════ */
const Home = () => {
  const { t } = useTranslation();
  const inCity = getToursByCategory('INCITY');
  const outOfCity = getToursByCategory('OUTCITY');
  const reduceMotion = useReducedMotion();

  /* Hero parallax — decorative background layer only, never the copy. */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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
        ref={heroRef}
        className="min-h-viewport relative flex w-full items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#040C1A' }}
      >
        <m.div
          className="absolute inset-0"
          style={reduceMotion ? undefined : { y: bgY, scale: bgScale }}
        >
          <RevealImage
            src="/images/antalya-kapak.webp"
            alt=""
            tone="dark"
            cinematic
            containerClassName="absolute inset-0"
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </m.div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(rgba(4,12,26,0.42), rgba(4,12,26,0.74))' }}
        />

        <m.div
          className="relative text-center z-10 px-4 max-w-4xl mx-auto"
          style={reduceMotion ? undefined : { opacity: copyOpacity }}
          variants={staggerContainer(0.14, HERO_DELAY)}
          initial="hidden"
          animate="visible"
        >
          <m.p
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 16, letterSpacing: '0.1em' },
              visible: {
                opacity: 1,
                y: 0,
                letterSpacing: '0.35em',
                transition: { duration: DURATION.slow, ease: EASE },
              },
            }}
            className="text-xs md:text-sm font-semibold text-gold uppercase mb-6"
          >
            {t('hero.location')}
          </m.p>

          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold text-white mb-6 md:mb-8 drop-shadow-lg leading-[1.08]">
            <span className="block overflow-hidden">
              <m.span
                className="block"
                variants={reduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : maskUp}
              >
                {t('hero.title')}
              </m.span>
            </span>
          </h1>

          <m.p
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
              visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
            }}
            className="text-base sm:text-lg md:text-2xl mb-10 md:mb-12 max-w-2xl mx-auto font-light"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            {t('hero.subtitle', { brand: BRAND_NAME })}
          </m.p>

          <m.button
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
              visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
            }}
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            onClick={() => document.getElementById('yachts')?.scrollIntoView({ behavior: 'smooth' })}
            className="max-w-full border border-white/50 text-white uppercase tracking-[0.18em] md:tracking-[0.25em] text-xs md:text-sm font-semibold px-6 py-3.5 md:px-10 md:py-4 hover:bg-white hover:text-navy transition-colors duration-300"
          >
            {t('hero.cta')}
          </m.button>
        </m.div>
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
        <Reveal.Group className="flex gap-2.5 mb-10 flex-wrap" stagger={0.06}>
          {YACHT_TAGS.map(label => (
            <Reveal.Item
              as="span"
              key={label}
              preset="scaleIn"
              className="text-[10px] md:text-xs px-3 py-1.5 border border-gold/40 text-gold font-medium uppercase tracking-[0.12em]"
            >
              {label}
            </Reveal.Item>
          ))}
        </Reveal.Group>

        <Reveal preset="scaleIn">
          <div className="relative group overflow-hidden rounded-3xl min-h-[380px] md:min-h-[480px] flex items-end bg-navy">
            {/* Background Image with Overlay — below the fold, so loaded lazily */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              <RevealImage
                src="/images/tours/lusca-vip-yacht-tour/lusca-1.webp"
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

              <m.div
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="inline-block w-full sm:w-auto"
              >
                <Link
                  to="/yachts"
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-gold text-navy px-6 sm:px-10 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-white transition-colors duration-300"
                >
                  {t('yachts.viewAll')}
                  <ArrowRight size={18} />
                </Link>
              </m.div>
            </div>
          </div>
        </Reveal>

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

        {inCity.length === 0 ? (
          <p className="text-secondary">{t('inCity.empty')}</p>
        ) : (
          <Reveal.Group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {inCity.map(tour => (
              <Reveal.Item key={tour.id}>
                <TourCard tour={tour} />
              </Reveal.Item>
            ))}
          </Reveal.Group>
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

        {outOfCity.length === 0 ? (
          <p className="text-secondary">{t('outOfCity.empty')}</p>
        ) : (
          <Reveal.Group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10" stagger={0.1}>
            {outOfCity.map(tour => (
              <Reveal.Item key={tour.id}>
                <TourCard tour={tour} large />
              </Reveal.Item>
            ))}
          </Reveal.Group>
        )}
      </section>
    </div>
  );
};

export default Home;
