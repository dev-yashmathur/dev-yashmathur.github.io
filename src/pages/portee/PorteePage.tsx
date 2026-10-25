import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../utils/usePageMeta';
import { useReveal } from '../../utils/useReveal';
import { config } from '../../utils/config';
import { PORTEE, PORTEE_FONTS, porteeFaq } from './content';
import icon from '../../assets/images/Portee/portee-icon.svg';
import claudeLogo from '../../assets/images/Portee/agents/claude.png';
import codexLogo from '../../assets/images/Portee/agents/codex.svg';
import cursorLogo from '../../assets/images/Portee/agents/cursor.png';
import opencodeLogo from '../../assets/images/Portee/agents/opencode.svg';
import storageShot from '../../assets/images/Portee/storage-review.webp';
import catalogAddShot from '../../assets/images/Portee/catalog-add.webp';
import sessionsShot from '../../assets/images/Portee/sessions-search.webp';
import permissionsShot from '../../assets/images/Portee/permissions.webp';
import libraryShot from '../../assets/images/Portee/library.webp';
import { Moss, MossGuide } from './Moss';
import './PorteePage.css';

const SHOT = { width: 1600, height: 1045 };

const agents = [
  { name: 'Claude Code', logo: claudeLogo },
  { name: 'Codex', logo: codexLogo },
  { name: 'Cursor', logo: cursorLogo },
  { name: 'OpenCode', logo: opencodeLogo },
];

const features = [
  {
    id: 'storage',
    eyebrow: 'Storage',
    title: 'See what every coding agent is costing your Mac',
    body: 'People watch RAM and GPUs. The silent cost is storage: sessions, caches and app data pile up across every agent. Portée shows, per agent, how many processes are running, how much memory they use and how much disk they hold.',
    points: ['Disk, memory and process count for each agent', 'Cleanable groups you review before anything goes', 'Nothing is deleted until you choose'],
    shot: storageShot,
    alt: 'Portée Storage view: RAM, disk use and cleanable groups for Claude Code, Codex, OpenCode and Cursor',
  },
  {
    id: 'catalog',
    eyebrow: 'Catalog',
    title: 'Add an MCP server or skill once. Sync it everywhere.',
    body: 'MCP servers, skills, tools and hooks live in one catalog. Add one and choose which agents get it, instead of repeating the setup in every tool and every project.',
    points: ['One catalog for MCP servers, skills, tools and hooks', 'Adopt the configs you already have', 'TOML edited in place: comments and formatting survive'],
    shot: catalogAddShot,
    alt: 'Adding an MCP server once in Portée and choosing which coding agents to sync it to',
  },
  {
    id: 'sessions',
    eyebrow: 'Sessions',
    title: 'Find any past session, across every agent',
    body: 'Search the sessions of Claude Code, Codex, Cursor and OpenCode by the words you remember, then open the one you need and carry on instead of starting over.',
    points: ['One search across all four agents', 'Runs on a local index on your Mac', 'Costs no tokens; nothing leaves your machine'],
    shot: sessionsShot,
    alt: 'Searching past coding-agent sessions across Claude Code, Codex, Cursor and OpenCode in Portée',
  },
  {
    id: 'permissions',
    eyebrow: 'Permissions',
    title: 'What each agent may do, at a glance',
    body: 'Allowed, ask-first and blocked rules for every agent in one place, kept separate from macOS privacy permissions so neither gets confused for the other.',
    points: ['Allow, ask first and block rules side by side', 'Separate from macOS privacy settings', 'A guided flow for Full Disk Access'],
    shot: permissionsShot,
    alt: 'Portée permission rules for coding agents: allowed, ask first and blocked',
  },
];

const promises = [
  { title: 'Runs on your Mac', body: 'A native app with a local index. No account to create.' },
  { title: 'You decide what goes', body: 'Clean-up is always a review, never an automatic sweep.' },
  { title: 'No tokens spent', body: 'Search and scans never call a model, so they cost nothing.' },
];

/** Splits a headline into words that rise through a mask, one after another. */
const Rise: React.FC<{ text: string; start?: number }> = ({ text, start = 0 }) => (
  <>
    {text.split(' ').map((word, i) => (
      <span key={i}>
        <span className="pt-word">
          <span style={{ '--d': `${start + i * 55}ms` } as React.CSSProperties}>{word}</span>
        </span>{' '}
      </span>
    ))}
  </>
);

const DownloadButton: React.FC<{ big?: boolean }> = ({ big }) => (
  <a className={`pt-btn pt-btn-primary${big ? ' pt-btn-big' : ''}`} href={PORTEE.download} download>
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8s-1.8-.8-3-.8C6.9 7.2 5.4 8.1 4.6 9.6 2.9 12.5 4.2 16.8 5.8 19.1c.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.4-1-2.4-3.9ZM14.1 5.6c.6-.8 1.1-1.9 1-3-1 .1-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3Z" /></svg>
    Download for Mac
  </a>
);

