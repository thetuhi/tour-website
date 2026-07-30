/**
 * ANTALYA JOURNEY motion language.
 *
 * One easing curve and one distance scale across the whole site so every
 * reveal feels like the same hand. Values follow the scroll-reveal guidance
 * in .claude/skills/ui-ux-pro-max (24px travel, ~0.5s, 0.08s stagger, cap the
 * stagger at ~8 children) and reuse the cubic-bezier already used by the
 * image reveal and boot splash in index.css, so CSS and JS motion agree.
 */

import { splashLiftIn } from './splash';

/** expo.out, quick departure, long settle. The house curve. */
export const EASE = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.9,
  cinematic: 1.4,
};

/**
 * Viewport trigger: fire once, as the element starts to enter (a little before,
 * via the bottom margin). `amount: 'some'` (any part visible) rather than a
 * fraction is deliberate: a fraction like 0.25 can NEVER be met when the
 * element is taller than the viewport, e.g. the 6-card In-City grid stacked
 * into a single column on mobile, leaving those cards stuck at opacity 0.
 */
export const VIEWPORT = { once: true, amount: 'some', margin: '0px 0px -10% 0px' };

/**
 * Seconds the hero holds before its entrance, so the copy rises *as* the boot
 * curtain does rather than finishing behind it. Read once at mount, never as a
 * constant: a fixed delay counted from mount instead of from the curtain, so a
 * cold boot left the hero blank for a beat after the splash had gone, and a
 * client-side navigation back to the home page waited on a curtain that was
 * long gone. With no splash in play this is just a short beat.
 */
export const heroEntranceDelay = () => (splashLiftIn() + 200) / 1000;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/** Headline treatment: rises out of a clipped mask instead of just fading. */
export const maskUp = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/**
 * Parent for staggered groups. `stagger` is per-child delay; keep groups to
 * ~8 items so the last card doesn't feel abandoned.
 */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Reduced motion: keep the choreography's timing, drop the travel. */
export const flatten = (variants) => ({
  hidden: { ...variants.hidden, y: 0, x: 0, scale: 1 },
  visible: { ...variants.visible, y: 0, x: 0, scale: 1 },
});
