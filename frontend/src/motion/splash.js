/**
 * Boot splash timing, single source of truth.
 *
 * Three clocks used to disagree here: the splash keyframes in index.html run
 * from the splash's first paint, the hold timer counted from navigation start,
 * and the hero entrance counted from React mount. On anything slower than a
 * warm cache they drifted apart, so the brand sequence got cut off mid-way and
 * the hero sat empty for a beat after the curtain had already lifted.
 *
 * Everything is now measured from `__splashPaintedAt`, stamped in index.html
 * on the frame that first paints the splash, which is also when its keyframes
 * begin.
 */

/**
 * How long the splash holds after it paints. The intro composition lands at
 * 1.4s (see the animation delays in index.html), the rest is a beat to let it
 * read before the curtain rises.
 */
export const SPLASH_HOLD_MS = 1550;

/** Reduced motion gets no intro to wait for, just enough to avoid a flash. */
const REDUCED_HOLD_MS = 400;

const splash = typeof document === 'undefined' ? null : document.getElementById('splash');

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/*
 * A deferred module script can run either side of the first paint: before it in
 * production (bundle already cached), after it in dev. When the stamp is not
 * there yet the paint is one frame away, so `now` is the right approximation.
 */
const paintedAt =
  typeof window !== 'undefined' && window.__splashPaintedAt != null
    ? window.__splashPaintedAt
    : performance.now();

/**
 * The moment the curtain starts rising, on the `performance.now()` timeline.
 * 0 when the app boots without a splash (hot reload, or the splash was already
 * dismissed) so nothing waits on a curtain that is not there.
 */
export const SPLASH_LIFT_AT = splash
  ? paintedAt + (prefersReducedMotion ? REDUCED_HOLD_MS : SPLASH_HOLD_MS)
  : 0;

/** ms from now until the curtain rises. 0 once it already has. */
export const splashLiftIn = () => Math.max(0, SPLASH_LIFT_AT - performance.now());
