import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../utils/usePageMeta';
import { useReveal } from '../../utils/useReveal';
import { config } from '../../utils/config';
import { BENCH, DEMO, benchFaq } from './content';
import mark from '../../assets/images/Benchtest/bench-mark.svg';
import compareShot from '../../assets/images/Benchtest/compare.webp';
import choicesShot from '../../assets/images/Benchtest/choices.webp';
import batchShot from '../../assets/images/Benchtest/batch.webp';
import historyShot from '../../assets/images/Benchtest/history.webp';
import datasetShot from '../../assets/images/Benchtest/dataset.webp';
import YouTube from '../../components/YouTube/YouTube';
import './BenchPage.css';

const SHOT = { width: 1440, height: 900 };
const BG = '#F2EFE7';

const features = [
  {
    id: 'choices',
    eyebrow: 'Decision models',
    title: 'Evaluate decision models on your own options',
    body: 'Write the question, add the context and list your choices. Give each choice a short description so every model knows what it covers, then try different prompts and see how each model actually performs.',
    points: ['Choice, Score (1–10) and Yes / No questions', 'A description for every choice', 'Correctness, latency, tokens and cost per model and category'],
    shot: choicesShot,
    alt: 'Describing the Billing choice in Bench so every model knows what it covers',
  },
  {
    id: 'batch',
    eyebrow: 'Batch runs',
    title: 'Run a whole batch of questions against shared context',
    body: 'Paste a list of questions, give them one shared context and run them in one go. Then step through the answers question by question and mark them as you go.',
    points: ['Paste a list instead of typing one by one', 'One shared context, definitions only when needed', 'Review each question’s answers in turn'],
    shot: batchShot,
    alt: 'A batch of three yes/no questions run against one customer email in Bench, with Laya answering 71% yes',
  },
  {
    id: 'history',
    eyebrow: 'History',
    title: 'Every comparison and batch, kept in History',
    body: 'Single questions and bulk runs all land in History. Search it, reopen a comparison, or start a variation from it.',
    points: ['Search past runs', 'Reopen a comparison', 'Start a variation from any run'],
    shot: historyShot,
    alt: 'Bench History listing past single-question comparisons and bulk runs',
  },
  {
    id: 'dataset',
    eyebrow: 'Dataset',
    title: 'Build a fine-tuning dataset from the answers you approve',
    body: 'Decision models are zero-shot, and fine-tuning needs a good dataset. Bench makes building it part of the review: approve the right answer, save it, and it joins your training set. Laya, the open-source alternative to Jev, only needs roughly 200 to 1,000 samples to fine-tune properly.',
    points: ['Approve and save answers as you review', 'Search your saved examples', 'Export the training set as JSONL'],
    shot: datasetShot,
    alt: 'The Bench training set of 21 approved examples, ready to export as JSONL',
  },
];

const decisionModels = ['Jev', 'Laya, local or hosted', 'Clef & Clef Flash', 'OpenAI Decisions', 'Your own custom endpoint'];
const generationModels = ['Direct providers: OpenAI, Anthropic, Amazon Bedrock', 'OpenAI-compatible servers', 'Local CLIs such as Claude Code and Codex'];

const endpoints = [
  ['GET', '/v1/models', 'Models you have set up'],
  ['POST', '/v1/batches', 'Start a batch'],
  ['GET', '/v1/batches/{id}', 'Fetch its results'],
  ['POST', '/v1/answers/{id}/mark', 'Mark an answer'],
  ['POST', '/v1/answers/{id}/dataset', 'Save it to the dataset'],
];

const promises = [
  { title: 'Native on your Mac', body: 'Built in Swift and SwiftUI. A 2.8 MB download for Apple Silicon and Intel Macs.' },
  { title: 'Your data stays local', body: 'History and datasets live in a local SQLite library on your Mac. Questions go only to the models you pick.' },
  { title: 'Keys in the Keychain', body: 'Provider API keys are stored in the macOS Keychain, not in a plain file.' },
];

const css = (vars: Record<string, string | number>) => vars as React.CSSProperties;

/** Splits a headline into words that rise through a mask, one after another. */
const Rise: React.FC<{ text: string; start?: number }> = ({ text, start = 0 }) => (
  <>
    {text.split(' ').map((word, i) => (
      <span key={i}>
        <span className="bn-word">
          <span style={css({ '--d': `${start + i * 55}ms` })}>{word}</span>
        </span>{' '}
      </span>
    ))}
  </>
);

const DownloadButton: React.FC<{ big?: boolean }> = ({ big }) => (
  <a className={`bn-btn bn-btn-primary${big ? ' bn-btn-big' : ''}`} href={BENCH.download} download>
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8s-1.8-.8-3-.8C6.9 7.2 5.4 8.1 4.6 9.6 2.9 12.5 4.2 16.8 5.8 19.1c.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.4-1-2.4-3.9ZM14.1 5.6c.6-.8 1.1-1.9 1-3-1 .1-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3Z" /></svg>
    Download for Mac
  </a>
);

