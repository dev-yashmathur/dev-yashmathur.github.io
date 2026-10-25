import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { config } from '../../utils/config';
import './SiteShell.css';

type Theme = 'light' | 'dark';

const THEME_KEY = 'pf-theme';

const readTheme = (): Theme => {
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

interface SiteShellProps {
  children: React.ReactNode;
}

/** Shared chrome (theme, sticky header, footer) for every page. */
const SiteShell: React.FC<SiteShellProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
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

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  const scrollTop = () => { setMenuOpen(false); if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="pf" data-theme={theme}>
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
          <span>BUILT WITH REACT + VITE · MAIN @ {__COMMIT__}</span>
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
    </div>
  );
};

export default SiteShell;
