export interface BookPageContent {
    title: string;
    body: string;
    image: string;
    imageAlt: string;
}

export interface BookOverview {
    id: string;
    title: string;
    subtitle?: string;
    author?: string;
    coverImage: string;
    coverImageAlt: string;
    coverTagline: string;
    pages: BookPageContent[];
}

export const bookOverviewById: Record<string, BookOverview> = {
    "atomic-habits": {
        id: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        subtitle: "Tiny changes, remarkable results",
        coverImage: "https://images.unsplash.com/photo-1498079022511-d15614cb1c02?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Notebook with habit tracking notes and a cup of coffee",
        coverTagline: "Build systems that make your best habits inevitable.",
        pages: [
            {
                title: "The Compound Effect",
                body: "Clear shows how every 1% improvement compounds, turning small wins into transformational change when you iterate daily.",
                image: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Stacked wooden blocks illustrating incremental growth"
            },
            {
                title: "Habit Loops",
                body: "The cue, craving, response, reward loop becomes a design checklist for building habits that stick or breaking ones that drain energy.",
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Whiteboard sketches of a behavioral loop"
            },
            {
                title: "Systems Over Goals",
                body: "Focus on the process instead of the scoreboard. Systems-first thinking keeps motivation steady even when outcomes take time.",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Planner with daily systems highlighted in different colors"
            },
            {
                title: "Identity-Based Habits",
                body: "Identity shifts happen through action. Each repetition is a vote for the type of person you believe you are becoming.",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Sticky notes forming the word identity"
            }
        ]
    },
    "ikigai": {
        id: "ikigai",
        title: "Ikigai",
        author: "Héctor García & Francesc Miralles",
        subtitle: "The Japanese secret to a long and happy life",
        coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Cherry blossoms in bloom with soft pastel colors",
        coverTagline: "Discover the intersection of passion, mission, vocation, and profession.",
        pages: [
            {
                title: "Purpose Every Morning",
                body: "Ikigai invites you to start each day with something to look forward to, no matter how small or personal that ritual might be.",
                image: "https://images.unsplash.com/photo-1499696010181-4d8c52b38ff6?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Morning sunlight shining through a traditional Japanese home"
            },
            {
                title: "Community Matters",
                body: "Longevity hotspots share a pattern: tight-knit communities where neighbors know each other’s stories and share responsibility.",
                image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=800&q=80",
                imageAlt: "People sharing tea at a low table"
            },
            {
                title: "Flow and Micro-joys",
                body: "Lean into activities that produce flow. Micro-joys from gardening, cooking, or learning keep curiosity alive.",
                image: "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Flatlay of creative tools for a mindful hobby"
            },
            {
                title: "Balance and Moderation",
                body: "Light meals, steady movement, and mindful rest form a triangle of moderation that keeps energy consistent.",
                image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Balanced meal with fresh vegetables in ceramic bowls"
            }
        ]
    },
    "how-to-win-friends": {
        id: "how-to-win-friends",
        title: "How to Win Friends and Influence People",
        author: "Dale Carnegie",
        subtitle: "Timeless principles of relationship building",
        coverImage: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Handshake in warm lighting",
        coverTagline: "Lead with empathy, listen with intent, and watch influence follow.",
        pages: [
            {
                title: "Genuine Interest",
                body: "People lean toward sincerity. Carnegie’s first lesson is to become genuinely interested in others, not just their outcomes.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Friends smiling while in conversation"
            },
            {
                title: "Remembering Names",
                body: "A person’s name is to that person the sweetest and most important sound. Remembering it is a signal of respect.",
                image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Name badges arranged on a table"
            },
            {
                title: "Handling Conflict",
                body: "Avoid arguments and criticism. Instead, seek common ground and guide people toward collaborative wins.",
                image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Colleagues discussing plans with sticky notes"
            },
            {
                title: "Inspiring Change",
                body: "Appeal to noble motives and dramatize ideas so others can see themselves in the future you describe.",
                image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Speaker presenting in front of an engaged audience"
            }
        ]
    },
    "million-dollar-weekend": {
        id: "million-dollar-weekend",
        title: "Million Dollar Weekend",
        author: "Noah Kagan",
        subtitle: "Launch a scrappy side-hustle in 48 hours",
        coverImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Entrepreneur brainstorming in a bright studio",
        coverTagline: "Ship fast, validate ideas, and learn directly from customers.",
        pages: [
            {
                title: "Idea Extraction",
                body: "Great products start with real pains. Talk to people, collect their struggles, and rank opportunities before building anything.",
                image: "https://images.unsplash.com/photo-1521737604893-4e6256f7e89c?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Sticky notes of customer research on a wall"
            },
            {
                title: "First Dollar First",
                body: "Kagan urges entrepreneurs to collect a dollar before perfecting the product. Revenue is the best validation metric.",
                image: "https://images.unsplash.com/photo-1556740749-887f6717d7e7?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Person evaluating a simple landing page prototype"
            },
            {
                title: "Time-Boxed Experiments",
                body: "The weekend sprint keeps you moving. Progress beats polish, and feedback arrives faster when cycles are tight.",
                image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Entrepreneur working late with laptop and notes"
            },
            {
                title: "Leverage Small Wins",
                body: "Each mini-success becomes proof of momentum. Stack wins, share stories, and recruit collaborators early.",
                image: "https://images.unsplash.com/photo-1521737604893-152d9c1a3c14?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Celebration over a successful product launch"
            }
        ]
    },
    "power-of-your-subconscious-mind": {
        id: "power-of-your-subconscious-mind",
        title: "The Power of Your Subconscious Mind",
        author: "Joseph Murphy",
        subtitle: "Harnessing the mind for healing and growth",
        coverImage: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Meditative person surrounded by warm light",
        coverTagline: "Align conscious intent with subconscious programming to unlock calm and creativity.",
        pages: [
            {
                title: "Belief Imprints",
                body: "Murphy explains how repeated thoughts become subconscious scripts that quietly direct daily choices.",
                image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Calm lake reflecting mountains at dawn"
            },
            {
                title: "Visualization Practice",
                body: "Mental rehearsal primes the mind-body connection. Vivid images of success trigger aligned actions.",
                image: "https://images.unsplash.com/photo-1529333166437-3ceaa32656cf?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Person journaling intentions in a notebook"
            },
            {
                title: "Letting Go of Fear",
                body: "Replacing anxious loops with gratitude and faith dissolves barriers that logic alone cannot reach.",
                image: "https://images.unsplash.com/photo-1500530855697-2077b23f8c01?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Sunlight breaking through dense clouds"
            },
            {
                title: "Positive Autosuggestion",
                body: "Consistent affirmations seed resilience. The subconscious works nonstop, so give it instructions worth following.",
                image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Affirmation cards laid out on a desk"
            }
        ]
    },
    "hello-world": {
        id: "hello-world",
        title: "Hello World",
        subtitle: "A friendly introduction to modern coding",
        coverImage: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Laptop displaying colorful code on screen",
        coverTagline: "Start with curiosity, stay for the problem solving.",
        pages: [
            {
                title: "First Print Statement",
                body: "The iconic 'Hello, World!' teaches the feedback loop: write, run, observe, tweak, and learn.",
                image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer typing code on a laptop"
            },
            {
                title: "Thinking in Logic",
                body: "Programming builds structured thinking—breaking big ideas into instructions the computer can follow.",
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Whiteboard covered with logical diagrams"
            },
            {
                title: "Debugging Mindset",
                body: "Bugs are clues. Each fix reveals how the system really behaves and improves your mental model.",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Magnifying glass hovering over code snippets"
            },
            {
                title: "Community of Builders",
                body: "From open source to local meetups, the developer community helps you go further than solo learning.",
                image: "https://images.unsplash.com/photo-1524666041070-9d87656c25b7?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developers collaborating at a hackathon"
            }
        ]
    },
    "white-space-creative": {
        id: "white-space-creative",
        title: "White Space",
        subtitle: "Breathing room in modern layouts",
        coverImage: "https://images.unsplash.com/photo-1523475472560-8f6f1fdf45c0?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Minimal workspace with pastel accents",
        coverTagline: "Intentional spacing guides every eye movement across a page.",
        pages: [
            {
                title: "Focus Through Contrast",
                body: "Generous margins isolate key elements so headlines and calls-to-action feel calm yet authoritative.",
                image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Clean layout sketches on a design board"
            },
            {
                title: "Hierarchy and Rhythm",
                body: "Whitespace sets tempo. Alternating dense and airy sections gives content a readable cadence.",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Designer arranging typographic specimens"
            },
            {
                title: "Breathing Room for Color",
                body: "Pastel palettes shine when surrounded by neutral space that keeps the mood soft and inviting.",
                image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Pastel color swatches on a desk"
            },
            {
                title: "Accessibility Wins",
                body: "Spacing improves readability for everyone, increasing legibility, scannability, and touch targets.",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Tablet showing a well-spaced interface"
            }
        ]
    },
    "taocp-vol-1": {
        id: "taocp-vol-1",
        title: "The Art of Computer Programming Vol 1",
        author: "Donald E. Knuth",
        subtitle: "Fundamental algorithms and their analysis",
        coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Old computer manuals stacked on a desk",
        coverTagline: "Meticulous exploration of algorithms that shaped computer science.",
        pages: [
            {
                title: "Mathematical Rigor",
                body: "Knuth grounds algorithms in combinatorics and probability, making efficiency a provable property.",
                image: "https://images.unsplash.com/photo-1523475472560-8ad79c3d5d76?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Notebook filled with mathematical formulas"
            },
            {
                title: "Fundamental Structures",
                body: "Covers basic algorithmic techniques that still underpin modern systems, from sorting to generation.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Vintage computer with flowcharts nearby"
            },
            {
                title: "Literary Programming",
                body: "Each chapter models how to think about problems with clarity and narrative structure.",
                image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Open book with code notes in the margins"
            },
            {
                title: "Exercises that Challenge",
                body: "The legendary exercises push readers to implement, analyze, and question every assumption.",
                image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Mathematician solving problems on paper"
            }
        ]
    },
    "css-guide": {
        id: "css-guide",
        title: "Cascading Style Sheets",
        subtitle: "Guide to Design",
        coverImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Front-end developer adjusting styles on dual monitors",
        coverTagline: "Bring structure, color, and motion together for expressive interfaces.",
        pages: [
            {
                title: "Cascade Mastery",
                body: "Understanding specificity and inheritance unlocks predictable styling in complex systems.",
                image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Code editor showing CSS selectors"
            },
            {
                title: "Layout Systems",
                body: "Flexbox and Grid allow fluid, responsive compositions that once required heavy hacks.",
                image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Designer planning responsive layouts on paper"
            },
            {
                title: "Design Tokens",
                body: "Tokens and custom properties bridge design and code, making themes scalable.",
                image: "https://images.unsplash.com/photo-1514385494035-63dd06a1e9a3?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Palette of colors and typography samples"
            },
            {
                title: "Motion & Microinteractions",
                body: "Transitions and keyframes add polish—subtle cues that guide focus and reinforce affordances.",
                image: "https://images.unsplash.com/photo-1523475472560-26da2c7c3aba?auto=format&fit=crop&w=800&q=80",
                imageAlt: "UI designer testing animated prototypes"
            }
        ]
    },
    "html5": {
        id: "html5",
        title: "HTML5",
        subtitle: "Welcome to the Web",
        coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Developer coding HTML on a laptop",
        coverTagline: "Semantic structure is the backbone of accessible web experiences.",
        pages: [
            {
                title: "Semantic Elements",
                body: "Header, main, article, and friends give assistive tech meaningful landmarks to navigate.",
                image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Highlighted HTML tags in code editor"
            },
            {
                title: "Forms & Validation",
                body: "Native controls with built-in validation reduce JavaScript overhead and boost usability.",
                image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Web form wireframe sketches"
            },
            {
                title: "Media APIs",
                body: "Video, audio, and canvas capabilities empower rich storytelling without plugins.",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
                imageAlt: "HTML5 video playback controls on screen"
            },
            {
                title: "Offline & Storage",
                body: "Local storage, IndexedDB, and service workers enable resilient progressive web apps.",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer planning progressive web app architecture"
            }
        ]
    },
    "coffeescript": {
        id: "coffeescript",
        title: "CoffeeScript",
        subtitle: "The JS Alternative",
        author: "The Dev Guy",
        coverImage: "https://images.unsplash.com/photo-1483794344563-d27a8d18014e?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Coffee mug beside a notebook with code",
        coverTagline: "Syntactic sugar that compiles into clean, modern JavaScript.",
        pages: [
            {
                title: "Concise Syntax",
                body: "Whitespace, implicit returns, and comprehensions let you express logic with fewer characters.",
                image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer writing concise code in a cafe"
            },
            {
                title: "Early ES Features",
                body: "CoffeeScript popularized features like destructuring and arrow functions before they landed in ES6.",
                image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Close up of code editor with arrow functions"
            },
            {
                title: "Compile Step",
                body: "Source maps and compilation pipelines encourage understanding of build tooling.",
                image: "https://images.unsplash.com/photo-1523475472560-8ad79c3d5d76?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Gears diagram representing build tooling"
            },
            {
                title: "Legacy Lessons",
                body: "Even if you don't ship CoffeeScript today, its influence lives on in modern JS ergonomics.",
                image: "https://images.unsplash.com/photo-1523475472560-26da2c7c3aba?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Vintage JavaScript books on a shelf"
            }
        ]
    },
    "cheat-sheet": {
        id: "cheat-sheet",
        title: "Cheat Sheet",
        subtitle: "Guide to Design",
        coverImage: "https://images.unsplash.com/photo-1523475472560-2b19b9c38ee8?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Design references pinned on a board",
        coverTagline: "Quick references to keep design fundamentals within reach.",
        pages: [
            {
                title: "Typography Pairings",
                body: "Curated pairings create visual harmony while preserving readability across breakpoints.",
                image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Type specimens and font catalogs"
            },
            {
                title: "Color Ratios",
                body: "Guidelines for primary, secondary, and accent ratios help maintain accessible contrast.",
                image: "https://images.unsplash.com/photo-1523475472560-2b19b9c38ee8?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Color wheel and palette cards"
            },
            {
                title: "Spacing Scale",
                body: "Modular scales reduce guesswork, making vertical rhythm consistent across components.",
                image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be350?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Designer measuring spacing on a sketch"
            },
            {
                title: "Interaction States",
                body: "Documenting hover, focus, and active states ensures accessibility by design.",
                image: "https://images.unsplash.com/photo-1523475472560-8ad79c3d5d76?auto=format&fit=crop&w=800&q=80",
                imageAlt: "UI state diagrams drawn on sticky notes"
            }
        ]
    },
    "psychology-of-colors": {
        id: "psychology-of-colors",
        title: "Psychology of Colors",
        coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Colorful design swatches laid on a table",
        coverTagline: "Use palette psychology to guide emotion and decision.",
        pages: [
            {
                title: "Warm vs Cool",
                body: "Warm tones energize and invite, while cool hues calm and assure—blend intentionally for balance.",
                image: "https://images.unsplash.com/photo-1498050108023-28038d911f22?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Palette of warm and cool cards spread out"
            },
            {
                title: "Cultural Context",
                body: "Colors carry cultural meaning—research audiences to avoid accidental miscommunication.",
                image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80",
                imageAlt: "International color references on a wall"
            },
            {
                title: "Brand Memory",
                body: "Consistent palettes become shorthand for your brand identity in customer memory.",
                image: "https://images.unsplash.com/photo-1523475472560-26da2c7c3aba?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Designers reviewing brand guidelines"
            },
            {
                title: "Accessibility Contrast",
                body: "Contrast ratios ensure palettes remain inclusive and legible across devices.",
                image: "https://images.unsplash.com/photo-1523475472560-893bcd61814f?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Color contrast ratios shown on a laptop"
            }
        ]
    },
    "typescript": {
        id: "typescript",
        title: "TypeScript",
        subtitle: "Intro JS to type checking",
        coverImage: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Screen with TypeScript code and static typing hints",
        coverTagline: "Types unlock confident refactoring and expressive APIs.",
        pages: [
            {
                title: "Gradual Typing",
                body: "Adopt types incrementally. Any file can opt in, letting teams scale safety over time.",
                image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer refactoring code with TypeScript"
            },
            {
                title: "Interfaces & Generics",
                body: "Modeling data contracts clarifies intent and reduces runtime surprises.",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Typed API schema drawn on paper"
            },
            {
                title: "Tooling Ecosystem",
                body: "Language services power autocompletion, rename, and jump-to-definition that speed up flow.",
                image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d9d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer enjoying rich editor integrations"
            },
            {
                title: "Cross-team Contracts",
                body: "Shared type definitions align backend and frontend, preventing assumption drift.",
                image: "https://images.unsplash.com/photo-1523475472560-2b19b9c38ee8?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Team collaborating on API definitions"
            }
        ]
    },
    "testing": {
        id: "testing",
        title: "Testing",
        subtitle: "Quality at every build",
        coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Quality assurance checklist on a clipboard",
        coverTagline: "Build resilient software by making failure safe and visible.",
        pages: [
            {
                title: "Unit Confidence",
                body: "Fast unit tests catch regressions close to the code that introduced them.",
                image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer running unit tests in terminal"
            },
            {
                title: "Integration Scenarios",
                body: "Simulate realistic journeys to ensure services talk to each other as expected.",
                image: "https://images.unsplash.com/photo-1523475472560-8f6f1fdf45c0?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Test engineer mapping system architecture"
            },
            {
                title: "Continuous Testing",
                body: "Automated pipelines run suites on every commit, giving teams instant feedback.",
                image: "https://images.unsplash.com/photo-1521737604893-4e6256f7e89c?auto=format&fit=crop&w=800&q=80",
                imageAlt: "CI dashboard with passing checks"
            },
            {
                title: "Observe in Production",
                body: "Monitoring and feature flags extend testing into the real world, enabling safe experimentation.",
                image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Engineer watching observability dashboards"
            }
        ]
    },
    "javascript-definitive": {
        id: "javascript-definitive",
        title: "JavaScript",
        subtitle: "The Definitive Guide",
        author: "David Flanagan",
        coverImage: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "JavaScript code highlighted on a monitor",
        coverTagline: "From fundamentals to advanced patterns in the language of the web.",
        pages: [
            {
                title: "Core Language",
                body: "Covers syntax, objects, functions, and prototypes with clarity that withstands time.",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Notebook open to JavaScript notes"
            },
            {
                title: "Browser APIs",
                body: "Explores DOM, events, and storage APIs that bring web pages to life.",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer interacting with browser devtools"
            },
            {
                title: "Asynchronous Patterns",
                body: "Promises, async/await, and event loops demystified for real-world apps.",
                image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Event loop diagram on a whiteboard"
            },
            {
                title: "Best Practices",
                body: "Readable code, modular design, and testing strategies keep projects maintainable.",
                image: "https://images.unsplash.com/photo-1523475472560-26da2c7c3aba?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Team reviewing JavaScript code together"
            }
        ]
    },
    "pragmatic-programmer": {
        id: "pragmatic-programmer",
        title: "Pragmatic Programmer",
        coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Developer pair programming at a workstation",
        coverTagline: "Craft personal practices that make great software inevitable.",
        pages: [
            {
                title: "Pragmatic Mindset",
                body: "Stay curious, challenge assumptions, and continuously sharpen your toolkit.",
                image: "https://images.unsplash.com/photo-1523475472560-26da2c7c3aba?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Engineer jotting lessons in a notebook"
            },
            {
                title: "Communication Matters",
                body: "Treat documentation, naming, and conversation as core developer skills.",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developers brainstorming together"
            },
            {
                title: "Stone Soup Projects",
                body: "Invite team contributions; small improvements compound into robust systems.",
                image: "https://images.unsplash.com/photo-1521737604893-4e6256f7e89c?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Team collaborating around a table"
            },
            {
                title: "Responsibility & Ownership",
                body: "Own outcomes, not just code. Ship with pride and maintain with empathy.",
                image: "https://images.unsplash.com/photo-1523475472560-8ad79c3d5d76?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer presenting a finished feature"
            }
        ]
    },
    "white-space-minimal": {
        id: "white-space-minimal",
        title: "White Space",
        subtitle: "Minimalist edition",
        coverImage: "https://images.unsplash.com/photo-1523475472560-8f6f1fdf45c0?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Bright white minimalist workspace",
        coverTagline: "Silence on the canvas creates room for meaning.",
        pages: [
            {
                title: "Negative Space as Design",
                body: "Use emptiness intentionally to highlight the essential and invite calm focus.",
                image: "https://images.unsplash.com/photo-1523475472560-26da2c7c3aba?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Minimal poster mockups on a wall"
            },
            {
                title: "Typographic Breathing Room",
                body: "Increase line height and margins to let typography feel sophisticated and effortless.",
                image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Elegant typography poster with wide spacing"
            },
            {
                title: "Contrast Through Silence",
                body: "Sparse layouts make each accent color or photo pop without overwhelming viewers.",
                image: "https://images.unsplash.com/photo-1523475472560-2b19b9c38ee8?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Minimal interface with a single accent color"
            },
            {
                title: "Mindful Interactions",
                body: "Whitespace guides touch targets and scrolling, creating tranquil digital experiences.",
                image: "https://images.unsplash.com/photo-1523475472560-893bcd61814f?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Mobile UI with generous spacing"
            }
        ]
    },
    "w3schools": {
        id: "w3schools",
        title: "W3 Schools",
        subtitle: "The best around",
        coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Web development learning resources on a laptop",
        coverTagline: "Hands-on exercises that teach by doing, not just reading.",
        pages: [
            {
                title: "Copy, Paste, Iterate",
                body: "Instant editors let you tweak code in the browser and see results immediately.",
                image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Live code editor open on a screen"
            },
            {
                title: "Broad Curriculum",
                body: "From HTML to SQL, the site covers the stack with digestible lessons.",
                image: "https://images.unsplash.com/photo-1523475472560-8f6f1fdf45c0?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Collection of programming reference books"
            },
            {
                title: "Certification Paths",
                body: "Structured tracks help learners prove their skills and stay accountable.",
                image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Person studying with printed worksheets"
            },
            {
                title: "Reference First",
                body: "Clear examples make it a quick-stop reference for everyday coding questions.",
                image: "https://images.unsplash.com/photo-1523475472560-2b19b9c38ee8?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer checking online documentation"
            }
        ]
    },
    "ui-ux-mobile": {
        id: "ui-ux-mobile",
        title: "UI/UX",
        subtitle: "Guide to Mobile Development",
        author: "John Doe",
        coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Designer reviewing mobile UI mockups",
        coverTagline: "Holistic mobile experiences come from blending research, design, and engineering.",
        pages: [
            {
                title: "User Research",
                body: "Interviews, surveys, and analytics reveal the jobs your app must help users accomplish.",
                image: "https://images.unsplash.com/photo-1521737604893-4e6256f7e89c?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Product team interviewing users"
            },
            {
                title: "Interaction Models",
                body: "Gestures, navigation patterns, and motion design must feel native to the platform.",
                image: "https://images.unsplash.com/photo-1523475472560-8f6f1fdf45c0?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Storyboard showing mobile gestures"
            },
            {
                title: "Visual Language",
                body: "Establish typography, iconography, and color rules to keep screens cohesive.",
                image: "https://images.unsplash.com/photo-1523475472560-2b19b9c38ee8?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Mobile design system components"
            },
            {
                title: "Measuring Impact",
                body: "Usability tests and product analytics close the loop between hypothesis and reality.",
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
                imageAlt: "UX researcher analyzing session recordings"
            }
        ]
    },
    "clean-code": {
        id: "clean-code",
        title: "Clean Code",
        coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Organized workspace with clean coding notes",
        coverTagline: "Readable code is kind to future collaborators—including you.",
        pages: [
            {
                title: "Meaningful Names",
                body: "Names reveal intent. Spend extra seconds to make functions self-explanatory.",
                image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer renaming variables for clarity"
            },
            {
                title: "Small Functions",
                body: "Functions should do one thing well. Smaller units are easier to test and reuse.",
                image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Sticky notes showing function responsibilities"
            },
            {
                title: "Testing Culture",
                body: "Tests document expectations and reduce fear when refactoring legacy code.",
                image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Engineer writing automated tests"
            },
            {
                title: "Continuous Refactoring",
                body: "Leave the campground cleaner by improving code as you touch it.",
                image: "https://images.unsplash.com/photo-1523475472560-26da2c7c3aba?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer refactoring code on dual monitors"
            }
        ]
    },
    "docs-for-devs": {
        id: "docs-for-devs",
        title: "Docs for Devs",
        coverImage: "https://images.unsplash.com/photo-1523475472560-26da2c7c3aba?auto=format&fit=crop&w=800&q=80",
        coverImageAlt: "Technical writer arranging documentation pages",
        coverTagline: "Documentation connects product intent with engineering execution.",
        pages: [
            {
                title: "Know the Audience",
                body: "Write to unblock the next developer. Explain context, not just API signatures.",
                image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Technical writer drafting notes"
            },
            {
                title: "Patterns & Examples",
                body: "Code snippets plus narrative show not only how to use APIs but why they exist.",
                image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Highlighted code examples in documentation"
            },
            {
                title: "Docs as Products",
                body: "Feedback loops, changelogs, and versioning keep docs as alive as the codebase.",
                image: "https://images.unsplash.com/photo-1521737604893-4e6256f7e89c?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Team reviewing documentation backlog"
            },
            {
                title: "Automation Friendly",
                body: "Structure docs for search and reuse—component-driven documentation scales with teams.",
                image: "https://images.unsplash.com/photo-1523475472560-893bcd61814f?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Developer integrating docs into a build pipeline"
            }
        ]
    }
};

export const getBookOverview = (idOrTitle: string | undefined): BookOverview | null => {
    if(!idOrTitle){
        return null;
    }

    const normalizedId = idOrTitle.toLowerCase();
    if(bookOverviewById[normalizedId]){
        return bookOverviewById[normalizedId];
    }

    const fallbackMatch = Object.values(bookOverviewById).find((book) => book.title.toLowerCase() === normalizedId);
    return fallbackMatch || null;
};

