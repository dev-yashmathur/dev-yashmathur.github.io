import { Link, useLocation } from 'react-router-dom';
import SiteShell from '../components/SiteShell/SiteShell';
import { projects } from '../data/projects';
import { usePageMeta } from '../utils/usePageMeta';
import './NotFoundPage.css';

const knownRoutes = [
  '/',
  ...projects.map(p => p.learnMoreLink),
  '/increzio-habit-tracker/privacy',
  '/garden-maze/privacy',
];

const distance = (a: string, b: string) => {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
};

/** The route closest to what was typed, git "did you mean" style. */
const closestRoute = (path: string) => {
  const target = path.toLowerCase().replace(/\/+$/, '') || '/';
  return knownRoutes
    .map(route => ({ route, d: distance(target, route) }))
    .sort((a, b) => a.d - b.d)[0].route;
};

const NotFoundPage: React.FC = () => {
  const { pathname } = useLocation();
  usePageMeta('Page not found');
  const suggestion = closestRoute(pathname);

  return (
    <SiteShell>
      <main className="not-found">
        <div className="eyebrow">404 / not found</div>
        <h1>Nothing here.</h1>
        <pre className="terminal" aria-label={`${pathname} doesn't match any page. The most similar page is ${suggestion}.`}>
          <span className="prompt">$ git checkout {pathname}</span>{'\n'}
          <span className="fatal">fatal:</span> &apos;{pathname}&apos; did not match any route known to this site.{'\n\n'}
          The most similar route is{'\n'}
          {'        '}<Link to={suggestion}>{suggestion}</Link>
        </pre>
        <div className="not-found-actions">
          <Link to={suggestion} className="button primary">Take me to {suggestion} →</Link>
          {suggestion !== '/' && <Link to="/" className="button">Back to home</Link>}
        </div>
      </main>
    </SiteShell>
  );
};

export default NotFoundPage;
