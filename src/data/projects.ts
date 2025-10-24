import classicGamesImg from '../assets/images/ClassicGamesHub.png';
import increzioLightImg from '../assets/images/Increzio_light.png';
import increzioDarkImg from '../assets/images/Increzio_dark.png';
import rlSolverImg from '../assets/images/RLTicTacToe.jpg';
import tamboloImg from '../assets/images/Tambolo.png';

export interface ProjectProcessStep {
  title: string;
  description: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  timeline: string;
  summary: string;
  skills: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  learnMoreLink: string;
  videoUrl: string;
  overview: string;
  motivation: string[];
  process: ProjectProcessStep[];
  gallery: ProjectGalleryItem[];
}

export const projects: ProjectDetail[] = [
  {
    slug: 'classic-games-hub',
    title: 'Classic Games Hub',
    timeline: '2024',
    summary: 'A curated storefront that lets players rediscover retro board and arcade titles with modern multiplayer support.',
    skills: ['React', 'Next.js', 'Firebase'],
    image: classicGamesImg,
    liveUrl: 'https://classic-games-hub.example.com',
    repoUrl: 'https://github.com/dev-yashmathur/classic-games-hub',
    learnMoreLink: '/projects/classic-games-hub',
    videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U',
    overview: 'Classic Games Hub reimagines the experience of browsing dusty game stores by giving retro fans a polished digital catalogue, live multiplayer rooms, and profiles that track high-scores in real time.',
    motivation: [
      'I grew up swapping cartridges and board games with friends, and wanted to capture that communal vibe digitally without the friction of outdated UIs.',
      'Indie developers were also looking for a lightweight discovery channel that did not bury their lovingly remastered ports under modern releases.'
    ],
    process: [
      {
        title: 'Experience Research & Content Pipeline',
        description: 'Interviewed 12 retro enthusiasts, mapped the discovery journey, and built a content pipeline that ingests metadata from IGDB plus manual curator notes.'
      },
      {
        title: 'Realtime Multiplayer Layer',
        description: 'Implemented a Firebase powered presence service, WebRTC game rooms, and a turn-based rules engine that can be configured per title.'
      },
      {
        title: 'Observability & Launch',
        description: 'Added structured logging, replayable error sessions, and shipped to production behind feature flags with A/B tested onboarding.'
      }
    ],
    gallery: [
      {
        src: classicGamesImg,
        alt: 'Classic Games Hub storefront hero illustration'
      },
      {
        src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
        alt: 'Players gathered around an arcade machine'
      },
      {
        src: 'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&q=80&w=1200',
        alt: 'Board game pieces arranged on a table'
      }
    ]
  },
  {
    slug: 'increzio-habit-tracker',
    title: 'Increzio — Habit Tracker',
    timeline: '2025',
    summary: 'A cross-platform habit companion that gently nudges teams and individuals toward consistent routines.',
    skills: ['Flutter', 'Android', 'iOS'],
    image: increzioLightImg,
    liveUrl: 'https://increzio.app',
    repoUrl: 'https://github.com/dev-yashmathur/increzio',
    learnMoreLink: '/projects/increzio-habit-tracker',
    videoUrl: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
    overview: 'Increzio wraps behaviour science insights into a lightweight Flutter experience. The app unifies calendars, context aware reminders, and mood tracking so habits actually stick.',
    motivation: [
      'Teams I worked with struggled to adopt wellness and productivity plans because existing trackers were either too clinical or too distracting.',
      'I wanted a flexible routine builder that nudged progress without guilt and could sync across personal and shared spaces.'
    ],
    process: [
      {
        title: 'Signal Design & Research',
        description: 'Ran diary studies with 18 participants to understand push notification fatigue, then created a tone framework for encouraging copy.'
      },
      {
        title: 'Cross-Platform Architecture',
        description: 'Structured the codebase with feature-first folders, ensured pixel parity between Material 3 and iOS Human Interface Guidelines, and tuned performance with isolate-based schedulers.'
      },
      {
        title: 'Insights & Experimentation',
        description: 'Shipped analytics funnels, sentiment analysis for journal entries, and remote config toggles to iterate on habit loops without forced updates.'
      }
    ],
    gallery: [
      {
        src: increzioDarkImg,
        alt: 'Increzio dark mode dashboard'
      },
      {
        src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
        alt: 'Team collaborating with sticky notes planning habits'
      },
      {
        src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
        alt: 'Person checking a morning routine on a phone'
      }
    ]
  },
  {
    slug: 'reinforcement-learning-game-solver',
    title: 'Reinforcement Learning Game Solver',
    timeline: '2023',
    summary: 'An experimentation sandbox that trains agents to master zero-sum board games using self-play and curriculum learning.',
    skills: ['AI/ML', 'Reinforcement Learning', 'Python'],
    image: rlSolverImg,
    liveUrl: 'https://rl-game-solver.example.com',
    repoUrl: 'https://github.com/dev-yashmathur/rl-game-solver',
    learnMoreLink: '/projects/reinforcement-learning-game-solver',
    videoUrl: 'https://www.youtube.com/embed/gbzqvQmuMP0',
    overview: 'This project demystifies reinforcement learning by wrapping policy iteration experiments in an approachable UI that visualises agent strategies evolving over time.',
    motivation: [
      'University peers kept asking for an intuitive way to see how Q-learning actually converges beyond textbook plots.',
      'I wanted to stress-test curriculum learning ideas on accessible games like Tic Tac Toe before scaling to more complex environments.'
    ],
    process: [
      {
        title: 'Environment Toolkit',
        description: 'Built a lightweight OpenAI Gym compatible environment with pluggable reward functions and symmetry reductions for small board games.'
      },
      {
        title: 'Training & Evaluation Pipelines',
        description: 'Created distributed training jobs on Kubernetes, logged metrics with Weights & Biases, and streamed policy checkpoints to the frontend.'
      },
      {
        title: 'Interactive Visualisations',
        description: 'Rendered heatmaps, decision trees, and replay timelines so students could pause any move and inspect the policy behind it.'
      }
    ],
    gallery: [
      {
        src: rlSolverImg,
        alt: 'Reinforcement learning agent analysing a tic tac toe board'
      },
      {
        src: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=80&w=1200',
        alt: 'Team monitoring graphs on multiple displays'
      },
      {
        src: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&q=80&w=1200',
        alt: 'Notebook containing reinforcement learning equations'
      }
    ]
  },
  {
    slug: 'tambolo-desktop-app',
    title: 'Tambolo App for Desktop',
    timeline: '2020',
    summary: 'A cross-platform desktop companion for Tambola hosts with automated number calling, score tracking, and celebration overlays.',
    skills: ['Java', 'Windows', 'macOS'],
    image: tamboloImg,
    liveUrl: 'https://tambolo-app.example.com',
    repoUrl: 'https://github.com/dev-yashmathur/tambolo-desktop',
    learnMoreLink: '/projects/tambolo-desktop-app',
    videoUrl: 'https://www.youtube.com/embed/6LTzL9YQ7jM',
    overview: 'Tambolo Desktop keeps community game nights flowing with snappy number draws, shareable tickets, and whimsical confetti states for every winning pattern.',
    motivation: [
      'Family game nights devolved into chaos when someone misheard a number or misplaced ticket sheets.',
      'Most Tambola software felt like dated accounting tools, so I aimed for a warmer, celebration-first experience.'
    ],
    process: [
      {
        title: 'Realtime Draw Engine',
        description: 'Developed a deterministic RNG with guard rails against repeats, plus announcer voice packs and keyboard shortcuts for hosts.'
      },
      {
        title: 'Ticket & Prize Modules',
        description: 'Automated ticket generation, validations for multiple prize types, and introduced celebratory overlays for claims.'
      },
      {
        title: 'Packaging & Distribution',
        description: 'Set up cross-platform builds with Gradle, notarised macOS binaries, and implemented in-app update checks.'
      }
    ],
    gallery: [
      {
        src: tamboloImg,
        alt: 'Tambolo desktop dashboard showing current draw status'
      },
      {
        src: 'https://images.unsplash.com/photo-1501426668471-14d4a847a18b?auto=format&fit=crop&q=80&w=1200',
        alt: 'Friends celebrating during a house party'
      },
      {
        src: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&q=80&w=1200',
        alt: 'Colorful bingo balls on a table'
      }
    ]
  }
];

export const projectMap = new Map(projects.map(project => [project.slug, project]));

export const getProjectBySlug = (slug: string) => projectMap.get(slug);
