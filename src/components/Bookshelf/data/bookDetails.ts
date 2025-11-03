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
    color?: string;
    design?: "split bands" | "dual top bands" | "colored spine";
    width?: number;
    coverImage: string;
    coverImageAlt: string;
    coverTagline: string;
    pages: BookPageContent[];
}

export const bookDetailsById: Record<string, BookOverview> = {
    "atomic-habits": {
        id: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        subtitle: "Tiny changes, remarkable results",
        color: "#F6C28B",
        design: "split bands",
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
        color: "#F7B7A3",
        design: "split bands",
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
                body: "Longevity <h1>hotspots</h1> share a pattern: tight-knit communities where neighbors know each other’s stories and share responsibility.",
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
        color: "#F8E1A5",
        design: "split bands",
        width: 800,
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
        color: "#F3D1DC",
        design: "split bands",
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
        color: "#F2D6B3",
        design: "split bands",
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
    }
};

export const getBookOverview = (idOrTitle: string | undefined): BookOverview | null => {
    if(!idOrTitle){
        return null;
    }

    const normalizedId = idOrTitle.toLowerCase();
    if(bookDetailsById[normalizedId]){
        return bookDetailsById[normalizedId];
    }

    const fallbackMatch = Object.values(bookDetailsById).find((book) => book.title.toLowerCase() === normalizedId);
    return fallbackMatch || null;
};

