import { useEffect } from 'react';

/**
 * Reveals [data-reveal] elements inside `root` once, as they enter the viewport.
 * Sets a data attribute (not a class) so React re-renders don't wipe it.
 */
export const useReveal = (root: React.RefObject<HTMLElement | null>, key?: unknown) => {
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>('[data-reveal]:not([data-shown])');
    if (!els?.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.setAttribute('data-shown', '');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [root, key]);
};
