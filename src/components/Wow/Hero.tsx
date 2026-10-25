import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../SiteShell/toast';

const HEADLINE = 'I turn vague requirements into reliable production software.';
const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** "vague requirements" jitters in blurry and settles; "reliable production software" snaps into focus. */
export const SettleHeadline: React.FC = () => {
  const [vague] = useState(() =>
    'vague requirements'.split(' ').map((word, w) =>
      word.split('').map((char, i) => ({
        char,
        style: {
          '--x': `${rand(-10, 10).toFixed(1)}px`,
          '--y': `${rand(-8, 8).toFixed(1)}px`,
          '--r': `${rand(-14, 14).toFixed(1)}deg`,
          '--b': `${rand(3, 8).toFixed(1)}px`,
          '--d': `${(w * 6 + i) * 22}ms`,
        } as React.CSSProperties,
      })),
    ),
  );
  return (
    <h1 className="settle" aria-label={HEADLINE}>
      <span aria-hidden="true">
        I turn{' '}
        {vague.map((word, w) => (
          <span key={w}>
            <span className="settle-word">
              {word.map((c, i) => <span className="settle-char" style={c.style} key={i}>{c.char}</span>)}
            </span>{' '}
          </span>
        ))}
        into <span className="settle-snap">reliable production software.</span>
      </span>
    </h1>
  );
};

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const CELLS = [18, 13, 9, 7, 5, 4, 3, 2];

/** The photo arrives as a 1-bit ordered dither that resolves coarse to fine, then fades to the real thing. Hover replays it. */
export const DitherPortrait: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const replay = useRef<() => void>(() => {});
  const [revealed, setRevealed] = useState(prefersReducedMotion);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    let source: HTMLImageElement | null = null;
    let cell = CELLS[CELLS.length - 1];
    let timer = 0;

    const draw = () => {
      if (!source) return;
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      const dpr = window.devicePixelRatio || 1;
      cv.width = w * dpr; cv.height = h * dpr;
      const ctx = cv.getContext('2d')!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
      const tmp = document.createElement('canvas');
      tmp.width = cols; tmp.height = rows;
      const tctx = tmp.getContext('2d', { willReadFrequently: true })!;
      // cover-crop the photo into the grid
      const sw = source.naturalWidth, sh = source.naturalHeight;
      const scale = Math.max(cols / sw, rows / sh);
      const cw = cols / scale, ch = rows / scale;
      tctx.drawImage(source, (sw - cw) / 2, (sh - ch) / 2, cw, ch, 0, 0, cols, rows);
      const px = tctx.getImageData(0, 0, cols, rows).data;
      ctx.fillStyle = getComputedStyle(el).getPropertyValue('--text').trim() || '#151515';
      // Ink is light in dark mode, so light areas get the dots there.
      const dark = el.closest('.pf')?.getAttribute('data-theme') === 'dark';
      const size = cell > 3 ? cell - 1 : cell;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;
          if ((dark ? 1 - lum : lum) < (BAYER[(y % 4) * 4 + (x % 4)] + 0.5) / 16) ctx.fillRect(x * cell, y * cell, size, size);
        }
      }
    };

    const resolve = () => {
      window.clearTimeout(timer);
      if (prefersReducedMotion()) { setRevealed(true); return; }
      setRevealed(false);
      let step = 0;
      const next = () => {
        cell = CELLS[step]; draw();
        timer = ++step < CELLS.length
          ? window.setTimeout(next, 110)
          : window.setTimeout(() => setRevealed(true), 160);
      };
      next();
    };
    replay.current = resolve;

    let started = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started || !source) return;
      started = true; resolve();
    });

    const img = new Image();
    img.onload = () => { source = img; io.observe(el); };
    img.onerror = () => setRevealed(true);
    img.src = src;

    const ro = new ResizeObserver(() => draw());
    ro.observe(el);
    const mo = new MutationObserver(() => draw());
    const root = el.closest('.pf');
    if (root) mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => { io.disconnect(); ro.disconnect(); mo.disconnect(); window.clearTimeout(timer); };
  }, [src]);

  return (
    <div className={`portrait dither${revealed ? ' revealed' : ''}`} ref={wrap} onMouseEnter={() => { if (revealed) replay.current(); }}>
      <canvas ref={canvas} aria-hidden="true" />
      <img src={src} alt={alt} />
    </div>
  );
};
