import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../utils/usePageMeta';
import { useReveal } from '../../utils/useReveal';
import { config } from '../../utils/config';
import { INCREZIO, INCREZIO_FILMS, INCREZIO_FONTS, increzioFaq } from './content';
import icon from '../../assets/images/IncrezioHabitTracker/lp-icon.webp';
import widgetShot from '../../assets/images/IncrezioHabitTracker/lp-widget.webp';
import goalShot from '../../assets/images/IncrezioHabitTracker/lp-goal.webp';
import progressShot from '../../assets/images/IncrezioHabitTracker/lp-progress.webp';
import resetShot from '../../assets/images/IncrezioHabitTracker/lp-reset.webp';
import shieldShot from '../../assets/images/IncrezioHabitTracker/lp-shield.webp';
import centuryShot from '../../assets/images/IncrezioHabitTracker/lp-century.webp';
import weekShot from '../../assets/images/IncrezioHabitTracker/lp-week.webp';
import homeShot from '../../assets/images/IncrezioHabitTracker/lp-home.webp';
import habitsShot from '../../assets/images/IncrezioHabitTracker/lp-habits.webp';
import './IncrezioPage.css';

const SHOT = { width: 720, height: 1600 };
const PAPER = '#F8F8F6';

type Shot = { src: string; alt: string };
type Feature = {
  id: string;
  sticker: string;
  tone: 'blue' | 'green' | 'purple' | 'yellow' | 'orange';
  title: string;
  body: string;
  points: string[];
  shots: Shot[];
};

const features: Feature[] = [
  {
    id: 'widgets',
    sticker: 'Home screen widgets',
    tone: 'blue',
    title: 'A habit tracker that lives on your home screen',
    body: 'I loved streaks, but only remembered them when I opened the app. So Increzio puts them where you look a hundred times a day. Tick a habit right from the widget and the streak updates without opening anything.',
    points: ['A streak widget with your current run', 'A Today widget you can tick habits on', 'Tap through to the app for the rest'],
    shots: [{ src: widgetShot, alt: 'Increzio home screen widgets on Android: a 99-day streak and a Today list with Journal and Meditate ticked off' }],
  },
  {
    id: 'incremental',
    sticker: 'Tiny gains, big results',
    tone: 'green',
    title: 'Incremental goals that grow 1% at a time',
    body: 'Inspired by Atomic Habits: tiny daily improvements compound. For anything you measure, set a starting goal, a target and a percentage. Every time you complete the habit, the goal nudges up, until it reaches your target.',
    points: ['Pages, minutes, kilometres, any unit', 'Grows 1% by default, or whatever you choose', 'A chart shows the goal climbing as you go'],
    shots: [
      { src: goalShot, alt: 'Editing a habit in Increzio: track an amount and grow the goal over time, from 10 to 60 pages at 1% per completion' },
      { src: progressShot, alt: 'Increzio progress chart for Read: the goal growing from 10 to almost 27 pages over three months' },
    ],
  },
  {
    id: 'day-reset',
    sticker: 'For night owls',
    tone: 'purple',
    title: 'A habit tracker with a custom day reset',
    body: 'I’m a night owl. Every tracker I tried decided my day was over at midnight, while I was still doing the habits. In Increzio you choose when your new day starts, so a late-night tick counts for the day you were actually living.',
    points: ['Start your day anywhere from 12 AM to 12 PM', 'Streaks and “today” follow your reset time', 'An optional nudge an hour before the reset, only if habits are still open'],
    shots: [{ src: resetShot, alt: 'Increzio settings in dark mode: new day starts at 4:00 AM, with a reminder before reset' }],
  },
  {
    id: 'streaks',
    sticker: 'Streaks break. Habits don’t.',
    tone: 'orange',
    title: 'A streak tracker that forgives one honest slip',
    body: 'Did the habit, forgot to tick it? A broken streak is when a lot of people give up, so Increzio offers a Streak Shield instead: three a month, to save yesterday. Count your streak by all habits or by any habit, whichever keeps you going.',
    points: ['Three Streak Shields every month', '“All habits” or “Any habit” streaks', 'Milestones from your first step to a full year'],
    shots: [
      { src: shieldShot, alt: 'Increzio offering a Streak Shield to save a 98-day streak after a missed tick' },
      { src: centuryShot, alt: 'Increzio celebrating a 100-day streak in dark mode' },
    ],
  },
  {
    id: 'analytics',
    sticker: 'Analytics',
    tone: 'yellow',
    title: 'See the week, the month and the climb',
    body: 'A weekly recap shows your check-ins day by day, your best day and your most consistent habit. Switch to a month or three, and every measurable habit gets its own progress chart.',
    points: ['Week, month and 3-month views', 'Best day and most consistent habit', 'Progress charts for habits you measure'],
    shots: [{ src: weekShot, alt: 'Increzio analytics: this week, 28 of 30 check-ins, best day Monday, most consistent habit Meditate' }],
  },
];

