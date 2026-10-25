import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { config } from '../../utils/config';
import { ToastContext, prefersReducedMotion } from './toast';
import { useReveal } from '../../utils/useReveal';
import '../Wow/Wow.css';
import './SiteShell.css';

type Theme = 'light' | 'dark';

const THEME_KEY = 'pf-theme';
const REPO = 'https://github.com/dev-yashmathur/dev-yashmathur.github.io';

const readTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* storage unavailable */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const navLinks = [
  { hash: '#work', label: 'Work' },
  { hash: '#experience', label: 'Experience' },
  { hash: '#writing', label: 'Writing' },
  { hash: '#contact', label: 'Contact' },
];

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const deployedAgo = () => {
  const mins = Math.round((Date.now() - new Date(__BUILD_TIME__).getTime()) / 60000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  if (mins < 60) return rtf.format(-mins, 'minute');
  if (mins < 60 * 24) return rtf.format(-Math.round(mins / 60), 'hour');
  return rtf.format(-Math.round(mins / 1440), 'day');
};

interface SiteShellProps {
  children: React.ReactNode;
}

/** Shared chrome (theme, sticky header, footer, toasts, scroll reveals) for every page. */
const SiteShell: React.FC<SiteShellProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; command: string; output: string } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const { pathname, hash } = useLocation();

  const [showTop, setShowTop] = useState(false);

  useLayoutEffect(() => {
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* storage unavailable */ }
    const bg = theme === 'dark' ? '#121211' : '#f7f7f5';
    document.documentElement.style.backgroundColor = bg;
    document.body.style.background = bg;
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!hash) return;
    const id = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => window.clearTimeout(id);
  }, [pathname, hash]);

  useReveal(rootRef, pathname);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  const showToast = useCallback((command: string, output: string) => {
    setToast({ id: Date.now(), command, output });
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    showToast(`git checkout ${next}`, `Switched to branch '${next}'`);
    if (!document.startViewTransition || prefersReducedMotion()) {
      setTheme(next);
      return;
    }
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => flushSync(() => setTheme(next)));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(.4, 0, .2, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    }).catch(() => { /* transition skipped */ });
  };
  const scrollTop = () => { setMenuOpen(false); if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <ToastContext.Provider value={showToast}>
      <div className="pf" data-theme={theme} ref={rootRef}>
        <div className="page page-flex">
          <header className="pf-header">
            <Link className="wordmark" to="/" onClick={scrollTop}>Yash Mathur</Link>
            <nav className={`header-nav${menuOpen ? ' open' : ''}`} aria-label="Primary">
              {navLinks.map(l => (
                <Link key={l.hash} to={`/${l.hash}`} onClick={() => setMenuOpen(false)}>{l.label}</Link>
              ))}
            </nav>
            <div className="header-meta">
              <span className="status"><span className="status-dot" /> Open to conversations</span>
              <button
                type="button"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              />
              <button
                type="button"
                className="menu-toggle"
                onClick={() => setMenuOpen(o => !o)}
                aria-expanded={menuOpen}
                aria-label="Toggle menu"
              >{menuOpen ? 'Close' : 'Menu'}</button>
            </div>
          </header>

          <div className="page-body">{children}</div>

          <footer className="site-footer">
            <span>YASH_MATHUR / 2026</span>
            <span className="site-footer-links">
              <a href={config.social.github} {...external}>GitHub</a>
              <a href={config.social.linkedin} {...external}>LinkedIn</a>
            </span>
            <span>
              BUILT WITH REACT + VITE · MAIN @{' '}
              <a className="build-hash" href={`${REPO}/commit/${__COMMIT__}`} data-tip={`deployed ${deployedAgo()}`} {...external}>{__COMMIT__}</a>
            </span>
          </footer>
        </div>
        {showTop && (
          <button
            type="button"
            className="to-top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >↑</button>
        )}
        <div className="term-toast-region" role="status" aria-live="polite">
          {toast && (
            <div className="term-toast" key={toast.id}>
              <span className="cmd"><span aria-hidden="true">$ </span>{toast.command}</span>
              <span>{toast.output}</span>
            </div>
          )}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default SiteShell;
