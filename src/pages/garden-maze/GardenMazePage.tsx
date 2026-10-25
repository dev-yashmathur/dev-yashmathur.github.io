import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../utils/usePageMeta';
import { useReveal } from '../../utils/useReveal';
import { config } from '../../utils/config';
import { GMAZE, GMAZE_FONTS, META, SHOTS, gmazeFaq } from './content';
import icon from '../../assets/images/GardenMaze/icon-128.webp';
import './GardenMazePage.css';

const SHOT = { width: 1600, height: 900 };
const BG = '#0E1A12';

/* ---------- A small seeded maze, generated the same way on the server and in the browser ---------- */

const seeded = (seed: number) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const MW = 14;
const MH = 9;
const CELL = 40;
const PAD = 14;

/** Recursive backtracker (the same idea the game uses), then a breadth-first search for the way out. */
const buildMaze = () => {
  const rand = seeded(18421);
  const east = Array.from({ length: MW * MH }, () => true);
  const south = Array.from({ length: MW * MH }, () => true);
  const seen = new Set<number>([0]);
  const stack = [0];
  while (stack.length) {
    const i = stack[stack.length - 1];
    const x = i % MW, y = Math.floor(i / MW);
    const next = [
      x + 1 < MW ? i + 1 : -1,
      x > 0 ? i - 1 : -1,
      y + 1 < MH ? i + MW : -1,
      y > 0 ? i - MW : -1,
    ].filter(n => n >= 0 && !seen.has(n));
    if (!next.length) { stack.pop(); continue; }
    const n = next[Math.floor(rand() * next.length)];
    if (n === i + 1) east[i] = false;
    else if (n === i - 1) east[n] = false;
    else if (n === i + MW) south[i] = false;
    else south[n] = false;
    seen.add(n);
    stack.push(n);
  }

  const open = (a: number, b: number) =>
    b === a + 1 ? !east[a] : b === a - 1 ? !east[b] : b === a + MW ? !south[a] : !south[b];
  const prev = new Map<number, number>([[0, -1]]);
  const queue = [0];
  const goal = MW * MH - 1;
  while (queue.length) {
    const i = queue.shift()!;
    if (i === goal) break;
    const x = i % MW;
    for (const n of [x + 1 < MW ? i + 1 : -1, x > 0 ? i - 1 : -1, i + MW < MW * MH ? i + MW : -1, i - MW]) {
      if (n < 0 || prev.has(n) || !open(i, n)) continue;
      prev.set(n, i);
      queue.push(n);
    }
  }
  const route: number[] = [];
  for (let i = goal; i >= 0; i = prev.get(i)!) route.unshift(i);

  const c = (i: number) => `${PAD + (i % MW) * CELL + CELL / 2},${PAD + Math.floor(i / MW) * CELL + CELL / 2}`;
  let walls = '';
  for (let i = 0; i < MW * MH; i++) {
    const x = PAD + (i % MW) * CELL, y = PAD + Math.floor(i / MW) * CELL;
    if (east[i] && i % MW < MW - 1) walls += `M${x + CELL} ${y}v${CELL}`;
    if (south[i] && Math.floor(i / MW) < MH - 1) walls += `M${x} ${y + CELL}h${CELL}`;
  }
  const W = MW * CELL, H = MH * CELL;
  // Outer hedge with a gap to walk in (top left) and one to walk out (bottom right).
  walls += `M${PAD + CELL} ${PAD}h${W - CELL}v${H - CELL}M${PAD + W} ${PAD + H}h${-W}v${-H}`;
  const start = `${PAD + CELL / 2},${PAD - 10}`;
  const end = `${PAD + W + 10},${PAD + H - CELL / 2}`;
  return { walls, route: [start, ...route.map(c), end].join(' '), width: W + PAD * 2, height: H + PAD * 2 };
};

const MAZE = buildMaze();

/** Firefly positions, seeded so the server and the browser agree. */
const fireflies = (seed: number, count: number) => {
  const r = seeded(seed);
  return Array.from({ length: count }, () => ({
    left: `${(r() * 96 + 2).toFixed(1)}%`,
    top: `${(r() * 90 + 4).toFixed(1)}%`,
    '--fd': `${(r() * 6).toFixed(2)}s`,
    '--ft': `${(7 + r() * 6).toFixed(2)}s`,
    '--fx': `${(r() * 60 - 30).toFixed(0)}px`,
    '--fy': `${(r() * -50 - 10).toFixed(0)}px`,
  }) as React.CSSProperties);
};
const HERO_FLIES = fireflies(7, 16);
const FINAL_FLIES = fireflies(29, 12);

