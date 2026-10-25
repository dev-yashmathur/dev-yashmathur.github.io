import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../SiteShell/toast';
import './Delight.css';

/** Counts up from 0 the first time it scrolls into view. Renders the final value first, so prerendered HTML has the real number. */
export const CountUp: React.FC<{ to: number; duration?: number }> = ({ to, duration = 900 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);

  return <span ref={ref} className="count-up">{n}</span>;
};

const CITY = 'Bengaluru';
const TIME_ZONE = 'Asia/Kolkata';
// [from hour, what I'm probably doing]
const moods: [number, string][] = [
  [0, 'probably still debugging'],
  [3, 'asleep. hopefully.'],
  [7, 'coffee, then code'],
  [10, 'deep in a pull request'],
  [13, 'lunch, then code review'],
  [15, 'shipping something'],
  [19, 'writing, reading or tinkering'],
  [22, 'side-project hours'],
];

const readClock = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit' });
  const hour = Number(now.toLocaleString('en-US', { timeZone: TIME_ZONE, hour: 'numeric', hourCycle: 'h23' }));
  const mood = [...moods].reverse().find(([h]) => hour >= h)?.[1] ?? moods[0][1];
  return { time, mood };
};

/** "Bengaluru · 11:42 PM · probably still debugging" */
export const LocalTime: React.FC = () => {
  const [clock, setClock] = useState(readClock);
  useEffect(() => setClock(readClock()), []);
  useEffect(() => {
    const id = window.setInterval(() => setClock(readClock()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="local-time">
      <span className="local-dot" aria-hidden="true" />
      <span suppressHydrationWarning>{CITY} · {clock.time}</span>
      <span className="local-mood" suppressHydrationWarning>{clock.mood}</span>
    </div>
  );
};

// Swap these for real ones — they're meant to sound like you.
const nowLines: [string, string][] = [
  ['currently obsessed with', 'review comments people actually accept'],
  ['last thing I broke', 'a migration I swore was idempotent'],
  ['hot take', 'most agents should be a loop and a good prompt'],
  ['currently reading', "other people's postmortems"],
  ['side quest', 'a maze game nobody asked for'],
  ['last thing I shipped', 'Marco, at Hivel'],
];

/** A different line on every visit; click for another. */
export const NowLine: React.FC = () => {
  // Same first line on the server and in the browser; a random one is picked after hydration.
  const [i, setI] = useState(0);
  useEffect(() => setI(Math.floor(Math.random() * nowLines.length)), []);
  const [label, text] = nowLines[i];
  return (
    <button type="button" className="now-line" onClick={() => setI(v => (v + 1) % nowLines.length)} title="Another one">
      <span className="now-rule" aria-hidden="true" />
      <span className="now-text" key={i}><span className="now-label">{label}:</span> {text}</span>
      <span className="now-cycle" aria-hidden="true">↻</span>
    </button>
  );
};

/** Draws a fresh Tambola number whenever its card is hovered. */
export const TambolaBall: React.FC = () => {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(42);
  const [draw, setDraw] = useState(0);
  useEffect(() => {
    const card = ref.current?.closest('.work-card');
    if (!card) return;
    const roll = () => { setN(1 + Math.floor(Math.random() * 90)); setDraw(d => d + 1); };
    setN(1 + Math.floor(Math.random() * 90));
    card.addEventListener('mouseenter', roll);
    return () => card.removeEventListener('mouseenter', roll);
  }, []);
  return <span ref={ref} className="moment tambola-ball" key={draw} aria-hidden="true">{n}</span>;
};

/** A Shorts icon that disappears when you hover the card. Fittingly. */
export const ShortsGone: React.FC = () => (
  <span className="moment shorts-moment" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="22" height="22">
      <rect x="6" y="2" width="12" height="20" rx="6" fill="#ff0033" transform="rotate(-14 12 12)" />
      <path d="M10.2 9.2v5.6l4.6-2.8z" fill="#fff" />
    </svg>
    <em>gone.</em>
  </span>
);

/** A handwritten aside with an arrow that draws itself. */
export const MarginNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="margin-note">
    <span className="margin-note-text">{children}</span>
    <svg className="margin-note-arrow" viewBox="0 0 64 44" width="64" height="44" aria-hidden="true">
      <path pathLength="1" d="M4 38 C 18 42, 40 34, 54 10" />
      <path pathLength="1" d="M44 13 L 55 8 L 58 20" />
    </svg>
  </span>
);
