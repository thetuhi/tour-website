import { AGENCY_LICENSE_NUMBER } from '../config/agency';

/**
 * TÜRSAB membership mark — a legal disclosure requirement for Turkish travel
 * agencies, showing the agency's real operating licence number.
 *
 * Typographic placeholder: when the official TÜRSAB artwork is supplied, drop
 * the file into `public/images/tursab-logo.svg` and swap the wordmark <span>
 * for an <img>; the layout, sizing and licence line stay as they are.
 *
 * `variant="full"` is the larger footer treatment; `onDark` switches the text
 * colours for the navy footer, where the themed tokens would be invisible.
 */
const TURSAB_RED = '#E4032E';

const TursabBadge = ({ variant = 'compact', onDark = false, className = '' }) => {
  const isFull = variant === 'full';

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label={`TÜRSAB — ${AGENCY_LICENSE_NUMBER}`}
    >
      <span
        className={`font-bold leading-none tracking-[0.08em] text-white ${
          isFull ? 'px-2.5 py-1.5 text-sm' : 'px-2 py-1 text-[11px]'
        }`}
        style={{ backgroundColor: TURSAB_RED }}
      >
        TÜRSAB
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-semibold uppercase tracking-[0.14em] ${
            isFull ? 'text-[10px]' : 'text-[8px]'
          } ${onDark ? 'text-white/55' : 'text-secondary'}`}
        >
          Licence No
        </span>
        <span
          className={`mt-0.5 font-bold tracking-[0.06em] ${
            isFull ? 'text-sm' : 'text-[11px]'
          } ${onDark ? 'text-white' : 'text-ink'}`}
        >
          {AGENCY_LICENSE_NUMBER}
        </span>
      </span>
    </div>
  );
};

export default TursabBadge;
