import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
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
  const flipBookRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Reset to first page when book changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsImageModalOpen(false);
  }, [book]);

  const handleImageClick = useCallback(() => {
    setIsImageModalOpen(true);
  }, []);

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const handleFlip = (event: { data: number }) => {
    if (typeof event?.data === 'number') {
      setCurrentIndex(event.data);
    }
  };

  const goToPrevious = () => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  };

  const goToNext = () => {
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  if (!book) return null;

  const { name, author, image, takeaways } = book;

  const contentPages = useMemo(() => {
    const grouped = [];
    for (let i = 0; i < takeaways.length; i += 2) {
      grouped.push(takeaways.slice(i, i + 2));
    }
    return grouped;
  }, [takeaways]);

  const flipBookPages = useMemo(() => {
    const interiorPages = contentPages.flatMap((items, index) => {
      const bullets = items.map((takeaway, bulletIndex) => (
        <div key={bulletIndex} className="book-reader-takeaway">
          <div className="takeaway-bullet">•</div>
          <p>{takeaway}</p>
        </div>
      ));

      return (
        <div key={`spread-${index}`} className="book-page book-page-content">
          <div className="book-page-heading">
            <span>Key Takeaways</span>
            <span className="book-page-number">
              {index + 1} / {contentPages.length}
            </span>
          </div>
          <div className="book-reader-takeaways">{bullets}</div>
        </div>
      );
    });

    // Ensure an even number of interior pages so the back cover aligns correctly
    if (interiorPages.length % 2 !== 0) {
      interiorPages.push(
        <div key="spread-placeholder" className="book-page book-page-placeholder">
          <div className="placeholder-text">More reflections soon…</div>
        </div>
      );
    }

    return [
      <div
        key="cover-front"
        className="book-page book-page-cover"
        role="button"
        tabIndex={0}
        aria-label={`View larger cover for ${name}`}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleImageClick();
          }
        }}
        onClick={handleImageClick}
      >
        <div
          className="book-page-cover-art"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="book-page-cover-overlay">
          <div className="book-page-cover-title">{name}</div>
          <div className="book-page-cover-author">By {author}</div>
          <div className="book-page-cover-hint">Click to zoom</div>
        </div>
      </div>,
      <div key="inside-front" className="book-page book-page-intro">
        <div className="book-page-intro-heading">
          <span>The Library of Learnings</span>
          <small>Notes by Yash Mathur</small>
        </div>
        <p>
          A quick collection of highlights that changed how I approach my craft.
          Flip through the spreads to explore the ideas that stayed with me.
        </p>
      </div>,
      ...interiorPages,
      <div key="inside-back" className="book-page book-page-closing">
        <h4>Last Thoughts</h4>
        <p>
          Each page marks a moment that nudged my thinking. I&apos;d love to hear
          how it resonates with you—let&apos;s trade book recommendations sometime.
        </p>
      </div>,
      <div
        key="cover-back"
        className="book-page book-page-back"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="book-page-back-overlay">
          <span>{name}</span>
        </div>
      </div>
    ];
  }, [author, contentPages, handleImageClick, image, name]);

  const totalPageCount = flipBookPages.length - 1; // zero-based index onFlip returns

  return (
    <motion.div
      className="book-reader"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="book-reader-wrapper">
        <HTMLFlipBook
          ref={flipBookRef}
          className="flip-book"
          style={{}}
          size="stretch"
          width={420}
          height={320}
          minWidth={320}
          maxWidth={480}
          minHeight={240}
          maxHeight={360}
          showCover
          drawShadow
          flippingTime={800}
          usePortrait
          startZIndex={2}
          autoSize={false}
          startPage={0}
          maxShadowOpacity={0.4}
          mobileScrollSupport
          clickEventForward={false}
          useMouseEvents
          swipeDistance={55}
          showPageCorners
          disableFlipByClick={false}
          onFlip={handleFlip}
        >
          {flipBookPages}
        </HTMLFlipBook>
      </div>

      <div className="book-reader-navigation">
        <button
          className="book-reader-nav-button"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          aria-label="Previous page"
        >
          ←
        </button>
        <button
          className="book-reader-nav-button"
          onClick={goToNext}
          disabled={currentIndex >= totalPageCount}
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
