import classicGamesHomePage from '../assets/images/ClassicGamesHub/ClassicGamesHub.webp';
import stackTicTacToeImg from '../assets/images/ClassicGamesHub/StackTicTacToe.webp';
import normalTicTacToeImg from '../assets/images/ClassicGamesHub/TicTacToe.webp';
import ultimateTicTacToeImg from '../assets/images/ClassicGamesHub/UltimateTicTacToe.webp';
import vanishingTicTacToeImg from '../assets/images/ClassicGamesHub/VanishingTicTacToe.webp';


import increzioLightHomeScreen from '../assets/images/IncrezioHabitTracker/Increzio_light.webp';
import increzioDarkHomeScreen from '../assets/images/IncrezioHabitTracker/Increzio_dark.webp';
import increzioAnalyticsPage from '../assets/images/IncrezioHabitTracker/AnalyticsPage.webp';
import increzioHabitListScreen from '../assets/images/IncrezioHabitTracker/HabitList.webp';
import increzioChangeThemeDialog from '../assets/images/IncrezioHabitTracker/ChangeTheme.webp';
import increzioWidget from '../assets/images/IncrezioHabitTracker/Widget.webp';

import tambolaAppImg from '../assets/images/TamboloApp/Tambolo.webp';
import tamboloTicketHighliting from '../assets/images/TamboloApp/Automatic Ticket Highlighting.webp';
import tamboloRandomTicketGeneration from '../assets/images/TamboloApp/Generated Randomized Tickets.webp';
import tamboloInitialization from '../assets/images/TamboloApp/Player initialization.webp';
import tamboloPrizeInit from '../assets/images/TamboloApp/Prize Selection.webp';
import tamboloPrizeClaim from '../assets/images/TamboloApp/prize claim.webp';


import porteeLibrary from '../assets/images/Portee/library.webp';
import porteeCatalog from '../assets/images/Portee/catalog.webp';
import porteeCatalogAdd from '../assets/images/Portee/catalog-add.webp';
import porteePermissions from '../assets/images/Portee/permissions.webp';
import porteeStorage from '../assets/images/Portee/storage-review.webp';
import porteeSessionsRecent from '../assets/images/Portee/sessions-recent.webp';
import porteeSessionsSearch from '../assets/images/Portee/sessions-search.webp';

import benchTechStack from '../assets/images/Benchtest/tech-stack.webp';

import mazeGate from '../assets/images/GardenMaze/gate_unlock.webp';
import mazeAerial from '../assets/images/GardenMaze/aerial_hedge.webp';
import mazeBrick from '../assets/images/GardenMaze/walk_brick.webp';
import mazePortalMirror from '../assets/images/GardenMaze/portal_mirror.webp';
import mazeHaunted from '../assets/images/GardenMaze/haunted_walk.webp';
import mazeWatcher from '../assets/images/GardenMaze/watcher.webp';

// import rlSolverImg from '../assets/images/RLTicTacToe.webp';


export interface ProjectProcessStep {
  title: string;
  description: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
}

export interface ProjectVideo {
  src: string;
  poster?: string;
  title: string;
}

export interface ProjectDownload {
  url: string;
  label: string;
  note: string;
}

export interface ProjectDetail {
  videos?: ProjectVideo[];
  download?: ProjectDownload;
  slug: string;
  title: string;
  timeline: string;
  summary: string;
  skills: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  privacyPolicyUrl?: string;
  learnMoreLink: string;
  videoUrl: string | null;
  overview: string;
  motivation: string[];
  process: ProjectProcessStep[];
  gallery: ProjectGalleryItem[];
}

