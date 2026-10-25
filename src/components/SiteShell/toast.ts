import { createContext, useContext } from 'react';

/** Shows a terminal-style toast: the command, then its output. */
export type Toast = (command: string, output: string) => void;

export const ToastContext = createContext<Toast>(() => {});

export const useToast = () => useContext(ToastContext);

export const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
