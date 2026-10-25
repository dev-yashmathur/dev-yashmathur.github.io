import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../utils/usePageMeta';
import { useReveal } from '../../utils/useReveal';
import { config } from '../../utils/config';
import { SHORTS_GONE, SHORTS_GONE_FONTS, shortsGoneFaq, surfaces } from './content';
import icon from '../../assets/images/ShortsGone/icon-128.webp';
import mark from '../../assets/images/ShortsGone/mark.webp';
import banner from '../../assets/images/ShortsGone/banner.webp';
import beforeShot from '../../assets/images/ShortsGone/before.webp';
import afterShot from '../../assets/images/ShortsGone/after.webp';
import './ShortsGonePage.css';

const BG = '#090B10';
const SHOT = { width: 1280, height: 800 };

/** Splits a headline into words that rise through a mask, one after another. */
const Rise: React.FC<{ text: string; start?: number; className?: string }> = ({ text, start = 0, className }) => (
  <span className={className}>
    {text.split(' ').map((word, i) => (
      <span key={i}>
        <span className="sg-word">
          <span style={{ '--d': `${start + i * 55}ms` } as React.CSSProperties}>{word}</span>
        </span>{' '}
      </span>
    ))}
  </span>
);

const ChromeButton: React.FC<{ big?: boolean; small?: boolean }> = ({ big, small }) => (
  <a
    className={`sg-btn sg-btn-primary${big ? ' sg-btn-big' : ''}${small ? ' sg-btn-small' : ''}`}
    href={SHORTS_GONE.store}
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg viewBox="0 0 24 24" width={small ? 16 : 18} height={small ? 16 : 18} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
    Add to Chrome
  </a>
);

/** The extension's own mark, drawn simply: a rounded red tile with a play triangle. Not YouTube's logo. */
const ShortGlyph: React.FC = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <rect x="6" y="2" width="12" height="20" rx="6" fill="currentColor" transform="rotate(-14 12 12)" />
    <path d="M10.2 9.2v5.6l4.6-2.8z" fill="#fff" />
  </svg>
);

const PowerIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

const thumbs = ['a', 'b', 'c', 'd', 'e', 'f'];

/**
 * A pared-down YouTube home page with the ShortsGone popup beside it. When it scrolls into view the switch
 * turns on and the Shorts shelf and sidebar tab fold away. The switch is a real button, so you can flip it back.
 */
