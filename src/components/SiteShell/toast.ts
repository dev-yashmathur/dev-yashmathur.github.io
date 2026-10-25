import { createContext, useContext } from 'react';

/** Shows a terminal-style toast: the command, then its output. */
export type Toast = (command: string, output: string) => void;

export const ToastContext = createContext<Toast>(() => {});

export const useToast = () => useContext(ToastContext);

/** Safe to call while prerendering, where there is no window. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
