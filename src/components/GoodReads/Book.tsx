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
  bookColor = '#008080' // Default to teal (from your color palette)
}) => {

  const bookVariants = {
    idle: { rotateX: 0, rotateZ: 0, y: 0 },
    hover: { rotateX: 25, rotateZ: 0, y: -10 },
  };

  return (
    <motion.div
      className={`book ${isSelected ? 'selected' : ''}`}
      style={{ backgroundColor: bookColor }}
      variants={bookVariants}
      initial="idle"
      whileHover="hover"
      onClick={onClick}
      data-testid={`book-${index}`}
    >
      <div className="book-spine">
        <div className="book-title">{name}</div>
        {/* Author removed from spine view as requested */}
      </div>
      <div
        className="book-cover"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="book-cover-title">{name}</div>
        <div className="book-cover-author">by {author}</div>
      </div>
    </motion.div>
  );
};

export default Book;