import { useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../utils/config';
import { projects } from '../data/projects';
import { demoArticles } from '../components/Articles/ArticleMagazineStand';
import TagIcon from '../components/SiteShell/TagIcon';
import Hash from '../components/SiteShell/Hash';
import { CountUp, LocalTime, MarginNote, NowLine, ShortsGone, TambolaBall } from '../components/Delight/Delight';
import SiteShell from '../components/SiteShell/SiteShell';
import { usePageMeta } from '../utils/usePageMeta';
import './HomePage.css';

const EMAIL = config.email;
const MEDIUM = 'https://medium.com/@dev.yashmathur';

interface WorkItem {
  type: string;
  title: string;
  body: React.ReactNode;
  tags: string[];
  meta: React.ReactNode;
  release?: { label: string; to?: string; href?: string };
  links?: { label: string; href: string }[];
  branch: boolean;
  moment?: React.ReactNode;
  note?: string;
}

const highlights = [
  { value: '3+ yrs', label: 'Building and shipping production software' },
  { value: '15 mos', label: 'Intern → Lead across my first career progression' },
  { value: '10+ people', label: 'Led teams across multiple projects' },
  { value: 'AI → UI', label: 'Agents, infrastructure, backends, frontends & delivery' },
];

const principles = [
  { title: "Start from the user's problem", body: "Understand requirements from the client's or user's perspective before choosing a technical solution." },
  { title: 'Specify before building', body: 'Define acceptance criteria and a technical spec, including the scale the system may eventually need.' },
  { title: 'Keep it simple', body: 'Add complexity only when the problem genuinely requires it.' },
  { title: 'Ship fast. Iterate faster.', body: "Don't compromise on quality — but don't mistake 100% polish for the requirement to reach production." },
];

const projectWork = projects.map(p => ({
  type: 'Independent / Product',
  title: p.title,
  body: p.summary,
  tags: p.skills.slice(0, 4),
  meta: <>{p.timeline}</>,
  release: { label: 'Case study', to: p.learnMoreLink },
  links: [
    ...(p.liveUrl ? [{ label: p.liveUrl.includes('play.google.com') ? 'Google Play' : p.liveUrl.replace(/^https?:\/\//, ''), href: p.liveUrl }] : []),
    ...(p.repoUrl ? [{ label: 'GitHub', href: p.repoUrl }] : []),
  ],
  branch: true,
  moment: p.title.startsWith('Tambola') ? <TambolaBall /> : undefined,
}));

const workItems: WorkItem[] = [
  {
    type: 'Professional / Developer Tools',
    branch: false,
    title: 'Marco — Code Review',
    body: <>A code review tool that checks changes against an understanding of your entire codebase and prioritizes the suggestions that matter, not noise that gets ignored. Suggestion acceptance rate: <CountUp to={50} />–<CountUp to={70} />%+.</>,
    note: "the one I'm proudest of",
    tags: ['Code review', 'Codebase context', 'AI', 'Developer tools'],
    meta: <>Hivel · 2026<br />Production</>,
  },
  ...projectWork,
  {
    type: 'Professional / AI',
    branch: false,
    title: 'Enterprise knowledge search',
    body: "Built and deployed an AI search experience that unified knowledge scattered across multiple enterprise applications into a single conversational interface, with citation-backed answers and deployment within the client's Google Cloud environment.",
    tags: ['AI agents', 'RAG', 'Google Cloud', 'Infrastructure'],
    meta: <>Private B2B product<br />Production</>,
  },
  {
    type: 'Professional / AI',
    branch: false,
    title: 'Feedback-driven document intelligence',
    body: 'Designed a system that turns vague handwritten meeting notes into structured legal summaries, using available enterprise knowledge to fill gaps, asking clarifying questions instead of guessing, and improving through feedback.',
    tags: ['Agents', 'Evaluation', 'Prompting', 'Document AI'],
    meta: <>Private B2B product<br />Production</>,
  },
  {
    type: 'Independent / Chrome',
    branch: true,
    title: 'Shorts Gone',
    body: 'A deliberately no-bloat Chrome extension whose entire job is to remove YouTube Shorts — from search, feeds, navigation, and direct URLs.',
    tags: ['Chrome extension', 'UX', 'JavaScript'],
    meta: <>Independent</>,
    moment: <ShortsGone />,
    release: { label: 'Chrome Web Store', href: 'https://chromewebstore.google.com/detail/shortsgone-youtube-shorts/jhekgeokmjokkoefepkealbikbmdcebj' },
  },
  {
    type: 'Professional / Product',
    branch: false,
    title: 'Chat-driven web applications',
    body: 'Built the foundation for a new interaction model where users can operate an existing web application through an embedded conversational interface while retaining the traditional manual workflows.',
    tags: ['AI UX', 'Frontend', 'Agents', 'Product'],
    meta: <>Internal accelerator<br />Foundation shipped to enterprise</>,
  },
];

// Trunk (professional) entries interleaved with product branches.
const workOrder = [
  'Marco',
  'Enterprise knowledge search',
  'Portée',
  'Bench',
  'Feedback-driven document intelligence',
  'The Garden Maze',
  'Classic Games Hub',
  'Increzio',
  'Chat-driven web applications',
  'Tambola',
  'Shorts Gone',
];
const rank = (title: string) => {
  const i = workOrder.findIndex(k => title.startsWith(k));
  return i === -1 ? workOrder.length : i;
};
const work = [...workItems].sort((a, b) => rank(a.title) - rank(b.title));
const branchColors = ['#8250df', '#0969da', '#bf8700', '#cf222e', '#1a7f37', '#bc4c00', '#0a7ea4'];
let branchIndex = 0;
const workColors = work.map(w => (w.branch ? branchColors[branchIndex++ % branchColors.length] : undefined));

const roles = [
  {
    date: 'JAN 2026 — PRESENT',
    title: 'Senior AI Software Engineer',
    org: 'Hivel · Product',
    points: [
      'Build production AI systems spanning agents, infrastructure, backends, and user-facing applications.',
      'Own technical decisions and delivery across ambiguous product requirements.',
      'Work across AI engineering and product UX to get systems into reliable production.',
    ],
  },
  {
    date: 'APR 2025 — OCT 2025',
    title: 'Lead AI Product Engineer',
    org: 'Techolution',
    points: [
      'Led multiple teams totaling 10+ people while managing delivery and client communication.',
      'Owned feature delivery across AI systems, React frontends, Python backends, and deployment workflows.',
      'Balanced technical execution, stakeholder management, timelines, and product decisions.',
    ],
  },
  {
    date: 'JAN 2024 — APR 2025',
    title: 'AI Engineer → Full-time',
    org: 'Techolution',
    points: [
      'Owned AI accuracy and the evaluation/improvement framework for reliable legal document creation and editing.',
      'Built agent frameworks and the evaluation criteria needed to move AI systems toward production.',
      'After conversion, took ownership of delivery and began leading a five-person team.',
    ],
  },
  {
    date: '2023 · 3 MONTHS',
    title: 'AI Engineering Intern',
    org: 'ADP',
    points: [
      'Took ownership of a new generative-AI product segment.',
      'Worked across AI, prompt engineering, frontend, and backend APIs to bring the product together.',
    ],
  },
];

const writing = demoArticles.slice(-3).reverse().map(a => ({
  type: 'Medium · Article',
  title: a.title,
  cta: 'Read article ↗',
  href: a.link,
}));

const testimonials = [
  {
    quote: "I watched him go from AI Intern to Lead AI Product Engineer, and he earned every step. What sets Yash apart is ownership. He doesn't stop at writing code; he takes responsibility for the result from start to finish.",
    name: 'Ankit Kishore',
    role: 'Director, Autonomous AI · Techolution · Managed Yash directly',
  },
  {
    quote: "He's a brilliant AI engineer with a rare ability to bring clarity to complex problems and turn them into practical solutions. What stands out even more is that he doesn't just move towards the goal himself, he brings the team along with him.",
    name: 'Prajwal Tapsi',
    role: 'Product Designer · Techolution · Worked with Yash across teams',
  },
  {
    quote: 'He was tasked with leading a team of ambitious engineers to create a successful delivery. His leadership skills and also his technical abilities to cater to the business requirements were something to highlight.',
    name: 'Anoop Doddamane',
    role: 'Senior Google Cloud Architect · Techolution · Worked with Yash on the same team',
  },
];

const approachCopy = [
  "I enjoy difficult problems where the path from an idea to a useful product isn't obvious. My job is to understand the real requirement, make the trade-offs explicit, and then build something simple enough to ship and robust enough to keep improving.",
  'AI and modern coding tools have made software development more accessible than ever. But getting something to production is a different problem.',
  'Building a prototype is increasingly easy. Building something that remains reliable as it scales takes engineering judgment and experience — the ability to anticipate the inconsistencies, edge cases, security risks, compliance requirements, and seemingly insignificant details that users may never consciously notice, but that determine whether a product feels trustworthy or frustrating.',
  'It means thinking beyond “does it work?” to “will it still work when people depend on it?” Can the system handle traction without becoming a liability? Can its data remain secure? Can the architecture withstand an audit? Can the product evolve without every change becoming a new source of failure?',
  'That’s the gap I care about: turning what can be built into what can actually be trusted.',
];

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const featured = ['Marco', 'Enterprise knowledge search', 'Portée', 'Bench', 'Feedback-driven document intelligence'];
const isFeatured = (title: string) => featured.some(f => title.startsWith(f));

const stagger = (i: number) => ({ '--d': `${i * 70}ms` }) as React.CSSProperties;

// "15 mos" → <CountUp to={15} /> mos; values without a leading number pass through.
const countUpValue = (value: string) => {
  const m = value.match(/^(\d+)(.*)$/);
  return m ? <><CountUp to={Number(m[1])} />{m[2]}</> : value;
};

const HomePage: React.FC = () => {
  usePageMeta(undefined, 'Yash Mathur is a product engineer specializing in production AI and AI infrastructure: agents, pipelines, deployment and interfaces.');
  const [showAllWork, setShowAllWork] = useState(false);
  return (
    <SiteShell>
        <main>
          <section className="hero">
            <div>
              <div className="eyebrow">Product Engineer · AI · Systems</div>
              <h1>I turn vague requirements into reliable production software.</h1>
              <p className="hero-sub">
                A product engineer specializing in <strong>production AI and AI infrastructure</strong> —
                from agents and pipelines to deployment, interfaces, and systems that scale.
              </p>
              <div className="hero-actions">
                <a className="button primary" href={config.social.calendly} {...external}>Schedule a conversation →</a>
                <a className="button secondary" href="#work">View selected work</a>
              </div>
              <div className="hero-quote">
                “Build the simplest thing that solves the real problem — then make it reliable enough to matter.”
              </div>
              <NowLine />
            </div>
            <aside className="portrait-panel">
              <div className="portrait">Your photo</div>
              <div className="portrait-label"><span>YASH_MATHUR</span><span>PRODUCT / AI</span></div>
              <LocalTime />
            </aside>
          </section>

          <section id="highlights">
            <div className="section-head" data-reveal="fade">
              <div className="section-number">01 / AT A GLANCE<Hash value="3fa9c21" /></div>
              <div>
                <h2>Three years.<br />End-to-end ownership.</h2>
                <p className="section-intro">A quick read on the scale and trajectory behind the work.</p>
              </div>
            </div>
            <div className="highlight-grid">
              {highlights.map((h, i) => (
                <div className="highlight" key={h.value} data-reveal="fade" style={stagger(i)}>
                  <strong>{countUpValue(h.value)}</strong>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="approach">
            <div className="section-head" data-reveal="fade">
              <div className="section-number">02 / MY APPROACH<Hash value="8b41e07" /></div>
              <div>
                <h2>Understand first.<br />Build deliberately.</h2>
                <p className="section-intro">The principles that shape how I turn ambiguous problems into software people can actually use.</p>
              </div>
            </div>
            <div className="approach-grid">
              <div className="approach-copy">
                <p>{approachCopy[0]}</p>
                <details className="approach-more">
                  <summary>Read the full approach</summary>
                  {approachCopy.slice(1).map(p => <p key={p}>{p}</p>)}
                </details>
              </div>
              <div className="principles">
                {principles.map((p, i) => (
                  <div className="principle" key={p.title} data-reveal="fade" style={stagger(i)}>
                    <div className="principle-no">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="work">
            <div className="section-head" data-reveal="fade">
              <div className="section-number">03 / SELECTED WORK<Hash value="c7d2a95" /></div>
              <div>
                <h2>Things I've<br />actually shipped.</h2>
                <p className="section-intro">Professional systems are shown at a high level where client work is private. Independent products show the work directly.</p>
              </div>
            </div>
            <div className="work-list" data-reveal="line">
              {work.map((w, i) => (
                <article className={`work-card${w.release ? ' linked' : ''}${w.branch ? ' branch' : ' trunk'}${isFeatured(w.title) || showAllWork ? '' : ' compact'}`} key={w.title} data-reveal="graph" style={workColors[i] ? ({ '--c': workColors[i] } as React.CSSProperties) : undefined}>
                  <span className="graph" aria-hidden="true"><i className="fork" /><i className="lane" /><i className="node" /></span>
                  <div className="work-type">{w.type}{w.note && <MarginNote>{w.note}</MarginNote>}</div>
                  <div>
                    <h3>{w.title}{w.moment}</h3>
                    <p>{w.body}</p>
                    <div className="tags">{w.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                  </div>
                  <div className="work-meta">
                    <div>{w.meta}</div>
                    {w.release && (w.release.to ? (
                      <Link className="release stretch" to={w.release.to}><TagIcon />{w.release.label}<span aria-hidden="true">→</span></Link>
                    ) : (
                      <a className="release stretch" href={w.release.href} {...external}><TagIcon />{w.release.label}<span aria-hidden="true">↗</span></a>
                    ))}
                    {w.links?.map(l => (
                      <a className="work-link u-draw" key={l.href} href={l.href} {...external}>{l.label} ↗</a>
                    ))}
                  </div>
                </article>
              ))}
              <button
                type="button"
                className="button work-toggle"
                onClick={() => setShowAllWork(v => !v)}
                aria-expanded={showAllWork}
              >
                {showAllWork ? 'Show fewer' : `Show details for all ${work.length}`}
              </button>
            </div>
          </section>

          <section id="experience">
            <div className="section-head" data-reveal="fade">
              <div className="section-number">04 / EXPERIENCE<Hash value="1e6f0b3" /></div>
              <div>
                <h2>More than<br />the job title.</h2>
                <p className="section-intro">A three-year progression from intern to lead, with ownership spanning AI, product, engineering, delivery, and people.</p>
              </div>
            </div>
            <div className="timeline">
              {roles.map((r, i) => (
                <article className="role" key={r.date} data-reveal="fade">
                  <div className="role-date">{r.date}{i === 0 && <span className="head-pill">HEAD</span>}</div>
                  <div>
                    <h3>{r.title}</h3>
                    <div className="role-title">{r.org}</div>
                    <ul>{r.points.map(p => <li key={p}>{p}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="writing">
            <div className="section-head" data-reveal="fade">
              <div className="section-number">05 / WRITING<Hash value="a90d4e8" /></div>
              <div>
                <h2>What I'm<br />thinking about.</h2>
                <p className="section-intro">Technical writing as another window into how I reason, learn, and communicate.</p>
              </div>
            </div>
            <div className="writing-grid">
              {writing.map((w, i) => (
                <a className="writing-card" href={w.href} key={w.title} data-reveal="fade" style={stagger(i)} {...external}>
                  <span className="type">{w.type}</span>
                  <h3>{w.title}</h3>
                  <span className="read"><span className="u-draw">{w.cta}</span></span>
                </a>
              ))}
            </div>
            <p className="writing-more">
              <a className="u-draw" href={MEDIUM} {...external}>See all articles on Medium ↗</a>
            </p>
          </section>

          <section id="testimonials">
            <div className="section-head" data-reveal="fade">
              <div className="section-number">06 / TESTIMONIALS<Hash value="5c3b7f2" /></div>
              <div>
                <h2>What people<br />I've worked with say.</h2>
                <p className="section-intro">Three strong recommendations here; keep the full LinkedIn collection one click away.</p>
              </div>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((t, i) => (
                <blockquote className="review" key={t.name} data-reveal="fade" style={stagger(i)}>
                  <header className="review-head">
                    <span className="avatar" aria-hidden="true">{t.name.split(' ').map(n => n[0]).join('')}</span>
                    <span><strong>{t.name}</strong> approved these changes</span>
                  </header>
                  <p>“{t.quote}”</p>
                  <footer><span>{t.role}</span><a className="u-draw" href={config.social.linkedin} {...external}>LinkedIn ↗</a></footer>
                </blockquote>
              ))}
            </div>
          </section>

          <section id="contact" className="contact">
            <div className="contact-inner">
              <div>
                <div className="eyebrow">07 / CONTACT</div>
                <h2>Have a difficult problem worth solving?</h2>
                <div className="contact-links">
                  <a className="u-draw" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  <a className="u-draw" href={config.social.linkedin} {...external}>LinkedIn ↗</a>
                  <a className="u-draw" href={config.social.calendly} {...external}>Schedule a meeting ↗</a>
                  <a className="u-draw" href={config.social.github} {...external}>GitHub ↗</a>
                </div>
              </div>
              <a className="button primary" href={`mailto:${EMAIL}`}>Get in touch →</a>
            </div>
          </section>
        </main>

    </SiteShell>
  );
};

export default HomePage;
