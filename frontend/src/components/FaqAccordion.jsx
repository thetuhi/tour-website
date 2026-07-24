import { useId, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { DURATION, EASE } from '../motion/presets';

/**
 * Reusable FAQ accordion.
 *
 * Presentational and language-agnostic: it renders whatever resolved items it
 * is handed, so the same component drives both the global `/faq` page and the
 * per-tour FAQ block on a tour detail page. Resolve the language upstream (see
 * `resolveFaq` in `content/faq.js`) and pass:
 *
 *   items = [{ id, question, answer: string[] }]
 *
 * Only one row is open at a time (state is shared, so opening a row in the
 * right column closes one in the left). The caller owns the surrounding card
 * via `className`; a row draws its own bottom divider, so any parent works.
 *
 * `twoColumn` splits the items into two balanced columns (first half left,
 * remainder right) on md+ screens, collapsing to a single column on mobile.
 */

/**
 * One accordion row.
 *
 * The button owns the expanded state (`aria-expanded`) and points at the panel
 * it controls (`aria-controls`); the panel points back at its button
 * (`aria-labelledby`) so screen readers announce the question when the answer
 * gets focus. A native <button> is used rather than a div so keyboard
 * activation and focus order come for free.
 */
const FaqRow = ({ item, isOpen, onToggle }) => {
  const reduceMotion = useReducedMotion();
  const uid = useId();
  const buttonId = `faq-q-${uid}`;
  const panelId = `faq-a-${uid}`;

  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-black/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary md:px-7 md:py-6 dark:hover:bg-white/[0.03]"
        >
          <span className="font-display text-lg font-bold leading-snug text-heading md:text-xl">
            {item.question}
          </span>
          <m.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: reduceMotion ? 0 : DURATION.fast, ease: EASE }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-primary"
          >
            <ChevronDown size={18} aria-hidden="true" />
          </m.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : DURATION.fast, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-5 pb-6 md:px-7 md:pb-7">
              {item.answer.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-3xl text-[0.95rem] font-light leading-7 text-secondary md:text-base md:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqAccordion = ({ items, defaultOpenId = null, twoColumn = false, className }) => {
  const [openId, setOpenId] = useState(defaultOpenId);

  if (!items?.length) return null;

  const renderRow = item => (
    <FaqRow
      key={item.id}
      item={item}
      isOpen={openId === item.id}
      onToggle={() => setOpenId(current => (current === item.id ? null : item.id))}
    />
  );

  if (twoColumn && items.length > 1) {
    const half = Math.ceil(items.length / 2);
    const columns = [items.slice(0, half), items.slice(half)];

    return (
      <div className={className}>
        <div className="grid md:grid-cols-2">
          {columns.map((column, index) => (
            <div
              key={index}
              // The first column keeps a bottom divider on mobile (where the
              // columns stack) and turns it into the vertical divider on md+.
              className={index === 0 ? 'border-b border-line md:border-b-0 md:border-r' : undefined}
            >
              {column.map(renderRow)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div className={className}>{items.map(renderRow)}</div>;
};

export default FaqAccordion;