export const projects: ProjectDetail[] = [
  {
    "slug": "portee",
    "title": "Portée - The Agent Harness Manager",
    "timeline": "2026",
    "summary": "AI coding agents quietly eat your disk. Portée is a native macOS app that shows what Claude Code, Codex, Cursor and OpenCode are really costing your Mac, and lets you manage their MCP servers, skills, permissions and past sessions from one place.",
    "skills": ["Rust", "axum", "wry / tao", "SQLite", "macOS", "Developer Tools"],
    "image": porteeStorage,
    "liveUrl": "",
    "repoUrl": "",
    "learnMoreLink": "/projects/portee",
    "download": {
      "url": "/downloads/Portee-0.1.0.dmg",
      "label": "Download for macOS",
      "note": "Version 0.1.0 · 3.4 MB · macOS 12+, Apple Silicon"
    },
    "videoUrl": null,
    "videos": [
      {
        "src": "/videos/portee-launch.mp4",
        "poster": "/videos/portee-launch.jpg",
        "title": "Portée launch film"
      }
    ],
    "overview": "Everyone uses AI coding agents now, and almost no one knows what they are doing to their machine. People watch RAM and GPU, but the silent cost is storage: sessions, caches and app data pile up across every agent. Portée puts that in one view, then goes further - add an MCP server or skill once and sync it to every agent, and search every past session to pick up where you left off, all locally and without spending a single token.",
    "motivation": [
      "Everyone thinks about RAM and GPUs when they think about the cost of AI. The silent cost to your storage is the one that gets missed.",
      "If you use several agents, you have probably added a skill or MCP server in one tool or one project and not in the others. Syncing them is manual, and you have to repeat it for every tool.",
      "Over time you collect a lot of sessions, and finding the one you need means opening each tool and scrolling.",
      "I wanted one clean home for all of it: see the cost, define things once, and find any session without starting from scratch."
    ],
    "process": [
      {
        "title": "Making the Storage Cost Visible",
        "description": "The Storage view shows, per agent, how many processes are running, how much RAM they use and how much disk they hold, with cleanable groups you can review before deleting anything. You choose what goes."
      },
      {
        "title": "Add Once, Sync Everywhere",
        "description": "MCP servers, skills, tools and hooks live in a single catalog. Add one globally and sync it to every agent instead of repeating the setup in each tool. Existing configs can be adopted into the catalog, and TOML edits are made in place so comments and formatting survive."
      },
      {
        "title": "Find Any Session",
        "description": "Search across the past sessions of all four agents by the words you remember. Search runs on a local index on your Mac, so it costs no tokens and nothing leaves your machine. Open the session and carry on instead of starting over."
      },
      {
        "title": "Permissions in One Place",
        "description": "Allow, ask-first and blocked rules for each agent are kept separate from macOS privacy permissions, so what each agent may do is clear at a glance."
      },
      {
        "title": "Native App, Clean UI",
        "description": "A Rust app with a small local server and a native webview window, packaged as a DMG installer. A guided flow handles Full Disk Access for protected folders. I also made the launch film with HyperFrames, using real screenshots of the running app."
      }
    ],
    "gallery": [
      { "src": porteeStorage, "alt": "Portée's Storage view showing RAM, disk use and cleanable groups for each coding agent" },
      { "src": porteeLibrary, "alt": "Portée's This Mac page listing the four detected coding agents and their locations" },
      { "src": porteeCatalog, "alt": "The catalog of MCP servers, skills, tools and hooks shared across agents" },
      { "src": porteeCatalogAdd, "alt": "Adding a server or skill once and choosing which agents to sync it to" },
      { "src": porteeSessionsSearch, "alt": "Searching past sessions across Claude Code, Codex, Cursor and OpenCode" },
      { "src": porteeSessionsRecent, "alt": "Recent sessions across all agents" },
      { "src": porteePermissions, "alt": "Agent permission rules: allowed, ask first and blocked" }
    ]
  },
  {
    "slug": "benchtest",
    "title": "Bench - LLM & Decision Model Evaluation",
    "timeline": "2026",
    "summary": "A native macOS app for evaluating LLMs and decision models, optimized for decision models today with generation-model improvements coming soon. Test models and prompts, and build the datasets you need to fine-tune.",
    "skills": ["Swift", "SwiftUI", "SQLite", "Local REST API", "Evals", "macOS"],
    "image": benchTechStack,
    "liveUrl": "",
    "repoUrl": "",
    "learnMoreLink": "/projects/benchtest",
    "download": {
      "url": "/downloads/Bench-1.0.dmg",
      "label": "Download for macOS",
      "note": "Version 1.0 · 2.8 MB · macOS 14+, Apple Silicon & Intel"
    },
    "videoUrl": null,
    "overview": "Bench is my tool for evaluating LLMs and decision models. It is out in its first phase, which is optimized for decision models, because that is where much of the momentum is right now; further improvements for generation models are coming soon. It gives you an inviting interface for running evaluations and an API to do the same programmatically, so you can see how a model performs on your own options and prompts - and turn the results into the dataset you need to fine-tune it.",
    "motivation": [
      "Decision models are zero-shot. Anyone with a traditional machine-learning background knows zero-shot rarely works as well as a classifier that has been fine-tuned.",
      "Fine-tuning needs a good dataset, and building one is the tedious part. Bench makes that part approachable.",
      "For example, Laya, the open-source alternative to Jev, only needs roughly 200 to 1,000 samples to fine-tune properly. You can create that dataset right here and use it to fine-tune the model."
    ],
    "process": [
      {
        "title": "Evaluate Your Options and Prompts",
        "description": "Run a decision model against your own options, try different prompts, and see how it actually performs, with correctness, latency, tokens and cost tracked per model and category."
      },
      {
        "title": "Mark Answers, Build the Dataset",
        "description": "Review the answers, mark what is right, and the results become a dataset you can export for fine-tuning."
      },
      {
        "title": "A Router Across Providers",
        "description": "A decision router sends each question to the right model: Jev, Laya, OpenAI Decisions or a custom endpoint, with direct providers, OpenAI-compatible servers and local CLIs supported for generation models."
      },
      {
        "title": "Do It Programmatically",
        "description": "A local REST API lets scripts post batches, fetch results and save datasets, so evaluations can run as part of your own pipeline."
      },
      {
        "title": "Native and Local-First",
        "description": "A native macOS app built in SwiftUI. Data stays on your machine and API keys live in the Keychain."
      }
    ],
    "gallery": [
      { "src": benchTechStack, "alt": "Bench evaluation stack: inputs, core, model adapters, evaluation and data" }
    ]
  },
  {
    "slug": "garden-maze",
    "title": "The Garden Maze - First-Person Maze Game",
    "timeline": "2026",
    "summary": "A first-person maze game with 100+ levels, mirror mazes and spooky levels. Unlike the third-person maze puzzles out there, you are inside it - on all major operating systems, with VR coming soon.",
    "skills": ["Unity", "C#", "Procedural Generation", "Game Design", "Shaders & Lighting"],
    "image": mazeGate,
    "liveUrl": "",
    "repoUrl": "",
    "learnMoreLink": "/projects/garden-maze",
    "privacyPolicyUrl": "/garden-maze/privacy",
    "videoUrl": null,
    "videos": [
      {
        "src": "/videos/garden-maze-promo-30s.mp4",
        "poster": "/videos/garden-maze-promo-30s.jpg",
        "title": "The Garden Maze - 30s trailer"
      },
      {
        "src": "/videos/garden-maze-promo-15s.mp4",
        "poster": "/videos/garden-maze-promo-15s.jpg",
        "title": "The Garden Maze - 15s cut-down"
      }
    ],
    "overview": "The Garden Maze is a passion project. Most maze games are played from above, in third person, and feel more like puzzles. This one puts you inside the maze, in first person, for a far more immersive feel. It has over 100 levels with well-designed assets, different visual styles, real mirror mazes, a few spooky levels, and coins to collect. It runs on all major operating systems, and it will shine most in virtual reality, which is coming soon.",
    "motivation": [
      "I have always wondered why mazes can't be as complex as the ones in movies.",
      "In the real world that is hard: a complex maze needs a lot of space, and you can't keep changing its design.",
      "In a game, none of that applies - the maze can be as big and as twisted as you like, and it can change every level.",
      "Making it first-person is what sets it apart, and it is also what makes it a natural fit for virtual reality."
    ],
    "process": [
      {
        "title": "Complex Mazes, Generated",
        "description": "Every level is generated from a seed and a difficulty, so mazes can be larger and more complicated than anything you could build for real, and each one is different."
      },
      {
        "title": "Different Worlds, Real Mirrors",
        "description": "Hedge, brick and mirror styles, including an actual mirror maze with real reflections where corridors seem to carry on forever."
      },
      {
        "title": "Thrills",
        "description": "Locked gates that need a hidden key, a portal arch to find at the end, and haunted levels with a flashlight, strange sounds and the Watcher, a figure that vanishes when you look at it."
      },
      {
        "title": "Coins and Progress",
        "description": "Coins scattered through each level feed a saved wallet you can spend in the shop on themes and helpers like a compass and hints."
      },
      {
        "title": "All Major Platforms, VR Next",
        "description": "Built in Unity with command-line builds for macOS, Windows, Android and iPad. First-person is the natural fit for virtual reality, which is the next step."
      }
    ],
    "gallery": [
      { "src": mazeGate, "alt": "A themed portal arch and gate in a brick maze" },
      { "src": mazeAerial, "alt": "Aerial view of a generated hedge maze" },
      { "src": mazeBrick, "alt": "Walking through red brick corridors" },
      { "src": mazePortalMirror, "alt": "A glowing portal arch in the mirror world" },
      { "src": mazeHaunted, "alt": "A haunted level lit only by the player's flashlight" },
      { "src": mazeWatcher, "alt": "A dark corridor on a haunted level where the Watcher appears" }
    ]
  },
  {
    "slug": "classic-games-hub",
    "title": "Classic Games Hub",
    "timeline": "2024",
    "summary": "A multiplayer platform that blends nostalgia with modern design, letting players enjoy fun new twists on classic childhood games like TicTacToe and Four In a Row.",
    "skills": ["React", "Next.js", "Firebase", "SEO"],
    "image": classicGamesHomePage,
    "liveUrl": "https://classicgameshub.com",
    // "repoUrl": "https://github.com/dev-yashmathur/classic-games-hub",
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
    "liveUrl": "https://play.google.com/store/apps/details?id=com.yashmathur.habit_tracker",
    // "repoUrl": "https://github.com/dev-yashmathur/increase-your-habit-tracker",
    "learnMoreLink": "/projects/increzio-habit-tracker",
    "videoUrl": null,
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
  // {
  //   slug: 'reinforcement-learning-game-solver',
  //   title: 'Reinforcement Learning Game Solver',
  //   timeline: '2023',
  //   summary: 'An experimentation sandbox that trains agents to master zero-sum board games using self-play and curriculum learning.',
  //   skills: ['AI/ML', 'Reinforcement Learning', 'Python'],
  //   image: rlSolverImg,
  //   liveUrl: 'https://rl-game-solver.example.com',
  //   repoUrl: 'https://github.com/dev-yashmathur/rl-game-solver',
  //   learnMoreLink: '/projects/reinforcement-learning-game-solver',
  //   videoUrl: 'https://www.youtube.com/embed/gbzqvQmuMP0',
  //   overview: 'This project demystifies reinforcement learning by wrapping policy iteration experiments in an approachable UI that visualises agent strategies evolving over time.',
  //   motivation: [
  //     'University peers kept asking for an intuitive way to see how Q-learning actually converges beyond textbook plots.',
  //     'I wanted to stress-test curriculum learning ideas on accessible games like Tic Tac Toe before scaling to more complex environments.'
  //   ],
  //   process: [
  //     {
  //       title: 'Environment Toolkit',
  //       description: 'Built a lightweight OpenAI Gym compatible environment with pluggable reward functions and symmetry reductions for small board games.'
  //     },
  //     {
  //       title: 'Training & Evaluation Pipelines',
  //       description: 'Created distributed training jobs on Kubernetes, logged metrics with Weights & Biases, and streamed policy checkpoints to the frontend.'
  //     },
  //     {
  //       title: 'Interactive Visualisations',
  //       description: 'Rendered heatmaps, decision trees, and replay timelines so students could pause any move and inspect the policy behind it.'
  //     }
  //   ],
  //   gallery: [
  //     {
  //       src: rlSolverImg,
  //       alt: 'Reinforcement learning agent analysing a tic tac toe board'
  //     },
  //     {
  //       src: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=80&w=1200',
  //       alt: 'Team monitoring graphs on multiple displays'
  //     },
  //     {
  //       src: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&q=80&w=1200',
  //       alt: 'Notebook containing reinforcement learning equations'
  //     }
  //   ]
  // },
  {
    "slug": "tambola-desktop-app",
    "title": "Tambola Desktop App",
    "timeline": "2020",
    "summary": "A cross-platform Java desktop app that automated the tedious parts of playing Tambola (Housie) online during the COVID lockdowns, so everyone could join the fun. ",
    "skills": ["Java", "Swing", "Desktop Application", "Object-Oriented Design"],
    "image": tambolaAppImg,
    "liveUrl": "",
    "repoUrl": "https://github.com/dev-yashmathur/TamboloFinal",
    "learnMoreLink": "/projects/tambola-desktop-app",
    "videoUrl": null,
    "overview": "The Tambola Desktop App was my first real-world project—built to solve a problem my friends and family faced during covid lockdown game nights. It automated ticket generation, number calling, and win verification so that no one had to sit out to manage the game. Note: As this was my first project, the UI/UX does leave a lot to be desired, which would have been done differently, had I approached it now.",
    "motivation": [
      "During the 2020 lockdowns, our family game nights moved to Zoom and Google Meet, but one person always had to miss playing to handle ticket distribution and verification.",
      "It also always stalled the game unnecessarily when someone claimed they had won, because the verification was completely manual.",
      "I wanted to create something simple yet effective that would automate the boring parts, allowing everyone to participate and enjoy the experience equally.",
      "It was also equally important, to only remove the manual task of hosting, still retaining all human - social elements of the game.",
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
        "src": tambolaAppImg,
        "alt": "Tambola Desktop App main interface showing ticket generation and number calling"
      },
      {
        "src": tamboloInitialization,
        "alt": "Tambola Desktop App setting up player names"
      },
      {
        "src": tamboloPrizeInit,
        "alt": "Tambola Desktop App prize selection screen"
      },
      {
        "src": tamboloRandomTicketGeneration,
        "alt": "Generated Randomized tickets per player"
      },
      {
        "src": tamboloTicketHighliting,
        "alt": "Automatic updates on each ticket, when a called out number hits."
      },
      {
        "src": tamboloPrizeClaim,
        "alt": "Real time update, when a prize can be claimed by any of the players, making it a seamless process!"
      },
    ]
  }

];

export const projectMap = new Map(projects.map(project => [project.slug, project]));

export const getProjectBySlug = (slug: string) => projectMap.get(slug);
