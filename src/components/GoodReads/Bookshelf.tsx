import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Book from './Book';
import BookReader from './BookReader';
import { StyledShelf } from './BookshelfDesign';
import './Bookshelf.css';

// This would typically come from a data file or API
const demoBooks = [
  {
    name: 'Atomic Habits',
    author: 'James Clear',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1374',
    takeaways: [
      'Small 1% improvements compound over time to create remarkable results.',
      'Focus on building systems rather than setting goals to achieve long-term change.',
      'Habit stacking (connecting a new habit to an existing one) is a powerful way to build new behaviors.',
      'To create lasting habits, make them obvious, attractive, easy, and satisfying.',
      'Identity-based habits are more likely to stick - focus on becoming the type of person who does the habit.',
    ]
  },
  {
    name: 'Deep Work',
    author: 'Cal Newport',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=1470',
    takeaways: [
      'Deep work is the ability to focus without distraction on a cognitively demanding task.',
      'The ability to perform deep work is becoming increasingly rare and increasingly valuable.',
      'Schedule deep work blocks into your day rather than trying to fit them in opportunistically.',
      'Embrace boredom and reduce your dependence on stimulation to strengthen your concentration muscles.',
      'Depth leads to meaningful work and a sense of craftsmanship that shallow work cannot provide.',
    ]
  },
  {
    name: 'The Lean Startup',
    author: 'Eric Ries',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1470',
    takeaways: [
      'Build-Measure-Learn is a framework for quickly testing business ideas through rapid experimentation.',
      'Create a minimum viable product (MVP) to test key business hypotheses with minimal resources.',
      'Use validated learning and actionable metrics to make data-driven decisions.',
      'The five principles of the Lean Startup are entrepreneurs are everywhere, entrepreneurship is management, validated learning, innovation accounting, and build-measure-learn.',
      'Be willing to pivot (make a structural course correction) when data suggests your current strategy is not working.',
    ]
  },
  {
    name: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1470',
    takeaways: [
      'Our brains use two systems: System 1 (fast, intuitive, emotional) and System 2 (slow, deliberate, logical).',
      'We are prone to numerous cognitive biases that affect our decision-making in predictable ways.',
      'The availability heuristic causes us to overestimate the likelihood of events that are easy to recall.',
      'We tend to be overconfident in our judgments and predictions about the future.',
      'Recognizing our biases is the first step to making better decisions.',
    ]
  },
  {
    name: 'Zero to One',
    author: 'Peter Thiel',
    image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&q=80&w=1374',
    takeaways: [
      'True innovation means creating something entirely new (going from 0 to 1) rather than incrementally improving existing technology (going from 1 to n).',
      'Monopolies are good for innovation and society when they are built on creating new value rather than rent-seeking.',
      'The most valuable businesses are those that can capture lasting monopoly profits.',
      'Competition is overrated - it leads to conformity rather than differentiation.',
      'A great business is defined by its ability to generate cash flows in the future.',
    ]
  },
  {
    name: 'Sapiens',
    author: 'Yuval Noah Harari',
    image: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1470',
    takeaways: [
      'Homo sapiens came to dominate the world because of our ability to cooperate flexibly in large numbers through shared myths and stories.',
      'The Agricultural Revolution was a massive change - it increased the total food supply but reduced quality of life for most individuals.',
      'Money, empires, and religions are all inter-subjective realities that exist because people collectively believe in them.',
      'Capitalism succeeded because it is the only system that does not require ethical justification - reinvesting profits in production is inherently self-perpetuating.',
      'Our scientific and technological progress has outpaced our wisdom in using these powers responsibly.',
    ]
  },
];

interface BookshelfProps {
  books?: Array<{
    name: string;
    author: string;
    image: string;
    takeaways: string[];
  }>;
}

const SPINE_COLORS = ['#f3a89f', '#6c92f0', '#f0d4c8', '#c9b3ff', '#8bc9c4', '#f6b6c4', '#d8c1ad'];
const DESIGN_SEQUENCE: Array<'no bands' | 'split bands' | 'dual top bands' | 'colored spine'> = [
  'colored spine',
  'split bands',
  'no bands',
  'dual top bands',
  'split bands',
  'colored spine',
];
const ORIENTATION_SEQUENCE: Array<'default' | 'tilted' | 'onDisplay'> = [
  'tilted',
  'default',
  'default',
  'onDisplay',
  'default',
  'default',
];

const Bookshelf: React.FC<BookshelfProps> = ({ books = demoBooks }) => {
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);

  const handleBookClick = (book: typeof books[0]) => {
    if (selectedBook?.name === book.name) {
      setSelectedBook(null);
    } else {
      setSelectedBook(book);
    }
  };

  const enrichedBooks = useMemo(
    () =>
      books.map((book, index) => ({
        ...book,
        spineColor: SPINE_COLORS[index % SPINE_COLORS.length],
        spineDesign: DESIGN_SEQUENCE[index % DESIGN_SEQUENCE.length],
        orientation: ORIENTATION_SEQUENCE[index % ORIENTATION_SEQUENCE.length],
      })),
    [books]
  );

  return (
    <section
      id="good-reads"
      className="goodreads-section"
      aria-labelledby="goodreads-heading"
    >
      <div className="container">
        <motion.h2
          className="section-title"
          id="goodreads-heading"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Good Reads
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Books that have influenced my thinking and approach
        </motion.p>

        <div className="bookshelf-scene">
          <StyledShelf className="bookshelf-surface">
            <div className="bookshelf__wrapper">
              {enrichedBooks.map((book, index) => (
                <Book
                  key={book.name}
                  name={book.name}
                  author={book.author}
                  image={book.image}
                  takeaways={book.takeaways}
                  isSelected={selectedBook?.name === book.name}
                  onClick={() => handleBookClick(book)}
                  index={index}
                  color={book.spineColor}
                  design={book.spineDesign}
                  orientation={book.orientation}
                />
              ))}
            </div>
          </StyledShelf>
        </div>

        {selectedBook && <BookReader book={selectedBook} />}
      </div>
    </section>
  );
};

export default Bookshelf;
