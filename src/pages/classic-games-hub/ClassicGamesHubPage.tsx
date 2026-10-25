import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../utils/usePageMeta';
import { useReveal } from '../../utils/useReveal';
import { config } from '../../utils/config';
import { CGH, CGH_FONTS, META, cghFaq } from './content';
import logo from '../../assets/images/ClassicGamesHub/cgh-logo.webp';
import homeShot from '../../assets/images/ClassicGamesHub/ClassicGamesHub.webp';
import classicShot from '../../assets/images/ClassicGamesHub/TicTacToe.webp';
import stackShot from '../../assets/images/ClassicGamesHub/StackTicTacToe.webp';
import vanishingShot from '../../assets/images/ClassicGamesHub/VanishingTicTacToe.webp';
import ultimateShot from '../../assets/images/ClassicGamesHub/UltimateTicTacToe.webp';
import './ClassicGamesHubPage.css';

const BG = '#F2F3DA';

const games = [
  {
    id: 'classic',
    eyebrow: 'Classic & Anti',
    title: 'The one you know, and the one that flips it',
    body: 'Classic is the 3×3 game from every school notebook: get three in a row. Anti uses the same board with the goal turned upside down: if you make three of your own in a row, you lose.',
    points: ['Same board, opposite goals', 'Anti warns you about moves that would sink you'],
    shot: classicShot,
    size: { width: 1600, height: 1583 },
    alt: 'A Classic Games Hub board: blue X and red O pieces on a wooden 3×3 grid',
    links: [
      { label: 'Play Classic', href: CGH.games.classic },
      { label: 'Play Anti', href: CGH.games.anti },
    ],
  },
  {
    id: 'stack',
    eyebrow: 'Stack',
    title: 'Size matters',
    body: 'Each player gets six pieces: two large, two medium and two small. A bigger piece can cover a smaller one, even your opponent’s, and only the pieces on top count towards three in a row.',
    points: ['Two large, two medium, two small each', 'Cover a smaller piece to take the square'],
    shot: stackShot,
    size: { width: 1600, height: 1603 },
    alt: 'Stack mode on Classic Games Hub: large, medium and small pieces labelled on each square',
    links: [{ label: 'Play Stack', href: CGH.games.stack }],
  },
  {
    id: 'vanishing',
    eyebrow: 'Vanishing',
    title: 'Only three pieces each, so nothing stays put',
    body: 'You can only have three pieces on the board. Place a fourth and your oldest one disappears. The piece that goes next turns grey, so you can see the board changing under you. With six pieces at most on nine squares, the board never fills up.',
    points: ['Three pieces each, at most', 'Your oldest piece vanishes when you place a new one'],
    shot: vanishingShot,
    size: { width: 1600, height: 1600 },
    alt: 'Vanishing mode on Classic Games Hub: the oldest X has turned grey before it disappears',
    links: [{ label: 'Play Vanishing', href: CGH.games.vanishing }],
  },
  {
    id: 'ultimate',
    eyebrow: 'Ultimate',
    title: 'Nine games inside one',
    body: 'The board is nine small boards in a 3×3 grid. Where you play inside a small board decides which small board your opponent has to play in next. Win a small board to claim it, and claim three in a row to win.',
    points: ['Every move picks your opponent’s next board', 'If that board is finished, they can play anywhere'],
    shot: ultimateShot,
    size: { width: 1600, height: 1609 },
    alt: 'Ultimate mode on Classic Games Hub: nine small boards, some claimed by a large X, one highlighted as the next to play',
    links: [{ label: 'Play Ultimate', href: CGH.games.ultimate }],
  },
];

const modes = [
  { title: 'Pass and play', body: 'Two players, one phone or tablet, taking turns.', tone: 'blue' },
  { title: 'Against the computer', body: 'For when there’s nobody around to play with.', tone: 'orange' },
  { title: 'Online rooms', body: 'Create a room, share the code, and a friend joins from their own device.', tone: 'coral' },
  { title: 'No sign-up', body: 'Play as a guest straight away. Signing in just shows your name to people you play online.', tone: 'sage' },
];

