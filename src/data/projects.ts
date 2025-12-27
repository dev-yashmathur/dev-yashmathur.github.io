import classicGamesHomePage from '../assets/images/ClassicGamesHub/ClassicGamesHub.png';
import stackTicTacToeImg from '../assets/images/ClassicGamesHub/StackTicTacToe.png';
import normalTicTacToeImg from '../assets/images/ClassicGamesHub/TicTacToe.png';
import ultimateTicTacToeImg from '../assets/images/ClassicGamesHub/UltimateTicTacToe.png';
import vanishingTicTacToeImg from '../assets/images/ClassicGamesHub/VanishingTicTacToe.png';


import increzioLightHomeScreen from '../assets/images/IncrezioHabitTracker/Increzio_light.png';
import increzioDarkHomeScreen from '../assets/images/IncrezioHabitTracker/Increzio_dark.png';
import increzioAnalyticsPage from '../assets/images/IncrezioHabitTracker/AnalyticsPage.png';
import increzioHabitListScreen from '../assets/images/IncrezioHabitTracker/HabitList.png';
import increzioChangeThemeDialog from '../assets/images/IncrezioHabitTracker/ChangeTheme.png';
import increzioWidget from '../assets/images/IncrezioHabitTracker/Widget.png';


import rlSolverImg from '../assets/images/RLTicTacToe.jpg';
import tambolaAppImg from '../assets/images/TamboloApp/Tambolo.png';


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
    "slug": "classic-games-hub",
    "title": "Classic Games Hub",
    "timeline": "2024",
    "summary": "A multiplayer platform that blends nostalgia with modern design, letting players enjoy fun new twists on classic childhood games like TicTacToe and Four In a Row.",
    "skills": ["React", "Next.js", "Firebase", "SEO"],
    "image": classicGamesHomePage,
    "liveUrl": "https://classicgameshub.com",
    "repoUrl": "https://github.com/dev-yashmathur/classic-games-hub",
    "learnMoreLink": "/projects/classic-games-hub",
    "videoUrl": "https://www.youtube.com/embed/9GX9BBpR5Qo",
    "overview": "Classic Games Hub reimagines nostalgic childhood board games into playful, modern web experiences. It lets players compete online, challenge the computer, or enjoy reimagined versions of old favorites—all within a sleek, warm, 3D-inspired interface.",
    "motivation": [
      "I often saw creative modern twists of nostalgic games on social media which seemed fun, but I didn't have anyone to play those with around me.",
      "I then also, did not find any online platforms to play these variants with friends or strangers online.",
      "These games seemed to me, to be the perfect blend of simple, exciting while still mainting the core essence of the orignal games to be a fun iteration of them, to play with others, without knowing the outcome is always a draw.",
      "This adds the much needed revival layer on these games, to enjoy them once more!"
    ],
    "process": [
      {
        "title": "Ideation & Validation",
        "description": "Discovered the concept through social media trends, validated user interest by discussing with friends and researching engagement on similar games."
      },
      {
        "title": "Design & Development",
        "description": "Designed a warm, playful 3D aesthetic, implemented live multiplayer using Firebase for serverless deployment, and developed core game logic in React + Next.js."
      },
      {
        "title": "Testing & Deployment",
        "description": "Created local 2-player and computer-play modes, added online multiplayer, and deployed to Vercel with CI/CD. Monitored SEO metrics and optimized for Google search rankings."
      }
    ],
    "gallery": [
      {
        "src": classicGamesHomePage,
        "alt": "Classic Games Hub homepage showcasing nostalgic game variants"
      },
      {
        "src": stackTicTacToeImg,
        "alt": "Tic Tac Toe Stack - Where Size Matters"
      },
      {
        "src": vanishingTicTacToeImg,
        "alt": "Vanishing Tic Tac Toe - where pieces only stay on board for 3 turns!"
      },
      {
        "src": ultimateTicTacToeImg,
        "alt": "Ultimate Tic Tac Toe - 9 Games of Tic Tac Toe in One 3x3 grid of 3x3 boards!"
      },
      {
        "src": normalTicTacToeImg,
        "alt": "Anti Tic Tac Toe - Just like regular, but on making 3 in a row - You LOOSE!"
      },
    ]
  },
  {
    "slug": "increzio-habit-tracker",
    "title": "Increzio - Habit Tracker",
    "timeline": "2025",
    "summary": "A Flutter-based habit tracking app featuring home screen widgets, a hand-drawn aesthetic, incremental habit goals, and customizable day reset times.",
    "skills": ["Flutter", "Mobile Development", "UI/UX Design"],
    "image": increzioLightHomeScreen,
    "liveUrl": "https://<playstorelink>.com",
    "repoUrl": "https://github.com/dev-yashmathur/increase-your-habit-tracker",
    "learnMoreLink": "/projects/increzio-habit-tracker",
    "videoUrl": "https://www.youtube.com/embed/ysz5S6PUM-U",
    "overview": "Increzio Habit Tracker is a mobile app designed to make habit building more engaging through home screen widgets and a flexible, hand-drawn interface. It encourages users to improve incrementally and lets them customize when their habit day resets.",
    "motivation": [
      "I loved the idea of habit streaks and wanted an app that would place those streaks right on the home screen as widgets for extra motivation.",
      "Inspired by 'Atomic Habits,' I wanted to integrate the idea of tiny daily improvements that compound over time.",
      "As a night owl, I needed a habit tracker that allowed me to set a custom day reset time instead of the default midnight."
    ],
    "process": [
      {
        "title": "Concept & Design",
        "description": "Conceptualized the app around the idea of habit widgets and a hand-drawn UI. Sketched out a user-friendly interface focused on simplicity and daily motivation, away from the over polished industry designs"
      },
      {
        "title": "Development & Unique Features",
        "description": "Built the app using Flutter, added home screen widgets, incremental daily improvement goals, and a customizable day reset time to match users' schedules."
      },
      {
        "title": "Testing & Launch",
        "description": "Tested the app with a small user group, refined the features based on feedback, and launched it on play store with full habit-tracking functionality."
      }
    ],
    "gallery": [
      {
        "src": increzioLightHomeScreen,
        "alt": "Increzio Habit Tracker main interface showing hand-drawn style UI"
      },
      {
        "src": increzioHabitListScreen,
        "alt": "Increzio Habit Tracker habit list, and add screen"
      },
      {
        "src": increzioAnalyticsPage,
        "alt": "Increzio Habit Tracker Analytics for all measurable habits"
      },
      {
        "src": increzioChangeThemeDialog,
        "alt": "Increzio Habit Tracker supporting LIGHT and DARK themes"
      },
      {
        "src": increzioWidget,
        "alt": "Increzio Habit Tracker's Home Screen widget to always remind you of your streak"
      },
      {
        "src": increzioDarkHomeScreen,
        "alt": "Sneak Peek of the Dark mode for Increzio Habit Tracker!"
      },
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
    "slug": "tambola-desktop-app",
    "title": "Tambola Desktop App",
    "timeline": "2020",
    "summary": "A cross-platform Java desktop app that automated the tedious parts of playing Tambola (Housie) online during the COVID lockdowns, so everyone could join the fun.",
    "skills": ["Java", "Swing", "Desktop Application", "Object-Oriented Design"],
    "image": tambolaAppImg,
    "liveUrl": "",
    "repoUrl": "",
    "learnMoreLink": "/projects/tambola-desktop-app",
    "videoUrl": "https://www.youtube.com/embed/ysz5S6PUM-U",
    "overview": "The Tambola Desktop App was my first real-world project—built to solve a problem my friends and family faced during lockdown game nights. It automated ticket generation, number calling, and win verification so that no one had to sit out to manage the game.",
    "motivation": [
      "During the 2020 lockdowns, our family game nights moved to Zoom and Google Meet, but one person always had to miss playing to handle ticket distribution and verification.",
      "I wanted to create something simple yet effective that would automate the boring parts, allowing everyone to participate and enjoy the experience equally."
    ],
    "process": [
      {
        "title": "Problem Discovery & Concept",
        "description": "Identified the recurring friction point in online Tambola games — manual ticket management and win validation — and decided to build a desktop solution for it."
      },
      {
        "title": "Design & Core Development",
        "description": "Developed a Java-based application with a simple GUI using Swing, allowing users to configure players, prizes, and rule variations like four corners, full house, and first five."
      },
      {
        "title": "Automation & Play Experience",
        "description": "Implemented automated number calling and real-time win detection logic, ensuring fair play while keeping the social elements intact. Players could instantly verify claims on-screen."
      }
    ],
    "gallery": [
      {
        "src": "tambolaAppImg",
        "alt": "Tambola Desktop App main interface showing ticket generation and number calling"
      },
      {
        "src": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
        "alt": "Family playing Tambola online during lockdown"
      },
      {
        "src": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1200",
        "alt": "Screenshot concept of Tambola app running on desktop"
      }
    ]
  }

];

export const projectMap = new Map(projects.map(project => [project.slug, project]));

export const getProjectBySlug = (slug: string) => projectMap.get(slug);
