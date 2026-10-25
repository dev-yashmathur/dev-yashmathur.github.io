import { Link, useLocation } from 'react-router-dom';
import SiteShell from '../components/SiteShell/SiteShell';
import { usePageMeta } from '../utils/usePageMeta';
import './NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  const { pathname } = useLocation();
  usePageMeta('Page not found');

  return (
    <SiteShell>
      <main className="not-found">
        <div className="eyebrow">404 / not found</div>
        <h1>Nothing here.</h1>
        <p>
          <code>{pathname}</code> doesn&apos;t match any page. It may have moved, or the link may be mistyped.
        </p>
        <Link to="/" className="button primary">Back to home →</Link>
      </main>
    </SiteShell>
  );
};

export default NotFoundPage;
