import { useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OFFICE } from '../config/agency';
import { trackEvent } from '../utils/measure';

/**
 * Click-to-load Google Map.
 *
 * Nothing is requested from Google until the visitor asks for it: no map
 * tiles, no third-party cookies, no IP disclosure on page load. That matters
 * because this sits in the footer, which renders on every route, an eager
 * iframe would cost ~0.5–1 MB per page view and pull the visitor's IP to
 * Google whether or not they care about the office location.
 *
 * Uses the keyless `maps.google.com/maps?q=…&output=embed` form, which needs
 * no API key and no billing account (unlike the Maps JavaScript API).
 */
const OfficeMap = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(OFFICE.mapsQuery)}&z=16&output=embed`;
  const externalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE.directionsQuery)}`;

  const handleLoad = () => {
    setLoaded(true);
    trackEvent('map_open', { place: 'office' });
  };

  return (
    <div className="overflow-hidden border border-white/15">
      {loaded ? (
        <iframe
          title={t('footer.mapTitle')}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block h-52 w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={handleLoad}
          className="group relative flex h-52 w-full flex-col items-center justify-center gap-3 overflow-hidden bg-white/[0.04] px-5 text-center transition-colors hover:bg-white/[0.08]"
        >
          {/* Decorative grid standing in for the map until it is requested */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <MapPin size={26} className="text-primary transition-transform group-hover:scale-110" />
          <span className="text-sm font-semibold text-white">{OFFICE.label}</span>
          <span className="text-xs text-white/55">{OFFICE.address}</span>
          <span className="mt-1 border border-white/25 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white/85 transition-colors group-hover:border-primary group-hover:text-primary">
            {t('footer.showMap')}
          </span>
        </button>
      )}

      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('map_open', { place: 'office-external' })}
        className="flex items-center justify-center gap-2 border-t border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
      >
        {t('footer.directions')}
        <ExternalLink size={12} />
      </a>
    </div>
  );
};

export default OfficeMap;
