import { Component } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Guards the route area.
 *
 * Route pages are code-split, so a page is a network request that can fail:
 * a dropped mobile connection, or a visitor on a tab opened before a deploy
 * asking for a chunk hash that no longer exists. Without a boundary React
 * unmounts the whole tree on that error, which left a blank white page behind
 * the boot splash, no header, no footer, nothing to click.
 */

/** A failed dynamic import, phrased differently by each engine. */
const isChunkError = (error) =>
  /dynamically imported module|Importing a module script failed|ChunkLoadError|error loading dynamically imported module/i.test(
    error?.message || '',
  );

const RELOAD_KEY = 'aj-chunk-reload';
/** Long enough that a genuinely broken chunk cannot put us in a reload loop. */
const RELOAD_COOLDOWN_MS = 15000;

/**
 * A stale chunk is fixed by fetching the current HTML, so try one reload
 * before showing anything. Returns false when we just reloaded, meaning the
 * failure is real and the visitor needs the panel instead.
 */
function tryReloadOnce() {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY)) || 0;
    if (Date.now() - last < RELOAD_COOLDOWN_MS) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    return false; // Private mode with no storage, fall through to the panel.
  }
  window.location.reload();
  return true;
}

const ErrorPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h2 className="mb-4 font-display text-3xl font-bold text-heading">{t('error.title')}</h2>
      <p className="mx-auto mb-8 max-w-md text-[var(--text-secondary)]">{t('error.text')}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:opacity-90"
        >
          {t('error.retry')}
        </button>
        <Link to="/" className="font-semibold text-primary hover:underline">
          {t('error.home')}
        </Link>
      </div>
    </div>
  );
};

class RouteErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (isChunkError(error)) tryReloadOnce();
  }

  /** A new route is a fresh attempt, drop the error so navigation works again. */
  componentDidUpdate(prevProps) {
    if (this.state.failed && prevProps.routeKey !== this.props.routeKey) {
      this.setState({ failed: false });
    }
  }

  render() {
    return this.state.failed ? <ErrorPanel /> : this.props.children;
  }
}

export default RouteErrorBoundary;
