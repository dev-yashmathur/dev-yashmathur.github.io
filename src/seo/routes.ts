import { PORTEE, PORTEE_FONTS, porteeFaq } from '../pages/portee/content';
import type { ProductMeta } from './types';
import { META as BenchPageMeta } from '../pages/bench/content';
import { META as GardenMazePageMeta } from '../pages/garden-maze/content';
import { META as ClassicGamesHubPageMeta } from '../pages/classic-games-hub/content';
import { META as IncrezioPageMeta } from '../pages/increzio/content';
import { META as TambolaPageMeta } from '../pages/tambola/content';
import { META as ShortsGonePageMeta } from '../pages/shorts-gone/content';
import porteeStorageShot from '../assets/images/Portee/storage-review.webp';
import porteeCatalogShot from '../assets/images/Portee/catalog.webp';
import porteeSearchShot from '../assets/images/Portee/sessions-search.webp';

/** Every page the build prerenders to static HTML, with its search and social metadata. */

export const SITE_URL = 'https://yashmathur.com';
const AUTHOR = { '@type': 'Person', name: 'Yash Mathur', url: `${SITE_URL}/` };

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  /** Absolute or site-relative social preview image. */
  image?: string;
  imageAlt?: string;
  ogType?: 'website' | 'article';
  jsonLd?: object[];
  /** A product page with its own theme: skips the portfolio's dark-mode paint script. */
  standalone?: boolean;
  themeColor?: string;
  noindex?: boolean;
  /** Source module of the page, so the build can link its CSS in the static HTML. */
  module?: string;
  /** Extra stylesheets (fonts) the page needs before first paint. */
  stylesheets?: string[];
}

const abs = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url}`);

const home: RouteMeta = {
  path: '/',
  title: 'Yash Mathur — Product Engineer, AI & Systems',
  description:
    'Yash Mathur is a product engineer specializing in production AI and AI infrastructure: agents, pipelines, deployment and interfaces.',
  image: '/YMLogoBlack.png',
  jsonLd: [{ '@context': 'https://schema.org', ...AUTHOR, jobTitle: 'Senior AI Software Engineer', sameAs: ['https://www.linkedin.com/in/dev-yashmathur/', 'https://github.com/dev-yashmathur'] }],
};

const portee: RouteMeta = {
  path: PORTEE.path,
  title: PORTEE.title,
  description: PORTEE.description,
  image: '/og/portee.png',
  imageAlt: 'Portée: see what your coding agents cost your Mac',
  standalone: true,
  themeColor: '#F7F1DE',
  module: 'src/pages/portee/PorteePage.tsx',
  stylesheets: [PORTEE_FONTS],
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: PORTEE.name,
      alternateName: 'Portee',
      description: PORTEE.description,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS 12 or later',
      softwareVersion: PORTEE.version,
      fileSize: PORTEE.fileSize,
      downloadUrl: abs(PORTEE.download),
      url: abs(PORTEE.path),
      image: abs('/og/portee.png'),
      screenshot: [porteeStorageShot, porteeCatalogShot, porteeSearchShot].map(abs),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: AUTHOR,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: porteeFaq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

const productPages: ProductMeta[] = [BenchPageMeta, GardenMazePageMeta, ClassicGamesHubPageMeta, IncrezioPageMeta, TambolaPageMeta, ShortsGonePageMeta];
const fromProduct = (m: ProductMeta): RouteMeta => ({
  path: m.path,
  title: m.title,
  description: m.description,
  image: m.ogImage,
  imageAlt: m.imageAlt,
  standalone: true,
  themeColor: m.themeColor,
  module: m.module,
  stylesheets: m.fonts ? [m.fonts] : undefined,
  jsonLd: m.jsonLd,
});


export const routeMeta: RouteMeta[] = [
  home,
  portee,
  ...productPages.map(fromProduct),
  {
    path: '/increzio-habit-tracker/privacy',
    title: 'Increzio Habit Tracker — Privacy Policy',
    description: 'Privacy Policy for Increzio Habit Tracker.',
    module: 'src/pages/IncrezioHabitTrackerPrivacyPage.tsx',
  },
  {
    path: '/garden-maze/privacy',
    title: 'The Garden Maze — Privacy Policy',
    description: 'Privacy Policy for The Garden Maze.',
    module: 'src/pages/GardenMazePrivacyPage.tsx',
  },
];

/** Old addresses that now live elsewhere. */
export const redirects: { from: string; to: string }[] = [
  { from: '/projects/portee', to: PORTEE.path },
  { from: '/projects/benchtest', to: '/bench' },
  { from: '/projects/garden-maze', to: '/garden-maze' },
  { from: '/projects/classic-games-hub', to: '/classic-games-hub' },
  { from: '/projects/increzio-habit-tracker', to: '/increzio' },
  { from: '/projects/tambola-desktop-app', to: '/tambola' },
];

export const absoluteUrl = abs;
