import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../utils/usePageMeta';
import { useReveal } from '../../utils/useReveal';
import { config } from '../../utils/config';
import { META, TAMBOLA, TAMBOLA_FONTS, tambolaFaq } from './content';
import mainShot from '../../assets/images/TamboloApp/Tambolo.webp';
import playersShot from '../../assets/images/TamboloApp/Player initialization.webp';
import prizesShot from '../../assets/images/TamboloApp/Prize Selection.webp';
import ticketsShot from '../../assets/images/TamboloApp/Generated Randomized Tickets.webp';
import highlightShot from '../../assets/images/TamboloApp/Automatic Ticket Highlighting.webp';
import claimShot from '../../assets/images/TamboloApp/prize claim.webp';
import './TambolaPage.css';

const BG = '#FFF4DE';

/* Player 1's ticket from the app's own screenshots: 3 rows × 9 columns, five numbers per row. */
const TICKET: (number | null)[][] = [
  [3, 11, 24, 32, null, 50, null, null, null],
  [null, 16, null, 33, 43, 55, 68, null, null],
  [8, null, 25, null, 44, 57, null, null, 87],
];

/* A fixed calling order (no Math.random), arranged so a short game reaches First 5, all three lines and a full house. */
const DRAWS = [47, 11, 72, 3, 59, 90, 24, 16, 66, 50, 81, 6, 29, 32, 77, 43, 61, 33, 2, 55, 85, 8, 39, 68, 14, 74, 25, 52, 44, 30, 87, 63, 21, 57];
/* The prerendered page shows a game already under way. */
const START = 9;
const STEP_MS = 1700;
const HOLD_MS = 4200;

interface Claim { prize: string; at: number }

/** The prizes this ticket has won after `n` draws, mirroring the app's claims table. */
const claimsAfter = (n: number): Claim[] => {
  const called = new Set<number>();
  const out: Claim[] = [];
  for (let i = 0; i < n; i++) {
    const num = DRAWS[i];
    called.add(num);
    const row = TICKET.findIndex(r => r.includes(num));
    if (row < 0) continue;
    const done = TICKET.flat().filter(x => x !== null && called.has(x)).length;
    if (done === 5) out.push({ prize: 'FIRST 5', at: i });
    if (TICKET[row].every(x => x === null || called.has(x))) out.push({ prize: `LINE: ${row + 1}`, at: i });
    if (done === 15) out.push({ prize: 'FULL HOUSE', at: i });
  }
  return out;
};

/** Colour family for a number ball, by its ten. */
const tone = (num: number) => ['marigold', 'vermilion', 'rose', 'mint', 'sky'][Math.floor(num / 10) % 5];

const Ball: React.FC<{ num: number; className?: string }> = ({ num, className = '' }) => (
  <span className={`tb-ball tb-${tone(num)} ${className}`}>
    <span>{num}</span>
  </span>
);

