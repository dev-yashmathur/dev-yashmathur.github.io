import type { CSSProperties, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import './Book.css';

interface BookProps {
  name: string;
  author: string;
  image: string;
  takeaways: string[];
  isSelected: boolean;
  onClick: () => void;
  index: number;
  bookColor?: string; // Optional color parameter
}

const Book: React.FC<BookProps> = ({
  name,
  author,
  image,
  isSelected,
  onClick,
  index,
  bookColor = '#f3a89f' // Default warm peach from palette
}) => {

  const bookVariants = {
    idle: { rotateX: 0, rotateZ: 0, rotateY: 0, y: 0 },
    hover: {
      rotateX: -18,
      rotateZ: 0,
      rotateY: -6,
      y: -18,
      transition: { type: 'spring' as const, stiffness: 260, damping: 20 }
    },
    selected: {
      rotateX: -18,
      rotateZ: 0,
      rotateY: -6,
      y: -18,
      transition: { type: 'spring' as const, stiffness: 260, damping: 20 }
    }
  };

  const bookStyle: CSSProperties = {
    '--book-color': bookColor,
    '--book-cover': `url(${image})`
  } as CSSProperties;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      className={`book ${isSelected ? 'selected' : ''}`}
      style={bookStyle}
      variants={bookVariants}
      initial="idle"
      whileHover="hover"
      animate={isSelected ? 'selected' : 'idle'}
      onClick={onClick}
      data-testid={`book-${index}`}
      aria-label={`${name} by ${author}`}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="book-inner">
        <div className="book-face book-spine">
          <span className="book-title" title={name}>{name}</span>
        </div>
        <div className="book-face book-fore-edge"></div>
        <div className="book-face book-top"></div>
        <div className="book-face book-bottom"></div>
        <div className="book-face book-front">
          <div className="book-front-overlay"></div>
        </div>
        <div className="book-face book-back"></div>
      </div>
    </motion.div>
  );
};

export default Book;
