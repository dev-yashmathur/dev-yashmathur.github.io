import { useEffect, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookImageModal from './BookImageModal';
import './BookReader.css';

interface BookReaderProps {
  book: {
    name: string;
    author: string;
    image: string;
    takeaways: string[];
  } | null;
}

const BookReader: React.FC<BookReaderProps> = ({ book }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Reset to first page when book changes
  useEffect(() => {
    setCurrentPage(0);
    setIsImageModalOpen(false);
  }, [book]);

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const handleCoverKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleImageClick();
    }
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  if (!book) return null;

  const { name, author, image, takeaways } = book;

  // Split takeaways into pages (max 2 takeaways per page)
  const pages = [];
  for (let i = 0; i < takeaways.length; i += 2) {
    pages.push(takeaways.slice(i, i + 2));
  }

  const totalPages = pages.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1 && !flipping) {
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setFlipping(false);
      }, 500);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !flipping) {
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setFlipping(false);
      }, 500);
    }
  };

  return (
    <motion.div
      className="book-reader"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div
        className="book-reader-cover"
        style={{ backgroundImage: `url(${image})` }}
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        aria-label={`View larger cover for ${name}`}
        onKeyDown={handleCoverKeyDown}
      >
        <div className="book-reader-title">{name}</div>
        <div className="book-reader-author">by {author}</div>
        <div className="book-image-zoom-hint">Activate to zoom</div>
      </div>

      <div className="book-reader-pages">
        <div className={`book-reader-page ${flipping ? 'flipping' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="book-reader-page-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-live="polite"
            >
              <h3>My Key Takeaways</h3>
              <div className="book-reader-takeaways">
                {pages[currentPage]?.map((takeaway, index) => (
                  <div key={index} className="book-reader-takeaway">
                    <div className="takeaway-bullet">•</div>
                    <p>{takeaway}</p>
                  </div>
                ))}
              </div>
              <div className="book-reader-pagination">
                Page {currentPage + 1} of {totalPages}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="book-reader-navigation">
        <button
          className="book-reader-nav-button"
          onClick={prevPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          ←
        </button>
        <button
          className="book-reader-nav-button"
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          aria-label="Next page"
        >
          →
        </button>
      </div>

      {isImageModalOpen && (
        <BookImageModal
          image={image}
          title={name}
          onClose={closeImageModal}
        />
      )}
    </motion.div>
  );
};

export default BookReader;
