import { m, useReducedMotion } from 'framer-motion';
import { VIEWPORT, fadeUp, flatten, maskUp, scaleIn, staggerContainer } from '../motion/presets';

const VARIANTS = { fadeUp, maskUp, scaleIn };

/**
 * Scroll-triggered reveal. Fires once when the element enters the viewport.
 * `preset="maskUp"` needs a clipping parent — use <Reveal.Mask> for headlines.
 *
 * Honours prefers-reduced-motion by dropping the travel while keeping the
 * fade, so the page still reads as composed rather than snapping into place.
 */
const Reveal = ({
  children,
  preset = 'fadeUp',
  delay = 0,
  as = 'div',
  className = '',
  ...rest
}) => {
  const reduceMotion = useReducedMotion();
  const base = VARIANTS[preset] ?? fadeUp;
  const variants = reduceMotion ? flatten(base) : base;
  const MotionTag = m[as] ?? m.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

/** Clipping wrapper so maskUp children rise out of nothing. */
const Mask = ({ children, className = '' }) => (
  <span className={`block overflow-hidden ${className}`}>{children}</span>
);

/**
 * Staggered group: children reveal in sequence. Wrap each child in
 * <Reveal.Item> (they inherit the parent's timeline, so no per-item delay).
 */
const Group = ({
  children,
  stagger = 0.08,
  delayChildren = 0,
  as = 'div',
  className = '',
  ...rest
}) => {
  const MotionTag = m[as] ?? m.div;

  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

const Item = ({ children, preset = 'fadeUp', as = 'div', className = '', ...rest }) => {
  const reduceMotion = useReducedMotion();
  const base = VARIANTS[preset] ?? fadeUp;
  const variants = reduceMotion ? flatten(base) : base;
  const MotionTag = m[as] ?? m.div;

  return (
    <MotionTag className={className} variants={variants} {...rest}>
      {children}
    </MotionTag>
  );
};

Reveal.Mask = Mask;
Reveal.Group = Group;
Reveal.Item = Item;

export default Reveal;
