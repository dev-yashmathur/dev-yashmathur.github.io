import { useState } from 'react';
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import Book, { type BookOrientation, type SpineConfig } from './Book';
import BookReader from './BookReader';
import BookStack from './BookStack';
import BookStackElement from './BookStackElement';
import './Bookshelf.css';
import './Book.css';

interface StackBook {
  title: string;
  subtitle?: string;
  spine: SpineConfig;
}

type ShelfOrientation = BookOrientation | 'stack';

interface BookEntry {
  name: string;
  author: string;
  image: string;
  takeaways: string[];
  orientation: ShelfOrientation;
  spine: SpineConfig;
  subtitle?: string;
  stackBooks?: StackBook[];
}

interface BookshelfConfig {
  shelfColor: string;
  books: BookEntry[];
}

const bookshelfData: BookshelfConfig = {
  shelfColor: '#d9c7b8',
  books: [
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
      ],
      orientation: 'tilted',
      spine: { color: '#d6a470', design: 'split bands', width: 58 },
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
      ],
      orientation: 'default',
      spine: { color: '#5d909c', design: 'colored spine', width: 54 },
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
      ],
      orientation: 'default',
      spine: { color: '#f0d4c8', design: 'dual top bands', width: 50 },
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
      ],
      orientation: 'onDisplay',
      spine: { color: '#8bc9c4', design: 'no bands', width: 64 },
    },
    {
      name: 'Curated Shelf',
      author: 'Various Authors',
      image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&q=80&w=1470',
      takeaways: [
        'A medley of books that keep my product thinking fresh.',
        'Each title brings a different lens to leadership, execution, and storytelling.',
      ],
      orientation: 'stack',
      spine: { color: '#e5cda1', design: 'split bands', width: 60 },
      stackBooks: [
        { title: 'Zero to One', subtitle: 'Peter Thiel', spine: { color: '#e5cda1', design: 'colored spine', width: 72 } },
        { title: 'Range', subtitle: 'David Epstein', spine: { color: '#c9b3ff', design: 'split bands', width: 72 } },
        { title: 'Radical Focus', subtitle: 'Christina Wodtke', spine: { color: '#8bc9c4', design: 'dual top bands', width: 72 } },
        { title: 'Creative Selection', subtitle: 'Ken Kocienda', spine: { color: '#f0d4c8', design: 'no bands', width: 72 } },
      ],
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
      ],
      orientation: 'default',
      spine: { color: '#d8c1ad', design: 'colored spine', width: 48 },
    },
  ],
};

interface BookshelfProps {
  books?: BookEntry[];
  shelfColor?: string;
}

const Bookshelf: React.FC<BookshelfProps> = ({ books, shelfColor }) => {
  const bookList = books ?? bookshelfData.books;
  const shelfTone = shelfColor ?? bookshelfData.shelfColor;
  const [selectedBook, setSelectedBook] = useState<BookEntry | null>(null);

  const handleBookClick = (book: BookEntry) => {
    if (book.orientation === 'stack') {
      return;
    }
    if (selectedBook?.name === book.name) {
      setSelectedBook(null);
    } else {
      setSelectedBook(book);
    }
  };

  const shelfStyle: CSSProperties = {
    '--shelf-color': shelfTone,
  } as CSSProperties;

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
          <div className="bookshelf-surface" style={shelfStyle}>
            <div className="bookshelf__wrapper">
              {bookList.map(book => {
                const isSelected = selectedBook?.name === book.name;
                const isStack = book.orientation === 'stack' && book.stackBooks && book.stackBooks.length > 0;
                const containerClass = [
                  'bookshelf__book-container',
                  isSelected ? 'bookshelf__book-container--selected' : '',
                  isStack ? 'bookshelf__book-container--static' : '',
                ]
                  .filter(Boolean)
                  .join(' ');
                const bookOrientation: 'default' | 'tilted' | 'onDisplay' =
                  isStack || book.orientation === 'stack' ? 'default' : book.orientation;

                return (
                  <div
                    key={book.name}
                    className={containerClass}
                    aria-label={`${book.name} by ${book.author}`}
                    role={isStack ? 'presentation' : 'button'}
                    tabIndex={isStack ? -1 : 0}
                    onClick={isStack ? undefined : () => handleBookClick(book)}
                    onKeyDown={
                      isStack
                        ? undefined
                        : (event: ReactKeyboardEvent<HTMLDivElement>) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              handleBookClick(book);
                            }
                          }
                    }
                  >
                    {isStack && book.stackBooks ? (
                      <BookStack>
                        {book.stackBooks.map((stackBook, idx) => (
                          <BookStackElement
                            key={`${stackBook.title}-${idx}`}
                            title={stackBook.title}
                            subtitle={stackBook.subtitle}
                            spine={stackBook.spine}
                          />
                        ))}
                      </BookStack>
                    ) : (
                      <Book
                        title={book.name}
                        author={book.author}
                        orientation={bookOrientation}
                        spine={book.spine}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {selectedBook && <BookReader book={selectedBook} />}
      </div>
    </section>
  );
};

export default Bookshelf;
