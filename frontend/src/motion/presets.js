/**
 * ANTALYA JOURNEY motion language.
 *
 * One easing curve and one distance scale across the whole site so every
 * reveal feels like the same hand. Values follow the scroll-reveal guidance
 * in .claude/skills/ui-ux-pro-max (24px travel, ~0.5s, 0.08s stagger, cap the
 * stagger at ~8 children) and reuse the cubic-bezier already used by the
 * image reveal and boot splash in index.css, so CSS and JS motion agree.
 */

/** expo.out — quick departure, long settle. The house curve. */
export const EASE = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.9,
  cinematic: 1.4,
};

/** Viewport trigger: fire once, a little before the element is fully in frame. */
export const VIEWPORT = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' };

/**
 * The hero waits for the boot splash to start lifting so its entrance plays
 * *as* the curtain rises rather than finishing behind it. Keep in step with
 * MIN_SPLASH_MS in main.jsx (1600ms).
 */
export const HERO_DELAY = 1.75;

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