const promises = [
  { title: 'No account', body: 'Open it and start. Your habits live on your phone.', tone: 'green' },
  { title: 'Backup if you want it', body: 'Optionally sign in with Google to keep a copy in Google Drive.', tone: 'blue' },
  { title: 'Reminders per habit', body: 'Set a time and a message. They stop once the habit is done.', tone: 'purple' },
];

/** The seeded demo day from the app's own promo takes: three habits to go, two already done. */
const demoHabits = [
  { name: 'Journal', emoji: '✍️', tone: 'purple', goal: 0, unit: '' },
  { name: 'Read', emoji: '📖', tone: 'blue', goal: 26.8, unit: 'pages' },
  { name: 'Morning run', emoji: '🏃', tone: 'green', goal: 5.4, unit: 'km' },
  { name: 'Meditate', emoji: '🧘', tone: 'orange', goal: 10, unit: 'minutes' },
  { name: 'Drink water', emoji: '💧', tone: 'blue', goal: 0, unit: '' },
];
const ALL = demoHabits.length;
const OPEN = 3;
const HOLD = 3;
const START = demoHabits.map((_, i) => i >= OPEN);

/** Splits a headline into words that rise through a mask, one after another. */
const Rise: React.FC<{ text: string; start?: number }> = ({ text, start = 0 }) => (
  <>
    {text.split(' ').map((word, i) => (
      <span key={i}>
        <span className="iz-word">
          <span style={{ '--d': `${start + i * 60}ms` } as React.CSSProperties}>{word}</span>
        </span>{' '}
      </span>
    ))}
  </>
);

const PlayButton: React.FC<{ big?: boolean; small?: boolean }> = ({ big, small }) => (
  <a
    className={`iz-btn iz-btn-primary${big ? ' iz-btn-big' : ''}${small ? ' iz-btn-small' : ''}`}
    href={INCREZIO.play}
    target="_blank"
    rel="noopener"
  >
    <svg viewBox="0 0 24 24" width={small ? 16 : 20} height={small ? 16 : 20} aria-hidden="true">
      <path fill="currentColor" d="M4.2 2.4c-.3.3-.4.7-.4 1.2v16.8c0 .5.1.9.4 1.2l9.4-9.6-9.4-9.6Zm10.6 8.4 2.6-2.6L6.1 1.7c-.4-.2-.8-.3-1.1-.2l9.8 9.3Zm0 2.4L5 22.5c.3.1.7 0 1.1-.2l11.3-6.5-2.6-2.6Zm6.1-2.7-2.3-1.3-2.8 2.8 2.8 2.8 2.3-1.3c.9-.5.9-2.5 0-3Z" />
    </svg>
    {small ? 'Get the app' : 'Get it on Google Play'}
  </a>
);

/** A hand-drawn ring, drawn on when `on` is set. */
const Scribble: React.FC<{ on: boolean }> = ({ on }) => (
  <svg className={`iz-scribble${on ? ' on' : ''}`} viewBox="0 0 140 80" aria-hidden="true">
    <path d="M78 8C44 4 10 16 8 40c-2 22 34 34 66 32 32-2 60-16 58-36C130 16 98 6 64 10" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" pathLength="1" />
  </svg>
);

/**
 * A live copy of Increzio's Today screen. Habits tick themselves off one by one while it is on screen,
 * the streak goes from 99 to 100 and the logo bounces, as it does in the app. Tap a habit to take over.
 */
