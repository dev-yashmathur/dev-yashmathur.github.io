// Writes a static HTML file for every route after `vite build`, so each page is indexable and
// shareable on GitHub Pages: /portee is served from portee.html, / from index.html.
// Also writes redirect stubs for moved pages, a 404.html SPA fallback, sitemap.xml and robots.txt.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const { render, routeMeta, redirects, SITE_URL } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href);

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(readFileSync(join(dist, '.vite/manifest.json'), 'utf8'));

// CSS and JS a lazily loaded page needs, so its static HTML is styled before any script runs.
const assetsFor = module => {
  const css = new Set();
  const js = new Set();
  const visit = (key, isEntry) => {
    const chunk = manifest[key];
    if (!chunk || chunk.isEntry) return;
    if (isEntry) js.add(`/${chunk.file}`);
    (chunk.css ?? []).forEach(f => css.add(`/${f}`));
    (chunk.imports ?? []).forEach(k => visit(k, false));
  };
  if (module) visit(module, true);
  return { css: [...css], js: [...js] };
};
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const abs = url => (url.startsWith('http') ? url : `${SITE_URL}${url}`);
const fileFor = path => (path === '/' ? 'index.html' : `${path.slice(1)}.html`);
const write = (file, html) => {
  const out = join(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
};

const headTags = m => {
  const url = abs(m.path === '/' ? '/' : m.path);
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    m.noindex && '<meta name="robots" content="noindex" />',
    m.themeColor && `<meta name="theme-color" content="${m.themeColor}" />`,
    `<meta property="og:type" content="${m.ogType ?? 'website'}" />`,
    '<meta property="og:site_name" content="Yash Mathur" />',
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    m.image && `<meta property="og:image" content="${abs(m.image)}" />`,
    m.image && m.imageAlt && `<meta property="og:image:alt" content="${esc(m.imageAlt)}" />`,
    `<meta name="twitter:card" content="${m.image && m.image.startsWith('/og/') ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    m.image && `<meta name="twitter:image" content="${abs(m.image)}" />`,
    ...(m.stylesheets ?? []).flatMap(href => [
      '<link rel="preconnect" href="https://fonts.googleapis.com" />',
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
      `<link rel="stylesheet" href="${href}" />`,
    ]),
    ...assetsFor(m.module).css.map(href => `<link rel="stylesheet" crossorigin href="${href}" />`),
    ...assetsFor(m.module).js.map(href => `<link rel="modulepreload" crossorigin href="${href}" />`),
    ...(m.jsonLd ?? []).map(d => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`),
  ];
  return tags.filter(Boolean).join('\n  ');
};

const page = (m, appHtml) => {
  let html = template.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, headTags(m));
  if (m.standalone) html = html.replace(/<!--theme-->[\s\S]*?<!--\/theme-->/g, '');
  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
};

for (const m of routeMeta) {
  const html = page(m, await render(m.path));
  write(fileFor(m.path), html);
  // If other pages live under this path (/garden-maze and /garden-maze/privacy), GitHub Pages may
  // redirect /garden-maze to the folder, so the folder gets the same page as its index.
  const isFolder = m.path !== '/' && routeMeta.some(o => o.path.startsWith(`${m.path}/`));
  if (isFolder) write(`${m.path.slice(1)}/index.html`, html);
  console.log(`prerendered ${m.path} -> ${fileFor(m.path)}${isFolder ? ' (+ folder index)' : ''}`);
}

// GitHub Pages can't send real redirects, so moved pages get a stub that forwards at once
// and tells search engines where the page lives now.
for (const r of redirects) {
  const to = abs(r.to);
  write(fileFor(r.from), `<!doctype html><html lang="en"><head><meta charset="utf-8" /><title>Moved</title>
<link rel="canonical" href="${to}" /><meta name="robots" content="noindex" />
<meta http-equiv="refresh" content="0; url=${r.to}" />
<script>location.replace(${JSON.stringify(r.to)} + location.search + location.hash)</script>
</head><body><a href="${r.to}">This page has moved to ${to}</a></body></html>\n`);
  console.log(`redirect ${r.from} -> ${r.to}`);
}

// Unknown paths: the empty SPA shell, so client routing still works (and shows the 404 page).
write('404.html', template.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, headTags({
  path: '/404', title: 'Page not found · Yash Mathur', description: 'This page does not exist.', noindex: true,
})));

const urls = routeMeta.filter(m => !m.noindex).map(m => `  <url><loc>${abs(m.path)}</loc></url>`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`sitemap: ${urls.length} urls`);
