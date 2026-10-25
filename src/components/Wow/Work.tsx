import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../SiteShell/toast';

/** A screenshot that trails the cursor over any work card with a data-peek image. */
export const WorkPeek: React.FC<{ listRef: React.RefObject<HTMLElement | null> }> = ({ listRef }) => {
  const box = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const el = box.current;
    if (!list || !el || !window.matchMedia('(hover: hover) and (min-width: 900px)').matches) return;
    const reduce = prefersReducedMotion();
    let target = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    let raf = 0;
    let preloaded = false;

    const tick = () => {
      const k = reduce ? 1 : 0.18;
      const dx = (target.x - pos.x) * k;
      pos = { x: pos.x + dx, y: pos.y + (target.y - pos.y) * k };
      const tilt = Math.max(-8, Math.min(8, dx * 0.4));
      const h = el.offsetHeight;
      const y = Math.max(8, Math.min(window.innerHeight - h - 8, pos.y - h / 2));
      el.style.transform = `translate3d(${pos.x + 28}px, ${y}px, 0) rotate(${tilt}deg)`;
      if (Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5) raf = requestAnimationFrame(tick);
    };

    let last: { x: number; y: number } | null = null;

    const update = (hit: Element | null, x: number, y: number) => {
      last = { x, y };
      const card = hit?.closest<HTMLElement>('[data-peek]') ?? null;
      const next = card?.dataset.peek ?? null;
      if (!preloaded) {
        preloaded = true;
        list.querySelectorAll<HTMLElement>('[data-peek]').forEach(c => { new Image().src = c.dataset.peek!; });
      }
      // Hide over links so the peek never covers what you're about to click.
      // The release link stretches over the whole card, so test its own box rather than the event target.
      const pill = card?.querySelector('.release')?.getBoundingClientRect();
      const overPill = !!pill && x >= pill.left - 12 && x <= pill.right + 12 && y >= pill.top - 12 && y <= pill.bottom + 12;
      const overLink = overPill || !!hit?.closest('.work-link');
      setSrc(overLink ? null : next);
      target = { x, y };
      if (pos.x === 0 && pos.y === 0) pos = { ...target };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') update(e.target as Element, e.clientX, e.clientY);
    };
    const onLeave = () => { last = null; setSrc(null); };
    // Scrolling moves cards under a still cursor without any pointer events, so re-check what's beneath it.
    const onScroll = () => {
      if (!last) return;
      const hit = document.elementFromPoint(last.x, last.y);
      if (hit && list.contains(hit)) update(hit, last.x, last.y);
      else onLeave();
    };

    list.addEventListener('pointermove', onMove);
    list.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      list.removeEventListener('pointermove', onMove);
      list.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [listRef]);

  return (
    <div className={`work-peek${src ? ' on' : ''}`} ref={box} aria-hidden="true">
      {src && <img src={src} alt="" />}
    </div>
  );
};