const TodayDemo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  // Auto-play is one counter: ticks 1-3 tick off the open habits, then it holds on day 100 before starting over.
  const [tick, setTick] = useState(0);
  const [manual, setManual] = useState<boolean[] | null>(null);
  const done = manual ?? START.map((d, i) => d || i < tick);
  const count = done.filter(Boolean).length;
  const allDone = count === ALL;

  useEffect(() => {
    const el = ref.current;
    if (manual || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting) timer = window.setInterval(() => setTick(t => (t + 1) % (OPEN + HOLD + 1)), 1400);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [manual]);

  const toggle = useCallback((i: number) => {
    setManual(prev => (prev ?? START.map((d, j) => d || j < tick)).map((d, j) => (j === i ? !d : d)));
  }, [tick]);

  return (
    <div className={`iz-demo${allDone ? ' is-done' : ''}`} ref={ref}>
      <div className="iz-demo-head">
        <span className="iz-mascot" aria-hidden="true">
          <img src={icon} alt="" width="44" height="44" />
          <i className="iz-spark s1" /><i className="iz-spark s2" /><i className="iz-spark s3" />
        </span>
        <span className="iz-demo-name">Increzio</span>
      </div>
      <div className="iz-card iz-demo-streak">
        <span className="iz-demo-label">Current streak</span>
        <span className="iz-demo-count" aria-live="polite">
          <span key={allDone ? 'b' : 'a'} className="iz-demo-num">{allDone ? 100 : 99}</span>
          <span className="iz-demo-flame" aria-hidden="true">🔥</span>
          <Scribble on={allDone} />
        </span>
        <span className="iz-demo-sub">{allDone ? 'Triple digits. Absolute unit.' : 'Days you finished every habit'}</span>
      </div>
      <div className="iz-demo-today">
        <span>Today’s habits</span>
        <span>{count} / {ALL}</span>
      </div>
      <div className="iz-demo-bar" aria-hidden="true"><i style={{ transform: `scaleX(${count / ALL})` }} /></div>
      <ul className="iz-demo-list">
        {demoHabits.map((h, i) => (
          <li key={h.name}>
            <button type="button" className={`iz-card iz-habit${done[i] ? ' done' : ''}`} aria-pressed={done[i]} onClick={() => toggle(i)}>
              <span className="iz-check" aria-hidden="true">
                <svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" pathLength="1" /></svg>
              </span>
              <span className="iz-habit-name">
                <span>{h.name}</span>
                {h.goal > 0 && <small>{done[i] ? h.goal : 0}/{h.goal} {h.unit}</small>}
              </span>
              <span className={`iz-habit-emoji t-${h.tone}`} aria-hidden="true">{h.emoji}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="iz-demo-hint">{!manual ? 'Tap a habit to tick it yourself' : allDone ? 'All done for today' : `${ALL - count} to go`}</p>
    </div>
  );
};

const Phone: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`iz-phone${className ? ` ${className}` : ''}`}>
    <div className="iz-phone-screen">{children}</div>
  </div>
);

const IncrezioPage: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  usePageMeta(INCREZIO.title, INCREZIO.description, true);
  useReveal(root);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.documentElement.style.backgroundColor = PAPER;
    document.body.style.background = PAPER;
    if (!document.querySelector(`link[href="${INCREZIO_FONTS}"]`)) {
      const link = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: INCREZIO_FONTS });
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="increzio" ref={root}>
      <header className="iz-bar">
        <div className="iz-bar-inner">
          <a className="iz-brand" href="#top" aria-label="Increzio home">
            <img src={icon} alt="" width="34" height="34" />
            <span>Increzio</span>
          </a>
          <nav className="iz-nav" aria-label="Increzio">
            <a href="#features">Features</a>
            <a href="#films">Videos</a>
            <a href="#faq">FAQ</a>
          </nav>
          <PlayButton small />
        </div>
      </header>

      <main id="top">
        <section className="iz-hero">
          <div className="iz-hero-copy">
            <p className="iz-sticker t-blue" data-reveal>Habit tracker for Android</p>
            <h1 className="iz-rise">
              <Rise text="Tiny daily habits, right on your" />
              <span className="iz-mark">
                <Rise text="home screen." start={360} />
                <svg viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M4 12c40-6 90-9 146-8 52 1 98 3 146-2" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" pathLength="1" />
                </svg>
              </span>
            </h1>
            <p className="iz-lede" data-reveal style={{ '--d': '320ms' } as React.CSSProperties}>
              Increzio is a hand-drawn habit tracker with home screen widgets, streaks, goals that grow 1% at a time, and a day
              that resets when <em>you</em> say it does. I built it for myself, a night owl who needed to see his streak.
            </p>
            <div className="iz-cta" data-reveal style={{ '--d': '420ms' } as React.CSSProperties}>
              <PlayButton />
              <a className="iz-btn iz-btn-ghost" href="#films">Watch it in 30 seconds</a>
            </div>
            <p className="iz-meta" data-reveal style={{ '--d': '480ms' } as React.CSSProperties}>
              Free · Android · No account needed
            </p>
          </div>
          <div className="iz-hero-stage" data-reveal="scale" style={{ '--d': '200ms' } as React.CSSProperties}>
            <Phone className="iz-phone-live">
              <TodayDemo />
            </Phone>
            <span className="iz-note iz-note-1" aria-hidden="true">tick, tick…</span>
            <span className="iz-note iz-note-2" aria-hidden="true">day 100!</span>
          </div>
        </section>

        <section className="iz-why" data-reveal>
          <p className="iz-statement">
            Most habit apps are either strict checklists or punishing streak counters. I wanted something friendlier: my streak
            on the home screen, goals that grow a little at a time, and a day that ends when I go to sleep.
          </p>
        </section>

        <section id="features" className="iz-features" aria-label="Features">
          {features.map((f, i) => (
            <article className={`iz-feature${i % 2 ? ' flip' : ''}`} key={f.id} id={f.id}>
              <div className="iz-feature-copy" data-reveal>
                <p className={`iz-sticker t-${f.tone}`}>{f.sticker}</p>
                <h2>{f.title}</h2>
                <p>{f.body}</p>
                <ul>{f.points.map(p => <li key={p}>{p}</li>)}</ul>
              </div>
              <div className={`iz-feature-shots${f.shots.length > 1 ? ' pair' : ''}`} data-reveal="scale">
                {f.shots.map(s => (
                  <Phone key={s.src}>
                    <img src={s.src} alt={s.alt} {...SHOT} loading="lazy" decoding="async" />
                  </Phone>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="iz-look" data-reveal>
          <div className="iz-look-copy">
            <p className="iz-sticker t-purple">Paper and ink</p>
            <h2>Hand-drawn on purpose, in light or dark</h2>
            <p>
              I sketched Increzio away from the over-polished look of most apps: ink outlines, pastel fills and a little logo that
              breathes, dozes late in the evening and bounces when your day is done. Pick light, dark or follow your phone.
            </p>
          </div>
          <div className="iz-look-shots">
            <Phone><img src={homeShot} alt="Increzio home in light mode: a 99-day streak, the week's calendar and today's habits" {...SHOT} loading="lazy" decoding="async" /></Phone>
            <Phone><img src={habitsShot} alt="Increzio habit list with categories and a streak for each habit" {...SHOT} loading="lazy" decoding="async" /></Phone>
          </div>
        </section>

        <section id="films" className="iz-films">
          <div className="iz-films-head" data-reveal>
            <p className="iz-sticker t-yellow">Videos</p>
            <h2>See Increzio move</h2>
            <p>Real screen recordings of the app. The first one is the Play Store preview.</p>
          </div>
          <div className="iz-films-row">
            {INCREZIO_FILMS.map((film, i) => (
              <figure className="iz-film" key={film.src} data-reveal="scale" style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <div className="iz-phone iz-phone-video">
                  <video src={film.src} poster={film.poster} width={film.width} height={film.height} controls playsInline preload="none" title={film.title} />
                </div>
                <figcaption>
                  <strong>{film.title}</strong>
                  <span>{film.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="iz-promises" aria-label="Privacy and reminders">
          {promises.map((p, i) => (
            <div className={`iz-card iz-promise t-${p.tone}`} key={p.title} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </section>

        <section id="faq" className="iz-faq">
          <h2 data-reveal>Questions</h2>
          <div className="iz-faq-list">
            {increzioFaq.map(f => (
              <details key={f.q} className="iz-card" data-reveal>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="iz-final" data-reveal>
          <span className="iz-mascot iz-final-mascot" aria-hidden="true">
            <img src={icon} alt="" width="72" height="72" loading="lazy" />
            <i className="iz-spark s1" /><i className="iz-spark s2" /><i className="iz-spark s3" />
          </span>
          <h2>One percent at a time.</h2>
          <p>Put your streak on your home screen and let the small days add up.</p>
          <PlayButton big />
          <p className="iz-meta">Free on Google Play · Android</p>
        </section>
      </main>

      <footer className="iz-footer">
        <p>
          Designed and built by <Link to="/">Yash Mathur</Link>, in Flutter.
        </p>
        <p className="iz-footer-links">
          <Link to={INCREZIO.privacy}>Privacy policy</Link>
          <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={config.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  );
};

export default IncrezioPage;