const process = [
  {
    title: 'Ideation and validation',
    body: 'I found the idea in social media trends, then checked it with friends and looked at how much people engaged with similar games before writing any code.',
  },
  {
    title: 'Design and development',
    body: 'I gave it a warm, playful, slightly 3D wooden look, wrote the game logic in React and Next.js, and used Firebase for live multiplayer so there was no server to run.',
  },
  {
    title: 'Testing and launch',
    body: 'Local two-player and computer modes came first, then online rooms. It deploys to Vercel, and I keep an eye on its search metrics to help people find it.',
  },
];

/* ---------- Self-playing Vanishing board ---------- */

/** A scripted game of Vanishing tic-tac-toe (cells 0–8, X moves first). X wins on the square it lost earlier. */
const SCRIPT = [4, 0, 1, 7, 6, 2, 8, 3, 0, 5, 4];
const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
/** The step shown before the loop starts and when motion is reduced: both players hold three pieces, oldest greyed. */
const START_STEP = 6;

type Piece = { cell: number; p: 'X' | 'O'; id: number };

const boardAt = (step: number) => {
  const held: Record<'X' | 'O', Piece[]> = { X: [], O: [] };
  let vanished: Piece | null = null;
  for (let i = 0; i < step; i++) {
    const piece: Piece = { cell: SCRIPT[i], p: i % 2 ? 'O' : 'X', id: i };
    held[piece.p].push(piece);
    const gone = held[piece.p].length > 3 ? held[piece.p].shift()! : null;
    if (i === step - 1) vanished = gone;
  }
  const mover = step ? (step % 2 ? 'X' : 'O') : null;
  const line = mover ? LINES.find(l => l.every(c => held[mover].some(pc => pc.cell === c))) ?? null : null;
  return { held, vanished, line, mover };
};

const centre = (cell: number) => ({ x: (cell % 3) * 100 + 50, y: Math.floor(cell / 3) * 100 + 50 });

const SelfPlayingBoard: React.FC = () => {
  const [step, setStep] = useState(START_STEP);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Only run while visible, the tab is in front and motion is allowed.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => setRunning(visible && !document.hidden && !reduce.matches);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; update(); });
    if (ref.current) io.observe(ref.current);
    document.addEventListener('visibilitychange', update);
    reduce.addEventListener('change', update);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', update);
      reduce.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const done = step === SCRIPT.length;
    const delay = done ? 2800 : step === 0 ? 700 : 950;
    const t = window.setTimeout(() => setStep(s => (s >= SCRIPT.length ? 0 : s + 1)), delay);
    return () => window.clearTimeout(t);
  }, [running, step]);

  const { held, vanished, line, mover } = boardAt(step);
  const pieces = [...held.X, ...held.O];
  const oldest = new Set((['X', 'O'] as const).filter(p => held[p].length === 3 && !line).map(p => held[p][0].id));
  const next = step % 2 ? 'O' : 'X';

  let note = `${next} to move`;
  if (line && mover) note = `${mover} wins with three in a row`;
  else if (vanished) note = `${vanished.p}’s oldest piece vanishes`;
  else if (step === 0) note = 'New game';

  const ends = line ? [centre(line[0]), centre(line[2])] : null;

  return (
    <figure className="cgh-live" ref={ref}>
      <div className="cgh-board" role="img" aria-label="A scripted game of Vanishing tic-tac-toe playing itself: each player keeps three pieces and the oldest one disappears when a fourth is placed.">
        {Array.from({ length: 9 }, (_, cell) => {
          const piece = pieces.find(pc => pc.cell === cell);
          const ghost = vanished && vanished.cell === cell && !piece ? vanished : null;
          const shown = piece ?? ghost;
          return (
            <div className="cgh-cell" key={cell}>
              {shown && (
                <span
                  key={shown.id}
                  className={`cgh-piece cgh-${shown.p.toLowerCase()}${ghost ? ' is-gone' : ''}${oldest.has(shown.id) ? ' is-oldest' : ''}${line?.includes(cell) && piece ? ' is-win' : ''}`}
                />
              )}
            </div>
          );
        })}
        {ends && (
          <svg className="cgh-winline" viewBox="0 0 300 300" aria-hidden="true">
            <line x1={ends[0].x - (ends[1].x - ends[0].x) * 0.18} y1={ends[0].y - (ends[1].y - ends[0].y) * 0.18} x2={ends[1].x + (ends[1].x - ends[0].x) * 0.18} y2={ends[1].y + (ends[1].y - ends[0].y) * 0.18} pathLength={1} />
          </svg>
        )}
      </div>
      <figcaption aria-hidden="true">
        <span className="cgh-live-tag">Vanishing · playing itself</span>
        <span className="cgh-live-note" key={note}>{note}</span>
      </figcaption>
    </figure>
  );
};

