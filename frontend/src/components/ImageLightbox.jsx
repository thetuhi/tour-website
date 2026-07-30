import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EXIT_MS = 220;
const SWIPE_THRESHOLD_PX = 48;

/**
 * Minimal cinematic image viewer. Rendered through a portal so it is never
 * affected by transformed ancestors (cards use hover translate effects).
 * The parent unmounts it via onClose, which fires after the exit animation.
 * The image entrance only plays once the image has genuinely loaded; until
 * then a quiet gold hairline breathes in the center.
 *
 * Accepts the full gallery as `images` ([{ src, alt }]) plus `initialIndex`;
 * with more than one image it adds arrow buttons, arrow-key navigation and
 * touch swipe, wrapping around at both ends.
 */
const ImageLightbox = ({ images, initialIndex = 0, onClose }) => {
  const { t } = useTranslation();
  const [closing, setClosing] = useState(false);
  const [index, setIndex] = useState(initialIndex);
  const [imgStatus, setImgStatus] = useState('loading'); // loading | ready | error
  const closeButtonRef = useRef(null);
  const imgRef = useRef(null);
  const closeTimerRef = useRef(null);
  const touchStartRef = useRef(null);

  const count = images.length;
  const current = images[index];

  const requestClose = useCallback(() => {
    setClosing(prev => {
      if (!prev) {
        closeTimerRef.current = window.setTimeout(onClose, EXIT_MS);
      }
      return true;
    });
  }, [onClose]);

  const step = useCallback((delta) => {
    if (count < 2) return;
    setImgStatus('loading');
    setIndex(prev => (prev + delta + count) % count);
  }, [count]);

  /* Ref callback rather than an effect: it runs synchronously at commit, so a
     cached image (the gallery just displayed it) is detected even when the
     browser fires `load` before React attaches the onLoad handler, the case
     that otherwise left the photo stuck invisible behind `opacity-0`, showing
     only the lightbox chrome. React remounts the <img> on navigation (keyed by
     src), so this re-runs for every slide. */
  const registerImg = useCallback((node) => {
    imgRef.current = node;
    if (node && node.complete) {
      setImgStatus(node.naturalWidth > 0 ? 'ready' : 'error');
    }
  }, []);

  // Warm the neighbouring slides so swiping never waits on the network.
  useEffect(() => {
    if (count < 2) return;
    [index + 1, index - 1 + count].forEach((neighbour) => {
      const preload = new Image();
      preload.src = images[neighbour % count].src;
    });
  }, [images, index, count]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        requestClose();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // Lock background scrolling without losing the scroll position.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog; restore it when the viewer closes.
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(closeTimerRef.current);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [requestClose, step]);

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      step(dx < 0 ? 1 : -1);
    }
  };

  const navButtonClass =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center ' +
    'rounded-full border border-white/25 text-white/90 transition-colors hover:bg-white/10 hover:text-white';

  return createPortal(
    <div
      className={`lightbox-overlay ${closing ? 'lightbox-overlay--closing' : ''} fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4 sm:p-8 md:p-12`}
      onClick={requestClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label={t('lightbox.close')}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
      >
        <X size={22} />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label={t('lightbox.prev')}
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            className={`${navButtonClass} left-4 sm:left-6`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            aria-label={t('lightbox.next')}
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            className={`${navButtonClass} right-4 sm:right-6`}
          >
            <ChevronRight size={24} />
          </button>

          <span
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-[0.3em] text-white/70"
            aria-hidden="true"
          >
            {index + 1} / {count}
          </span>
        </>
      )}

      {imgStatus === 'loading' && !closing && (
        <span className="lightbox-loading absolute" aria-hidden="true" />
      )}

      {imgStatus === 'error' ? (
        <span
          className="text-white/50"
          onClick={(event) => event.stopPropagation()}
          aria-hidden="true"
        >
          <ImageOff size={32} strokeWidth={1.5} />
        </span>
      ) : (
        <img
          key={current.src}
          ref={registerImg}
          src={current.src}
          alt={current.alt}
          onLoad={() => setImgStatus('ready')}
          onError={() => setImgStatus('error')}
          className={`${imgStatus === 'ready' ? 'lightbox-image' : 'opacity-0'} ${closing ? 'lightbox-image--closing' : ''} max-h-full max-w-full select-none object-contain`}
          onClick={(event) => event.stopPropagation()}
          draggable={false}
        />
      )}
    </div>,
    document.body
  );
};

export default ImageLightbox;
