import { useEffect, useRef, useState } from 'react';
import { config } from '../../utils/config';
import { prefersReducedMotion } from '../SiteShell/toast';

const BRANCH = 'your-hard-problem';
const COMMAND = `git push origin ${BRANCH}`;
const booking = config.social.booking.replace(/^https?:\/\//, '');

type Line = { text: React.ReactNode; progress?: [string, number] };
const OUTPUT: Line[] = [
  { text: 'Enumerating objects: 11, done.' },
  { text: '', progress: ['Counting objects', 11] },
  { text: '', progress: ['Compressing ambiguity', 4] },
  { text: '', progress: ['Writing objects', 11] },
  { text: 'remote:' },
  { text: `remote: Start a conversation for '${BRANCH}':` },
  { text: <>remote:      <a href={config.social.booking} target="_blank" rel="noopener noreferrer" tabIndex={-1}>{booking}</a></> },
  { text: 'remote:' },
  { text: `To ${config.domain}` },
  { text: <> * <span className="push-new">[new branch]</span>  {BRANCH} -&gt; main</> },
];

const Progress: React.FC<{ label: string; total: number }> = ({ label, total }) => {
  const [pct, setPct] = useState(() => (prefersReducedMotion() ? 100 : 0));
  useEffect(() => {
    if (pct >= 100) return;
    const id = window.setTimeout(() => setPct(p => Math.min(100, p + 7 + Math.round(Math.random() * 12))), 30);
    return () => window.clearTimeout(id);
  }, [pct]);
  const done = Math.round((pct / 100) * total);
  return <>{label}: {String(pct).padStart(3)}% ({done}/{total}){pct === 100 ? ', done.' : ''}</>;
};

/** Types out a `git push` of "your hard problem" when the contact section comes into view. */
export const PushTerminal: React.FC = () => {
  const ref = useRef<HTMLPreElement>(null);
  const reduce = prefersReducedMotion();
  const [typed, setTyped] = useState(reduce ? COMMAND.length : 0);
  const [lines, setLines] = useState(reduce ? OUTPUT.length : 0);
  const [started, setStarted] = useState(reduce);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (typed < COMMAND.length) {
      const id = window.setTimeout(() => setTyped(t => t + 1), 28 + Math.random() * 40);
      return () => window.clearTimeout(id);
    }
    if (lines < OUTPUT.length) {
      const id = window.setTimeout(() => setLines(l => l + 1), lines === 0 ? 350 : OUTPUT[lines - 1].progress ? 420 : 90);
      return () => window.clearTimeout(id);
    }
  }, [started, typed, lines]);

  return (
    <pre className="push-terminal" ref={ref} aria-label={`git push origin ${BRANCH}: book a conversation at ${booking}`}>
      <span className="push-prompt">$ </span>{COMMAND.slice(0, typed)}
      {typed < COMMAND.length && <span className="push-caret" aria-hidden="true" />}
      {OUTPUT.slice(0, lines).map((l, i) => (
        <span className="push-line" key={i}>{'\n'}{l.progress ? <Progress label={l.progress[0]} total={l.progress[1]} /> : l.text}</span>
      ))}
      {lines === OUTPUT.length && <span aria-hidden="true">{'\n'}<span className="push-prompt">$ </span><span className="push-caret" /></span>}
    </pre>
  );
};
