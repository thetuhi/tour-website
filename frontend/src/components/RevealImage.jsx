import { useEffect, useRef, useState } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * ANTALYA JOURNEY image reveal.
 *
 * While loading: a quiet, brand-toned "breathing" wash (no spinner, no shimmer).
 * When the image has genuinely decoded: a cinematic fade + settle (opacity/transform
 * only — GPU-friendly). Already-cached images skip the animation entirely.
 * On failure: the wash goes still with a faint icon — no broken-image glyph,
 * no loud error state, layout stays intact.
 *
 * Callers own positioning/size via containerClassName (e.g. "absolute inset-0"
 * inside an aspect-ratio box). Extra props (loading, decoding, fetchPriority,
 * style, …) are forwarded to the <img>.
 */
const RevealImage = ({
  src,
  alt,
  tone = 'light',        // 'light' → mist cards · 'dark' → navy heroes
  cinematic = false,     // slower, hero-grade entrance
  containerClassName = '',
  className = '',
  ...imgProps
}) => {
  const imgRef = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [instant, setInstant] = useState(false);

  // Cached images are complete before onLoad can fire — reveal them instantly.
  //
  // Only a decoded image (naturalWidth > 0) is treated as ready. `complete`
  // with a zero naturalWidth must NOT be read as a failure: a lazy image that
  // the browser has deliberately not started fetching reports exactly that,
  // and marking it failed here would unmount the <img> so its onLoad could
  // never fire — the image would then never appear. Real failures arrive
  // through onError below.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setInstant(true);
      setStatus('ready');
    }
  }, []);

  if (status === 'error') {
    return (
      <div role="img" aria-label={alt} className={`img-reveal img-reveal--${tone} ${containerClassName}`}>
        <div className="img-reveal__placeholder img-reveal__placeholder--static" aria-hidden="true" />
        <ImageOff className="img-reveal__fallback-icon" size={28} strokeWidth={1.5} aria-hidden="true" />
      </div>
    );
  }

  const revealClass = status === 'ready'
    ? (instant ? ' img-reveal__img--instant' : ' img-reveal__img--ready')
    : '';

  return (
    <div className={`img-reveal img-reveal--${tone} ${containerClassName}`}>
      {status !== 'ready' && <div className="img-reveal__placeholder" aria-hidden="true" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('error')}
        className={`${className} img-reveal__img${cinematic ? ' img-reveal__img--cinematic' : ''}${revealClass}`}
        {...imgProps}
      />
    </div>
  );
};

export default RevealImage;
