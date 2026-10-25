import type { ProductMeta } from '../../seo/types';
import homeShot from '../../assets/images/IncrezioHabitTracker/lp-home.webp';
import widgetShot from '../../assets/images/IncrezioHabitTracker/lp-widget.webp';
import goalShot from '../../assets/images/IncrezioHabitTracker/lp-goal.webp';
import weekShot from '../../assets/images/IncrezioHabitTracker/lp-week.webp';
import resetShot from '../../assets/images/IncrezioHabitTracker/lp-reset.webp';

/** Copy and facts for the Increzio product page, shared with its SEO metadata. */
export const INCREZIO = {
  name: 'Increzio',
  path: '/increzio',
  play: 'https://play.google.com/store/apps/details?id=com.yashmathur.habit_tracker',
  privacy: '/increzio-habit-tracker/privacy',
  title: 'Increzio — Habit Tracker with Home Screen Widgets for Android',
  description:
    'A free Android habit tracker with home screen widgets, streaks, 1% incremental goals and a custom day reset for night owls. Hand-drawn, private, no account.',
};

export const INCREZIO_FONTS = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap';

/** Promo films, all vertical. Width and height are the files' own, so frames keep their aspect ratio. */
export const INCREZIO_FILMS = [
  {
    src: '/videos/increzio-store-preview.mp4',
    poster: '/videos/increzio-store-preview.jpg',
    width: 540,
    height: 1170,
    title: 'Increzio in 30 seconds',
    caption: 'The whole app, start to finish. Music only.',
  },
  {
    src: '/videos/increzio-night-owl.mp4',
    poster: '/videos/increzio-night-owl.jpg',
    width: 540,
    height: 960,
    title: 'It’s 1:47 AM',
    caption: 'Why your day should reset when you sleep, not at midnight.',
  },
  {
    src: '/videos/increzio-compound.mp4',
    poster: '/videos/increzio-compound.jpg',
    width: 540,
    height: 960,
    title: 'Compound habits',
    caption: 'How a goal that grows 1% at a time adds up.',
  },
];

export const increzioFaq: { q: string; a: string }[] = [
  {
    q: 'Is Increzio free?',
    a: 'Yes. Increzio is free on Google Play. There is no subscription and no premium tier.',
  },
  {
    q: 'Does Increzio have home screen widgets?',
    a: 'Yes, two. A streak widget keeps your current streak on your home screen, and the Today widget lists your habits for the day so you can tick them off without opening the app.',
  },
  {
    q: 'Can I change when my habit day resets?',
    a: 'Yes. In Settings, pick when your new day starts, anywhere from 12 AM to 12 PM. Set it to 4 AM and a habit you tick at 1:47 AM still counts for the day you were living. You can also get a gentle reminder an hour before the reset if habits are still open.',
  },
  {
    q: 'What are incremental (progressive) goals?',
    a: 'For habits you measure, like pages or kilometres, you set a starting goal, a target and a percentage (1% by default). Each time you complete the habit, the goal grows by that percentage until it reaches your target.',
  },
  {
    q: 'What happens to my streak if I miss a day?',
    a: 'If you did the habit but forgot to tick it, a Streak Shield can save yesterday. You get three a month. You can also count your streak by all habits or by any habit.',
  },
  {
    q: 'Is Increzio based on Atomic Habits?',
    a: 'It is inspired by the book’s idea that tiny daily improvements compound over time. That is where the 1% goals come from. The app is not affiliated with the book.',
  },
  {
    q: 'Do I need an account? Where is my data stored?',
    a: 'No account. Your habits live on your phone. If you want a backup, you can optionally sign in with Google to keep a copy in Google Drive.',
  },
  {
    q: 'Is Increzio available on iPhone?',
    a: 'Right now Increzio is available for Android on Google Play.',
  },
];

const SITE = 'https://yashmathur.com';
const abs = (url: string) => (url.startsWith('http') ? url : `${SITE}${url}`);

export const META: ProductMeta = {
  path: INCREZIO.path,
  title: INCREZIO.title,
  description: INCREZIO.description,
  themeColor: '#F8F8F6',
  fonts: INCREZIO_FONTS,
  ogImage: '/og/increzio.png',
  imageAlt: 'Increzio: a hand-drawn habit tracker for Android with home screen widgets and a 99-day streak',
  module: 'src/pages/increzio/IncrezioPage.tsx',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'Increzio',
      alternateName: 'Increzio Habit Tracker',
      description: INCREZIO.description,
      operatingSystem: 'ANDROID',
      applicationCategory: 'LifestyleApplication',
      installUrl: INCREZIO.play,
      downloadUrl: INCREZIO.play,
      url: abs(INCREZIO.path),
      image: abs('/og/increzio.png'),
      screenshot: [homeShot, widgetShot, goalShot, resetShot, weekShot].map(abs),
      featureList: [
        'Home screen widgets for your streak and today’s habits',
        'Incremental goals that grow 1% each time you complete a habit',
        'Custom day reset time',
        'Streaks with monthly Streak Shields',
        'Weekly recap, milestones and progress charts',
        'Light and dark themes',
      ],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Yash Mathur', url: `${SITE}/` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: increzioFaq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};