const PorteePage: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const [finalWave, setFinalWave] = useState(0);
  usePageMeta(PORTEE.title, PORTEE.description, true);
  useReveal(root);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.documentElement.style.backgroundColor = '#F7F1DE';
    document.body.style.background = '#F7F1DE';
    if (!document.querySelector(`link[href="${PORTEE_FONTS}"]`)) {
      const link = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: PORTEE_FONTS });
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="portee" ref={root}>
      <header className="pt-bar">
        <div className="pt-bar-inner">
          <a className="pt-brand" href="#top" aria-label="Portée home">
            <img src={icon} alt="" width="32" height="32" />
            <span>Portée</span>
          </a>
          <nav className="pt-nav" aria-label="Portée">
            <a href="#features">Features</a>
            <a href="#film">Film</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="pt-btn pt-btn-small" href={PORTEE.download} download>Download</a>
        </div>
      </header>

      <main id="top">
        <section className="pt-hero" data-moss="hello">
          <p className="pt-agents" data-reveal>
            <span className="pt-agent-logos" aria-hidden="true">
              {agents.map(a => <img key={a.name} src={a.logo} alt="" width="20" height="20" />)}
            </span>
            For Claude Code, Codex, Cursor &amp; OpenCode
          </p>
          <h1 className="pt-rise">
            <Rise text="See what your coding agents are really costing your Mac." />
          </h1>
          <p className="pt-lede" data-reveal style={{ '--d': '300ms' } as React.CSSProperties}>
            Portée shows the disk and memory every AI coding agent is using, helps you clean up safely, syncs your MCP servers and
            skills across agents, and finds any past session. A free, native macOS app.
          </p>
          <div className="pt-cta" data-reveal style={{ '--d': '400ms' } as React.CSSProperties}>
            <DownloadButton />
            <a className="pt-btn pt-btn-ghost" href="#film">Watch the film</a>
          </div>
          <p className="pt-meta" data-reveal style={{ '--d': '450ms' } as React.CSSProperties}>
            Free · v{PORTEE.version} · {PORTEE.fileSize} · {PORTEE.requirements}
          </p>

          <div className="pt-hero-stage" data-reveal="scale" style={{ '--d': '250ms' } as React.CSSProperties}>
            <div className="pt-window">
              <div className="pt-window-bar" aria-hidden="true"><i /><i /><i /></div>
              <img src={storageShot} alt="Portée Storage view showing the disk and memory used by each coding agent" {...SHOT} fetchPriority="high" />
            </div>
          </div>
        </section>

        <section className="pt-problem" data-reveal data-moss="problem">
          <p className="pt-kicker">The silent cost</p>
          <p className="pt-statement">
            Everyone thinks about RAM and GPUs when they think about the cost of AI. The cost to your storage is the one that gets missed,
            and if you use more than one agent, so does keeping them in sync.
          </p>
        </section>

        <section id="features" className="pt-features" aria-label="Features">
          {features.map((f, i) => (
            <article className={`pt-feature${i % 2 ? ' flip' : ''}`} key={f.id} id={f.id} data-moss={f.id}>
              <div className="pt-feature-copy" data-reveal>
                <p className="pt-kicker">{f.eyebrow}</p>
                <h2>{f.title}</h2>
                <p>{f.body}</p>
                <ul>{f.points.map(p => <li key={p}>{p}</li>)}</ul>
              </div>
              <figure className="pt-feature-shot" data-reveal="scale">
                <div className="pt-window">
                  <div className="pt-window-bar" aria-hidden="true"><i /><i /><i /></div>
                  <img src={f.shot} alt={f.alt} {...SHOT} loading="lazy" decoding="async" />
                </div>
              </figure>
            </article>
          ))}
        </section>

        <section className="pt-detect" data-reveal data-moss="detect">
          <div className="pt-detect-copy">
            <p className="pt-kicker">This Mac</p>
            <h2>It finds your agents for you</h2>
            <p>Open Portée and it lists the coding agents installed on your Mac and where each one keeps its data. No setup, no config files to point it at.</p>
          </div>
          <img src={libraryShot} alt="Portée's This Mac page listing the detected coding agents and their locations" {...SHOT} loading="lazy" decoding="async" />
        </section>

        <section id="film" className="pt-film" data-moss="film">
          <div className="pt-film-head" data-reveal>
            <p className="pt-kicker">The film</p>
            <h2>Portée in 45 seconds</h2>
          </div>
          <div className="pt-film-frame" data-reveal="scale">
            <video src={PORTEE.film.src} poster={PORTEE.film.poster} controls playsInline preload="none" title="Portée launch film" />
          </div>
        </section>

        <section className="pt-promises" aria-label="Privacy" data-moss="promises">
          {promises.map((p, i) => (
            <div className="pt-promise" key={p.title} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </section>

        <section id="faq" className="pt-faq" data-moss="faq">
          <h2 data-reveal>Questions</h2>
          <div className="pt-faq-list">
            {porteeFaq.map(f => (
              <details key={f.q} data-reveal>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="pt-final" data-reveal onPointerEnter={() => setFinalWave(n => n + 1)}>
          <div className="pt-final-moss">
            <Moss mood="cheer" action="wave" actionKey={finalWave} />
            <p className="pt-final-bubble">Take me home?</p>
          </div>
          <h2>Give your coding agents one home.</h2>
          <DownloadButton big />
          <p className="pt-meta">Free · {PORTEE.requirements} · Not yet notarized: on first launch, right-click the app and choose Open.</p>
        </section>
      </main>

      <MossGuide hideWhen=".pt-final" />

      <footer className="pt-footer">
        <p>
          Designed and built by <Link to="/">Yash Mathur</Link>, in Rust with axum, a native webview and SQLite.
        </p>
        <p className="pt-footer-links">
          <Link to="/">yashmathur.com</Link>
          <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={config.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  );
};

export default PorteePage;
