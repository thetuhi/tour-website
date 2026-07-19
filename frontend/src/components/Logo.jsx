/**
 * ANTALYA JOURNEY brand mark — a two-sail yacht over a waterline.
 *
 * Single-colour vector driven by `currentColor`, so it inherits the surrounding
 * text colour and flips with the theme (navy on light, gold on dark) without a
 * second asset. The standalone favicon lives at public/favicon.svg and must be
 * kept in step with the paths below.
 */
export const LogoMark = ({ size = 26, className = '', ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={className}
    {...rest}
  >
    {/* Mainsail */}
    <path d="M21.5 38 V7 L7.5 38 Z" fill="currentColor" />
    {/* Jib — lighter so the two sails read as separate planes */}
    <path d="M25.5 38 V16 L38.5 38 Z" fill="currentColor" opacity=".55" />
    {/* Waterline */}
    <path
      d="M3 42.5 q6 3 11 0 t11 0 t11 0"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
      opacity=".8"
    />
  </svg>
);

export default LogoMark;
