import type { ProductMeta } from '../../seo/types';
import homeShot from '../../assets/images/ClassicGamesHub/ClassicGamesHub.webp';
import stackShot from '../../assets/images/ClassicGamesHub/StackTicTacToe.webp';
import vanishingShot from '../../assets/images/ClassicGamesHub/VanishingTicTacToe.webp';
import ultimateShot from '../../assets/images/ClassicGamesHub/UltimateTicTacToe.webp';
import classicShot from '../../assets/images/ClassicGamesHub/TicTacToe.webp';

/**
 * Classic Games Hub has its own site with its own SEO for the games themselves
 * (see keyword-list.txt in the source project). This page targets the brand and the
 * story of building it, and sends players to classicgameshub.com.
 */

const SITE_URL = 'https://yashmathur.com';
const abs = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url}`);

export const CGH = {
  name: 'Classic Games Hub',
  site: 'https://classicgameshub.com',
  /** Deep links into the live site, one per game. */
  games: {
    classic: 'https://classicgameshub.com/games/classic-tic-tac-toe',
    anti: 'https://classicgameshub.com/games/anti-tic-tac-toe',
    stack: 'https://classicgameshub.com/games/stack-tic-tac-toe',
    vanishing: 'https://classicgameshub.com/games/vanishing-tic-tac-toe',
    ultimate: 'https://classicgameshub.com/games/ultimate-tic-tac-toe',
  },
  youtubeId: '9GX9BBpR5Qo',
};

export const CGH_FONTS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&family=Roboto+Mono:wght@500&display=swap';

export const cghFaq: { q: string; a: string }[] = [
  {
    q: 'What is Classic Games Hub?',
    a: 'Classic Games Hub is a free web app for playing modern twists on childhood games in the browser. Right now it has five takes on tic-tac-toe: Classic, Anti, Stack, Vanishing and Ultimate. You play it at classicgameshub.com.',
  },
  {
    q: 'Who made Classic Games Hub?',
    a: 'Yash Mathur, a product engineer. He designed and built it himself in 2024, after seeing these game twists on social media and finding nowhere online to play them with other people.',
  },
  {
    q: 'Is Classic Games Hub free? Do I need an account?',
    a: 'It is free and runs in your browser, with nothing to download. You can play as a guest; signing in only shows your name to the people you play with online.',
  },
  {
    q: 'Can I play Classic Games Hub with friends?',
    a: 'Yes. You can pass and play with a friend on one device, play against the computer, or create an online room and share its code so a friend can join from their own device.',
  },
  {
    q: 'How was Classic Games Hub built?',
    a: 'The games are written in React and Next.js. Live multiplayer runs on Firebase, so there is no game server to manage, and the site is deployed on Vercel.',
  },
  {
    q: 'Where do I play Classic Games Hub?',
    a: 'At classicgameshub.com. This page is the story behind it; the games themselves, their rules and their FAQs all live on the Classic Games Hub site.',
  },
];

const title = 'Classic Games Hub by Yash Mathur: the story behind it';
const description =
  'Classic Games Hub, made by Yash Mathur: a free web app for playing modern twists on childhood games with friends. Why he built it, how it works, and where to play.';

export const META: ProductMeta = {
  path: '/classic-games-hub',
  title,
  description,
  themeColor: '#F2F3DA',
  fonts: CGH_FONTS,
  ogImage: '/og/classic-games-hub.png',
  imageAlt: 'Classic Games Hub by Yash Mathur: old games, new twists, someone to play with',
  module: 'src/pages/classic-games-hub/ClassicGamesHubPage.tsx',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: CGH.name,
      url: CGH.site,
      description:
        'A free web app by Yash Mathur for playing modern twists on childhood games: Classic, Anti, Stack, Vanishing and Ultimate tic-tac-toe, locally, against the computer or in online rooms.',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires a modern web browser',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      image: abs('/og/classic-games-hub.png'),
      screenshot: [homeShot, classicShot, stackShot, vanishingShot, ultimateShot].map(abs),
      dateCreated: '2024',
      author: { '@type': 'Person', name: 'Yash Mathur', url: `${SITE_URL}/` },
      subjectOf: { '@type': 'WebPage', url: abs('/classic-games-hub') },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: cghFaq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};