/** Splits a headline into words that rise through a mask, one after another. */
const Rise: React.FC<{ text: string; start?: number }> = ({ text, start = 0 }) => (
  <>
    {text.split(' ').map((word, i) => (
      <span key={i}>
        <span className="tb-word">
          <span style={{ '--d': `${start + i * 55}ms` } as React.CSSProperties}>{word}</span>
        </span>{' '}
      </span>
    ))}
  </>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const GitHubButton: React.FC<{ big?: boolean; label?: string }> = ({ big, label = 'Get it on GitHub' }) => (
  <a className={`tb-btn tb-btn-primary${big ? ' tb-btn-big' : ''}`} href={TAMBOLA.repo} target="_blank" rel="noopener noreferrer">
    <GitHubIcon />
    {label}
  </a>
);

/** The little ticket mark used as the brand icon. */
const TicketMark = () => (
  <svg viewBox="0 0 36 24" width="36" height="24" aria-hidden="true" className="tb-mark">
    <rect x="1" y="1" width="34" height="22" rx="4" fill="#C4D6E8" stroke="#0F1A2B" strokeWidth="2" />
    {[0, 1, 2].map(r => [0, 1, 2, 3, 4].map(c => (
      <rect key={`${r}${c}`} x={5 + c * 5.4} y={5 + r * 5} width="4.2" height="3.6" rx="1" fill={(r + c) % 3 === 0 ? '#FF9EEA' : '#CCFFCC'} />
    )))}
  </svg>
);

const steps = [
  {
    id: 'players',
    title: 'Add your players',
    body: 'Type how many tickets you need, then a name for each player. Everyone in the family gets a ticket, the host included.',
    shot: playersShot, w: 1600, h: 529,
    alt: 'Tambola app player set-up: number of tickets and a name for each player',
  },
  {
    id: 'prizes',
    title: 'Choose the prizes',
    body: 'Tick the prizes you want to play for: First to N, Lines and Houses. Set N, how many lines and how many full houses, then press PLAY!',
    shot: prizesShot, w: 1600, h: 723,
    alt: 'Tambola prize selection screen with First to N, Lines and Houses',
  },
  {
    id: 'tickets',
    title: 'Tickets are generated',
    body: 'Each player gets a random 3×9 ticket with five numbers on every row, each column in its own range and sorted, just like a printed Housie ticket.',
    shot: ticketsShot, w: 1600, h: 1413,
    alt: 'Two randomly generated Tambola tickets, one for each player',
  },
  {
    id: 'calling',
    title: 'Call numbers, watch tickets light up',
    body: 'Press “Next number” to draw from 1 to 90 with no repeats. The number turns pink on every ticket that has it, so nobody has to strike anything off by hand.',
    shot: highlightShot, w: 1600, h: 1047,
    alt: 'Number 84 called and automatically highlighted on Player 2’s ticket',
  },
  {
    id: 'claims',
    title: 'Winners show up on their own',
    body: 'When a ticket completes a prize, the player and prize appear in the claims table. Tick “Claimed” and the game moves on, no stalling to check tickets.',
    shot: claimShot, w: 1600, h: 1038,
    alt: 'Claims table showing Player 2 winning First N, with their ticket highlighted',
  },
];

const rules = [
  { title: 'Proper Housie tickets', body: '3 rows, 9 columns, 15 numbers. Column one holds 1–9, the last holds 80–90, and every column is sorted.' },
  { title: '1 to 90, no repeats', body: 'The numbers are shuffled when the game starts. “Previous Numbers” shows what has been called so far.' },
  { title: 'Prizes it checks', body: 'First to N, every line and full houses, checked on each ticket the moment a number is called.' },
];

/** The live caller: draws balls in a fixed order and highlights the ticket, like the app does. */
const Caller: React.FC = () => {
  const [n, setN] = useState(START);
  const [auto, setAuto] = useState(false);
  const [announce, setAnnounce] = useState('');
  const stage = useRef<HTMLDivElement>(null);

  // Autoplay only when motion is welcome and the caller is on screen.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => setAuto(visible && !reduce.matches && !document.hidden);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; update(); });
    if (stage.current) io.observe(stage.current);
    reduce.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      io.disconnect();
      reduce.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    if (!auto) return;
    const done = n >= DRAWS.length;
    const t = window.setTimeout(() => setN(done ? 0 : n + 1), done ? HOLD_MS : STEP_MS);
    return () => window.clearTimeout(t);
  }, [auto, n]);

  const next = () => {
    const to = n >= DRAWS.length ? 0 : n + 1;
    setN(to);
    setAnnounce(to === 0 ? 'New game' : `Number ${DRAWS[to - 1]}`);
  };

  const called = new Set(DRAWS.slice(0, n));
  const current = n > 0 ? DRAWS[n - 1] : null;
  const trail = DRAWS.slice(Math.max(0, n - 7), Math.max(0, n - 1)).reverse();
  const claims = claimsAfter(n);
  const fullHouse = claims.some(c => c.prize === 'FULL HOUSE');

  return (
    <div className="tb-stage" ref={stage}>
      <div className="tb-caller">
        <div className="tb-caller-head">
          <button type="button" className="tb-next" onClick={next}>
            {n >= DRAWS.length ? 'New game' : 'Next number'}
          </button>
          <span className="tb-count">{n} of 90</span>
        </div>
        <div className="tb-now" aria-hidden="true">
          {current !== null ? <Ball key={n} num={current} className="tb-ball-big" /> : <span className="tb-ball tb-ball-big tb-ball-empty"><span>?</span></span>}
          <div className="tb-trail">
            {trail.map(num => <Ball key={num} num={num} />)}
          </div>
        </div>
        <p className="tb-sr" aria-live="polite">{announce}</p>
        <div className="tb-claims" role="table" aria-label="Prize claims">
          <div className="tb-claims-row tb-claims-th" role="row">
            <span role="columnheader">Name</span><span role="columnheader">Prize</span><span role="columnheader">Claimed</span>
          </div>
          {claims.map(c => (
            <div className="tb-claims-row" role="row" key={c.prize}>
              <span role="cell">Player 1 :: 1</span>
              <span role="cell">{c.prize}</span>
              <span role="cell"><i className="tb-tick" aria-hidden="true" /><span className="tb-sr">Yes</span></span>
            </div>
          ))}
          {claims.length === 0 && <p className="tb-claims-empty">No winners yet</p>}
        </div>
      </div>

      <div className={`tb-ticket${fullHouse ? ' is-house' : ''}`}>
        <p className="tb-ticket-name">Player 1 :: 1</p>
        <div className="tb-grid" role="table" aria-label="Player 1’s Tambola ticket">
          {TICKET.map((row, r) => (
            <div className="tb-grid-row" role="row" key={r}>
              {row.map((num, c) => (
                <span
                  role="cell"
                  key={c}
                  className={`tb-cell${num !== null && called.has(num) ? ' is-hit' : ''}${num !== null && num === current ? ' is-new' : ''}`}
                >
                  {num ?? ''}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="tb-ticket-foot">{fullHouse ? 'Full house!' : `${TICKET.flat().filter(x => x !== null && called.has(x)).length} of 15 struck`}</p>
      </div>
    </div>
  );
};

const TambolaPage: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  usePageMeta(META.title, META.description, true);
  useReveal(root);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.documentElement.style.backgroundColor = BG;
    document.body.style.background = BG;
    if (!document.querySelector(`link[href="${TAMBOLA_FONTS}"]`)) {
      const link = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: TAMBOLA_FONTS });
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="tambola" ref={root}>
      <header className="tb-bar">
        <div className="tb-bar-inner">
          <a className="tb-brand" href="#top" aria-label="Tambola home">
            <TicketMark />
            <span>Tambola</span>
          </a>
          <nav className="tb-nav" aria-label="Tambola">
            <a href="#how">How it works</a>
            <a href="#story">Story</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="tb-btn tb-btn-small" href={TAMBOLA.repo} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />GitHub
          </a>
        </div>
      </header>

      <main id="top">
        <section className="tb-hero">
          <div className="tb-toran" aria-hidden="true" />
          <p className="tb-pill" data-reveal>
            <span className="tb-pill-dot" aria-hidden="true" />
            Tambola · Housie · desktop app for your PC
          </p>
          <h1>
            <Rise text="Host Tambola at home, and play along too." />
          </h1>
          <p className="tb-lede" data-reveal style={{ '--d': '300ms' } as React.CSSProperties}>
            A Java desktop app for Tambola, or Housie: it generates a ticket for every player, calls the numbers from 1 to 90,
            highlights them on every ticket and spots the winners. Nobody has to sit out to run the game.
          </p>
          <div className="tb-cta" data-reveal style={{ '--d': '400ms' } as React.CSSProperties}>
            <GitHubButton />
            <a className="tb-btn tb-btn-ghost" href="#how">See how a game runs</a>
          </div>
          <p className="tb-meta" data-reveal style={{ '--d': '450ms' } as React.CSSProperties}>
            Java · Swing · built in 2020 · source code on GitHub
          </p>

          <div className="tb-hero-stage" data-reveal="scale" style={{ '--d': '250ms' } as React.CSSProperties}>
            <Caller />
          </div>
        </section>

        <section className="tb-problem" data-reveal>
          <p className="tb-kicker">The problem</p>
          <p className="tb-statement">
            Every family Tambola night, one person missed the fun to deal tickets, call numbers and check every “Full house!” by hand.
          </p>
        </section>

        <section id="how" className="tb-steps" aria-labelledby="how-title">
          <div className="tb-steps-head" data-reveal>
            <p className="tb-kicker">How a game runs</p>
            <h2 id="how-title">From names to a full house in five steps</h2>
          </div>
          <ol className="tb-step-list">
            {steps.map((s, i) => (
              <li className={`tb-step${i % 2 ? ' flip' : ''}`} key={s.id} id={s.id}>
                <div className="tb-step-copy" data-reveal>
                  <span className={`tb-ball tb-${tone((i + 1) * 10 + i)} tb-step-num`} aria-hidden="true"><span>{i + 1}</span></span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                <figure className="tb-step-shot" data-reveal="scale">
                  <img src={s.shot} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async" />
                </figure>
              </li>
            ))}
          </ol>
        </section>

        <section className="tb-rules" aria-label="What the app knows about Tambola">
          {rules.map((r, i) => (
            <div className="tb-rule" key={r.title} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </div>
          ))}
        </section>

        <section id="story" className="tb-story" aria-labelledby="story-title">
          <div className="tb-story-copy" data-reveal>
            <p className="tb-kicker">Why I built it · 2020</p>
            <h2 id="story-title">Lockdown game nights, minus the bookkeeping</h2>
            <p>
              During the 2020 lockdowns our family game nights moved to Zoom and Google Meet, but one person always had to miss
              playing to hand out tickets and check them. Every time someone claimed a win the game stalled, because checking was
              completely manual.
            </p>
            <p>
              I wanted something simple that automated the boring parts so everyone could play, while keeping all the human, social
              bits of the game exactly as they were.
            </p>
            <p className="tb-aside">
              It was my first real project, and the UI shows it. I’d design it differently today, but it did its job: nobody had to
              sit out.
            </p>
          </div>
          <figure className="tb-story-shot" data-reveal="scale">
            <img src={mainShot} alt="Tambola app mid-game: three players’ tickets with called numbers highlighted, next to the number caller and claims table" width="1600" height="1124" loading="lazy" decoding="async" />
          </figure>
        </section>

        <section id="faq" className="tb-faq">
          <h2 data-reveal>Questions</h2>
          <div className="tb-faq-list">
            {tambolaFaq.map(f => (
              <details key={f.q} data-reveal>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="tb-final" data-reveal>
          <div className="tb-final-balls" aria-hidden="true">
            {[7, 22, 45, 61, 90].map(num => <Ball key={num} num={num} />)}
          </div>
          <h2>Next game night, let everyone play.</h2>
          <GitHubButton big />
          <p className="tb-meta">Source code on GitHub · runs with Java</p>
        </section>
      </main>

      <footer className="tb-footer">
        <p>
          Designed and built by <Link to="/">Yash Mathur</Link>, in Java with Swing.
        </p>
        <p className="tb-footer-links">
          <Link to="/">yashmathur.com</Link>
          <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={config.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  );
};

export default TambolaPage;
