import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export { routeMeta, redirects, SITE_URL } from './seo/routes';

/** Renders a route to HTML at build time, waiting for lazy pages to load. */
export async function render(url: string) {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return new Response(prelude).text();
}
