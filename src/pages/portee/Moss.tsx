import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../components/SiteShell/toast';
import './Moss.css';

export type MossMood = 'calm' | 'worry' | 'cheer';
export type MossAction = 'hop' | 'wave' | 'scratch';

interface MossProps {
  mood?: MossMood;
  /** Plays once each time `actionKey` changes. */
  action?: MossAction | null;
  actionKey?: number;
  /** Eyes follow the cursor. */
  look?: boolean;
  className?: string;
}

/** Moss, Portée's seed mascot — the launch film's rig with an idle life loop, moods and gestures. */
export const Moss: React.FC<MossProps> = ({ mood = 'calm', action = null, actionKey = 0, look = true, className = '' }) => {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current;
    if (!el || !look || prefersReducedMotion()) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        // eyes sit about halfway down, slightly left of the bounding box centre
        const dx = e.clientX - (r.left + r.width * 0.51);
        const dy = e.clientY - (r.top + r.height * 0.52);
        const d = Math.hypot(dx, dy) || 1;
        const pull = Math.min(1, d / 220);
        el.style.setProperty('--ex', `${((dx / d) * 3.2 * pull).toFixed(2)}px`);
        el.style.setProperty('--ey', `${((dy / d) * 2.6 * pull).toFixed(2)}px`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); };
  }, [look]);

  return (
    <svg ref={svg} className={`moss ${className}`} data-mood={mood} viewBox="0 0 180 164" overflow="visible" aria-hidden="true">
      <ellipse className="m-shadow" cx="92" cy="150" rx="48" ry="8" />
      <g className="m-act" data-action={action ?? undefined} key={actionKey}>
        <g className="m-body">
          <g className="m-leaf">
            <path d="M91 43C91 20 108 13 122 16c-2 18-13 29-31 27Z" fill="#B0BA99" stroke="#4E220F" strokeWidth="2" strokeLinejoin="round" />
            <path d="M93 40c9-9 16-15 25-20" fill="none" stroke="#9D6638" strokeWidth="2" strokeLinecap="round" />
            <path d="M86 46V34" stroke="#4E220F" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g className="m-arm-l">
            <path d="M59 97c-15 6-21 18-16 28" fill="none" stroke="#4E220F" strokeWidth="13" strokeLinecap="round" opacity=".72" />
            <path d="M59 97c-15 6-21 18-16 28" fill="none" stroke="#B0BA99" strokeWidth="9" strokeLinecap="round" />
            <circle cx="44" cy="127" r="7" fill="#F7F1DE" stroke="#4E220F" strokeWidth="1.8" />
          </g>
          <g className="m-arm-r">
            <path d="M124 97c15 6 21 18 16 28" fill="none" stroke="#4E220F" strokeWidth="13" strokeLinecap="round" opacity=".72" />
            <path d="M124 97c15 6 21 18 16 28" fill="none" stroke="#B0BA99" strokeWidth="9" strokeLinecap="round" />
            <circle cx="140" cy="127" r="7" fill="#F7F1DE" stroke="#4E220F" strokeWidth="1.8" />
          </g>
          <path d="M57 78c0-21 15-37 35-37s35 16 35 37v36c0 21-15 35-35 35s-35-14-35-35V78Z" fill="#9D6638" stroke="#4E220F" strokeWidth="3" strokeLinejoin="round" />
          <path d="M67 77c0-14 11-25 25-25s25 11 25 25v25c0 14-11 23-25 23s-25-9-25-23V77Z" fill="#F7F1DE" stroke="#B0BA99" strokeWidth="2" />
          <g className="m-look">
            <g className="m-eyes"><circle cx="80" cy="86" r="4" fill="#4E220F" /><circle cx="104" cy="86" r="4" fill="#4E220F" /></g>
          </g>
          <path className="m-mouth m-mouth-calm" d="M84 103c5 3 9 3 14 0" />
          <path className="m-mouth m-mouth-worry" d="M84 107c5-4 9-4 14 0" />
          <path className="m-mouth m-mouth-cheer" d="M82 102c6 8 14 8 20 0" />
          <path d="M72 130h40" stroke="#B0BA99" strokeWidth="2" strokeLinecap="round" opacity=".8" />
        </g>
      </g>
    </svg>
  );
};

