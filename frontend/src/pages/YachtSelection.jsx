import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Moon, Sun } from 'lucide-react';

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
      accent: '#FFD60A',
      hover: 'hover:border-[#00B4D8] hover:shadow-[0_16px_48px_rgba(0,180,216,0.20)]',
      iconBg: 'from-[#FFD60A] to-[#FF9F1C]',
    },
    {
      id: 'sunset',
      title: t('yachtSelection.sunsetTour.title'),
      time: t('yachtSelection.sunsetTour.time'),
      desc: t('yachtSelection.sunsetTour.desc'),
      Icon: Moon,
      accent: '#FF6B35',
      hover: 'hover:border-[#FF6B35] hover:shadow-[0_16px_48px_rgba(255,107,53,0.20)]',
      iconBg: 'from-[#FFB703] to-[#FF6B35]',
    },
  ];

  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#F5F7FA] text-[#2C3E50] md:h-[calc(100vh-64px)] md:overflow-hidden">
      <div className="grid min-h-[calc(100vh-64px)] md:h-full md:grid-rows-[minmax(260px,0.9fr)_auto]">
        <header className="relative isolate flex min-h-[300px] items-center justify-center overflow-hidden md:min-h-0">
          <img
            src="/images/Yatch_Lusca_2.jpg"
            alt="Luxury yacht at sea"
            className="absolute inset-0 h-full w-full scale-105 object-cover motion-safe:animate-[heroDrift_12s_ease-out_forwards]"
            style={{ objectPosition: 'center 52%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3F]/25 via-[#0B1F3F]/35 to-[#0B1F3F]/70" />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,_rgba(0,180,216,0.16),_transparent_34%,_rgba(212,175,55,0.18))]" />

          <div className="relative mx-auto max-w-5xl px-4 text-center text-white sm:px-6 lg:px-8">
            <p className="mb-4 text-xs font-bold uppercase text-[#D4AF37]">
              Aura private yacht
            </p>
            <h1
              className="text-[42px] font-bold leading-[1.02] md:text-[72px]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {t('yachtSelection.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-white/[0.86] md:text-xl">
              {t('yachtSelection.subtitle')}
            </p>
          </div>
        </header>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:px-8 md:py-8">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {options.map(({ id, title, time, desc, Icon, accent, hover, iconBg }) => (
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
                className={`group min-h-[260px] cursor-pointer rounded-[24px] border-2 border-transparent bg-gradient-to-br from-white to-[#F8FBFD] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-[#00B4D8] md:min-h-[280px] md:p-8 ${hover}`}
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div
                      className={`mb-5 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br ${iconBg} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon size={34} strokeWidth={2.2} />
                    </div>

                    <p className="mb-2 text-lg font-semibold text-[#8E99AB]">{time}</p>
                    <h2
                      className="text-[28px] font-bold leading-tight text-[#0B1F3F] md:text-[32px]"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {title}
                    </h2>
                    <p className="mt-4 max-w-md text-base font-light leading-relaxed text-[#687386]">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-6 inline-flex items-center text-base font-semibold text-[#00B4D8]">
                    <span className="mr-3 h-px w-10" style={{ backgroundColor: accent }} />
                    {t('card.viewDetails')}
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
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
