import { useEffect, useRef } from 'react';

/** Feeds the cursor position to each child of a grid so their borders can glow toward it. */
export const useSpotlight = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      Array.from(el.children).forEach(child => {
        const r = child.getBoundingClientRect();
        (child as HTMLElement).style.setProperty('--mx', `${e.clientX - r.left}px`);
        (child as HTMLElement).style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    const onLeave = () => Array.from(el.children).forEach(child => {
      (child as HTMLElement).style.setProperty('--mx', '-999px');
    });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); };
  }, []);
  return ref;
};
