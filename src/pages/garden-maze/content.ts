import type { ProductMeta } from '../../seo/types';
import gateShot from '../../assets/images/GardenMaze/gate_unlock.webp';
import aerialShot from '../../assets/images/GardenMaze/aerial_hedge.webp';
import brickShot from '../../assets/images/GardenMaze/walk_brick.webp';
import mirrorShot from '../../assets/images/GardenMaze/portal_mirror.webp';
import hauntedShot from '../../assets/images/GardenMaze/haunted_walk.webp';
import watcherShot from '../../assets/images/GardenMaze/watcher.webp';

/** Copy and facts for The Garden Maze product page, shared with its SEO metadata. */

const SITE = 'https://yashmathur.com';
const abs = (url: string) => (url.startsWith('http') ? url : `${SITE}${url}`);

export const GMAZE = {
  name: 'The Garden Maze',
  path: '/garden-maze',
  privacy: '/garden-maze/privacy',
  platforms: ['macOS', 'Windows', 'iPad', 'Android'],
  trailer: { src: '/videos/garden-maze-promo-30s.mp4', poster: '/videos/garden-maze-promo-30s.jpg', title: 'The Garden Maze — 30 second trailer' },
  cutdown: { src: '/videos/garden-maze-promo-15s.mp4', poster: '/videos/garden-maze-promo-15s.jpg', title: 'The Garden Maze — 15 second cut' },
  notify: 'mailto:me@yashmathur.com?subject=The%20Garden%20Maze%20%E2%80%94%20tell%20me%20when%20it%20launches',
};

export const GMAZE_FONTS =
  'https://fonts.googleapis.com/css2?family=Young+Serif&family=Figtree:wght@400;600;700&display=swap';

export const SHOTS = { gateShot, aerialShot, brickShot, mirrorShot, hauntedShot, watcherShot };

export const gmazeFaq: { q: string; a: string }[] = [
  {
    q: 'What is The Garden Maze?',
    a: 'A first-person 3D maze game. Instead of looking down on a maze from above, you walk through it: hedge, brick and mirror mazes, locked gates and hidden keys, coins to collect and a portal arch to find at the end of every level.',
  },
  {
    q: 'Can I download The Garden Maze yet?',
    a: 'Not yet. There are builds for macOS, Windows, iPad and Android, but no public release so far. Email me@yashmathur.com and I will let you know when it launches.',
  },
  {
    q: 'Which platforms will it be on?',
    a: 'macOS, Windows, iPad and Android, with a virtual reality version coming soon. It plays with a mouse and keyboard, a gamepad, or touch controls on a tablet.',
  },
  {
    q: 'How many levels are there?',
    a: '100 levels across three difficulties: 34 easy, 33 medium and 33 hard. Mazes get bigger as you go, from 9 by 9 cells on the first levels up to 21 by 21 on the hardest.',
  },
  {
    q: 'Are the mazes procedurally generated?',
    a: 'Yes. Every level is generated from a seed and a difficulty, so mazes can be larger and more complicated than anything you could build for real, and each one is different.',
  },
  {
    q: 'Is it a mirror maze game?',
    a: 'It has a mirror world: an actual mirror maze with real reflections, where the walls reflect the maze around you and corridors seem to carry on forever.',
  },
  {
    q: 'Is The Garden Maze scary?',
    a: 'Mostly no, but one level in four is haunted. Those play at night with a flashlight, strange sounds and the Watcher, a figure that vanishes the moment you look straight at it.',
  },
  {
    q: 'Will there be a VR maze game version?',
    a: 'Yes, VR is coming soon. Being inside the maze in first person is what the game is built around, which makes virtual reality the natural next step.',
  },
];

const description =
  'The Garden Maze is a first-person 3D maze game: 100 generated levels, hedge, brick and real mirror mazes, haunted levels and coins. For Mac, PC, iPad and Android.';

export const META: ProductMeta = {
  path: GMAZE.path,
  title: 'The Garden Maze — First-Person 3D Maze Game for Mac, PC & iPad',
  description,
  themeColor: '#0E1A12',
  fonts: GMAZE_FONTS,
  ogImage: '/og/garden-maze.jpg',
  imageAlt: 'The Garden Maze: a first-person maze game you play from the inside',
  module: 'src/pages/garden-maze/GardenMazePage.tsx',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: GMAZE.name,
      description,
      url: abs(GMAZE.path),
      genre: ['Maze', 'Puzzle'],
      gamePlatform: ['macOS', 'Windows', 'iPadOS', 'Android'],
      playMode: 'SinglePlayer',
      numberOfPlayers: { '@type': 'QuantitativeValue', value: 1 },
      applicationCategory: 'GameApplication',
      inLanguage: 'en',
      image: abs('/og/garden-maze.jpg'),
      screenshot: [gateShot, aerialShot, brickShot, mirrorShot, hauntedShot, watcherShot].map(abs),
      author: { '@type': 'Person', name: 'Yash Mathur', url: `${SITE}/` },
      trailer: {
        '@type': 'VideoObject',
        name: GMAZE.trailer.title,
        description: 'Thirty seconds inside The Garden Maze: hedge, brick and mirror mazes, a portal arch and a haunted level.',
        thumbnailUrl: abs(GMAZE.trailer.poster),
        contentUrl: abs(GMAZE.trailer.src),
        uploadDate: '2026-10-22T11:44:44+05:30',
        duration: 'PT30S',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: gmazeFaq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};
