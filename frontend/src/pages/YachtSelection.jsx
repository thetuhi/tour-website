import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import RevealImage from '../components/RevealImage';

const YachtSelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const options = [
    {
      id: 'day',
      title: t('yachtSelection.dayTour.title'),
      time: t('yachtSelection.dayTour.time'),
      desc: t('yachtSelection.dayTour.desc'),
      Icon: Sun,
      accent: '#D4AF37',
      hover: 'hover:border-gold hover:shadow-[0_10px_28px_rgba(212,175,55,0.18)]',
      iconStyle: 'bg-gold text-navy',
    },
    {
      id: 'sunset',
      title: t('yachtSelection.sunsetTour.title'),
      time: t('yachtSelection.sunsetTour.time'),
      desc: t('yachtSelection.sunsetTour.desc'),
      Icon: Moon,
      accent: '#0B1F3F',
      hover: 'hover:border-navy hover:shadow-[0_10px_28px_rgba(11,31,63,0.16)]',
      iconStyle: 'bg-navy text-gold',
    },
  ];

  return (
    <section className="min-h-[calc(100svh-64px)] bg-mist text-ink md:h-[calc(100svh-64px)] md:min-h-0 md:overflow-hidden">
      <div className="grid min-h-[calc(100svh-64px)] md:h-full md:min-h-0 md:grid-rows-[minmax(220px,42vh)_1fr]">
        <header className="relative isolate flex min-h-[280px] items-center justify-center overflow-hidden md:min-h-0">
          <RevealImage
            src="/images/tours/lusca-vip-yacht-tour/Yatch_Lusca_2.jpg"
            alt="Luxury yacht at sea"
            tone="dark"
            cinematic
            containerClassName="absolute inset-0"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 52%' }}
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/25 via-navy/35 to-navy/70" />

          <div className="relative mx-auto max-w-5xl px-4 text-center text-white sm:px-6 lg:px-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Mars Travel private yacht
            </p>
            <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.05]">
              {t('yachtSelection.title')}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base font-light leading-relaxed text-white/[0.86] md:text-lg">
              {t('yachtSelection.subtitle')}
            </p>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl items-center px-4 py-5 sm:px-6 lg:px-8 md:py-6">
          <div className="grid w-full gap-5 md:grid-cols-2 md:gap-6">
            {options.map(({ id, title, time, desc, Icon, accent, hover, iconStyle }) => (
              <article
                key={id}
                onClick={() => navigate(`/yachts/${id}`)}
                tabIndex={0}
                role="button"
                aria-label={`${title} ${time}`}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigate(`/yachts/${id}`);
                  }
                }}
                className={`group min-h-[238px] cursor-pointer rounded-2xl border-2 border-transparent bg-white p-5 shadow-[0_6px_24px_rgba(11,31,63,0.07)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-gold md:min-h-[230px] md:p-6 ${hover}`}
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${iconStyle} shadow-md transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon size={30} strokeWidth={2.2} />
                    </div>

                    <p className="mb-2 text-base font-semibold text-secondary">{time}</p>
                    <h2 className="font-display text-[26px] font-bold leading-tight text-navy md:text-[30px]">
                      {title}
                    </h2>
                    <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-secondary md:text-base">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-5 inline-flex items-center text-[13px] font-semibold uppercase tracking-[0.15em] text-primary">
                    <span className="mr-3 h-px w-10" style={{ backgroundColor: accent }} />
                    {t('card.viewDetails')}
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachtSelection;