/* ---------- Page ---------- */

/** Splits a headline into words that rise through a mask, one after another. */
const Rise: React.FC<{ text: string; start?: number }> = ({ text, start = 0 }) => (
  <>
    {text.split(' ').map((word, i) => (
      <span key={i}>
        <span className="cgh-word">
          <span style={{ '--d': `${start + i * 55}ms` } as React.CSSProperties}>{word}</span>
        </span>{' '}
      </span>
    ))}
  </>
);

const PlayButton: React.FC<{ big?: boolean; label?: string }> = ({ big, label = 'Play now' }) => (
  <a className={`cgh-btn cgh-btn-primary${big ? ' cgh-btn-big' : ''}`} href={CGH.site}>
    {label}
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M5 10h10m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </a>
);

const DemoVideo: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${CGH.youtubeId}`;
  return (
    <>
      <div className="cgh-film-frame" data-reveal="scale">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${CGH.youtubeId}?autoplay=1&rel=0`}
            title="Classic Games Hub demo video"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" className="cgh-film-facade" onClick={() => setPlaying(true)} aria-label="Play the Classic Games Hub demo video">
            <img src={homeShot} alt="" width="1600" height="782" loading="lazy" decoding="async" />
            <span className="cgh-film-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            </span>
          </button>
        )}
      </div>
      <p className="cgh-film-note">
        Plays from YouTube when you press play. <a href={watchUrl} target="_blank" rel="noopener noreferrer">Open on YouTube</a>
      </p>
    </>
  );
};