const Fireflies: React.FC<{ flies: React.CSSProperties[] }> = ({ flies }) => (
  <div className="gm-flies" aria-hidden="true">
    {flies.map((style, i) => <i key={i} style={style} />)}
  </div>
);

/** A hedge maze that finds its own way out as you scroll past it. */
const SolvingMaze: React.FC = () => {
  const svg = useRef<SVGSVGElement>(null);
  const route = useRef<SVGPolylineElement>(null);
  const lantern = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = svg.current, line = route.current, dot = lantern.current;
    if (!el || !line || !dot) return;
    const total = line.getTotalLength();
    const paint = (p: number) => {
      el.style.setProperty('--solve', p.toFixed(4));
      const pt = line.getPointAtLength(total * p);
      dot.setAttribute('cx', pt.x.toFixed(1));
      dot.setAttribute('cy', pt.y.toFixed(1));
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { paint(1); return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.9 - r.top) / (r.height + vh * 0.45);
      paint(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <svg
      ref={svg}
      className="gm-maze"
      viewBox={`0 0 ${MAZE.width} ${MAZE.height}`}
      role="img"
      aria-label="A generated hedge maze whose path out is drawn in lantern light as you scroll"
    >
      <path className="gm-maze-shadow" d={MAZE.walls} />
      <path className="gm-maze-hedge" d={MAZE.walls} />
      <polyline ref={route} className="gm-maze-route" points={MAZE.route} pathLength={1} />
      <circle className="gm-maze-portal" cx={MAZE.width - PAD + 10} cy={MAZE.height - PAD - CELL / 2} r="16" />
      <circle ref={lantern} className="gm-maze-lantern" cx={PAD + CELL / 2} cy={PAD - 10} r="7" />
    </svg>
  );
};

/** Splits a headline into words that rise through a mask, one after another. */
const Rise: React.FC<{ text: string; start?: number }> = ({ text, start = 0 }) => (
  <>
    {text.split(' ').map((word, i) => (
      <span key={i}>
        <span className="gm-word">
          <span style={{ '--d': `${start + i * 60}ms` } as React.CSSProperties}>{word}</span>
        </span>{' '}
      </span>
    ))}
  </>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
);

const features = [
  {
    id: 'worlds',
    eyebrow: 'Themed worlds',
    title: 'A 3D maze game with hedge, brick and mirror worlds',
    body: 'Each world has its own look and light. Hedge is where you start; brick and mirror are themes you unlock in the shop with the coins you collect along the way.',
    points: ['Hedge, brick and mirror styles', 'Unlock themes with coins from the levels', 'Walk it, don’t look down on it'],
    shot: SHOTS.brickShot,
    alt: 'Walking through red brick corridors in The Garden Maze',
  },
  {
    id: 'mirror',
    eyebrow: 'Mirror maze',
    title: 'A mirror maze game with real reflections',
    body: 'The mirror world is an actual mirror maze. The walls reflect the maze around you, so corridors seem to carry on forever and you start to doubt which way is real.',
    points: ['Real-time reflections, not painted-on shine', 'Corridors that seem to go on forever', 'A glowing portal arch to find at the end'],
    shot: SHOTS.mirrorShot,
    alt: 'A glowing portal arch in the mirror world of The Garden Maze',
    shimmer: true,
  },
  {
    id: 'coins',
    eyebrow: 'Coins, keys & gates',
    title: 'Coins to collect, keys to find, a portal to reach',
    body: 'Coins are scattered through every level and go into a saved wallet. Every third level has a locked gate that needs a hidden key first. Spend coins in the shop on themes and on helpers like a compass and hints.',
    points: ['5, 10 or 20 coins a level, by difficulty', 'Locked gates that need a hidden key', 'A compass, and hints that reveal the map'],
    shot: SHOTS.gateShot,
    alt: 'A themed portal arch at the end of a brick maze',
  },
];

const platforms = ['macOS', 'Windows', 'iPad', 'Android'];

const GardenMazePage: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const torch = useRef<HTMLDivElement>(null);
  usePageMeta(META.title, META.description, true);
  useReveal(root);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.documentElement.style.backgroundColor = BG;
    document.body.style.background = BG;
    if (!document.querySelector(`link[href="${GMAZE_FONTS}"]`)) {
      const link = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: GMAZE_FONTS });
      document.head.appendChild(link);
    }
  }, []);

  const moveTorch = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !torch.current) return;
    const r = torch.current.getBoundingClientRect();
    torch.current.style.setProperty('--tx', `${e.clientX - r.left}px`);
    torch.current.style.setProperty('--ty', `${e.clientY - r.top}px`);
  };

  return (
    <div className="gmaze" ref={root}>
      <header className="gm-bar">
        <div className="gm-bar-inner">
          <a className="gm-brand" href="#top" aria-label="The Garden Maze, back to top">
            <img src={icon} alt="" width="34" height="34" />
            <span>The Garden Maze</span>
          </a>
          <nav className="gm-nav" aria-label="The Garden Maze">
            <a href="#generated">Mazes</a>
            <a href="#worlds">Worlds</a>
            <a href="#haunted">Haunted</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="gm-btn gm-btn-small" href="#trailer">Trailer</a>
        </div>
      </header>

      <main id="top">
        <section className="gm-hero">
          <Fireflies flies={HERO_FLIES} />
          <p className="gm-pill" data-reveal>
            <span>100 levels</span><span>First person</span><span>Mirror mazes</span>
          </p>
          <h1>
            <span className="gm-h1-small"><Rise text="The Garden Maze:" /></span>
            <Rise text="a maze game you play from the inside." start={180} />
          </h1>
          <p className="gm-lede" data-reveal style={{ '--d': '380ms' } as React.CSSProperties}>
            A first-person 3D maze game with 100 generated levels: hedge, brick and real mirror mazes, locked gates and hidden keys,
            coins to collect, and a few haunted levels where something is watching.
          </p>
          <div className="gm-cta" data-reveal style={{ '--d': '460ms' } as React.CSSProperties}>
            <a className="gm-btn gm-btn-primary" href="#trailer"><PlayIcon />Watch the trailer</a>
            <a className="gm-btn gm-btn-ghost" href={GMAZE.notify}>Get notified when it launches</a>
          </div>
          <p className="gm-meta" data-reveal style={{ '--d': '520ms' } as React.CSSProperties}>
            Built for macOS · Windows · iPad · Android — VR coming soon. Not released yet.
          </p>

          <div className="gm-hero-stage" data-reveal="scale" style={{ '--d': '260ms' } as React.CSSProperties}>
            <img src={SHOTS.gateShot} alt="First-person view of a glowing portal arch at the end of a brick maze in The Garden Maze" {...SHOT} fetchPriority="high" />
            <a className="gm-stage-play" href="#trailer" aria-label="Watch the trailer"><PlayIcon /></a>
          </div>
        </section>

        <section className="gm-why" data-reveal>
          <p className="gm-kicker">Why first person</p>
          <p className="gm-statement">
            Most maze games are played from above, in third person, and feel more like puzzles. This one puts you inside the maze,
            where you can’t see over the hedge.
          </p>
          <p className="gm-why-note">
            I have always wondered why mazes can’t be as complex as the ones in movies. In the real world a maze like that needs a lot
            of space and can never change. In a game, it can be as big and twisted as you like, and different every level.
          </p>
        </section>

        <section id="generated" className="gm-generated">
          <div className="gm-generated-copy" data-reveal>
            <p className="gm-kicker">Procedural generation</p>
            <h2>A procedurally generated maze game, 100 levels deep</h2>
            <p>
              Every level is generated from a seed and a difficulty, so the mazes can be larger and more complicated than anything you
              could build for real, and no two are the same. They grow as you go.
            </p>
            <ul>
              <li>34 easy, 33 medium and 33 hard levels</li>
              <li>From 9×9 cells at the start to 21×21 at the end</li>
              <li>The same level is the same maze, every time you play it</li>
            </ul>
          </div>
          <figure className="gm-maze-card" data-reveal="scale">
            <SolvingMaze />
            <figcaption>A maze generated on this page, finding its way out as you scroll.</figcaption>
          </figure>
        </section>

        <section className="gm-features" aria-label="Features">
          {features.map((f, i) => (
            <article className={`gm-feature${i % 2 ? ' flip' : ''}`} key={f.id} id={f.id}>
              <div className="gm-feature-copy" data-reveal>
                <p className="gm-kicker">{f.eyebrow}</p>
                <h2>{f.title}</h2>
                <p>{f.body}</p>
                <ul>{f.points.map(p => <li key={p}>{p}</li>)}</ul>
              </div>
              <figure className={`gm-shot${f.shimmer ? ' gm-shimmer' : ''}`} data-reveal="scale">
                <img src={f.shot} alt={f.alt} {...SHOT} loading="lazy" decoding="async" />
              </figure>
            </article>
          ))}
        </section>

        <div id="haunted" className="gm-haunted">
          <section className="gm-haunted-inner">
            <div className="gm-haunted-copy" data-reveal>
              <p className="gm-kicker">Haunted levels</p>
              <h2>Some nights, the maze is not empty</h2>
              <p>
                One level in four is haunted. It is night, it is foggy, and all you have is a flashlight. There are candles, strange
                sounds and knocking in the walls. And there is the Watcher: a figure that shows up down a corridor or creeps up behind
                you, and is gone the moment you look straight at it. Let it touch you and you are dragged back the way you came.
              </p>
            </div>
            <div className="gm-torch" ref={torch} onPointerMove={moveTorch} data-reveal="scale">
              <img src={SHOTS.watcherShot} alt="A dark brick corridor on a haunted level of The Garden Maze, lit only by a flashlight" {...SHOT} loading="lazy" decoding="async" />
              <p className="gm-torch-hint" aria-hidden="true">Move your light</p>
            </div>
            <figure className="gm-haunted-second" data-reveal>
              <img src={SHOTS.hauntedShot} alt="A haunted level of The Garden Maze lit only by the player's flashlight" {...SHOT} loading="lazy" decoding="async" />
            </figure>
          </section>
        </div>

        <section id="platforms" className="gm-platforms" data-reveal>
          <div>
            <p className="gm-kicker">Platforms</p>
            <h2>A maze game for Mac, PC, iPad and Android. VR next.</h2>
            <p>
              Built in Unity, with builds for macOS, Windows, iPad and Android. Play with a mouse and keyboard, a gamepad, or touch
              controls on a tablet. Being inside the maze is the whole point, so virtual reality is the next step.
            </p>
          </div>
          <ul className="gm-chips" aria-label="Platforms">
            {platforms.map(p => <li key={p}>{p}</li>)}
            <li className="gm-chip-soon">VR <small>coming soon</small></li>
          </ul>
        </section>

        <section id="trailer" className="gm-trailer">
          <div className="gm-trailer-head" data-reveal>
            <p className="gm-kicker">The trailer</p>
            <h2>Thirty seconds inside the maze</h2>
          </div>
          <div className="gm-film" data-reveal="scale">
            <video src={GMAZE.trailer.src} poster={GMAZE.trailer.poster} controls playsInline preload="none" title={GMAZE.trailer.title} width="1920" height="1080" />
          </div>
          <div className="gm-film-small" data-reveal>
            <div className="gm-film">
              <video src={GMAZE.cutdown.src} poster={GMAZE.cutdown.poster} controls playsInline preload="none" title={GMAZE.cutdown.title} width="1920" height="1080" />
            </div>
            <p>Short on time? The 15-second cut.</p>
          </div>
          <figure className="gm-aerial" data-reveal>
            <img src={SHOTS.aerialShot} alt="Aerial view of a generated hedge maze in The Garden Maze" {...SHOT} loading="lazy" decoding="async" />
            <figcaption>The view you never get in the game: a hedge level from above.</figcaption>
          </figure>
        </section>

        <section id="faq" className="gm-faq">
          <h2 data-reveal>Questions</h2>
          <div className="gm-faq-list">
            {gmazeFaq.map(f => (
              <details key={f.q} data-reveal>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="gm-final" data-reveal>
          <Fireflies flies={FINAL_FLIES} />
          <img className="gm-final-icon" src={icon} alt="" width="88" height="88" loading="lazy" />
          <h2>Find your way out.</h2>
          <p>The Garden Maze isn’t out yet. Drop me a line and I’ll write back the day it launches.</p>
          <div className="gm-cta">
            <a className="gm-btn gm-btn-primary gm-btn-big" href={GMAZE.notify}>Get notified when it launches</a>
            <a className="gm-btn gm-btn-ghost gm-btn-big" href="#trailer"><PlayIcon />Watch the trailer</a>
          </div>
        </section>
      </main>

      <footer className="gm-footer">
        <p>
          Designed and built by <Link to="/">Yash Mathur</Link>, in Unity and C#.
        </p>
        <p className="gm-footer-links">
          <Link to="/">yashmathur.com</Link>
          <Link to={GMAZE.privacy}>Privacy policy</Link>
          <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={config.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  );
};

export default GardenMazePage;
