import type { ProductMeta } from '../../seo/types';
import mainShot from '../../assets/images/TamboloApp/Tambolo.webp';
import ticketsShot from '../../assets/images/TamboloApp/Generated Randomized Tickets.webp';
import highlightShot from '../../assets/images/TamboloApp/Automatic Ticket Highlighting.webp';
import claimShot from '../../assets/images/TamboloApp/prize claim.webp';

/** Copy and facts for the Tambola product page, shared with its SEO metadata. */
export const TAMBOLA = {
  name: 'Tambola Desktop App',
  path: '/tambola',
  repo: 'https://github.com/dev-yashmathur/TamboloFinal',
  year: '2020',
};

export const TAMBOLA_FONTS =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@400;600&family=Space+Mono:ital,wght@0,400;0,700;1,700&display=swap';

export const tambolaFaq: { q: string; a: string }[] = [
  {
    q: 'How does the Tambola ticket generator work?',
    a: 'Every player gets their own randomly generated ticket: 3 rows by 9 columns, five numbers in each row, 15 in all. Each column holds its own range (1–9, 10–19 and so on up to 80–90), and the numbers in a column are sorted top to bottom, like a printed Housie ticket.',
  },
  {
    q: 'Does it call the numbers as well?',
    a: 'Yes. The app shuffles 1 to 90 at the start of the game and every press of “Next number” draws the next one, with no repeats. “Previous Numbers” shows what has already been called, and after the 90th number it says “The End”.',
  },
  {
    q: 'Can it check tickets automatically?',
    a: 'Yes. When a number is called it is highlighted on every ticket that has it, and when a ticket completes a prize the app lists the player and the prize in the claims table. Nobody has to check tickets by hand.',
  },
  {
    q: 'Which prizes can I play for?',
    a: 'Before the game you pick from First to N (you set N, for example the first five numbers), Lines (you set how many line prizes) and Houses, the full house (you set how many).',
  },
  {
    q: 'What happens when someone wins?',
    a: 'The winner shows up in the claims table with their prize. Tick “Claimed” and that prize is closed before the next number is drawn. Players still get to shout out their win; the app only removes the arguing over whether it was right.',
  },
  {
    q: 'Can I host Tambola for family over Zoom or Google Meet?',
    a: 'That is exactly what it was built for. During the 2020 lockdowns our family game nights moved to Zoom and Google Meet; one computer runs the app, and because tickets are made and checked for you, the host gets to play too.',
  },
  {
    q: 'How do I run it on my PC?',
    a: 'It is a Java Swing desktop app, and the source code is on GitHub. With a Java JDK installed, run.sh in the src folder compiles and starts it. The repo also has scripts that package it as a macOS .dmg or a Windows .exe with jpackage.',
  },
];

const SITE = 'https://yashmathur.com';
const abs = (url: string) => (url.startsWith('http') ? url : `${SITE}${url}`);

export const META: ProductMeta = {
  path: TAMBOLA.path,
  title: 'Tambola Desktop App — Housie Ticket Generator & Number Caller',
  description:
    'Host Tambola (Housie) at home on your PC: a Java desktop app that generates tickets, calls numbers 1–90, highlights every ticket and flags each prize winner.',
  themeColor: '#FFF4DE',
  fonts: TAMBOLA_FONTS,
  ogImage: '/og/tambola.png',
  imageAlt: 'Tambola Desktop App: a Housie ticket with called numbers highlighted and number balls',
  module: 'src/pages/tambola/TambolaPage.tsx',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: TAMBOLA.name,
      alternateName: ['Tambola', 'Housie', 'Tambolo'],
      description:
        'A Java Swing desktop app for hosting Tambola (Housie): player set-up, prize selection, randomised ticket generation, number calling, automatic ticket highlighting and prize claims.',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Windows, macOS, Linux (Java)',
      url: abs(TAMBOLA.path),
      codeRepository: TAMBOLA.repo,
      sameAs: TAMBOLA.repo,
      programmingLanguage: 'Java',
      dateCreated: TAMBOLA.year,
      image: abs('/og/tambola.png'),
      screenshot: [mainShot, ticketsShot, highlightShot, claimShot].map(abs),
      author: { '@type': 'Person', name: 'Yash Mathur', url: `${SITE}/` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tambolaFaq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};
