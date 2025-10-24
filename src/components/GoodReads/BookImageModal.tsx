import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useId } from 'react';
import './BookImageModal.css';

interface BookImageModalProps {
  image: string;
  title: string;
  onClose: () => void;
}

const BookImageModal: React.FC<BookImageModalProps> = ({ image, title, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="book-image-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="book-image-modal"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
        >
          <button
            className="book-image-modal-close"
            onClick={onClose}
            aria-label="Close enlarged book cover"
            ref={closeButtonRef}
          >
            &times;
          </button>
          <div className="book-image-container">
            <h3 id={headingId} className="sr-only">{`${title} cover art`}</h3>
            <img src={image} alt={`${title} cover`} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookImageModal;
