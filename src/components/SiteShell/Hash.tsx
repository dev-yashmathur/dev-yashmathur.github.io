import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, useToast } from './toast';

const HEX = '0123456789abcdef';

/** A short commit-style hash: scrambles on hover, copies on click. */
const Hash: React.FC<{ value: string }> = ({ value }) => {
  const [text, setText] = useState(value);
  const timer = useRef<number>(undefined);
  const toast = useToast();

  useEffect(() => () => window.clearInterval(timer.current), []);

  const scramble = () => {
    if (prefersReducedMotion()) return;
    window.clearInterval(timer.current);
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame / 1.5);
      setText(value.split('').map((c, i) => (i < settled ? c : HEX[Math.floor(Math.random() * 16)])).join(''));
      if (settled >= value.length) window.clearInterval(timer.current);
    }, 28);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast(`echo ${value} | pbcopy`, 'Copied to clipboard. Not sure what you\'ll do with it.');
    } catch {
      toast(`echo ${value} | pbcopy`, 'Clipboard said no.');
    }
  };

  return (
    <button type="button" className="hash" onMouseEnter={scramble} onFocus={scramble} onClick={copy} aria-label={`Copy hash ${value}`}>
      {text}
    </button>
  );
};

export default Hash;