interface Beat { mood: MossMood; line: string; action?: MossAction }

/** What Moss says and does as each part of the page reaches the middle of the screen. */
const BEATS: Record<string, Beat> = {
  hello: { mood: 'cheer', line: "Hi, I'm Moss. I keep your coding agents tidy.", action: 'wave' },
  problem: { mood: 'worry', line: 'Gigabytes, quietly piling up…', action: 'scratch' },
  storage: { mood: 'worry', line: "That's a lot of cache. Want to look first?", action: 'scratch' },
  catalog: { mood: 'cheer', line: "Add it once. I'll sync the rest.", action: 'hop' },
  sessions: { mood: 'cheer', line: 'Found it! And no tokens spent.', action: 'hop' },
  permissions: { mood: 'calm', line: "Who's allowed to do what, at a glance." },
  detect: { mood: 'cheer', line: 'I found four agents on this Mac.', action: 'wave' },
  film: { mood: 'calm', line: 'Grab some popcorn. 45 seconds.' },
  promises: { mood: 'calm', line: 'Everything stays right here on your Mac.' },
  faq: { mood: 'worry', line: 'Ooh, good questions.', action: 'scratch' },
};
const POKES = ['Boop.', "Hey! That tickles.", 'Still here. Still tidy.', '100% seed, 0% cloud.', 'I sprout when you ship.'];

/**
 * The corner companion: lives bottom-left like it does in the app, reacts to the section in view,
 * and hops when clicked. Hides itself once `hideWhen` (the closing call to action) is on screen.
 */
export const MossGuide: React.FC<{ hideWhen?: string }> = ({ hideWhen }) => {
  const [beat, setBeat] = useState<Beat & { key: number }>({ mood: 'calm', line: '', key: 0 });
  const [bubble, setBubble] = useState(false);
  const [hidden, setHidden] = useState(true);
  const pokes = useRef(0);

  const play = (b: Beat) => {
    setBeat(prev => ({ ...b, key: prev.key + 1 }));
    setBubble(true);
  };

  useEffect(() => {
    if (!bubble) return;
    const id = window.setTimeout(() => setBubble(false), 4200);
    return () => window.clearTimeout(id);
  }, [bubble, beat.key]);

  useEffect(() => {
    // Arrive a moment after load, then react to whichever [data-moss] section crosses the middle band.
    const arrive = window.setTimeout(() => { setHidden(false); play(BEATS.hello); }, 900);
    let current = 'hello';
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const key = (e.target as HTMLElement).dataset.moss!;
        if (!e.isIntersecting || key === current || !BEATS[key]) return;
        current = key;
        play(BEATS[key]);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    document.querySelectorAll('[data-moss]').forEach(el => io.observe(el));

    const end = hideWhen ? document.querySelector(hideWhen) : null;
    const endIo = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.25 });
    if (end) endIo.observe(end);
    return () => { window.clearTimeout(arrive); io.disconnect(); endIo.disconnect(); };
  }, [hideWhen]);

  const poke = () => {
    play({ mood: 'cheer', line: POKES[pokes.current++ % POKES.length], action: 'hop' });
  };

  return (
    <div className={`moss-guide${hidden ? ' is-hidden' : ''}`}>
      {beat.line && (
        <p className={`moss-bubble${bubble ? ' is-on' : ''}`} key={beat.key} role="status" aria-live="polite">{beat.line}</p>
      )}
      <button type="button" className="moss-poke" onClick={poke} aria-label="Moss, Portée's mascot">
        <Moss mood={beat.mood} action={beat.action ?? null} actionKey={beat.key} />
      </button>
    </div>
  );
};