const ClassicGamesHubPage: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  usePageMeta(META.title, META.description, true);
  useReveal(root);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const html = document.documentElement.style.backgroundColor;
    const body = document.body.style.background;
    document.documentElement.style.backgroundColor = BG;
    document.body.style.background = BG;
    if (!document.querySelector(`link[href="${CGH_FONTS}"]`)) {
      const link = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: CGH_FONTS });
      document.head.appendChild(link);
    }
    return () => {
      document.documentElement.style.backgroundColor = html;
      document.body.style.background = body;
    };
  }, []);

  return (
    <div className="cgh" ref={root}>
      <header className="cgh-bar">
        <div className="cgh-bar-inner">
          <a className="cgh-brand" href="#top" aria-label="Classic Games Hub, back to top">
            <img src={logo} alt="" width="34" height="34" />
            <span>Classic Games Hub</span>
          </a>
          <nav className="cgh-nav" aria-label="Classic Games Hub">
            <a href="#games">Games</a>
            <a href="#demo">Demo</a>
            <a href="#story">Story</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="cgh-btn cgh-btn-small" href={CGH.site}>Play now</a>
        </div>
      </header>

      <main id="top">
        <section className="cgh-hero">
          <div className="cgh-hero-copy">
            <p className="cgh-kicker" data-reveal>Classic Games Hub · by Yash Mathur</p>
            <h1>
              <Rise text="Old games, new twists, and someone to play them with." />
            </h1>
            <p className="cgh-lede" data-reveal style={{ '--d': '320ms' } as React.CSSProperties}>
              I kept seeing clever twists on childhood games on social media, and had nobody around to play them with and nowhere online
              to try them. So I built Classic Games Hub: five takes on <span className="cgh-nw">tic-tac-toe</span> you can play in the browser with a friend, against the
              computer, or in an online room.
            </p>
            <div className="cgh-cta" data-reveal style={{ '--d': '420ms' } as React.CSSProperties}>
              <PlayButton label="Play at classicgameshub.com" />
              <a className="cgh-btn cgh-btn-ghost" href="#demo">Watch the demo</a>
            </div>
            <p className="cgh-meta" data-reveal style={{ '--d': '480ms' } as React.CSSProperties}>
              Free · In your browser · No sign-up needed
            </p>
          </div>
          <div className="cgh-hero-stage" data-reveal="scale" style={{ '--d': '200ms' } as React.CSSProperties}>
            <SelfPlayingBoard />
          </div>
        </section>

        <section className="cgh-why" data-reveal>
          <p className="cgh-kicker">Why it exists</p>
          <p className="cgh-statement">
            Plain tic-tac-toe almost always ends in a draw. The twists keep the simple rules and the old feeling, but you no longer know how it
            ends, which makes it worth playing again.
          </p>
        </section>

        <section id="games" className="cgh-games" aria-label="The games">
          <header className="cgh-section-head" data-reveal>
            <p className="cgh-kicker">The games</p>
            <h2>Five games on one wooden board</h2>
          </header>
          {games.map((g, i) => (
            <article className={`cgh-game${i % 2 ? ' flip' : ''}`} key={g.id} id={g.id}>
              <div className="cgh-game-copy" data-reveal>
                <p className="cgh-kicker">{g.eyebrow}</p>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
                <ul>{g.points.map(p => <li key={p}>{p}</li>)}</ul>
                <p className="cgh-game-links">
                  {g.links.map(l => (
                    <a key={l.href} href={l.href}>{l.label} on Classic Games Hub <span aria-hidden="true">→</span></a>
                  ))}
                </p>
              </div>
              <figure className="cgh-game-shot" data-reveal="scale">
                <img src={g.shot} alt={g.alt} {...g.size} loading="lazy" decoding="async" />
              </figure>
            </article>
          ))}
        </section>

        <section className="cgh-modes" aria-label="Ways to play">
          {modes.map((m, i) => (
            <div className={`cgh-mode cgh-tone-${m.tone}`} key={m.title} data-reveal style={{ '--d': `${i * 70}ms` } as React.CSSProperties}>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </section>

        <section id="demo" className="cgh-film">
          <div className="cgh-film-head" data-reveal>
            <p className="cgh-kicker">The demo</p>
            <h2>See it played</h2>
          </div>
          <DemoVideo />
        </section>

        <section id="story" className="cgh-story">
          <div className="cgh-story-head" data-reveal>
            <p className="cgh-kicker">How I built it · 2024</p>
            <h2>A side project that started with nobody to play with</h2>
            <p>
              The twists I saw online looked like the perfect mix: simple, exciting, and still true to the games I grew up with. I couldn’t
              find a single place to play them with friends or strangers, so I made one.
            </p>
            <ul className="cgh-stack" aria-label="Built with">
              {['React', 'Next.js', 'Firebase', 'Vercel', 'SEO'].map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <ol className="cgh-steps">
            {process.map((p, i) => (
              <li key={p.title} data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <span className="cgh-step-n" aria-hidden="true">{['X', 'O', 'X'][i]}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="faq" className="cgh-faq">
          <h2 data-reveal>Questions</h2>
          <div className="cgh-faq-list">
            {cghFaq.map(f => (
              <details key={f.q} data-reveal>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="cgh-final" data-reveal>
          <img src={logo} alt="" width="72" height="72" loading="lazy" />
          <h2>Your move.</h2>
          <p>Grab a friend, or take on the computer.</p>
          <PlayButton big label="Play at classicgameshub.com" />
          <p className="cgh-meta">Free · In your browser · No sign-up needed</p>
        </section>
      </main>

      <footer className="cgh-footer">
        <p>
          Designed and built by <Link to="/">Yash Mathur</Link>, in React and Next.js with Firebase.
        </p>
        <p className="cgh-footer-links">
          <Link to="/">yashmathur.com</Link>
          <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={config.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  );
};

export default ClassicGamesHubPage;