/**
 * A small live replay of the app's Answers pane: four models answer the same support ticket one after another,
 * each with its choice probabilities, then the trusted answer is approved. Renders the finished state on the server
 * and without motion; loops only while on screen.
 */
const FINAL = DEMO.answers.length + 1;
const AnswersDemo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(FINAL);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: number | undefined;
    let s = FINAL;
    const tick = () => {
      s = s >= FINAL ? 0 : s + 1;
      setStep(s);
      timer = window.setTimeout(tick, s === FINAL ? 3600 : s === FINAL - 1 ? 1300 : s === 0 ? 900 : 1000);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && timer === undefined) {
        s = FINAL;
        timer = window.setTimeout(tick, 500);
      } else if (!e.isIntersecting && timer !== undefined) {
        window.clearTimeout(timer);
        timer = undefined;
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const answered = Math.min(step, DEMO.answers.length);
  return (
    <div className="bn-demo" ref={ref}>
      <div className="bn-demo-head">
        <img src={mark} alt="" width="28" height="28" />
        <div>
          <p className="bn-demo-status">{answered < DEMO.answers.length ? 'Comparing…' : step === FINAL ? '1 of 4 rated' : 'Ready to review'}</p>
          <span className="bn-demo-progress"><i style={css({ '--p': answered / DEMO.answers.length })} /></span>
        </div>
      </div>
      <p className="bn-demo-q">{DEMO.question}</p>
      <p className="bn-demo-ctx">{DEMO.context}</p>
      <ol className="bn-demo-cards">
        {DEMO.answers.map((a, i) => {
          const filled = step > i;
          const approved = step === FINAL && i === 0;
          return (
            <li key={a.model} className={`bn-card${filled ? ' is-filled' : ''}${approved ? ' is-approved' : ''}`}>
              <div className="bn-card-top">
                <span className="bn-card-model">{a.model}</span>
                <span className="bn-card-flag" aria-hidden={!approved}>
                  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 8.4l2.6 2.6L12 5.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Approved
                </span>
              </div>
              <p className="bn-card-choice">{filled ? a.choice : <span className="bn-skel" aria-label="Waiting for answer" />}</p>
              <ul className="bn-probs" aria-label={`${a.model} choice probabilities`}>
                {a.probs.map(([label, p]) => (
                  <li key={label}>
                    <span>{label}</span>
                    <b>{filled ? `${p}%` : '–'}</b>
                    <span className="bn-pbar"><i style={css({ '--p': p })} /></span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const BenchPage: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  usePageMeta(BENCH.title, BENCH.description, true);
  useReveal(root);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const html = document.documentElement.style.backgroundColor;
    const body = document.body.style.background;
    document.documentElement.style.backgroundColor = BG;
    document.body.style.background = BG;
    return () => {
      document.documentElement.style.backgroundColor = html;
      document.body.style.background = body;
    };
  }, []);

  return (
    <div className="bench" ref={root}>
      <header className="bn-bar">
        <div className="bn-bar-inner">
          <a className="bn-brand" href="#top" aria-label="Bench home">
            <img src={mark} alt="" width="32" height="32" />
            <span>Bench</span>
          </a>
          <nav className="bn-nav" aria-label="Bench">
            <a href="#compare">Compare</a>
            <a href="#dataset">Dataset</a>
            <a href="#api">API</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="bn-btn bn-btn-small" href={BENCH.download} download>Download</a>
        </div>
      </header>

      <main id="top">
        <section className="bn-hero">
          <p className="bn-pill" data-reveal>
            <span className="bn-pill-dots" aria-hidden="true"><i /><i /><i /><i /></span>
            An evaluation app for LLMs and decision models
          </p>
          <h1>
            <Rise text="Put one question to four models. Keep the answer you trust." />
          </h1>
          <p className="bn-lede" data-reveal style={css({ '--d': '300ms' })}>
            Bench is a native macOS app for evaluating LLMs and decision models. Compare their answers side by side, run batches,
            mark what is right, and turn it into the dataset you need to fine-tune.
          </p>
          <div className="bn-cta" data-reveal style={css({ '--d': '400ms' })}>
            <DownloadButton />
            <a className="bn-btn bn-btn-ghost" href="#film">Watch how it works</a>
          </div>
          <p className="bn-meta" data-reveal style={css({ '--d': '450ms' })}>
            Free · v{BENCH.version} · {BENCH.fileSize} · {BENCH.requirements}
          </p>

          <div className="bn-hero-stage" data-reveal="scale" style={css({ '--d': '250ms' })}>
            <img
              className="bn-shot"
              src={compareShot}
              alt="Bench comparing four decision models on one support ticket, with Jev's choice probabilities open"
              {...SHOT}
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="bn-problem" data-reveal>
          <p className="bn-kicker">Why Bench</p>
          <p className="bn-statement">
            Decision models are zero-shot, and zero-shot rarely works as well as a classifier that has been fine-tuned. Fine-tuning
            needs a good dataset. Building one is the tedious part, so I built the bench to do it on.
          </p>
        </section>

        <section id="compare" className="bn-compare">
          <div className="bn-compare-copy" data-reveal>
            <p className="bn-kicker">Compare</p>
            <h2>Compare LLM outputs side by side</h2>
            <p>
              Ask once, and every model you picked answers the same question with the same context. Here is the support ticket from
              the app: four decision models, three different answers.
            </p>
            <p>
              Open any answer to read its choice probabilities. Jev picks Billing, but at only 53%, which is exactly the kind of doubt
              you want to see before you trust a model. Then you make the call.
            </p>
          </div>
          <div data-reveal="scale">
            <AnswersDemo />
          </div>
        </section>

        <section id="features" className="bn-features" aria-label="Features">
          {features.map((f, i) => (
            <article className={`bn-feature${i % 2 ? ' flip' : ''}`} key={f.id} id={f.id}>
              <div className="bn-feature-copy" data-reveal>
                <p className="bn-kicker">{f.eyebrow}</p>
                <h2>{f.title}</h2>
                <p>{f.body}</p>
                <ul>{f.points.map(p => <li key={p}>{p}</li>)}</ul>
              </div>
              <figure className="bn-feature-shot" data-reveal="scale">
                <img className="bn-shot" src={f.shot} alt={f.alt} {...SHOT} loading="lazy" decoding="async" />
              </figure>
            </article>
          ))}
        </section>

        <section id="models" className="bn-models" data-reveal>
          <div className="bn-models-head">
            <p className="bn-kicker">The router</p>
            <h2>Compare Jev, Laya, Clef and more in one place</h2>
            <p>
              A decision router sends each question to the right model. Version 1.0 is optimized for decision models, because that is
              where much of the momentum is right now. Further improvements for generation models are coming soon.
            </p>
          </div>
          <div className="bn-models-cols">
            <div>
              <h3>Decision models</h3>
              <ul>{decisionModels.map(m => <li key={m}>{m}</li>)}</ul>
            </div>
            <div>
              <h3>Generation models</h3>
              <ul>{generationModels.map(m => <li key={m}>{m}</li>)}</ul>
            </div>
          </div>
        </section>

        <section id="api" className="bn-api">
          <div className="bn-api-copy" data-reveal>
            <p className="bn-kicker">Local REST API</p>
            <h2>Run evaluations from your own pipeline</h2>
            <p>
              Bench also serves a REST API on your Mac, so a script can post batches, fetch results, mark answers and save them to the
              dataset as part of your own pipeline. Requests use the token shown on the Batches screen.
            </p>
          </div>
          <div className="bn-api-code" data-reveal="scale">
            <pre><code>
              <span className="c">{'# list the models Bench can reach'}</span>{'\n'}
              {'curl http://127.0.0.1:47821/v1/models \\\n  -H "Authorization: Bearer $BENCH_TOKEN"'}
            </code></pre>
            <ul>
              {endpoints.map(([method, path, note]) => (
                <li key={method + path}>
                  <b className={method === 'GET' ? 'get' : 'post'}>{method}</b>
                  <code>{path}</code>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="film" className="bn-film">
          <div className="bn-film-head" data-reveal>
            <p className="bn-kicker">The walkthrough</p>
            <h2>How Bench works, in 60 seconds</h2>
          </div>
          <div className="bn-film-frame" data-reveal="scale">
            <YouTube id={BENCH.film.youtube} poster={BENCH.film.poster} title="How Bench works" />
          </div>
        </section>

        <section className="bn-promises" aria-label="Privacy and platform">
          {promises.map((p, i) => (
            <div className="bn-promise" key={p.title} data-reveal style={css({ '--d': `${i * 80}ms` })}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </section>

        <section id="faq" className="bn-faq">
          <h2 data-reveal>Questions</h2>
          <div className="bn-faq-list">
            {benchFaq.map(f => (
              <details key={f.q} data-reveal>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bn-final" data-reveal>
          <img className="bn-final-mark" src={mark} alt="" width="72" height="72" loading="lazy" />
          <h2>Put your next decision on the bench.</h2>
          <DownloadButton big />
          <p className="bn-meta">Free · {BENCH.requirements} · Not yet notarized: on first launch, right-click the app and choose Open.</p>
        </section>
      </main>

      <footer className="bn-footer">
        <p>
          Designed and built by <Link to="/">Yash Mathur</Link>, in Swift and SwiftUI with SQLite.
        </p>
        <p className="bn-footer-links">
          <Link to="/">yashmathur.com</Link>
          <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={config.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  );
};

export default BenchPage;
