import type { ProductMeta } from '../../seo/types';
import afterShot from '../../assets/images/ShortsGone/after.webp';
import beforeShot from '../../assets/images/ShortsGone/before.webp';

/** Copy and facts for the ShortsGone product page, shared with its SEO metadata. All of it comes from the extension's source. */
export const SHORTS_GONE = {
  name: 'ShortsGone',
  storeName: 'ShortsGone - YouTube Shorts Blocker',
  path: '/shorts-gone',
  version: '1.0.0',
  store: 'https://chromewebstore.google.com/detail/shortsgone-youtube-shorts/jhekgeokmjokkoefepkealbikbmdcebj',
  demo: { youtube: 'Tng6zFo21II', poster: '/videos/shorts-gone-demo.webp', width: 1280, height: 800 },
  title: 'ShortsGone — Block YouTube Shorts with a Free Chrome Extension',
  description:
    'Remove YouTube Shorts from your home feed, sidebar, search results and subscriptions, and block /shorts/ links. A free Chrome extension that runs in your browser.',
};

export const SHORTS_GONE_FONTS =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&family=Nunito:wght@400;600;800;900&display=swap';

/** Where Shorts disappear from, and which of the popup's toggles controls each one (from content.js). */
export const surfaces: { id: string; title: string; body: string; toggle: string }[] = [
  {
    id: 'home',
    title: 'No Shorts shelf on the YouTube home page',
    body: 'The Shorts shelf that sits between your videos is gone, along with any single Shorts mixed into the home grid. The videos around it close up the gap.',
    toggle: 'Home & Subscription Feeds',
  },
  {
    id: 'sidebar',
    title: 'Hide the Shorts tab in the sidebar',
    body: 'The Shorts entry leaves the navigation sidebar, in both the full and the collapsed version, so there is nothing to click by habit.',
    toggle: 'Sidebar Navigation',
  },
  {
    id: 'search',
    title: 'Hide Shorts in YouTube search results',
    body: 'Search for something and you get videos. Shorts that would have shown up in the results are filtered out.',
    toggle: 'Search Results',
  },
  {
    id: 'subscriptions',
    title: 'A subscriptions feed without Shorts',
    body: 'The channels you follow still show up. Only their Shorts are removed from the subscriptions grid.',
    toggle: 'Home & Subscription Feeds',
  },
  {
    id: 'up-next',
    title: 'No Shorts next to the video you are watching',
    body: 'Shorts in the recommendations beside a video are hidden too, so one video does not turn into twenty.',
    toggle: 'Home & Subscription Feeds',
  },
  {
    id: 'links',
    title: 'Block YouTube Shorts links',
    body: 'Open a /shorts/ link, or click into one inside YouTube, and you land on a quiet “YouTube Shorts Blocked” page with one button: Return to YouTube.',
    toggle: 'The main switch',
  },
];

export const shortsGoneFaq: { q: string; a: string }[] = [
  {
    q: 'How do I block YouTube Shorts in Chrome?',
    a: 'Add ShortsGone from the Chrome Web Store. It is on from the moment it is installed: Shorts leave the home feed, sidebar, search results and subscriptions, and /shorts/ links are blocked. There is nothing to set up.',
  },
  {
    q: 'Is ShortsGone free?',
    a: 'Yes. ShortsGone is free on the Chrome Web Store. There is no account to create and nothing to upgrade to.',
  },
  {
    q: 'Can I hide Shorts in some places but not others?',
    a: 'Yes. Open the popup and expand Advanced Settings. There are three toggles: Sidebar Navigation, Home & Subscription Feeds, and Search Results. Turn off any of them and Shorts come back in just that place.',
  },
  {
    q: 'Can I turn the Shorts blocker off for a while?',
    a: 'Yes. Click the power button in the popup. The badge switches from Shorts Blocked to Shorts Allowed and Shorts reappear. Click it again to block them.',
  },
  {
    q: 'What happens when I open a YouTube Shorts link?',
    a: 'While blocking is on, any youtube.com/shorts/ address, whether you open it directly or click into it inside YouTube, is replaced by a “YouTube Shorts Blocked” page with a button back to YouTube.',
  },
  {
    q: 'Will I see Shorts flash before they disappear?',
    a: 'No. ShortsGone adds its hiding rules as the page starts loading, before YouTube draws anything, so Shorts are hidden instead of popping in and then vanishing.',
  },
  {
    q: 'Does ShortsGone collect my data or browsing history?',
    a: 'No. Your switch and toggle settings are saved in Chrome’s local extension storage on your computer. There are no analytics, no tracking and no network requests, and the extension only runs on youtube.com.',
  },
  {
    q: 'Does it work on my phone or in the YouTube app?',
    a: 'No. ShortsGone is a Chrome extension, so it works on youtube.com in Chrome on your computer. It cannot change the YouTube app on a phone.',
  },
];

const SITE = 'https://yashmathur.com';
const abs = (url: string) => (url.startsWith('http') ? url : `${SITE}${url}`);

export const META: ProductMeta = {
  path: SHORTS_GONE.path,
  title: SHORTS_GONE.title,
  description: SHORTS_GONE.description,
  themeColor: '#090B10',
  fonts: SHORTS_GONE_FONTS,
  ogImage: '/og/shorts-gone.jpg',
  imageAlt: 'ShortsGone, a free Chrome extension that removes YouTube Shorts: FOCUS > SCROLL',
  module: 'src/pages/shorts-gone/ShortsGonePage.tsx',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: SHORTS_GONE.name,
      alternateName: [SHORTS_GONE.storeName, 'Shorts Gone', 'YouTube Shorts Blocker'],
      description: SHORTS_GONE.description,
      applicationCategory: 'BrowserApplication',
      operatingSystem: 'Chrome',
      softwareVersion: SHORTS_GONE.version,
      installUrl: SHORTS_GONE.store,
      downloadUrl: SHORTS_GONE.store,
      url: abs(SHORTS_GONE.path),
      image: abs('/og/shorts-gone.jpg'),
      screenshot: [afterShot, beforeShot].map(abs),
      featureList: [
        'Removes Shorts shelves and Shorts from the YouTube home feed',
        'Hides the Shorts tab in the sidebar navigation',
        'Hides Shorts in search results and the subscriptions feed',
        'Blocks youtube.com/shorts/ links',
        'One on/off switch plus separate toggles for sidebar, feeds and search',
        'Settings stay in the browser; no analytics or tracking',
      ],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Yash Mathur', url: `${SITE}/` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: shortsGoneFaq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};