const LiveFeed: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      timer = window.setTimeout(() => { if (!touched.current) setOn(true); }, 1100);
    }, { threshold: 0.45 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, []);

  const flip = () => { touched.current = true; setOn(v => !v); };

  return (
    <div className={`sg-live${on ? ' is-on' : ''}`} ref={ref}>
      <div className="sg-browser" aria-hidden="true">
        <div className="sg-browser-bar">
          <span className="sg-dots"><i /><i /><i /></span>
          <span className="sg-url">youtube.com</span>
          <img src={icon} alt="" width="18" height="18" />
        </div>
        <div className="sg-yt">
          <div className="sg-side">
            <span className="sg-side-item is-active"><i />Home</span>
            <span className="sg-fold sg-side-shorts">
              <span className="sg-fold-inner"><span className="sg-side-item"><b><ShortGlyph /></b>Shorts</span></span>
            </span>
            <span className="sg-side-item"><i />Subscriptions</span>
            <span className="sg-side-item"><i />You</span>
            <span className="sg-side-item"><i />History</span>
          </div>
          <div className="sg-main">
            <div className="sg-chips"><i className="is-active" /><i /><i /><i /><i /></div>
            <div className="sg-grid">
              {thumbs.slice(0, 3).map(t => (
                <span className="sg-video" key={t}><span className={`sg-thumb t-${t}`} /><i /><i /></span>
              ))}
            </div>
            <div className="sg-fold sg-shelf">
              <div className="sg-fold-inner">
                <div className="sg-shelf-head">
                  <span className="sg-shelf-label"><b><ShortGlyph /></b>Shorts</span>
                  <em>gone.</em>
                </div>
                <div className="sg-shelf-row">
                  {[0, 1, 2, 3, 4].map(i => (
                    <span className="sg-short" key={i} style={{ '--i': i } as React.CSSProperties}><i /></span>
                  ))}
                </div>
              </div>
            </div>
            <div className="sg-grid">
              {thumbs.slice(3).map(t => (
                <span className="sg-video" key={t}><span className={`sg-thumb t-${t}`} /><i /><i /></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sg-popup">
        <div className="sg-popup-brand">
          <img src={icon} alt="" width="28" height="28" />
          <span>
            <strong><span className="sg-blue">Shorts</span><span className="sg-cyan">Gone</span></strong>
            <small>FOCUS <b>&gt;</b> SCROLL</small>
          </span>
        </div>
        <button className="sg-power" type="button" aria-pressed={on} onClick={flip} aria-label="Block Shorts in this preview">
          <PowerIcon />
        </button>
        <p className="sg-badge" aria-live="polite"><i />{on ? 'Shorts blocked' : 'Shorts allowed'}</p>
        <p className="sg-phrase">{on ? 'Doomscroll vortex disarmed. Enjoy YouTube peacefully.' : 'Shorts are roaming free. Stay strong!'}</p>
        <p className="sg-popup-hint">{on ? 'Tap to bring Shorts back' : 'Tap to block Shorts'}</p>
      </div>
    </div>
  );
};

const permissions = [
  {
    name: 'youtube.com only',
    detail: 'https://www.youtube.com/*',
    body: 'The one site ShortsGone can run on. It adds a few hiding rules to YouTube’s pages and nothing anywhere else.',
  },
  {
    name: 'Storage',
    detail: 'storage',
    body: 'Remembers four things: the main switch and the three toggles. They are saved in Chrome on your computer.',
  },
  {
    name: 'Navigation',
    detail: 'webNavigation',
    body: 'YouTube changes pages without reloading. This lets ShortsGone notice when that new page is a /shorts/ address and block it.',
  },
];

const ShortsGonePage: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  usePageMeta(SHORTS_GONE.title, SHORTS_GONE.description, true);
  useReveal(root);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.documentElement.style.backgroundColor = BG;
    document.body.style.background = BG;
    if (!document.querySelector(`link[href="${SHORTS_GONE_FONTS}"]`)) {
      const link = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: SHORTS_GONE_FONTS });
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="sgone" ref={root}>
      <header className="sg-bar">
        <div className="sg-bar-inner">
          <a className="sg-brand" href="#top" aria-label="ShortsGone home">
            <img src={icon} alt="" width="30" height="30" />
            <span><span className="sg-blue">Shorts</span><span className="sg-cyan">Gone</span></span>
          </a>
          <nav className="sg-nav" aria-label="ShortsGone">
            <a href="#removes">What it removes</a>
            <a href="#privacy">Privacy</a>
            <a href="#demo">Demo</a>
            <a href="#faq">FAQ</a>
          </nav>
          <ChromeButton small />
        </div>
      </header>

      <main id="top">
        <section className="sg-hero">
          <p className="sg-tagline" data-reveal>
            <span>Focus</span> <b>&gt;</b> <span>Scroll</span>
          </p>
          <h1>
            <Rise text="Block YouTube Shorts." />
            <Rise className="sg-h1-quiet" text="Keep the rest of YouTube." start={220} />
          </h1>
          <p className="sg-lede" data-reveal style={{ '--d': '380ms' } as React.CSSProperties}>
            ShortsGone is a small Chrome extension with one job. It removes YouTube Shorts from your home feed, sidebar, search
            results and subscriptions, and stops /shorts/ links from opening. The videos you came for stay exactly where they were.
          </p>
          <div className="sg-cta" data-reveal style={{ '--d': '460ms' } as React.CSSProperties}>
            <ChromeButton />
            <a className="sg-btn sg-btn-ghost" href="#demo">Watch it work</a>
          </div>
          <p className="sg-meta" data-reveal style={{ '--d': '520ms' } as React.CSSProperties}>
            Free · Chrome extension · v{SHORTS_GONE.version} · Runs only on youtube.com
          </p>

          <div className="sg-hero-stage" data-reveal="scale" style={{ '--d': '300ms' } as React.CSSProperties}>
            <LiveFeed />
          </div>
        </section>

        <section className="sg-statement" data-reveal>
          <img src={mark} alt="" width="120" height="120" loading="lazy" decoding="async" />
          <p>
            I wanted YouTube for the videos I went there to watch. So I built the smallest thing I could that takes Shorts away
            and leaves everything else alone. No dashboard, no account, no streaks. One switch.
          </p>
        </section>

        <section id="removes" className="sg-removes">
          <div className="sg-section-head" data-reveal>
            <p className="sg-kicker">What it removes</p>
            <h2>Remove YouTube Shorts from every corner of YouTube</h2>
            <p>Everything is on by default. If you want Shorts back in one place, each area has its own toggle in the popup.</p>
          </div>
          <div className="sg-surfaces">
            {surfaces.map((s, i) => (
              <article className="sg-surface" key={s.id} id={s.id} data-reveal style={{ '--d': `${(i % 3) * 70}ms` } as React.CSSProperties}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className="sg-toggle-tag"><i />{s.toggle}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="sg-compare" aria-label="Before and after">
          <figure data-reveal="scale">
            <div className="sg-shot">
              <img src={beforeShot} alt="YouTube home page before ShortsGone: a Shorts tab in the sidebar and a row of Shorts in the feed" {...SHOT} loading="lazy" decoding="async" />
            </div>
            <figcaption><span className="sg-red-dot" />Before: a Shorts tab and a Shorts shelf</figcaption>
          </figure>
          <figure data-reveal="scale" style={{ '--d': '120ms' } as React.CSSProperties}>
            <div className="sg-shot">
              <img src={afterShot} alt="YouTube home page with ShortsGone on: no Shorts tab, no Shorts shelf, only videos, and the popup showing Shorts blocked" {...SHOT} loading="lazy" decoding="async" />
            </div>
            <figcaption><span className="sg-blue-dot" />After: just videos</figcaption>
          </figure>
        </section>

        <section className="sg-blocked" data-reveal>
          <div className="sg-blocked-copy">
            <p className="sg-kicker">Shorts links</p>
            <h2>Disable YouTube Shorts links, too</h2>
            <p>
              A friend sends you a Shorts link, or you click one inside YouTube. Instead of the endless scroll, you get this page and a
              way back. Want to watch it anyway? Turn the switch off for a moment.
            </p>
          </div>
          <div className="sg-blocked-card" aria-label="The page ShortsGone shows instead of a Shorts link">
            <img src={banner} alt="ShortsGone — FOCUS > SCROLL" width="1200" height="410" loading="lazy" decoding="async" />
            <p className="sg-blocked-title">YouTube Shorts Blocked</p>
            <p className="sg-blocked-desc">ShortsGone blocked this page. Your focus and attention are protected.</p>
            <span className="sg-blocked-btn" aria-hidden="true">Return to YouTube</span>
          </div>
        </section>

        <section id="privacy" className="sg-privacy">
          <div className="sg-section-head" data-reveal>
            <p className="sg-kicker">Privacy</p>
            <h2>Nothing leaves your browser</h2>
            <p>
              No analytics, no tracking, no network requests. ShortsGone asks Chrome for three things, and here is what each one is for.
            </p>
          </div>
          <div className="sg-perms">
            {permissions.map((p, i) => (
              <div className="sg-perm" key={p.name} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
                <code>{p.detail}</code>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <p className="sg-privacy-note" data-reveal>
            It is plain JavaScript and CSS, Manifest V3, with no frameworks. The hiding rules go in as the page starts loading, so Shorts
            never flash on screen first.
          </p>
        </section>

        <section id="demo" className="sg-demo">
          <div className="sg-section-head sg-center" data-reveal>
            <p className="sg-kicker">Demo</p>
            <h2>One click, Shorts gone</h2>
          </div>
          <div className="sg-film" data-reveal="scale">
            <video
              src={SHORTS_GONE.demo.src}
              poster={SHORTS_GONE.demo.poster}
              width={SHORTS_GONE.demo.width}
              height={SHORTS_GONE.demo.height}
              controls
              muted
              playsInline
              preload="none"
              title="ShortsGone turning on and removing the Shorts shelf from the YouTube home page"
            />
          </div>
        </section>

        <section id="faq" className="sg-faq">
          <h2 data-reveal>Questions</h2>
          <div className="sg-faq-list">
            {shortsGoneFaq.map(f => (
              <details key={f.q} data-reveal>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="sg-final" data-reveal>
          <img src={mark} alt="" width="120" height="120" loading="lazy" decoding="async" />
          <h2>YouTube without Shorts is one click away.</h2>
          <ChromeButton big />
          <p className="sg-meta">Free · v{SHORTS_GONE.version} · Chrome on desktop</p>
        </section>
      </main>

      <footer className="sg-footer">
        <div>
          <p>
            Designed and built by <Link to="/">Yash Mathur</Link>, in plain JavaScript.
          </p>
          <p className="sg-footer-note">YouTube is a trademark of Google LLC. ShortsGone is an independent extension, not made by or affiliated with YouTube or Google.</p>
        </div>
        <p className="sg-footer-links">
          <Link to="/">yashmathur.com</Link>
          <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={config.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  );
};

export default ShortsGonePage;
