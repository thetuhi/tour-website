import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { generateWhatsAppLink } from '../utils/whatsapp';

const YachtSelection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleCardClick = (slot) => {
    navigate(`/yachts/${slot}`);
  };

  const handleWhatsAppClick = (e, slot) => {
    e.stopPropagation();
    const link = generateWhatsAppLink(i18n.language, null, slot);
    window.open(link, '_blank');
  };

  const options = [
    {
      id: 'day',
      title: t('yachtSelection.dayTour.title'),
      time: t('yachtSelection.dayTour.time'),
      desc: t('yachtSelection.dayTour.desc'),
      icon: <Sun className="text-yellow-500" size={48} />,
      gradient: 'from-blue-50 to-sky-100',
      border: 'border-blue-200',
      hover: 'hover:border-blue-400 hover:shadow-blue-200/50'
    },
    {
      id: 'sunset',
      title: t('yachtSelection.sunsetTour.title'),
      time: t('yachtSelection.sunsetTour.time'),
      desc: t('yachtSelection.sunsetTour.desc'),
      icon: <Moon className="text-orange-500" size={48} />,
      gradient: 'from-orange-50 to-amber-100',
      border: 'border-orange-200',
      hover: 'hover:border-orange-400 hover:shadow-orange-200/50'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-screen md:h-[calc(100vh-64px)] md:overflow-hidden py-12 md:py-0">
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3" style={{ color: 'var(--text)' }}>
          {t('yachtSelection.title')}
        </h1>
        <p className="text-sm md:text-lg max-w-xl mx-auto opacity-70">
          {t('yachtSelection.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto w-full">
        {options.map((opt) => (
          <div
            key={opt.id}
            onClick={() => handleCardClick(opt.id)}
            className={`group relative cursor-pointer overflow-hidden rounded-3xl border-2 transition-all duration-500 ${opt.border} ${opt.hover} bg-gradient-to-br ${opt.gradient} hover:-translate-y-1 h-auto md:h-[450px] flex flex-col p-8 md:p-10 shadow-lg`}
          >
            {/* Content Body */}
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <div className="mb-6 bg-white/40 p-4 rounded-2xl inline-block shadow-sm">
                  {opt.icon}
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-2 text-slate-900">
                  {opt.title}
                </h2>
                <p className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                  {opt.time}
                </p>
                <p className="text-slate-700 text-base md:text-lg leading-relaxed max-w-sm">
                  {opt.desc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button 
                  className="w-full sm:flex-grow flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-bold transition-all hover:bg-white/50 hover:border-slate-400 text-sm"
                >
                  {t('card.viewDetails')}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={(e) => handleWhatsAppClick(e, opt.id)}
                  className="w-full sm:flex-grow flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/30 text-sm"
                >
                  <FaWhatsapp size={18} />
                  {t('tourDetail.whatsapp')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YachtSelection;
